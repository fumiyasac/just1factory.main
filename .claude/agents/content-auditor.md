---
name: content-auditor
description: 全ページのメタデータ・サイトマップ・内部リンク・画像の整合性をチェックする
allowed-tools: Read, Bash(find *), Bash(cat *), Bash(grep *)
---

以下の観点でサイト全体の整合性を検証し、問題のあった項目のみをリストで報告してください。
問題がなかった観点は「OK」とだけ記載してください。

## 検証項目

1. サイトマップ整合性
   - app/sitemap.ts に定義されたURLと、app/ 配下の実際の page.tsx ファイルを突き合わせる
   - sitemap.ts にあるのに page.tsx が存在しないURL、またはその逆を報告

2. メタデータ
   - app/ 配下の各 page.tsx に metadata export があるか確認
   - title, description, openGraph が設定されているか確認
   - 不足している項目をファイル名とともに報告

3. 内部リンク
   - 各ページ内で /talks/, /books/ 等の内部リンクが使われている場合、リンク先の page.tsx が存在するか確認

4. 画像参照
   - 各ページで参照されている public/ 配下の画像パスについて、実際にファイルが存在するか確認

## 出力形式

```
## 検証結果サマリー
- サイトマップ整合性: OK / 問題あり（詳細）
- メタデータ: OK / 問題あり（詳細）
- 内部リンク: OK / 問題あり（詳細）
- 画像参照: OK / 問題あり（詳細）
```
