// キャリア年表本体。Talks archiveと同様の縦タイムライン(左側ドット + 縦線)で
// 2003年からの各年を昇順に並べる。各エントリは 年 + 一言テーマ + 本文段落 + キーワードチップ。
import { TIMELINE, type TimelineEntry } from "@/components/timeline/data";

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  return (
    <li className="archive_item">
      <div className="archive_dot" aria-hidden="true" />
      <div className="archive_content">
        <div className="timeline_year_row">
          <span className="timeline_year_num">{entry.year}</span>
          <span className="timeline_year_subtitle">{entry.subtitle}</span>
        </div>
        {entry.paragraphs.map((p, i) => (
          <p key={i} className="timeline_paragraph">
            {p}
          </p>
        ))}
        <div className="timeline_keywords">
          <span className="timeline_keywords_head">Keywords：</span>
          {entry.keywords.map((k) => (
            <span key={k} className="showcase_stack_chip">
              {k}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

export default function TimelineList() {
  return (
    <div className="container">
      <div className="talks_archive_block">
        <h2>2003 → 現在（全{TIMELINE.length}章）</h2>
        <p className="archive_lead">
          デザイナー、Webエンジニア、サーバーサイド、iOS、Android、Flutter、技術書、登壇、コミュニティ運営と、その時々で必要になった領域を広げてきた道のりを、時系列で読める形にまとめています。
        </p>
        <ul className="archive_list list-unstyled timeline_list">
          {TIMELINE.map((entry) => (
            <TimelineItem key={entry.year} entry={entry} />
          ))}
        </ul>
      </div>
    </div>
  );
}
