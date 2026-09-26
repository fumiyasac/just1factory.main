import type { MetadataRoute } from "next";

// output: 'export'（静的エクスポート）では Route Handler を静的化する必要があるため指定
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://just1factory.net/sitemap.xml",
  };
}
