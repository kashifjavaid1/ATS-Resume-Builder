import type { Metadata } from "next";
import Link from "next/link";
import { examples } from "@/lib/content";
import { Crumbs, Cta } from "@/components/Seo";
import Faq from "@/components/Faq";

export const metadata: Metadata = { 
  title: "Professional Resume Examples by Job", 
  description: "Browse resume examples for developers, analysts, teachers, students and graduates, with sample summaries, skills and bullet points.", 
  alternates: { canonical: "/resume-examples" } 
};

const COUNTRY_EXAMPLES = [
  { label: "Pakistan CV Format", href: "/cv-maker-pakistan", flag: "🇵🇰", color: "from-green-500 to-emerald-600" },
  { label: "US Resume Template", href: "/country-templates/usa", flag: "🇺🇸", color: "from-blue-500 to-indigo-600" },
  { label: "UK Resume Template", href: "/country-templates/united-kingdom", flag: "🇬🇧", color: "from-indigo-500 to-purple-600" },
  { label: "Germany CV Format", href: "/country-templates/germany-austria", flag: "🇩🇪", color: "from-amber-500 to-orange-600" },
  { label: "Canada Resume Template", href: "/country-templates/canada", flag: "🇨🇦", color: "from-red-500 to-rose-600" },
  { label: "Japan CV Format", href: "/country-templates/japan", flag: "🇯🇵", color: "from-rose-500 to-pink-600" },
  { label: "Sweden CV Format", href: "/country-templates/sweden", flag: "🇸🇪", color: "from-sky-500 to-blue-600" },
  { label: "Italy CV Format", href: "/country-templates/italy", flag: "🇮🇹", color: "from-green-500 to-teal-600" },
  { label: "Spain CV Format", href: "/country-templates/spain", flag: "🇪🇸", color: "from-orange-500 to-red-600" },
  { label: "Singapore CV Format", href: "/country-templates/singapore", flag: "🇸🇬", color: "from-red-500 to-pink-600" },
  { label: "Hong Kong CV Format", href: "/country-templates/hong-kong", flag: "🇭🇰", color: "from-slate-500 to-slate-700" },
  { label: "Netherlands CV Format", href: "/country-templates/netherlands", flag: "🇳🇱", color: "from-orange-500 to-amber-600" },
  { label: "UAE CV Format", href: "/country-templates/uae", flag: "🇦🇪", color: "from-emerald-500 to-green-600" },
  { label: "Saudi Arabia CV Format", href: "/country-templates/saudi-arabia", flag: "🇸🇦", color: "from-green-600 to-emerald-700" },
  { label: "Qatar CV Format", href: "/country-templates/qatar", flag: "🇶🇦", color: "from-purple-500 to-fuchsia-600" },
  { label: "Australia CV Format", href: "/country-templates/australia", flag: "🇦🇺", color: "from-cyan-500 to-blue-600" },
  { label: "New Zealand CV Format", href: "/country-templates/new-zealand", flag: "🇳🇿", color: "from-teal-500 to-cyan-600" },
];

