// Design ページで扱うデザイン成果物 1 件分の型。
// 元データは data/design.json。将来 Firestore 化する場合は flat コレクションに
// section フィールドで分類する想定(books/talks と同じ運用)。

/**
 * デザイン成果物の所属セクション。
 * - gishohaku: 技術書同人誌博覧会(技書博)のチラシ・ポスター
 * - oyakata:   親方Project 寄稿「メイカーのためのチラシで伝えるものづくり」関連
 */
export type DesignSection = "gishohaku" | "oyakata";

export interface DesignItem {
  /** エントリ ID (例: "design-001") */
  id: string;
  /** 所属セクション */
  section: DesignSection;
  /** 内部識別用スラッグ (画像ファイル名の一部とも揃える) */
  slug: string;
  /** 画像パス (public 配下の相対パス) */
  image: string;
  /** タイトル */
  title: string;
  /** 副題(媒体名や号数など) */
  subtitle?: string;
  /** イベント日 or 制作時期 */
  date?: string;
  /** 開催会場 */
  venue?: string;
  /** 制作意図・告知内容 */
  description: string;
  /** 詳細情報の外部リンク */
  url?: string;
}
