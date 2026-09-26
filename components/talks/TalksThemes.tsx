// 5 つの軸で発信の中身を紹介するメインセクション。
// 各テーマにリード文＋代表作 3〜4 本を並べる。
import { THEMES, type TalkItem } from "@/components/talks/data";

function TalkRow({ item }: { item: TalkItem }) {
  return (
    <li className="talk_item">
      <div className="talk_meta">
        <span className="small text-muted talk_date">{item.date}</span>
        <span className="badge badge-pill badge-info ml-2">{item.platform}</span>
      </div>
      <a
        className="talk_title_link"
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.title}
      </a>
      {item.event ? (
        <div className="small text-muted talk_event">
          <i className="fa fa-users" aria-hidden="true" /> {item.event}
        </div>
      ) : null}
    </li>
  );
}

export default function TalksThemes() {
  return (
    <div className="container">
      <div className="talks_themes_block">
        <h2>取り組んできたテーマ</h2>
        <p className="talks_themes_lead">
          時期や道具は変わっても、根っこにある問い（「なぜこう作るのか」「どう伝えれば腑に落ちるか」）は変わっていません。ここでは 5 つの軸で、代表的な登壇資料・記事を紹介します。
        </p>
        {THEMES.map((theme) => (
          <div key={theme.key} className="theme_card">
            <h3 className="theme_heading">{theme.heading}</h3>
            <p className="theme_lead">{theme.lead}</p>
            <ul className="talk_list list-unstyled">
              {theme.highlights.map((item) => (
                <TalkRow key={item.url} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
