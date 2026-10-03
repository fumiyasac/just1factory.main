// Showcaseページで表示するデータ。
// 1) REPOS: UI実装ショーケースとしてGitHub上に公開している個人開発リポジトリ群
// 2) GISHOHAKU: 技術書同人誌博覧会 公式サイトの運用保守Contribution
//
// 個人開発REPOSはTalksのCATEGORIESと同じ方針で6種類のカテゴリーに分類し、
// 各リポジトリに実務(iOS/Android/Flutterエンジニアとしての現場開発)との接点を
// 明記したshort descriptionを添えている。

export type RepoCategory =
  | "oss"       // 公開OSS
  | "swiftui"   // SwiftUI + 新しいAPIのUI実装
  | "uikit"     // UIKit / UICollectionView / UIScrollViewのUI実装
  | "rx"        // RxSwift / Reduxによる状態管理
  | "flutter"   // Flutter + Riverpod / Drift / Firestore
  | "research"; // 技術調査・比較用リポジトリ

export type RepoCategoryInfo = {
  label: string;
  desc: string;
};

export const REPO_CATEGORIES: Record<RepoCategory, RepoCategoryInfo> = {
  oss:      { label: "公開OSS",              desc: "実運用アプリで利用できる公開OSSとして継続メンテナンスしているリポジトリ" },
  swiftui:  { label: "SwiftUI",               desc: "SwiftUI・Observation・SwiftDataなど新しいiOS APIのUI実装検証" },
  uikit:    { label: "UIKit",                 desc: "UIKit・UICollectionView・UIScrollViewを組み合わせたUI実装検証" },
  rx:       { label: "RxSwift / Redux",       desc: "RxSwift・Reduxによる状態管理とUI実装の組み合わせ検証" },
  flutter:  { label: "Flutter",               desc: "Flutter + Riverpod / Drift / Firestoreを組み合わせたUI実装検証" },
  research: { label: "技術調査",              desc: "ライブラリのバージョン差分やアーキテクチャ移行を目的とした比較用リポジトリ" },
};

export type RepoItem = {
  slug: string;                 // GitHub上のリポジトリ名
  category: RepoCategory;
  featured?: boolean;           // OSSなど特に前面に出したいものだけtrue
  title: string;                // 一言タイトル
  description: string;          // 短い紹介文(実務との接点も併記)
  stack: string[];              // 技術スタックチップ (2〜4個程度)
  url: string;                  // GitHub URL
};

