import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://zagordenis1.github.io/mysiteportfolio2/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
