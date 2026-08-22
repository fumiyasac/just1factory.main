# Just1factory Roadmap

CLAUDE.md から `@docs/ROADMAP.md` で参照する。
全セッションでは不要だが、計画系タスクの際に読み込む。

## Phase 1: 足場固め（現在）

- [x] CLAUDE.md 整備
- [x] GitHub Actions CI 導入（Lint + Build チェック）
- [ ] Firebase Hosting Preview Channels でPRプレビュー
- [ ] Renovate / Dependabot で依存パッケージ管理
- [x] Dependabot 導入（npm + GitHub Actions）
- [x] robots.txt / sitemap.xml 生成設定
- [x] カスタム404ページ

## Claude Code カスタムコマンド

利用可能なスラッシュコマンド:
- `/add-page <ページ名>`: 新しいページを雛形から作成
- `/pre-deploy`: デプロイ前のチェックを実行
- `/update-roadmap <タスク名>`: ROADMAP のタスクを完了にする

## Phase 2: コンテンツ拡充

- [ ] 登壇・発表アーカイブページ（`/talks`）追加
- [ ] Works ページ（UI実装ショーケース）追加
- [ ] Timeline ページ追加
- [ ] 執筆・寄稿一覧ページ追加

## Phase 3: CMS 化

- [ ] Firebase Firestore でコンテンツ管理（talks, books, works コレクション）
- [ ] 簡易管理画面（React + Firebase Auth）
- [ ] `output: 'export'` → ISR/SSG 切り替え検討

## Phase 4: デザインリニューアル

- [ ] Bootstrap 4.6 → Tailwind CSS 移行
- [ ] Framer Motion によるインタラクション追加
- [ ] レスポンシブ改善・モバイル最適化
- [ ] OGP / SEO 強化
