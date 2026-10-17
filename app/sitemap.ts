import type { MetadataRoute } from "next";
import { articles, examples } from "@/lib/content";
import { COUNTRIES } from "@/lib/countries";
import { SITE_URL, CONTENT_UPDATED } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);
  const s = [
    "",
    "/resume-builder",
    "/ats-resume-checker",
    "/resume-job-matcher",
    "/resume-templates",
    "/resume-examples",
    "/blog",
    "/cv-maker-pakistan",
    "/country-templates",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    ...examples.map((e) => `/resume-examples/${e.slug}`),
    ...COUNTRIES.map((c) => `/country-templates/${c.slug}`),
    ...articles.map((a) => (a.guide ? `/${a.slug}` : `/blog/${a.slug}`)),
  ];
  return s.map((p) => ({ url: SITE_URL + p, lastModified }));
}
