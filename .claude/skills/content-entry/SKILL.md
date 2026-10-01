---
name: content-entry
description: コンテンツページへのエントリ追加パターン。talks/books/design/manuscript/showcase等のページに新しい項目を追加する時に適用する。
globs:
  - "app/*/page.tsx"
  - "app/sitemap.ts"
---

# コンテンツエントリ追加ガイド

## 基本ルール

- コンポーネントは機能単位で components/<section>/ に配置する
- ページコンポーネントは app/<route>/page.tsx に置く
- 画像は public/ 配下に用途別のディレクトリを切って格納する
- 新しいページを追加したら app/sitemap.ts にもエントリを追加する

## metadata テンプレート

各 page.tsx には以下の形式で metadata を export する:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ページ名",
  description: "ページの説明文",
  openGraph: {
    title: "ページ名 | Just1factory",
    description: "ページの説明文",
    url: "https://just1factory.net/ページパス",
  },
};
```

## sitemap.ts エントリ追加

新しいページを追加する際は app/sitemap.ts の return 配列に以下の形式で追加する:

```ts
{
  url: `${baseUrl}/ページパス`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.8,
},
```

## Bootstrap 4.6 スタイルルール

- 既存ページのBootstrap 4.6 クラスのみ使用する
- 新しいCSSフレームワークやライブラリを追加しない
- カード: card, card-body, card-title, card-text
- グリッド: container, row, col-md-*, col-lg-*
- テキスト: text-center, mt-*, mb-*, py-*
- 新しいページは既存ページの HTML 構造を確認してから作成する
