import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  // FIX 1 — absolute title: layout ka template ab brand dobara nahi jodega
  title: { absolute: "About CV Maker Pakistan — Free ATS-Friendly Resume Builder" },
  description: "About CV Maker Pakistan: a free, private, ATS-friendly resume builder for 21 countries, including Pakistan. No sign-up, no watermark. Build your CV online and Print to PDF.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <div className="space-y-12">
      {/* ===== Hero ===== */}
      <section className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl sm:p-10">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-200">About Us</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">About CV Maker Pakistan</h1>
        <p className="mt-3 max-w-2xl leading-7 text-indigo-100">
          CV Maker Pakistan helps you create a clean, ATS-friendly CV, check it for common problems,
          and compare it with a job description — free, without an account, and without a watermark.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/resume-builder" className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-indigo-700 shadow hover:bg-indigo-50">Build Your CV Free →</Link>
          <Link href="/ats-resume-checker" className="rounded-xl border border-white/40 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10">Check ATS Score</Link>
        </div>
      </section>

      {/* ===== Why we built it — Pain + Frustration ===== */}
      <section className="mx-auto max-w-3xl space-y-4 leading-7 text-slate-600">
        <h2 className="text-2xl font-bold text-slate-900">Why we built this CV maker</h2>
        <p>
          Good CV tools are often locked behind paywalls, accounts and watermarks. You fill a long form,
          then you are asked to sign up — and only then do you find out the download costs money.
          That is frustrating when you just need one clean CV for a job today.
        </p>
        <p>
          CV Maker Pakistan exists to remove that friction. You open the builder, fill your details,
          see your CV live, check it, and save it with Print to PDF. No account, no waiting, no watermark.
        </p>
      </section>

      {/* ===== What you get — Desire + Intention ===== */}
      <section>
        <h2 className="text-center text-2xl font-bold text-slate-900">What you get — everything in one place</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center leading-7 text-slate-600">
          You do not need 3 different websites. Build, check and match your CV here, in your browser.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <Link href="/resume-builder" className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl">
            <span className="text-3xl">📝</span>
            <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-indigo-600">Resume Builder</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Build a professional, ATS-friendly CV in minutes with live preview and clean templates with standard headings.</p>
            <span className="mt-3 inline-block text-sm font-bold text-indigo-600">Open tool →</span>
          </Link>
          <Link href="/ats-resume-checker" className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl">
            <span className="text-3xl">✅</span>
            <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-indigo-600">ATS Resume Checker</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Check your CV for ATS readability, missing sections and formatting issues before you apply.</p>
            <span className="mt-3 inline-block text-sm font-bold text-indigo-600">Open tool →</span>
          </Link>
          {/* FIX 2 — broken link: /job-matcher → /resume-job-matcher (asli route) */}
          <Link href="/resume-job-matcher" className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl">
            <span className="text-3xl">🎯</span>
            <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-indigo-600">Job Matcher</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Compare your CV with a job description and find the missing keywords the employer is looking for.</p>
            <span className="mt-3 inline-block text-sm font-bold text-indigo-600">Open tool →</span>
          </Link>
        </div>
      </section>

      {/* ===== Pakistan format ===== */}
      <section className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Made for job seekers in Pakistan — and abroad</h2>
        <p className="mt-2 leading-7 text-slate-600">
          For Pakistan, the builder follows the local format: name matching your CNIC, Father&apos;s Name,
          Matriculation, FSc / Higher Secondary School Certificate, Bachelor&apos;s or Master&apos;s degrees
          with passing years, a single-column layout, and a PDF file for applications.
          Fresh graduates usually keep it to one page; experienced candidates may use two pages.
        </p>
        <p className="mt-3 leading-7 text-slate-600">
          Applying outside Pakistan? Choose from{" "}
          <Link href="/country-templates" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">21 country formats</Link>{" "}
          — including{" "}
          <Link href="/country-templates/usa" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">US Resume Template</Link>,{" "}
          <Link href="/country-templates/united-kingdom" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">UK Resume Template</Link>,{" "}
          <Link href="/country-templates/germany-austria" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">Germany CV Format</Link>,{" "}
          <Link href="/country-templates/canada" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">Canada Resume Template</Link>,{" "}
          <Link href="/country-templates/saudi-arabia" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">Saudi Arabia CV Format</Link>{" "}
          and{" "}
          <Link href="/country-templates/uae" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">UAE CV Format</Link>.
          Each country page explains its own photo, length and section rules.
        </p>
      </section>

      {/* ===== Privacy — honest ===== */}
      <section className="flex flex-col items-start gap-4 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 p-6 shadow-sm sm:flex-row sm:items-center sm:p-7">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-3xl text-white shadow-md">🔒</span>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-900">Private by design</h2>
          <p className="mt-1 leading-7 text-slate-600">
            Everything runs in your browser. The builder saves your draft in local storage on your device,
            and the checker analyses text locally. There is no account, no sign-up and no server-side CV storage.
            You can delete your data anytime.
          </p>
        </div>
        <Link href="/privacy" className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700">Privacy Policy →</Link>
      </section>

      {/* ===== FAQ — screenshot keywords naturally ===== */}
      <section>
        <Faq
          heading="Frequently Asked Questions"
          items={[
            { q: "Is CV Maker Pakistan really free?", a: "Yes. The builder is 100% free to use online. There is no sign-up, no watermark and no payment. You build your CV in your browser and save it with Print to PDF." },
            { q: "Can I use CV Maker Pakistan online without downloading anything?", a: "Yes. The builder works fully in your browser — no app, no software download. Open the builder, fill your details, preview live, and Print to PDF." },
            { q: "How do I download my CV as PDF?", a: "Build your CV, then use Print to PDF in your browser. That gives you a clean PDF you can send with job applications. No sign-up or watermark." },
            { q: "Is there a Pakistani CV template free download?", a: "There is no separate file — Print to PDF is how you download it. Use the builder with the Pakistan CV format — CNIC name, Father's Name, Matric / FSc and single-column ATS layout — then Print to PDF to save your CV." },
            { q: "What is the CV format Pakistan for jobs?", a: "CV format Pakistan usually means: name matching CNIC, Father's Name, Matric / FSc with passing years, degrees, skills and experience in a single-column layout. Fresh graduates keep it to 1 page; experienced candidates may use 2 pages. See the Pakistan format page for full guidance." },
            { q: "Can I make a CV for other countries too?", a: "Yes. This builder covers Pakistan plus 20 more countries — USA, UK, Germany, Canada, Japan, Sweden, Italy, Spain, Singapore, Hong Kong, Netherlands, UAE, Saudi Arabia, Qatar, Australia, New Zealand, India, Bangladesh, Sri Lanka and China. Each country has its own format page." },
            { q: "Is my data safe?", a: "Yes. Your CV is never saved on our server. It stays on your device in local storage, and you can delete it anytime. There is no account and no server-side CV storage." },
          ]}
        />
      </section>

      {/* ===== CTA ===== */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Ready to make your CV?</h2>
        <p className="mx-auto mt-2 max-w-xl leading-7 text-slate-600">
          Start with <Link href="/cv-maker-pakistan" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">CV Maker Pakistan</Link>,
          or explore <Link href="/resume-examples" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">resume examples</Link> and{" "}
          <Link href="/resume-templates" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">templates</Link> first.
          Questions? <Link href="/contact" className="font-semibold text-indigo-700 no-underline hover:text-indigo-900">Contact us</Link>.
        </p>
        <Link href="/resume-builder" className="mt-5 inline-block rounded-xl bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500">Start Building Free →</Link>
      </section>
    </div>
  );
}

