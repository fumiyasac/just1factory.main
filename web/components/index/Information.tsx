// 旧 components/index/Information.vue の移植（<b-card-group deck> → .card-deck）
import MobileEngineer from "@/components/index/MobileEngineer";
import WebEngineer from "@/components/index/WebEngineer";
import Designer from "@/components/index/Designer";

export default function Information() {
  return (
    <div className="container">
      <div className="information_block">
        <h2 className="message_text">Developer&apos;s Summary</h2>
        <div className="card-deck">
          <MobileEngineer />
          <WebEngineer />
          <Designer />
        </div>
      </div>
    </div>
  );
}
