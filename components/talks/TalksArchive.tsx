"use client";

// 全 176 本を年別・日付降順で並べたアーカイブ。
// 各項目には日付・プラットフォーム・カテゴリー・タイトル・登壇イベント名を表示。
// 画面上部の chip 型フィルター(「すべて」+ 7 カテゴリー)で絞り込める。
// 選択中カテゴリーの state は親 (TalksMain) 側で保持し、本コンポーネントは
// props として受け取る(TalksStats との連動のため)。
import { useEffect, useRef, useState } from "react";
import {
  ARCHIVE,
  CATEGORIES,
  type Category,
  type TalkItem,
} from "@/components/talks/data";

type Filter = Category | "all";
const CATEGORY_KEYS = Object.keys(CATEGORIES) as Category[];

function groupByYear(items: TalkItem[]): Array<[number, TalkItem[]]> {
  const map = new Map<number, TalkItem[]>();
  for (const it of items) {
    const y = Number(it.date.slice(0, 4));
    const bucket = map.get(y);
    if (bucket) bucket.push(it);
    else map.set(y, [it]);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

function CategoryBadge({ category }: { category: Category }) {
  const info = CATEGORIES[category];
  return (
    <span className="category_badge" title={info.desc}>
      {info.label}
    </span>
  );
}

function CategoryFilter({
  selected,
  onSelect,
  counts,
  total,
}: {
  selected: Filter;
  onSelect: (f: Filter) => void;
  counts: Record<Category, number>;
  total: number;
}) {
  const chip = (active: boolean) =>
    `talks_filter_chip${active ? " is-active" : ""}`;
  return (
    <div className="talks_filter">
      <span className="talks_filter_head">カテゴリーで絞り込む</span>
      <div className="talks_filter_bar" role="group" aria-label="カテゴリーフィルター">
        <button
          type="button"
          className={chip(selected === "all")}
          onClick={() => onSelect("all")}
          aria-pressed={selected === "all"}
        >
          すべて
          <span className="talks_filter_count">{total}</span>
        </button>
        {CATEGORY_KEYS.map((key) => {
          const info = CATEGORIES[key];
          const active = selected === key;
          return (
            <button
              key={key}
              type="button"
              className={chip(active)}
              onClick={() => onSelect(key)}
              title={info.desc}
              aria-pressed={active}
            >
              {info.label}
              <span className="talks_filter_count">{counts[key] ?? 0}</span>
            </button>
          );
        })}
      </div>
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

export default function TalksArchive({
  selected,
  onSelect,
  counts,
  filtered,
}: {
  selected: Filter;
  onSelect: (f: Filter) => void;
  counts: Record<Category, number>;
  filtered: TalkItem[];
}) {
  const years = groupByYear(filtered);
  const activeLabel =
    selected === "all" ? "すべて" : CATEGORIES[selected].label;

  // フィルタ切替時に 200ms フェード (opacity 0 → 1) を発火。
  const [fade, setFade] = useState(true);
  const prev = useRef<Filter>(selected);
  useEffect(() => {
    if (prev.current === selected) return;
    prev.current = selected;
    setFade(false);
    const t = window.setTimeout(() => setFade(true), 10);
    return () => window.clearTimeout(t);
  }, [selected]);

  return (
    <div className="container">
      <div className="talks_archive_block">
        <h2>これまでの歩み（全{ARCHIVE.length} 本）</h2>
        <p className="archive_lead">
          年別・日付降順で、登壇資料と技術記事のすべてをカテゴリータグ付きで並べています。時系列で辿ると、UI実装の掘り下げから始まり、バックエンド／クロスプラットフォームの視点、アーキテクチャ、非同期・テスト、そして直近のAI×越境へと関心が移り変わってきた軌跡が見えます。
        </p>
        <CategoryFilter
          selected={selected}
          onSelect={onSelect}
          counts={counts}
          total={ARCHIVE.length}
        />
        <div className="archive_filter_summary small text-muted mb-3">
          表示中：<strong>{activeLabel}</strong>
          <strong>{filtered.length}</strong> 本 / 全 {ARCHIVE.length} 本
        </div>
        <div className={`archive_fade${fade ? " is-visible" : ""}`}>
          {years.length === 0 ? (
            <p className="text-muted">該当する登壇・記事はありません。</p>
          ) : (
            years.map(([year, items]) => (
              <YearBlock key={year} year={year} items={items} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
