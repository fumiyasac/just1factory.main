// Showcase ページで表示する UI 設定とデータの集約点。
// リポジトリ情報(REPOS)と技書博関連(GISHOHAKU_*)の本体は data/showcase.json
// に分離済み。本ファイルでは UI ラベル(REPO_CATEGORIES)を保持しつつ、
// 既存の名前付きエクスポート API を維持する。
import showcaseData from "@/data/showcase.json";
import type {
  GishohakuOscTalk,
  GishohakuStackGroup,
  RepoCategory,
  RepoCategoryInfo,
  RepoItem,
  ShowcaseData,
} from "@/types/showcase";

export type {
  GishohakuOscTalk,
  GishohakuStackGroup,
  RepoCategory,
  RepoCategoryInfo,
  RepoItem,
};

export const REPO_CATEGORIES: Record<RepoCategory, RepoCategoryInfo> = {
  oss:      { label: "公開OSS",              desc: "実運用アプリで利用できる公開OSSとして継続メンテナンスしているリポジトリ" },
  swiftui:  { label: "SwiftUI",               desc: "SwiftUI・Observation・SwiftDataなど新しいiOS APIのUI実装検証" },
  uikit:    { label: "UIKit",                 desc: "UIKit・UICollectionView・UIScrollViewを組み合わせたUI実装検証" },
  rx:       { label: "RxSwift / Redux",       desc: "RxSwift・Reduxによる状態管理とUI実装の組み合わせ検証" },
  flutter:  { label: "Flutter",               desc: "Flutter + Riverpod / Drift / Firestoreを組み合わせたUI実装検証" },
  research: { label: "技術調査",              desc: "ライブラリのバージョン差分やアーキテクチャ移行を目的とした比較用リポジトリ" },
};

const DATA = showcaseData as ShowcaseData;

export const REPOS: RepoItem[] = DATA.repos;

// -----------------------------------------------------------------------------
// 技術書同人誌博覧会 公式サイト運用保守
// -----------------------------------------------------------------------------
export const GISHOHAKU_HIGHLIGHTS: string[] = DATA.gishohaku.highlights;
export const GISHOHAKU_STACK: GishohakuStackGroup[] = DATA.gishohaku.stack;
export const GISHOHAKU_SITE_URL: string = DATA.gishohaku.siteUrl;

// -----------------------------------------------------------------------------
// Open Source Conference (OSC) 技書博コアスタッフ登壇
// -----------------------------------------------------------------------------
export const GISHOHAKU_OSC: GishohakuOscTalk = DATA.gishohaku.osc;
