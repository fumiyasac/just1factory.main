# ADR-001: データストアとしてFirestoreを採用する

## ステータス: 提案(Proposed)

## 日付: 2026-10-11

## コンテキスト(なぜこの決定が必要か)

現状、本サイトのコンテンツは `data/*.json`(5 ファイル)と `components/timeline/data.ts` に TypeScript 配列として保存されており、更新のたびに **git コミット + CI ビルド + Firebase Hosting デプロイ** という開発者フローが必要になる。これはサイトオーナー自身が開発者だから成立しているが、以下 2 点の課題がある。

- **運用の属人化**: コンテンツ追加が常にコードリポジトリ経由となり、将来的に開発者以外(編集補助者等)が触れない
- **即時性の欠如**: 誤字修正や登壇情報の追記のたびに master マージ → 再ビルド待ちが必要。管理画面からの編集 → 即時反映を目指す Phase 3 の目標と不整合

Phase 3 では **コードデプロイなしでコンテンツを更新できる状態** を実現したい。そのための外部データストアを 1 つ選定する必要がある。

関連する前提として、[`docs/firestore-migration-spec.md`](../firestore-migration-spec.md) で全 6 セクション(292 件)のデータ構造と Firestore コレクション設計との突き合わせが完了しており、[`firestore.rules`](../../firestore.rules) で既にセキュリティモデル(read 全員許可 / write は `admins/{uid}` 名簿制)の実装が済んでいる。

## 検討した選択肢

### 選択肢A: Firebase Firestore

NoSQL ドキュメント指向データベース。Firebase エコシステムに統合済み。

### 選択肢B: Supabase

PostgreSQL ベースの BaaS。リレーショナル + リアルタイム + Auth + Storage を提供。

### 選択肢C: PlanetScale

MySQL ベースのサーバーレス DB。スキーマ変更の branching 機能が特徴。

### 選択肢D: Contentful / microCMS 等のヘッドレス CMS

編集 UI 込みの SaaS。コードを書かずにスキーマ定義と編集が可能。

### 選択肢E: JSON ファイル + GitHub API

現状の `data/*.json` を維持し、管理画面から GitHub API 経由でコミット・PR 作成する方式。

### 比較表

| 観点 | A: Firestore | B: Supabase | C: PlanetScale | D: ヘッドレス CMS | E: GitHub API |
|---|---|---|---|---|---|
| 既存 Firebase エコシステムとの親和性 | ◎(同一プロジェクト) | ×(別サービス) | ×(別サービス) | △(連携 OK だが別口) | ○(リポジトリ経由) |
| 個人サイト規模の無料枠 | ◎(1 GB storage / 50 K reads/day) | ◎(500 MB DB / 月 50 K MAU) | ○(5 GB / 10 億 row read/月) | △(microCMS 10 K リクエスト/月) | ◎(GitHub 無料枠内) |
| `firestore-migration-spec.md` のデータ構造との相性 | ◎(そのまま適用) | ○(リレーショナルに正規化必要) | △(スキーマ設計工数) | △(CMS のスキーマ機能に再マッピング) | ◎(現状維持) |
| `firestore.rules` 設計との整合性 | ◎(既に実装済み) | △(RLS で再実装) | △(アプリ層で再実装) | ×(SaaS 側の権限モデル) | ×(GitHub 権限で代替) |
| リアルタイム同期 | ◎(標準機能) | ◎(標準機能) | ×(ポーリング要) | ×(Webhook のみ) | ×(なし) |
| 学習コスト | ○(Admin SDK + ルール記法) | ○(SQL + RLS) | 中(スキーマ branching) | 低(SaaS 操作のみ) | 低(既存知識で可) |
| ベンダーロックイン | 中 | 低(オープンソース PostgreSQL 互換) | 中 | 高 | 低 |
| 管理画面開発コスト | 中(自前実装) | 中(自前実装) | 中(自前実装) | 0(SaaS 標準装備) | 中(自前実装 + Git 操作 UI) |

## 決定

**Firebase Firestore(選択肢A)を採用する。**

ただし本決定は本書の分析に基づく推奨であり、**最終判断はサイトオーナーのレビューを経て行う** 想定。

## 根拠(先行ドキュメントからの具体的な裏付け)

