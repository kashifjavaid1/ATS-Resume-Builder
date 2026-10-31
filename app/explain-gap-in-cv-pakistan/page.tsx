import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { ArticleView } from "@/components/Seo";
const a = articles.find(x => x.slug === "explain-gap-in-cv-pakistan")!;
export const metadata: Metadata = { title: a.title, description: a.desc, alternates: { canonical: "/explain-gap-in-cv-pakistan" } };
export default function Page() { return <ArticleView a={a} path="/explain-gap-in-cv-pakistan" />; }
