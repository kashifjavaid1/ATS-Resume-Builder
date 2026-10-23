"use client";
import { useEffect, useState, useCallback, startTransition } from "react";
import { emptyResume, Resume, TemplateId, Edu, Cert, Language, Project } from "@/types/resume";
import { TEMPLATES, TEMPLATE_INFO } from "./Templates";


const KEY = "ats-resume-v1";

const COUNTRY_TEMPLATE_MAP: Record<string, TemplateId> = {
  US: "modern", USA: "modern",
  UK: "classic", GB: "classic", "UNITED-KINGDOM": "classic",
  DE: "classic", "GERMANY-AUSTRIA": "classic",
  EUROPE: "classic", EU: "classic",
  IT: "classic", ES: "classic",
  CA: "modern", CANADA: "modern",
  JP: "minimal", JAPAN: "minimal",
  SE: "minimal", SWEDEN: "minimal",
  SG: "modern", SINGAPORE: "modern",
  HK: "executive", "HONG-KONG": "executive",
  NL: "minimal", NETHERLANDS: "minimal",
  UAE: "executive",
  "SAUDI-ARABIA": "executive", KSA: "executive", SA: "executive",
  QA: "executive", QATAR: "executive",
  AU: "modern", AUSTRALIA: "modern",
  NZ: "modern", "NEW-ZEALAND": "modern",
  PK: "classic", PAKISTAN: "classic",
};

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States", USA: "United States",
  UK: "United Kingdom", GB: "United Kingdom", "UNITED-KINGDOM": "United Kingdom",
  DE: "Germany", "GERMANY-AUSTRIA": "Germany & Austria",
  EUROPE: "Europe", EU: "Europe",
  IT: "Italy", ES: "Spain",
  CA: "Canada", CANADA: "Canada",
  JP: "Japan", JAPAN: "Japan",
  SE: "Sweden", SWEDEN: "Sweden",
  SG: "Singapore", SINGAPORE: "Singapore",
  HK: "Hong Kong", "HONG-KONG": "Hong Kong",
  NL: "Netherlands", NETHERLANDS: "Netherlands",
  UAE: "United Arab Emirates",
  "SAUDI-ARABIA": "Saudi Arabia", KSA: "Saudi Arabia", SA: "Saudi Arabia",
  QA: "Qatar", QATAR: "Qatar",
  AU: "Australia", AUSTRALIA: "Australia",
  NZ: "New Zealand", "NEW-ZEALAND": "New Zealand",
  PK: "Pakistan", PAKISTAN: "Pakistan",
};

