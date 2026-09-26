// Talks & Articles ページで表示するアーカイブデータ。
// 元データ: 2014年〜2026年の全アウトプット 177 件のうち、Zenn スクラップ 1 件を除いた
//   「登壇資料・技術記事」176 本を年別・日付降順で網羅する。
// 各項目には category を付与し、視覚的に軌跡を辿れるようにしている。
// 新しい登壇・記事を追加したら ARCHIVE の先頭付近（日付降順）に追記する運用。

export type Platform = "Speaker Deck" | "Zenn" | "Qiita" | "SlideShare";

// カテゴリー分類。7 種類でカバーする。
export type Category =
  | "ui"        // UI 実装（アニメーション・レイアウト・トランジション）
  | "cross"    // クロスプラットフォーム（iOS/Android 比較・React Native・Flutter）
  | "arch"     // アーキテクチャ・状態管理（Redux/TCA/MVVM/DI/Riverpod など）
  | "async"    // 非同期・テスト（RxSwift/Combine/Swift Concurrency/UnitTest など）
  | "backend"  // バックエンド・データ（Firebase/Rails/Laravel/GraphQL/Parse/Realm など）
  | "community"// コミュニティ・キャリア・執筆・Contribution 振り返り
  | "ai";      // AI × 越境・個人開発（Claude Code・Flutter 越境・生成 AI 活用）

export type CategoryInfo = {
  label: string; // バッジ表示用の短い日本語ラベル
  color: string; // バッジ背景色
  desc: string;  // 凡例用の説明
};

export const CATEGORIES: Record<Category, CategoryInfo> = {
  ui:        { label: "UI 実装",        color: "#2867B2", desc: "UI パーツ・アニメーション・トランジション・レイアウト" },
  cross:     { label: "クロスプラットフォーム", color: "#17a2b8", desc: "iOS/Android の比較や React Native・Flutter" },
  arch:      { label: "アーキテクチャ",  color: "#6f42c1", desc: "状態管理・DI・レイヤー設計（Redux/TCA/MVVM/Riverpod 等）" },
  async:     { label: "非同期・テスト",  color: "#28a745", desc: "RxSwift・Combine・Concurrency・UnitTest・swift-testing" },
  backend:   { label: "バックエンド",    color: "#fd7e14", desc: "Firebase/Rails/Laravel/GraphQL/Parse/Realm/CoreData など" },
  community: { label: "コミュニティ",    color: "#6c757d", desc: "執筆・勉強法・キャリア・Contribution 振り返り" },
  ai:        { label: "AI × 越境",      color: "#dc3545", desc: "生成 AI 活用・Claude Code・Flutter 越境・個人開発の設計論" },
};

export type TalkItem = {
  date: string;      // YYYY-MM-DD
  platform: Platform;
  category: Category;
  title: string;
  event?: string;    // 登壇イベント名（記事の場合は無し）
  url: string;
};

