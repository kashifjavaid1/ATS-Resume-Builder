import type { Metadata } from "next";
import Link from "next/link";
import { Modern } from "@/components/Templates";
import { emptyResume } from "@/types/resume";
import { SITE_URL } from "@/lib/site";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  // FIX 1 — absolute title: layout ka template ab brand dobara nahi jodega
  title: { absolute: "Free CV Maker Pakistan — ATS-Friendly, No Sign-Up | CV Maker Pakistan" },
  description: "Build a free ATS-friendly CV for 21 countries — Pakistan, USA, UK, Germany, Canada, India, Gulf and more. No sign-up. Pakistan format with CNIC, Matric / FSc guidance, then Print to PDF.",
  alternates: { canonical: "/" },
};

const TOOLS = [
  { title: "Resume Builder", text: "Build a professional CV in minutes with live preview and clean templates.", href: "/resume-builder", icon: "📝" },
  { title: "CV Maker Pakistan", text: "Pakistan format with CNIC name, Father's Name, Matric / FSc and single-column ATS layout.", href: "/cv-maker-pakistan", icon: "🇵🇰" },
  { title: "ATS Resume Checker", text: "Check your CV for ATS readability, missing sections and formatting issues.", href: "/ats-resume-checker", icon: "✅" },
  // FIX 2 — broken link: /job-matcher → /resume-job-matcher (asli route)
  { title: "Job Matcher", text: "Compare your CV with a job description and find the missing keywords.", href: "/resume-job-matcher", icon: "🎯" },
  { title: "Resume Templates", text: "Choose a clean template with standard headings that ATS software can read easily.", href: "/resume-templates", icon: "🎨" },
  { title: "Resume Examples", text: "See real examples by role and adapt them with your own experience and numbers.", href: "/resume-examples", icon: "💼" },
];

// Home page pe 8 countries — baaki "See all 21" pe click kar ke
const COUNTRIES_HOME = [
  { label: "Pakistan CV Format", href: "/cv-maker-pakistan", flagCode: "pk", bg: "bg-green-50" },
  { label: "US Resume Template", href: "/country-templates/usa", flagCode: "us", bg: "bg-blue-50" },
  { label: "UK Resume Template", href: "/country-templates/united-kingdom", flagCode: "gb", bg: "bg-indigo-50" },
  { label: "Germany CV Format", href: "/country-templates/germany-austria", flagCode: "de", bg: "bg-amber-50" },
  { label: "Canada Resume Template", href: "/country-templates/canada", flagCode: "ca", bg: "bg-red-50" },
  { label: "Saudi Arabia CV Format", href: "/country-templates/saudi-arabia", flagCode: "sa", bg: "bg-green-50" },
  { label: "UAE CV Format", href: "/country-templates/uae", flagCode: "ae", bg: "bg-emerald-50" },
  { label: "Qatar CV Format", href: "/country-templates/qatar", flagCode: "qa", bg: "bg-purple-50" },
];

// Marquee ke liye bhi wahi 8 (page bhara nahi lagega)
const COUNTRIES_MARQUEE = COUNTRIES_HOME;

