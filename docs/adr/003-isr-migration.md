# ADR-003: ISR/SSG切り替えの方針を決定する

## ステータス: 提案(Proposed)

## 日付: 2026-10-11

## コンテキスト(なぜこの決定が必要か)

[ADR-001](./001-why-firestore.md) で Firestore 採用、[ADR-002](./002-hosting-strategy.md) で Firebase Hosting + Cloud Run 構成を決定したことに続き、**7 ページそれぞれで Firestore からデータを取るタイミング(ビルド時 / リクエスト時 / クライアント側)** を決める必要がある。

この選択はパフォーマンス・コスト・コンテンツ更新の反映速度にすべて影響する。[`docs/isr-migration-impact.md`](../isr-migration-impact.md) 「ページ別の推奨レンダリング戦略」で既に表形式での提案を出しており、本 ADR ではその推奨を正式に採択するかどうかを判断する。

## 検討した選択肢

### 選択肢A: 全ページSSG(ビルド時にFirestoreからデータ取得、ISRなし)

- 全 7 ページを `generateStaticParams` + `fetch(cache: "force-cache")` で完全静的化
- Firestore 更新のたびに手動または Webhook 経由で再ビルド

### 選択肢B: 全ページISR(revalidate 付きで定期再生成)

- 全 7 ページに `export const revalidate = N` を付与
- Cloud Run 上で stale 期間経過後、バックグラウンドで次回アクセス時に再生成

### 選択肢C: ページごとにSSG / ISRを使い分け

- 更新頻度の低いページは SSG(ビルド時固定)
- 更新頻度の高いページは ISR(revalidate 付き)
- [`docs/isr-migration-impact.md`](../isr-migration-impact.md) の推奨表に従う

### 選択肢D: CSR(クライアントサイドでFirestore SDKから直接取得)

- 各ページを素の HTML シェルで配信し、ブラウザ側で Firestore SDK から読み込み
- JSON-LD やメタタグがクローラに拾われにくくなるため SEO に不利

### 比較表

| 観点 | A: 全 SSG | B: 全 ISR | **C: 使い分け** | D: CSR |
|---|---|---|---|---|
| 初回表示パフォーマンス | ◎(事前描画) | ○(stale 返却→裏で再生成) | **◎/○(ページ次第)** | ×(JS 実行後に描画) |
| コンテンツ更新の反映速度 | ×(再ビルド必要) | ○(revalidate 間隔) | **○(重要ページは短い revalidate)** | ◎(即時) |
| ビルド時間 | ×(全ページを都度生成) | △(初回のみ) | **○(SSG 対象のみ生成)** | ◎(静的シェル) |
| Firestore 読み取りコスト | ◎(ビルド時のみ) | ○(revalidate 単位) | **○(頻度の低いページはビルド時) ** | ×(アクセスごと) |
| 実装の複雑さ | 低(fetch + 静的生成のみ) | 低(revalidate 付与のみ) | **中(ページごとに判断が必要)** | 高(ローディング UI・エラー処理) |
| SEO / JSON-LD | ◎ | ◎ | ◎ | ×(クローラ対応に Prerender 等が必要) |
| 現在の静的エクスポート時代との体感差 | 小(見た目同じ) | 小 | **小** | 大 |

### `isr-migration-impact.md` の推奨(選択肢Cの具体化)

| ページ | 推奨 | revalidate 目安 | 更新頻度の根拠 |
|---|---|---|---|
| `/`(Home) | **ISR** | 3600(1 時間) | RecentActivity が直近エントリに追従 |
| `/books` | SSG | 再ビルド | 新刊追加が年 1〜2 回 |
| `/talks` | **ISR** | 3600(1 時間) | 月数件追加される |
| `/design` | SSG | 再ビルド | 半年に 1 回程度 |
| `/manuscript` | **ISR** | 3600(1 時間) | iOSDC / 寄稿 / DroidKaigi / テックブログと更新チャネル多数 |
| `/showcase` | SSG + on-demand | 86400 | GitHub リポジトリ追加は季節的 |
| `/timeline` | SSG | 再ビルド | 年単位の章追加のみ |

## 決定

**選択肢C「ページごとにSSG / ISRを使い分け」を採用する。** 具体値は上記 `isr-migration-impact.md` の推奨表に従う(ISR 3 ページ / SSG 4 ページ)。

ただし本決定は本書の分析に基づく推奨であり、**最終判断はサイトオーナーのレビューを経て行う** 想定。

## 根拠(先行ドキュメントからの具体的な裏付け)

1. **データ件数とページ特性から Firestore 読み取りコストを最適化できる**
   [`docs/firestore-migration-spec.md`](../firestore-migration-spec.md) のエントリ数と更新頻度を見ると、`/talks` は 176 件・月数件追加 vs `/books` は 6 件・年 1〜2 回追加 と大きく異なる。全 ISR 化(選択肢B)ではビルド時間と Firestore 読み取り回数が揃って増加する一方、`/books` を SSG に残せば **ビルド時 1 回の fetch** で済む。

2. **現在の `firebase.json` キャッシュ戦略との親和性**
   HTML の Cache-Control は現状 `max-age=300, s-maxage=600, stale-while-revalidate=86400` が設定済み([`firebase.json`](../../firebase.json))。ISR の挙動(stale データを即時返却 → バックグラウンドで再生成)と設計思想が揃っており、Cloud Run の `revalidate` と Firebase Hosting の CDN SWR が同じ方向を向く。

