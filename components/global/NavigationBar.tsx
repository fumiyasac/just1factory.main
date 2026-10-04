"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 旧 components/global/NavigationBar.vue の移植。
// サイト唯一の動的処理であるモバイル時のメニュー開閉を useState で実装する
// （Bootstrap4 の collapse JS/jQuery は使わず自前で show クラスを付け外しする）。
export default function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  // trailingSlash: true の設定下では pathname が "/talks/" のように末尾スラッシュを
  // 伴いうるため、両辺を正規化してから比較する。
  const normalized = (pathname ?? "/").replace(/\/+$/, "") || "/";

  // href が "/" なら完全一致、サブパスは normalized が href と同じか、
  // href を接頭辞に持つ (/talks や /talks/sub 等) 場合に active とする。
  const isActive = (href: string) => {
    if (href === "/") return normalized === "/";
    return normalized === href || normalized.startsWith(`${href}/`);
  };
  const linkClass = (href: string) =>
    `nav-link${isActive(href) ? " active" : ""}`;

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top navbar_block">
      {/* 旧 DOM 順（トグル → ブランド → メニュー）を踏襲 */}
      <button
        className={`navbar-toggler${expanded ? "" : " collapsed"}`}
        type="button"
        aria-controls="nav_collapse"
        aria-expanded={expanded}
        aria-label="Toggle navigation"
        onClick={() => setExpanded((v) => !v)}
      >
        <span className="navbar-toggler-icon" />
      </button>

      <Link className="navbar-brand logo_font" href="/">
        Just1factory
      </Link>

      <div
        className={`collapse navbar-collapse${expanded ? " show" : ""}`}
        id="nav_collapse"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className={linkClass("/books")} href="/books">
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link className={linkClass("/talks")} href="/talks">
              Talks
            </Link>
          </li>
          <li className="nav-item">
            <Link className={linkClass("/design")} href="/design">
              Design
            </Link>
          </li>
          <li className="nav-item">
            <Link className={linkClass("/manuscript")} href="/manuscript">
              Manuscript
            </Link>
          </li>
          <li className="nav-item">
            <Link className={linkClass("/showcase")} href="/showcase">
              Showcase
            </Link>
          </li>
          <li className="nav-item">
            <Link className={linkClass("/timeline")} href="/timeline">
              Timeline
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://techblog-just1factory.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Private
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://speakerdeck.com/fumiyasac0921"
              target="_blank"
              rel="noopener noreferrer"
            >
              Speaker Deck
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://github.com/fumiyasac"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
