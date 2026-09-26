// 全 176 本を年別・日付降順で並べたアーカイブ。
// 各項目には日付・プラットフォーム・カテゴリー・タイトル・登壇イベント名を表示。
// これが Talks & Articles ページのメインコンテンツになる。
import {
  ARCHIVE,
  CATEGORIES,
  type Category,
  type TalkItem,
} from "@/components/talks/data";

function groupByYear(items: TalkItem[]): Array<[number, TalkItem[]]> {
  const map = new Map<number, TalkItem[]>();
  for (const it of items) {
    const y = Number(it.date.slice(0, 4));
    const bucket = map.get(y);
    if (bucket) {
      bucket.push(it);
    } else {
      map.set(y, [it]);
    }
  }
  // ARCHIVE 自体が日付降順なので、年内順は既に降順。年の並びのみ降順化。
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

function CategoryBadge({ category }: { category: Category }) {
  const info = CATEGORIES[category];
  return (
    <span
      className="category_badge"
      style={{ backgroundColor: info.color }}
      title={info.desc}
    >
      {info.label}
    </span>
  );
}

function CategoryLegend() {
  const cats = Object.keys(CATEGORIES) as Category[];
  return (
    <div className="category_legend">
      <span className="category_legend_head">カテゴリー：</span>
      {cats.map((key) => {
        const info = CATEGORIES[key];
        return (
          <span
            key={key}
            className="category_badge"
            style={{ backgroundColor: info.color }}
            title={info.desc}
          >
            {info.label}
          </span>
        );
      })}
    </div>
  );
}

function ArchiveItem({ item }: { item: TalkItem }) {
  return (
    <li className="archive_item">
      <div className="archive_dot" aria-hidden="true" />
      <div className="archive_content">
        <div className="archive_meta">
          <span className="small text-muted archive_date">{item.date}</span>
          <span className="badge badge-pill badge-info archive_platform">
            {item.platform}
          </span>
          <CategoryBadge category={item.category} />
        </div>
        <a
          className="archive_title_link"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.title}
        </a>
        {item.event ? (
          <div className="small text-muted archive_event">
            <i className="fa fa-users" aria-hidden="true" /> {item.event}
          </div>
        ) : null}
      </div>
    </li>
  );
}

function YearBlock({ year, items }: { year: number; items: TalkItem[] }) {
  const platformCounts = items.reduce<Record<string, number>>((acc, it) => {
    acc[it.platform] = (acc[it.platform] ?? 0) + 1;
    return acc;
  }, {});
  // 表示順は Speaker Deck → Zenn → Qiita → SlideShare で安定させる
  const order = ["Speaker Deck", "Zenn", "Qiita", "SlideShare"] as const;
  const breakdown = order
    .filter((p) => platformCounts[p])
    .map((p) => `${p} × ${platformCounts[p]}`)
    .join("  ／  ");

  return (
    <section className="archive_year">
      <h3 className="archive_year_heading">
        <span className="archive_year_num">{year}</span>
        <span className="archive_year_suffix">年</span>
        <span className="archive_year_count">・{items.length} 本</span>
      </h3>
      <div className="archive_year_breakdown">{breakdown}</div>
      <ul className="archive_list list-unstyled">
        {items.map((it) => (
          <ArchiveItem key={`${it.date}-${it.url}`} item={it} />
        ))}
      </ul>
    </section>
  );
}

export default function TalksArchive() {
  const years = groupByYear(ARCHIVE);
  return (
    <div className="container">
      <div className="talks_archive_block">
        <h2>これまでの歩み（全 {ARCHIVE.length} 本）</h2>
        <p className="archive_lead">
          年別・日付降順で、登壇資料と技術記事のすべてをカテゴリータグ付きで並べています。時系列で辿ると、UI
          実装の掘り下げから始まり、バックエンド／クロスプラットフォームの視点、アーキテクチャ、非同期・テスト、そして直近の
          AI × 越境へと関心が移り変わってきた軌跡が見えます。
        </p>
        <CategoryLegend />
        {years.map(([year, items]) => (
          <YearBlock key={year} year={year} items={items} />
        ))}
      </div>
    </div>
  );
}
