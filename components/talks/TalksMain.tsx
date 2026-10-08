"use client";

// Stats + Archive を 1 つのクライアント親で束ねる。
// Stats はサイトの通算値を常時表示する静的コンポーネント。
// 絞り込み state (カテゴリー selected + 年 selectedYear) は Archive 側に閉じる。
import { useMemo, useState } from "react";
import {
  ARCHIVE,
  CATEGORIES,
  type Category,
} from "@/components/talks/data";
import TalksStats from "@/components/talks/TalksStats";
import TalksArchive from "@/components/talks/TalksArchive";

type Filter = Category | "all";
type YearFilter = string | "all";
const CATEGORY_KEYS = Object.keys(CATEGORIES) as Category[];

export default function TalksMain() {
  const [selected, setSelected] = useState<Filter>("all");
  const [selectedYear, setSelectedYear] = useState<YearFilter>("all");

  // カテゴリー別の全体件数(カテゴリー chip 横の数字用)。年フィルタに依存させない。
  const counts = useMemo(() => {
    const c = {} as Record<Category, number>;
    for (const key of CATEGORY_KEYS) c[key] = 0;
    for (const t of ARCHIVE) c[t.category] += 1;
    return c;
  }, []);

  // 年別の全体件数と、降順の年リスト。年 chip 横の数字用。
  const { yearCounts, years } = useMemo(() => {
    const c: Record<string, number> = {};
    for (const t of ARCHIVE) {
      const y = t.date.slice(0, 4);
      c[y] = (c[y] ?? 0) + 1;
    }
    return {
      yearCounts: c,
      years: Object.keys(c).sort().reverse(),
    };
  }, []);

  // カテゴリー × 年の AND 条件で絞り込む。
  const filtered = useMemo(() => {
    return ARCHIVE.filter((t) => {
      if (selected !== "all" && t.category !== selected) return false;
      if (selectedYear !== "all" && t.date.slice(0, 4) !== selectedYear)
        return false;
      return true;
    });
  }, [selected, selectedYear]);

  return (
    <>
      <TalksStats />
      <TalksArchive
        selected={selected}
        onSelect={setSelected}
        counts={counts}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        yearCounts={yearCounts}
        years={years}
        filtered={filtered}
      />
    </>
  );
}
