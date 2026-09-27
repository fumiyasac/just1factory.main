// 翻訳レビュー参加セクション。書籍タイトル+書籍ページへのリンクのみのシンプルなリスト。
import { TRANSLATION_REVIEWS } from "@/components/manuscript/data";

export default function ManuscriptTranslations() {
  return (
    <div className="container">
      <div className="translation_block">
        <h2>翻訳レビュー参加</h2>
        <p className="translation_lead">
          翻訳書のレビュアーとして参加した書籍です。原著者の意図をどう日本語で伝えるか、原稿を丁寧に読み込む機会になりました。
        </p>
        <ul className="translation_list list-unstyled">
          {TRANSLATION_REVIEWS.map((item) => (
            <li key={item.slug} className="translation_item">
              <a
                href={item.bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="translation_link"
              >
                <i className="fa fa-book" aria-hidden="true" />
                <span className="translation_title">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
