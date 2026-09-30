import type { Metadata } from "next";
import TimelineHeadline from "@/components/timeline/TimelineHeadline";
import TimelineList from "@/components/timeline/TimelineList";
import TimelineClosing from "@/components/timeline/TimelineClosing";

export const metadata: Metadata = {
  title: "Career Timeline",
  description:
    "酒井文也(fumiyasac)のキャリア年表。デザイナー・Webエンジニア・iOS/Android/Flutterエンジニア・技術書執筆・登壇・コミュニティ運営と越境してきた2003年から現在までの歩みを、年ごとの節目とキーワードで振り返ります。",
  openGraph: {
    title: "Career Timeline | Just1factory",
    description:
      "デザイナー・Web・サーバーサイド・iOS/Android/Flutter・技術書・登壇・コミュニティと領域を広げてきた歩みを、2003年から現在まで年別にまとめたキャリア年表。",
    url: "https://just1factory.net/timeline",
  },
};

export default function Timeline() {
  return (
    <div>
      <TimelineHeadline />
      <TimelineList />
      <TimelineClosing />
    </div>
  );
}