const STEPS = [
  { title: "Choose the example for your role", text: "Open the example that matches your field — Software Engineer for Software Engineer, Teacher for Teacher. An example from the wrong field will weaken your CV." },
  { title: "Rewrite the summary in your own words", text: "Use the example summary only to learn the format. Write your own summary with your years of experience, your field and one real achievement — in 2 to 3 lines." },
  { title: "Add numbers to every bullet", text: "Instead of “Responsible for website”, write “Reduced website load time by 40%”. Bullets with numbers catch a recruiter’s eye and read better in ATS software." },
  { title: "List only the skills you actually have", text: "Do not copy every skill from the example. Keep only the skills you really have and the ones the job advertisement asks for. A skill you cannot prove will fail in the interview." },
  { title: "Put it in the builder and check it", text: "Add your CV to the builder, check the spelling, then run the ATS Checker and save it with Print to PDF." },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/60 via-white to-white">
      <div className="mx-auto max-w-5xl py-8 px-4 sm:px-6">
        <Crumbs items={[["Resume Examples", "/resume-examples"]]} />
        
        {/* ===== Beautiful Hero ===== */}
        <div className="relative mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl sm:p-10">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-yellow-300/30 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              ✨ Free • No sign-up • ATS-friendly
            </span>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">Professional Resume Examples</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-indigo-100">
              Each example shows a realistic summary, skills list and achievement bullets you can adapt. Click any role to view the preview or use it directly in the builder.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/resume-builder" className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-indigo-700 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">Build My CV Free →</a>
              <a href="#guide" className="rounded-xl border border-white/40 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10">How to Use Examples</a>
            </div>
          </div>
        </div>

        {/* ===== Example Cards — beautiful ===== */}
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {examples.map((e, i) => (
            <li key={e.slug} className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-100 to-pink-100 opacity-60 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="relative flex flex-col h-full justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
                      ✓ Verified Template
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-black text-white shadow-md">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                    <Link href={`/resume-examples/${e.slug}`} className="before:absolute before:inset-0">
                      {e.role} Resume Example
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">{e.tag}</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 transition-transform group-hover:translate-x-1">
                    View & Use Template →
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">ATS-friendly</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* ===== Guide — beautiful ===== */}
        <section id="guide" className="mt-12 scroll-mt-24 overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6 sm:px-8">
            <h2 className="text-2xl font-bold text-white">How to Use Resume Examples to Write Your CV</h2>
            <p className="mt-1 text-indigo-100">Do not copy a resume example word for word. Use it to understand the structure, then fill it with your own real experience.</p>
          </div>
          <div className="p-6 sm:p-8">
            <ol className="space-y-5">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-base font-black text-white shadow-md">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-1 leading-7 text-slate-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
              <h3 className="font-bold text-slate-900">⚠️ Mistakes to avoid</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 leading-7 text-slate-600">
                <li>Copying the example’s name, company or numbers exactly as they are</li>
                <li>Making a 2-page CV when you have less than 1-2 years of experience</li>
                <li>Adding a photo, CNIC number or salary when the country format does not require it</li>
              </ul>
            </div>
            <a href="/resume-builder" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
              Use This Example in the Builder →
            </a>
          </div>
        </section>

        {/* ===== Resume Examples by Country — beautiful ===== */}
        <section className="mt-12 overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-sm">
          <div className="px-6 pt-6 sm:px-8">
            <h2 className="text-2xl font-bold text-slate-900">🌍 Resume Examples by Country</h2>
            <p className="mt-2 leading-7 text-slate-600">
              The same role needs a different CV format in each country. Photo rules, length,
              personal details and section order all change. Choose the country you are
              applying to, then follow that country’s format.
            </p>
          </div>
          <ul className="grid gap-3 p-6 sm:grid-cols-2 sm:px-8 sm:pb-8">
            {COUNTRY_EXAMPLES.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-lg shadow-sm`}>{c.flag}</span>
                  <span className="flex-1 group-hover:text-indigo-600">{c.label}</span>
                  <span aria-hidden="true" className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-slate-100 bg-indigo-50/50 px-6 py-5 sm:px-8">
            <p className="leading-7 text-slate-600">
              Example: a US resume leaves out the photo and date of birth, while a Gulf CV
              usually includes nationality and visa status. A Germany CV follows the Europass
              style, and a Pakistan CV includes your Father’s Name and Matric / FSc education.
            </p>
          </div>
        </section>

        <Faq
          items={[
            { q: "Can I copy a resume example as-is?", a: "No. Use examples as structure and wording inspiration, then replace every line with your own real experience, numbers and skills. Recruiters notice copied examples, and invented achievements fail in interviews." },
            { q: "Which example fits a fresher with no experience?", a: "Start with the Student or Fresh Graduate example. Lead with education, projects and internships, and keep the CV to 1 page." },
            { q: "How do I adapt an example for Pakistan?", a: "Follow the Pakistan format: CNIC-matching name, Father's Name, Matric / FSc education with years, and a single-column layout. See the CV Maker Pakistan page for the full format." },
            { q: "How long should my CV be after using an example?", a: "Fresh graduates: 1 page. 1-5 years experience: 1 page, maximum 2. More than 5 years: up to 2 pages. Keep only what the job asks for." },
            { q: "Does one resume example work for every country?", a: "No. Use the same role example, then apply the format of the country you are applying to — for example US Resume Template, UK Resume Template, Germany CV Format, Canada Resume Template, Saudi Arabia CV Format or Qatar CV Format. Each country page explains its own rules." },
          ]}
        />
        <div className="mt-12">
          <Cta />
        </div>
      </div>
    </div>
  );
}
