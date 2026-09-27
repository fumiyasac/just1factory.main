// DroidKaigi 公式アプリへの Contribution セクション。年別にグループ化し、
// 各 PR は英語原題 + 簡潔な日本語概要 + PR リンクで表示する。
import { DROIDKAIGI, type DroidKaigiPR } from "@/components/manuscript/data";

function PRRow({ pr }: { pr: DroidKaigiPR }) {
  return (
    <li className="droidkaigi_item">
      <a
        href={pr.url}
        target="_blank"
        rel="noopener noreferrer"
        className="droidkaigi_title_link"
      >
        {pr.originalTitle}
      </a>
      <div className="droidkaigi_summary">{pr.summary}</div>
      <div className="droidkaigi_meta">
        <span className="droidkaigi_pr_chip">
          <i className="fa fa-github" aria-hidden="true" /> Pull Request
        </span>
      </div>
    </li>
  );
}

export default function ManuscriptDroidKaigi() {
  return (
    <div className="container">
      <div className="droidkaigi_block">
        <h2>DroidKaigi 公式アプリ Contribution</h2>
        <p className="droidkaigi_lead">
          毎年開催されるカンファレンス <strong>DroidKaigi</strong>{" "}
          の公式アプリ(オープンソース)に、主にiOS側の実装・翻訳対応・READMEドキュメント整備等でContributionしてきました。継続的にコードで貢献することで、コミュニティ内での学びも大きな財産になっています。
        </p>
        {DROIDKAIGI.map((yearGroup) => (
          <section key={yearGroup.year} className="droidkaigi_year">
            <h3 className="droidkaigi_year_heading">
              <span className="droidkaigi_year_num">{yearGroup.year}</span>
              <span className="droidkaigi_year_suffix">年</span>
              <span className="droidkaigi_year_count">
                ・{yearGroup.prs.length}件
              </span>
            </h3>
            <ul className="droidkaigi_list list-unstyled">
              {yearGroup.prs.map((pr) => (
                <PRRow key={pr.url} pr={pr} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
