import type { Metadata } from "next";
import TalksHeadline from "@/components/talks/TalksHeadline";
import TalksMain from "@/components/talks/TalksMain";
import TalksPlatforms from "@/components/talks/TalksPlatforms";
import JsonLd from "@/components/global/JsonLd";
import talksData from "@/data/talks.json";
import type { TalkItem } from "@/types/talks";

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

// JSON-LD の HTML 肥大化を避けるため、直近 20 件(日付降順の先頭)に絞って
// ItemList + ListItem として公開する。ARCHIVE 自体が日付降順で保持されている。
const TALKS_FEATURED = (talksData as TalkItem[]).slice(0, 20);

const TALKS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Just1factory の直近 20 本の登壇資料・技術記事",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: TALKS_FEATURED.length,
  itemListElement: TALKS_FEATURED.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.title,
    url: t.url,
  })),
};

export default function Talks() {
  return (
    <div>
      <JsonLd data={TALKS_JSONLD} />
      <TalksHeadline />
      <TalksMain />
      <TalksPlatforms />
    </div>
  );
}
