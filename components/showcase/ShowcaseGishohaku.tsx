// 技術書同人誌博覧会（技書博）公式サイトの運用保守 Contribution セクション。
// Manuscript の contribution_card スタイルを踏襲した 1 プロジェクトカード + 技術スタックチップ。
import {
  GISHOHAKU_HIGHLIGHTS,
  GISHOHAKU_SITE_URL,
  GISHOHAKU_STACK,
} from "@/components/showcase/data";

export default function ShowcaseGishohaku() {
  return (
    <div className="container">
      <div className="contribution_block">
        <h2>技術書同人誌博覧会 公式サイト 運用保守</h2>
        <p className="contribution_lead">
          <strong>技術書同人誌博覧会（技書博）</strong>
          の運営メンバーとして、公式Webサイトおよび関連システムの運用保守・段階的改善に取り組んでいます。イベント開催という明確な期限がある中で、既存サービスを止めず・大きく作り直さず、
          <strong>「現在正常に動いているものを守りながら、次の運用を少しずつ安全にする」</strong>
          ことを重視した継続的なContributionです。
        </p>

        <div className="showcase_gishohaku_card">
          <div className="showcase_gishohaku_role">
            Role: Web Application Maintenance / Modernization / Event Operations
          </div>

          <p className="showcase_gishohaku_body">
            イベント開催に必要な情報更新だけでなく、長期間更新が難しかったフロントエンドの技術スタック・依存ライブラリ・開発環境・運用スクリプトを整理し、既存機能やデザインを維持しながら段階的な改善を進めています。
            Next.js / React / Node.js / Firebase / Emotion / Tailwind CSS / TypeScript など複数の技術要素が古いバージョンのまま相互依存していたため、単純な一括アップデートではなく、影響範囲の調査・ビルド確認・型チェック・画面比較・実行環境確認を組み合わせながら移行しています。
            アップデート前後では主要画面のスクリーンショットを取得し、Visual Regression Testで差分を確認。Docker 環境でのビルド・起動確認まで行い、本番Cloud Run相当の実行経路も検証しています。
            Firestoreデータ投入・メール送信スクリプトは、誤操作を防ぐため<strong>DryRun をデフォルト</strong>とする安全設計へ変更し、実際の更新は明示的なオプション指定が必要な方式に改めました。
          </p>

          <h4 className="showcase_gishohaku_subhead">主な取り組み</h4>
          <ul className="showcase_gishohaku_highlights">
            {GISHOHAKU_HIGHLIGHTS.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <h4 className="showcase_gishohaku_subhead">技術スタック</h4>
          <div className="showcase_gishohaku_stack">
            {GISHOHAKU_STACK.map((group) => (
              <div key={group.label} className="showcase_gishohaku_stack_group">
                <div className="showcase_gishohaku_stack_label">{group.label}</div>
                <div className="showcase_gishohaku_stack_items">
                  {group.items.map((tag) => (
                    <span key={tag} className="showcase_stack_chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="showcase_gishohaku_links">
            <a
              className="contribution_link_chip contribution_link_primary"
              href={GISHOHAKU_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-external-link" aria-hidden="true" /> 技術書同人誌博覧会 公式サイト
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
