# just1factory.main

Just1factory（Fumiya Sakai）公式サイト。**Next.js（App Router / React / TypeScript）** 製の静的サイトで、**Firebase Hosting** に配信しています。

> もともと Nuxt.js 2 (Vue 2) 製でしたが、デザインを維持したまま Next.js へ移行しました。移行の詳細な記録は [`PROGRESS.md`](./PROGRESS.md) を参照してください。

## 技術スタック

- **Next.js 16**（App Router, 静的エクスポート `output: 'export'`）
- **React 19 / TypeScript**
- **Bootstrap 4.6** + **Font Awesome 4.7**（デザイン維持のためバージョン固定）
- ホスティング: **Firebase Hosting**（プロジェクト: `just1factory-main`）

## 必要環境

- **Node.js 22**（`.nvmrc` あり）
  ```bash
  nvm use        # .nvmrc により 22 が選択される
  ```
- Firebase CLI（デプロイ時のみ・`firebase login` 済みであること）

## ローカル開発

```bash
npm install        # 初回のみ
npm run dev        # http://localhost:3000 で起動
```

## ビルド（静的エクスポート）

```bash
npm run build      # out/ に静的ファイルを出力（output: 'export'）
npm run lint       # ESLint
```

- 出力先は `out/`（`/` と `/books/` の HTML、`404.html` などを生成）。
- `trailingSlash: true` のため、`/books` は `/books/` に正規化されます。

## デプロイ

`firebase.json` の `public` は `out` を指しています。リポジトリルートで実行してください。

```bash
# プレビュー配信（本番前ステージング。一時URL・本番無影響・7日で失効）
firebase hosting:channel:deploy preview --expires 7d

# 本番デプロイ
npm run build
firebase deploy --only hosting
```

本番URL: https://just1factory-main.web.app

## ディレクトリ構成

```
.
├─ app/            # App Router（page.tsx / books/page.tsx / layout.tsx）
├─ components/     # global / index / books のコンポーネント
├─ public/         # 静的アセット（summaries/, books/ の画像）
├─ next.config.ts  # 静的エクスポート設定
├─ firebase.json   # Hosting 設定（public: out）
└─ PROGRESS.md     # 移行記録
```
