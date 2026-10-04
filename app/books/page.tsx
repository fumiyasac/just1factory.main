// 旧 pages/books.vue の移植
import type { Metadata } from "next";
import BookHeadline from "@/components/books/BookHeadline";
import BookInformation from "@/components/books/BookInformation";
import JsonLd from "@/components/global/JsonLd";
import booksData from "@/data/books.json";
import type { Book } from "@/types/books";

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

const SITE_URL = "https://just1factory.net";
const AUTHOR = { "@type": "Person", name: "酒井文也" } as const;

const BOOKS_JSONLD = (booksData as Book[])
  .slice()
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .map((book) => ({
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: AUTHOR,
    description: book.description.join("\n"),
    image: `${SITE_URL}${book.coverImage}`,
    url: book.boothUrl,
  }));

export default function Books() {
  return (
    <div>
      <JsonLd data={BOOKS_JSONLD} />
      <BookHeadline />
      <BookInformation />
    </div>
  );
}
