# Firebase Emulator テストガイド

Firestore セキュリティルール (`firestore.rules`) と管理者判定ロジックを本番 Firebase プロジェクトに影響させずに検証するための手順をまとめる。Phase 3 の管理画面実装・ルール変更のレビュー時にローカルで使う前提。

関連:
- `firestore.rules` — 本書のテスト対象ルール
- `firestore.indexes.json` — Emulator はインデックスを自動付与するため検証不要
- `firebase.json` の `emulators` セクション — ポート指定（Firestore `:8080` / Auth `:9099` / UI `:4000`）

## 1. 必要なツール

| ツール | 用途 | 推奨バージョン |
|---|---|---|
| Node.js | Firebase CLI の実行 | **22.x**（本プロジェクトの `.nvmrc` と同じ） |
| Firebase CLI | Emulator 起動・Rules 検証 | 13.0.0 以上 |
| Java 11+ | Firestore Emulator の内部で必要 | OpenJDK 17 推奨 |

### インストール

```bash
# Firebase CLI (未インストールの場合)
npm install -g firebase-tools

# バージョン確認
firebase --version        # 13.x 以上であること
java -version             # 11 以上であること

# 本プロジェクトディレクトリで Firebase CLI にログイン (初回のみ)
firebase login
```

## 2. エミュレータの起動

プロジェクトルートで以下を実行する。Firestore / Auth / UI の 3 つが同時起動する。

```bash
firebase emulators:start
```

起動すると次のようなログが出る。

```
┌─────────────────────────────────────────────────────────────┐
│ ✔  All emulators ready! It is now safe to connect your app. │
│ i  View Emulator UI at http://localhost:4000                │
└─────────────────────────────────────────────────────────────┘

┌───────────┬────────────────┬─────────────────────────────────┐
│ Emulator  │ Host:Port      │ View in Emulator UI             │
├───────────┼────────────────┼─────────────────────────────────┤
│ Auth      │ localhost:9099 │ http://localhost:4000/auth      │
│ Firestore │ localhost:8080 │ http://localhost:4000/firestore │
└───────────┴────────────────┴─────────────────────────────────┘
```

### Emulator UI へのアクセス

ブラウザで **http://localhost:4000** を開くと、Firestore ドキュメントの CRUD と Auth のテストユーザー管理を GUI で行える。

- **Firestore タブ** (http://localhost:4000/firestore): コレクション/ドキュメントの閲覧・編集・ルール逆引き
- **Auth タブ** (http://localhost:4000/auth): テストユーザーの追加・UID 確認

### 停止

ターミナルで `Ctrl + C`。Emulator のデータはデフォルトで揮発性（再起動で消える）。永続化したい場合は `firebase emulators:start --export-on-exit=.emulator-data --import=.emulator-data` を使う（`.emulator-data` は `.gitignore` 対象）。

## 3. Firestore ルールのテスト

### 3-A. 準備：テストユーザーを 2 人作る

Emulator UI の Auth タブで以下 2 人を追加：

| 用途 | Email | Password | UID（追加後に表示される） |
|---|---|---|---|
| 管理者 | `admin@example.com` | `password123` | 例: `AbCd1234...` |
| 一般ユーザー | `guest@example.com` | `password123` | 例: `WxYz5678...` |

管理者の UID をメモしておく。

### 3-B. 管理者 UID を admins コレクションに登録

Firestore タブで **`admins` コレクションを新規作成** → ドキュメント ID に管理者の UID を指定して空ドキュメントを追加。

```
admins/
  └── {管理者のUID}      ← ドキュメント ID = UID。中身は空でよい（存在チェックのみ）
```

### 3-C. シナリオ別の確認

Emulator UI の Firestore タブ（右上の「Rules Playground」ではなく「Run queries as」機能）または、ブラウザコンソールで Firebase SDK を初期化してテストする。

#### シナリオ 1: 未認証ユーザーの read（期待：許可）

```
認証状態: Unauthenticated
操作:     get /talks/talk-001
期待:     ✅ 許可（allow read: if true）
```

Emulator UI の `talks` コレクションにサンプルドキュメントを 1 件入れて、未認証状態で開けることを確認。

#### シナリオ 2: 未認証ユーザーの write（期待：拒否）

```
認証状態: Unauthenticated
操作:     set /talks/talk-001 { title: "test" }
期待:     ❌ 拒否（isAdmin() が false）
```

#### シナリオ 3: 認証済み一般ユーザーの write（期待：拒否）

```
認証状態: guest@example.com (admins に登録なし)
操作:     set /talks/talk-001 { title: "test" }
期待:     ❌ 拒否（exists(admins/{uid}) が false）
```

#### シナリオ 4: 認証済み管理者の write（期待：許可）

```
認証状態: admin@example.com (admins に登録済み)
操作:     set /talks/talk-001 { title: "test" }
期待:     ✅ 許可
```

#### シナリオ 5: 他人の admins ドキュメント read（期待：拒否）

```
認証状態: guest@example.com
操作:     get /admins/{管理者のUID}
期待:     ❌ 拒否（admins への read は管理者のみ）
```

### 3-D. CLI でまとめて検証（任意）

`@firebase/rules-unit-testing` を使ったユニットテストに統合する場合の最小例：

```ts
// scripts/test-firestore-rules.ts (将来追加予定)
import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import fs from "node:fs";

const env = await initializeTestEnvironment({
  projectId: "just1factory-main-test",
  firestore: {
    rules: fs.readFileSync("firestore.rules", "utf8"),
    host: "localhost",
    port: 8080,
  },
});

const unauth = env.unauthenticatedContext().firestore();
await assertSucceeds(unauth.collection("talks").doc("talk-001").get()); // read OK
await assertFails(unauth.collection("talks").doc("talk-001").set({ title: "x" })); // write NG
```

本格的な CI 連携は Phase 3 の実装フェーズで検討する。

## 4. 実装側（Next.js）から Emulator に接続する手順

将来、`app/` 側で Firestore 読み書きを実装する際、ローカル開発では以下の環境変数で Emulator に接続する想定。

```bash
# .env.local (git ignore 対象)
NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST=localhost:8080
NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_URL=http://localhost:9099
```

Firebase SDK の初期化コードで上記を参照し、Emulator が起動していれば自動接続するガードを入れる。本番ではこれらが未設定 → 本番 Firestore に接続。

## 5. トラブルシューティング

| 症状 | 対処 |
|---|---|
| `java: command not found` | OpenJDK 17 を brew install openjdk@17 等でインストール |
| `Port 8080 is not open` | 既に起動しているプロセスを `lsof -i :8080` で確認して停止 |
| ルール変更が反映されない | Emulator を再起動（`firestore.rules` は hot reload されるが稀に反映漏れ） |
| 本番 Firestore が汚れた | `firebase emulators:start` に `--project demo-xxx` を付けて、デモプロジェクトで隔離 |
| インデックス不足エラー | `firestore.indexes.json` に追加 → `firebase deploy --only firestore:indexes` |

## 6. 本番反映の手順（参考）

本書はテスト手順書なので手順のみ記載。実行は別途 ADR で決定後に行う。

```bash
# ルールだけ本番に反映
firebase deploy --only firestore:rules

# インデックスだけ本番に反映
firebase deploy --only firestore:indexes

# 両方まとめて
firebase deploy --only firestore
```

**初回の管理者 UID 登録はコードで配布できない**ので、本番の Firebase Console から **手動で `admins/{UID}` ドキュメントを作成** する必要がある（chicken-and-egg 問題）。
