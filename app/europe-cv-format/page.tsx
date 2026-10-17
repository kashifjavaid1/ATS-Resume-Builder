import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { ArticleView } from "@/components/Seo";
const a = articles.find(x => x.slug === "europe-cv-format")!;
export const metadata: Metadata = { title: a.title, description: a.desc, alternates: { canonical: "/europe-cv-format" } };
export default function Page() { return <ArticleView a={a} path="/europe-cv-format" />; }