1. **Firebase Hosting / Auth / Storage がすでに同一プロジェクトで利用可能**
   `.firebaserc` の `default: just1factory-main` で単一プロジェクトに統合されており、Firestore を追加するだけで Admin SDK・クライアント SDK・セキュリティルール・ローカル Emulator の 4 つが揃う。他サービスを選ぶと別プロジェクト・別課金・別認証連携のオーバーヘッドが発生する。

2. **データ構造が Firestore 向けに設計済み**
   [`docs/firestore-migration-spec.md`](../firestore-migration-spec.md) にて 6 セクション(292 件)の全フィールドが Firestore コレクション設計にマッピング済み。マイグレーション時のスキーマ書き起こしコストがゼロ。

3. **セキュリティモデルの実装が既に完了**
   [`firestore.rules`](../../firestore.rules) で `isAdmin()` ヘルパー + `admins/{uid}` 名簿制のルールが完成しており、[`docs/firebase-emulator-guide.md`](../firebase-emulator-guide.md) で検証手順も整備済み。他 DB を選ぶとこの資産を破棄して書き直すことになる。

4. **個人サイトの規模感に対するコスト**
   想定アクセス量(月数百 PV・292 件のエントリ)は Firestore 無料枠(1 GB storage / 50 K reads/day / 20 K writes/day)に 2 桁以上の余裕があり、Blaze プラン移行後も実質 $0 で運用できる。

5. **ヘッドレス CMS(選択肢D)は編集 UI が標準装備という魅力があるが、既存の `firestore.rules`・`data/*.json` 構造・ドキュメント一式がすべて再マッピング対象になるため、本プロジェクトのコンテキストでは移行コストが上回る**。将来的に編集補助者を増やす必要が生じた際には再検討候補。

## 影響(この決定によって何が変わるか)

### 肯定的な影響

- `data/*.json` → Firestore 読み出しへの置き換えが、既存の `types/*.ts` + `FirestoreDataConverter<T>` の組み合わせで最小差分で実装可能
- 管理画面(Firebase Auth 連携 + Firestore 書き込み)を同じエコシステム内で構築できるため、認証・権限・デプロイ・課金の管理ポイントが単一化
- Emulator でローカル完結の E2E テストが可能(本番 Firestore に影響なし)

### 否定的な影響・リスク

- **Blaze プラン(従量課金) への移行が必要**(現状 Spark 無料プラン)。Hosting の請求発生リスクはあるが、無料枠超過時のアラート設定で対応
- NoSQL ゆえの **複雑な集計クエリは苦手**。全エントリの横断集計(例: 全セクションを混ぜたタイムライン)はクライアント or Cloud Functions 側で工夫が必要
- インデックスの事前定義が必要([`firestore.indexes.json`](../../firestore.indexes.json) に 3 本定義済み。追加クエリ時は更新忘れに注意)
- **ベンダーロックインが中程度**。将来 Supabase 等へ再移行する際は Admin SDK + Firestore 構造からの一括エクスポート + 再マッピングのスクリプトが必要

### 変更が必要になるファイル(Phase 3 本体フェーズで対応)

- 各 `app/<section>/page.tsx`: `import` を `data/*.json` から Firestore クライアント経由に変更
- 新規 `lib/firestore/converters/*.ts`: `types/*.ts` から導出した `FirestoreDataConverter<T>`
- 新規 `scripts/seed-firestore.ts`: `data/*.json` → Firestore 初期投入(Admin SDK)
- 新規 `app/admin/`: 管理画面(別途 ADR で詳細化予定)

## 参考資料

- [`docs/firestore-migration-spec.md`](../firestore-migration-spec.md): 全セクションのフィールドマッピングと管理画面フォーム案
- [`docs/isr-migration-impact.md`](../isr-migration-impact.md): ホスティング選択との連動分析([ADR-002](./002-hosting-strategy.md) と連携)
- [`docs/firebase-emulator-guide.md`](../firebase-emulator-guide.md): ローカル検証手順
- [`firestore.rules`](../../firestore.rules): セキュリティルール
- [`firestore.indexes.json`](../../firestore.indexes.json): 複合インデックス定義
- [`docs/FIREBASE_CMS_DESIGN.md`](../FIREBASE_CMS_DESIGN.md): 初期のコレクション設計たたき台
