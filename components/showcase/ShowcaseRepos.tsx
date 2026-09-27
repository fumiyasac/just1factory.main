// 個人開発ショーケース。Talks archive と同じ構造(カテゴリー凡例 + グルーピング + タイムライン風リスト)で
// 6 カテゴリーに分類したリポジトリを表示する。
import {
  REPOS,
  REPO_CATEGORIES,
  type RepoCategory,
  type RepoItem,
} from "@/components/showcase/data";

const CATEGORY_ORDER: RepoCategory[] = [
  "oss",
  "swiftui",
  "uikit",
  "rx",
  "flutter",
  "research",
];

function CategoryLegend() {
  return (
    <div className="category_legend">
      <span className="category_legend_head">カテゴリー：</span>
      {CATEGORY_ORDER.map((key) => {
        const info = REPO_CATEGORIES[key];
        return (
          <span key={key} className="category_badge" title={info.desc}>
            {info.label}
          </span>
        );
      })}
    </div>
  );
}

function RepoRow({ item }: { item: RepoItem }) {
  return (
    <li className="archive_item">
      <div className="archive_dot" aria-hidden="true" />
      <div className="archive_content">
        <div className="archive_meta">
          <span className="category_badge" title={REPO_CATEGORIES[item.category].desc}>
            {REPO_CATEGORIES[item.category].label}
          </span>
          {item.featured ? (
            <span className="badge badge-pill badge-info archive_platform">
              <i className="fa fa-star" aria-hidden="true" /> 公開 OSS
            </span>
          ) : null}
          {item.stack.map((tag) => (
            <span key={tag} className="showcase_stack_chip">
              {tag}
            </span>
          ))}
          <a
            className="showcase_github_chip"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github" aria-hidden="true" /> GitHub
          </a>
        </div>
        <a
          className="archive_title_link"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.title}
        </a>
        <div className="showcase_description">{item.description}</div>
      </div>
    </li>
  );
}

export default function ShowcaseRepos() {
  return (
    <div className="container">
      <div className="talks_archive_block">
        <h2>個人開発 Showcase（全{REPOS.length}件）</h2>
        <p className="archive_lead">
          iOS / Android / Flutter エンジニアとしての実務で登場する UI 実装・状態管理・アーキテクチャ選定の判断を、GitHub上で追試できる形にストックしてきたリポジトリ群です。
          いずれも「業務コードにそのまま持ち込むことは難しいが、実装アプローチの引き出しとして繰り返し役立つ」ことを重視しています。
        </p>
        <CategoryLegend />
        {CATEGORY_ORDER.map((cat) => {
          const items = REPOS.filter((r) => r.category === cat);
          if (items.length === 0) return null;
          const info = REPO_CATEGORIES[cat];
          return (
            <section key={cat} className="archive_year">
              <h3 className="archive_year_heading">
                <span className="archive_year_num">{info.label}</span>
                <span className="archive_year_count">・{items.length} 件</span>
              </h3>
              <div className="archive_year_breakdown">{info.desc}</div>
              <ul className="archive_list list-unstyled">
                {items.map((item) => (
                  <RepoRow key={item.slug} item={item} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
