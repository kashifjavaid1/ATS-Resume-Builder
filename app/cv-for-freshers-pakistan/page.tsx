import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { ArticleView } from "@/components/Seo";
const a = articles.find(x => x.slug === "cv-for-freshers-pakistan")!;
export const metadata: Metadata = { title: a.title, description: a.desc, alternates: { canonical: "/cv-for-freshers-pakistan" } };
export default function Page() { return <ArticleView a={a} path="/cv-for-freshers-pakistan" />; }
