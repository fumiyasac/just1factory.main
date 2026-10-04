// Showcase ページで扱う 2 ブロック分の型。
// 元データは data/showcase.json。将来 Firestore 化する場合は repos を独立
// コレクション、gishohaku 側は単一ドキュメントとして持たせる想定。

/**
 * 個人開発リポジトリのカテゴリー。
 * - oss       公開 OSS
 * - swiftui   SwiftUI + 新しい API の UI 実装
 * - uikit     UIKit / UICollectionView / UIScrollView の UI 実装
 * - rx        RxSwift / Redux による状態管理
 * - flutter   Flutter + Riverpod / Drift / Firestore
 * - research  技術調査・比較用リポジトリ
 */
export type RepoCategory =
  | "oss"
  | "swiftui"
  | "uikit"
  | "rx"
  | "flutter"
  | "research";

export interface RepoCategoryInfo {
  label: string;
  desc: string;
}

export interface RepoItem {
  /** エントリ ID (例: "repo-001") */
  id: string;
  /** GitHub 上のリポジトリ名 */
  slug: string;
  category: RepoCategory;
  /** OSS など特に前面に出したいものだけ true */
  featured?: boolean;
  title: string;
  description: string;
  /** 技術スタックチップ (2〜4 個程度) */
  stack: string[];
  /** GitHub URL */
  url: string;
}

export interface GishohakuStackGroup {
  label: string;
  items: string[];
}

export interface GishohakuOscTalk {
  /** スライド/セッション題 */
  title: string;
  /** 登壇イベント名 */
  event: string;
  /** Docswell 等の掲載元 URL */
  slideUrl: string;
}

export interface GishohakuShowcase {
  /** 公式サイト URL */
  siteUrl: string;
  /** 主な取り組み(箇条書き) */
  highlights: string[];
  /** 技術スタック(Frontend / Backend & Infra / Dev & Verification) */
  stack: GishohakuStackGroup[];
  /** Open Source Conference 登壇情報 */
  osc: GishohakuOscTalk;
}

/** data/showcase.json のルート構造 */
export interface ShowcaseData {
  repos: RepoItem[];
  gishohaku: GishohakuShowcase;
}