export const REPOS: RepoItem[] = [
  // ------ OSS ------
  {
    slug: "handMadeCalendarAdvance",
    category: "oss",
    featured: true,
    title: "Swift版 日本の祝祭日判定コードとカレンダーサンプル",
    description:
      "iOSアプリで頻繁に必要になる「日本の祝日判定」を、外部APIに依存せずSwiftのみで完結させる公開OSS。iOSアプリの現場で扱うカレンダーUI・予約フロー・期日計算にそのまま組み込める設計で、Star数の伸びに合わせて継続的にメンテナンスしている。",
    stack: ["Swift", "Calendar", "Public OSS"],
    url: "https://github.com/fumiyasac/handMadeCalendarAdvance",
  },

  // ------ SwiftUI ------
  {
    slug: "SimpleObservationViperExample",
    category: "swiftui",
    title: "SwiftUI + VIPER + Observationの実装サンプル",
    description:
      "SwiftUIにObservationマクロを組み合わせ、VIPERレイヤー構成のまま新APIへ移行する道筋を確認したサンプル。既存UIKitアプリを段階的にSwiftUI化する現場での判断材料として活用できる。",
    stack: ["SwiftUI", "Observation", "VIPER"],
    url: "https://github.com/fumiyasac/SimpleObservationViperExample",
  },
  {
    slug: "SimpleMediaReaderExample",
    category: "swiftui",
    title: "SwiftData + インタラクティブ画面遷移のメディア一覧サンプル",
    description:
      "SwiftDataによるお気に入り機能とインタラクティブな画面遷移を組み合わせたメディア型UI。CoreDataからの移行検討や、SwiftUIでの状態永続化を実務に持ち込む際の実装検証として利用している。",
    stack: ["SwiftUI", "SwiftData", "Transition"],
    url: "https://github.com/fumiyasac/SimpleMediaReaderExample",
  },
  {
    slug: "CharacteristicStyleSwiftUIExample",
    category: "swiftui",
    title: "特徴的なUIをトレース&応用したSwiftUI実装サンプル",
    description:
      "他アプリで見かけた個性的なUI表現をSwiftUIでトレースし、応用しやすい形に整えた実装集。企画・デザイナーとのUI検討で「これSwiftUIで実現できますか」の相談に即答するためのストックとして利用している。",
    stack: ["SwiftUI", "Animation", "Layout"],
    url: "https://github.com/fumiyasac/CharacteristicStyleSwiftUIExample",
  },
  {
    slug: "ScrollableTabActionExample",
    category: "swiftui",
    title: "ScrollViewReaderを活用したTab型表現のSwiftUI実装サンプル",
    description:
      "ScrollViewの性質とScrollViewReaderを組み合わせ、水平タブ切り替えとスクロール連動をSwiftUIで実現。カテゴリー切り替え・記事一覧・EC商品タブ等の実務UIに横展開できる作りにしている。",
    stack: ["SwiftUI", "ScrollView", "ScrollViewReader"],
    url: "https://github.com/fumiyasac/ScrollableTabActionExample",
  },
  {
    slug: "TinderCartExampleSwiftUI",
    category: "swiftui",
    title: "Tinder風のCard切り替え操作のSwiftUI実装サンプル",
    description:
      "SwiftUIのgesture / animation / transitionを組み合わせてTinder風のカード切り替えを再現。マッチング系や診断系サービスで頻出する操作感を、実装の勘どころ込みで持ち運べる形にした。",
    stack: ["SwiftUI", "Gesture", "Animation"],
    url: "https://github.com/fumiyasac/TinderCartExampleSwiftUI",
  },
  {
    slug: "SwiftUIAndReduxExample",
    category: "swiftui",
    title: "SwiftUI + Reduxによる画面状態管理サンプル",
    description:
      "SwiftUIのView表現とReduxによる単方向データフローを組み合わせ、規模が大きくなっても破綻しない状態管理の書き方を検証。BFFやAPI連携を含む実プロダクトへの適用時の判断材料にしている。",
    stack: ["SwiftUI", "Redux", "State"],
    url: "https://github.com/fumiyasac/SwiftUIAndReduxExample",
  },
  {
    slug: "LikeCoodinatorLayoutExample",
    category: "swiftui",
    title: "AndroidのCoordinatorLayout風の動きをSwiftUIで実装",
    description:
      "Androidで親しみやすいCoordinatorLayoutのスクロール連動ヘッダをSwiftUIで再現。iOS/Androidを横断する開発者として、両OS間のUI表現の違いをコードで説明する土台としても機能している。",
    stack: ["SwiftUI", "Scroll", "Cross-OS UI"],
    url: "https://github.com/fumiyasac/LikeCoodinatorLayoutExample",
  },

  // ------ UIKit ------
  {
    slug: "VisualEffectTraceExample",
    category: "uikit",
    title: "UICollectionViewで複雑なレイアウトと挙動を表現するサンプル",
    description:
      "UICollectionViewをベースに、複数セクション・カスタムレイアウト・視差効果を組み合わせた表現を検証。EC・メディア系プロダクトの「見せる一覧画面」実装で繰り返し役立つパターン集。",
    stack: ["UIKit", "UICollectionView", "CustomLayout"],
    url: "https://github.com/fumiyasac/VisualEffectTraceExample",
  },
  {
    slug: "ScrollAnimationShowcase",
    category: "uikit",
    title: "UIScrollView / UICollectionViewの特性を活用した表現サンプル",
    description:
      "UIScrollViewとUICollectionViewの性質を突き詰めた表現を並べたショーケース。既存プロダクトのスクロール体験を磨きたい時に、実装の選択肢を提示する引き出しとして活用している。",
    stack: ["UIKit", "UIScrollView", "Animation"],
    url: "https://github.com/fumiyasac/ScrollAnimationShowcase",
  },
  {
    slug: "DiffableDataSourceExample",
    category: "uikit",
    title: "DiffableDataSourceを利用したUI実装例",
    description:
      "iOS 13以降で導入されたDiffable Data Sourceの実装パターン集。既存のUICollectionViewDataSourceからの移行を、実プロダクトで安全に進めるための比較用サンプルとして継続利用している。",
    stack: ["UIKit", "Diffable", "Migration"],
    url: "https://github.com/fumiyasac/DiffableDataSourceExample",
  },
  {
    slug: "ComplexCollectionViewStyleExample",
    category: "uikit",
    title: "新しいUICollectionViewとCombineを組み合わせた実装例",
    description:
      "Compositional Layout・Diffable Data Source・Combineを組み合わせた実装例。宣言的な書き方で複雑な一覧画面を扱えるようになる恩恵を、実務導入前に検証するための土台。",
    stack: ["UIKit", "Combine", "Compositional"],
    url: "https://github.com/fumiyasac/ComplexCollectionViewStyleExample",
  },
  {
    slug: "MasonryStyleLayout",
    category: "uikit",
    title: "Pinterest風のMasonryレイアウトUI実装サンプル",
    description:
      "画像サイズが不揃いな一覧に強いMasonryレイアウトの実装。SNS・ポートフォリオ・ECの商品一覧で汎用的に応用できる構造を、UICollectionViewLayoutのサブクラスで整理している。",
    stack: ["UIKit", "Masonry", "UICollectionViewLayout"],
    url: "https://github.com/fumiyasac/MasonryStyleLayout",
  },
  {
    slug: "TouchIDExample",
    category: "uikit",
    title: "TouchID / FaceIDを利用したUI実装サンプル",
    description:
      "LocalAuthenticationを用いたTouchID / FaceID認証の導線とエラーハンドリング。金融・会員制サービスでの再認証フロー設計を実プロダクトに持ち込む際の実装リファレンス。",
    stack: ["UIKit", "LocalAuthentication", "BioAuth"],
    url: "https://github.com/fumiyasac/TouchIDExample",
  },
  {
    slug: "InteractiveUISample",
    category: "uikit",
    title: "ライブラリを使わないアニメーション表現の機能サンプル",
    description:
      "アニメーションライブラリに頼らずUIKit標準APIのみで作る動きの検証集。依存を増やせない事情のあるアプリで、体験を落とさずリッチなUIを作る判断材料にしている。",
    stack: ["UIKit", "CoreAnimation", "NoDeps"],
    url: "https://github.com/fumiyasac/InteractiveUISample",
  },
  {
    slug: "InfiniteScrollAnotherPattern",
    category: "uikit",
    title: "UICollectionViewによる無限循環スクロールの別パターン実装",
    description:
      "無限循環スクロールを別のアプローチで実装したサンプル。バナー・ストーリー・カルーセル等、実プロダクトで頻出する要素を「軽く・破綻せず」実現する複数の実装案として位置付けている。",
    stack: ["UIKit", "InfiniteScroll", "Carousel"],
    url: "https://github.com/fumiyasac/InfiniteScrollAnotherPattern",
  },
  {
    slug: "TinderUISamples",
    category: "uikit",
    title: "Tinder風UIを様々な実装で実現するUIKit実装サンプル",
    description:
      "同一のTinder風UIを複数の実装アプローチで並べ、それぞれの利点と欠点を比較しやすくしたサンプル。UI表現の実装選択肢を実務レビューで示すためのショーケースとして継続利用。",
    stack: ["UIKit", "Gesture", "Comparison"],
    url: "https://github.com/fumiyasac/TinderUISamples",
  },

  // ------ RxSwift / Redux ------
  {
    slug: "ReduxSampleSwift",
    category: "rx",
    title: "ReduxとUI実装を組み合わせたSwiftサンプル",
    description:
      "SwiftでのRedux導入とUIKit側のViewとの接続方法を検証したサンプル。「状態管理を分離すると何が楽になり、どこが窮屈になるか」を実プロダクト導入前に把握するための土台。",
    stack: ["Swift", "Redux", "UIKit"],
    url: "https://github.com/fumiyasac/ReduxSampleSwift",
  },
  {
    slug: "RxSwiftUIExample",
    category: "rx",
    title: "RxSwiftとUI実装を組み合わせた実装サンプル",
    description:
      "RxSwiftによるObservableフロー設計とUIKitベースのUI実装の組み合わせ。実プロダクトの検索・フィルタ・ページング周りでRxSwiftをどこまで使うかを判断する材料にしている。",
    stack: ["RxSwift", "UIKit", "Reactive"],
    url: "https://github.com/fumiyasac/RxSwiftUIExample",
  },
  {
    slug: "RxSwiftPracticeNote",
    category: "rx",
    title: "RxSwiftの練習記録ノートで紹介したUI実装サンプル",
    description:
      "RxSwift学習過程で書き溜めたUI実装ノート。個人アウトプットの記事と対で管理し、「記事で読んだ実装をどう自分のプロダクトへ落とすか」を辿れるようにしている。",
    stack: ["RxSwift", "Note", "Learning"],
    url: "https://github.com/fumiyasac/RxSwiftPracticeNote",
  },

  // ------ Flutter ------
  {
    slug: "travel_booking",
    category: "flutter",
    title: "Flutter + GraphQLによる旅行プラン閲覧・予約サンプル",
    description:
      "旅行プランの閲覧から予約までを想定したFlutter + GraphQLの実装サンプル。iOS/Androidエンジニアがクロスプラットフォーム側の設計判断へ関わる際、UI/データフロー両面の判断軸を持てるように整理。",
    stack: ["Flutter", "GraphQL", "Booking"],
    url: "https://github.com/fumiyasac/travel_booking",
  },
  {
    slug: "vocabulary_learning",
    category: "flutter",
    title: "Flutter + Riverpod + Driftの擬似単語帳アプリサンプル",
    description:
      "Riverpodによる状態管理とDriftによるローカルDBを組み合わせた学習アプリの実装検証。オフライン主体のアプリをFlutterで構築するときの、実務で使える最小構成を提示している。",
    stack: ["Flutter", "Riverpod", "Drift"],
    url: "https://github.com/fumiyasac/vocabulary_learning",
  },
  {
    slug: "searchable_combobox",
    category: "flutter",
    title: "複数ライブラリを組み合わせたFlutterの複合検索UI実装",
    description:
      "サードパーティ製ウィジェットを組み合わせて、コンボボックス風の複合検索UIをFlutterで実現。実サービスの検索絞り込みUIをFlutterで構築する際の実装引き出しとして活用している。",
    stack: ["Flutter", "Search", "Combobox"],
    url: "https://github.com/fumiyasac/searchable_combobox",
  },
  {
    slug: "riverpod_firestore_example",
    category: "flutter",
    title: "Flutter + Riverpod + Firestoreの学習参考書メモアプリ",
    description:
      "Firestoreをバックエンドに据えた小規模アプリを、Riverpodで状態管理しつつ実装した例。イベント運営や社内ツールなど「小さいけれど確実に動かしたい」プロダクトの実装参考にしている。",
    stack: ["Flutter", "Riverpod", "Firestore"],
    url: "https://github.com/fumiyasac/riverpod_firestore_example",
  },
  {
    slug: "commerce_style_sample_app",
    category: "flutter",
    title: "Flutter + Riverpodによるプロダクト一覧の無限スクロール実装",
    description:
      "EC風のプロダクト一覧画面を、無限スクロール + キャッシュ戦略込みでFlutterに落とし込んだサンプル。実サービスでのページング設計の勘どころを共有するリファレンスとして活用。",
    stack: ["Flutter", "Riverpod", "InfiniteScroll"],
    url: "https://github.com/fumiyasac/commerce_style_sample_app",
  },
  {
    slug: "todo_style_example_app",
    category: "flutter",
    title: "Flutter + RiverpodによるToDoリスト型UI実装サンプル",
    description:
      "ToDoリストという題材で、Flutter + Riverpodの基礎パターンをひととおり並べたサンプル。新規にFlutterを触るチームメンバーへ「まずこの構成を読めば実装イメージが掴める」入口として利用。",
    stack: ["Flutter", "Riverpod", "ToDo"],
    url: "https://github.com/fumiyasac/todo_style_example_app",
  },

  // ------ Research ------
  {
    slug: "SimpleGraphQLPractice",
    category: "research",
    title: "Apollo 0.x / 1.x系の差分調査用リポジトリ",
    description:
      "Apollo iOSのmajorバージョン間の差分を実コードで比較・確認するための調査用リポジトリ。実プロダクトでGraphQLクライアントをアップデートする際の、破壊的変更影響範囲の見極めに利用している。",
    stack: ["Apollo", "GraphQL", "Migration"],
    url: "https://github.com/fumiyasac/SimpleGraphQLPractice",
  },
];

