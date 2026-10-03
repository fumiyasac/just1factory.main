// Design ページで扱う 2 セクション分のデザイン成果物データ。
// 本体は data/design.json に分離し、本ファイルではセクション別の配列として
// 整形して公開する(既存の app/design/page.tsx の import 経路を維持)。
// 型は types/design.ts に集約し、互換のため re-export する。
import designData from "@/data/design.json";
import type { DesignItem, DesignSection } from "@/types/design";

export type { DesignItem, DesignSection };

const ITEMS: DesignItem[] = designData as DesignItem[];

/** 技術書同人誌博覧会（技書博）のチラシ・ポスターデザイン。並び順は日付降順＋末尾に mini in OSC。 */
export const GISHOHAKU_ITEMS: DesignItem[] = ITEMS.filter(
  (item) => item.section === "gishohaku",
);

/** 親方Project 寄稿「メイカーのためのチラシで伝えるものづくり」関連の制作物。 */
export const OYAKATA_ITEMS: DesignItem[] = ITEMS.filter(
  (item) => item.section === "oyakata",
);
