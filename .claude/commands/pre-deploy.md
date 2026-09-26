---
description: デプロイ前のチェックを実行する
allowed-tools: Bash(npx tsc --noEmit), Bash(npm run build), Bash(find *), Read
---

デプロイ前に以下のチェックを順番に実行し、結果をまとめて報告してください。

1. TypeScript 型チェック: `npx tsc --noEmit`
2. 静的ビルド: `npm run build`
3. 出力確認: `out/` ディレクトリ内の HTML ファイル数を報告
4. `app/sitemap.ts` に記載されたURLと、実際に生成された HTML ファイルを突き合わせて、漏れがないか確認

すべて合格なら「デプロイ準備完了」、問題があれば該当箇所と修正案を報告してください。
