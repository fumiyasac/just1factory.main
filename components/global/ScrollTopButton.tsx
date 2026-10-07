"use client";

// 右下に浮かぶ「ページトップへ戻る」ボタン。全ページで有効にするため layout.tsx に配置する。
// 新しい CSS ファイルは追加せず、Bootstrap 4.6 のユーティリティクラス(position-fixed, m-3, btn 系)と
// インラインの zIndex 指定だけで賄う。
import { useEffect, useState } from "react";

const SHOW_THRESHOLD_PX = 300;

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_THRESHOLD_PX);
    // 初期ロード直後(スクロール済み状態での画面復帰等)にも反映
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="btn btn-secondary position-fixed m-3"
      style={{ bottom: 0, right: 0, zIndex: 1030 }}
      aria-label="ページトップへ戻る"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="fa fa-chevron-up" aria-hidden="true" />
    </button>
  );
}
