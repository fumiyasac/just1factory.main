// 旧 pages/index.vue の移植
import Message from "@/components/index/Message";
import Introduction from "@/components/index/Introduction";
import SocialLink from "@/components/index/SocialLink";
import Information from "@/components/index/Information";

export default function Home() {
  return (
    <div>
      <Message />
      <Introduction />
      <SocialLink />
      <Information />
    </div>
  );
}
