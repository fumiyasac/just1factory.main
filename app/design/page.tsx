import type { Metadata } from "next";
import DesignHeadline from "@/components/design/DesignHeadline";
import DesignGallery from "@/components/design/DesignGallery";
import { GISHOHAKU_ITEMS, OYAKATA_ITEMS } from "@/components/design/data";

export const metadata: Metadata = {
  title: "Design",
  description:
    "酒井文也（fumiyasac）のデザイン制作物ページ。技術書同人誌博覧会（技書博）の告知チラシや、親方Project寄稿『チラシで伝えるものづくり』表紙・作例など、コミュニティ／技術系イベント／出版物のためのグラフィック制作をまとめています。",
  openGraph: {
    title: "Design | Just1factory",
    description:
      "技術書同人誌博覧会の告知チラシや、親方Project寄稿『チラシで伝えるものづくり』の制作物など、コミュニティ・出版物向けのデザイン成果物を紹介します。",
    url: "https://just1factory.net/design",
  },
};

export default function Design() {
  return (
    <div>
      <DesignHeadline />
      <DesignGallery
        heading="技術書同人誌博覧会（技書博）"
        lead="コミュニティイベント「技書博」の告知チラシ・サークル募集ビジュアルを継続的に制作しています。回ごとに会場・テーマの空気感を汲み取り、開催概要と誘導線を一枚で伝わる形に落とし込むことを大切にしています。"
        items={GISHOHAKU_ITEMS}
      />
      <DesignGallery
        heading="親方Project寄稿『チラシで伝えるものづくり』"
        lead="親方Project合同誌への寄稿として、表紙デザインと、掲載作例（IoTプロダクト紹介チラシ）を制作しました。ものづくりの手触りをそのまま画面に持ち込むトーンで組み上げています。"
        items={OYAKATA_ITEMS}
      />
    </div>
  );
}
