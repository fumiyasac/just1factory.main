// Talks & Articles ページで扱う 1 登壇/記事エントリの型。
// 元データは data/talks.json。Firestore 化を見据えた際の talks コレクション設計
// (docs/FIREBASE_CMS_DESIGN.md) に準拠しつつ、本サイトで必要な platform/category
// 分類を追加している。

/** 発信媒体 */
export type Platform = "Speaker Deck" | "Zenn" | "Qiita" | "SlideShare";

/**
 * カテゴリー分類。7 種類でカバーする。
 * - ui       UI 実装(アニメーション・レイアウト・トランジション)
 * - cross    クロスプラットフォーム(iOS/Android 比較・React Native・Flutter)
 * - arch     アーキテクチャ・状態管理(Redux/TCA/MVVM/DI/Riverpod など)
 * - async    非同期・テスト(RxSwift/Combine/Swift Concurrency/UnitTest など)
 * - backend  バックエンド・データ(Firebase/Rails/Laravel/GraphQL/Parse/Realm など)
 * - community コミュニティ・キャリア・執筆・Contribution 振り返り
 * - ai       AI × 越境・個人開発(Claude Code・Flutter 越境・生成 AI 活用)
 */
export type Category =
  | "ui"
  | "cross"
  | "arch"
  | "async"
  | "backend"
  | "community"
  | "ai";

export interface TalkItem {
  /** エントリ ID (例: "talk-001") */
  id: string;
  /** 公開日 (YYYY-MM-DD) */
  date: string;
  /** 発信媒体 */
  platform: Platform;
  /** カテゴリー */
  category: Category;
  /** タイトル */
  title: string;
  /** 登壇イベント名 (記事の場合は未指定) */
  event?: string;
  /** 発信元 URL */
  url: string;
}
