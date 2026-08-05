"use client";

import { useState } from "react";
import Link from "next/link";

// 旧 components/global/NavigationBar.vue の移植。
// サイト唯一の動的処理であるモバイル時のメニュー開閉を useState で実装する
// （Bootstrap4 の collapse JS/jQuery は使わず自前で show クラスを付け外しする）。
export default function NavigationBar() {
  const [expanded, setExpanded] = useState(false);

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
            <Link className="nav-link" href="/books">
              Books
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
