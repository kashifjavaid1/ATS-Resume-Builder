import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { examples } from "@/lib/content";
import { Crumbs, Cta, Ld } from "@/components/Seo";
import { TEMPLATES } from "@/components/Templates";
import { emptyResume } from "@/types/resume";

export const dynamicParams = false;
export const generateStaticParams = () => examples.map(e => ({ slug: e.slug }));

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const resolvedParams = await params;
  const e = examples.find(x => x.slug === resolvedParams.slug); 
  if (!e) return {};

  const title = `${e.role} Resume Example and Writing Tips`;
  return { 
    title, 
    description: `See a ${e.role.toLowerCase()} resume example with a sample summary, key skills and bullet points. ${e.tag}`, 
    alternates: { canonical: `/resume-examples/${e.slug}` }, 
    openGraph: { title, url: `/resume-examples/${e.slug}` } 
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params; 
  const e = examples.find(x => x.slug === slug); 
  if (!e) notFound();

  const r = { 
    ...emptyResume, 
    name: "Alex Morgan", 
    title: e.role, 
    summary: e.summary, 
    skills: e.skills.join(", "), 
    experience: [{ title: e.role, company: "Company Name", dates: "2022 - Present", bullets: e.bullets.join("\n") }], 
    template: e.template ?? "modern",
  };

  const T = TEMPLATES[r.template];

  // Encoded resume data so user can load it directly into the builder on click
  const encodedData = encodeURIComponent(JSON.stringify(r));

  return (
    <div className="mx-auto max-w-4xl py-8 px-4 sm:px-6">
      <Crumbs items={[["Resume Examples", "/resume-examples"], [`${e.role} Resume`, `/resume-examples/${slug}`]]} />
      
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{e.role} Resume Example</h1>
          <p className="mt-2 text-base text-slate-600">{e.tag}</p>
        </div>
        
        {/* Instant Use in Builder Button */}
        <Link 
          href={`/resume-builder?data=${encodedData}`}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:from-indigo-500 hover:to-violet-500 transition-all active:scale-95 shrink-0"
        >
          Use This Template →
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10" role="img" aria-label={`${e.role} resume example`}>
        <T r={r} />
      </div>

      <div className="mt-12 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900">How to write this resume</h2>
        <p className="text-slate-600 leading-relaxed">{e.tip}</p>
        
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Key skills to consider</h3>
          <div className="flex flex-wrap gap-2">
            {e.skills.map((skill, idx) => (
              <span key={idx} className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 text-sm text-slate-600">
          Open the <Link className="font-semibold text-indigo-600 underline" href="/resume-builder">resume builder</Link> to start from this structure, pick a layout from the <Link className="font-semibold text-indigo-600 underline" href="/resume-templates">resume templates</Link>, then read the <Link className="font-semibold text-indigo-600 underline" href="/ats-resume-guide">ATS resume guide</Link> before you submit.
        </div>
      </div>

      {e.faq && e.faq.length > 0 && (
        <section id="faq" className="mt-12 scroll-mt-28">
          <h2 className="text-2xl font-black text-slate-900">Frequently asked questions</h2>
          {e.faq.map((f) => (
            <div key={f.q} className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">{f.q}</h3>
              <p className="mt-1 leading-7 text-slate-700">{f.a}</p>
            </div>
          ))}
          <Ld data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: e.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
        </section>
      )}

      <div className="mt-12">
        <Cta />
      </div>
    </div>
  );
}