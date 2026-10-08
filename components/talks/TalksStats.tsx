"use client";

// 「数字で見る」セクション。13 年間の厚みを一目で伝える。
// 4 カード横並び（デスクトップ）／2 列（モバイル）で構成。
// 2 枚目「本数」のタイルのみ、親から渡された絞り込み件数とラベルに連動する。
// 他 3 枚(年数・媒体数・登壇数)はカテゴリー横断の全体値を保つ(カテゴリー別に数えても
// 意味を持たないため)。
import { STATS } from "@/components/talks/data";
import { CATEGORIES, type Category } from "@/components/talks/data";

type Filter = Category | "all";

export default function TalksStats({
  selected = "all",
  filteredCount,
  totalCount,
}: {
  selected?: Filter;
  filteredCount?: number;
  totalCount?: number;
} = {}) {
  const isFiltered = selected !== "all";
  return (
    <div className="container">
      <div className="talks_stats_block">
        <div className="row">
          {STATS.map((s, idx) => {
            // 2 番目のタイル(index 1) = 「本数」。選択中カテゴリーに連動させる。
            if (idx === 1 && filteredCount !== undefined && totalCount !== undefined) {
              const label = isFiltered
                ? `${CATEGORIES[selected as Category].label} の件数 (全 ${totalCount} 本中)`
                : s.label;
              return (
                <div key={`${s.num}-${s.unit}`} className="col-md-3 col-6 mb-3">
                  <div className="stat_card text-center">
                    <div className="stat_number">
                      {filteredCount}
                      <span className="stat_unit">{s.unit}</span>
                    </div>
                    <div className="stat_label">{label}</div>
                  </div>
                </div>
              );
            }
            return (
              <div key={`${s.num}-${s.unit}`} className="col-md-3 col-6 mb-3">
                <div className="stat_card text-center">
                  <div className="stat_number">
                    {s.num}
                    <span className="stat_unit">{s.unit}</span>
                  </div>
                  <div className="stat_label">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
