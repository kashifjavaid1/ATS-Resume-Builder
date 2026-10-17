import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { ArticleView } from "@/components/Seo";
const a = articles.find(x => x.slug === "cv-for-gulf-saudi-jobs")!;
export const metadata: Metadata = { title: a.title, description: a.desc, alternates: { canonical: "/cv-for-gulf-saudi-jobs" } };
export default function Page() { return <ArticleView a={a} path="/cv-for-gulf-saudi-jobs" />; }