export const STATS = [
  { num: "13", unit: "年", label: "2014年から発信を継続" },
  { num: "176", unit: "本", label: "登壇資料と技術記事の合計" },
  { num: "4", unit: "媒体", label: "Speaker Deck / Zenn / Qiita / SlideShare" },
  { num: "70+", unit: "登壇", label: "potatotips・iOSDC・DroidKaigi 系ほか" },
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

// 全 176 本のアーカイブ。日付降順で並べる。
export const ARCHIVE: TalkItem[] = [
  { date: "2026-09-01", platform: "Zenn", category: "ai", title: "DroidKaigi2026公式アプリContributionから学ぶAI活用と実装ポイント解説", url: "https://zenn.dev/fumiyasac/articles/808da3b5cf8df7" },
  { date: "2026-08-18", platform: "Speaker Deck", category: "cross", title: "Flutter × BLE Centralを自前Pluginで実装する設計パターン", event: "potatotips #96 iOS/Android開発Tips共有会", url: "https://speakerdeck.com/bitkey/building-custom-flutter-ble-central-plugins" },
  { date: "2026-07-27", platform: "Speaker Deck", category: "community", title: "Swift＆Xcodeのバージョンアップにまつわる怖かった思い出", event: "Toranomon Tech Hub 第8回 IT業界、本当にあった怖い話", url: "https://speakerdeck.com/bitkey/scary-memories-of-swift-and-xcode-updates" },
  { date: "2026-07-22", platform: "Speaker Deck", category: "ai", title: "iOS/Androidの二刀流エンジニアがFlutter & TypeScriptへ越境後の現在地", event: "Mobile Tech Flex #2 〜4社合同！私たちが「越境」した話〜", url: "https://speakerdeck.com/bitkey/dual-platform-mobile-engineer-shifts-to-flutter-and-typescript-the-view-and-real-thrill-of-going-flutter-first" },
  { date: "2026-07-15", platform: "Speaker Deck", category: "ai", title: "個人開発で育てる「大規模設計の苗床」", event: "第10回FlutterGakkai", url: "https://speakerdeck.com/bitkey/the-seedbed-for-large-scale-design-from-ai-era-solo-projects-to-professional-knowledge" },
  { date: "2026-05-18", platform: "Speaker Deck", category: "ai", title: "Flutter初心者が生成AIで大規模アプリ開発をキャッチアップした工夫", event: "AI NativeなFlutter開発の現在地〜業務導入の壁と、デザイン・テストへの応用〜", url: "https://speakerdeck.com/bitkey/flutter-with-llm-a-former-native-engineers-fast-track-to-large-scale-apps" },
  { date: "2026-01-22", platform: "Speaker Deck", category: "arch", title: "Riverpod3.xで実現する実践的UI実装", event: "potatotips #94 @ 株式会社YouTrust", url: "https://speakerdeck.com/fumiyasac0921/riverpod3-dot-xdeshi-xian-surushi-jian-de-uishi-zhuang" },
  { date: "2025-12-07", platform: "Zenn", category: "arch", title: "Android Architecture & Unidirectional Data FlowGuidance & Essence", url: "https://zenn.dev/fumiyasac/articles/a8a5101656ecdd" },
  { date: "2025-12-07", platform: "Zenn", category: "ai", title: "Claude Codeを利用してDroidKaigi2025公式iOSアプリにContributionをしてみた話", url: "https://zenn.dev/fumiyasac/articles/ba2b0a19f563f0" },
  { date: "2025-11-02", platform: "Speaker Deck", category: "ai", title: "Claude Codeを利用してDroidKaigi2025公式iOSアプリにContributionをしてみた話", event: "kanagawa.swift Vol.2 @ 面白法人カヤック", url: "https://speakerdeck.com/fumiyasac0921/claude-codewoli-yong-sitedroidkaigi2025gong-shi-iosapurinicontributionwositemitahua" },
  { date: "2025-10-21", platform: "Speaker Deck", category: "arch", title: "Android Architecture & Unidirectional Data Flow Guidance & Essence", event: "DroidKaigi.collect { #27@Tokyo } @ 株式会社タイミー", url: "https://speakerdeck.com/fumiyasac0921/android-architecture-and-unidirectional-data-flow-guidance-and-essence" },
  { date: "2025-10-03", platform: "Speaker Deck", category: "ui", title: "SwiftUIのGeometryReaderとScrollViewを基礎から応用まで学び直す：設計と活用事例", url: "https://speakerdeck.com/fumiyasac0921/swiftuinogeometryreadertoscrollviewwoji-chu-karaying-yong-madexue-bizhi-su-she-ji-tohuo-yong-shi-li" },
  { date: "2025-07-26", platform: "Speaker Deck", category: "community", title: "興味の胞子を育て 業務と技術に広がる”きのこ力”", event: "【非公式】きのこカンファレンス in 関西", url: "https://speakerdeck.com/fumiyasac0921/xing-wei-nobao-zi-woyu-te-ye-wu-toji-shu-niguang-garu-kinokoli" },
  { date: "2025-07-21", platform: "Speaker Deck", category: "ui", title: "StickyHeaderとScroll追従の構造を紐解く", event: "Mobile勉強会 #21 ウォンテッドリー × チームラボ × Sansan", url: "https://speakerdeck.com/fumiyasac0921/stickyheadertoscrollzhui-cong-nogou-zao-woniu-jie-ku" },
  { date: "2025-06-26", platform: "Speaker Deck", category: "ui", title: "Liquid Glass革新とSwiftUI/UIKit進化", event: "集まれSwift好き！Swift愛好会スピンオフ WWDC25セッション要約会 @ DeNA", url: "https://speakerdeck.com/fumiyasac0921/uikitjin-hua" },
  { date: "2025-05-26", platform: "Speaker Deck", category: "cross", title: "iOS/Androidで無限循環Carousel表現を考えてみる", event: "potatotips #91", url: "https://speakerdeck.com/fumiyasac0921/androiddewu-xian-xun-huan-carouselbiao-xian-wokao-etemiru" },
  { date: "2025-05-17", platform: "Speaker Deck", category: "community", title: "ノートを取る習慣を続けていたので、その記録の一部を書籍にまとめてみました", event: "JR中央線 Developers もくもく＆LT会 #21", url: "https://speakerdeck.com/fumiyasac0921/notowoqu-ruxi-guan-wosok-keteitanode-sonoji-lu-no-bu-woshu-ji-nimatometemimasita" },
  { date: "2025-04-17", platform: "Zenn", category: "ui", title: ".matchedGeometryEffectを利用してCustomTransitionの様な表現をSwiftUIで作成する際のポイント解説", url: "https://zenn.dev/fumiyasac/articles/3104ae6e8eb416" },
  { date: "2025-04-14", platform: "Zenn", category: "arch", title: "SwiftUI + VIPER + Observationを組み合わせた実装サンプル例", url: "https://zenn.dev/fumiyasac/articles/1ae699ccac36a6" },
  { date: "2025-04-08", platform: "Zenn", category: "ui", title: "Tinder風なUIをSwiftUIを利用して実装する際のアイデアと実装例紹介", url: "https://zenn.dev/fumiyasac/articles/6bca90bac89ce7" },
  { date: "2025-03-25", platform: "Speaker Deck", category: "arch", title: "Riverpod & Riverpod Generatorを利用して状態管理部分の処理を書き換えてみる簡単な事例紹介", event: "Mobile勉強会 ウォンテッドリー × チームラボ × Sansan #19", url: "https://speakerdeck.com/fumiyasac0921/riverpod-and-riverpod-generatorwoli-yong-sitezhuang-tai-guan-li-bu-fen-nochu-li-woshu-kihuan-etemirujian-dan-nashi-li-shao-jie" },
  { date: "2025-03-16", platform: "Zenn", category: "arch", title: "Riverpod & Riverpod Generatorを利用して状態管理部分の処理を書き換えてみる簡単な事例紹介", url: "https://zenn.dev/fumiyasac/articles/66023a2b2b0691" },
  { date: "2025-02-05", platform: "Speaker Deck", category: "community", title: "デザインから逆算して難易度を見積もるための観点", event: "『みんなのアジャイル』発売記念LT大会 in 虎ノ門 ／ 集まれKotlin好き！Kotlin愛好会 vol.59 @ 株式会社ログラス", url: "https://speakerdeck.com/fumiyasac0921/dezainkarani-suan-sitenan-yi-du-wojian-ji-morutamenoguan-dian" },
  { date: "2025-01-28", platform: "Speaker Deck", category: "cross", title: "iOS/Android間でUI実装を近づけるヒントと道標", event: "potatotips #90", url: "https://speakerdeck.com/fumiyasac0921/androidjian-deuishi-zhuang-wojin-dukeruhintotodao-biao" },
  { date: "2025-01-07", platform: "Speaker Deck", category: "ui", title: "GeometryReaderやスクロールを用いた表現と紐解き方", event: "Osaka.swift #1", url: "https://speakerdeck.com/fumiyasac0921/geometryreaderyasukuroruwoyong-itabiao-xian-toniu-jie-kifang" },
  { date: "2024-11-27", platform: "Speaker Deck", category: "ui", title: "SwiftUIで座標位置を取り扱う場合の細かなポイントを探ろう", event: "Mobile勉強会 ウォンテッドリー × チームラボ × Sansan #17 @ Wantedly", url: "https://speakerdeck.com/fumiyasac0921/swiftuidezuo-biao-wei-zhi-woqu-rixi-uchang-he-noxi-kanapointowotan-rou" },
  { date: "2024-11-14", platform: "Speaker Deck", category: "cross", title: "iOS/Androidで同じUI体験をネイティブで作成する際に気をつけたい落とし穴", event: "Spectrum Tokyo Meetup #15", url: "https://speakerdeck.com/fumiyasac0921/androiddetong-ziuiti-yan-wone-iteibudezuo-cheng-suruji-niqi-wotu-ketailuo-tosixue" },
  { date: "2024-10-11", platform: "Speaker Deck", category: "community", title: "DroidKaigi2024公式アプリiOS側Contribution裏話", event: "DroidKaigi 2024 おつかれさまパーティー", url: "https://speakerdeck.com/fumiyasac0921/droidkaigi2024gong-shi-apuriiosce-contributionli-hua" },
  { date: "2024-09-09", platform: "Speaker Deck", category: "cross", title: "iOSエンジニアがAndroid・Kotlinでの開発を加速させた 3年間の実践テクニック（簡易版）", event: "(Unofficial) DroidKaigi 2024 Pre Party 〜全然野菜〜 ／ Swift愛好会 vol.84", url: "https://speakerdeck.com/fumiyasac0921/androidkotlindenokai-fa-wojia-su-saseta3nian-jian-noshi-jian-tekunituku-jian-yi-ban" },
  { date: "2024-07-23", platform: "Speaker Deck", category: "cross", title: "複雑なUI実装の壁を越えるための考え方事例紹介 （iOS/Android間で実装を合わせるヒント）", event: "ししとうLT #4 -壁LT会-", url: "https://speakerdeck.com/fumiyasac0921/androidjian-deshi-zhuang-wohe-waseruhinto" },
  { date: "2024-07-14", platform: "Speaker Deck", category: "ui", title: "こんなUIってSwiftUIでこう作るのか！を解剖してみた", event: "神山.swift ／ YUMEMI.grow Mobile #15", url: "https://speakerdeck.com/fumiyasac0921/konnauituteswiftuidekouzuo-runoka-wojie-pou-sitemita" },
  { date: "2024-07-05", platform: "Speaker Deck", category: "async", title: "「swift-testingはじめました」 Quick/Nimbleからの置き換えの最初の一歩", event: "potatotips #88", url: "https://speakerdeck.com/fumiyasac0921/nimblekaranozhi-kihuan-enozui-chu-no-bu" },
  { date: "2024-06-06", platform: "Speaker Deck", category: "backend", title: "モバイルアプリ＆GraphQL化と壁を超えたコラボレーションを実現するために できそうな観点を探る", event: "Omotesando.rb #96", url: "https://speakerdeck.com/fumiyasac0921/mobairuapuri-and-graphqlhua-tobi-wochao-etakoraboresiyonwoshi-xian-surutameni-dekisounaguan-dian-wotan-ru" },
  { date: "2024-05-21", platform: "Speaker Deck", category: "ui", title: "簡単なAR機能とUI実装を組み合わせてみた記録", event: "Mobile勉強会 Wantedly × チームラボ × Sansan #14", url: "https://speakerdeck.com/fumiyasac0921/jian-dan-naarji-neng-touishi-zhuang-wozu-mihe-wasetemitaji-lu" },
  { date: "2024-05-07", platform: "Speaker Deck", category: "cross", title: "類似ロジック実装をiOS/Android間で合わせる道標No.1", event: "DroidKaigi.collect { #8@Tokyo }", url: "https://speakerdeck.com/fumiyasac0921/androidjian-dehe-waserudao-biao-no-dot-1" },
  { date: "2024-04-26", platform: "Speaker Deck", category: "cross", title: "同じ様なUIをiOS/Android間で合わせるヒントNo.2", event: "Swift/Kotlin愛好会 #51", url: "https://speakerdeck.com/fumiyasac0921/androidjian-dehe-waseruhintono-dot-2" },
  { date: "2024-03-17", platform: "Speaker Deck", category: "arch", title: "TCA入門したてなので、自分が馴染みのある実装と比較しながらキャッチアップしてみる", event: "【iOS】TCAでわいわいLT会", url: "https://speakerdeck.com/fumiyasac0921/tcaru-men-sitatenanode-zi-fen-gaxun-ran-minoarushi-zhuang-tobi-jiao-sinagarakiyatutiatupusitemiru" },
  { date: "2024-03-13", platform: "Speaker Deck", category: "async", title: "Combineを中心とした処理をSwift Concurrencyへ （これまでも調べた調査と向き合い）", event: "yumemi.grow Mobile #11", url: "https://speakerdeck.com/fumiyasac0921/combinewozhong-xin-tositachu-li-woswift-concurrencyhe-koremademodiao-betadiao-cha-toxiang-kihe-i" },
  { date: "2024-02-15", platform: "Speaker Deck", category: "community", title: "執筆の種蒔き用にしているインプットでの心掛け", event: "執筆の技術を勉強する会 #2", url: "https://speakerdeck.com/fumiyasac0921/zhi-bi-nozhong-shi-kiyong-nisiteiruinpututodenoxin-gua-ke" },
  { date: "2024-02-07", platform: "Speaker Deck", category: "arch", title: "Overviewing TCA v1.7 & Back and forth with MVVM", event: "potatotips #86", url: "https://speakerdeck.com/fumiyasac0921/overviewing-tca-v1-dot-7-and-back-and-forth-with-mvvm" },
  { date: "2023-12-26", platform: "Zenn", category: "backend", title: "Apollo iOS v1.x系の変更でインパクトがある点をおさらいする", url: "https://zenn.dev/fumiyasac/articles/39e1d398bf8637" },
  { date: "2023-12-13", platform: "Speaker Deck", category: "cross", title: "同じ様なUIをiOS/Android間で合わせるヒント", event: "Re: 2023 モバイルアプリ開発 LT大会 #AppBrew ／ Swift愛好会 #78", url: "https://speakerdeck.com/fumiyasac0921/androidjian-dehe-waseruhinto" },
  { date: "2023-10-17", platform: "Speaker Deck", category: "backend", title: "Apollo iOS v1.x系の変更でインパクトがある点をおさらいする", event: "Mobile勉強会 Wantedly × チームラボ #11", url: "https://speakerdeck.com/fumiyasac0921/apollo-ios-v1-dot-xxi-nobian-geng-deinpakutogaarudian-woosaraisuru" },
  { date: "2023-09-13", platform: "Speaker Deck", category: "community", title: "Footprints about Contribution of DroidKaigi 2023", event: "potatotips #84 ／ After iOSDC LT Night〜ピクシブ×日経×タイミー〜", url: "https://speakerdeck.com/fumiyasac0921/footprints-about-contribution-of-droidkaigi-2023" },
  { date: "2023-09-02", platform: "Speaker Deck", category: "community", title: "minneを通じて感じた歴史とその先を見据えた取り組みや挑戦に触れて", event: "iOSDC Japan 2023（スポンサーセッション）", url: "https://speakerdeck.com/fumiyasac0921/minnewotong-zitegan-zitali-shi-tosonoxian-wojian-ju-etaqu-rizu-miyatiao-zhan-nihong-rete" },
  { date: "2023-06-20", platform: "Speaker Deck", category: "async", title: "Quickを利用したUnitTestにおける細かなTips", event: "potatotips #82 iOS/Android開発Tips共有会", url: "https://speakerdeck.com/fumiyasac0921/quickwoli-yong-sitaunittestniokeruxi-kanatips" },
  { date: "2023-06-15", platform: "Zenn", category: "arch", title: "SwiftUI+Reduxを利用したUI実装サンプルにおけるポイント解説", url: "https://zenn.dev/fumiyasac/articles/01f1bc86bf8c40" },
  { date: "2023-05-15", platform: "Speaker Deck", category: "community", title: "ノートと一緒に楽しく進めるスタイル", event: "YUMEMI.grow 勉強法の勉強会", url: "https://speakerdeck.com/fumiyasac0921/nototo-xu-nile-sikujin-merusutairu" },
  { date: "2023-05-07", platform: "Speaker Deck", category: "ui", title: "UIKitによるCustomTransition・SwiftUIでの類似表現＆HeroTransition関連に関するよもやま話", event: "YUMEMI.grow Mobile #3", url: "https://speakerdeck.com/fumiyasac0921/uikitniyorucustomtransitionswiftuidenolei-si-biao-xian-and-herotransitionguan-lian-niguan-suruyomoyamahua" },
  { date: "2023-03-07", platform: "Speaker Deck", category: "arch", title: "SwiftUI&Reduxを利用したUI実装サンプルにおけるポイント解説", event: "YUMEMI.grow Mobile #1", url: "https://speakerdeck.com/fumiyasac0921/swiftui-and-reduxwoli-yong-sitauishi-zhuang-sanpuruniokerupointojie-shuo" },
  { date: "2022-12-24", platform: "Qiita", category: "ui", title: "RxDataSourceをNSDiffableDataSourceへ置き換える＆新しいUICollectionViewのAPIへ置き換える際のTIPS紹介", url: "https://qiita.com/fumiyasac@github/items/debfa8d924380555c281" },
  { date: "2022-12-18", platform: "Qiita", category: "async", title: "Firebase Realtime Database ＆ Firebase Storageでasync/awaitを利用した簡単な処理実装例の紹介", url: "https://qiita.com/fumiyasac@github/items/22f539f554981da6afb0" },
  { date: "2022-12-12", platform: "Qiita", category: "ui", title: "SwiftUIで作る「Drag処理を利用したCarousel型UI」と「Pinterest風GridレイアウトUI」の実装例とポイントまとめ", url: "https://qiita.com/fumiyasac@github/items/b5b313d9807ff858a73c" },
  { date: "2022-11-04", platform: "Qiita", category: "arch", title: "PropertyWrapperを利用したDIコンテナの利用とRxSwift+MVVMでの処理＆UnitTestに関する事例解説", url: "https://qiita.com/fumiyasac@github/items/549e10af41ce91cdfbd1" },
  { date: "2022-10-31", platform: "Speaker Deck", category: "ui", title: "RxDataSourceをNSDiffableDataSourceへ置き換える際のTips集紹介", event: "potatotips #79 iOS/Android開発Tips共有会", url: "https://speakerdeck.com/fumiyasac0921/rxdatasourcewonsdiffabledatasourcehezhi-kihuan-eruji-notipsji-shao-jie" },
  { date: "2022-10-31", platform: "SlideShare", category: "ui", title: "RxDataSourceをNSDiffableDataSourceへ置き換える際のTips集紹介", event: "potatotips #79 iOS/Android開発Tips共有会", url: "https://www.slideshare.net/slideshow/rxdatasourcensdiffabledatasourcetips/253900757" },
  { date: "2022-04-12", platform: "SlideShare", category: "ui", title: "iOS側のUIの特徴と見比べるAndroid側でのUI実装のヒント", event: "Android個人開発LT", url: "https://www.slideshare.net/slideshow/iosui-androidui/251570774" },
  { date: "2022-03-15", platform: "SlideShare", category: "async", title: "少しずつ手厚くして不具合や仕様漏れを防ぐために", event: "開発×テスト LT会 - vol.2 #devtestlt", url: "https://www.slideshare.net/slideshow/ss-251352945/251352945" },
  { date: "2022-02-17", platform: "SlideShare", category: "async", title: "Measures for Growth with Firebase Remote Config & Unit Testing Using RxSwift", url: "https://www.slideshare.net/slideshow/measures-for-growth-with-firebase-remote-config-unit-testing-using-rxswift/251191805" },
  { date: "2022-01-11", platform: "SlideShare", category: "community", title: "2022年の抱負とここ数年続けてきたインプット", event: "エンジニア 新年の抱負 超LT会 - vol.5", url: "https://www.slideshare.net/slideshow/2022-250976706/250976706" },
  { date: "2021-12-24", platform: "Qiita", category: "arch", title: "自前でDIコンテナを作ってみる試みとRxSwiftを利用した構成への適用を試してみる", url: "https://qiita.com/fumiyasac@github/items/8d6b77c3547b8b7839ad" },
  { date: "2021-12-15", platform: "Qiita", category: "ui", title: "Androidアプリでバックグラウンド再生機能を実現するためのヒントとiOSアプリとの見比べた際の特徴を簡単にまとめてみた", url: "https://qiita.com/fumiyasac@github/items/2f698d6c330530338826" },
  { date: "2021-11-17", platform: "SlideShare", category: "arch", title: "既存プロジェクトで使っていたDIをお引っ越し＆DIYすることになった", url: "https://www.slideshare.net/slideshow/didiy/250668501" },
  { date: "2021-09-16", platform: "SlideShare", category: "ui", title: "動画プレイヤーアプリの開発を通じて学んだ機能を実現するための要点解説", event: "iOSDC Japan 2021", url: "https://www.slideshare.net/slideshow/ss-250211336/250211336" },
  { date: "2021-06-30", platform: "SlideShare", category: "ui", title: "UI実装に関するセッションを簡単ながら振り返ってみる（仮）", url: "https://www.slideshare.net/slideshow/ui-249547564/249547564" },
  { date: "2021-03-26", platform: "SlideShare", category: "cross", title: "最近の業務やAndroid関連のインプットと振り返り", event: "potatotips #73", url: "https://www.slideshare.net/slideshow/android-245108194/245108194" },
  { date: "2020-12-22", platform: "SlideShare", category: "cross", title: "少しずつキャッチアップしていくAndroidアプリ開発の補足と振り返り", event: "potatotips #72", url: "https://www.slideshare.net/slideshow/android-240434551/240434551" },
  { date: "2020-11-04", platform: "SlideShare", category: "cross", title: "少しずつキャッチアップしていくAndroidアプリ開発", event: "あるあるLT #13", url: "https://www.slideshare.net/slideshow/android-239074927/239074927" },
  { date: "2020-10-23", platform: "SlideShare", category: "ui", title: "UIKitやSwiftUIで表現や動きが特徴的なUI実装事例を考察する", url: "https://www.slideshare.net/slideshow/uikitswiftuiui/238952031" },
  { date: "2020-08-04", platform: "SlideShare", category: "arch", title: "レイヤー分けをしたアーキテクチャで作るiOSアプリ＆バックエンドのサンプル実装をのぞく", event: "あるあるLT 〜エンジニアも子供も、デザイナーも〜vol.12", url: "https://www.slideshare.net/slideshow/ios-237557647/237557647" },
  { date: "2020-05-15", platform: "SlideShare", category: "arch", title: "iOSアプリ開発で意識すると役立ちそうな「つなぎ目」の部分について", event: "YUMEMI.swift #7 ~あつまれルーキーの森~", url: "https://www.slideshare.net/slideshow/ios-234030619/234030619" },
  { date: "2019-12-23", platform: "Qiita", category: "arch", title: "UICollectionViewCompositionalLayout & DiffableDataSourceを利用したUIとCombineを利用したMVVMパターンでのAPI通信関連処理との組み合わせた実装の紹介とまとめ", url: "https://qiita.com/fumiyasac@github/items/12165641c6569fde52ba" },
  { date: "2019-11-11", platform: "SlideShare", category: "async", title: "試して感覚を掴んでみるUICollectionViewCompositionalLayout & Combine", event: "potatotips #63", url: "https://www.slideshare.net/slideshow/uicollectionviewcompositionallayout-combine/192280132" },
  { date: "2019-09-18", platform: "SlideShare", category: "community", title: "デザイナー→Webエンジニア→iOSエンジニアと渡り歩いた僕なりのSwiftとの向き合い方と生かす戦略", event: "iOSDC Reject Conference Day2", url: "https://www.slideshare.net/slideshow/webiosswift/173339520" },
  { date: "2019-09-17", platform: "SlideShare", category: "ui", title: "何故に私達（特に私）はアプリのアニメーションやUI表現に魅了されるのか？ そして共存と向き合いを考える", event: "iOSDC Reject Conference Day1", url: "https://www.slideshare.net/slideshow/ui-172957909/172957909" },
  { date: "2019-07-24", platform: "SlideShare", category: "ui", title: "アプリ開発におけるテキスト装飾のアイデア集", event: "potatotips #63", url: "https://www.slideshare.net/slideshow/ss-157519608/157519608" },
  { date: "2019-05-28", platform: "SlideShare", category: "ui", title: "ライブラリやView構造を有効活用してiOSアプリのUIをオシャレにするワザ紹介", event: "nori-na Tech Night #3", url: "https://www.slideshare.net/slideshow/view-iosui/147939364" },
  { date: "2019-05-10", platform: "SlideShare", category: "ui", title: "部品に切り分けて考えるView構造とライブラリを上手に活用したUI実装", event: "Swift愛好会 #40", url: "https://www.slideshare.net/slideshow/viewui/144760473" },
  { date: "2019-03-29", platform: "SlideShare", category: "ui", title: "UI表現ライブラリを有効活用してiOSアプリのUIをオシャレにするワザ紹介", event: "Swift愛好会 #39", url: "https://www.slideshare.net/slideshow/ui-iosui/138644838" },
  { date: "2019-03-27", platform: "SlideShare", category: "ui", title: "iOSアプリで気になった動きや表現を上手にアレンジして活用してみる", event: "potatotips #60 (iOS/Android開発Tips共有会)", url: "https://www.slideshare.net/slideshow/ios-138412435/138412435" },
  { date: "2019-03-13", platform: "SlideShare", category: "ui", title: "iOSアプリUIとの触れ合いと歩む僕なりのSwiftの楽しみ方", event: "FiNC Tech Meetup #2 ~try! Swift前夜祭~", url: "https://www.slideshare.net/slideshow/iosuiswift/135990539" },
  { date: "2019-02-21", platform: "SlideShare", category: "ui", title: "Approach of Prototyping for making Application User Interface about iOS", event: "エンジニア総選挙（ドリコム株式会社）", url: "https://www.slideshare.net/slideshow/approach-of-prototyping-for-making-application-user-interface-about-ios/132675287" },
  { date: "2019-01-28", platform: "SlideShare", category: "ui", title: "Hint of“Passcode Lock”Screen and Logic (with LocalAuthentication).", event: "potatotips #58", url: "https://www.slideshare.net/slideshow/hint-ofpasscode-lockscreen-and-logic-with-localauthentication/129554318" },
  { date: "2019-01-19", platform: "SlideShare", category: "ui", title: "Hint of a little ingenuity about UI.", url: "https://www.slideshare.net/slideshow/hint-of-a-little-ingenuity-about-ui/128446160" },
  { date: "2018-12-24", platform: "Qiita", category: "ui", title: "画面のパスコードロック機能を構築する際における実装例とポイントまとめ", url: "https://qiita.com/fumiyasac@github/items/6124f9b272f5ee6ebb40" },
  { date: "2018-12-21", platform: "SlideShare", category: "ui", title: "メディアアプリでよく見る無限スクロールするタブの動きへの考察", event: "ROPPONGI.swift 第6回 望年会", url: "https://www.slideshare.net/slideshow/ss-126426523/126426523" },
  { date: "2018-12-17", platform: "SlideShare", category: "arch", title: "RxSwiftとMVVMパターンと仲良くなる次のステップ", event: "potatotips #57 (iOS/Android開発Tips共有会)", url: "https://www.slideshare.net/slideshow/rxswiftmvvm-126152551/126152551" },
  { date: "2018-12-13", platform: "Qiita", category: "async", title: "RxSwiftとUIライブラリの表現を組み合わせたサンプル紹介", url: "https://qiita.com/fumiyasac@github/items/e426d321fbb8ab846bb6" },
  { date: "2018-12-10", platform: "SlideShare", category: "async", title: "まずはできるところから始めるUnitTestとテストができる実装について", event: "iOS Test Night #9 - 2周年 -", url: "https://www.slideshare.net/slideshow/unittest-125506754/125506754" },
  { date: "2018-12-05", platform: "SlideShare", category: "community", title: "書籍執筆からの今後に向けてのロードマップ", url: "https://www.slideshare.net/slideshow/ss-124995030/124995030" },
  { date: "2018-12-02", platform: "Qiita", category: "ui", title: "ライブラリなしでメディアアプリでよく見る無限スクロールするタブの動きを実装したUIサンプルの紹介", url: "https://qiita.com/fumiyasac@github/items/af4fed8ea4d0b94e6bc4" },
  { date: "2018-11-04", platform: "Qiita", category: "arch", title: "ReduxとSwiftの組み合わせを利用したUIサンプル事例紹介", url: "https://qiita.com/fumiyasac@github/items/f25465a955afdcb795a2" },
  { date: "2018-10-16", platform: "SlideShare", category: "arch", title: "ReduxとSwiftの組み合わせ：改訂版", event: "Otemachi.swift #02", url: "https://www.slideshare.net/slideshow/reduxswift/119588623" },
  { date: "2018-09-20", platform: "SlideShare", category: "community", title: "デザイナーと一緒にコラボして仕上げるアニメーション実装とショーケース紹介", event: "iOSDC Reject Conference Day2", url: "https://www.slideshare.net/slideshow/ss-115550134/115550134" },
  { date: "2018-08-15", platform: "SlideShare", category: "arch", title: "Fundamentals of Swift & Redux (ReduxとSwiftの組み合わせ)", event: "ROPPONGI.swift 第5回", url: "https://www.slideshare.net/slideshow/fundamentals-of-swift-redux-reduxswift/109923472" },
  { date: "2018-07-24", platform: "Qiita", category: "cross", title: "ReactNative+Redux+NativeBaseでつくるサンプル実装をのぞく", url: "https://qiita.com/fumiyasac@github/items/e27a5901dde1dbcb2086" },
  { date: "2018-06-26", platform: "SlideShare", category: "backend", title: "Go言語で色々試行錯誤してフレームワークもどきを作ってみた話", event: "LTLovers 4th - My neutral fat is high -", url: "https://www.slideshare.net/slideshow/go-103161942/103161942" },
  { date: "2018-06-22", platform: "SlideShare", category: "cross", title: "ReactNative + Redux + NativeBaseでつくるサンプル実装をのぞく", event: "React Native Meetup #8", url: "https://www.slideshare.net/slideshow/reactnative-redux-nativebase/102812566" },
  { date: "2018-05-31", platform: "SlideShare", category: "ui", title: "iOSのUI構築小技集（小さなとこから始められる編）", event: "ever sense × Green Snap 合同勉強会", url: "https://www.slideshare.net/slideshow/ios-ui-minitips-99750578/99750578" },
  { date: "2018-04-15", platform: "Qiita", category: "ui", title: "UIを作る際にライブラリにする？それともDIYする？の切り分けと実装のアイデア帳 (@Swift Tweets 2018 Spring)", url: "https://qiita.com/fumiyasac@github/items/144aec1e1726500d9d5a" },
  { date: "2018-04-03", platform: "SlideShare", category: "ui", title: "できるだけUI系のライブラリを用いないアニメーションを盛り込んだサンプル実装まとめ（追加版）", event: "Roppongi.swift #2", url: "https://www.slideshare.net/slideshow/ui-92750134/92750134" },
  { date: "2018-03-04", platform: "Qiita", category: "ui", title: "Tinder風なUIを実装する際のアイデアと実装例紹介", url: "https://qiita.com/fumiyasac@github/items/c68b7ce812bf3ef48a67" },
  { date: "2018-02-14", platform: "SlideShare", category: "ui", title: "Tinder風なUIを実装する際のアイデアと実装例紹介", event: "第2回 iOS UI実装勉強会", url: "https://www.slideshare.net/slideshow/tinderui-87980322/87980322" },
  { date: "2018-01-29", platform: "SlideShare", category: "ui", title: "UIを作る際にライブラリにする？それともDIYする？の切り分け&実装のアイデア例と事例紹介", event: "Otemachi.swift x Kyobashi.swift #02", url: "https://www.slideshare.net/slideshow/uidiy/86849812" },
  { date: "2018-01-17", platform: "SlideShare", category: "ui", title: "UIを作る際にライブラリにする？それともDIYする？の切り分け（僕の見解）", event: "Akiba.swift #12 質疑トーク回!", url: "https://www.slideshare.net/slideshow/ui-diy/86258079" },
  { date: "2017-12-20", platform: "Qiita", category: "async", title: "個人開発及び実務でユニットテストに助けられたと個人的に感じた例の紹介", url: "https://qiita.com/fumiyasac@github/items/19c525116f1b585bb43f" },
  { date: "2017-12-09", platform: "Qiita", category: "ui", title: "Swift4にも対応したUI系のライブラリを活用して面白い動きを入れてみたサンプル実装まとめ", url: "https://qiita.com/fumiyasac@github/items/48617348ef7f18494d38" },
  { date: "2017-12-03", platform: "Qiita", category: "ui", title: "できるだけUI系のライブラリを用いないアニメーションを盛り込んだサンプル実装まとめ（後編）", url: "https://qiita.com/fumiyasac@github/items/b694f9859cbb61c95c1a" },
  { date: "2017-11-27", platform: "SlideShare", category: "ui", title: "できるだけUI系のライブラリを用いないアニメーションを盛り込んだサンプル実装まとめ", event: "potatotips #45 (iOS/Android開発Tips共有会)", url: "https://www.slideshare.net/slideshow/ui-82822810/82822810" },
  { date: "2017-11-24", platform: "Qiita", category: "ui", title: "できるだけUI系のライブラリを用いないアニメーションを盛り込んだサンプル実装まとめ（前編）", url: "https://qiita.com/fumiyasac@github/items/d1b56ffc6d7d46c0a616" },
  { date: "2017-10-20", platform: "SlideShare", category: "cross", title: "SwiftとReactNativeで似たようなUIを作った際の記録", event: "iOSDC 2017 Reject Conference days2", url: "https://www.slideshare.net/slideshow/swiftreactnativeui/81012548" },
  { date: "2017-08-08", platform: "SlideShare", category: "community", title: "自分のライブラリを1年運用をして見た振り返りと知見", event: "Otemachi.swift x Kyobashi.swift #01", url: "https://www.slideshare.net/slideshow/1-78666682/78666682" },
  { date: "2017-04-30", platform: "Qiita", category: "cross", title: "NativeBaseをはじめとするUI関連のライブラリを活用してReactNativeでUIサンプルを作成した際の詳細解説", url: "https://qiita.com/fumiyasac@github/items/12707f93f5c96fa3fc3f" },
  { date: "2017-04-20", platform: "SlideShare", category: "ui", title: "NativeBaseをはじめとするUIに関するライブラリを使ったサンプルを作ってみた", event: "React & ReactNative入門者の会#2", url: "https://www.slideshare.net/slideshow/nativebaseui/75217517" },
  { date: "2017-03-20", platform: "Qiita", category: "cross", title: "ReactNative事始めから簡単なサンプルを読み解くまでの実践記録ノート", url: "https://qiita.com/fumiyasac@github/items/71b8ff88d96289d43593" },
  { date: "2017-02-17", platform: "SlideShare", category: "ui", title: "指の動きや遷移時等のアニメーションを生かしたUIのサンプル解説", event: "第21回Swiftビギナーズ勉強会", url: "https://www.slideshare.net/slideshow/ui-72280995/72280995" },
  { date: "2017-02-14", platform: "SlideShare", category: "async", title: "RxSwiftでの実装練習の記録ノートとはじめの一歩", event: "potatotips #37", url: "https://www.slideshare.net/slideshow/rxswift-72129568/72129568" },
  { date: "2017-02-02", platform: "Qiita", category: "arch", title: "RxSwiftでの実装練習の記録ノート（後編：DriverパターンとAPIへの通信を伴うMVVM構成のサンプル例）", url: "https://qiita.com/fumiyasac@github/items/da762ea512484a8291a3" },
  { date: "2017-01-26", platform: "SlideShare", category: "ui", title: "カスタムトランジションやアニメーションを活用した「写真を生かすUI」のサンプル", event: "shibuya.swift #7", url: "https://www.slideshare.net/slideshow/ui-71408887/71408887" },
  { date: "2017-01-24", platform: "SlideShare", category: "ui", title: "カスタムトランジションやジェスチャーを生かしたUIの実装ポイント", event: "iOS Creators' Meetup vol.3", url: "https://www.slideshare.net/slideshow/ui-71313919/71313919" },
  { date: "2017-01-23", platform: "Qiita", category: "async", title: "RxSwiftでの実装練習の記録ノート（前編：Observerパターンの例とUITableViewの例）", url: "https://qiita.com/fumiyasac@github/items/90d1ebaa0cd8c4558d96" },
  { date: "2017-01-13", platform: "SlideShare", category: "backend", title: "Firebaseでのファイルアップロード処理と便利ライブラリの紹介", event: "【MT東京−31】バレンタインデー1ヶ月前から始めるSwift×MT Data API", url: "https://www.slideshare.net/slideshow/firebase-70996365/70996365" },
  { date: "2017-01-07", platform: "Qiita", category: "ui", title: "ジェスチャーやカスタムトランジションを利用して入力時やコンテンツ表示時に一工夫を加えたUIの実装ポイントまとめ", url: "https://qiita.com/fumiyasac@github/items/6c4c2b909a821932be04" },
  { date: "2016-12-25", platform: "Qiita", category: "backend", title: "1年前に作成したミニマムチュートリアル(Laravel5.1)をLaravel5.3で書き直した際の補足資料まとめ", url: "https://qiita.com/fumiyasac@github/items/c45ddcf5c31b6505b23c" },
  { date: "2016-12-21", platform: "SlideShare", category: "ui", title: "あのアプリの動きをUIKitのみでDIYしてみる（part2）", event: "雑兵MeetUp #8 LT大会 〜伝えたい事が、あるんだ〜", url: "https://www.slideshare.net/slideshow/uikitdiypart2/70329698" },
  { date: "2016-12-20", platform: "Qiita", category: "ui", title: "FacebookやTwitterのアプリで気になった表現を自分なりにトレースした際の実装ポイントまとめ（タイルレイアウトがサムネイル画像の枚数に応じて変わる表現）", url: "https://qiita.com/fumiyasac@github/items/3be1344255b3ebb9f416" },
  { date: "2016-12-17", platform: "Qiita", category: "backend", title: "Firebaseのデータを扱い易くするライブラリ（Salada）を用いたToDoリストのサンプルとStorageへのアップロード処理に関するメモ", url: "https://qiita.com/fumiyasac@github/items/40f143a53895282f80f8" },
  { date: "2016-12-09", platform: "Qiita", category: "ui", title: "ECやメディア系のアプリでよくある遷移時のカスタムトランジションやアニメーションを活用した「写真を生かすUI」のサンプル", url: "https://qiita.com/fumiyasac@github/items/04c66743a3c829d39b1f" },
  { date: "2016-11-20", platform: "SlideShare", category: "ui", title: "ライブラリでよくある動きをUIKitのみでDIYしてみる(Part1)", event: "Shinagawa.swift #1", url: "https://www.slideshare.net/slideshow/uikitdiypart1/69314989" },
  { date: "2016-10-29", platform: "Qiita", category: "ui", title: "SwiftでStoryboardとContainerViewを活用して、動きに合わせた細部のアレンジを加えたサンプル例（iOSで良くあるライブラリを参考にDIYしました）", url: "https://qiita.com/fumiyasac@github/items/eb5b17ab90f5aa27b793" },
  { date: "2016-10-04", platform: "SlideShare", category: "community", title: "デザイナーだった記憶を忘れないために自分なりに気をつけていること", event: "Collabo Tips（コラボチップス） #2", url: "https://www.slideshare.net/slideshow/ss-66699142/66699142" },
  { date: "2016-09-30", platform: "Qiita", category: "backend", title: "Rails5でAPIモードでファイルアップロード機能を作成した際のサンプル解説とポイントまとめ", url: "https://qiita.com/fumiyasac@github/items/1ef428095f5845988463" },
  { date: "2016-09-24", platform: "SlideShare", category: "backend", title: "Rails5とAPIモードについての解説", event: "Ruby / Rails ビギナーズ勉強会 第16回 #coedorb", url: "https://www.slideshare.net/slideshow/rails5api/66377454" },
  { date: "2016-09-19", platform: "SlideShare", category: "ui", title: "ContainerViewとStoryboardとSwift3.0の交響曲（シンフォニー）", event: "AKIBA.swift 第5回", url: "https://www.slideshare.net/slideshow/containerviewstoryboardswift30/66154453" },
  { date: "2016-09-18", platform: "Qiita", category: "ui", title: "(Swift3.0対応)ContainerViewとStoryboardをフル活用して複雑なUIを作るサンプルをSwift3.0へ書き直し対応した際のまとめ", url: "https://qiita.com/fumiyasac@github/items/3218c35de5e59f3bfafa" },
  { date: "2016-09-15", platform: "SlideShare", category: "backend", title: "LaravelでDBを使用しないbasic認証を簡単につくるtips", event: "雑兵Meetup #6 zohyo-fes", url: "https://www.slideshare.net/slideshow/laraveldbbasictips/66038048" },
  { date: "2016-09-13", platform: "Qiita", category: "ui", title: "SwiftでContainerViewとStoryboardをフル活用して複雑なUIを実現する際の実装ポイントまとめ", url: "https://qiita.com/fumiyasac@github/items/17cbcffd90deee2cff43" },
  { date: "2016-08-28", platform: "Qiita", category: "ui", title: "Swiftで便利なライブラリやUIパーツに工夫を凝らしてUIを彩るサンプル例（ライブラリ選定とベース作成）", url: "https://qiita.com/fumiyasac@github/items/96a588c4f7bfc901f729" },
  { date: "2016-08-28", platform: "SlideShare", category: "community", title: "30代からのプライベートiOSデベロッパーのとしての軌跡", event: "iOSDC Reject Conference days1", url: "https://www.slideshare.net/slideshow/30i-os/65440986" },
  { date: "2016-08-23", platform: "Qiita", category: "backend", title: "Laravel本体の認証機能とは別にDB情報を使わないbasic認証を実装するサンプル", url: "https://qiita.com/fumiyasac@github/items/cdf854008e7487148a67" },
  { date: "2016-07-19", platform: "SlideShare", category: "community", title: "実装とアプリ開発と独学でiOSアプリ開発と向き合うこと", event: "potatotips #31", url: "https://www.slideshare.net/slideshow/ios-64170020/64170020" },
  { date: "2016-06-26", platform: "SlideShare", category: "backend", title: "Ruby on railsでlinebotを試した記録", event: "CoEdo.rb Ruby / Railsビギナーズ勉強会第12回", url: "https://www.slideshare.net/slideshow/ruby-on-railslinebot-63450407/63450407" },
  { date: "2016-05-29", platform: "Qiita", category: "ui", title: "日本の祝祭日を計算してカレンダ－に表示するアプリサンプル", url: "https://qiita.com/fumiyasac@github/items/33bfc07ad36dfffcdf8f" },
  { date: "2016-05-29", platform: "SlideShare", category: "ui", title: "日本の祝祭日を計算してカレンダ－に表示するアプリサンプル", event: "集まれSwift好き！Swift愛好会 #7", url: "https://www.slideshare.net/slideshow/ss-62509450/62509450" },
  { date: "2016-04-24", platform: "SlideShare", category: "ui", title: "UIPageViewControllerとContainerViewでこんな見た目を実現するTips", event: "集まれSwift好き！Swift愛好会 #6", url: "https://www.slideshare.net/slideshow/uipageviewcontrollercontainerviewtips/61278600" },
  { date: "2016-04-23", platform: "Qiita", category: "ui", title: "iPhoneアプリでUIを作るためのTipsとContainerView・UIPageViewControllerを使ったサンプル紹介", url: "https://qiita.com/fumiyasac@github/items/1244abc8e3286c47ef50" },
  { date: "2016-04-10", platform: "SlideShare", category: "backend", title: "言語は違うけどもインスパイアされて作られたとあるライブラリ（PaperclipとLaravel-stapler）", event: "雑兵Meetup #4", url: "https://www.slideshare.net/slideshow/papercliplaravelstapler-60716244/60716244" },
  { date: "2016-04-10", platform: "SlideShare", category: "ui", title: "時間制限付きクイズアプリをつくる", event: "第14回Swiftビギナーズ勉強会", url: "https://www.slideshare.net/slideshow/ss-60715876/60715876" },
  { date: "2016-03-28", platform: "Qiita", category: "ui", title: "時間制限付きクイズアプリをつくるサンプル紹介と実装ポイントのまとめ(怒涛のフルカスタマイズバージョン)", url: "https://qiita.com/fumiyasac@github/items/18ae522885b5aa507ca3" },
  { date: "2016-03-16", platform: "Qiita", category: "backend", title: "Laravel5.1で作るファイルアップロードライブラリLaravel-Staplerの利用方法＆AWS S3との連携Tips", url: "https://qiita.com/fumiyasac@github/items/a73d3598d75e749ba443" },
  { date: "2016-02-14", platform: "SlideShare", category: "backend", title: "mBaaSの基本的な扱い方の事始め(parse.comとNCMBの使い方比べ)", event: "第13回Swiftビギナーズ勉強会", url: "https://www.slideshare.net/slideshow/m-baasparsecomncmb/58239013" },
  { date: "2016-02-13", platform: "Qiita", category: "backend", title: "ニフティクラウドmobile backendを利用した画像付きメモアプリ作成のポイントまとめ(Parse.comとの比較付き)", url: "https://qiita.com/fumiyasac@github/items/7549acb9610860de1733" },
  { date: "2016-02-03", platform: "Qiita", category: "ui", title: "ニフティクラウドmobile backendの事始めと導入手順まとめ", url: "https://qiita.com/fumiyasac@github/items/53d9d45d880b0e523417" },
  { date: "2016-01-20", platform: "Qiita", category: "backend", title: "Swift2系でParse.comを利用したサンプルアプリ（Chapter3: 登録データをUITableViewに一覧＆詳細表示と追加・変更・削除に関する処理）", url: "https://qiita.com/fumiyasac@github/items/c08210196db894b322e2" },
  { date: "2016-01-16", platform: "Qiita", category: "backend", title: "PaperclipとAWS S3を用いた画像アップロード機能作成手順まとめ", url: "https://qiita.com/fumiyasac@github/items/320f80dcab492b3e31ab" },
  { date: "2016-01-07", platform: "Qiita", category: "backend", title: "Realmを使用したコメント機能付き記録アプリで見る実装ポイント（CoreDataと比較付き）", url: "https://qiita.com/fumiyasac@github/items/cbdf4d36cc14e213aaa7" },
  { date: "2016-01-07", platform: "SlideShare", category: "backend", title: "Core dataと比較してrealmを使ったまとめ", event: "Swiftビギナーズ勉強会 第12回", url: "https://www.slideshare.net/slideshow/core-datarealm/56792538" },
  { date: "2015-12-30", platform: "Qiita", category: "backend", title: "Swift2系でParse.comを利用したサンプルアプリ（Chapter2:ParseUIを利用した基本的なアカウント認証処理）", url: "https://qiita.com/fumiyasac@github/items/2f13f48bda7f945d39d5" },
  { date: "2015-12-27", platform: "Qiita", category: "ui", title: "音声読み上げ機能簡易サンプルと実装ポイントまとめ（※注記あり）", url: "https://qiita.com/fumiyasac@github/items/379b51b23703287b1999" },
  { date: "2015-12-25", platform: "Qiita", category: "backend", title: "Laravelの環境設定＆開発体験自作Laravel5.1ミニマムチュートリアルまとめ", url: "https://qiita.com/fumiyasac@github/items/78a335880f7abb1de8bf" },
  { date: "2015-12-22", platform: "Qiita", category: "ui", title: "カロリー記録サンプルアプリで見る実装ポイントまとめ", url: "https://qiita.com/fumiyasac@github/items/7463e0e1ea149ee4e9f7" },
  { date: "2015-12-19", platform: "SlideShare", category: "ui", title: "Container view活用術とポイントになる部分", event: "12/20 集まれSwift好き！Swift愛好会", url: "https://www.slideshare.net/slideshow/container-view/56294326" },
  { date: "2015-12-17", platform: "Qiita", category: "backend", title: "Swift2系でParse.comを利用したサンプルアプリ（Chapter1:導入と疎通の確認まで）", url: "https://qiita.com/fumiyasac@github/items/5f0e77728221aade5027" },
  { date: "2015-12-15", platform: "SlideShare", category: "ui", title: "デザインにもこだわったUiの事始め3", event: "第1回Shibuya.swift", url: "https://www.slideshare.net/slideshow/ui3-56181535/56181535" },
  { date: "2015-12-15", platform: "SlideShare", category: "ui", title: "Apple watch対応アプリのポイントや基本実装・連携tips", event: "第10回Swiftビギナーズ勉強会", url: "https://www.slideshare.net/slideshow/apple-watchtips/56181452" },
  { date: "2015-12-15", platform: "SlideShare", category: "backend", title: "Railsの現場に入る前のお話（勉強法）", event: "TokyuRubyKaigi09", url: "https://www.slideshare.net/slideshow/rails-56181384/56181384" },
  { date: "2015-12-15", platform: "SlideShare", category: "backend", title: "Parse.comを使ってみた感想とまとめ", event: "第1回 カジュアル Swift プログラミング勉強会 ＠ 青葉台", url: "https://www.slideshare.net/slideshow/parsecom-56181079/56181079" },
  { date: "2015-12-08", platform: "Qiita", category: "ui", title: "メディア系アプリでよくあるUIを実現した簡易サンプル", url: "https://qiita.com/fumiyasac@github/items/2490990be4c011935368" },
  { date: "2015-12-04", platform: "Qiita", category: "ui", title: "Swift2.xでUITextView内のテキストをHTMLとして表示する", url: "https://qiita.com/fumiyasac@github/items/40c5250fbed9fe705296" },
  { date: "2015-11-25", platform: "Qiita", category: "ui", title: "Swift2.0でレスポンスのXMLをUITableViewに一覧表示をするサンプル", url: "https://qiita.com/fumiyasac@github/items/02a7b962e9a2013c56a0" },
  { date: "2015-05-28", platform: "SlideShare", category: "backend", title: "Paperclip&amazon s3で画像アップロード", url: "https://www.slideshare.net/slideshow/paperclipamazon-s3/48731076" },
  { date: "2015-05-08", platform: "SlideShare", category: "ui", title: "デザインにもこだわったUIの事始め (Episode1)", event: "第7回Swiftビギナーズ勉強会", url: "https://www.slideshare.net/slideshow/ui-47919323/47919323" },
  { date: "2015-03-12", platform: "SlideShare", category: "ui", title: "ハンドメイドカレンダー第15回potatotips用", event: "第15回potatotips", url: "https://www.slideshare.net/slideshow/15potatotips/45746961" },
  { date: "2015-02-14", platform: "SlideShare", category: "ui", title: "20150215勉強会", url: "https://www.slideshare.net/slideshow/20150215/44666848" },
  { date: "2015-01-10", platform: "SlideShare", category: "ui", title: "Optional型の簡単な説明", event: "Swiftビギナーズ倶楽部", url: "https://www.slideshare.net/slideshow/optional-43391115/43391115" },
  { date: "2014-12-21", platform: "SlideShare", category: "ui", title: "ハンドメイドカレンダー（プレゼン用）", url: "https://www.slideshare.net/slideshow/ss-42911795/42911795" },
];
