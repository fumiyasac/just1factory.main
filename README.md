# Just1factory Official Website

酒井文也（fumiyasac）のポートフォリオサイト。経歴・書籍・登壇・デザイン制作等のアウトプットをアーカイブとして公開しています。

🔗 **https://just1factory.net**

## About

Web制作、サーバーサイド、iOS、Android、Flutter、技術書、登壇、コミュニティ運営へと領域を広げながら、必要な技術をその都度身につけ、手を動かしてきた記録です。

<!-- AUTO-GENERATED-START -->
<!-- このセクションは readme-updater Subagent が自動生成しています。手動で編集しないでください。 -->
<!-- 最終更新: 2026-10-02 -->

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Static Export) |
| Language | TypeScript / React 19 |
| CSS | Bootstrap 4.6 + Font Awesome 4.7 |
| Hosting | Firebase Hosting |

## Pages

| Page | Path | Description |
|---|---|---|
| Home | `/` | トップページ（Just1factory のメインビュー） |
| Books | `/books` | 技術書・寄稿書籍のアーカイブ |
| Talks & Articles | `/talks` | 登壇資料・技術記事のアーカイブ |
| Design | `/design` | 技書博チラシ・親方Project 寄稿等のデザイン制作一覧 |
| Manuscript & Writings | `/manuscript` | iOSDC 原稿・書籍寄稿・翻訳レビュー・DroidKaigi Contribution・テックブログ等の執筆記録 |
| Development Showcase | `/showcase` | UI実装サンプルの GitHub リポジトリ群と技書博公式サイト運用保守 |
| Career Timeline | `/timeline` | 2003年から現在までの越境キャリアを年別にまとめた年表 |

**Total: 7 pages**

<!-- AUTO-GENERATED-END -->

## Development

```bash
npm run dev       # 開発サーバー起動（http://localhost:3000）
npm run build     # 静的ビルド → out/ に出力
firebase deploy   # Firebase Hosting へデプロイ
```

## CI/CD

| Workflow | Trigger | Action |
|---|---|---|
| `ci.yml` | PR / master push | TypeScript型チェック + ビルド検証 |
| `deploy-preview.yml` | PR | Firebase Preview Channelにデプロイ、PRにURLコメント |
| `deploy-production.yml` | master push | Firebase Hosting 本番環境にデプロイ |

## Claude Code

このプロジェクトは Claude Code による開発効率化を導入しています。

| 種別 | 名前 | 用途 |
|---|---|---|
| Command | `/add-page` | 新しいページを雛形から作成し、READMEも更新 |
| Command | `/pre-deploy` | デプロイ前チェック |
| Command | `/update-roadmap` | ROADMAPのタスクを完了にする |
| Skill | `content-entry` | コンテンツ追加パターン・Bootstrap規約 |
| Skill | `firebase-deploy` | デプロイ・キャッシュ戦略の知識 |
| Skill | `seo-metadata` | OGP/SEOメタデータ規約 |
| Agent | `content-auditor` | サイト全体の整合性チェック |
| Agent | `code-reviewer` | PR差分のプロジェクト規約レビュー |
| Agent | `readme-updater` | READMEの自動生成セクション更新 |

## License

This project is private.
