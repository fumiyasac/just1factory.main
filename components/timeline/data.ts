// Timelineページで表示するキャリア年表データ。
// 2003年〜2025年の主要な転機を、各年ごとの見出し・本文・キーワードでまとめている。
// 表示順は「時系列で読める物語」を優先するため昇順(古い→新しい)にしている。

export type TimelineEntry = {
  year: string;                 // 表示用の西暦
  subtitle: string;             // 一言テーマ
  paragraphs: string[];         // 本文(段落単位)
  keywords: string[];           // キーワードチップ
};

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2003",
    subtitle: "数学とWeb制作から始まった原点",
    paragraphs: [
      "現・早稲田大学教育学部数学科に入学し、数学を学びながらWebデザイナーのアシスタントとしてHTMLとCSSを手で書く経験を積みました。",
      "この時期に触れた「自分の手で動くものを作る」感覚が、後のWeb制作、UI実装、モバイルアプリ開発につながる原点になっています。",
    ],
    keywords: ["Mathematics", "HTML", "CSS", "Web Design"],
  },
  {
    year: "2007",
    subtitle: "業務システム開発とWeb制作の接点",
    paragraphs: [
      "社会人として業務システム開発の現場に入りながら、社内ブログ構築やWebサイト制作にも取り組みました。",
      "与えられた範囲だけに閉じず、必要だと思ったものを自分で作る動き方は、この頃から現在まで続いています。",
    ],
    keywords: ["Java", "COBOL", "WordPress", "Web Site"],
  },
  {
    year: "2008",
    subtitle: "Web制作会社でデザインからインフラまで経験",
    paragraphs: [
      "Web制作会社で社内最年少のチーフエンジニアを担当しました。",
      "デザイン、HTML/CSS、PHP、CakePHP、MySQL、Linuxサーバーまで、制作に必要な複数のレイヤーを横断。大手企業サイト、Flashコンテンツ、大規模グルメポータルの検索機能改善やパフォーマンスチューニングにも携わり、制作工程全体を見ながら手を動かす経験を積みました。",
    ],
    keywords: ["Web Design", "PHP", "CakePHP", "MySQL", "Linux", "Performance Tuning"],
  },
  {
    year: "2013",
    subtitle: "大規模Webサービスとサーバーサイド開発",
    paragraphs: [
      "MAU1,000万超のWebサービスやソーシャルゲームの開発・運用に携わりました。",
      "ガチャ機能、KPI分析ツール、検索ロジック改修、バッチ処理などを通じて、ユーザー規模の大きいサービスを支えるサーバーサイド開発を経験。CakePHP、Ruby on Rails、Symfonyなど複数のフレームワークを実務で扱い、特定の技術だけに閉じない開発経験を積んだ時期です。",
    ],
    keywords: ["Ruby on Rails", "Symfony", "CakePHP", "KPI", "Batch Processing"],
  },
  {
    year: "2014",
    subtitle: "iOSアプリ開発との出会い",
    paragraphs: [
      "業務の傍ら、Objective-Cでイベント用のお試しアプリを制作しました。",
      "見様見真似でアプリを形にできた手応えから、iOSアプリ開発への関心が一気に高まり、勉強会にも通い始めます。同年12月には初めてLT登壇を経験し、「聞く側」から「発信する側」へと活動範囲が広がりました。",
    ],
    keywords: ["Objective-C", "iOS", "LT", "Community"],
  },
  {
    year: "2015",
    subtitle: "登壇・個人開発・OSS公開を始める",
    paragraphs: [
      "potatotipsをはじめとした勉強会で登壇しながら、個人でiPhoneアプリをリリースしました。",
      "UI実装サンプルをGitHubに公開し、OSS「handMadeCalendarAdvance」もこの年に生まれました。作って、見せて、改善するサイクルが自分に合っていると実感した時期です。",
    ],
    keywords: ["iOS", "GitHub", "OSS", "UI Implementation", "potatotips"],
  },
  {
    year: "2016",
    subtitle: "Webエンジニアとして働きながらiOSの発信を継続",
    paragraphs: [
      "日中はWebエンジニアとして働きながら、業務後にiOS開発の学習、登壇、技術記事の発信を続けました。",
      "この年だけで34本のアウトプットを発信し、技術を自分の言葉で整理して伝える力を磨いていきました。",
    ],
    keywords: ["iOS", "Technical Writing", "LT", "Output"],
  },
  {
    year: "2017",
    subtitle: "UI実装への関心が深まる",
    paragraphs: [
      "子育て系アプリの開発をきっかけに、iOSアプリのUI実装へ強くのめり込んでいきました。",
      "新規開発、運用保守、Swiftバージョンアップなどを通じて、「アプリの機能を引き出して、1つ上のステージへ上げられるUI」を追求するようになります。",
    ],
    keywords: ["Swift", "UIKit", "UI Implementation", "Maintenance"],
  },
  {
    year: "2018",
    subtitle: "UI実装の知見を技術書として体系化",
    paragraphs: [
      "「iOSアプリ開発UI実装であると嬉しいレシピブック」を技術書典5で頒布しました。",
      "デザイナー、Webエンジニア、iOSエンジニアとして遠回りしてきた経験を、UI実装の技術書としてまとめました。以降シリーズ化し、複雑UIやアニメーション実装の知見を外部から見える形で残していきました。",
    ],
    keywords: ["Technical Book", "iOS", "UI Recipe", "技術書典"],
  },
  {
    year: "2019",
    subtitle: "商業出版とフルスタック開発",
    paragraphs: [
      "技術書の商業版が刊行され、同時期にはアパレルECアプリの立ち上げで、iOS、サーバーサイド、Webフロントエンドを横断的に担当しました。",
      "RxSwift、Laravel、Nuxt.jsなどを扱いながら、プロダクトを成立させるために必要な領域をまたいで開発しました。また、社内ドキュメントを1年で100記事追加し、「書いて残す」文化づくりにも取り組みました。",
    ],
    keywords: ["RxSwift", "Laravel", "Nuxt.js", "Documentation", "Commercial Publishing"],
  },
  {
    year: "2020",
    subtitle: "Android開発にも本格参入",
    paragraphs: [
      "大規模学習プラットフォームのiOS/Androidアプリ開発に従事しました。",
      "iOS開発に加えて、KotlinでのAndroid開発にも本格的に取り組み始めました。スクラムでのチーム開発、Firebaseを活用した改善施策、GraphQL連携など、モバイル開発の守備範囲を広げていった時期です。",
    ],
    keywords: ["Kotlin", "Android", "Firebase", "GraphQL", "Scrum"],
  },
  {
    year: "2021",
    subtitle: "iOSDC Japan 2021登壇",
    paragraphs: [
      "動画プレイヤーアプリの開発で得た知見を、iOSDC Japan 2021で発表しました。",
      "実務で得たモバイルアプリ開発の知見を、カンファレンスの場で整理して共有する経験になりました。",
    ],
    keywords: ["iOSDC Japan", "Video Player", "Conference"],
  },
  {
    year: "2022",
    subtitle: "地域情報アプリのUI刷新",
    paragraphs: [
      "地域情報アプリのiOS開発を担当し、TOP画面のUI構造改修やA/Bテストを活用したユーザー獲得施策に取り組みました。",
      "自分自身も日常的に使っていたプロダクトだからこそ、使う側の目線と作る側の技術を重ねながら改善に向き合えた現場でした。",
    ],
    keywords: ["iOS", "UI Refresh", "A/B Testing", "Firebase"],
  },
  {
    year: "2023",
    subtitle: "iOS/Android/Web/Railsを横断した開発",
    paragraphs: [
      "国内最大級のハンドメイドマーケットアプリにシニアエンジニアとして従事しました。",
      "iOS/Android両軸でのアプリ開発に加え、WebフロントエンドやRuby on Railsにも越境しました。新機能「広告機能」では、仕様理解から設計・実装まで一貫して関わり、月間平均600万円の収益を生み出す機能へと育てました。",
    ],
    keywords: ["iOS", "Android", "Next.js", "Ruby on Rails", "Ads", "Revenue"],
  },
  {
    year: "2024",
    subtitle: "コミュニティをまたいだ貢献と運営",
    paragraphs: [
      "DroidKaigi公式アプリへのContributionや、Spectrum Tokyo Meetupでの登壇など、iOS/Androidの枠を越えた発信に取り組みました。",
      "また、技術書同人誌博覧会ではコアスタッフとして運営やデザイン制作にも関わりました。技術を伝える手段はコードだけではないと実感した時期です。",
    ],
    keywords: ["DroidKaigi", "Spectrum Tokyo", "技書博", "Community", "Design"],
  },
  {
    year: "2025",
    subtitle: "商業書籍への寄稿と多彩なテーマでの登壇",
    paragraphs: [
      "技術評論社「みんなのアジャイル」へ寄稿し、「デザインから逆算して実装の難易度を見積もる」というテーマを担当しました。",
      "Liquid Glass、Claude Code×DroidKaigi、きのこカンファレンスなど、モバイル開発に閉じず、デザイン、AI活用、コミュニティ、技術発信を横断するテーマで登壇を重ねました。",
    ],
    keywords: ["Manuscript", "Agile", "Design Estimation", "AI", "Conference"],
  },
];

// Closingセクションの文面。3つの「力」+ 統合の一段落 + まとめの一段落。
export const CLOSING_FORCES: Array<{ era: string; force: string }> = [
  { era: "デザイナー時代に身につけた", force: "「見る力」" },
  { era: "Webエンジニア時代に鍛えた", force: "「動かす力」" },
  { era: "モバイルエンジニアとして磨き続けている", force: "「形にする力」" },
];

export const CLOSING_BODY: string[] = [
  "遠回りや越境を繰り返してきたからこそ、iOS/Android/Flutterを核に、Web、Server Side、Design、Community、AI活用までつなげて考えることができます。",
  "これまでの経歴は、ひとつの肩書きだけでは表しきれません。だからこそ、作ったもの、書いたもの、話したもの、運営してきたものを証憑として残し続けています。",
];
