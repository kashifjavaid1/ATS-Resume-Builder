import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs, Ld } from "@/components/Seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // FIX — absolute title: layout ka template ab brand dobara nahi jodega
  title: { absolute: "CV Maker Pakistan — Free Online Resume Builder | Print to PDF" },
  description:
    "CV Maker Pakistan: build a professional, ATS-friendly CV online free. No sign-up. Add your Matric, FSc / Higher Secondary School Certificate, degree, skills and work history, then Print to PDF. Your CV stays on your device.",
  alternates: { canonical: "/cv-maker-pakistan" },
  openGraph: {
    title: "CV Maker Pakistan — Free Online Resume Builder",
    description:
      "Build a professional, ATS-friendly CV online free. No sign-up. Pakistan format with Matric, FSc, CNIC guidance. Print to PDF.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const faqs = [
  {
    q: "Is CV Maker Pakistan free?",
    a: "Yes. The builder is free to use online. There is no sign-up and no watermark. You build your CV in your browser and use Print to PDF to save it.",
  },
  {
    q: "What should a Pakistani CV include?",
    a: "A Pakistani CV usually includes your full name matching your CNIC, Father's Name, contact details, education (Matriculation, FSc / Higher Secondary School Certificate, Bachelor's or Master's with passing years), work experience, skills, and references if asked. Keep it single-column with standard headings so ATS software can read it.",
  },
  {
    q: "How long should a CV be in Pakistan?",
    a: "Fresh graduates and entry-level candidates should usually keep it to 1 page. Candidates with several years of experience may use 2 pages. Do not add pages just to fill space; every line should support the job you want.",
  },
  {
    q: "Should I save my CV as PDF or Word?",
    a: "Save and submit your finished CV as a PDF unless the employer asks for a Word (.doc / .docx) file. PDF keeps your formatting the same on every device. This builder uses your browser Print to PDF option.",
  },
  {
    q: "Does this CV maker work for ATS?",
    a: "The builder uses templates with standard headings (Experience, Education, Skills) that ATS software can read more easily. Most designs are single-column for maximum parser compatibility; two-column options are offered only for markets where they are accepted. The ATS checker highlights common formatting and completeness issues. No tool can guarantee a pass, because every employer configures its system differently.",
  },
  {
    q: "Can I download a Pakistani CV template free?",
    a: "Yes. Build your CV with the free builder and print it to PDF. See the resume templates page for layout ideas, including the Pakistani CV format, and the country templates page for Pakistan and other countries.",
  },
];

