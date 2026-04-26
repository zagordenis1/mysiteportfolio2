import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: "https://zagordenis1.github.io/mysiteportfolio2/sitemap.xml"
  };
}
