import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { ArticleView } from "@/components/Seo";
const a = articles.find(x => x.slug === "photo-on-cv-pakistan")!;
export const metadata: Metadata = { title: a.title, description: a.desc, alternates: { canonical: "/photo-on-cv-pakistan" } };
export default function Page() { return <ArticleView a={a} path="/photo-on-cv-pakistan" />; }
