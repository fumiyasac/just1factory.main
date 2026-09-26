import type { Metadata } from "next";
import TalksHeadline from "@/components/talks/TalksHeadline";
import TalksStats from "@/components/talks/TalksStats";
import TalksThemes from "@/components/talks/TalksThemes";
import TalksRecent from "@/components/talks/TalksRecent";
import TalksPlatforms from "@/components/talks/TalksPlatforms";

export const metadata: Metadata = {
  title: "Talks & Articles",
  description:
    "酒井文也（fumiyasac）が 2014 年から続けてきた勉強会・カンファレンス登壇と技術記事のアーカイブ。UI 実装／クロスプラットフォーム／アーキテクチャなどのテーマごとに、これまでの取り組みと直近の歩みを紹介します。",
  openGraph: {
    title: "Talks & Articles | Just1factory",
    description:
      "酒井文也（fumiyasac）が 2014 年から続けてきた登壇資料と技術記事のアーカイブ。テーマ別・時系列で 176 本の取り組みを紹介します。",
    url: "https://just1factory.net/talks",
  },
};

export default function Talks() {
  return (
    <div>
      <TalksHeadline />
      <TalksStats />
      {/* 「今なにに取り組んでいるか」をテーマ別のバックストーリーより先に見せる */}
      <TalksRecent />
      <TalksThemes />
      <TalksPlatforms />
    </div>
  );
}
