// Talks & Articles ページで表示するキュレーションデータ。
// 元データ: 2014年〜2026年の登壇資料・技術記事 全177本（Speaker Deck / Zenn / Qiita / SlideShare）。
// ここでは「単なる網羅」ではなくテーマごとの代表作を厳選している。
// 新しい登壇・記事を追加したら THEMES / RECENT に適宜追記する運用。

export type Platform = "Speaker Deck" | "Zenn" | "Qiita" | "SlideShare";

export type TalkItem = {
  date: string; // YYYY-MM-DD
  platform: Platform;
  title: string;
  event?: string; // 登壇イベント名（記事の場合は無し）
  url: string;
};

export type Theme = {
  key: string;
  heading: string;
  lead: string; // このテーマで何を語ってきたかの説明
  highlights: TalkItem[]; // 代表作（各テーマ 3〜4本）
};

export const STATS = [
  { num: "13", unit: "年", label: "2014年から発信を継続" },
  { num: "177", unit: "本", label: "登壇資料と技術記事の合計" },
  { num: "4", unit: "媒体", label: "Speaker Deck / Zenn / Qiita / SlideShare" },
  { num: "70+", unit: "登壇", label: "potatotips・iOSDC・DroidKaigi 系ほか" },
] as const;

export const THEMES: Theme[] = [
  {
    key: "ui",
    heading: "UI 実装の勘どころを言語化する",
    lead: "「なぜこのUIはこう動くのか」を分解して伝える。UIKit・SwiftUI・Jetpack Compose と道具は変わっても、動きと表現を細部から解きほぐす姿勢は一貫しています。",
    highlights: [
      {
        date: "2019-09-17",
        platform: "SlideShare",
        title: "何故に私達（特に私）はアプリのアニメーションや UI 表現に魅了されるのか？",
        event: "iOSDC Reject Conference Day1",
        url: "https://www.slideshare.net/slideshow/ui-172957909/172957909",
      },
      {
        date: "2024-07-14",
        platform: "Speaker Deck",
        title: "こんな UI って SwiftUI でこう作るのか！を解剖してみた",
        event: "神山.swift / YUMEMI.grow Mobile #15",
        url: "https://speakerdeck.com/fumiyasac0921/konnauituteswiftuidekouzuo-runoka-wojie-pou-sitemita",
      },
      {
        date: "2025-05-26",
        platform: "Speaker Deck",
        title: "iOS / Android で無限循環 Carousel 表現を考えてみる",
        event: "potatotips #91",
        url: "https://speakerdeck.com/fumiyasac0921/androiddewu-xian-xun-huan-carouselbiao-xian-wokao-etemiru",
      },
      {
        date: "2025-07-21",
        platform: "Speaker Deck",
        title: "StickyHeader と Scroll 追従の構造を紐解く",
        event: "Mobile 勉強会 #21 ウォンテッドリー × チームラボ × Sansan",
        url: "https://speakerdeck.com/fumiyasac0921/stickyheadertoscrollzhui-cong-nogou-zao-woniu-jie-ku",
      },
    ],
  },
  {
    key: "cross",
    heading: "iOS / Android を横断する視点",
    lead: "同じ UI 表現を両プラットフォームで作り比べ、思想と実装の差から本質を掘り下げる。「同じ体験をネイティブで作る際の落とし穴」を継続して掘っています。",
    highlights: [
      {
        date: "2024-04-26",
        platform: "Speaker Deck",
        title: "同じ様な UI を iOS / Android 間で合わせるヒント No.2",
        event: "Swift/Kotlin 愛好会 #51",
        url: "https://speakerdeck.com/fumiyasac0921/androidjian-dehe-waseruhintono-dot-2",
      },
      {
        date: "2024-09-09",
        platform: "Speaker Deck",
        title: "iOS エンジニアが Android・Kotlin での開発を加速させた 3 年間の実践テクニック",
        event: "(Unofficial) DroidKaigi 2024 Pre Party / Swift 愛好会 vol.84",
        url: "https://speakerdeck.com/fumiyasac0921/androidkotlindenokai-fa-wojia-su-saseta3nian-jian-noshi-jian-tekunituku-jian-yi-ban",
      },
      {
        date: "2024-11-14",
        platform: "Speaker Deck",
        title: "iOS / Android で同じ UI 体験をネイティブで作成する際に気をつけたい落とし穴",
        event: "Spectrum Tokyo Meetup #15",
        url: "https://speakerdeck.com/fumiyasac0921/androiddetong-ziuiti-yan-wone-iteibudezuo-cheng-suruji-niqi-wotu-ketailuo-tosixue",
      },
      {
        date: "2025-01-28",
        platform: "Speaker Deck",
        title: "iOS / Android 間で UI 実装を近づけるヒントと道標",
        event: "potatotips #90",
        url: "https://speakerdeck.com/fumiyasac0921/androidjian-deuishi-zhuang-wojin-dukeruhintotodao-biao",
      },
    ],
  },
  {
    key: "arch",
    heading: "アーキテクチャと状態管理を「なぜ」から捉える",
    lead: "Redux から TCA・Riverpod・MVI へ。単方向データフローを軸に、「どちらが優れているか」ではなく「何を解決しようとしているか」を比べながら整理してきました。",
    highlights: [
      {
        date: "2018-08-15",
        platform: "SlideShare",
        title: "Fundamentals of Swift & Redux",
        event: "ROPPONGI.swift 第 5 回",
        url: "https://www.slideshare.net/slideshow/fundamentals-of-swift-redux-reduxswift/109923472",
      },
      {
        date: "2024-02-07",
        platform: "Speaker Deck",
        title: "Overviewing TCA v1.7 & Back and forth with MVVM",
        event: "potatotips #86",
        url: "https://speakerdeck.com/fumiyasac0921/overviewing-tca-v1-dot-7-and-back-and-forth-with-mvvm",
      },
      {
        date: "2025-10-21",
        platform: "Speaker Deck",
        title: "Android Architecture & Unidirectional Data Flow Guidance & Essence",
        event: "DroidKaigi.collect { #27@Tokyo }",
        url: "https://speakerdeck.com/fumiyasac0921/android-architecture-and-unidirectional-data-flow-guidance-and-essence",
      },
      {
        date: "2026-01-22",
        platform: "Speaker Deck",
        title: "Riverpod 3.x で実現する実践的 UI 実装",
        event: "potatotips #94",
        url: "https://speakerdeck.com/fumiyasac0921/riverpod3-dot-xdeshi-xian-surushi-jian-de-uishi-zhuang",
      },
    ],
  },
  {
    key: "quality",
    heading: "非同期・テスト・実装品質を積み重ねる",
    lead: "動くコードの一歩先、変えやすさ・壊れにくさに向き合う。UnitTest、swift-testing、Combine から async/await への移り変わりまで、地味だけれど効くテーマを継続して発信しています。",
    highlights: [
      {
        date: "2018-12-10",
        platform: "SlideShare",
        title: "まずはできるところから始める UnitTest とテストができる実装について",
        event: "iOS Test Night #9 - 2 周年 -",
        url: "https://www.slideshare.net/slideshow/unittest-125506754/125506754",
      },
      {
        date: "2019-11-11",
        platform: "SlideShare",
        title: "試して感覚を掴んでみる UICollectionViewCompositionalLayout & Combine",
        event: "potatotips #63",
        url: "https://www.slideshare.net/slideshow/uicollectionviewcompositionallayout-combine/192280132",
      },
      {
        date: "2024-03-13",
        platform: "Speaker Deck",
        title: "Combine を中心とした処理を Swift Concurrency へ",
        event: "yumemi.grow Mobile #11",
        url: "https://speakerdeck.com/fumiyasac0921/combinewozhong-xin-tositachu-li-woswift-concurrencyhe-koremademodiao-betadiao-cha-toxiang-kihe-i",
      },
      {
        date: "2024-07-05",
        platform: "Speaker Deck",
        title: "「swift-testing はじめました」 Quick / Nimble からの置き換えの最初の一歩",
        event: "potatotips #88",
        url: "https://speakerdeck.com/fumiyasac0921/nimblekaranozhi-kihuan-enozui-chu-no-bu",
      },
    ],
  },
  {
    key: "flutter-ai",
    heading: "直近の探索：Flutter × 生成 AI × 個人開発",
    lead: "iOS / Android の二刀流から Flutter・TypeScript へ越境し、生成 AI とどう共存するかを探索中。個人開発を「大規模設計の苗床」として育てるスタイルで、道具の進化とアーキテクチャ観の刷新を並走させています。",
    highlights: [
      {
        date: "2025-11-02",
        platform: "Speaker Deck",
        title: "Claude Code を利用して DroidKaigi 2025 公式 iOS アプリに Contribution をしてみた話",
        event: "kanagawa.swift Vol.2",
        url: "https://speakerdeck.com/fumiyasac0921/claude-codewoli-yong-sitedroidkaigi2025gong-shi-iosapurinicontributionwositemitahua",
      },
      {
        date: "2026-05-18",
        platform: "Speaker Deck",
        title: "Flutter 初心者が生成 AI で大規模アプリ開発をキャッチアップした工夫",
        event: "AI Native な Flutter 開発の現在地",
        url: "https://speakerdeck.com/bitkey/flutter-with-llm-a-former-native-engineers-fast-track-to-large-scale-apps",
      },
      {
        date: "2026-07-15",
        platform: "Speaker Deck",
        title: "個人開発で育てる「大規模設計の苗床」",
        event: "第 10 回 FlutterGakkai",
        url: "https://speakerdeck.com/bitkey/the-seedbed-for-large-scale-design-from-ai-era-solo-projects-to-professional-knowledge",
      },
      {
        date: "2026-07-22",
        platform: "Speaker Deck",
        title: "iOS / Android の二刀流エンジニアが Flutter & TypeScript へ越境後の現在地",
        event: "Mobile Tech Flex #2",
        url: "https://speakerdeck.com/bitkey/dual-platform-mobile-engineer-shifts-to-flutter-and-typescript-the-view-and-real-thrill-of-going-flutter-first",
      },
      {
        date: "2026-08-18",
        platform: "Speaker Deck",
        title: "Flutter × BLE Central を自前 Plugin で実装する設計パターン",
        event: "potatotips #96",
        url: "https://speakerdeck.com/bitkey/building-custom-flutter-ble-central-plugins",
      },
      {
        date: "2026-09-01",
        platform: "Zenn",
        title: "DroidKaigi 2026 公式アプリ Contribution から学ぶ AI 活用と実装ポイント解説",
        url: "https://zenn.dev/fumiyasac/articles/808da3b5cf8df7",
      },
    ],
  },
];

