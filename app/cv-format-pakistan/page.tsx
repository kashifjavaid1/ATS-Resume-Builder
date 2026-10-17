import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { ArticleView } from "@/components/Seo";
const a = articles.find(x => x.slug === "cv-format-pakistan")!;
export const metadata: Metadata = { title: a.title, description: a.desc, alternates: { canonical: "/cv-format-pakistan" } };
export default function Page() { return <ArticleView a={a} path="/cv-format-pakistan" />; }
