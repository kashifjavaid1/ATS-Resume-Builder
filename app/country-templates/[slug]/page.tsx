import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COUNTRIES, countryBySlug, type Country } from "@/lib/countries";
import { COUNTRY_TEMPLATE_SETS } from "@/lib/countryTemplates";
import { TEMPLATE_INFO } from "@/components/Templates";
import { SITE_URL } from "@/lib/site";
import { Crumbs } from "@/components/Seo";
import Faq from "@/components/Faq";

export const dynamicParams = false;

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = countryBySlug(slug);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: { canonical: `/country-templates/${c.slug}` },
    openGraph: { title: c.metaTitle, description: c.metaDesc, type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = countryBySlug(slug);
  if (!found) notFound();
  const c = found as Country;
  const others = COUNTRIES.filter((x) => x.slug !== c.slug).slice(0, 6);
  const path = `/country-templates/${c.slug}`;
  const templateSet = COUNTRY_TEMPLATE_SETS[c.builderCode];
  const hasTwoColumn = templateSet?.includes("sidebar") || templateSet?.includes("duo") || templateSet?.includes("twin");
  return (
    <div className="mx-auto max-w-3xl space-y-8 leading-7">
      <Crumbs items={[["Country Formats", "/country-templates"], [c.name, path]]} />
      <div>
        <span className={`inline-block rounded-full bg-gradient-to-r ${c.accent} px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm`}>
          {c.badge}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
          {c.name} {c.slug === "usa" || c.slug === "united-kingdom" || c.slug === "canada" ? "Resume Template" : "CV Format"} — Free Builder
        </h1>
        <p className="mt-4 text-lg text-slate-600">{c.desc}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/resume-builder?country=${encodeURIComponent(c.builderCode)}`}
            className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500"
          >
            Create Your {c.name} CV — Free
          </Link>
          <Link
            href="/ats-resume-checker"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Check My CV
          </Link>
        </div>
      </div>

      <section className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold">Key formatting rules for {c.name}</h2>
        <ul className="mt-4 space-y-2">
          {c.rules.map((r) => (
            <li key={r} className="flex gap-2 text-slate-700">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-600" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      {templateSet && (
        <section className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">Choose your {c.name} resume template</h2>
          <p className="mt-2 text-slate-700">
            {templateSet.length} ATS-friendly designs for {c.name} employers. Pick one below — the builder
            opens with that template already selected and the live preview on top.
            {hasTwoColumn && " Includes a two-column option for roles where it is accepted."}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {templateSet.map((id) => (
              <Link
                key={id}
                href={`/resume-builder?country=${encodeURIComponent(c.builderCode)}&t=${id}`}
                className="block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 hover:border-indigo-300 hover:bg-indigo-50"
              >
                <span className="block text-sm font-bold text-indigo-700">{TEMPLATE_INFO[id].name} →</span>
                <span className="mt-1 block text-sm font-normal text-slate-600">{TEMPLATE_INFO[id].desc}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="space-y-8">
        {c.intro.map((p, i) => (
          <p key={i} className="text-slate-700">{p}</p>
        ))}
        {c.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-2xl font-bold">{s.h}</h2>
            {s.p.map((p, i) => (
              <p key={i} className="mt-3 text-slate-700">{p}</p>
            ))}
          </section>
        ))}
      </div>

      <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6 sm:p-8">
        <h2 className="text-xl font-bold">Free, no sign-up, no watermark, private</h2>
        <p className="mt-1 text-slate-700">
          Build your {c.name} CV in the free builder, then use Print to PDF to save it. Your CV stays in
          your browser — nothing is uploaded.
        </p>
      </div>

      <Faq items={c.faq} />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold">Other country formats</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/country-templates/${o.slug}`} className="block rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">
                {o.name} CV Format →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Country Formats", item: `${SITE_URL}/country-templates` },
              { "@type": "ListItem", position: 3, name: c.name, item: `${SITE_URL}${path}` },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
