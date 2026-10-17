import { Ld } from "@/components/Seo";

export type FaqItem = { q: string; a: string };

export default function Faq({ items, heading = "Frequently asked questions" }: { items: FaqItem[]; heading?: string }) {
  return (
    <section className="mt-10 rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-slate-900">{heading}</h2>
      <div className="mt-4 space-y-5">
        {items.map((f) => (
          <div key={f.q} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
            <h3 className="font-semibold text-slate-900">{f.q}</h3>
            <p className="mt-1 leading-7 text-slate-600">{f.a}</p>
          </div>
        ))}
      </div>
      <Ld
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </section>
  );
}
