---
name: seo-metadata
description: SEO・OGP・Twitterカードのメタデータ設定規約。新しいページの作成やメタデータ修正時に適用する。
globs:
  - "app/layout.tsx"
  - "app/*/page.tsx"
---

# SEO / OGP メタデータ規約

## layout.tsx のテンプレート設定

layout.tsx で以下が設定済み:
- metadataBase: https://just1factory.net
- title.template: "%s | Just1factory"
- openGraph: サイト共通のOGP設定
- twitter: summary_large_image / @fumiyasac
- icons: favicon.ico / apple-touch-icon.png

## ページ固有メタデータの書き方

各 page.tsx で metadata を export すると、layout.tsx のデフォルトを上書きできる。
title はページ名のみ指定すれば、テンプレートにより「ページ名 | Just1factory」と表示される。

## チェック項目

新しいページを追加する際は以下を確認:
- title がページ固有の値になっているか
- description がページの内容を適切に表しているか
- openGraph.url がページの正しいURLになっているか
- sitemap.ts にエントリが追加されているか
