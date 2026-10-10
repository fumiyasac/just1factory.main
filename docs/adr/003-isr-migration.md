# ADR-003: ISR / SSG切り替えの方針を決定する

## ステータス

提案(Proposed) / 2026-10-11起票。本書は分析に基づく推奨を提示するに留まり、採否はサイトオーナーのレビューで確定する。

## コンテキスト

[ADR-001](./001-why-firestore.md) でFirestore採用、[ADR-002](./002-hosting-strategy.md) でFirebase Hosting + Cloud Run構成を定めたことで、7ページそれぞれでFirestoreからデータを取るタイミング(ビルド時 / リクエスト時 / クライアント側)を決める下地ができた。この選択はパフォーマンス・コスト・コンテンツ更新の反映速度のいずれにも影響する。

[`docs/isr-migration-impact.md`](../isr-migration-impact.md) 「ページ別の推奨レンダリング戦略」で既に表形式の提案を出しており、本ADRではその推奨を正式に採択するかを判断する。

## 検討した選択肢

### 全ページを SSG(ビルド時にFirestoreから取得、ISRなし)

- 全7ページを `generateStaticParams` と `fetch(cache: "force-cache")` で完全静的化する。
- Firestore更新のたびに手動またはWebhook経由で再ビルドを走らせる必要がある。

### 全ページを ISR(revalidate付きで定期再生成)

- 全7ページに `export const revalidate = N` を付与する。
- Cloud Run上でstale期間経過後、バックグラウンドで次回アクセス時に再生成される。

### ページごとに SSG / ISR を使い分け

- 更新頻度の低いページはSSGで固定し、更新頻度の高いページだけISRで再生成する。
- [`docs/isr-migration-impact.md`](../isr-migration-impact.md) の推奨表に従う。

### 全ページを CSR(ブラウザからFirestore SDKで直接取得)

- 各ページを素のHTMLシェルで配信し、ブラウザ側でFirestore SDKから読み込む。
- JSON-LDやメタタグがクローラに拾われにくくなるためSEOでは不利になる。

### 比較表

| 観点 | 全SSG | 全ISR | **使い分け** | CSR |
|---|---|---|---|---|
| 初回表示パフォーマンス | ◎(事前描画) | ○(stale返却 → 裏で再生成) | **◎ / ○(ページ次第)** | ×(JS実行後に描画) |
| コンテンツ更新の反映速度 | ×(再ビルド必要) | ○(revalidate間隔) | **○(重要ページは短めのrevalidate)** | ◎(即時) |
| ビルド時間 | ×(全ページを都度生成) | △(初回のみ) | **○(SSG対象のみ生成)** | ◎(静的シェル) |
| Firestore読み取りコスト | ◎(ビルド時のみ) | ○(revalidate単位) | **○(頻度の低いページはビルド時のみ)** | ×(アクセスごと) |
| 実装の複雑さ | 低(fetch + 静的生成のみ) | 低(revalidate付与のみ) | **中(ページごとの判断が必要)** | 高(ローディングUIとエラー処理) |
| SEO / JSON-LD | ◎ | ◎ | ◎ | ×(Prerender等の追加実装が必要) |
| 現状との体感差 | 小 | 小 | **小** | 大 |

### 「使い分け」案の具体値(`isr-migration-impact.md` 由来)

| ページ | 推奨 | revalidate目安 | 更新頻度の根拠 |
|---|---|---|---|
| `/`(Home) | **ISR** | 3600(1時間) | RecentActivityが直近エントリに追従 |
| `/books` | SSG | 再ビルド | 新刊追加が年1〜2回 |
| `/talks` | **ISR** | 3600(1時間) | 月に数件追加される |
| `/design` | SSG | 再ビルド | 半年に1回程度 |
| `/manuscript` | **ISR** | 3600(1時間) | iOSDC / 寄稿 / DroidKaigi / テックブログと更新チャネルが複数ある |
| `/showcase` | SSG + on-demand | 86400 | GitHubリポジトリ追加は季節的 |
| `/timeline` | SSG | 再ビルド | 年単位の章追加のみ |

## 決定

ページごとにSSGとISRを使い分ける。具体値は上表の [`docs/isr-migration-impact.md`](../isr-migration-impact.md) 推奨に従い、ISR 3ページ(`/`, `/talks`, `/manuscript`)+ SSG 4ページ(`/books`, `/design`, `/showcase`, `/timeline`)の構成を採用する。

## 根拠

1. **ページ特性に応じてFirestore読み取りコストを最適化できる**
   [`docs/firestore-migration-spec.md`](../firestore-migration-spec.md) のエントリ数と更新頻度を見ると、`/talks` は176件で月に数件追加される一方、`/books` は6件で年1〜2回しか追加されない。全ページISR化ではビルド時間とFirestore読み取り回数が揃って増える一方、`/books` をSSGに残せばビルド時の1回のfetchだけで済む。

2. **現状のキャッシュ戦略と整合する**
   HTMLのCache-Controlは [`firebase.json`](../../firebase.json) で `max-age=300, s-maxage=600, stale-while-revalidate=86400` を設定済み。ISRの挙動(staleデータを即時返却し、バックグラウンドで再生成)と設計思想が揃っており、Cloud Runの `revalidate` とFirebase HostingのCDN SWRが同じ方向を向く。

