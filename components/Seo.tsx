import Link from "next/link";
import type { Article } from "@/lib/content";
import { SITE_URL as BASE } from "@/lib/site";
export function Ld({ data }: { data: object }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />; }

const slugify = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter((x) => x.length > 0);
  return (<>{parts.map((part, i) => {
    const b = part.match(/^\*\*([^*]+)\*\*$/);
    if (b) return <strong key={i} className="font-semibold text-slate-900">{b[1]}</strong>;
    const l = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (l) return <Link key={i} href={l[2]} className="font-semibold text-indigo-600 underline decoration-indigo-300 underline-offset-2 transition-colors hover:text-indigo-800">{l[1]}</Link>;
    return <span key={i}>{part}</span>;
  })}</>);
}

type Block = { kind: "p"; text: string } | { kind: "ul" | "ol"; items: string[] };

function toBlocks(lines: string[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^[-\u2022]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-\u2022]\s+/.test(lines[i])) { items.push(lines[i].replace(/^[-\u2022]\s+/, "")); i++; }
      blocks.push({ kind: "ul", items });
    } else if (/^\d{1,2}\.\s+/.test(line)) {
      let j = i;
      const items: string[] = [];
      while (j < lines.length && /^\d{1,2}\.\s+/.test(lines[j])) { items.push(lines[j].replace(/^\d{1,2}\.\s+/, "")); j++; }
      if (items.length >= 2) { blocks.push({ kind: "ol", items }); i = j; }
      else { blocks.push({ kind: "p", text: line }); i++; }
    } else { blocks.push({ kind: "p", text: line }); i++; }
  }
  return blocks;
}

export function Crumbs({ items }: { items: [string, string][] }) {
  const all: [string, string][] = [["Home", "/"], ...items];
  return (<><nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">{all.map(([n, h], i) => <span key={h} className="flex items-center gap-1.5">{i > 0 && <span className="text-slate-300">›</span>}{i < all.length - 1 ? <Link href={h} className="font-medium text-slate-500 transition-colors hover:text-indigo-600">{n}</Link> : <span className="font-semibold text-slate-800">{n}</span>}</span>)}</nav>
    <Ld data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: all.map(([n, h], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: BASE + h })) }} /></>);
}

export function Cta() {
  return (<aside className="my-10 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-8 text-center text-white shadow-xl sm:p-10">
    <h2 className="text-2xl font-bold sm:text-3xl">Put this into practice</h2>
    <p className="mx-auto mt-2 max-w-xl leading-7 text-emerald-100">Don&apos;t just read it — build it. Your CV stays on your device, nothing is uploaded, and it&apos;s free.</p>
    <div className="mt-5 flex flex-wrap justify-center gap-3">
      <Link href="/resume-builder" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-700 shadow hover:bg-emerald-50">Create Your Free CV →</Link>
      <Link href="/ats-resume-checker" className="rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">Check Your CV</Link>
    </div>
    <p className="mt-5 text-sm text-emerald-100">Need ideas? <Link href="/resume-templates" className="font-semibold text-white no-underline hover:text-emerald-100">Browse resume templates</Link> or <Link href="/resume-examples" className="font-semibold text-white no-underline hover:text-emerald-100">resume examples</Link>.</p>
  </aside>);
}

export function ArticleView({ a, path }: { a: Article; path: string }) {
  return (<article className="mx-auto max-w-3xl"><Crumbs items={a.guide ? [[a.title, path]] : [["Blog", "/blog"], [a.title, path]]} />
    {/* Hero card — same colours as /cv-maker-pakistan, now with buttons */}
    <header className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl sm:p-10">
      <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{a.guide ? "Free Guide" : "Blog"}</span>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{a.title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">{a.intro}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/resume-builder" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow hover:bg-indigo-50">Create Your Free CV →</Link>
        <Link href="/ats-resume-checker" className="rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">Check Your CV</Link>
      </div>
    </header>

    {/* Jump-link table of contents */}
    <nav aria-label="In this article" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{a.guide ? "In this guide" : "In this article"}</p>
      <ol className="mt-3 space-y-2">
        {a.sections.map((s, i) => (
          <li key={s.h}>
            <Link href={`#${slugify(s.h)}`} className="group flex items-center gap-3 text-sm font-semibold text-slate-700 transition-colors hover:text-indigo-600">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-xs font-extrabold text-white">{i + 1}</span>
              {s.h}
            </Link>
          </li>
        ))}
      </ol>
    </nav>

    {/* Content sections as cards */}
    {a.sections.map((s, i) => <section key={s.h} id={slugify(s.h)} className="mt-6 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-base font-black text-white shadow-md">{i + 1}</span><h2 className="text-2xl font-bold text-slate-900">{s.h}</h2></div>{toBlocks(s.p).map((b, j) => b.kind === "p" ? <p key={j} className="mt-3 leading-7 text-slate-700"><Rich text={b.text} /></p> : b.kind === "ul" ? <ul key={j} className="mt-3 list-disc space-y-1.5 pl-6 leading-7 text-slate-700">{b.items.map((it, k) => <li key={k}><Rich text={it} /></li>)}</ul> : <ol key={j} className="mt-3 list-decimal space-y-1.5 pl-6 leading-7 text-slate-700">{b.items.map((it, k) => <li key={k}><Rich text={it} /></li>)}</ol>)}</section>)}

    {/* CTA — only once, in the middle (after sections, before FAQ) */}
    <Cta />

    {a.faq && <section id="faq" className="mt-6 scroll-mt-28"><h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>{a.faq.map(f => <div key={f.q} className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="font-semibold text-slate-900">{f.q}</h3><p className="mt-1 leading-7 text-slate-700"><Rich text={f.a} /></p></div>)}
      <Ld data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: a.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} /></section>}

    <Ld data={{ "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.desc, mainEntityOfPage: BASE + path }} /></article>);
}
