// Talks & Articles ページで表示する UI 設定とアーカイブデータの集約点。
// 2014年〜2026年の「登壇資料・技術記事」176 本の本体は data/talks.json に分離済み。
// 本ファイルでは、カテゴリー/プラットフォームのラベル・統計などの UI 設定と、
// JSON から読み込んだアーカイブを 1 箇所に集約し、components/talks/* から参照する。

// 型は types/talks.ts に集約し、既存の import 経路 (components/talks/data) からも
// 引き続き利用できるよう re-export する。
import type { Category, Platform, TalkItem } from "@/types/talks";
import talksData from "@/data/talks.json";

export type { Category, Platform, TalkItem };

export type CategoryInfo = {
  label: string; // バッジ表示用の短い日本語ラベル
  desc: string;  // 凡例用の説明
};

// 配色は全カテゴリー統一（サイトのヘッダー色 #444444 に合わせた濃いグレー）で
// globals.css の .category_badge に集約。プラットフォームバッジ(水色 badge-info)と
// 役割が視覚的に分離し、Palatino セリフ体基調の落ち着いた世界観と調和させるため。
export const CATEGORIES: Record<Category, CategoryInfo> = {
  ui:        { label: "UI実装",        desc: "UIパーツ・アニメーション・トランジション・レイアウト" },
  cross:     { label: "クロスプラットフォーム", desc: "iOS/Android の比較や React Native・Flutter" },
  arch:      { label: "アーキテクチャ",  desc: "状態管理・DI・レイヤー設計（Redux/TCA/MVVM/Riverpod 等）" },
  async:     { label: "非同期・テスト",  desc: "RxSwift・Combine・Concurrency・UnitTest・swift-testing" },
  backend:   { label: "バックエンド",    desc: "Firebase/Rails/Laravel/GraphQL/Parse/Realm/CoreData など" },
  community: { label: "コミュニティ",    desc: "執筆・勉強法・キャリア・Contribution 振り返り" },
  ai:        { label: "AI × 越境",      desc: "生成 AI 活用・Claude Code・Flutter 越境・個人開発の設計論" },
};

export const STATS = [
  { num: "13", unit: "年", label: "2014年から発信を継続" },
  { num: "176", unit: "本", label: "登壇資料と技術記事の合計" },
  { num: "4", unit: "媒体", label: "Speaker Deck / Zenn / Qiita / SlideShare" },
  { num: "70+", unit: "登壇", label: "potatotips・iOSDC・DroidKaigi系ほか" },
] as const;

// 4 プラットフォーム別の概要と件数（Zenn はスクラップ 1 件を除外した 9 本）。
export type PlatformInfo = {
  platform: Platform;
  count: number;
  since: string;
  role: string;
  icon: string;
  url: string;
};

export const PLATFORMS: PlatformInfo[] = [
  {
    platform: "Speaker Deck",
    count: 42,
    since: "2022",
    role: "現在のメイン発信媒体。カンファレンス・勉強会の登壇資料を継続的に公開。",
    icon: "fa-folder-open",
    url: "https://speakerdeck.com/fumiyasac0921",
  },
  {
    platform: "Zenn",
    count: 9,
    since: "2022",
    role: "登壇内容の解説記事化や、実装ノウハウをまとまった読み物として整理する場。",
    icon: "fa-folder-open",
    url: "https://zenn.dev/fumiyasac",
  },
  {
    platform: "Qiita",
    count: 50,
    since: "2015",
    role: "初期から書き溜めてきた実装TIPSのアーカイブ。5,400+ Contributions。",
    icon: "fa-folder-open",
    url: "https://qiita.com/fumiyasac@github",
  },
  {
    platform: "SlideShare",
    count: 75,
    since: "2014",
    role: "2014〜2022の登壇資料の集積地。UI実装や初期の勉強会の記録が残る。",
    icon: "fa-folder-open",
    url: "https://www.slideshare.net/fumiyasakai37",
  },
];

// 全 176 本のアーカイブ。日付降順。元データは data/talks.json を参照。
// JSON 側は id フィールド付きで保持しているが、既存 consumer との互換のため
// TalkItem[] として露出する(id は追加的フィールドなので型として問題なし)。
export const ARCHIVE: TalkItem[] = talksData as TalkItem[];
