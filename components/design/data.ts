// Design ページで表示するデザイン成果物のデータ。
// 現在は 2 セクション: 技術書同人誌博覧会（技書博）のチラシ群と、親方Project 寄稿関連。
// 新しい制作物を追加したら該当セクションの配列へ追記する運用。

export type DesignItem = {
  slug: string; // 内部識別用（画像ファイル名の一部）
  image: string; // public 配下のパス
  title: string;
  subtitle?: string; // 副題（媒体名や号数など）
  date?: string; // イベント日 or 制作時期
  venue?: string; // 開催会場
  description: string; // このデザインで何を意図したか、何の告知か
  url?: string; // 詳細情報の外部リンク
};

// 技術書同人誌博覧会（技書博）のチラシ・ポスターデザイン。
// 並び順は「新しい開催が先」（日付降順）。日付を持たない mini in OSC はシリーズ末尾に配置。
export const GISHOHAKU_ITEMS: DesignItem[] = [
  {
    slug: "gishohaku-15",
    image: "/design/gishohaku-15.jpg",
    title: "技術書同人誌博覧会#15",
    subtitle: "サークル & 一般参加者募集チラシ",
    date: "2027年5月15日（土）",
    venue: "大田区産業プラザPiO大展示ホール",
    description:
      "水彩風の空・歯車・電球のあしらいに公式マスコットの「ありどらごん」を配し、親しみやすさと技術の広がりを両立。QRコードとキャッチコピーで登録導線を強調した。",
  },
  {
    slug: "gishohaku-13",
    image: "/design/gishohaku-13.jpg",
    title: "技術書同人誌博覧会#13",
    subtitle: "開催告知チラシ（2025夏配布・裏面）",
    date: "2026年5月10日（日）",
    venue: "大田区産業プラザPiO大展示ホール",
    description:
      "「本から広がる世界」をモチーフに、本と木々が空へ舞い上がるビジュアルを合成。#12の表面と対になる裏面として、次々回への期待感を演出。",
  },
  {
    slug: "gishohaku-12",
    image: "/design/gishohaku-12.jpg",
    title: "技術書同人誌博覧会#12",
    subtitle: "一般参加者募集チラシ（2025夏配布・表面）",
    date: "2025年10月26日（日）",
    venue: "大宮ソニックシティ",
    description:
      "深緑を基調に、大きな#12の見出しとQRコードで登録動線を明確化。夏の配布物として、次回イベントを短時間で理解してもらう構成にした。",
  },
  {
    slug: "gishohaku-11",
    image: "/design/gishohaku-11.jpg",
    title: "技術書同人誌博覧会#11",
    subtitle: "開催告知チラシ",
    date: "2025年1月25日（土）",
    venue: "横浜産貿ホール マリネリア",
    description:
      "初の横浜開催に合わせ、みなとみらいの夜景写真を薄く敷いたダークネイビー基調。中央のワードクラウドで扱う技術領域の幅広さを一望させるレイアウトに。",
  },
  {
    slug: "gishohaku-10",
    image: "/design/gishohaku-10.jpg",
    title: "技術書同人誌博覧会#10",
    subtitle: "10th Anniversaries. チラシ",
    date: "2024年5月12日（日）",
    venue: "大田区産業プラザPiO大展示ホール",
    description:
      "10回目の節目という祝祭感をガーランドと明るいスカイブルーで表現。写真素材のサークル切り抜きで過去回の空気感も添えた記念デザイン。",
  },
  {
    slug: "gishohaku-9",
    image: "/design/gishohaku-9.jpg",
    title: "技術書同人誌博覧会#9",
    subtitle: "一般参加募集チラシ",
    date: "2023年11月25日（土）",
    venue: "大田区産業プラザPiO大展示ホール",
    description:
      "木目調のブラウンをベースに、カフェスペース／出版社企画／即売会の3コンテンツを整理して案内するチラシ。会場での落ち着いた回遊イメージを大切に配色を決めた。",
  },
  {
    slug: "gishohaku-mini-osc",
    image: "/design/gishohaku-mini-osc.jpg",
    title: "技書博mini in OSC",
    subtitle: "全国OSC出展告知",
    description:
      "全国のオープンソースカンファレンス（OSC）出展ブランド用ビジュアル。桜と一杯のお茶、本の水彩イラストで、地方回遊と読書の穏やかな時間を表現。",
  },
];

// 親方Project寄稿「チラシで伝えるものづくり」関連の制作物。
export const OYAKATA_ITEMS: DesignItem[] = [
  {
    slug: "oyakata-monodukuri-cover",
    image: "/design/oyakata-monodukuri-cover.jpg",
    title: "『チラシで伝えるものづくり』表紙",
    subtitle: "親方Project合同誌寄稿",
    description:
      "工房の道具を主役にした写真の上にセリフ体で大きく「チラシで伝えるものづくり」と重ねた表紙。ものづくりの温度と、それをチラシとして届ける行為の重なりをそのまま画に落とし込んだ。",
    url: "https://oyakata2024.booth.pm/",
  },
  {
    slug: "oyakata-shochu-server",
    image: "/design/oyakata-shochu-server.jpg",
    title: "「インターネット接続 焼酎サーバー」チラシ",
    subtitle: "『チラシで伝えるものづくり』掲載作例",
    description:
      "同誌に作例として掲載した、遊び心のあるIoTプロダクト紹介チラシ。悩み → 解決 → 構成部品 → 費用と誘導線を段階化し、技術要素（ESP32 / 電磁弁 / スマホアプリ）を一枚で伝わる形に。",
    url: "https://oyakata2024.booth.pm/",
  },
];
