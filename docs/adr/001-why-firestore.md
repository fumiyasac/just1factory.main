# ADR-001: データストアとしてFirestoreを採用する

## ステータス

提案(Proposed) / 2026-10-11起票。本書は分析に基づく推奨を提示するに留まり、採否はサイトオーナーのレビューで確定する。

## コンテキスト

本サイトのコンテンツは `data/*.json`(5ファイル)と `components/timeline/data.ts` にTypeScript配列として保存している。更新のたびにgitコミット・CIビルド・Firebase Hostingデプロイを踏む構成で、サイトオーナー自身が開発者である今は成立しているものの、以下の課題を抱える。

- **運用が属人化している**: コンテンツ追加がリポジトリ経由に固定されており、将来的に開発者以外が触れる余地がない。
- **反映が即時でない**: 誤字修正や登壇情報の追記ごとにmasterマージと再ビルドを待つ必要がある。管理画面から編集して即時反映することを目指すPhase 3の方針と整合しない。

Phase 3ではコードデプロイを介さずにコンテンツを更新できる状態を実現する。本ADRでは、そのための外部データストアを1つ選定する。

前提として、[`docs/firestore-migration-spec.md`](../firestore-migration-spec.md) で全6セクション(292件)のデータ構造とFirestoreコレクション設計の突き合わせを完了しており、[`firestore.rules`](../../firestore.rules) でセキュリティモデル(readは全員許可、writeは `admins/{uid}` 名簿制)まで実装している。

## 検討した選択肢

### Firebase Firestore

NoSQLドキュメント指向データベース。Firebaseエコシステムに統合済み。

### Supabase

PostgreSQLベースのBaaS。リレーショナル・リアルタイム・Auth・Storageを単一の管理コンソールで扱える。

### PlanetScale

MySQLベースのサーバーレスDB。スキーマ変更のbranching機能を売りにしている。

### Contentful / microCMS などのヘッドレスCMS

編集UI込みのSaaS。コードを書かずにスキーマ定義と記事編集ができる。

### JSONファイル + GitHub API

現状の `data/*.json` を維持し、管理画面からGitHub API経由でコミット・PRを作成する方式。

### 比較表

| 観点 | Firestore | Supabase | PlanetScale | ヘッドレスCMS | GitHub API |
|---|---|---|---|---|---|
| 既存Firebase環境との親和性 | ◎(同一プロジェクト) | ×(別サービス) | ×(別サービス) | △(連携可だが別口) | ○(リポジトリ経由) |
| 個人サイト規模の無料枠 | ◎(1 GB storage / 50 K reads/day) | ◎(500 MB DB / 月50 K MAU) | ○(5 GB / 10億row read/月) | △(microCMS 10 Kリクエスト/月) | ◎(GitHub無料枠内) |
| `firestore-migration-spec.md` との整合 | ◎(そのまま適用) | ○(リレーショナルに正規化必要) | △(スキーマ設計工数) | △(CMSスキーマへ再マッピング) | ◎(現状維持) |
| `firestore.rules` 設計との整合 | ◎(実装済み) | △(RLSで再実装) | △(アプリ層で再実装) | ×(SaaS側の権限モデル) | ×(GitHub権限で代替) |
| リアルタイム同期 | ◎ | ◎ | ×(ポーリング要) | ×(Webhookのみ) | × |
| 学習コスト | ○(Admin SDK + ルール記法) | ○(SQL + RLS) | 中(スキーマbranching) | 低(SaaS操作のみ) | 低(既存知識) |
| ベンダーロックイン | 中 | 低(PostgreSQL互換) | 中 | 高 | 低 |
| 管理画面の開発コスト | 中(自前実装) | 中(自前実装) | 中(自前実装) | ゼロ(SaaS標準装備) | 中(自前実装 + Git操作UI) |

## 決定

Firebase Firestoreを採用する。

## 根拠

