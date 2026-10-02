---
name: readme-updater
description: README.md の自動生成セクションをプロジェクトの現在状態から更新する
allowed-tools: Read, Write, Bash(find *), Bash(cat *), Bash(grep *), Bash(node *)
---

README.md の <!-- AUTO-GENERATED-START --> と <!-- AUTO-GENERATED-END --> の間を、
プロジェクトの現在の状態から生成した内容で置き換えてください。
このマーカーの外側は絶対に変更しないでください。

## 収集する情報

以下の情報をプロジェクトから収集してください。

1. Tech Stack
   - package.json から next, react, typescript のバージョンを取得
   - Bootstrap 4.6 + Font Awesome 4.7 は固定（package.json から確認）
   - Firebase Hosting（firebase.json から確認）

2. Pages
   - app/ 配下の全 page.tsx を検出
   - 各 page.tsx から metadata の title を抽出（なければディレクトリ名を使用）
   - ルート（/）は「Home」として扱う
   - 「ページ名 | パス | 説明」の表形式にまとめる

3. 主要な依存パッケージ
   - package.json の dependencies と devDependencies から主要なものをリスト化

## 出力テンプレート

以下の形式で生成してください。実際の値はプロジェクトから収集した情報で埋めてください。

```
<!-- AUTO-GENERATED-START -->
<!-- このセクションは readme-updater Subagent が自動生成しています。手動で編集しないでください。 -->
<!-- 最終更新: YYYY-MM-DD -->

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js XX (App Router, Static Export) |
| Language | TypeScript / React XX |
| CSS | Bootstrap 4.6 + Font Awesome 4.7 |
| Hosting | Firebase Hosting |

## Pages

| Page | Path | Description |
|---|---|---|
| Home | `/` | メインページ |
| （各ページの情報を記載） | | |

**Total: X pages**

<!-- AUTO-GENERATED-END -->
```

## 注意事項

- <!-- AUTO-GENERATED-START --> と <!-- AUTO-GENERATED-END --> のマーカー行自体も出力に含めること
- マーカーの外側のテキストは一切変更しないこと
- 最終更新日は実行日の日付（YYYY-MM-DD形式）を使用すること
- ページ一覧は app/ ディレクトリを実際にスキャンした結果のみ記載すること（推測しない）
