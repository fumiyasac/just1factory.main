---
description: 未対応のDependabot PRを一括レビューする
allowed-tools: Read, Bash(gh pr list *), Bash(gh pr view *), Bash(gh pr diff *), Bash(grep *), Bash(cat *)
---

以下の手順で未対応の Dependabot PR を確認し、各PRの判断を報告してください。

1. 未マージのDependabot PRを一覧取得する:
   gh pr list --author "app/dependabot" --state open --json number,title,labels

2. 各PRについて以下を確認する:
   - gh pr view <番号> でPRの詳細を確認
   - gh pr diff <番号> で package.json の変更差分を確認
   - パッケージ名、旧バージョン、新バージョンを特定
   - semver の変更種別（patch / minor / major）を判定
   - dependencies か devDependencies かを判定
   - CIのステータスを確認

3. .claude/skills/dependabot-review/SKILL.md の判断基準に従って各PRを判定する

4. 全PRの判定結果を以下の表形式でまとめて報告する:

| PR | パッケージ | 変更 | 種別 | 区分 | CI | 判定 | 理由 |
|---|---|---|---|---|---|---|---|
| #XX | パッケージ名 | X.Y.Z → A.B.C | patch | dev | Pass | Merge | 型定義のみ |

5. 判定が Merge のPRについて「まとめてマージしますか？」と確認する
   確認が取れたら gh pr merge <番号> --merge で順にマージする
