import type { Metadata } from "next";
import ShowcaseHeadline from "@/components/showcase/ShowcaseHeadline";
import ShowcaseRepos from "@/components/showcase/ShowcaseRepos";
import ShowcaseGishohaku from "@/components/showcase/ShowcaseGishohaku";
import JsonLd from "@/components/global/JsonLd";
import { REPOS } from "@/components/showcase/data";

const AUTHOR = { "@type": "Person", name: "酒井文也" } as const;

// RepoCategory -> SoftwareSourceCode の programmingLanguage へのざっくり対応。
// Flutter は Dart、それ以外(SwiftUI/UIKit/RxSwift/Research)は Swift、
// Firestore 向け研究コード等も Swift ベースのため Swift に寄せる。
const PROG_LANG: Record<string, string> = {
  oss: "Swift",
  swiftui: "Swift",
  uikit: "Swift",
  rx: "Swift",
  flutter: "Dart",
  research: "Swift",
};

const SHOWCASE_JSONLD = REPOS.map((repo) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: repo.title,
  description: repo.description,
  codeRepository: repo.url,
  programmingLanguage: PROG_LANG[repo.category] ?? "Swift",
  author: AUTHOR,
}));

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
      <JsonLd data={SHOWCASE_JSONLD} />
      <ShowcaseHeadline />
      <ShowcaseRepos />
      <ShowcaseGishohaku />
    </div>
  );
}