// -----------------------------------------------------------------------------
// 技術書同人誌博覧会 公式サイト運用保守
// -----------------------------------------------------------------------------

export type GishohakuStackGroup = {
  label: string;
  items: string[];
};

export const GISHOHAKU_HIGHLIGHTS: string[] = [
  "公式Webサイトおよび関連システムの継続運用・保守",
  "Next.js / React / Node.jsを中心としたレガシー技術スタックの段階的アップデート",
  "Firebase / Emotion / Tailwind CSS / TypeScript等の依存関係更新と互換対応",
  "Breaking Changes・非推奨API・旧ライブラリへの互換パス整備",
  "Playwright + pixelmatchによるVisual Regression Testの導入",
  "TypeScript型チェック・Production Build・Docker環境での動作検証",
  "Firestoreデータ投入・メール送信スクリプトへのDryRun既定化",
  "イベント開催前のサークル情報・運用データ投入フローの整備",
  "開発環境構築・障害調査・データ投入手順のドキュメント整備",
  "改善項目を切り分け、段階的に対応可能な状態へ整理",
];

export const GISHOHAKU_STACK: GishohakuStackGroup[] = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Emotion", "Tailwind CSS", "MDX"],
  },
  {
    label: "Backend / Infrastructure",
    items: [
      "Firebase",
      "Firestore",
      "Cloud Functions",
      "Cloud Run",
      "Firebase Hosting",
      "Google Cloud Build",
    ],
  },
  {
    label: "Development / Verification",
    items: ["Docker", "Playwright", "pixelmatch", "npm", "GitHub"],
  },
];

export const GISHOHAKU_SITE_URL = "https://gishohaku.dev/";

// -----------------------------------------------------------------------------
// Open Source Conference (OSC) 技書博コアスタッフ登壇
// -----------------------------------------------------------------------------

export type GishohakuOscTalk = {
  title: string;      // スライド/セッション題
  event: string;      // 登壇イベント名
  slideUrl: string;   // 掲載元(閲覧用の正規URL)
  embedUrl: string;   // 埋め込み用iframe URL
};

export const GISHOHAKU_OSC: GishohakuOscTalk = {
  title: "技術同人誌を書こう",
  event: "OSC Online / Fall",
  slideUrl:
    "https://www.docswell.com/s/gishohaku/K9NDL7-2026-10-03-104611",
  embedUrl:
    "https://www.docswell.com/slide/K9NDL7-2026-10-03-104611/embed",
};
