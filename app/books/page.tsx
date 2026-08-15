// 旧 pages/books.vue の移植
import type { Metadata } from "next";
import BookHeadline from "@/components/books/BookHeadline";
import BookInformation from "@/components/books/BookInformation";

export const metadata: Metadata = {
  title: "Books",
  description:
    "酒井文也（fumiyasac）が執筆したiOSアプリ開発UI実装レシピブックシリーズをはじめとする技術書の一覧です。",
  openGraph: {
    title: "Books | Just1factory",
    description:
      "酒井文也（fumiyasac）が執筆したiOSアプリ開発UI実装レシピブックシリーズをはじめとする技術書の一覧です。",
    url: "https://just1factory.net/books",
  },
};

export default function Books() {
  return (
    <div>
      <BookHeadline />
      <BookInformation />
    </div>
  );
}
