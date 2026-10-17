import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/content";
import { Crumbs } from "@/components/Seo";

export const metadata: Metadata = { 
  title: "Resume Tips & Career Resources", 
  description: "Practical articles on ATS resumes, resume length, bullet points and common mistakes.", 
  alternates: { canonical: "/blog" } 
};

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl py-8 px-4 sm:px-6">
      <div className="mb-6">
        <Crumbs items={[["Blog", "/blog"]]} />
      </div>

      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Career Expert Hub
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Resume Tips and Career Resources
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Practical guides on ATS-friendly resumes, formatting rules, bullet points, and avoiding common hiring mistakes.
        </p>
      </div>

      {/* Articles Grid Layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {articles.map((a) => {
          const articleUrl = a.guide ? `/${a.slug}` : `/blog/${a.slug}`;

          return (
            <article 
              key={a.slug} 
              className="group rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-xl shadow-indigo-500/5 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">
                    {a.guide ? "Comprehensive Guide" : "Expert Article"}
                  </span>
                  <span className="text-slate-400 text-xs font-semibold">3 min read</span>
                </div>
                
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  <Link href={articleUrl} className="hover:text-indigo-600 transition-colors">
                    {a.title}
                  </Link>
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {a.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <Link href={articleUrl} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Full Guide &rarr;
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}