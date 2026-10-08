"use client";

// Stats + Archive を 1 つのクライアント親で束ねる。
// Stats はサイトの通算値を常時表示する静的コンポーネントで、
// 絞り込み state は Archive 側だけに閉じる(件数バッジ・年ブロック件数のみ連動)。
import { useMemo, useState } from "react";
import {
  ARCHIVE,
  CATEGORIES,
  type Category,
} from "@/components/talks/data";
import TalksStats from "@/components/talks/TalksStats";
import TalksArchive from "@/components/talks/TalksArchive";

type Filter = Category | "all";
const CATEGORY_KEYS = Object.keys(CATEGORIES) as Category[];

export default function TalksMain() {
  const [selected, setSelected] = useState<Filter>("all");

  // カテゴリー別の全体件数(フィルタボタン横の数字用)。
  const counts = useMemo(() => {
    const c = {} as Record<Category, number>;
    for (const key of CATEGORY_KEYS) c[key] = 0;
    for (const t of ARCHIVE) c[t.category] += 1;
    return c;
  }, []);

  const filtered = useMemo(
    () =>
      selected === "all"
        ? ARCHIVE
        : ARCHIVE.filter((t) => t.category === selected),
    [selected],
  );

  return (
    <>
      <TalksStats />
      <TalksArchive
        selected={selected}
        onSelect={setSelected}
        counts={counts}
        filtered={filtered}
      />
    </>
  );
}
