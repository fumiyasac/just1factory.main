import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack のワークスペースルートをこのプロジェクト直下に固定
  turbopack: { root: import.meta.dirname },
  // Firebase Hosting へ静的配信するため静的エクスポートを有効化
  output: "export",
  // /books を /books/index.html として出力し、Firebase のディレクトリ配信と揃える
  trailingSlash: true,
  // 静的エクスポートでは画像最適化サーバが無いため無効化（素の <img> 中心で忠実移植）
  images: { unoptimized: true },
};

export default nextConfig;
