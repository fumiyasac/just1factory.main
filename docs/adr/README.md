# Architecture Decision Records

本サイトの主要な技術的意思決定を記録する。各 ADR は提案 → レビュー → 承認 / 却下のライフサイクルを持ち、承認後も変更履歴として残す。

## ADR 一覧

| ADR | タイトル | ステータス | 日付 |
|---|---|---|---|
| [001](./001-why-firestore.md) | データストアとしてFirestoreを採用する | 提案(Proposed) | 2026-10-11 |
| [002](./002-hosting-strategy.md) | ホスティング戦略を決定する | 提案(Proposed) | 2026-10-11 |
| [003](./003-isr-migration.md) | ISR/SSG切り替えの方針を決定する | 提案(Proposed) | 2026-10-11 |

## ステータスの定義

- **提案(Proposed)**: 分析結果に基づく推奨を提示した段階。サイトオーナーのレビュー待ち
- **承認(Accepted)**: レビューの結果、提案を採用することが決定した状態
- **却下(Rejected)**: 提案を採用しないことが決定した状態。代替案が別 ADR として起こされる
- **置換(Superseded by ADR-XXX)**: 後続の ADR によって上書きされた状態

## 相互関係

```
ADR-001 (データストア: Firestore)
  └─ 前提条件 ──→ ADR-002 (ホスティング: Firebase + Cloud Run)
                   └─ 前提条件 ──→ ADR-003 (レンダリング: ページ別SSG/ISR)
```

ADR-001 → ADR-002 → ADR-003 の順で依存関係があり、上位の決定が覆った場合は下位の ADR も見直しが必要になる。

## ADR 作成の指針

新規 ADR を追加する場合は以下を守ること。

- ファイル名: `NNN-短い名前.md`(3 桁連番、ハイフン区切り)
- 必須セクション: ステータス / 日付 / コンテキスト / 検討した選択肢 / 決定 / 根拠 / 影響 / 参考資料
- 「決定」セクションでは、分析結果に基づく推奨を明確に記載し、**最終判断は別途行う旨も併記** する
- 既存の設計ドキュメント([`docs/firestore-migration-spec.md`](../firestore-migration-spec.md) / [`docs/isr-migration-impact.md`](../isr-migration-impact.md) など)を参考資料として明示的に引用する
- 本 README の ADR 一覧と相互関係図を更新する
