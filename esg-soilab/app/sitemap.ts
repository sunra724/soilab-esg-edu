import type { MetadataRoute } from "next";

const routes = ["", "/demo", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://esg.soilabcoop.kr${route}`,
    lastModified: new Date("2026-06-08"),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
