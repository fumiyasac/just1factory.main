// Manuscript & Writings ページで扱う 6 セクション分の型。
// 元データは data/manuscript.json(オブジェクトルート + 6 セクションの配列)。
// 将来 Firestore 化する場合はセクション毎に別コレクションに切り出す想定。

// ============================
// 1) iOSDC Japan パンフレット原稿
// ============================
export interface IOSDCEntry {
  id: string;              // "iosdc-001" 〜
  slug: string;            // 内部識別
  year: string;            // "2026" 等
  variant?: string;        // "vol.1" のように同一年に複数ある場合の識別
  title: string;
  manuscriptUrl: string;   // 掲載原稿(Dropbox)
  githubUrl: string;       // 原稿の元ソース(GitHub)
}

// ============================
// 2) 寄稿(書籍・合同誌)
// ============================
export interface Contribution {
  id: string;              // "contrib-001" 〜
  slug: string;            // 内部識別
  publisher: string;       // 書名や合同誌のタイトル
  title: string;           // 章タイトル
  bookUrl?: string;        // 書籍ページ(あれば優先)
  githubUrl?: string;      // GitHub の原稿ソース(補助・書籍 URL 無しの場合は主)
}

// ============================
// 3) 翻訳レビュー参加
// ============================
export interface TranslationReview {
  id: string;              // "translation-001" 〜
  slug: string;            // 内部識別
  title: string;
  bookUrl: string;
}

// ============================
// 4) DroidKaigi 公式アプリ Contribution
// ============================
export interface DroidKaigiPR {
  id: string;              // "droidkaigi-001" 〜(全年通算)
  originalTitle: string;   // PR タイトル(英)
  summary: string;         // 簡潔な日本語概要
  url: string;
}

export interface DroidKaigiYear {
  year: string;
  prs: DroidKaigiPR[];
}

// ============================
// 5) テックブログ執筆
// ============================
export interface TechBlogArticle {
  id: string;              // "techblog-001" 〜(全社通算)
  title: string;
  url: string;
}

export interface TechBlogCompany {
  company: string;
  articles: TechBlogArticle[];
}

// ============================
// 6) 自筆ノート・SNS 発信
// ============================
export interface SNSNote {
  id: string;              // "sns-001" 〜
  title: string;
  url: string;
}

// -----------------------------------------------------------------------------
// data/manuscript.json のルート構造
// -----------------------------------------------------------------------------
export interface ManuscriptData {
  iosdc: IOSDCEntry[];
  contributions: Contribution[];
  translations: TranslationReview[];
  droidkaigi: DroidKaigiYear[];
  techBlog: TechBlogCompany[];
  snsNotes: SNSNote[];
}
