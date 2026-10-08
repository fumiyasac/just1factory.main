// トップページで「最近のアクティビティ」を一画面で把握できるようにする紹介セクション。
// Talks / Manuscript / Design の各 data.json から直近エントリを取り出して並べる。
// サーバーコンポーネントで完結(クライアント state 不要)。
import Link from "next/link";
import type { TalkItem } from "@/types/talks";
import type { ManuscriptData, IOSDCEntry, Contribution } from "@/types/manuscript";
import type { DesignItem } from "@/types/design";
import { CATEGORIES } from "@/components/talks/data";
import talksData from "@/data/talks.json";
import manuscriptData from "@/data/manuscript.json";
import designData from "@/data/design.json";

const talks = (talksData as TalkItem[]).slice(0, 3);
const manuscript: Array<{
  kind: "iosdc" | "contribution" | "translation";
  title: string;
  meta: string;
  url: string;
}> = (() => {
  const m = manuscriptData as ManuscriptData;
  const items: Array<{
    kind: "iosdc" | "contribution" | "translation";
    title: string;
    meta: string;
    url: string;
  }> = [];
  const latestIosdc: IOSDCEntry | undefined = m.iosdc[0];
  const latestContrib: Contribution | undefined = m.contributions[0];
  const latestTranslation = m.translations[0];
  if (latestIosdc) {
    items.push({
      kind: "iosdc",
      title: latestIosdc.title,
      meta: `iOSDC Japan ${latestIosdc.year}`,
      url: latestIosdc.manuscriptUrl,
    });
  }
  if (latestContrib) {
    items.push({
      kind: "contribution",
      title: latestContrib.title,
      meta: latestContrib.publisher,
      url: latestContrib.bookUrl ?? latestContrib.githubUrl ?? "/manuscript",
    });
  }
  if (latestTranslation) {
    items.push({
      kind: "translation",
      title: latestTranslation.title,
      meta: "翻訳レビュー参加",
      url: latestTranslation.bookUrl,
    });
  }
  return items;
})();
const designItems = (designData as DesignItem[]).slice(0, 3);

function Card({
  heading,
  moreHref,
  moreLabel,
  children,
}: {
  heading: string;
  moreHref: string;
  moreLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="recent_card">
        <h3 className="recent_card_heading">{heading}</h3>
        <ul className="list-unstyled recent_card_list">{children}</ul>
        <Link href={moreHref} className="recent_card_more">
          {moreLabel} <i className="fa fa-angle-right" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default function RecentActivity() {
  return (
    <div className="container">
      <div className="recent_activity_block">
        <h2>Recent Activity</h2>
        <p className="recent_activity_lead">
          Talks / Manuscript / Design の各ページから最近のアクティビティを抜粋しています。全体のアーカイブは各セクションのリンクからご覧いただけます。
        </p>
        <div className="row">
          {/* Talks */}
          <Card
            heading="Talks & Articles"
            moreHref="/talks"
            moreLabel="すべて見る"
          >
            {talks.map((t) => (
              <li key={t.id} className="recent_item">
                <div className="recent_item_meta">
                  <span className="recent_item_date">{t.date}</span>
                  <span className="badge badge-pill badge-info">
                    {t.platform}
                  </span>
                  <span
                    className="category_badge"
                    title={CATEGORIES[t.category].desc}
                  >
                    {CATEGORIES[t.category].label}
                  </span>
                </div>
                <a
                  className="recent_item_title"
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.title}
                </a>
              </li>
            ))}
          </Card>

          {/* Manuscript */}
          <Card
            heading="Manuscript & Writings"
            moreHref="/manuscript"
            moreLabel="すべて見る"
          >
            {manuscript.map((m, i) => (
              <li key={i} className="recent_item">
                <div className="recent_item_meta">
                  <span className="badge badge-pill badge-info">
                    {m.kind === "iosdc"
                      ? "iOSDC パンフレット"
                      : m.kind === "contribution"
                        ? "寄稿"
                        : "翻訳レビュー"}
                  </span>
                  <span className="recent_item_date">{m.meta}</span>
                </div>
                <a
                  className="recent_item_title"
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {m.title}
                </a>
              </li>
            ))}
          </Card>

          {/* Design */}
          <Card
            heading="Design"
            moreHref="/design"
            moreLabel="すべて見る"
          >
            {designItems.map((d) => (
              <li key={d.id} className="recent_item">
                <div className="recent_item_meta">
                  <span className="badge badge-pill badge-info">
                    {d.section === "gishohaku" ? "技書博" : "親方Project"}
                  </span>
                  {d.date ? (
                    <span className="recent_item_date">{d.date}</span>
                  ) : null}
                </div>
                <Link href="/design" className="recent_item_title">
                  {d.title}
                </Link>
                {d.subtitle ? (
                  <div className="small text-muted">{d.subtitle}</div>
                ) : null}
              </li>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
