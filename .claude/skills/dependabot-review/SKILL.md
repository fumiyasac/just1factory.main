---
name: dependabot-review
description: Dependabot PRのClose/Merge判断基準。依存パッケージの更新PRを確認する時に適用する。
globs:
  - "package.json"
  - "package-lock.json"
  - ".github/dependabot.yml"
---

# Dependabot PR 判断ガイド

## 絶対にCloseするもの（CLAUDE.md の Do NOT ルールに該当）

以下のパッケージはバージョン固定。Dependabot PRが来てもCloseする。
- bootstrap（4.6 固定。将来のリニューアルまで上げない）
- font-awesome / @fortawesome 系（4.7 固定）

## 基本的にMerge可能なもの（リスク低）

以下の条件をすべて満たす場合:
- patch バージョンアップ（例: 1.2.3 → 1.2.4）
- CIのビルドが通っている
- devDependencies のみの変更

具体的に安全度が高いもの:
- @types/* パッケージ（型定義のみ、実行コードに影響なし）
- eslint / prettier 等のLint系ツール
- GitHub Actions のアクションバージョン（actions/checkout, actions/setup-node 等）
- firebase-tools（CLIツール、ランタイムに影響なし）

## 慎重に判断するもの（リスク中〜高）

以下は影響範囲が広いため、CHANGELOGやリリースノートを確認してから判断する:
- next（フレームワーク本体。minor以上は破壊的変更の可能性あり）
- react / react-dom（Next.jsとの互換性を確認）
- typescript（コンパイラ。型エラーが増える可能性）

## 判断フロー

1. パッケージ名が「絶対にClose」リストに該当するか？ → Close
2. CI（npm run build + tsc --noEmit）が通っているか？ → 通っていなければ Close or 調査
3. semver の変更種別は？
   - patch → 基本 Merge
   - minor → CHANGELOG確認の上 Merge
   - major → 慎重に調査。破壊的変更の内容を確認してから判断
4. dependencies か devDependencies か？
   - devDependencies → リスク低（ビルド/開発環境のみ影響）
   - dependencies → リスク中（本番コードに影響）

## 判断結果の記載形式

判断結果は以下の形式で報告する:

パッケージ: <名前> <旧バージョン> → <新バージョン>
種別: patch / minor / major
区分: dependencies / devDependencies
CI: Pass / Fail
判定: Merge / Close / 要調査
理由: <1行で理由を記載>
