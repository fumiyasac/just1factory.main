// 旧 pages/index.vue の移植
import Message from "@/components/index/Message";
import RecentActivity from "@/components/index/RecentActivity";
import Introduction from "@/components/index/Introduction";
import SocialLink from "@/components/index/SocialLink";
import Information from "@/components/index/Information";
import JsonLd from "@/components/global/JsonLd";

const SITE_URL = "https://just1factory.net";
const SITE_DESCRIPTION =
  "酒井文也（fumiyasac）のポートフォリオサイト。iOS/Androidアプリ開発に関する技術書・登壇資料・OSSなどのアウトプットを公開しています。";

const HOME_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Just1factory",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "酒井文也",
    alternateName: "fumiyasac",
    url: SITE_URL,
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/fumiyasac",
      "https://qiita.com/fumiyasac@github",
      "https://speakerdeck.com/fumiyasac0921",
      "https://x.com/fumiyasac",
      "https://zenn.dev/fumiyasac",
    ],
  },
];

export default function Home() {
  return (
    <div>
      <JsonLd data={HOME_JSONLD} />
      <Message />
      <RecentActivity />
      <Introduction />
      <SocialLink />
      <Information />
    </div>
  );
}
