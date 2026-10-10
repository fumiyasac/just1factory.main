# ADR-002: ホスティング戦略を決定する

## ステータス: 提案(Proposed)

## 日付: 2026-10-11

## コンテキスト(なぜこの決定が必要か)

[ADR-001](./001-why-firestore.md) で Firestore 採用を決めたことに続き、Firestore からリクエスト時またはビルド時にデータを取得する構成への移行を計画している。この際に **`next.config.ts` の `output: "export"` を外す必要があり**、現在の「静的 HTML を Firebase Hosting から配信する」モデルでは対応できなくなる(ISR 等のリクエスト時レンダリングは静的エクスポートでは動かない)。

[`docs/isr-migration-impact.md`](../isr-migration-impact.md) に 5 系統(ビルド出力・ページ別戦略・ホスティング・CI/CD・Claude 設定)の影響範囲を既に整理済み。本 ADR では、その中の **ホスティング先** を 1 つに絞り込む意思決定を行う。

## 検討した選択肢

[`docs/isr-migration-impact.md`](../isr-migration-impact.md) 「ホスティング先の比較」セクションの 3 候補に加え、構成バリエーションを 4 つ列挙する。

### 選択肢A: Firebase Hosting + Cloud Functions for Firebase

Firebase エコシステム完結。Next.js SSR アダプタ(例: Firebase Extensions の `nextjs` extension)を介して Cloud Functions で Next.js サーバーを動かし、Hosting の `rewrites` で振り分ける。

### 選択肢B: Firebase Hosting + Cloud Run

Firebase エコシステム + GCP 併用。Next.js を Dockerfile でコンテナ化し Cloud Run にデプロイ、Hosting の `rewrites` で振り分け。静的アセットは Firebase Hosting から配信。

### 選択肢C: Vercel に完全移行

Next.js 純正ホスティング。`vercel.json` で設定を書き直し、Firebase Hosting から Vercel へ全移管。Firestore は SDK 経由で引き続き利用。

### 選択肢D: Cloud Run 単独(Firebase Hosting を使わない)

Cloud Run に Next.js サーバーを置き、静的アセットも Cloud Run から配信。Firebase Hosting を使わないため `firebase.json` の headers 資産は捨てる。

### 比較表(`docs/isr-migration-impact.md` の分析を転載 + 選択肢Dを追記)

| 観点 | A: Firebase + Functions | **B: Firebase + Cloud Run** | C: Vercel | D: Cloud Run 単独 |
|---|---|---|---|---|
| Next.js ISR/SSG サポート | △(アダプタ経由、公式サポート弱) | **○(標準 runtime をコンテナ化、安定稼働)** | ◎(純正サポート) | ○(標準 runtime) |
| 現在の構成からの移行コスト | 中(Functions 実装 + rewrites) | **中(Dockerfile + Cloud Build CI + rewrites)** | 高(Firebase から全移管、OGP・解析再設定) | 中(静的配信も含めて Cloud Run に移すぶん手間増) |
| `firebase.json` headers 維持 | ◎(静的アセットは従来通り) | **◎(静的アセットは従来通り)** | ×(`vercel.json` に書き直し) | ×(Cloud Run 側で再定義) |
| Cold Start | あり(Functions の冷起動) | **あり(min-instances で緩和可、課金増)** | なし(Edge Network) | あり |
| 料金(月数百 PV 規模) | Blaze 必須(従量) | **Blaze + Cloud Run 従量(無料枠 180 K vCPU 秒 / 月)** | Hobby 無料枠は商用不可 / Pro $20/月 | Cloud Run 従量のみ |
| Firestore との親和性 | ◎(同一プロジェクト) | **◎(同じ GCP プロジェクト、SA 連携容易)** | ○(SDK は使えるが IAM 分離) | ◎(同じ GCP プロジェクト) |
| Preview Channels | ◎(現行維持) | **◎(現行維持)** | ◎(Vercel Preview Deployments) | △(自前構築 or 複数 Cloud Run リビジョンタグ) |
| CI/CD の変更量 | 中(Functions deploy) | **中(Cloud Build + Hosting deploy の 2 本立て)** | 小(workflow 不要、Vercel が担当) | 中(Cloud Build + 独自配信) |
| Edge / グローバル配信 | △(Functions は region 固定) | **○(Cloud Run multi-region 構成可)** | ◎(Edge Functions) | ○(multi-region 可) |
| ベンダーロックイン | 中(Firebase + Functions) | **中(Firebase + GCP。両方とも GCP 系で分離容易)** | 中(Vercel 固有機能に依存すると高) | 低(GCP のみ) |

## 決定

**選択肢B「Firebase Hosting + Cloud Run」を採用する。**