const STEPS = [
  { title: "Fill your details", text: "Add your name, contact, summary, experience, education and skills. Your CV updates live as you type." },
  { title: "Choose your country format", text: "Pick from 21 country formats — Pakistan, US, UK, Germany, India, Gulf and more. Photo, length and section rules change with the country." },
  { title: "Check your ATS score", text: "Run the ATS Resume Checker to find missing sections, weak bullets and formatting issues before you apply." },
  { title: "Print to PDF", text: "Preview your CV, then use Print to PDF in your browser to save a clean, print-ready PDF. No sign-up, no watermark." },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "CV Maker Pakistan", url: SITE_URL, applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" }, description: "Free online CV maker for Pakistan and 20 more countries. Build an ATS-friendly CV, check it, and Print to PDF. No sign-up." }).replace(/</g, "\\u003c") }} />

      {/* ===== Country marquee CSS — pure CSS, no JS ===== */}
      <style>{`
        @keyframes countryMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .country-marquee {
          animation: countryMarquee 40s linear infinite;
          will-change: transform;
        }
        .country-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .country-marquee { animation: none; }
        }
      `}</style>

      {/* ===== TOP — Country marquee, 8 ===== */}
      {/* FIX 1 — Marquee duplicate: 2nd copy aria-hidden + link nahi + alt khaali */}
      <div className="border-b py-3">
        <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
          <div className="country-marquee flex w-max items-center gap-3 pr-3">
            {COUNTRIES_MARQUEE.map((c) => (
              <Link key={c.href} href={c.href} className="flex shrink-0 items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full ${c.bg} shadow-sm`}>
                  <img src={`https://flagcdn.com/w160/${c.flagCode}.png`} alt={c.label} className="h-full w-full object-cover" loading="lazy" />
                </span>
                <span className="whitespace-nowrap text-sm font-bold text-slate-800">{c.label}</span>
                <span className="text-indigo-500">→</span>
              </Link>
            ))}
            <div aria-hidden="true" className="flex items-center gap-3">
              {COUNTRIES_MARQUEE.map((c) => (
                <span key={`dup-${c.href}`} className="flex shrink-0 items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 shadow-sm">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full ${c.bg} shadow-sm`}>
                    <img src={`https://flagcdn.com/w160/${c.flagCode}.png`} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </span>
                  <span className="whitespace-nowrap text-sm font-bold text-slate-800">{c.label}</span>
                  <span className="text-indigo-500">→</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <div className="relative py-6 lg:py-10">
        <div className="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-300/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-300/15 blur-3xl pointer-events-none" />
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
              🇵🇰 Pakistan + 20 More Countries • 100% Free & ATS-Optimized
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-[1.12]">
              CV Maker Pakistan & <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">International ATS Resume Builder</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Build a free, ATS-friendly CV for <strong className="text-slate-900">Pakistan</strong> — with CNIC name, Father’s Name, Matric / FSc guidance — or for <strong className="text-slate-900">20 more countries — USA, UK, Germany, Canada, India, Gulf & more</strong>. Live preview, keyword matching, and Print to PDF. Your data stays on your device.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/resume-builder" prefetch={true} className="rounded-xl bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:shadow-emerald-600/30 active:scale-95">Build Your Resume</Link>
              <Link href="/ats-resume-checker" prefetch={true} className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95">Check Resume ATS Score</Link>
            </div>
            <p className="text-sm text-slate-600">Start with <Link href="/cv-maker-pakistan" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">CV Maker Pakistan</Link>, explore <Link href="/country-templates" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">all 21 country formats</Link>, or check your CV with the <Link href="/ats-resume-checker" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">ATS resume checker</Link>.</p>
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700 ring-1 ring-inset ring-emerald-200">100% Free</span>
              <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-indigo-700 ring-1 ring-inset ring-indigo-200">No sign-up</span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 ring-1 ring-inset ring-slate-200">No watermark</span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 ring-1 ring-inset ring-slate-200">Private — stays on your device</span>
            </div>
          </div>
          {/* FIX 2 — CV Preview alt: role + aria-label (ye <img> nahi, live component hai) */}
          <div className="relative mx-auto w-full lg:col-span-6 flex justify-center">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-20 blur-2xl"></div>
            <div role="img" aria-label="Live preview of a modern professional ATS-friendly resume with name, summary, experience, education, skills and languages" className="relative w-full max-w-[440px] h-[720px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 flex flex-col">
              <div className="px-4 py-3 bg-slate-900 text-white text-xs font-medium flex items-center justify-between shrink-0">
                <span>Live Preview • Modern Professional</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              </div>
              <div className="relative flex-grow overflow-hidden bg-slate-50">
                <div className="absolute top-0 left-0 w-[142%] transform scale-[0.70] origin-top-left p-2">
                  <Modern r={emptyResume} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Data Secure — engagement banner ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 p-6 shadow-sm sm:flex-row sm:items-center sm:p-7">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-3xl text-white shadow-md">🔒</span>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900">Your data is secure on this website</h2>
            <p className="mt-1 leading-7 text-slate-600">Your CV is <strong className="text-slate-900">never saved on our server</strong>. It stays on your device only — and you can delete it anytime with one click. Unlike other websites, we never store your personal data.</p>
          </div>
          <Link href="/resume-builder" className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700">Build Securely →</Link>
        </div>
      </section>

      {/* ===== Why use this builder ===== */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl sm:p-10">
          <h2 className="text-2xl font-bold sm:text-3xl">Why job seekers in Pakistan & abroad use this free CV maker</h2>
          <p className="mt-2 max-w-3xl leading-7 text-indigo-100">Most CV tools ask you to sign up, add a watermark, or pay to download. This one does not. Build your CV for any of 21 countries, including Pakistan, check it, and save it with Print to PDF — free, private, and fast.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-sm"><p className="text-2xl">⚡</p><h3 className="mt-2 font-bold">Fast — 5 minutes</h3><p className="mt-1 text-sm leading-6 text-indigo-100">Fill the form, preview live, save as PDF. No account, no waiting.</p></div>
            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-sm"><p className="text-2xl">🔒</p><h3 className="mt-2 font-bold">Private by design</h3><p className="mt-1 text-sm leading-6 text-indigo-100">Your CV stays in your browser. Nothing is uploaded to a server.</p></div>
            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-sm"><p className="text-2xl">🤖</p><h3 className="mt-2 font-bold">ATS-friendly layout</h3><p className="mt-1 text-sm leading-6 text-indigo-100">Single-column templates with standard headings that ATS software can read easily.</p></div>
          </div>
        </div>
      </section>

      {/* ===== Tools — 6 hi, 17 nahi ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Free CV tools — everything in one place</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center leading-7 text-slate-600">Build, check and match your CV without leaving the site. Every tool is free and works in your browser.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100">
              <span className="text-3xl">{t.icon}</span>
              <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-indigo-600">{t.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{t.text}</p>
              <span className="mt-3 inline-block text-sm font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">Open tool →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">How to make your CV in 4 steps</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-base font-black text-white shadow-md">{i + 1}</span>
                <h3 className="mt-3 font-bold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/resume-builder" className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-indigo-700">Start Building Free →</Link>
        </div>
      </section>

      {/* ===== Country grid — 8, baaki See all pe ===== */}
      {/* FIX 3 — "See all" sirf 1 dafa: dashed card wala hata diya, neeche wala text link rakha */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">CV formats for Pakistan & 20 more countries</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center leading-7 text-slate-600">One CV does not fit every country. Choose the country you are applying to and follow its format.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COUNTRIES_HOME.map((c) => (
            <Link key={c.href} href={c.href} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl ${c.bg} shadow-sm transition group-hover:scale-110`}>
                <img src={`https://flagcdn.com/w160/${c.flagCode}.png`} alt={c.label} className="h-full w-full object-cover" loading="lazy" />
              </span>
              <span className="flex-1 text-sm font-bold leading-snug text-slate-800 group-hover:text-indigo-600">{c.label}</span>
              <span className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600">→</span>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/country-templates" className="text-sm font-bold text-indigo-600 no-underline hover:text-indigo-800">See all 21 country formats →</Link>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Faq
          heading="Frequently Asked Questions"
          items={[
            { q: "Is CV Maker Pakistan really free?", a: "Yes. CV Maker Pakistan is free to use online. There is no sign-up and no watermark. You build your CV in your browser and use Print to PDF to save it." },
            { q: "Can I make a CV for other countries too?", a: "Yes. This builder covers Pakistan plus 20 more countries — USA, UK, Germany, Canada, Japan, Sweden, Italy, Spain, Singapore, Hong Kong, Netherlands, UAE, Saudi Arabia, Qatar, Australia, New Zealand, India, Bangladesh, Sri Lanka and China. Each country has its own format page." },
            { q: "Will my CV pass ATS?", a: "The builder uses templates with standard headings that ATS software can read more easily, and the ATS checker highlights common issues. Most designs are single-column for maximum parser compatibility; two-column options are offered only for markets where they are accepted. No tool can guarantee a pass, because every employer configures its system differently." },
            { q: "How long should my CV be?", a: "Fresh graduates: 1 page. 1-5 years of experience: 1 page, maximum 2. More than 5 years: usually up to 2 pages (Australia and New Zealand commonly use 2–3). Keep only what the job asks for." },
            { q: "Do I need a photo on my CV?", a: "It depends on the country. US and UK CVs usually leave out the photo. Pakistan and Gulf CVs include one only if the job advertisement asks for it. Each country page explains its own rule. Note: this builder does not add photos — if one is required, add it in your document tool before printing." },
            { q: "Is my data safe?", a: "Yes. Your data is secure on this website — it is never saved on our server. Your CV stays on your device only, and you can delete it anytime with one click." },
          ]}
        />
      </section>
    </div>
  );
}

