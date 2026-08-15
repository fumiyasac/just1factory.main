# Just1factory Roadmap

CLAUDE.md から `@docs/ROADMAP.md` で参照する。
全セッションでは不要だが、計画系タスクの際に読み込む。

## Phase 1: 足場固め（現在）

- [x] CLAUDE.md 整備
- [x] GitHub Actions CI 導入（Lint + Build チェック）
- [ ] Firebase Hosting Preview Channels でPRプレビュー
- [ ] Renovate / Dependabot で依存パッケージ管理
- [x] メタデータ・OGP・Twitterカード設定

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
