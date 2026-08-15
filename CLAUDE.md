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
components/     → global/ index/ books/ に分類されたコンポーネント
public/         → 画像等の静的アセット（summaries/, books/）
next.config.ts  → 静的エクスポート設定
firebase.json   → Hosting 設定
PROGRESS.md     → Bootstrap→Next.js 移行の記録
```

## Commands

```bash
npm run dev       # 開発サーバー起動（http://localhost:3000）
npm run build     # 静的ビルド → out/ に出力
firebase deploy   # Firebase Hosting へデプロイ
```

## Conventions

- コンポーネントは機能単位で `components/<section>/` に配置する
- ページコンポーネントは `app/<route>/page.tsx` に置く
- 画像は `public/` 配下に用途別のディレクトリを切って格納する
- コミットメッセージは日本語OK、変更意図がわかるように書く

## Do NOT

- Bootstrap 4.6 / Font Awesome 4.7 のバージョンを変更しない（将来のリニューアルまで固定）
- `output: 'export'` を外さない（SSR/ISR には移行していない）
- `out/` ディレクトリをgitにコミットしない
- Firebase のプロジェクト設定（firebase.json, .firebaserc）を壊さない
- 既存ページの見た目を意図せず崩す変更をしない

## Architecture Notes

- 完全な静的サイト。APIルートやサーバーサイド処理はない
- 現在は2ページ構成: トップ（`/`）+ 書籍一覧（`/books`）
- 将来的に Firebase Firestore を使ったコンテンツ管理への移行を検討中
- デザインリニューアル（Bootstrap脱却）も将来計画にあるが、現時点では既存デザインを維持する

## Context: Owner's Profile

サイトオーナーは元Webデザイナー→Webエンジニア→iOS/Androidエンジニアの経歴を持つ。
主なアウトプット:
- 技術書5冊（iOSアプリ開発 UI実装レシピブックシリーズ等、BOOTHで販売）
- 勉強会登壇多数（Speaker Deck: fumiyasac0921）
- Qiita 5,400+ Contributions
- 商業書籍への寄稿（「みんなのアジャイル」第4章）
- OSS: handMadeCalendarAdvance（Swift製祝日判定, ★66）
