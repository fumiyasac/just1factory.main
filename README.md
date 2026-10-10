# Just1factory Official Website

酒井文也(fumiyasac)のポートフォリオサイトのソースコード。経歴・書籍・登壇・寄稿・デザイン制作物・個人開発リポジトリを1つのサイトに集約し、Next.js 16の静的エクスポートでFirebase Hostingに配信している。

🔗 公開URL: **<https://just1factory.net>**

## About

Web制作・サーバーサイド・iOS・Android・Flutter・技術書執筆・登壇・コミュニティ運営へと領域を広げてきた記録を、1ページ1分野の構成でアーカイブ化する目的で運用している。元Nuxt.js 2(Vue 2)製だったが、デザインを維持したままNext.js 16(App Router / React 19)に段階移行済み。移行期の詳細な記録は [`PROGRESS.md`](./PROGRESS.md) を参照。

<!-- AUTO-GENERATED-START -->
<!-- このセクションはreadme-updater Subagentが自動生成しています。手動で編集しないでください。 -->
<!-- 最終更新: 2026-10-10 -->

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16.3.8 (App Router, Static Export) |
| Language | TypeScript 5 / React 19.3.0 |
| CSS | Bootstrap 4.6 + Font Awesome 4.7(いずれもバージョン固定) |
| Node | 22.x(`.nvmrc`) |
| Hosting | Firebase Hosting(プロジェクト: `just1factory-main`) |

## Pages