const text = [
  ["name", "Full name"],
  ["title", "Professional title"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["location", "Location"]
] as const;

const inputStyle = "w-full rounded-xl border border-indigo-100 bg-slate-50/80 px-4 py-3 text-base sm:text-sm font-medium text-slate-900 transition-all focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-600/10 shadow-sm";

export default function Builder() {
  const [r, setR] = useState<Resume>(emptyResume);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) setR({ ...emptyResume, ...JSON.parse(s) });
    } catch {}

    const params = new URLSearchParams(window.location.search);
    const templateQuery = params.get("t");
    const countryQuery = params.get("country");

    if (countryQuery) {
      const countryCode = countryQuery.toUpperCase();
      setSelectedCountry(countryCode);
      setR(p => {
        const updated = { ...p, targetCountry: countryCode };
        const locked = COUNTRY_TEMPLATE_MAP[countryCode];
        if (locked) updated.template = locked;
        return updated;
      });
    } else if (templateQuery && templateQuery in TEMPLATES) {
      setR(p => ({ ...p, template: templateQuery as TemplateId }));
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    setSaved(false);
    const t = setTimeout(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(r));
        setSaved(true);
      } catch {}
    }, 600);
    return () => clearTimeout(t);
  }, [r, ready]);

  const T = TEMPLATES[r.template] || TEMPLATES.modern;

  const up = useCallback(<K extends keyof Resume>(k: K, v: Resume[K]) => {
    startTransition(() => setR(p => ({ ...p, [k]: v })));
  }, []);

  const exp = useCallback((i: number, k: string, v: string) => {
    startTransition(() => {
      setR(p => ({
        ...p,
        experience: p.experience.map((e, j) => j === i ? { ...e, [k]: v } : e)
      }));
    });
  }, []);

  const updateEdu = (i: number, k: keyof Edu, v: string) => {
    startTransition(() => {
      setR(p => ({
        ...p,
        educationList: p.educationList.map((ed, idx) => idx === i ? { ...ed, [k]: v } : ed)
      }));
    });
  };

  const updateCert = (i: number, k: keyof Cert, v: string) => {
    startTransition(() => {
      setR(p => ({
        ...p,
        certifications: p.certifications.map((c, idx) => idx === i ? { ...c, [k]: v } : c)
      }));
    });
  };

  const updateProject = (i: number, k: keyof Project, v: string) => {
    startTransition(() => {
      setR(p => ({
        ...p,
        projects: (p.projects || []).map((pr, idx) => idx === i ? { ...pr, [k]: v } : pr)
      }));
    });
  };

  const updateLang = (i: number, k: keyof Language, v: string) => {
    startTransition(() => {
      setR(p => ({
        ...p,
        languages: p.languages.map((l, idx) => idx === i ? { ...l, [k]: v } : l)
      }));
    });
  };

  const exportJson = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(r)], { type: "application/json" }));
    a.download = "resume.json";
    a.click();
  };

  const importJson = async (f?: File) => {
    if (!f || f.size > 1e6) return;
    try {
      const textData = await f.text();
      setR({ ...emptyResume, ...JSON.parse(textData) });
    } catch {
      alert("Invalid resume JSON file.");
    }
  };

  const [showPrintChoice, setShowPrintChoice] = useState(false);

  const handlePrint = () => {
    // Print first; then ask whether to keep or clear the data.
    // Data stays in localStorage until the user chooses. No server or database is used.
    window.print();
    setShowPrintChoice(true);
  };

  const handlePrintClear = () => {
    setR(emptyResume);
    try { localStorage.removeItem(KEY); } catch {}
    setShowPrintChoice(false);
  };

  const handleClear = () => {
    if (!window.confirm("Clear your resume? This cannot be undone.")) return;
    setR(emptyResume);
    try { localStorage.removeItem(KEY); } catch {}
  };

  const country = selectedCountry || "";
  const isEurope = ["GERMANY-AUSTRIA", "DE", "EUROPE", "EU", "IT", "ES"].includes(country);
  const isGCC = ["UAE", "SAUDI-ARABIA", "QATAR", "KSA", "QA", "SA"].includes(country);
  const isLocked = !!selectedCountry && !!COUNTRY_TEMPLATE_MAP[selectedCountry];

  return (
    <div className="grid gap-8 lg:grid-cols-12 pb-12 items-start overflow-x-clip">
      {/* Print: exact A4 page, full template colors, no card radius/shadow — PDF matches the preview. */}
      <style>{`@page { size: A4; margin: 0; } @media print { #resume { border-radius: 0 !important; box-shadow: none !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; } #resume .cv-section { break-inside: avoid; page-break-inside: avoid; } }`}</style>
      <section className="min-w-0 space-y-6 print:hidden lg:col-span-6 bg-gradient-to-b from-white via-slate-50/50 to-indigo-50/20 p-4 sm:p-6 lg:p-8 rounded-3xl border border-indigo-100 shadow-2xl shadow-indigo-500/5 relative" aria-label="Resume editor">

        <div className="flex items-center justify-between gap-3 pb-5 border-b border-indigo-100/80">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-700 text-xs font-bold tracking-wide uppercase mb-1">
              Step {step} of 5 {selectedCountry && `• ${COUNTRY_NAMES[selectedCountry] || selectedCountry}`}
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight break-words">
              {step === 1 && (selectedCountry ? "Country Profile & Personal Info" : "Choose Template & Personal Info")}
              {step === 2 && "Professional Summary & Skills"}
              {step === 3 && "Work History & Education"}
              {step === 4 && "Projects"}
              {step === 5 && "Certifications & Languages"}
            </h2>
          </div>
          <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm shrink-0 ${saved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
            {saved ? " Saved" : "Saving..."}
          </span>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            {!selectedCountry && (
              <div className="space-y-3 bg-white/80 p-4 rounded-2xl border border-indigo-50 shadow-sm">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-900 block">Select Style & Template</label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(TEMPLATES) as TemplateId[]).map(t => (
  <button
    key={t}
    onClick={() => up("template", t)}
    aria-pressed={r.template === t}
    title={TEMPLATE_INFO[t].bestFor}
    className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
      r.template === t
        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 scale-105"
        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
    }`}
  >
    {TEMPLATE_INFO[t].name}
  </button>
))}
                </div>
              </div>
            )}

            {isLocked && (
              <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-2xl shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-bold">🔒</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Template Locked</p>
                  <p className="text-sm font-bold text-slate-800 capitalize">
                    {r.template} — {COUNTRY_NAMES[selectedCountry!] || selectedCountry} Standard
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3 bg-white/80 p-4 rounded-2xl border border-indigo-50 shadow-sm">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">Accent Color Theme:</span>
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
                  <input type="color" value={r.accent} onChange={e => up("accent", e.target.value)} className="h-7 w-9 cursor-pointer rounded-lg border-0 bg-transparent p-0" />
                  <span className="text-xs font-mono font-semibold text-slate-700">{r.accent}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-white/80 p-4 rounded-2xl border border-indigo-50 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900">Personal Information</h3>
              {text.map(([k, l]) => (
                <label key={k} className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  {l}
                  <input className={`${inputStyle} mt-1.5`} value={r[k]} onChange={e => up(k, e.target.value)} />
                </label>
              ))}

              {isEurope && (
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 pt-2">
                  Date of Birth (Required for Europass/Germany)
                  <input className={`${inputStyle} mt-1.5`} value={r.dateOfBirth || ""} onChange={e => up("dateOfBirth", e.target.value)} placeholder="DD.MM.YYYY" />
                </label>
              )}

              {(isEurope || isGCC) && (
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 pt-2">
                  Nationality
                  <input className={`${inputStyle} mt-1.5`} value={r.nationality || ""} onChange={e => up("nationality", e.target.value)} placeholder="e.g. Pakistani" />
                </label>
              )}

              {isGCC && (
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 pt-2">
                  Visa / Work Status (Gulf Standard)
                  <input className={`${inputStyle} mt-1.5`} value={r.visaStatus || ""} onChange={e => up("visaStatus", e.target.value)} placeholder="e.g. Transferable Visa / Visit Visa" />
                </label>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 bg-white/80 p-5 rounded-2xl border border-indigo-50 shadow-sm">
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-900">
              Professional Summary
              <textarea rows={4} className={`${inputStyle} mt-1.5`} value={r.summary} onChange={e => up("summary", e.target.value)} placeholder="Write a brief professional overview..." />
            </label>

            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-900 pt-2">
              Skills (comma separated)
              <textarea rows={3} className={`${inputStyle} mt-1.5`} value={r.skills} onChange={e => up("skills", e.target.value)} placeholder="React, Node.js, Python, TypeScript..." />
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-4 bg-white/80 p-5 rounded-2xl border border-indigo-50 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-600"></span> Work Experience
              </h3>
              {r.experience.map((e, i) => (
                <fieldset key={i} className="space-y-3 rounded-2xl border border-indigo-100 bg-indigo-50/20 p-4 shadow-sm">
                  <legend className="px-2 text-xs font-bold uppercase tracking-wider text-indigo-800">Experience {i + 1}</legend>
                  {(["title", "company", "dates"] as const).map(k => (
                    <input key={k} aria-label={k} placeholder={k} className={inputStyle} value={e[k]} onChange={x => exp(i, k, x.target.value)} />
                  ))}
                  <textarea rows={3} placeholder="Achievements, one per line" className={inputStyle} value={e.bullets} onChange={x => exp(i, "bullets", x.target.value)} />
                  <button className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors" onClick={() => up("experience", r.experience.filter((_, j) => j !== i))}>Remove Experience</button>
                </fieldset>
              ))}
              <button className="w-full rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-indigo-700 hover:bg-indigo-100/60 transition-all shadow-sm" onClick={() => up("experience", [...r.experience, { title: "", company: "", dates: "", bullets: "" }])}>
                + Add Experience
              </button>
            </div>

            <div className="space-y-4 bg-white/80 p-5 rounded-2xl border border-indigo-50 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-600"></span> Education History
              </h3>
              {r.educationList.map((ed, i) => (
                <fieldset key={i} className="space-y-3 rounded-2xl border border-indigo-100 bg-indigo-50/20 p-4 shadow-sm">
                  <legend className="px-2 text-xs font-bold uppercase tracking-wider text-indigo-800">Education {i + 1}</legend>
                  <input placeholder="Degree (e.g. BS-IT)" className={inputStyle} value={ed.degree} onChange={e => updateEdu(i, "degree", e.target.value)} />
                  <input placeholder="Institution / Board" className={inputStyle} value={ed.institution} onChange={e => updateEdu(i, "institution", e.target.value)} />
                  <input placeholder="Dates (e.g. 2022 - 2026)" className={inputStyle} value={ed.dates} onChange={e => updateEdu(i, "dates", e.target.value)} />
                  <input placeholder="Details (e.g. CGPA: 2.80)" className={inputStyle} value={ed.details || ""} onChange={e => updateEdu(i, "details", e.target.value)} />
                  <button className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors" onClick={() => up("educationList", r.educationList.filter((_, idx) => idx !== i))}>Remove Education</button>
                </fieldset>
              ))}
              <button className="w-full rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-indigo-700 hover:bg-indigo-100/60 transition-all shadow-sm" onClick={() => up("educationList", [...r.educationList, { degree: "", institution: "", dates: "", details: "" }])}>
                + Add Education
              </button>
            </div>

            
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
<div className="space-y-4 bg-white/80 p-5 rounded-2xl border border-indigo-50 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-600"></span> Projects
              </h3>
              {(r.projects || []).map((pr, i) => (
                <fieldset key={i} className="space-y-3 rounded-2xl border border-indigo-100 bg-indigo-50/20 p-4 shadow-sm">
                  <legend className="px-2 text-xs font-bold uppercase tracking-wider text-indigo-800">Project {i + 1}</legend>
                  <input placeholder="Project Name (e.g. Online Store Website)" className={inputStyle} value={pr.name} onChange={e => updateProject(i, "name", e.target.value)} />
                  <textarea placeholder="What you built and the result — one achievement per line" className={inputStyle} rows={3} value={pr.description} onChange={e => updateProject(i, "description", e.target.value)} />
                  <input placeholder="Link (optional — e.g. github.com/you/project)" className={inputStyle} value={pr.link || ""} onChange={e => updateProject(i, "link", e.target.value)} />
                  <button className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors" onClick={() => up("projects", (r.projects || []).filter((_, idx) => idx !== i))}>Remove Project</button>
                </fieldset>
              ))}
              <button className="w-full rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-indigo-700 hover:bg-indigo-100/60 transition-all shadow-sm" onClick={() => up("projects", [...(r.projects || []), { name: "", description: "", link: "" }])}>
                + Add Project
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <div className="space-y-4 bg-white/80 p-5 rounded-2xl border border-indigo-50 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-600"></span> Certifications
              </h3>
              {r.certifications.map((c, i) => (
                <fieldset key={i} className="space-y-3 rounded-2xl border border-indigo-100 bg-indigo-50/20 p-4 shadow-sm">
                  <legend className="px-2 text-xs font-bold uppercase tracking-wider text-indigo-800">Certification {i + 1}</legend>
                  <input placeholder="Certification Name" className={inputStyle} value={c.name} onChange={e => updateCert(i, "name", e.target.value)} />
                  <input placeholder="Issuer (e.g. Microsoft)" className={inputStyle} value={c.issuer} onChange={e => updateCert(i, "issuer", e.target.value)} />
                  <input placeholder="Year (e.g. 2026)" className={inputStyle} value={c.date} onChange={e => updateCert(i, "date", e.target.value)} />
                  <button className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors" onClick={() => up("certifications", r.certifications.filter((_, idx) => idx !== i))}>Remove</button>
                </fieldset>
              ))}
              <button className="w-full rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-indigo-700 hover:bg-indigo-100/60 transition-all shadow-sm" onClick={() => up("certifications", [...r.certifications, { name: "", issuer: "", date: "" }])}>
                + Add Certification
              </button>
            </div>

            <div className="space-y-4 bg-white/80 p-5 rounded-2xl border border-indigo-50 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-600"></span> Languages
              </h3>
              {r.languages.map((l, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 sm:items-center bg-indigo-50/20 p-3 rounded-2xl border border-indigo-100">
                  <input placeholder="Language" className={inputStyle} value={l.name} onChange={e => updateLang(i, "name", e.target.value)} />
                  <input placeholder="Proficiency" className={inputStyle} value={l.proficiency} onChange={e => updateLang(i, "proficiency", e.target.value)} />
                  <button className="text-xs text-rose-600 font-extrabold px-3 py-2 hover:bg-rose-50 rounded-xl transition-colors self-end sm:self-auto" onClick={() => up("languages", r.languages.filter((_, idx) => idx !== i))}>✕</button>
                </div>
              ))}
              <button className="w-full rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-indigo-700 hover:bg-indigo-100/60 transition-all shadow-sm" onClick={() => up("languages", [...r.languages, { name: "", proficiency: "" }])}>
                + Add Language
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 flex-wrap pt-6 border-t border-indigo-100/80">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="rounded-xl border-2 border-indigo-200 bg-white px-6 py-3 text-sm font-bold text-indigo-900 hover:bg-indigo-50 transition-all shadow-sm active:scale-95">
              ← Previous
            </button>
          ) : <div />}

          {step < 5 ? (
            <button onClick={() => setStep(step + 1)} className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition-all active:scale-95">
              Continue →
            </button>
          ) : (
            <button onClick={handlePrint} className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-95">
              Download PDF
            </button>
          )}
        </div>

        {showPrintChoice && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm" role="status">
            <p className="text-sm font-bold text-slate-900">Download complete — Clear your data or keep it saved?</p>
            <p className="mt-1 text-xs text-slate-600">Your CV is still saved in this browser. Choose what happens next.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={handlePrintClear} className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-500">
                Clear data
              </button>
              <button onClick={() => setShowPrintChoice(false)} className="rounded-xl border border-emerald-300 bg-white px-4 py-2 text-xs font-bold text-emerald-700 shadow-sm hover:bg-emerald-100">
                Keep saved
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-between items-center text-xs font-semibold text-slate-500 pt-3 border-t border-slate-100">
          <button onClick={exportJson} className="hover:text-indigo-600 transition-colors">Export JSON</button>
          <button onClick={handleClear} className="hover:text-rose-600 transition-colors">Clear Resume</button>
          <label className="cursor-pointer hover:text-indigo-600 transition-colors">
            Import JSON
            <input type="file" accept="application/json" className="sr-only" onChange={e => importJson(e.target.files?.[0])} />
          </label>
        </div>

      </section>

     <section aria-label="Live preview" className="lg:col-span-6 min-w-0">
  <div
    id="resume"
    className="mx-auto w-full max-w-[794px] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10 lg:sticky lg:top-24"
  >
    <T r={r} />
  </div>
</section>
    </div>
  );
}