3. **既存のbyte-identical検証プロセスをそのまま流用できる**
   Phase 2のJSON分離PRでは「masterとfeatureブランチの `out/<page>/index.html` がbyte-identicalで一致すること」を品質ゲートとして運用してきた。ISR化後も初回描画のHTMLがbyte-identicalであることを同じゲートに流用でき、見た目の退行を機械的に検知できる。CSR案ではJavaScript実行後にしか内容が揃わないため、この検証ができなくなる。

4. **全SSG案はFirestore連携の恩恵が薄い**
   移行後も結局は再ビルドが必要になるなら、現状の `data/*.json` とGitフローから本質的に体感が変わらない。管理画面経由で更新しても即時反映されない点で、Phase 3の目的の一端を失う。

5. **CSR案はSEOの退行が大きい**
   本サイトは全ページにJSON-LDを `components/global/JsonLd.tsx` 経由で埋め込んでおり、Google Rich ResultsやTwitter / OGPの静的解析に依存している。CSR化するとSSRプリレンダリング(react-snapやPrerender.ioなど)の追加実装が必要になり、[ADR-002](./002-hosting-strategy.md) のCloud Run構成と二重構造になる。

## 影響

### ISR化する3ページ(`/`, `/talks`, `/manuscript`)

各 `page.tsx` に revalidate を1行追加する。

```ts
export const revalidate = 3600; // 1時間
```

- 内部で `fetch` やFirestore Admin SDKを呼ぶ場合は、必要に応じて `cache: "no-store"` 等の指定を併用する。
- 初回アクセス時に1度だけCloud Run内でレンダリングが走り、以降はFirebase Hosting CDNの `s-maxage=600` と内部の `stale-while-revalidate` の組み合わせでキャッシュする。

### SSGを維持する4ページ(`/books`, `/design`, `/showcase`, `/timeline`)

- `export const revalidate = false` を明示するか、記述を省略してデフォルトの静的レンダリングに任せる。
- Firestoreからの読み出しは `fetch(..., { cache: "force-cache" })` でビルド時に固定する。

### CI / CD への影響

- `.github/workflows/ci.yml` の `out/` 存在確認ステップを削除し、`.next/BUILD_ID` の存在検証に置き換える(詳細は [`docs/isr-migration-impact.md`](../isr-migration-impact.md) 参照)。
- 新規追加予定の `deploy-preview.yml` と `deploy-production.yml` は [ADR-002](./002-hosting-strategy.md) に沿ってCloud RunとHostingの併用で構成する。

### Claude Code 設定への影響

- [`CLAUDE.md`](../../CLAUDE.md) のDo NOTから「`output: 'export'` を外さない」を削除する。
- [`.claude/skills/firebase-deploy/SKILL.md`](../../.claude/skills/firebase-deploy/SKILL.md) に「ISR対象ページの `revalidate` 値を根拠なく変更しない」を追加する。
- [`.claude/commands/pre-deploy.md`](../../.claude/commands/pre-deploy.md) の `out/` HTML件数確認を、`.next/` の存在確認とビルド成否に差し替える。

### Firestore読み取りコストの見積もり

- ISR 3ページ × revalidate 3600秒 × 1ページあたり5〜10読み取り = 1時間あたり15〜30読み取り。Firestoreの無料枠50,000読み取り / 日に対して3桁の余裕がある。ただし [ADR-002](./002-hosting-strategy.md) で Blaze プランへの切り替えは別途必要。
- SSG 4ページは再ビルド時のみ読み取りが発生する。デプロイ頻度(月数回) × エントリ数(100件以下)で、月数百読み取り程度に収まる。

### トレードオフ

- ISRページでCloud RunのCold Start(数100 msから数秒)が初回アクセス時に発生する。[ADR-002](./002-hosting-strategy.md) で検討している `min-instances: 1` の設定で緩和できる。
- トラフィックが低い個人サイトではISRの `revalidate` が効きにくく、1時間に1回もアクセスがなければstaleの更新が走らない。管理画面での更新完了時に `revalidatePath()` を手動で呼ぶ補完設計を推奨する。
- `revalidate` の挙動は本番相当環境(Cloud Runまたは `next start`)でしか検証できず、`npm run dev` では常にSSR動作となる。開発時の動作確認とは別物として扱う必要がある。

### マイグレーションの成功基準

- `/talks` と `/`(ISR代表)および `/books`(SSG代表)の3ページで、Firestore連携後の初回HTMLが現状の `data/*.json` 版とbyte-identicalで一致すること。
- `docs/firestore-migration-spec.md` のエントリ数(全292件)がFirestoreへの投入後に各ページの出力件数と一致していること。

## 参考資料

- [ADR-001](./001-why-firestore.md): データストアとしてFirestoreを採用する
- [ADR-002](./002-hosting-strategy.md): Firebase Hosting + Cloud Run構成
- [`docs/isr-migration-impact.md`](../isr-migration-impact.md): 影響範囲分析とページ別推奨の原典
- [`docs/firestore-migration-spec.md`](../firestore-migration-spec.md): データ構造とエントリ数
- [`firebase.json`](../../firebase.json): 既存のキャッシュポリシー
