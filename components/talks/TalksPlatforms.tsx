// 4 プラットフォーム別の「深堀りしたい人」向けの導線カード。
// それぞれの位置づけ（メイン発信 / 記事化 / TIPS アーカイブ / 歴史）を明示する。
import { PLATFORMS } from "@/components/talks/data";

export default function TalksPlatforms() {
  return (
    <div className="container">
      <div className="talks_platforms_block">
        <h2>プラットフォーム別に深堀りする</h2>
        <p className="talks_platforms_lead">
          もっと網羅的に眺めたい方は、下記の各媒体から直接ご覧いただけます。それぞれ異なる時期と役割で、13年分のアウトプットが積み重なっています。
        </p>
        <div className="row">
          {PLATFORMS.map((p) => (
            <div key={p.platform} className="col-md-6 mb-4">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="platform_card"
              >
                <div className="platform_card_inner">
                  <div className="platform_head">
                    <i className={`fa ${p.icon} platform_icon`} aria-hidden="true" />
                    <div className="platform_name">{p.platform}</div>
                  </div>
                  <div className="platform_count_row">
                    <span className="platform_count">{p.count}</span>
                    <span className="platform_count_unit">本</span>
                    <span className="platform_since">/ {p.since} 年〜</span>
                  </div>
                  <p className="platform_role">{p.role}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
