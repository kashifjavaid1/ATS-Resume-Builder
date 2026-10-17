import Link from "next/link";
import type { Article } from "@/lib/content";
import { SITE_URL as BASE } from "@/lib/site";
export function Ld({ data }: { data: object }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />; }
export function Crumbs({ items }: { items: [string, string][] }) {
  const all: [string, string][] = [["Home", "/"], ...items];
  return (<><nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">{all.map(([n, h], i) => <span key={h}>{i > 0 && " › "}{i < all.length - 1 ? <Link href={h} className="underline">{n}</Link> : n}</span>)}</nav>
    <Ld data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: all.map(([n, h], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: BASE + h })) }} /></>);
}
export function Cta() {
  return (<aside className="my-8 rounded-2xl bg-indigo-50 p-6"><h2 className="text-xl font-bold">Put this into practice</h2><p className="mt-1 text-slate-700">Build your resume with the free <Link className="underline" href="/resume-builder">online resume builder</Link>, then test it with the <Link className="underline" href="/ats-resume-checker">ATS resume checker</Link>. Browse <Link className="underline" href="/resume-templates">resume templates</Link> or <Link className="underline" href="/resume-examples">resume examples</Link> for ideas.</p></aside>);
}
export function ArticleView({ a, path }: { a: Article; path: string }) {
  return (<article className="prose-slate mx-auto max-w-3xl"><Crumbs items={a.guide ? [[a.title, path]] : [["Blog", "/blog"], [a.title, path]]} />
    <h1 className="text-3xl font-extrabold sm:text-4xl">{a.title}</h1><p className="mt-4 text-lg text-slate-600">{a.intro}</p>
    {a.sections.map(s => <section key={s.h} className="mt-8"><h2 className="text-2xl font-bold">{s.h}</h2>{s.p.map((t, i) => <p key={i} className="mt-3 leading-7">{t}</p>)}</section>)}
    <Cta />
    {a.faq && <section><h2 className="text-2xl font-bold">Frequently asked questions</h2>{a.faq.map(f => <div key={f.q} className="mt-4"><h3 className="font-semibold">{f.q}</h3><p className="mt-1">{f.a}</p></div>)}
      <Ld data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: a.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} /></section>}
    <Ld data={{ "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.desc, mainEntityOfPage: BASE + path }} /></article>);
}
