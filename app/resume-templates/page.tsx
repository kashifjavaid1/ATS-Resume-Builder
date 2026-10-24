import type { Metadata } from "next";
import Link from "next/link";
import { TEMPLATES, TEMPLATE_INFO } from "@/components/Templates";
import { Crumbs } from "@/components/Seo";
import Faq from "@/components/Faq";
import { emptyResume } from "@/types/resume";

export const metadata: Metadata = {
  title: "ATS-Friendly Resume Templates",
  description: "Professional ATS-friendly resume templates designed for ATS readability. Preview each one and use it in the free builder.",
  alternates: { canonical: "/resume-templates" }
};

export default function Page() {
  const ids = Object.keys(TEMPLATES) as (keyof typeof TEMPLATES)[];

  return (
    <div>
      <Crumbs items={[["Resume Templates", "/resume-templates"]]} />
      <h1 className="text-3xl font-extrabold">Professional ATS-Friendly Resume Templates</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        All templates use real, selectable text and standard headings. They are designed for ATS readability. Your content is kept when you switch.
      </p>

      <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {ids.map(id => {
          const T = TEMPLATES[id];
          const i = TEMPLATE_INFO[id];
          return (
            <li key={id} className="flex flex-col rounded-2xl border bg-white p-4">
              <div className="relative h-[360px] overflow-hidden rounded-lg ring-1 ring-slate-200" role="img" aria-label={`${i.name} ATS resume template preview`}>
                <div className="absolute left-0 top-0 w-[794px] origin-top-left scale-[0.42] pointer-events-none">
                  <T r={emptyResume} />
                </div>
              </div>

              <h2 className="mt-3 text-lg font-bold">{i.name}</h2>
              <p className="text-sm text-slate-600">{i.desc}</p>
              <p className="mt-1 text-sm"><b>Best for:</b> {i.bestFor}</p>

              <div className="mt-auto pt-4">
                <Link
                  href={`/resume-builder?t=${id}`}
                  className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Use {i.name}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <Faq
        items={[
          { q: "Which resume template should I choose?", a: "Choose the layout that fits the job and country you are applying to. All templates are ATS-friendly, so pick the one whose structure matches your experience, then keep your content the same when you switch." },
          { q: "Are these templates ATS-friendly?", a: "Yes. They use real, selectable text, standard headings and a single column. Avoid adding two-column sections, text boxes or images of text, which parsers can misread." },
          { q: "Can I change the template after filling in my resume?", a: "Yes. Your content is kept when you switch templates in the builder. Preview each one and pick the layout that presents your experience best." },
          { q: "Is there a Pakistan template?", a: "Yes. Use the builder with the Pakistan country format, or start from the CV Maker Pakistan page, which follows the Pakistan format with CNIC-matching name and Matric / FSc education." },
        ]}
      />
    </div>
  );
}