// 直近（2025-2026）のタイムライン。「今なにに取り組んでいるか」を伝えるためのセクション。
// 日付降順で表示。
export const RECENT: TalkItem[] = [
  {
    date: "2026-09-01",
    platform: "Zenn",
    title: "DroidKaigi 2026 公式アプリ Contribution から学ぶ AI 活用と実装ポイント解説",
    url: "https://zenn.dev/fumiyasac/articles/808da3b5cf8df7",
  },
  {
    date: "2026-08-18",
    platform: "Speaker Deck",
    title: "Flutter × BLE Central を自前 Plugin で実装する設計パターン",
    event: "potatotips #96",
    url: "https://speakerdeck.com/bitkey/building-custom-flutter-ble-central-plugins",
  },
  {
    date: "2026-07-27",
    platform: "Speaker Deck",
    title: "Swift & Xcode のバージョンアップにまつわる怖かった思い出",
    event: "Toranomon Tech Hub 第 8 回 IT 業界、本当にあった怖い話",
    url: "https://speakerdeck.com/bitkey/scary-memories-of-swift-and-xcode-updates",
  },
  {
    date: "2026-07-22",
    platform: "Speaker Deck",
    title: "iOS / Android の二刀流エンジニアが Flutter & TypeScript へ越境後の現在地",
    event: "Mobile Tech Flex #2",
    url: "https://speakerdeck.com/bitkey/dual-platform-mobile-engineer-shifts-to-flutter-and-typescript-the-view-and-real-thrill-of-going-flutter-first",
  },
  {
    date: "2026-07-15",
    platform: "Speaker Deck",
    title: "個人開発で育てる「大規模設計の苗床」",
    event: "第 10 回 FlutterGakkai",
    url: "https://speakerdeck.com/bitkey/the-seedbed-for-large-scale-design-from-ai-era-solo-projects-to-professional-knowledge",
  },
  {
    date: "2026-05-18",
    platform: "Speaker Deck",
    title: "Flutter 初心者が生成 AI で大規模アプリ開発をキャッチアップした工夫",
    event: "AI Native な Flutter 開発の現在地",
    url: "https://speakerdeck.com/bitkey/flutter-with-llm-a-former-native-engineers-fast-track-to-large-scale-apps",
  },
  {
    date: "2026-01-22",
    platform: "Speaker Deck",
    title: "Riverpod 3.x で実現する実践的 UI 実装",
    event: "potatotips #94",
    url: "https://speakerdeck.com/fumiyasac0921/riverpod3-dot-xdeshi-xian-surushi-jian-de-uishi-zhuang",
  },
  {
    date: "2025-12-07",
    platform: "Zenn",
    title: "Android Architecture & Unidirectional Data Flow Guidance & Essence",
    url: "https://zenn.dev/fumiyasac/articles/a8a5101656ecdd",
  },
  {
    date: "2025-11-02",
    platform: "Speaker Deck",
    title: "Claude Code を利用して DroidKaigi 2025 公式 iOS アプリに Contribution をしてみた話",
    event: "kanagawa.swift Vol.2",
    url: "https://speakerdeck.com/fumiyasac0921/claude-codewoli-yong-sitedroidkaigi2025gong-shi-iosapurinicontributionwositemitahua",
  },
  {
    date: "2025-10-21",
    platform: "Speaker Deck",
    title: "Android Architecture & Unidirectional Data Flow Guidance & Essence",
    event: "DroidKaigi.collect { #27@Tokyo }",
    url: "https://speakerdeck.com/fumiyasac0921/android-architecture-and-unidirectional-data-flow-guidance-and-essence",
  },
  {
    date: "2025-10-03",
    platform: "Speaker Deck",
    title: "SwiftUI の GeometryReader と ScrollView を基礎から応用まで学び直す：設計と活用事例",
    url: "https://speakerdeck.com/fumiyasac0921/swiftuinogeometryreadertoscrollviewwoji-chu-karaying-yong-madexue-bizhi-su-she-ji-tohuo-yong-shi-li",
  },
  {
    date: "2025-07-21",
    platform: "Speaker Deck",
    title: "StickyHeader と Scroll 追従の構造を紐解く",
    event: "Mobile 勉強会 #21",
    url: "https://speakerdeck.com/fumiyasac0921/stickyheadertoscrollzhui-cong-nogou-zao-woniu-jie-ku",
  },
  {
    date: "2025-06-26",
    platform: "Speaker Deck",
    title: "Liquid Glass 革新と SwiftUI / UIKit 進化",
    event: "Swift 愛好会スピンオフ WWDC25 セッション要約会",
    url: "https://speakerdeck.com/fumiyasac0921/uikitjin-hua",
  },
  {
    date: "2025-05-26",
    platform: "Speaker Deck",
    title: "iOS / Android で無限循環 Carousel 表現を考えてみる",
    event: "potatotips #91",
    url: "https://speakerdeck.com/fumiyasac0921/androiddewu-xian-xun-huan-carouselbiao-xian-wokao-etemiru",
  },
];

// 4 プラットフォームの一覧＋件数＋役割の説明。
// 「深堀りしたい人」向けの導線として、それぞれの入口を紹介する。
export type PlatformInfo = {
  platform: Platform;
  count: number;
  since: string; // YYYY
  role: string; // このプラットフォームで発信してきた内容の位置づけ
  icon: string; // Font Awesome 4 のクラス名 (`fa fa-*`)
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
    count: 10,
    since: "2022",
    role: "登壇内容の解説記事化や、実装ノウハウをまとまった読み物として整理する場。",
    icon: "fa-medium",
    url: "https://zenn.dev/fumiyasac",
  },
  {
    platform: "Qiita",
    count: 50,
    since: "2015",
    role: "初期から書き溜めてきた実装 TIPS のアーカイブ。5,400+ Contributions。",
    icon: "fa-folder-open",
    url: "https://qiita.com/fumiyasac@github",
  },
  {
    platform: "SlideShare",
    count: 75,
    since: "2014",
    role: "2014〜2022 の登壇資料の集積地。UI 実装や初期の勉強会の記録が残る。",
    icon: "fa-slideshare",
    url: "https://www.slideshare.net/fumiyasakai37",
  },
];
