import type { Metadata } from "next";
import TalksHeadline from "@/components/talks/TalksHeadline";
import TalksStats from "@/components/talks/TalksStats";
import TalksArchive from "@/components/talks/TalksArchive";
import TalksPlatforms from "@/components/talks/TalksPlatforms";

export const metadata: Metadata = {
  title: "Talks & Articles",
  description:
    "酒井文也（fumiyasac）が 2014 年から続けてきた勉強会・カンファレンス登壇と技術記事のアーカイブ。全 176 本を年別・日付降順で、カテゴリータグ付きで網羅しています。",
  openGraph: {
    title: "Talks & Articles | Just1factory",
    description:
      "酒井文也（fumiyasac）の 13 年間の登壇資料と技術記事 176 本を年別・カテゴリー別に網羅したアーカイブ。",
    url: "https://just1factory.net/talks",
  },
};

export default function Talks() {
  return (
    <div>
      <TalksHeadline />
      <TalksStats />
      <TalksArchive />
      <TalksPlatforms />
    </div>
  );
}
