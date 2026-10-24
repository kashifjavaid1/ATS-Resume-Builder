import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Seo";

export const metadata: Metadata = {
  title: "International Resume & CV Templates by Country | Free ATS Builder",
  description:
    "Create 100% free, ATS-friendly resumes and CVs tailored for Pakistan, USA, UK, Germany, Canada, Japan, Australia, GCC, India, Bangladesh, Sri Lanka, China, and global job markets. No sign-up required. Print to PDF.",
  alternates: { canonical: "/country-templates" },
  openGraph: {
    title: "International Resume & CV Templates by Country | Free ATS Builder",
    description: "Create free ATS-friendly resumes tailored for global recruitment standards. No sign-up required.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  }
};

import { COUNTRIES as countries } from "@/lib/countries";
import Faq from "@/components/Faq";

/* ============================================================
   BACKGROUND DECOR
============================================================ */
function BackgroundDecor() {
  return (
    <>
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
    </>
  );
}

/* ============================================================
   HERO HEADER
============================================================ */
function HeroHeader() {
  return (
    <header className="mx-auto max-w-3xl space-y-5 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-indigo-700 shadow-sm">
        <span className="h-2 w-2 animate-ping rounded-full bg-indigo-600" />
        Global Recruitment Standards &amp; ATS Optimizer
      </span>

      <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
        International Resume &amp; CV{" "}
        <br className="hidden sm:block" />
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Templates by Country
        </span>
      </h1>

      <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
        Create free, ATS-friendly resumes tailored for Pakistan, the USA, UK, Germany, Canada, Gulf, and global markets. No sign-up required. Print to PDF.
      </p>
    </header>
  );
}

/* ============================================================
   🌟 SEO COUNTRY CARD COMPONENT
============================================================ */
function CountryCard({ country }: { country: (typeof countries)[number] }) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-transparent transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-2xl hover:shadow-indigo-200/40 hover:ring-indigo-100">

      {/* Subtle gradient glow top-right */}
      <div className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${country.accent} opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-20`} />

      {/* Upper Content wrapper */}
      <div>
        {/* Top Row: Flag + Badge */}
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Flag */}
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm ring-1 ring-white transition-all duration-500 group-hover:scale-105 group-hover:shadow-md">
              <img
                src={`https://flagcdn.com/w160/${country.flag}.png`}
                alt={`${country.name} Resume Template and CV Format`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Country Code */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {country.code} Format
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                ATS Optimized
              </span>
            </div>
          </div>

          {/* Badge */}
          <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
            {country.badge}
          </span>
        </div>

        {/* Title + Description */}
        <div className="relative mt-4">
          <h2 className="text-base font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
            {country.name} {country.slug === "usa" || country.slug === "united-kingdom" || country.slug === "canada" ? "Resume Template" : "CV Format"}
          </h2>
          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-500">
            {country.desc}
          </p>
        </div>

        {/* Divider */}
        <div className="relative my-4 h-px w-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />

        {/* Compliance Rules */}
        <div className="relative space-y-2">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Key Formatting Rules
          </h3>
          <ul className="space-y-1.5">
            {country.rules.map((rule, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs font-medium text-slate-600 transition-colors duration-300 group-hover:text-slate-700"
              >
                <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50 ring-1 ring-indigo-100 transition-all duration-300 group-hover:bg-indigo-600 group-hover:ring-indigo-600">
                  <svg
                    className="h-2 w-2 text-indigo-600 transition-colors group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={4}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="line-clamp-1">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== 🌟 PREMIUM CTA BUTTON ===== */}
      <div className="relative mt-6 pt-4">
        <Link
          href={`/country-templates/${country.slug}`}
          aria-label={`See ${country.name} CV format and template`}
          className="relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-indigo-600 px-4 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-300/50 active:scale-[0.97] group/btn"
        >
          {/* Shimmer sweep */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />

          {/* Text */}
          <span className="relative z-10 drop-shadow-sm">
            See {country.name} CV Format
          </span>

          {/* Arrow in circle */}
          <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm transition-all duration-300 group-hover/btn:bg-white group-hover/btn:translate-x-1">
            <svg
              className="h-3 w-3 text-white transition-colors duration-300 group-hover/btn:text-slate-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-indigo-600 transition-all duration-500 group-hover:w-full" />
    </article>
  );
}

/* ============================================================
   BOTTOM SEO CONTENT & CTA
============================================================ */
function BottomCTA() {
  return (
    <section aria-labelledby="cta-heading" className="relative mt-16 overflow-hidden rounded-3xl bg-slate-900 p-8 text-center text-white shadow-2xl sm:p-14">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-600/30 blur-3xl" />

      <div className="relative z-10 space-y-6">
        <h2 id="cta-heading" className="text-3xl font-black tracking-tight sm:text-4xl">
          Ready to Build Your International Resume?
        </h2>
        {/* FIX — "100% client-side data privacy" absolute dawa → honest line */}
        <p className="mx-auto max-w-xl text-sm text-slate-300 sm:text-base">
          Print to PDF, your CV stays on your device — nothing is uploaded — and optimized for global Applicant Tracking Systems.
        </p>
        <div className="pt-4">
          <Link
            href="/resume-builder"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/50 active:scale-95"
          >
            Start Building For Free 
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function CountryTemplatesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50/30">
      <BackgroundDecor />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-2">
          <Crumbs items={[["Country Formats", "/country-templates"]]} />
        </nav>

        <HeroHeader />

        {/* Countries Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => (
            <CountryCard key={country.slug} country={country} />
          ))}
        </div>

        <BottomCTA />

        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6 text-center sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">Free, no sign-up, no watermark, private</h2>
            <p className="mt-2 leading-7 text-slate-600">
              Every country format uses the same free builder. Your CV stays in your browser — nothing is
              uploaded. Build it, then use Print to PDF to save it.
            </p>
            <a href="/resume-builder" className="mt-5 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700">
              Build My CV Free
            </a>
          </div>
          <Faq
            items={[
              { q: "Which country CV format should I choose?", a: "Choose the country where you will apply. Each country page explains its format, rules and photo guidance. The builder then applies that country's template." },
              { q: "Is this country CV builder free?", a: "Yes. Every country format uses the same free builder. There is no sign-up and no watermark. You build your CV in your browser and use Print to PDF to save it." },
              { q: "Does one CV work for every country?", a: "No. Photo rules, length, personal details and section order differ by country. A US resume leaves out the photo, while a Gulf CV usually includes nationality and visa status. Use the format for the country you are applying to." },
              { q: "Will my CV work with ATS?", a: "The builder uses templates with standard headings that ATS software can read more easily. Most designs are single-column for maximum parser compatibility; two-column options are offered only for markets where they are accepted. The ATS checker highlights common formatting and completeness issues. No tool can guarantee a pass, because every employer configures its system differently." },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
