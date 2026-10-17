import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { ArticleView } from "@/components/Seo";
const a = articles.find(x => x.slug === "resume-format-guide")!;
export const metadata: Metadata = { title: a.title, description: a.desc, alternates: { canonical: "/resume-format-guide" } };
export default function Page() { return <ArticleView a={a} path="/resume-format-guide" />; }
