// iOSDC Japan パンフレット原稿の featured セクション。
// 目立たせるために背景ティント・「Featured」バッジ・原稿名の大きめ表示・
// 掲載原稿(Dropbox)への主リンクを CTA 風に扱い、GitHub は補助チップとする。
import { IOSDC_MANUSCRIPTS, type IOSDCEntry } from "@/components/manuscript/data";

function IOSDCCard({ item }: { item: IOSDCEntry }) {
  const yearLabel = item.variant ? `${item.year} ${item.variant}` : item.year;
  return (
    <div className="col-md-6 col-12 mb-4">
      <div className="iosdc_card">
        <div className="iosdc_year_row">
          <span className="iosdc_featured">iOSDC Japan</span>
          <span className="iosdc_year">{yearLabel}</span>
        </div>
        <a
          href={item.manuscriptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="iosdc_title_link"
        >
          {item.title}
        </a>
        <div className="iosdc_links">
          <a
            href={item.manuscriptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary iosdc_pdf_btn"
          >
            <i className="fa fa-file-pdf-o" aria-hidden="true" /> 掲載原稿を読む
          </a>
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="iosdc_github_chip"
            title="原稿の元ソース(GitHub)"
          >
            <i className="fa fa-github" aria-hidden="true" /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ManuscriptIOSDC() {
  return (
    <div className="container">
      <div className="iosdc_block">
        <h2>iOSDC Japan パンフレット原稿</h2>
        <p className="iosdc_lead">
          毎年のiOSDC Japan公式パンフレットに掲載される寄稿原稿です。UI実装や設計の勘どころを、その時に取り組んでいたテーマに沿って言語化しています。掲載原稿はPDFで、元となる原稿ソース(Markdown)はGitHub上で公開しています。
        </p>
        <div className="row">
          {IOSDC_MANUSCRIPTS.map((item) => (
            <IOSDCCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