ただし本決定は本書の分析に基づく推奨であり、**最終判断はサイトオーナーのレビューを経て行う** 想定。

## 根拠(先行ドキュメントからの具体的な裏付け)

1. **`firebase.json` の資産を破棄しない**
   現状の [`firebase.json`](../../firebase.json) には hosting の `headers` セクションに **キャッシュポリシー 4 群 + セキュリティヘッダー 1 群の計 6 ブロック** が精緻に定義済み。静的アセット(JS/CSS/画像/フォント/robots/sitemap)は引き続き Firebase Hosting の CDN から直接配信し、動的 HTML レスポンスのみ `rewrites` で Cloud Run に振り分けるハイブリッド構成を取ることで、キャッシュ戦略の資産を 100% 維持できる。選択肢C(Vercel)はこれを全部書き直すコストが上回る。

2. **ADR-001 で選んだ Firestore との親和性**
   Cloud Run は同じ GCP プロジェクト(`just1factory-main`)配下で動作し、サービスアカウント経由で Firestore Admin SDK を認証なしで利用できる。Vercel から Firestore を叩く場合はサービスアカウント鍵の環境変数管理が必要で、鍵ローテーション運用が増える。

3. **Next.js ISR の安定稼働**
   [`docs/isr-migration-impact.md`](../isr-migration-impact.md) で選択肢A(Cloud Functions)は Next.js アダプタの対応遅延で ISR サポートが限定的と評価。Cloud Run は Next.js 公式 Docker イメージをそのまま動かすため、ISR の `revalidate` が公式サポートどおりに動く。

4. **Firebase Preview Channels が維持できる**
   PR ごとのプレビュー運用は Hosting の Preview Channels で既に設計されており(現在は手動運用、将来の `deploy-preview.yml` で自動化予定)、Cloud Run のリビジョン運用と組み合わせて Preview URL を発行できる。Vercel の Preview Deployments は便利だが、既存の Firebase 側運用との二重管理になる。

5. **移行後の運用変化が最小**
   `firebase deploy --only hosting` のコマンドは据え置き、`gcloud run deploy` が増えるのみ。チームの運用知識(Firebase CLI 中心)の継続性が確保できる。

## 影響(この決定によって何が変わるか)

### 追加される要素

- **Dockerfile** (リポジトリルート): Next.js を Cloud Run で動かすためのコンテナ定義
- **`.github/workflows/deploy-production.yml`**: master マージ時に Cloud Build → Cloud Run deploy → Firebase Hosting deploy の 2 ステップ
- **`.github/workflows/deploy-preview.yml`**: PR ごとに Cloud Run プレビュー リビジョン + Firebase Hosting Preview Channel をセットでデプロイし、PR に URL をコメント
- **`firebase.json` の `hosting.rewrites`**: 動的 HTML を Cloud Run に振り分ける設定を追記

### 変更される要素

- **`next.config.ts`**: `output: "export"` の削除([ADR-003](./003-isr-migration.md) で実施)
- **`CLAUDE.md`**: 「Do NOT: `output: 'export'` を外さない」ルールの削除
- **`.claude/skills/firebase-deploy/SKILL.md`**: ビルド出力ディレクトリの記述を更新、Cloud Run デプロイ手順を追加
- **`README.md`**: Tech Stack の Hosting 行を「Firebase Hosting + Cloud Run」に、Prerequisites に Docker / gcloud CLI を追記

### 課金面

- **Blaze プランへの切り替え必須**(Spark では Cloud Functions / Cloud Run への接続と外部 egress が制限される)
- 想定アクセス量(月数百 PV)では Cloud Run 無料枠(月 180,000 vCPU 秒・2 M リクエスト)に 2 桁以上の余裕があり、実質的な新規発生コストは $0 想定
- 無料枠超過時のアラート を Firebase Console / GCP の予算アラートで設定する

### 否定的な影響・リスク

- **Cold Start が発生**(数 100 ms〜数秒)。トップページを含む低トラフィック時間帯の初回アクセスで体感可能
  - 緩和策: `min-instances: 1` を設定(ただし月数ドル追加課金)
- **Docker ビルド工程が CI に加わり CI 時間が延びる**(現状 2〜3 分 → 推定 5〜7 分)
- **運用対象システム数が増える**(Hosting + Cloud Run + Firestore + Auth の 4 系統)

## 参考資料

- [ADR-001](./001-why-firestore.md): データストアとして Firestore を採用する決定
- [ADR-003](./003-isr-migration.md): ISR/SSG 切り替えの方針(本 ADR の決定を前提に、ページ別のレンダリング戦略を定める)
- [`docs/isr-migration-impact.md`](../isr-migration-impact.md): 影響範囲分析の全体像
- [`firebase.json`](../../firebase.json): 現在の Hosting 設定
