import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const routes = [
  "/",
  "/projects",
  "/projects/sarisaripos",
  "/about",
  "/skills",
  "/experience",
  "/contact",
  "/resume",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-10-25T00:00:00+08:00"),
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : route === "/projects/sarisaripos" ? 0.9 : 0.7,
  }));
}
