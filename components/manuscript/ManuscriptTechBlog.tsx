// テックブログ執筆セクション。会社別にグループ化。
import { TECH_BLOG, type TechBlogArticle } from "@/components/manuscript/data";

function ArticleRow({ article }: { article: TechBlogArticle }) {
  return (
    <li className="techblog_item">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="techblog_title_link"
      >
        {article.title}
      </a>
    </li>
  );
}

export default function ManuscriptTechBlog() {
  return (
    <div className="container">
      <div className="techblog_block">
        <h2>テックブログ執筆</h2>
        <p className="techblog_lead">
          在籍企業のテックブログに寄稿してきた記事一覧です。カンファレンス参加レポート、社内勉強会レポート、業務での取り組みなどを幅広く発信しています。
        </p>
        {TECH_BLOG.map((group) => (
          <section key={group.company} className="techblog_company">
            <h3 className="techblog_company_heading">
              {group.company}
              <span className="techblog_company_count">
                ・{group.articles.length}本
              </span>
            </h3>
            <ul className="techblog_list list-unstyled">
              {group.articles.map((article) => (
                <ArticleRow key={article.url} article={article} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
