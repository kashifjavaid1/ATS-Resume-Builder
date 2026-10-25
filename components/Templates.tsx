import { Resume, Edu, Cert, Language, Project } from "@/types/resume";

const bullets = (s: string) => s.split("\n").filter(Boolean);

const Exp = ({ r }: { r: Resume }) => (
  <div className="space-y-4">
    {r.experience.map((e, i) => (
      <div key={i} className="group">
        <div className="flex justify-between items-baseline gap-2">
          <h3 className="text-sm font-bold text-slate-900 min-w-0 break-words">{e.title}, <span className="font-semibold text-indigo-600" style={{ color: r.accent }}>{e.company}</span></h3>
          <span className="text-xs font-medium text-slate-500 shrink-0">{e.dates}</span>
        </div>
        <ul className="list-disc ml-4 text-[13px] text-slate-700 space-y-1 mt-1">
          {bullets(e.bullets).map((b, j) => <li key={j} className="break-words">{b}</li>)}
        </ul>
      </div>
    ))}
  </div>
);

const EducationList = ({ educationList }: { educationList: Edu[] }) => {
  if (!educationList || educationList.length === 0) return null;
  return (
    <div className="space-y-3">
      {educationList.map((ed, i) => (
        <div key={i} className="flex justify-between items-baseline gap-2 min-w-0">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 break-words">{ed.degree}</h3>
            <p className="text-xs text-slate-600 break-words">{ed.institution} {ed.details && `• ${ed.details}`}</p>
          </div>
          <span className="text-xs font-medium text-slate-500 shrink-0">{ed.dates}</span>
        </div>
      ))}
    </div>
  );
};

const CertificationsList = ({ certifications }: { certifications: Cert[] }) => {
  if (!certifications || certifications.length === 0) return null;
  return (
    <div className="space-y-2">
      {certifications.map((c, i) => (
        <div key={i} className="flex justify-between items-baseline gap-2 text-[13px] min-w-0">
          <span className="font-bold text-slate-900 break-words min-w-0">{c.name} <span className="font-normal text-slate-600">— {c.issuer}</span></span>
          <span className="text-xs font-medium text-slate-500 shrink-0">{c.date}</span>
        </div>
      ))}
    </div>
  );
};