3. **既存の byte-identical 検証プロセスとの整合**
   Phase 2 の各 JSON 分離 PR では「master vs feature ブランチで `out/<page>/index.html` が byte-identical で一致すること」を品質ゲートとして採用してきた。ISR 化後も **初回描画の HTML が byte-identical であること** を同じゲートに流用でき、見た目の退行を機械的に検知できる。選択肢D(CSR)はこの検証ができなくなる(JS 実行後にしか内容が揃わない)。

4. **選択肢A(全SSG) は Firestore 連携の恩恵が薄い**
   Firestore に移しても結局は再ビルドが必要なら、現状の `data/*.json` + Git フローと体感が変わらない。管理画面経由で更新しても即時反映されない点で Phase 3 の目的を半分失う。

5. **選択肢D(CSR) は SEO 退行が大きい**
   本サイトは全ページに JSON-LD(`components/global/JsonLd.tsx`)を埋め込んでおり、Google Rich Results や Twitter / OGP の静的解析に依存している。CSR 化すると SSR プリレンダリング(react-snap や Prerender.io 等)の追加実装が必要になり、Cloud Run 構成([ADR-002](./002-hosting-strategy.md))と二重構造になる。

## 影響(この決定によって何が変わるか)

### 追加 / 変更される要素

#### ISR 化対象(3 ページ): `/`, `/talks`, `/manuscript`

```ts
// 各 page.tsx に 1 行追加
export const revalidate = 3600; // 1 時間
```

- 内部で `fetch` または Firestore Admin SDK を呼ぶ場合は `cache: "no-store"` 等の指定を併用
- 初回アクセス時に 1 回だけ Cloud Run 内でレンダリングが走り、以降は Firebase Hosting CDN の `s-maxage=600` + 内部 `stale-while-revalidate` でキャッシュ

#### SSG 据え置き(4 ページ): `/books`, `/design`, `/showcase`, `/timeline`

- `export const revalidate = false` を明示 or 省略(デフォルトで静的)
- Firestore からの読み出しは `fetch(..., { cache: "force-cache" })` でビルド時固定

### CI/CD への影響

- `.github/workflows/ci.yml`: `out/` 存在確認ステップは削除、`.next/BUILD_ID` の存在検証に置き換え(詳細は [`docs/isr-migration-impact.md`](../isr-migration-impact.md) 参照)
- 新規追加予定の `deploy-preview.yml` / `deploy-production.yml` は ADR-002 で Cloud Run + Hosting 併用の形で定義

### Claude Code 設定への影響

- [`CLAUDE.md`](../../CLAUDE.md) の Do NOT から「`output: 'export'` を外さない」を削除
- [`.claude/skills/firebase-deploy/SKILL.md`](../../.claude/skills/firebase-deploy/SKILL.md) に「ISR 対象ページの `revalidate` 値を根拠なく変更しない」を追加
- [`.claude/commands/pre-deploy.md`](../../.claude/commands/pre-deploy.md) の `out/` HTML 件数確認を `.next/` + ビルド成否に変更

### Firestore 読み取りコストの見積り

- ISR 3 ページ × revalidate 3600 秒 × 平均 Firestore 読み取り回数(推定 5〜10 回/ページ) = **1 時間あたり 15〜30 読み取り**
- Firestore 無料枠(**50,000 読み取り/日**)に対して 3 桁の余裕があり、無料プラン Spark では到達しないレベル(ただし ADR-002 で Blaze 必須)
- SSG 4 ページは再ビルド時のみの読み取りで、デプロイ頻度(月数回)× エントリ数(100 件以下)= 月数百読み取り

### 否定的な影響・リスク

- **初回ユーザーの体感レイテンシ**(Cloud Run の Cold Start) が ISR ページで発生。ADR-002 で `min-instances: 1` の設定を検討
- **ISR の `revalidate` 値はトラフィックが低い個人サイトでは効きにくい**(1 時間に 1 回も訪問が無ければ stale 更新が走らない)。手動 revalidate(`revalidatePath()`)を管理画面の更新完了時に呼ぶ補完設計を推奨
- **`revalidate` のテスト**は本番相当環境(Cloud Run または `next start`)でしか検証できず、`npm run dev` では常に SSR 動作で挙動が異なる点に注意

### マイグレーションの成功基準

- `/talks` と `/`(ISR 代表) + `/books`(SSG 代表) の 3 ページで、Firestore 連携後の初回 HTML が **現状の `data/*.json` 版と byte-identical** であること
- `firestore-migration-spec.md` のエントリ数(全 292 件)が Firestore に投入後、各ページの出力件数が一致していること

## 参考資料

- [ADR-001](./001-why-firestore.md): データストアとして Firestore を採用する
- [ADR-002](./002-hosting-strategy.md): Firebase Hosting + Cloud Run 構成
- [`docs/isr-migration-impact.md`](../isr-migration-impact.md): 影響範囲分析とページ別推奨の原典
- [`docs/firestore-migration-spec.md`](../firestore-migration-spec.md): データ構造とエントリ数
- [`firebase.json`](../../firebase.json): 既存のキャッシュポリシー
