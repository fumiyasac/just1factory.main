import type { Metadata } from "next";
// デザイン維持のため、現行と同じ Bootstrap 4 / Font Awesome 4 を読み込む。
// 読み込み順: Bootstrap → Font Awesome → プロジェクト独自(globals) の順で上書きする。
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./globals.css";
import NavigationBar from "@/components/global/NavigationBar";
import FooterBar from "@/components/global/FooterBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://just1factory.net"),
  title: {
    default: "Just1factory - fumiyasac (Fumiya Sakai)",
    template: "%s | Just1factory",
  },
  description:
    "酒井文也（fumiyasac）のポートフォリオサイト。iOS/Androidアプリ開発に関する技術書・登壇資料・OSSなどのアウトプットを公開しています。",
  openGraph: {
    type: "website",
    siteName: "Just1factory",
    locale: "ja_JP",
    url: "https://just1factory.net",
    title: "Just1factory - fumiyasac (Fumiya Sakai)",
    description:
      "酒井文也（fumiyasac）のポートフォリオサイト。iOS/Androidアプリ開発に関する技術書・登壇資料・OSSなどのアウトプットを公開しています。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Just1factory - fumiyasac (Fumiya Sakai)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fumiyasac",
    creator: "@fumiyasac",
    title: "Just1factory - fumiyasac (Fumiya Sakai)",
    description:
      "酒井文也（fumiyasac）のポートフォリオサイト。iOS/Androidアプリ開発に関する技術書・登壇資料・OSSなどのアウトプットを公開しています。",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
