import type { MetadataRoute } from "next";

// output: 'export'（静的エクスポート）では Route Handler を静的化する必要があるため指定
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://just1factory.net";

  // 現在公開中のページ一覧
  // 新しいページを追加したら、ここにもエントリを追加してください
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
