---
name: firebase-deploy
description: Firebase Hosting のデプロイ、キャッシュ戦略、Preview Channels に関する知識。デプロイやホスティング関連の質問や作業時に適用する。
globs:
  - "firebase.json"
  - ".firebaserc"
  - ".github/workflows/deploy-*.yml"
---

# Firebase Hosting デプロイガイド

## 基本構成

- ホスティング: Firebase Hosting（プロジェクト: just1factory-main）
- ビルド出力: out/（Next.js の output: 'export' による静的エクスポート）
- firebase.json の public: "out"

## キャッシュ戦略

firebase.json の headers で以下のキャッシュポリシーが設定済み:
- JS/CSS: 1年キャッシュ + immutable（フィンガープリント付き）
- 画像/フォント: 30日キャッシュ
- HTML: ブラウザ5分 / CDN 10分
- robots.txt / sitemap.xml: 1日キャッシュ

## CI/CD ワークフロー

- ci.yml: TypeScript型チェック + ビルド検証（PR時・master push時）
- deploy-preview.yml: PRごとにPreview Channelへデプロイ
- deploy-production.yml: masterマージ時に本番へ自動デプロイ

## 制約

- output: 'export' を外さない
- out/ ディレクトリを git にコミットしない
- firebase.json の既存設定を壊さない

## デプロイ前チェック

1. npx tsc --noEmit
2. npm run build
3. out/ にHTMLファイルが生成されていることを確認
4. sitemap.ts のURL一覧と out/ 内のHTMLファイルを突き合わせる
