// デザイン成果物のギャラリー用共通コンポーネント。
// 画像 + タイトル + 副題 + 日時/会場 + 説明 + 詳細リンク の 3 列グリッド。
import type { DesignItem } from "@/components/design/data";

function GalleryCard({ item }: { item: DesignItem }) {
  const inner = (
    <div className="design_card_inner">
      <div className="design_thumb_wrap">
        <img
          className="design_thumb img-fluid"
          src={item.image}
          alt={item.title}
          loading="lazy"
        />
      </div>
      <div className="design_body">
        <h3 className="design_title">{item.title}</h3>
        {item.subtitle ? (
          <div className="design_subtitle">{item.subtitle}</div>
        ) : null}
        {(item.date || item.venue) ? (
          <div className="design_meta">
            {item.date ? (
              <div>
                <i className="fa fa-calendar" aria-hidden="true" /> {item.date}
              </div>
            ) : null}
            {item.venue ? (
              <div>
                <i className="fa fa-map-marker" aria-hidden="true" /> {item.venue}
              </div>
            ) : null}
          </div>
        ) : null}
        <p className="design_desc">{item.description}</p>
      </div>
    </div>
  );

  return (
    <div className="col-md-4 col-sm-6 col-12 mb-4">
      {item.url ? (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="design_card_link"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}

export default function DesignGallery({
  heading,
  lead,
  items,
}: {
  heading: string;
  lead: string;
  items: DesignItem[];
}) {
  return (
    <div className="container">
      <div className="design_section_block">
        <h2>{heading}</h2>
        <p className="design_section_lead">{lead}</p>
        <div className="row">
          {items.map((item) => (
            <GalleryCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