1. **Firebase Hosting / Auth / Storageを同一プロジェクトでそのまま使える**
   `.firebaserc` の `default: just1factory-main` に統合済みで、Firestoreを追加すればAdmin SDK・クライアントSDK・セキュリティルール・ローカルEmulatorの4つが即座に揃う。他サービスを選ぶと別プロジェクト・別課金・別認証連携の管理コストが追加で発生する。

2. **データ構造の設計が既にFirestore寄り**
   [`docs/firestore-migration-spec.md`](../firestore-migration-spec.md) で6セクション(292件)の全フィールドをFirestoreコレクション設計にマッピング済み。移行時にスキーマを書き起こす工程を省ける。

3. **セキュリティモデルの実装が完了している**
   [`firestore.rules`](../../firestore.rules) に `isAdmin()` ヘルパーと `admins/{uid}` 名簿制のルールが揃っており、[`docs/firebase-emulator-guide.md`](../firebase-emulator-guide.md) で検証手順も整備済み。他のDBを選ぶとこの資産を破棄して書き直すことになる。

4. **想定規模に対して無料枠に充分な余裕がある**
   月数百PV・292件のエントリ規模では、Firestoreの無料枠(1 GB storage / 50 K reads/day / 20 K writes/day)に2桁以上の余裕がある。Blazeプラン移行後も実質的な新規コストは発生しない見込み。

5. **ヘッドレスCMSは編集UIを標準装備している点が強みだが、既存の `firestore.rules`・`data/*.json` 構造・設計ドキュメント一式を再マッピングする必要があり、本プロジェクトでは移行コストが上回る**。将来的に編集補助者を増やす必要が生じた段階で再検討する。

## 影響

### 得られるもの

- `data/*.json` からFirestore読み出しへの置き換えが、既存の `types/*.ts` と `FirestoreDataConverter<T>` の組み合わせで最小差分で実装できる。
- 管理画面(Firebase Auth連携 + Firestore書き込み)を同じエコシステム内で構築できるため、認証・権限・デプロイ・課金の管理ポイントが1つにまとまる。
- Emulatorで本番Firestoreに影響させずにE2Eテストを完結できる。

### トレードオフ

- Blazeプラン(従量課金)への切り替えが必要になる。Hostingで想定外の請求が発生するリスクには、無料枠超過時のアラート設定で備える。
- NoSQL特有の集計クエリの弱さが残る。全エントリをまたぐ横断集計(例: 全セクションを混ぜたタイムライン)はクライアント側またはCloud Functions側で補う。
- 複合クエリにはインデックスの事前定義が必要になる。[`firestore.indexes.json`](../../firestore.indexes.json) に現時点で3本定義済み。クエリを追加する際は更新を忘れないよう運用で担保する。
- ベンダーロックインは中程度残る。将来SupabaseなどへAdmin SDK経由で再移行する余地は残すが、エクスポートと再マッピングのスクリプトは別途必要になる。

### Phase 3本体で発生する作業

- 各 `app/<section>/page.tsx` の `import` を `data/*.json` からFirestoreクライアント経由に差し替える。
- `lib/firestore/converters/*.ts` を新設し、`types/*.ts` から導出した `FirestoreDataConverter<T>` を配置する。
- `scripts/seed-firestore.ts` を追加し、`data/*.json` の内容をAdmin SDKでFirestoreへ初期投入する。
- `app/admin/` 以下に管理画面を実装する(詳細は別ADRで扱う想定)。

## 参考資料

- [`docs/firestore-migration-spec.md`](../firestore-migration-spec.md): 全セクションのフィールドマッピングと管理画面フォーム案
- [`docs/isr-migration-impact.md`](../isr-migration-impact.md): ホスティング選択との連動分析([ADR-002](./002-hosting-strategy.md) と連携)
- [`docs/firebase-emulator-guide.md`](../firebase-emulator-guide.md): ローカル検証手順
- [`firestore.rules`](../../firestore.rules): セキュリティルール
- [`firestore.indexes.json`](../../firestore.indexes.json): 複合インデックス定義
- [`docs/FIREBASE_CMS_DESIGN.md`](../FIREBASE_CMS_DESIGN.md): 初期のコレクション設計たたき台
