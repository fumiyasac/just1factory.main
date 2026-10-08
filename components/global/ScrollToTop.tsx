"use client";

// 右下に浮かぶ「ページトップへ戻る」正円ボタン。
// 常にマウントしておき、visible 状態に応じて CSS 側で opacity + visibility を
// 切り替えてフェード in/out する(unmount するとトランジションが効かないため)。
// スタイルは globals.css の .scroll_to_top に集約し、サイトのダーク(#444444)と揃える。
import { useEffect, useState } from "react";

const SHOW_THRESHOLD_PX = 300;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_THRESHOLD_PX);
    onScroll(); // 画面復帰時 (既にスクロール済み) の初期状態を反映
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`scroll_to_top${visible ? " is-visible" : ""}`}
      aria-label="ページトップへ戻る"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="fa fa-chevron-up" aria-hidden="true" />
    </button>
  );
}
