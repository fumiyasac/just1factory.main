import type { Metadata } from "next";
// デザイン維持のため、現行と同じ Bootstrap 4 / Font Awesome 4 を読み込む。
// 読み込み順: Bootstrap → Font Awesome → プロジェクト独自(globals) の順で上書きする。
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./globals.css";
import NavigationBar from "@/components/global/NavigationBar";
import FooterBar from "@/components/global/FooterBar";

// 旧 nuxt.config.js の head を踏襲（title は package.json の description 相当）
export const metadata: Metadata = {
  title: "This is Just1factory official website",
  description:
    "こちらは「Just1factory(Fumiya Sakai)」の紹介ページになります。運営しているサービスやアプリ・書籍等に関する情報を公開しております。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {/* 旧 layouts/default.vue の #wrapper 構造を踏襲 */}
        <div id="wrapper">
          <NavigationBar />
          {children}
          <FooterBar />
        </div>
      </body>
    </html>
  );
}
