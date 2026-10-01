@AGENTS.md

# Just1factory Official Website

酒井文也（fumiyasac）の個人サイト。経歴・書籍・登壇等のアウトプットをアーカイブとして公開する。

## Tech Stack

- **Framework:** Next.js 16（App Router, `output: 'export'` で静的エクスポート）
- **Language:** TypeScript / React 19
- **CSS:** Bootstrap 4.6 + Font Awesome 4.7（バージョン固定、勝手に上げない）
- **Hosting:** Firebase Hosting（プロジェクト: `just1factory-main`, public: `out`）

## Directory Structure

```
app/            → App Router のページ（page.tsx, books/page.tsx, layout.tsx）
components/     → global/ index/ books/ 等に分類されたコンポーネント
public/         → 画像等の静的アセット
next.config.ts  → 静的エクスポート設定
firebase.json   → Hosting 設定
```

## Commands

```bash
npm run dev       # 開発サーバー起動（http://localhost:3000）
npm run build     # 静的ビルド → out/ に出力
firebase deploy   # Firebase Hosting へデプロイ
```

## Do NOT

- Bootstrap 4.6 / Font Awesome 4.7 のバージョンを変更しない（将来のリニューアルまで固定）
- `output: 'export'` を外さない（SSR/ISR には移行していない）
- `out/` ディレクトリを git にコミットしない
- Firebase のプロジェクト設定（firebase.json, .firebaserc）を壊さない
- 既存ページの見た目を意図せず崩す変更をしない

## Architecture Notes

- 完全な静的サイト。API ルートやサーバーサイド処理はない
- 将来的に Firebase Firestore を使ったコンテンツ管理への移行を検討中
- デザインリニューアル（Bootstrap 脱却）も将来計画にあるが、現時点では既存デザインを維持する

## Skills & Agents

利用可能な Skills と Subagents は .claude/ 配下に定義されている。
必要に応じて自動適用される。詳細は各ファイルの description を参照。

## README 管理

README.md には手動セクションと自動生成セクションがある。
自動生成セクションは <!-- AUTO-GENERATED-START --> と <!-- AUTO-GENERATED-END --> で囲まれており、
readme-updater Subagent が上書きする。手動セクションは編集しない。
