// 「数字で見る」セクション。13 年間の厚みを一目で伝える。
// 4 カード横並び（デスクトップ）／2 列（モバイル）で構成。
import { STATS } from "@/components/talks/data";

export default function TalksStats() {
  return (
    <div className="container">
      <div className="talks_stats_block">
        <div className="row">
          {STATS.map((s) => (
            <div key={`${s.num}-${s.unit}`} className="col-md-3 col-6 mb-3">
              <div className="stat_card text-center">
                <div className="stat_number">
                  {s.num}
                  <span className="stat_unit">{s.unit}</span>
                </div>
                <div className="stat_label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