| Page | Path | Description |
|---|---|---|
| Home | `/` | トップページ(Message / RecentActivity / Developer's Profile / Social / Information) |
| Books | `/books` | 技術書6冊のアーカイブ(発行日降順) |
| Talks & Articles | `/talks` | 登壇資料・技術記事176本をカテゴリー×年のフィルターで探索 |
| Design | `/design` | 技書博チラシ8件 + 親方Project寄稿2件のデザイン制作一覧 |
| Manuscript & Writings | `/manuscript` | iOSDCパンフレット原稿8 + 書籍寄稿11 + 翻訳レビュー2 + DroidKaigi Contribution 18 + テックブログ15 + 自筆ノート9 |
| Development Showcase | `/showcase` | GitHub公開リポジトリ27件 + 技術書同人誌博覧会公式サイト運用保守の記録 |
| Career Timeline | `/timeline` | 2003年〜2025年のキャリア年表 全17章 |

**Total: 7 pages**

<!-- AUTO-GENERATED-END -->

## Project Structure

```
.
├─ app/                 App Router の各ページ(各 page.tsx + layout.tsx)
│  ├─ layout.tsx        共通レイアウト + metadata + スキップナビ + ScrollToTop
│  ├─ page.tsx          Home
│  ├─ books/            books ページ(data/books.json を参照)
│  ├─ talks/            talks ページ
│  ├─ design/           design ページ
│  ├─ manuscript/       manuscript ページ
│  ├─ showcase/         showcase ページ
│  ├─ timeline/         timeline ページ
│  ├─ not-found.tsx     カスタム 404
│  ├─ robots.ts         robots.txt の静的生成
│  ├─ sitemap.ts        sitemap.xml の静的生成(force-static)
│  └─ globals.css       プロジェクト独自の CSS 集約点
├─ components/          セクション単位のコンポーネント
│  ├─ global/           NavigationBar / FooterBar / ScrollToTop / JsonLd
│  ├─ index/            Home セクション群(Message / RecentActivity 等)
│  └─ <section>/        books / talks / design / manuscript / showcase / timeline
├─ data/                コンテンツデータの JSON(5 ファイル、計 292 件)
├─ types/               TypeScript の型定義(5 ファイル、data/*.json と対応)
├─ public/              静的アセット(design/ books/ summaries/ などサブディレクトリ分割)
├─ .github/workflows/   GitHub Actions(現在は ci.yml のみ)
├─ .claude/             Claude Code の設定(skills / agents / commands)
├─ docs/                設計・運用ドキュメント(ROADMAP / Firestore 移行計画 等)
├─ firestore.rules      Firestore セキュリティルール(Phase 3 準備)
├─ firestore.indexes.json  Firestore 複合インデックス定義
├─ firebase.json        Firebase Hosting / Firestore / Emulator 設定
├─ next.config.ts       Next.js 設定(output: 'export' / trailingSlash)
└─ CLAUDE.md            Claude Code 向けのプロジェクト指針
```

## Architecture

- **完全静的サイト**: `next.config.ts` の `output: 'export'` で `out/` ディレクトリに静的HTMLを書き出し、Firebase Hostingから配信する構成。API Route・Server Action・ランタイムfetchなどサーバーサイド処理は現時点でゼロ。
- **データとビューの分離**: 全6セクション(books / talks / design / manuscript / showcase / timeline)はコンテンツを `data/*.json` に、型を `types/*.ts` に切り出したdata駆動の実装。`components/<section>/data.ts` がJSONを読み込んでコンポーネントへ受け渡す。
- **クライアントコンポーネントは最小限**: `NavigationBar` のactive判定、`ScrollToTop`、`talks` ページのフィルターUIのみ `"use client"` 指定。それ以外はサーバーコンポーネントで事前描画。
- **構造化データ**: 全ページにschema.org準拠のJSON-LDを `components/global/JsonLd.tsx` 経由で埋め込み、SEOとリッチ結果に対応。

## Content Data

コンテンツはすべて `data/*.json` に集約し、Firestore移行時にそのまま同構造で載せ替えられる形で管理している。

| ファイル | 件数 | 型 |
|---|---|---|
| `data/books.json` | 6冊 | [`Book`](./types/books.ts) |
| `data/talks.json` | 176件 | [`TalkItem`](./types/talks.ts) |
| `data/design.json` | 10件(gishohaku 8 / oyakata 2) | [`DesignItem`](./types/design.ts) |
| `data/manuscript.json` | iOSDC 8 / 寄稿11 / 翻訳2 / DroidKaigi 18 / テックブログ15 / SNS 9 | [`ManuscriptData`](./types/manuscript.ts) |
| `data/showcase.json` | リポジトリ27 + 技書博1ドキュメント | [`ShowcaseData`](./types/showcase.ts) |
| `components/timeline/data.ts` | 17章(未JSON化) | `TimelineEntry` |

timelineのみJSON化が未実施(Phase 3で揃える予定)。

## Prerequisites

- **Node.js 22.x** (`.nvmrc` あり。`nvm use` で切り替え推奨)
- **Firebase CLI** 13.0以上(デプロイ時のみ必要、`firebase login` 済みであること)
- **Java 11+** (Firestore Emulatorを使う場合のみ必要)

## Development

```bash
nvm use                       # .nvmrc の Node 22 を使用
npm install                   # 初回のみ
npm run dev                   # 開発サーバー起動 (http://localhost:3000)
```

### ビルド

```bash
npm run build                 # 静的エクスポート → out/
npm run lint                  # ESLint
npx tsc --noEmit              # TypeScript 型チェック
```

`out/` 配下に各ページの `index.html` と `404.html`、`sitemap.xml`、`robots.txt` が生成される。`trailingSlash: true` の設定により `/books` は `/books/` に正規化される。

### デプロイ(手動)

```bash
# Preview Channel(一時 URL、本番無影響、デフォルト 7 日で失効)
firebase hosting:channel:deploy preview --expires 7d

# 本番
npm run build
firebase deploy --only hosting
```

本番URL: <https://just1factory-main.web.app> → カスタムドメイン <https://just1factory.net>

## CI/CD

現時点で稼働しているGitHub Actionsワークフローは下表の1件のみ。READMEの過去版で言及されていた `deploy-preview.yml` / `deploy-production.yml` は未実装で、Phase 3のインフラ更新と合わせて追加予定(詳細は [`docs/isr-migration-impact.md`](./docs/isr-migration-impact.md) を参照)。

| Workflow | Trigger | Action |
|---|---|---|
| `ci.yml` | PR / master push | Node 20で `npm ci` → `npx tsc --noEmit` → `npm run build` → `out/` 配下のHTML件数検証 |

Dependabot(npm + GitHub Actions)が定期的に依存関係の更新PRを上げるため、`/review-dependabot` コマンドで一括判断する運用。

## Firebase

### Hosting

`firebase.json` の `hosting` セクションに以下を定義：

- `public: "out"` — Next.js静的エクスポート出力をそのまま配信
- セキュリティヘッダー: `X-Content-Type-Options: nosniff` / `X-Frame-Options: DENY` / `Referrer-Policy: strict-origin-when-cross-origin` / `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- キャッシュポリシー:
  - JS / CSS / sourcemap: `max-age=31536000, immutable`(フィンガープリント付きのため1年)
  - 画像・フォント: `max-age=2592000`(30日)
  - HTML: `max-age=300, s-maxage=600, stale-while-revalidate=86400`
  - `robots.txt` / `sitemap.xml`: `max-age=86400`(1日)

### Firestore(Phase 3 準備済み・未デプロイ)

CMS化に備え以下を定義済み。本番Firestoreへの反映は未実施。

- [`firestore.rules`](./firestore.rules) — read全員許可 / writeは `admins/{uid}` 名簿制で判定
- [`firestore.indexes.json`](./firestore.indexes.json) — `talks(year↓ + date↓)` / `talks(category↑ + date↓)` / `timeline(year↓ + month↓)` の3複合インデックス

### Emulator

`firebase.json` の `emulators` セクションでFirestore(`:8080`)/ Auth(`:9099`)/ UI(`:4000`)を定義済み。起動と検証手順は [`docs/firebase-emulator-guide.md`](./docs/firebase-emulator-guide.md) を参照。

## Documentation

| ファイル | 内容 |
|---|---|
| [`CLAUDE.md`](./CLAUDE.md) | Claude Code向けのプロジェクト指針(Tech Stack / Do NOT / Architecture Notes) |
| [`AGENTS.md`](./AGENTS.md) | AIエージェントへの注意書き(Next.js 16系のドキュメント参照指示) |
| [`PROGRESS.md`](./PROGRESS.md) | Nuxt.js 2からNext.js 16への移行作業ログ |
| [`docs/ROADMAP.md`](./docs/ROADMAP.md) | 本サイトの中期ロードマップ(Phase 1〜4) |
| [`docs/FIREBASE_CMS_DESIGN.md`](./docs/FIREBASE_CMS_DESIGN.md) | Firestoreコレクション設計のたたき台 |
| [`docs/firestore-migration-spec.md`](./docs/firestore-migration-spec.md) | 現状の `data/*.json` とFirestore設計の突き合わせ結果 + 管理画面フォーム案 |
| [`docs/isr-migration-impact.md`](./docs/isr-migration-impact.md) | `output: 'export'` を外してISR/SSRへ切り替えた場合の影響範囲分析 |
| [`docs/firebase-emulator-guide.md`](./docs/firebase-emulator-guide.md) | Firestoreルール検証用のEmulator操作手順 |

## Claude Code Integration

本リポジトリではClaude CodeのSkills / Agents / Commandsを [`.claude/`](./.claude/) 配下で管理している。Skill / Agentは定義ファイルを置くだけでClaude Code側に自動認識される。

### Commands

| Command | 用途 |
|---|---|
| `/add-page <name>` | 新しいページを雛形から作成し、READMEの自動生成セクションも更新する |
| `/pre-deploy` | 型チェック → ビルド → 出力確認までデプロイ前チェックを一括実行 |
| `/update-roadmap <task>` | `docs/ROADMAP.md` のタスクを完了状態にマークする |
| `/review-dependabot` | 未対応のDependabot PRを一覧取得し、Skillの判断基準に沿ってMerge / Close / 要調査を判定 |

### Skills

| Skill | 自動適用トリガー | 用途 |
|---|---|---|
| `content-entry` | `app/*/page.tsx`, `app/sitemap.ts` | コンテンツ追加の規約とmetadataテンプレート |
| `firebase-deploy` | `firebase.json`, `.firebaserc`, `deploy-*.yml` | デプロイ・キャッシュ戦略の知識 |
| `seo-metadata` | `app/layout.tsx`, `app/*/page.tsx` | OGP / SEOメタデータの設定規約 |
| `dependabot-review` | `package.json`, `package-lock.json`, `.github/dependabot.yml` | Dependabot PRのClose / Merge判断基準 |

### Agents(Subagent)

| Agent | 用途 | 書き込み権限 |
|---|---|---|
| `content-auditor` | サイト全体のメタデータ・サイトマップ・内部リンク・画像参照の整合性チェック | なし(Read + 読み取り系Bash) |
| `code-reviewer` | PR差分がプロジェクト規約に沿っているかのレビュー | なし(Read + git diff / grep / find) |
| `readme-updater` | README.mdの `<!-- AUTO-GENERATED-* -->` ブロックをプロジェクト状態から再生成 | **あり**(Read + Write + 情報収集系Bash) |

## Conventions

- **Bootstrap 4.6 / Font Awesome 4.7はバージョン固定**。デザインリニューアルまで触らない
- **`output: 'export'` を外さない**(Phase 3の正式切り替えまで)
- **`out/` をgit管理対象にしない**
- **英数字・記号と日本語の境界に半角スペースを入れない**(表示テキスト全般のtypography規約)
- 新しいページを追加した際は `app/sitemap.ts` にもエントリを追加する
- コミットメッセージは日本語でも可。変更意図が伝わる単位で分割する

詳細は [`CLAUDE.md`](./CLAUDE.md) を参照。

## Roadmap

- Phase 1足場固め: 進行中(CI / Dependabot / OGP / sitemap・404等は完了)
- Phase 2コンテンツ拡充: 完了(books / talks / design / manuscript / showcase / timelineの6ページを整備)
- Phase 3 CMS化: 準備段階(Firestore設計 / ISR影響分析 / セキュリティルール / Emulator設定は完了)
- Phase 4デザインリニューアル: 未着手

詳細は [`docs/ROADMAP.md`](./docs/ROADMAP.md) を参照。

## License

This project is private.
