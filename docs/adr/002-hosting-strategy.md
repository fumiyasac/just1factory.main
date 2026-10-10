# ADR-002: ホスティング戦略を決定する

## ステータス

提案(Proposed) / 2026-10-11起票。本書は分析に基づく推奨を提示するに留まり、採否はサイトオーナーのレビューで確定する。

## コンテキスト

[ADR-001](./001-why-firestore.md) でFirestore採用を決めたことで、ビルド時あるいはリクエスト時にFirestoreからデータを取得する構成へ移行する前提ができた。これに伴い `next.config.ts` の `output: "export"` を外す必要があり、現在の「静的HTMLをFirebase Hostingから配信する」運用モデルでは対応できなくなる(静的エクスポートではISRのようなリクエスト時レンダリングが動かないため)。

[`docs/isr-migration-impact.md`](../isr-migration-impact.md) にビルド出力・ページ別戦略・ホスティング・CI/CD・Claude設定の5系統で影響範囲を整理済み。本ADRでは、このうちホスティング先を1つに絞る。

## 検討した選択肢

[`docs/isr-migration-impact.md`](../isr-migration-impact.md) 「ホスティング先の比較」の3候補に加え、Cloud Runを単体で使う構成を加えた4パターンを比較する。

### Firebase Hosting + Cloud Functions for Firebase

Firebaseエコシステムで完結させる構成。Next.js SSRアダプタ(例: Firebase Extensionsの `nextjs` extension)を介してCloud FunctionsでNext.jsサーバーを動かし、Hostingの `rewrites` で振り分ける。

### Firebase Hosting + Cloud Run

FirebaseとGCPを併用する構成。Next.jsをDockerfileでコンテナ化してCloud Runにデプロイし、Hostingの `rewrites` で動的HTMLをCloud Runへ振り分ける。静的アセットは引き続きFirebase Hostingから配信する。

### Vercel に完全移行

Next.js純正ホスティング。`vercel.json` で設定を書き直し、Firebase HostingからVercelへ全移管する。FirestoreはSDK経由で引き続き利用する。

### Cloud Run 単独(Firebase Hosting を使わない)

Cloud RunにNext.jsサーバーを置き、静的アセットもCloud Runから配信する。Firebase Hostingを使わないため `firebase.json` のheaders資産は破棄することになる。

### 比較表

| 観点 | Firebase + Functions | **Firebase + Cloud Run** | Vercel | Cloud Run単独 |
|---|---|---|---|---|
| Next.js ISR / SSGサポート | △(アダプタ経由、公式サポート弱) | **○(標準runtimeをコンテナ化、安定稼働)** | ◎(純正サポート) | ○(標準runtime) |
| 現在の構成からの移行コスト | 中(Functions実装 + rewrites) | **中(Dockerfile + Cloud Build CI + rewrites)** | 高(Firebaseから全移管、OGPや解析の再設定が発生) | 中(静的配信もCloud Runに乗せるぶん手間増) |
| `firebase.json` headers維持 | ◎(静的アセットは従来通り) | **◎(静的アセットは従来通り)** | ×(`vercel.json` に書き直し) | ×(Cloud Run側で再定義) |
| Cold Start | あり(Functionsの冷起動) | **あり(min-instancesで緩和可、課金増)** | なし(Edge Network) | あり |
| 料金(月数百PV規模) | Blaze必須(従量) | **Blaze + Cloud Run従量(無料枠180 K vCPU秒 / 月)** | Hobby無料枠は商用不可 / Pro $20/月 | Cloud Run従量のみ |
| Firestoreとの親和性 | ◎(同一プロジェクト) | **◎(同じGCPプロジェクト、サービスアカウント連携容易)** | ○(SDKは使えるがIAM分離) | ◎(同じGCPプロジェクト) |
| Preview Channels | ◎(現行維持) | **◎(現行維持)** | ◎(Vercel Preview Deployments) | △(自前構築またはCloud Runリビジョンタグで代替) |
| CI / CDの変更量 | 中(Functions deploy) | **中(Cloud Build + Hosting deployの2本立て)** | 小(workflow不要、Vercelが担当) | 中(Cloud Build + 独自配信) |
| Edge / グローバル配信 | △(Functionsはregion固定) | **○(Cloud Run multi-region構成可)** | ◎(Edge Functions) | ○(multi-region可) |
| ベンダーロックイン | 中(Firebase + Functions) | **中(Firebase + GCPでGCP系に収まる)** | 中(Vercel固有機能に依存すると高) | 低(GCPのみ) |

## 決定

Firebase Hosting + Cloud Runを採用する。

## 根拠

