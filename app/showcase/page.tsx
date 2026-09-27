import type { Metadata } from "next";
import ShowcaseHeadline from "@/components/showcase/ShowcaseHeadline";
import ShowcaseRepos from "@/components/showcase/ShowcaseRepos";
import ShowcaseGishohaku from "@/components/showcase/ShowcaseGishohaku";

export const metadata: Metadata = {
  title: "Development Showcase",
  description:
    "酒井文也(fumiyasac)の実装ショーケースページ。SwiftUI・UIKit・RxSwift・Flutter などによる UI 実装サンプルの GitHub リポジトリ群と、技術書同人誌博覧会 公式サイトの運用保守 Contribution をまとめています。",
  openGraph: {
    title: "Development Showcase | Just1factory",
    description:
      "SwiftUI / UIKit / RxSwift / Flutter による UI 実装サンプルと、技術書同人誌博覧会 公式サイトの運用保守 Contribution をまとめた実装ショーケース。",
    url: "https://just1factory.net/showcase",
  },
};

export default function Showcase() {
  return (
    <div>
      <ShowcaseHeadline />
      <ShowcaseRepos />
      <ShowcaseGishohaku />
    </div>
  );
}
