// 書籍・合同誌への寄稿セクション。
// 書籍URLがあれば主リンクとして扱い、GitHub は補助。
// 書籍URLが無い場合は GitHub URL を主リンクとして扱う。
import { CONTRIBUTIONS, type Contribution } from "@/components/manuscript/data";

function ContributionCard({ item }: { item: Contribution }) {
  const primaryUrl = item.bookUrl ?? item.githubUrl ?? "#";
  const hasSecondaryGithub = Boolean(item.bookUrl && item.githubUrl);
  return (
    <div className="col-md-6 col-12 mb-4">
      <div className="contribution_card">
        <div className="contribution_publisher">{item.publisher}</div>
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contribution_title_link"
        >
          {item.title}
        </a>
        <div className="contribution_links">
          {item.bookUrl ? (
            <a
              href={item.bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contribution_link_chip contribution_link_primary"
            >
              <i className="fa fa-book" aria-hidden="true" /> 書籍ページ
            </a>
          ) : (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contribution_link_chip contribution_link_primary"
            >
              <i className="fa fa-github" aria-hidden="true" /> 原稿(GitHub)
            </a>
          )}
          {hasSecondaryGithub ? (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contribution_link_chip"
              title="原稿の元ソース(GitHub)"
            >
              <i className="fa fa-github" aria-hidden="true" /> GitHub
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function ManuscriptContributions() {
  return (
    <div className="container">
      <div className="contribution_block">
        <h2>寄稿</h2>
        <p className="contribution_lead">
          書籍への寄稿や、合同誌企画への参加記録です。GMOインターネットグループ有志「Good Morning」シリーズ、親方Project合同誌シリーズを中心に、UI実装・キャリア観・アウトプット論など幅広いテーマで書いてきました。
        </p>
        <div className="row">
          {CONTRIBUTIONS.map((item) => (
            <ContributionCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
