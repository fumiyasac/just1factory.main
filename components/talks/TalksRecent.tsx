// 「直近の歩み」タイムライン。2025〜2026 の 14 本を日付降順で表示。
// 「今なにに取り組んでいるか」を伝えることが目的。
import { RECENT, type TalkItem } from "@/components/talks/data";

function TimelineItem({ item }: { item: TalkItem }) {
  return (
    <li className="timeline_item">
      <div className="timeline_dot" aria-hidden="true" />
      <div className="timeline_content">
        <div className="timeline_meta">
          <span className="small text-muted timeline_date">{item.date}</span>
          <span className="badge badge-pill badge-info ml-2">
            {item.platform}
          </span>
        </div>
        <a
          className="timeline_title_link"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.title}
        </a>
        {item.event ? (
          <div className="small text-muted timeline_event">
            <i className="fa fa-users" aria-hidden="true" /> {item.event}
          </div>
        ) : null}
      </div>
    </li>
  );
}

export default function TalksRecent() {
  return (
    <div className="container">
      <div className="talks_recent_block">
        <h2>直近の歩み（2025 - 2026）</h2>
        <p className="talks_recent_lead">
          いま関心を寄せているのは、生成 AI と個人開発をどう組み合わせて設計力を鍛えるか、そして Flutter・TypeScript への越境で得た視座を iOS / Android の現場にどう還元するか、という問いです。
        </p>
        <ul className="timeline_list list-unstyled">
          {RECENT.map((item) => (
            <TimelineItem key={`${item.date}-${item.url}`} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
