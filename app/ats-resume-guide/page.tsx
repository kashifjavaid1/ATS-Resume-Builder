import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { ArticleView } from "@/components/Seo";
const a = articles.find(x => x.slug === "ats-resume-guide")!;
export const metadata: Metadata = { title: a.title, description: a.desc, alternates: { canonical: "/ats-resume-guide" } };
export default function Page() { return <ArticleView a={a} path="/ats-resume-guide" />; }