export default function Page() {
  return (
    <div className="space-y-12">
      <Crumbs items={[["CV Maker Pakistan", "/cv-maker-pakistan"]]} />

      {/* ===== Hero ===== */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl sm:p-10">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">🇵🇰 Pakistan + 20 More Countries • 100% Free</p>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
          CV Maker Pakistan — Free Online Resume Builder
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
          Build a professional, ATS-friendly CV for jobs in Pakistan — online free, with no sign-up.
          Add your skills and work history, then Print to PDF. Your CV stays on your device.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/resume-builder?country=PK"
            className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow hover:bg-indigo-50"
          >
            Build My CV Free →
          </Link>
          <Link
            href="/ats-resume-checker"
            className="rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
          >
            Check My CV
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-white/20 px-3 py-1">No sign-up</span>
          <span className="rounded-full bg-white/20 px-3 py-1">No watermark</span>
          <span className="rounded-full bg-white/20 px-3 py-1">ATS-friendly</span>
          <span className="rounded-full bg-white/20 px-3 py-1">Private — stays on your device</span>
        </div>
      </div>

      {/* ===== How to make a CV in Pakistan ===== */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How to make a CV in Pakistan</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          A good CV Maker Pakistan tool does one thing: it helps you present the right details in the
          order Pakistani employers expect, without design tricks that confuse ATS software. Follow
          these steps:
        </p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-base font-black text-white shadow-md">1</span>
            <h3 className="mt-3 font-bold text-slate-900">Personal details</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Full name exactly as on your CNIC, Father&apos;s Name, mobile number, email and city. Do not put your full CNIC number on your CV unless the job post explicitly asks for it.</p>
          </li>
          <li className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-base font-black text-white shadow-md">2</span>
            <h3 className="mt-3 font-bold text-slate-900">Education, newest first</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Write Matriculation / O-Levels, then FSc / ICS / A-Levels (Higher Secondary School Certificate), then your Bachelor&apos;s or Master&apos;s degree, each with institution name and passing year. Use the CV format Pakistan employers recognise: degree, board or university, year.</p>
          </li>
          <li className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-base font-black text-white shadow-md">3</span>
            <h3 className="mt-3 font-bold text-slate-900">Experience, newest first</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Job title, company, dates, then 3–5 bullets per role showing what you did and what changed. Use numbers where you honestly can.</p>
          </li>
          <li className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-base font-black text-white shadow-md">4</span>
            <h3 className="mt-3 font-bold text-slate-900">Skills</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">List tools and skills from the job post that you truly have, such as MS Excel, English / Urdu, or your trade skill. Do not list skills you cannot show.</p>
          </li>
          <li className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-base font-black text-white shadow-md">5</span>
            <h3 className="mt-3 font-bold text-slate-900">Length</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Keep your CV to 1 page if you are a fresh graduate, and up to 2 pages if you have several years of experience.</p>
          </li>
          <li className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-base font-black text-white shadow-md">6</span>
            <h3 className="mt-3 font-bold text-slate-900">Save as PDF</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Use Print to PDF from your browser so your CV looks the same on every device. Check the PDF by selecting its text — if you cannot select the text, the file may not be readable by ATS software.</p>
          </li>
        </ol>
      </section>

      {/* ===== Pakistani CV format ===== */}
      <section className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Pakistani CV format — what employers expect</h2>
        <p className="mt-3 leading-7 text-slate-600">
          The standard Pakistani CV format is single-column, with clear headings: Summary, Education,
          Experience, Skills. A Pakistani CV template free download usually follows this order. Keep
          fonts common, dates in one format (for example Mar 2022 – Jan 2024), and contact details in
          the body of the page, not only in a header or footer that some parsers skip.
        </p>
        <p className="mt-3 leading-7 text-slate-600">
          For a Pakistani CV format in Word style, the same structure applies: simple headings, real
          bullet points, no text inside images, and no multi-column tables. See{" "}
          <Link href="/resume-templates" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">resume templates</Link> for layout
          ideas and <Link href="/resume-examples" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">resume examples</Link> for
          sample wording.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-indigo-700 ring-1 ring-inset ring-indigo-200">Summary</span>
          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-indigo-700 ring-1 ring-inset ring-indigo-200">Education</span>
          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-indigo-700 ring-1 ring-inset ring-indigo-200">Experience</span>
          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-indigo-700 ring-1 ring-inset ring-indigo-200">Skills</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700 ring-1 ring-inset ring-emerald-200">Single-column • ATS-friendly</span>
        </div>
      </section>

      {/* ===== Why use ===== */}
      <section>
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Why use CV Maker Pakistan online free?</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
            <span className="text-3xl">🆓</span>
            <h3 className="mt-3 font-bold text-slate-900">Free, no sign-up</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Open the builder and start. No account, no watermark.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
            <span className="text-3xl">🇵🇰</span>
            <h3 className="mt-3 font-bold text-slate-900">Pakistan format built in</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Matric, FSc / HSSC, CNIC name matching and local education order.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
            <span className="text-3xl">🤖</span>
            <h3 className="mt-3 font-bold text-slate-900">ATS-friendly layout</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Single-column templates with standard headings.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
            <span className="text-3xl">🔒</span>
            <h3 className="mt-3 font-bold text-slate-900">Private</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Your CV is processed in your browser and stored only in your browser. Nothing is uploaded to a server.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
            <span className="text-3xl">✅</span>
            <h3 className="mt-3 font-bold text-slate-900">Checker included</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Run the <Link href="/ats-resume-checker" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">ATS resume checker</Link> before you apply.</p>
          </div>
          <Link href="/resume-builder?country=PK" className="group flex flex-col justify-center rounded-3xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 p-6 transition hover:bg-indigo-50">
            <span className="text-lg font-bold text-indigo-700">Start now — it takes 5 minutes →</span>
            <span className="mt-1 text-sm leading-6 text-indigo-600">Open the free builder, fill your details, preview live, Print to PDF.</span>
          </Link>
        </div>
      </section>

      {/* ===== FAQ — same content, card design ===== */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Frequently asked questions</h2>
        <div className="mt-6 grid gap-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md">
              <h3 className="font-bold text-slate-900">{f.q}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <aside className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-8 text-center text-white shadow-xl sm:p-10">
        <h2 className="text-2xl font-bold sm:text-3xl">Ready to build your CV?</h2>
        <p className="mx-auto mt-2 max-w-xl leading-7 text-emerald-100">
          Start with the free <Link href="/resume-builder?country=PK" className="font-semibold text-white no-underline hover:text-emerald-100">online resume builder</Link>,
          then test it with the <Link href="/ats-resume-checker" className="font-semibold text-white no-underline hover:text-emerald-100">ATS resume checker</Link>.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/resume-builder?country=PK" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-700 shadow hover:bg-emerald-50">Start Building Free →</Link>
          <Link href="/ats-resume-checker" className="rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">Check ATS Score</Link>
        </div>
      </aside>

      <Ld
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <Ld
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "CV Maker Pakistan",
          url: `${SITE_URL}/cv-maker-pakistan`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
          description:
            "Free online CV maker for Pakistan. Build an ATS-friendly CV, check it, and Print to PDF. No sign-up.",
        }}
      />
      <Ld
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "CV Maker Pakistan", item: `${SITE_URL}/cv-maker-pakistan` },
          ],
        }}
      />
    </div>
  );
}