1. **`firebase.json` の資産を破棄しない**
   現状の [`firebase.json`](../../firebase.json) はhostingの `headers` セクションにキャッシュポリシー4群とセキュリティヘッダー1群の計6ブロックを精緻に定義している。静的アセット(JS / CSS / 画像 / フォント / robots / sitemap)はFirebase HostingのCDNから引き続き直接配信し、動的HTMLレスポンスのみ `rewrites` でCloud Runへ振り分けるハイブリッド構成を取れば、このキャッシュ戦略をそのまま維持できる。Vercelへ全移管すると同等の設定を `vercel.json` に書き直すことになり、キャッシュ検証のコストが追加で発生する。

2. **ADR-001で選んだFirestoreとの親和性**
   Cloud Runは同じGCPプロジェクト(`just1factory-main`)の中で動作し、サービスアカウント経由でFirestore Admin SDKを鍵の持ち出しなしで利用できる。VercelからFirestoreを叩く場合はサービスアカウント鍵を環境変数で持たせる必要があり、鍵ローテーションの運用コストが増える。

3. **Next.js ISRが公式サポートどおりに動く**
   [`docs/isr-migration-impact.md`](../isr-migration-impact.md) ではCloud FunctionsのISRサポートがNext.jsアダプタの対応遅延で限定的と評価している。Cloud RunはNext.js公式のDockerイメージをそのまま動かすため、`revalidate` を含むISRが公式仕様どおりに動く。

4. **Firebase Preview Channelsを継続利用できる**
   PRごとのプレビュー運用はFirebase HostingのPreview Channelsで既に設計している(現在は手動運用、将来 `deploy-preview.yml` で自動化予定)。Cloud Runのリビジョン運用と組み合わせることでPreview URLを発行できる。VercelのPreview Deploymentsは単独では優れているが、既存のFirebase側運用との二重管理になる。

5. **運用コマンドの変化が最小限で済む**
   `firebase deploy --only hosting` のコマンドは据え置きのまま、`gcloud run deploy` が1つ増えるだけ。既にFirebase CLIを中心にした運用に慣れている現状の知識が引き続き使える。

## 影響

### 追加されるもの

- `Dockerfile`(リポジトリルート): Next.jsをCloud Runで動かすためのコンテナ定義。
- `.github/workflows/deploy-production.yml`: masterマージ時にCloud Build → Cloud Run deploy → Firebase Hosting deployの2段で動かすワークフロー。
- `.github/workflows/deploy-preview.yml`: PRごとにCloud Runプレビューリビジョン + Firebase Hosting Preview Channelをセットでデプロイし、URLをPRにコメントするワークフロー。
- `firebase.json` の `hosting.rewrites`: 動的HTMLをCloud Runに振り分ける設定を追記する。

### 変更されるもの

- `next.config.ts` の `output: "export"` を削除する(具体の実施は [ADR-003](./003-isr-migration.md) で扱う)。
- `CLAUDE.md` のDo NOTから「`output: 'export'` を外さない」を削除する。
- `.claude/skills/firebase-deploy/SKILL.md` のビルド出力ディレクトリの記述を更新し、Cloud Runデプロイ手順を追加する。
- `README.md` のTech StackのHosting行を「Firebase Hosting + Cloud Run」に、PrerequisitesにDockerとgcloud CLIを追記する。

### 課金面

- Blazeプランへの切り替えが必要になる(SparkではCloud FunctionsとCloud Runへの接続および外部egressが制限されるため)。
- 月数百PV規模ではCloud Runの無料枠(月180,000 vCPU秒・2 Mリクエスト)に2桁以上の余裕があり、実質的な新規コストは発生しない見込み。
- 無料枠超過時のアラートをFirebase ConsoleおよびGCPの予算アラートで設定して備える。

### トレードオフ

- Cold Startが数100 msから数秒の範囲で発生する。トップページを含む低トラフィック時間帯の初回アクセスで体感される可能性がある。緩和策として `min-instances: 1` を設定できるが、月数ドルの追加課金が発生する。
- CIにDockerビルドの工程が加わり、所要時間が現状の2〜3分から5〜7分程度に伸びる。
- 運用対象のシステムがHosting / Cloud Run / Firestore / Authの4系統に増える。

## 参考資料

- [ADR-001](./001-why-firestore.md): データストアとしてFirestoreを採用する決定
- [ADR-003](./003-isr-migration.md): ISR/SSG切り替えの方針(本ADRの決定を前提に、ページ別のレンダリング戦略を定める)
- [`docs/isr-migration-impact.md`](../isr-migration-impact.md): 影響範囲分析の全体像
- [`firebase.json`](../../firebase.json): 現在のHosting設定
