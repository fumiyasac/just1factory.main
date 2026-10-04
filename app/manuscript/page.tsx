import type { Metadata } from "next";
import ManuscriptHeadline from "@/components/manuscript/ManuscriptHeadline";
import ManuscriptIOSDC from "@/components/manuscript/ManuscriptIOSDC";
import ManuscriptContributions from "@/components/manuscript/ManuscriptContributions";
import ManuscriptTranslations from "@/components/manuscript/ManuscriptTranslations";
import ManuscriptDroidKaigi from "@/components/manuscript/ManuscriptDroidKaigi";
import ManuscriptTechBlog from "@/components/manuscript/ManuscriptTechBlog";
import ManuscriptSNS from "@/components/manuscript/ManuscriptSNS";
import JsonLd from "@/components/global/JsonLd";
import {
  IOSDC_MANUSCRIPTS,
  CONTRIBUTIONS,
  TRANSLATION_REVIEWS,
} from "@/components/manuscript/data";

const AUTHOR = { "@type": "Person", name: "酒井文也" } as const;
const PUBLISHER_SELF = { "@type": "Organization", name: "Just1factory" } as const;

// JSON-LD は代表的な 8 件に絞る: iOSDC 直近 3 件 + 寄稿直近 3 件 + 翻訳レビュー 2 件
const MANUSCRIPT_JSONLD = [
  ...IOSDC_MANUSCRIPTS.slice(0, 3).map((item) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    author: AUTHOR,
    publisher: { "@type": "Organization", name: "iOSDC Japan" },
    url: item.manuscriptUrl,
    datePublished: `${item.year}-01-01`,
  })),
  ...CONTRIBUTIONS.slice(0, 3).map((item) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    author: AUTHOR,
    publisher: { "@type": "Organization", name: item.publisher },
    url: item.bookUrl ?? item.githubUrl ?? "https://just1factory.net/manuscript",
  })),
  ...TRANSLATION_REVIEWS.map((item) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    author: AUTHOR,
    publisher: PUBLISHER_SELF,
    url: item.bookUrl,
  })),
];

export const metadata: Metadata = {
  title: "Manuscript & Writings",
  description:
    "酒井文也(fumiyasac)の原稿・寄稿ページ。iOSDC Japanパンフレット原稿、書籍・合同誌への寄稿、翻訳レビュー参加、DroidKaigi公式アプリへのContribution、テックブログ執筆、自筆ノートまで、書くことで技術と向き合ってきた記録をまとめています。",
  openGraph: {
    title: "Manuscript & Writings | Just1factory",
    description:
      "iOSDC Japanパンフレット原稿・書籍寄稿・翻訳レビュー・DroidKaigi Contribution・テックブログ・自筆ノートまで、書くことで技術と向き合ってきた記録。",
    url: "https://just1factory.net/manuscript",
  },
};

export default function Manuscript() {
  return (
    <div>
      <JsonLd data={MANUSCRIPT_JSONLD} />
      <ManuscriptHeadline />
      <ManuscriptIOSDC />
      <ManuscriptContributions />
      <ManuscriptTranslations />
      <ManuscriptDroidKaigi />
      <ManuscriptTechBlog />
      <ManuscriptSNS />
    </div>
  );
}
