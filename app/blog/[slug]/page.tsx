import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/lib/content";
import { ArticleView } from "@/components/Seo";

const list = articles.filter(a => !a.guide);
export const dynamicParams = false;
export const generateStaticParams = () => list.map(a => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const a = list.find(x => x.slug === resolvedParams.slug); 
  if (!a) return {};
  
  return { 
    title: a.title, 
    description: a.desc, 
    alternates: { canonical: `/blog/${a.slug}` }, 
    openGraph: { title: a.title, description: a.desc, type: "article", url: `/blog/${a.slug}` } 
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug; 
  const a = list.find(x => x.slug === slug); 
  if (!a) notFound();
  
  return <ArticleView a={a} path={`/blog/${slug}`} />;
}