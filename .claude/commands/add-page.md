---
description: 新しいページを雛形から作成する
argument-hint: <ページ名（例: talks, works, timeline）>
allowed-tools: Read, Write, Bash(npm run build)
---

以下の手順で新しいページを追加してください。

1. `app/$ARGUMENTS/page.tsx` を新規作成
2. ページには以下を含めること:
   - `import type { Metadata } from "next";` 
   - ページ固有の `metadata` export（title, description, openGraph）
   - title は単語のみ指定する（layout.tsx のテンプレート `%s | Just1factory` で自動的にサイト名が付与される）
   - openGraph.url は `https://just1factory.net/$ARGUMENTS` とする
   - export default function で React コンポーネントをエクスポート
   - 既存サイトの Bootstrap 4.6 スタイルに合わせた基本レイアウト
3. `app/sitemap.ts` にこのページのエントリを追加
4. `npm run build` でビルドが通ることを確認
5. 作成したファイルと変更箇所を報告