const ProjectsList = ({ projects }: { projects?: Project[] }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <div className="space-y-3">
      {projects.map((p, i) => (
        <div key={i} className="min-w-0">
          <h3 className="text-sm font-bold text-slate-900 break-words">{p.name}</h3>
          {p.link && <p className="text-xs text-slate-500 break-all">{p.link}</p>}
          <ul className="list-disc ml-4 text-[13px] text-slate-700 space-y-1 mt-1">
            {bullets(p.description).map((b, j) => <li key={j} className="break-words">{b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

const LanguagesList = ({ languages }: { languages: Language[] }) => {
  if (!languages || languages.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-1.5">
      {languages.map((l, i) => (
        <span key={i} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 break-words">
          {l.name} ({l.proficiency})
        </span>
      ))}
    </div>
  );
};

const contact = (r: Resume) => [r.email, r.phone, r.location].filter(Boolean).join(" | ");

const SkillsList = ({ skills }: { skills: string }) => {
  if (!skills) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-1.5">
      {skills.split(",").map((s, idx) => (
        <span key={idx} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 break-words">
          {s.trim()}
        </span>
      ))}
    </div>
  );
};

export function Modern({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider border-b border-slate-100 pb-1" style={{ color: r.accent }}>{c}</h2>;
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 text-white" style={{ background: r.accent }}>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
        <p className="text-base font-medium opacity-95 mt-0.5 break-words">{r.title}</p>
        <p className="text-xs mt-2 opacity-90 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>} {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Classic({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => <h2 className="mt-5 mb-2 border-b border-slate-300 text-xs font-bold uppercase tracking-widest text-slate-800 pb-1">{c}</h2>;
  return (
    <div className="bg-white text-slate-900 p-5 sm:p-8 text-sm min-h-[1000px]" style={{ fontFamily: "Georgia, serif" }}>
      <div className="text-center border-b border-slate-200 pb-4 mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide break-words">{r.name}</h1>
        <p className="italic text-slate-600 mt-0.5 break-words">{r.title}</p>
        <p className="text-xs text-slate-500 mt-1 break-words">{contact(r)}</p>
      </div>
      {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-700 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
      {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
      {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>} {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
      {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
      {r.skills && <div className="cv-section"><H c="Skills" /><p className="text-slate-700 text-[13px] break-words">{r.skills}</p></div>}
      {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
    </div>
  );
}

export function Tech({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => <h2 className="mt-5 mb-2 pl-2 border-l-4 font-mono text-xs font-bold uppercase tracking-wider text-slate-800" style={{ borderColor: r.accent }}>{c}</h2>;
  return (
    <div className="bg-white text-slate-800 p-5 sm:p-8 text-sm min-h-[1000px]">
      <h1 className="font-mono text-xl sm:text-2xl font-bold break-words">{r.name}</h1>
      <p style={{ color: r.accent }} className="font-mono font-medium break-words">{r.title}</p>
      <p className="text-xs text-slate-500 mt-1 font-mono break-words">{contact(r)}</p>
      {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 font-mono text-xs leading-relaxed break-words">{r.summary}</p></div>}
      {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
      {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
      {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>} {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
      {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
      {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
    </div>
  );
}

export function Executive({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => <h2 className="mt-5 mb-2 border-b-2 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-900" style={{ borderColor: r.accent }}>{c}</h2>;
  return (
    <div className="bg-white text-slate-900 text-sm min-h-[1000px]" style={{ fontFamily: "Georgia, serif" }}>
      <header className="bg-slate-900 px-5 sm:px-8 py-5 sm:py-7 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight break-words">{r.name}</h1>
        <p className="mt-1 text-xs font-semibold tracking-widest uppercase break-words" style={{ color: r.accent }}>{r.title}</p>
        <p className="mt-2 text-xs text-slate-300 font-sans break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 font-sans space-y-4">
        {r.summary && <div className="cv-section"><H c="Executive Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>} {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Minimal({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => <h2 className="mt-6 mb-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">{c}</h2>;
  return (
    <div className="bg-white text-slate-700 p-5 sm:p-10 text-sm font-light min-h-[1000px]">
      <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight text-slate-900 break-words">{r.name}</h1>
      <p className="mt-1 text-sm font-medium text-slate-500 break-words">{r.title}</p>
      <p className="mt-1 text-xs text-slate-400 break-words">{contact(r)}</p>
      {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
      {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
      {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>} {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
      {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
      {r.skills && <div className="cv-section"><H c="Skills" /><p className="text-slate-600 text-[13px] break-words">{r.skills}</p></div>}
      {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
    </div>
  );
}

export function Creative({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => <h2 className="mt-5 mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-bold uppercase text-white shadow-sm" style={{ background: r.accent }}>{c}</h2>;
  return (
    <div className="bg-white text-slate-800 p-5 sm:p-8 text-sm min-h-[1000px]">
      <div className="border-l-8 pl-4 py-1" style={{ borderColor: r.accent }}>
        <h1 className="text-3xl sm:text-4xl font-black leading-none tracking-tight break-words" style={{ color: r.accent }}>{r.name}</h1>
        <p className="mt-1 text-base font-semibold text-slate-700 break-words">{r.title}</p>
        <p className="mt-1 text-xs text-slate-500 break-words">{contact(r)}</p>
      </div>
      {r.summary && <div className="cv-section"><H c="About" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
      {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
      {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>} {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
      {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
      {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
      {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
    </div>
  );
}

export function Graduate({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => <h2 className="mt-5 mb-2 bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded" style={{ color: r.accent }}>{c}</h2>;
  return (
    <div className="bg-white text-slate-800 p-5 sm:p-8 text-sm min-h-[1000px]">
      <h1 className="text-2xl sm:text-3xl font-extrabold break-words" style={{ color: r.accent }}>{r.name}</h1>
      <p className="font-semibold text-slate-700 break-words">{r.title}</p>
      <p className="text-xs text-slate-500 mt-0.5 break-words">{contact(r)}</p>
      {r.summary && <div className="cv-section"><H c="Objective" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
      {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>} {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
      {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
      {r.experience?.length > 0 && <div className="cv-section"><H c="Experience & Internships" /><Exp r={r} /></div>}
      {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
      {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
    </div>
  );
}

export function Sidebar({ r }: { r: Resume }) {
  const bullets = (s: string) => s.split("\n").filter(Boolean);

  const contactItems = [
    { label: "Address", value: r.location },
    { label: "Phone", value: r.phone },
    { label: "Email", value: r.email },
  ].filter(item => item.value);

  const skillsList = r.skills
    ? r.skills.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  const SideH = ({ c }: { c: string }) => (
    <h2 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-300 border-b border-slate-700 pb-1 mb-2 sm:mb-3">
      {c}
    </h2>
  );

  const MainH = ({ c }: { c: string }) => (
    <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 mb-2 sm:mb-3 border-b-2 border-slate-900">
      {c}
    </h2>
  );

  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] flex">
      {/* ---------- LEFT SIDEBAR (always left, even on mobile) ---------- */}
      <aside className="cv-section w-[38%] sm:w-[36%] md:w-[34%] bg-slate-900 text-white px-3 sm:px-4 md:px-6 py-5 sm:py-6 md:py-10 flex flex-col shrink-0">
        {/* Contact */}
        {contactItems.length > 0 && (
          <div className="mb-5 sm:mb-6 md:mb-8">
            <SideH c="Contact" />
            <div className="space-y-2 md:space-y-3 text-[11px] sm:text-xs">
              {contactItems.map((item, i) => (
                <div key={i}>
                  <p className="font-bold text-white">{item.label}</p>
                  <p className="text-slate-300 break-words leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skillsList.length > 0 && (
          <div className="mb-5 sm:mb-6 md:mb-8">
            <SideH c="Skills" />
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-slate-200">
              {skillsList.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5 sm:gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                  <span className="break-words leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {r.languages?.length > 0 && (
          <div className="mb-5 sm:mb-6 md:mb-8">
            <SideH c="Languages" />
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-slate-200">
              {r.languages.map((l, i) => (
                <li key={i} className="flex items-start gap-1.5 sm:gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                  <span className="break-words leading-snug">
                    <span className="font-medium">{l.name}</span>
                    {l.proficiency && <span className="text-slate-400"> ({l.proficiency})</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="w-[62%] sm:w-[64%] md:w-[66%] px-4 sm:px-5 md:px-8 py-5 sm:py-6 md:py-10 min-w-0">
        {/* Header */}
        <header className="mb-5 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight text-slate-900 uppercase leading-tight break-words">
            {r.name || "Your Name"}
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-medium text-slate-600 mt-1 sm:mt-2 break-words">
            {r.title || "Professional Title"}
          </p>
        </header>

        {/* Profile */}
        {r.summary && (
          <section className="cv-section mb-5 sm:mb-6 md:mb-7">
            <MainH c="Profile" />
            <p className="text-slate-600 leading-relaxed text-[12px] sm:text-[13px] break-words">
              {r.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {r.experience?.length > 0 && (
          <section className="cv-section mb-5 sm:mb-6 md:mb-7">
            <MainH c="Work Experience" />
            <div className="space-y-3.5 sm:space-y-4 md:space-y-5">
              {r.experience.map((e, i) => (
                <div key={i}>
                  <div className="flex flex-wrap justify-between items-baseline gap-x-2 gap-y-0.5">
                    <h3 className="text-[12px] sm:text-sm font-bold text-slate-900 break-words">
                      {e.title}
                    </h3>
                    <span className="text-[10px] sm:text-xs font-medium text-slate-500 shrink-0">
                      {e.dates}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-0.5 break-words">
                    {e.company}
                  </p>
                  {bullets(e.bullets).length > 0 && (
                    <ul className="mt-1.5 space-y-1 text-[12px] sm:text-[13px] text-slate-600">
                      {bullets(e.bullets).map((b, j) => (
                        <li key={j} className="flex gap-1.5 sm:gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                          <span className="break-words leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {r.projects && r.projects.length > 0 && (
          <section className="cv-section mb-5 sm:mb-6 md:mb-7">
            <MainH c="Projects" />
            <div className="space-y-3.5 sm:space-y-4 md:space-y-5">
              {(r.projects || []).map((p, i) => (
                <div key={i}>
                  <h3 className="text-[12px] sm:text-sm font-bold text-slate-900 break-words">
                    {p.name}
                  </h3>
                  {p.link && (
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 break-all">{p.link}</p>
                  )}
                  <ul className="mt-1.5 space-y-1 text-[12px] sm:text-[13px] text-slate-600">
                    {bullets(p.description).map((b, j) => (
                      <li key={j} className="flex gap-1.5 sm:gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                        <span className="break-words leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {r.educationList?.length > 0 && (
          <section className="cv-section mb-5 sm:mb-6 md:mb-7">
            <MainH c="Education" />
            <div className="space-y-3 md:space-y-4">
              {r.educationList.map((ed, i) => (
                <div key={i} className="flex flex-wrap justify-between items-baseline gap-x-2 gap-y-0.5">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[12px] sm:text-sm font-bold text-slate-900 break-words">
                      {ed.degree}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 break-words leading-snug">
                      {ed.institution}
                      {ed.details && ` • ${ed.details}`}
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-slate-500 shrink-0">
                    {ed.dates}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {r.certifications?.length > 0 && (
          <section className="cv-section mb-5 sm:mb-6 md:mb-7">
            <MainH c="Certifications" />
            <div className="space-y-2">
              {r.certifications.map((c, i) => (
                <div
                  key={i}
                  className="flex flex-wrap justify-between items-baseline gap-x-2 gap-y-0.5 text-[12px] sm:text-[13px]"
                >
                  <span className="font-bold text-slate-900 break-words flex-1 min-w-0">
                    {c.name}
                    {c.issuer && (
                      <span className="font-normal text-slate-600"> — {c.issuer}</span>
                    )}
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium text-slate-500 shrink-0">
                    {c.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export function Bold({ r }: { r: Resume }) {
  const skills = r.skills.split(",").map((s) => s.trim()).filter(Boolean);
  const nameParts = (r.name || "Your Name").split(" ");
  const firstLine = nameParts[0];
  const restLine = nameParts.slice(1).join(" ") || "";

  const initials = (r.name || "YN")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const DarkBar = ({ c }: { c: string }) => (
    <h2
      className="text-[11px] sm:text-[13px] font-black uppercase tracking-wider text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-sm mb-3 sm:mb-4"
      style={{ backgroundColor: r.accent }}
    >
      {c}
    </h2>
  );

  const SidebarHeading = ({ c }: { c: string }) => (
    <h3 className="text-[11px] sm:text-[13px] font-black uppercase tracking-wider text-center text-white py-1.5 sm:py-2 rounded-sm mb-3 sm:mb-4"
        style={{ backgroundColor: "rgba(255,255,255,0.08)", borderBottom: `2px solid ${r.accent}` }}>
      {c}
    </h3>
  );

  return (
    <div className="flex bg-white text-slate-900 text-sm min-h-[800px]">

      <aside
        className="w-[38%] sm:w-[36%] md:w-[34%] text-white px-3 sm:px-4 md:px-6 py-5 sm:py-6 md:py-8 flex flex-col gap-4 sm:gap-5 md:gap-6 shrink-0"
        style={{ backgroundColor: "#1e293b" }}
      >


        {r.summary && (
          <section className="cv-section">
            <SidebarHeading c="About Me" />
            <p className="text-[10px] sm:text-[11px] leading-relaxed text-white/85 break-words">{r.summary}</p>
          </section>
        )}

        <section className="cv-section">
          <SidebarHeading c="Contact" />
          <ul className="space-y-2 sm:space-y-3 text-[10px] sm:text-[11px]">
            {r.phone && (
              <li className="flex items-start gap-2 sm:gap-2.5">
                <span
                  className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: r.accent }}
                >
                  <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                <span className="text-white/90 mt-0.5 sm:mt-1 break-words">{r.phone}</span>
              </li>
            )}
            {r.email && (
              <li className="flex items-start gap-2 sm:gap-2.5">
                <span
                  className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: r.accent }}
                >
                  <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <span className="text-white/90 mt-0.5 sm:mt-1 break-all">{r.email}</span>
              </li>
            )}
            {r.location && (
              <li className="flex items-start gap-2 sm:gap-2.5">
                <span
                  className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: r.accent }}
                >
                  <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-white/90 mt-0.5 sm:mt-1 break-words">{r.location}</span>
              </li>
            )}
          </ul>
        </section>

        {r.languages?.length > 0 && (
          <section className="cv-section">
            <SidebarHeading c="Language" />
            <ul className="space-y-1.5 text-[10px] sm:text-[11px] text-white/90">
              {r.languages.map((l, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/80 flex-shrink-0" />
                  <span className="break-words">{l.name}{l.proficiency ? ` (${l.proficiency})` : ""}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {skills.length > 0 && (
          <section className="cv-section">
            <SidebarHeading c="Expertise" />
            <ul className="space-y-1.5 text-[10px] sm:text-[11px] text-white/90">
              {skills.map((s, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/80 flex-shrink-0" />
                  <span className="break-words">{s}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      <div className="flex-1 min-w-0 px-4 sm:px-5 md:px-8 py-5 sm:py-6 md:py-10">
        <header className="mb-5 sm:mb-6 md:mb-8">
          <h1
            className="text-[32px] sm:text-[40px] md:text-[52px] font-black uppercase tracking-tight leading-[0.9] break-words"
            style={{ color: r.accent }}
          >
            {firstLine}
            {restLine && <><br />{restLine}</>}
          </h1>
          {r.title && (
            <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg font-medium text-slate-700 tracking-wide break-words">{r.title}</p>
          )}
        </header>

        {r.experience?.length > 0 && (
          <section className="cv-section mb-5 sm:mb-6 md:mb-7">
            <DarkBar c="Experience" />
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {r.experience.map((e, i) => (
                <div key={i}>
                  <h3 className="text-[12px] sm:text-[13px] md:text-[14px] font-black text-slate-900 break-words">{e.title}</h3>
                  <p className="text-[10.5px] sm:text-[11px] md:text-[11.5px] text-slate-600 mt-0.5 break-words">
                    {e.company}{e.dates ? ` — ${e.dates}` : ""}
                  </p>
                  {e.bullets && (
                    <p className="mt-1.5 text-[11px] sm:text-[12px] leading-relaxed text-slate-700 whitespace-pre-line break-words">
                      {e.bullets}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {r.projects && r.projects.length > 0 && (
          <section className="cv-section mb-5 sm:mb-6 md:mb-7">
            <DarkBar c="Projects" />
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {(r.projects || []).map((p, i) => (
                <div key={i}>
                  <h3 className="text-[12px] sm:text-[13px] md:text-[14px] font-black text-slate-900 break-words">{p.name}</h3>
                  {p.link && (
                    <p className="text-[10.5px] sm:text-[11px] md:text-[11.5px] text-slate-600 mt-0.5 break-all">
                      {p.link}
                    </p>
                  )}
                  {p.description && (
                    <p className="mt-1.5 text-[11px] sm:text-[12px] leading-relaxed text-slate-700 whitespace-pre-line break-words">
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {r.educationList?.length > 0 && (
          <section className="cv-section mb-5 sm:mb-6 md:mb-7">
            <DarkBar c="Education" />
            <div className="space-y-2 sm:space-y-3">
              {r.educationList.map((ed, i) => (
                <div key={i}>
                  <h3 className="text-[12px] sm:text-[13px] font-black text-slate-900 break-words">
                    {ed.institution || ed.degree}
                  </h3>
                  <p className="text-[10.5px] sm:text-[11px] md:text-[11.5px] text-slate-600 mt-0.5 break-words">
                    {ed.degree}{ed.dates ? ` — ${ed.dates}` : ""}
                  </p>
                  {ed.details && (
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 break-words">{ed.details}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {r.certifications?.length > 0 && (
          <section className="cv-section mb-5 sm:mb-6 md:mb-7">
            <DarkBar c="Certifications" />
            <div className="space-y-2">
              {r.certifications.map((c, i) => (
                <div key={i} className="flex justify-between items-baseline gap-2 text-[11px] sm:text-[12px]">
                  <span className="font-bold text-slate-900 break-words min-w-0">
                    {c.name} <span className="font-normal text-slate-600">— {c.issuer}</span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 shrink-0">{c.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="cv-section">
            <DarkBar c="Skills Summary" />
            <div className="space-y-2 sm:space-y-3">
              {skills.slice(0, 6).map((skill, i) => {
                const percent = 90 - i * 6;
                return (
                  <div key={i}>
                    <div className="flex justify-between items-baseline text-[10.5px] sm:text-[11px] md:text-[11.5px] mb-1">
                      <span className="font-medium text-slate-800 break-words min-w-0">{skill}</span>
                      <span className="font-bold text-slate-700 shrink-0">{percent} %</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${percent}%`, backgroundColor: r.accent }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export function Slate({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider border-l-4 pl-2 text-slate-900" style={{ borderColor: r.accent }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 text-white" style={{ backgroundColor: "#0f172a" }}>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words" style={{ color: "#fbbf24" }}>{r.title}</p>
        <p className="text-xs mt-2 opacity-80 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Midnight({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-[11px] font-black uppercase tracking-wider text-white px-3 py-1.5 rounded-sm" style={{ backgroundColor: r.accent }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 text-white" style={{ backgroundColor: "#000000" }}>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words" style={{ color: r.accent }}>{r.title}</p>
        <p className="text-xs mt-2 opacity-80 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Ivy({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-widest pb-1 border-b-4 border-double" style={{ color: "#1e3a5f", borderColor: r.accent }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-900 p-5 sm:p-8 text-sm min-h-[1000px]" style={{ fontFamily: "Georgia, serif" }}>
      <div className="text-center border-b border-slate-200 pb-4 mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide break-words">{r.name}</h1>
        <p className="italic mt-0.5 break-words" style={{ color: "#1e3a5f" }}>{r.title}</p>
        <p className="text-xs text-slate-500 mt-1 break-words">{contact(r)}</p>
      </div>
      {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-700 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
      {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
      {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
      {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
      {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
      {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
      {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
    </div>
  );
}

export function Compact({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-4 mb-1.5 text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ color: r.accent }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <div className="px-5 sm:px-8 pt-5 sm:pt-6 pb-4 border-b-2 border-slate-900 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
          <p className="text-base font-medium mt-0.5 break-words" style={{ color: r.accent }}>{r.title}</p>
        </div>
        <p className="text-xs text-slate-500 font-medium break-words sm:text-right shrink-0">{contact(r)}</p>
      </div>
      <div className="px-5 sm:px-8 py-4 sm:py-5 space-y-3">
        {r.skills && <div className="cv-section"><H c="Core Skills" /><SkillsList skills={r.skills} /></div>}
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Heritage({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider border-b pb-1 text-[#166534]" style={{ borderColor: "#16653466" }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 pt-6 pb-4 border-b-4 border-double" style={{ borderColor: "#166534" }}>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words text-[#166534]">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words text-slate-600">{r.title}</p>
        <p className="text-xs mt-2 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Oxford({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 font-serif text-sm font-bold uppercase tracking-wide text-[#7f1d1d]">{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight break-words text-slate-900">{r.name}</h1>
        <p className="font-serif text-base mt-1 break-words text-[#7f1d1d]">{r.title}</p>
        <p className="text-xs mt-2 text-slate-500 font-medium break-words">{contact(r)}</p>
        <div className="h-0.5 mt-4 bg-[#7f1d1d]" />
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Berlin({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 border-b border-slate-300 pb-1">{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 border-b border-slate-300">
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide break-words text-slate-900">{r.name}</h1>
        <p className="text-xs uppercase tracking-[0.2em] mt-1 break-words text-slate-500">{r.title}</p>
        <p className="text-xs mt-2 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Maple({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider border-b-2 pb-1 text-[#c8102e]" style={{ borderColor: "#c8102e55" }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm border-t-8" style={{ borderColor: "#c8102e" }}>
      <header className="px-5 sm:px-8 py-5 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words text-slate-900">{r.name}</h1>
        <p className="text-base font-semibold mt-0.5 break-words text-[#c8102e]">{r.title}</p>
        <p className="text-xs mt-2 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Sakura({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#be123c]">{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-7 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight break-words text-slate-900">{r.name}</h1>
        <p className="text-base mt-1 break-words text-slate-500">{r.title}</p>
        <p className="text-xs mt-3 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-5">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Nordic({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-sky-700 border-b border-sky-200 pb-1">{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-6 sm:py-7">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight break-words text-slate-900">{r.name}</h1>
        <p className="text-base mt-1 break-words text-slate-500">{r.title}</p>
        <p className="text-xs mt-3 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-5">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Euro({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-[#14532d] border-b pb-1" style={{ borderColor: "#14532d55" }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words text-slate-900">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words text-[#14532d]">{r.title}</p>
        <p className="text-xs mt-2 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Iberia({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-[#c2410c]">{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 border-b-4 border-[#c2410c]">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words text-slate-900">{r.name}</h1>
        <p className="text-base font-semibold mt-0.5 break-words text-[#c2410c]">{r.title}</p>
        <p className="text-xs mt-2 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Harbour({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-teal-800 border-b pb-1" style={{ borderColor: "#0f766e55" }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 border-b-4 border-teal-700">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words text-slate-900">{r.name}</h1>
        <p className="text-base font-semibold mt-0.5 break-words text-teal-800">{r.title}</p>
        <p className="text-xs mt-2 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Pearl({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 border-b pb-1" style={{ borderColor: "#d4af37aa" }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 text-white bg-zinc-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words text-zinc-300">{r.title}</p>
        <p className="text-xs mt-2 text-zinc-400 font-medium break-words">{contact(r)}</p>
        <div className="h-px mt-4 bg-amber-400/70" />
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Tulip({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-orange-600">{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm border-t-4 border-orange-600">
      <header className="px-5 sm:px-8 py-5 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words text-slate-900">{r.name}</h1>
        <p className="text-base font-semibold mt-0.5 break-words text-orange-600">{r.title}</p>
        <p className="text-xs mt-2 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Gulf({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-amber-900 border-b pb-1" style={{ borderColor: "#b4530999" }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 bg-[#f5efe0]">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words text-[#451a03]">{r.name}</h1>
        <p className="text-base font-semibold mt-0.5 break-words text-[#92400e]">{r.title}</p>
        <p className="text-xs mt-2 text-stone-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Emerald({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-emerald-900 border-b pb-1" style={{ borderColor: "#064e3b33" }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 text-white bg-emerald-900">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words text-emerald-100">{r.title}</p>
        <p className="text-xs mt-2 text-emerald-200/80 font-medium break-words">{contact(r)}</p>
        <div className="h-px mt-4 bg-amber-300/40" />
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Maroon({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-[#8A1538] border-b pb-1" style={{ borderColor: "#8A153855" }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 text-white bg-[#8A1538]">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words text-rose-100">{r.title}</p>
        <p className="text-xs mt-2 text-rose-200/80 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Southern({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-amber-800">{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm border-t-4 border-amber-700/70">
      <header className="px-5 sm:px-8 py-6 sm:py-7">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight break-words text-slate-900">{r.name}</h1>
        <p className="text-base mt-1 break-words text-amber-800">{r.title}</p>
        <p className="text-xs mt-3 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-5">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Fern({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-green-800 border-b-2 pb-1" style={{ borderColor: "#16653488" }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words text-[#052e16]">{r.name}</h1>
        <p className="text-base font-semibold mt-0.5 break-words text-green-800">{r.title}</p>
        <p className="text-xs mt-2 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Duo({ r }: { r: Resume }) {
  const contactItems = [
    { label: "Address", value: r.location },
    { label: "Phone", value: r.phone },
    { label: "Email", value: r.email },
  ].filter(item => item.value);

  const skillsList = r.skills
    ? r.skills.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  const SideH = ({ c }: { c: string }) => (
    <h2 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-stone-900 border-b border-stone-300 pb-1 mb-2 sm:mb-3">
      {c}
    </h2>
  );

  const MainH = ({ c }: { c: string }) => (
    <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 mb-2 sm:mb-3 border-b-2" style={{ borderColor: r.accent }}>
      {c}
    </h2>
  );

  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] flex">
      <aside className="cv-section w-[38%] sm:w-[36%] md:w-[34%] bg-stone-100 text-stone-800 px-3 sm:px-4 md:px-6 py-5 sm:py-6 md:py-10 flex flex-col shrink-0">
        {contactItems.length > 0 && (
          <div className="mb-5 sm:mb-6 md:mb-8">
            <SideH c="Contact" />
            <div className="space-y-2 md:space-y-3 text-[11px] sm:text-xs">
              {contactItems.map((item, i) => (
                <div key={i}>
                  <p className="font-bold text-stone-900">{item.label}</p>
                  <p className="text-stone-600 break-words leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {skillsList.length > 0 && (
          <div className="mb-5 sm:mb-6 md:mb-8">
            <SideH c="Skills" />
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-stone-700">
              {skillsList.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5 sm:gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-stone-400 shrink-0" />
                  <span className="break-words leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {r.languages?.length > 0 && (
          <div className="mb-5 sm:mb-6 md:mb-8">
            <SideH c="Languages" />
            <LanguagesList languages={r.languages} />
          </div>
        )}
      </aside>
      <div className="flex-1 min-w-0 px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-10">
        <header className="mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight break-words text-slate-900">{r.name}</h1>
          <p className="text-sm font-semibold mt-0.5 break-words text-slate-600">{r.title}</p>
        </header>
        {r.summary && <div className="cv-section"><MainH c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><MainH c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><MainH c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><MainH c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><MainH c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
      </div>
    </div>
  );
}

export function India({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1" style={{ borderColor: "#f59e0b99" }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 text-white bg-blue-950">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words text-blue-100">{r.title}</p>
        <p className="text-xs mt-2 text-blue-200/80 font-medium break-words">{contact(r)}</p>
        <div className="h-1 mt-4 bg-amber-500/80" />
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Bengal({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-[#006a4e]">{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 text-white bg-[#006a4e]">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words text-emerald-50">{r.title}</p>
        <p className="text-xs mt-2 text-emerald-100/80 font-medium break-words">{contact(r)}</p>
        <div className="h-px mt-4 bg-amber-300/50" />
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Lanka({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 font-serif text-sm font-bold uppercase tracking-wide text-[#8D153A]">{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-6 sm:py-7 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight break-words text-[#8D153A]">{r.name}</h1>
        <p className="font-serif text-base mt-1 break-words text-slate-600">{r.title}</p>
        <p className="text-xs mt-2 text-slate-500 font-medium break-words">{contact(r)}</p>
        <div className="h-0.5 w-24 mx-auto mt-4 bg-amber-500" />
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function China({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-red-800">{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 text-white bg-red-700">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words text-red-50">{r.title}</p>
        <p className="text-xs mt-2 text-red-100/80 font-medium break-words">{contact(r)}</p>
        <div className="h-px mt-4 bg-amber-300/60" />
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Lotus({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-purple-800 border-b border-purple-300 pb-1">{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-6 sm:py-7">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight break-words text-slate-900">{r.name}</h1>
        <p className="text-base mt-1 break-words text-purple-800">{r.title}</p>
        <p className="text-xs mt-3 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-5">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Bamboo({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider border-l-4 pl-2 text-teal-800" style={{ borderColor: "#0f766e" }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 bg-teal-50">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words text-teal-950">{r.name}</h1>
        <p className="text-base font-semibold mt-0.5 break-words text-teal-800">{r.title}</p>
        <p className="text-xs mt-2 text-teal-900/60 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Spice({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => (
    <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-[#78350f] border-b-2 pb-1" style={{ borderColor: "#78350f66" }}>{c}</h2>
  );
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words text-stone-900">{r.name}</h1>
        <p className="text-base font-semibold mt-0.5 break-words text-[#92400e]">{r.title}</p>
        <p className="text-xs mt-2 text-slate-500 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Twin({ r }: { r: Resume }) {
  const contactItems = [
    { label: "Address", value: r.location },
    { label: "Phone", value: r.phone },
    { label: "Email", value: r.email },
  ].filter(item => item.value);

  const skillsList = r.skills
    ? r.skills.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  const SideH = ({ c }: { c: string }) => (
    <h2 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-900 border-b border-slate-300 pb-1 mb-2 sm:mb-3">
      {c}
    </h2>
  );

  const MainH = ({ c }: { c: string }) => (
    <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 mb-2 sm:mb-3 border-b-2" style={{ borderColor: r.accent }}>
      {c}
    </h2>
  );

  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 text-white bg-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words text-slate-200">{r.title}</p>
        <p className="text-xs mt-2 text-slate-300 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="flex">
        <div className="flex-1 min-w-0 px-4 sm:px-6 md:px-8 py-5 sm:py-6">
          {r.summary && <div className="cv-section"><MainH c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
          {r.experience?.length > 0 && <div className="cv-section"><MainH c="Experience" /><Exp r={r} /></div>}
          {r.projects && r.projects.length > 0 && <div className="cv-section"><MainH c="Projects" /><ProjectsList projects={r.projects} /></div>}
          {r.educationList?.length > 0 && <div className="cv-section"><MainH c="Education" /><EducationList educationList={r.educationList} /></div>}
          {r.certifications?.length > 0 && <div className="cv-section"><MainH c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        </div>
        <aside className="cv-section w-[36%] sm:w-[34%] md:w-[32%] bg-slate-100 text-slate-800 px-3 sm:px-4 md:px-6 py-5 sm:py-6 flex flex-col shrink-0">
          {contactItems.length > 0 && (
            <div className="mb-5 sm:mb-6">
              <SideH c="Contact" />
              <div className="space-y-2 text-[11px] sm:text-xs">
                {contactItems.map((item, i) => (
                  <div key={i}>
                    <p className="font-bold text-slate-900">{item.label}</p>
                    <p className="text-slate-600 break-words leading-snug">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {skillsList.length > 0 && (
            <div className="mb-5 sm:mb-6">
              <SideH c="Skills" />
              <ul className="space-y-1.5 text-[11px] sm:text-xs text-slate-700">
                {skillsList.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5 sm:gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                    <span className="break-words leading-snug">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {r.languages?.length > 0 && (
            <div className="mb-5 sm:mb-6">
              <SideH c="Languages" />
              <LanguagesList languages={r.languages} />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export function Royal({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => <h2 className="mt-5 mb-2 font-serif text-sm font-bold uppercase tracking-widest border-b-2 pb-1" style={{ borderColor: "#c9a227", color: "#172554" }}>{c}</h2>;
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-6 sm:py-7 text-center" style={{ backgroundColor: "#172554" }}>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white break-words">{r.name}</h1>
        <p className="text-base font-medium mt-1 break-words" style={{ color: "#d4af37" }}>{r.title}</p>
        <p className="text-xs mt-2 font-medium break-words text-slate-300">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Aqua({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider pl-2" style={{ borderLeft: "4px solid #0f766e", color: "#0f766e" }}>{c}</h2>;
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 text-white" style={{ backgroundColor: "#0f766e" }}>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words" style={{ color: "#ccfbf1" }}>{r.title}</p>
        <p className="text-xs mt-2 opacity-80 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Editorial({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => <h2 className="mt-5 mb-2 font-serif text-xs font-bold uppercase tracking-widest border-b border-slate-900 pb-1 text-slate-900">{c}</h2>;
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-6 sm:py-7 text-center border-b-4 border-double border-slate-900">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 break-words">{r.name}</h1>
        <p className="font-serif italic text-base mt-1 text-slate-600 break-words">{r.title}</p>
        <p className="text-xs mt-2 font-medium uppercase tracking-widest text-slate-500 break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Skyline({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider border-b-2 pb-1" style={{ borderColor: "#bae6fd", color: "#1e40af" }}>{c}</h2>;
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 text-white" style={{ background: "linear-gradient(90deg, #1e40af, #0284c7)" }}>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words opacity-95">{r.title}</p>
        <p className="text-xs mt-2 opacity-80 font-medium break-words">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export function Rose({ r }: { r: Resume }) {
  const H = ({ c }: { c: string }) => <h2 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ borderColor: "#fecdd3", color: "#9f1239" }}>{c}</h2>;
  return (
    <div className="bg-white text-slate-800 text-sm min-h-[1000px] shadow-sm">
      <header className="px-5 sm:px-8 py-5 sm:py-6 border-b" style={{ backgroundColor: "#fff1f2", borderColor: "#fecdd3" }}>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words" style={{ color: "#881337" }}>{r.name}</h1>
        <p className="text-base font-medium mt-0.5 break-words" style={{ color: "#be123c" }}>{r.title}</p>
        <p className="text-xs mt-2 font-medium break-words text-slate-500">{contact(r)}</p>
      </header>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
        {r.summary && <div className="cv-section"><H c="Summary" /><p className="text-slate-600 leading-relaxed text-[13px] break-words">{r.summary}</p></div>}
        {r.experience?.length > 0 && <div className="cv-section"><H c="Experience" /><Exp r={r} /></div>}
        {r.projects && r.projects.length > 0 && <div className="cv-section"><H c="Projects" /><ProjectsList projects={r.projects} /></div>}
        {r.educationList?.length > 0 && <div className="cv-section"><H c="Education" /><EducationList educationList={r.educationList} /></div>}
        {r.certifications?.length > 0 && <div className="cv-section"><H c="Certifications" /><CertificationsList certifications={r.certifications} /></div>}
        {r.skills && <div className="cv-section"><H c="Skills" /><SkillsList skills={r.skills} /></div>}
        {r.languages?.length > 0 && <div className="cv-section"><H c="Languages" /><LanguagesList languages={r.languages} /></div>}
      </div>
    </div>
  );
}

export const TEMPLATES = {
  executive: Executive,
  modern: Modern,
  minimal: Minimal,
  creative: Creative,
  tech: Tech,
  graduate: Graduate,
  classic: Classic,
  sidebar: Sidebar,
  bold: Bold,
  slate: Slate,
  midnight: Midnight,
  ivy: Ivy,
  compact: Compact,
  heritage: Heritage,
  oxford: Oxford,
  berlin: Berlin,
  maple: Maple,
  sakura: Sakura,
  nordic: Nordic,
  euro: Euro,
  iberia: Iberia,
  harbour: Harbour,
  pearl: Pearl,
  tulip: Tulip,
  gulf: Gulf,
  emerald: Emerald,
  maroon: Maroon,
  southern: Southern,
  fern: Fern,
  duo: Duo,
  india: India,
  bengal: Bengal,
  lanka: Lanka,
  china: China,
  lotus: Lotus,
  bamboo: Bamboo,
  spice: Spice,
  twin: Twin,
  royal: Royal,
  aqua: Aqua,
  editorial: Editorial,
  skyline: Skyline,
  rose: Rose,
} as const;

export const TEMPLATE_INFO: Record<keyof typeof TEMPLATES, { name: string; bestFor: string; desc: string }> = {
  executive: {
    name: "Executive Elite",
    bestFor: "C-level executives, directors, senior managers",
    desc: "Dark serif header with premium typography for senior leadership roles."
  },
  modern: {
    name: "Modern Impact",
    bestFor: "Corporate, marketing, and mid-level professionals",
    desc: "Vibrant color header with bold sections that stand out to recruiters."
  },
  minimal: {
    name: "Clean Minimalist",
    bestFor: "Design, consulting, and premium industries",
    desc: "Refined typography with generous white space for clean readability."
  },
  creative: {
    name: "Creative Bold",
    bestFor: "Designers, marketers, content creators",
    desc: "Expressive layout with dynamic accents and pill-shaped headings."
  },
  tech: {
    name: "Software Engineer Pro",
    bestFor: "Developers, DevOps, and data engineers",
    desc: "Monospace design with skills-first layout for technical roles."
  },
  graduate: {
    name: "Fresh Graduate",
    bestFor: "Students, fresh graduates, entry-level applicants",
    desc: "Education-first layout built for candidates with limited experience."
  },
  classic: {
    name: "Europass Standard",
    bestFor: "Germany, Austria, Italy, Spain, and EU markets",
    desc: "Traditional Europass-compliant CV format for European job markets."
  },
  sidebar: {
    name: "Two-Column Pro",
    bestFor: "UX, product, and international professionals",
    desc: "Modern two-column layout with dark sidebar for contact and skills."
  },
  bold: {
    name: "Designer Portfolio",
    bestFor: "Designers, product managers, creative leads",
    desc: "Striking sidebar with avatar circle and skill progress bars."
  },
  slate: {
    name: "Slate Professional",
    bestFor: "Corporate, finance, and operations roles",
    desc: "Dark slate header with a bold amber rule — a sharp, boardroom-ready US look."
  },
  midnight: {
    name: "Midnight Bold",
    bestFor: "Marketing, sales, and creative professionals",
    desc: "Black header block with accent bars — high contrast without a photo, fully ATS-readable."
  },
  ivy: {
    name: "Ivy Minimal",
    bestFor: "Academia, law, consulting, and senior professionals",
    desc: "Centered serif layout with classic rules — quiet, credible, and recruiter-friendly."
  },
  compact: {
    name: "Compact Metrics",
    bestFor: "Analysts, engineers, and results-driven roles",
    desc: "Skills strip up top and tight sections that put numbers and outcomes first."
  },
  heritage: {
    name: "Heritage Green",
    bestFor: "Pakistan, Gulf, and formal markets",
    desc: "Deep green double rule with classic formal sections — a dignified look for Pakistani and Gulf employers."
  },
  oxford: {
    name: "Oxford Classic",
    bestFor: "UK professionals, law, academia, consulting",
    desc: "Left-aligned serif layout with a burgundy rule — the traditional British CV, polished for modern hiring."
  },
  berlin: {
    name: "Berlin Tabular",
    bestFor: "Germany, Austria, and structured EU markets",
    desc: "Monochrome tabular layout with letterspaced headings — formal, precise, and easy to scan."
  },
  maple: {
    name: "Maple Clean",
    bestFor: "Canada, public sector, and corporate roles",
    desc: "Clean single-column design with a bold red top rule and clear, confident sections."
  },
  sakura: {
    name: "Sakura Minimal",
    bestFor: "Japan and refined minimal markets",
    desc: "Airy minimal layout with soft rose accents and generous spacing — calm, precise, professional."
  },
  nordic: {
    name: "Nordic Light",
    bestFor: "Sweden, Netherlands, and Nordic markets",
    desc: "Light, airy design with sky-blue rules — concise and modern, built for Nordic hiring."
  },
  euro: {
    name: "Euro Classic",
    bestFor: "Italy, Spain, Germany, and EU markets",
    desc: "Classic continental design with deep green headings — formal enough for Europass-style hiring."
  },
  iberia: {
    name: "Iberia Warm",
    bestFor: "Spain, Portugal, and Mediterranean markets",
    desc: "Warm terracotta rules and confident sections — a professional Mediterranean look."
  },
  harbour: {
    name: "Harbour Corporate",
    bestFor: "Singapore, Hong Kong, and corporate Asia",
    desc: "Teal-ruled corporate design with tight, confident sections for fast-moving Asian markets."
  },
  pearl: {
    name: "Pearl Executive",
    bestFor: "Hong Kong, finance, and senior corporate roles",
    desc: "Charcoal header with a fine gold divider — understated executive polish."
  },
  tulip: {
    name: "Tulip Direct",
    bestFor: "Netherlands and direct-style markets",
    desc: "Bold orange top rule with direct, achievement-first sections — no fluff, just results."
  },
  gulf: {
    name: "Gulf Gold",
    bestFor: "UAE, executive, and premium Gulf roles",
    desc: "Warm sand header with gold rules — premium, elegant, and unmistakably Gulf."
  },
  emerald: {
    name: "Gulf Executive",
    bestFor: "Saudi Arabia, UAE, Qatar, and Gulf markets",
    desc: "Deep emerald header with a fine gold divider — formal executive presence for Gulf hiring."
  },
  maroon: {
    name: "Qatar Maroon",
    bestFor: "Qatar, government, and large-project roles",
    desc: "Rich maroon header in the Qatar national color — formal, confident, and distinctive."
  },
  southern: {
    name: "Southern Ease",
    bestFor: "Australia, New Zealand, and Oceania roles",
    desc: "Warm ochre accents with relaxed, airy spacing — professional without stiffness."
  },
  fern: {
    name: "Fern Clean",
    bestFor: "New Zealand and clean-ATS markets",
    desc: "Deep green headings with strong rules — clean, reference-ready, and ATS-friendly."
  },
  duo: {
    name: "Duo Light",
    bestFor: "Modern two-column markets: UK, NL, AU, SG, CA, UAE",
    desc: "Light sidebar for contact, skills, and languages with a full-width experience column — two-column where it is accepted."
  },
  india: {
    name: "India Navy",
    bestFor: "India, campus drives, Naukri, and IT roles",
    desc: "Deep navy header with a saffron divider — confident, formal, and built for Indian hiring."
  },
  bengal: {
    name: "Bengal Green",
    bestFor: "Bangladesh, corporate, and government roles",
    desc: "Flag-green header with a gold divider — formal and dignified for Bangladeshi employers."
  },
  lanka: {
    name: "Lanka Heritage",
    bestFor: "Sri Lanka, banking, IT, and government roles",
    desc: "Centered serif layout with maroon and gold rules — classic Sri Lankan formality."
  },
  china: {
    name: "China Red",
    bestFor: "China, CSC scholarship, and university applications",
    desc: "Bold red header with a gold divider — formal and clear for Chinese universities and CSC."
  },
  lotus: {
    name: "Lotus Calm",
    bestFor: "South Asia, education, and service roles",
    desc: "Soft purple headings with airy spacing — calm, elegant, and easy to read."
  },
  bamboo: {
    name: "Bamboo Fresh",
    bestFor: "Asia, tech, and modern corporate roles",
    desc: "Fresh teal accents with a light tinted header — modern and clean for Asian employers."
  },
  spice: {
    name: "Spice Warm",
    bestFor: "South Asia, business, and creative roles",
    desc: "Warm brown headings with confident sections — a grounded, professional look."
  },
  twin: {
    name: "Twin Columns",
    bestFor: "India, Bangladesh, and modern two-column markets",
    desc: "Top header band with a light right sidebar — two-column layout where it is accepted, still ATS-readable."
  },
  royal: {
    name: "Royal Prestige",
    bestFor: "Senior managers, executives, consultants",
    desc: "Deep navy header with gold serif headings — a premium, formal look for leadership roles."
  },
  aqua: {
    name: "Aqua Fresh",
    bestFor: "Fresh graduates, healthcare, customer service",
    desc: "Clean teal design with a fresh, modern header for early-career and service roles."
  },
  editorial: {
    name: "Editorial Classic",
    bestFor: "Academics, researchers, writers",
    desc: "Black-and-white serif layout in a classic editorial style for academic and research CVs."
  },
  skyline: {
    name: "Skyline Corporate",
    bestFor: "IT, engineering, business professionals",
    desc: "Blue gradient header with a structured corporate layout for technical and business roles."
  },
  rose: {
    name: "Rose Elegance",
    bestFor: "Marketing, design, communications",
    desc: "Soft blush header with warm rose accents — stylish yet professional and ATS-readable."
  },
};
