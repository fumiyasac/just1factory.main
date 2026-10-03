// Books ページで扱う 1 冊分の書籍データ。
// 元データは data/books.json。Firestore 化を見据えた際の books コレクション設計
// (docs/FIREBASE_CMS_DESIGN.md) に揃いつつ、本サイトの表示に必要な付加情報
// (coverAlt / priceNotes / commercialNote / sampleCodeNote 等) を含む。

export interface Book {
  /** エントリ ID (例: "book-001") */
  id: string;
  /** 書名 */
  title: string;
  /** 初回頒布イベント名(複数併記あり: 例「技術書典7」「第1回技術書同人誌博覧会」) */
  publishedAt: string[];
  /** 表紙画像パス (public 配下の相対パス) */
  coverImage: string;
  /** 表紙画像の alt 属性 */
  coverAlt: string;
  /** 販売価格(表記そのまま。例「¥1,000」「¥0」) */
  price: string;
  /** 価格補足(※ 付きの注釈。空配列なら注釈なし) */
  priceNotes: string[];
  /** 本文段落。各要素内の "\n" は <br /> に変換して描画する */
  description: string[];
  /** 書籍掲載サンプルコードの GitHub URL。null ならサンプルコードセクション非表示 */
  githubUrl: string | null;
  /** 商業化に関する前段文章。null なら商業版セクション非表示 */
  commercialNote: string | null;
  /** 商業版 Amazon URL。null なら Amazon リンク非表示 */
  amazonUrl: string | null;
  /** 「書籍の内容を確認する」ボタンの URL (BOOTH or 技術書典。必須) */
  boothUrl: string;
  /** 表示順(昇順) */
  sortOrder: number;
}
