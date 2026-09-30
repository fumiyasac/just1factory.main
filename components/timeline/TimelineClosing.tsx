// キャリア年表の締めセクション。3つの「力」を並べたうえで、統合の一段落と証憑の一段落を掲載する。
import { CLOSING_BODY, CLOSING_FORCES } from "@/components/timeline/data";

export default function TimelineClosing() {
  return (
    <div className="container">
      <div className="timeline_closing_block">
        <h2>Closing</h2>
        <ul className="timeline_forces list-unstyled">
          {CLOSING_FORCES.map((f) => (
            <li key={f.force} className="timeline_force_item">
              <span className="timeline_force_era">{f.era}</span>
              <span className="timeline_force_label">{f.force}</span>
            </li>
          ))}
        </ul>
        {CLOSING_BODY.map((line, i) => (
          <p key={i} className="timeline_closing_body">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
