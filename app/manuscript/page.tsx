import type { Metadata } from "next";
import ManuscriptHeadline from "@/components/manuscript/ManuscriptHeadline";
import ManuscriptIOSDC from "@/components/manuscript/ManuscriptIOSDC";
import ManuscriptContributions from "@/components/manuscript/ManuscriptContributions";
import ManuscriptTranslations from "@/components/manuscript/ManuscriptTranslations";
import ManuscriptDroidKaigi from "@/components/manuscript/ManuscriptDroidKaigi";
import ManuscriptTechBlog from "@/components/manuscript/ManuscriptTechBlog";
import ManuscriptSNS from "@/components/manuscript/ManuscriptSNS";

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
