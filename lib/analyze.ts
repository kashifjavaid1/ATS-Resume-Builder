export type Check = { level: "pass" | "warn" | "error"; title: string; why: string; fix: string };
export type Result = { score: number; checks: Check[] };
const STOP = new Set("the a an and or of to in for with on at by is are be as you your we our will from that this have has can it their they not but all more able work team".split(" "));
export const words = (t: string) => (t.toLowerCase().match(/[a-z][a-z+#.]{1,}/g) ?? []).filter(w => !STOP.has(w));

// Section text: from a heading until the next ALL-CAPS heading (or max length)
const NEXT_CAPS_HEADING = /\b(EXPERIENCE|EMPLOYMENT|EDUCATION|SKILLS|SUMMARY|PROFILE|OBJECTIVE|PROJECTS|CERTIFICATIONS|LANGUAGES|CONTACT|ACHIEVEMENTS|AWARDS|REFERENCES|ABOUT ME)\b/;
function sectionAfter(t: string, heading: RegExp, maxLen: number): string {
  const m = t.match(heading);
  if (!m || m.index === undefined) return "";
  const start = m.index + m[0].length;
  let seg = t.slice(start, start + maxLen);
  const nxt = seg.search(NEXT_CAPS_HEADING);
  if (nxt > 0) seg = seg.slice(0, nxt);
  return seg;
}

export function analyze(text: string): Result {
  const t = text.trim(); const checks: Check[] = [];
  const add = (ok: boolean, level: "warn" | "error", title: string, why: string, fix: string) => checks.push(ok ? { level: "pass", title, why: "", fix: "" } : { level, title, why, fix });

  // 1. Full name — first thing on the CV, real name, not "CV / Resume"
  const firstWords = t.slice(0, 80).split(/\s+/).filter(Boolean);
  const GENERIC = /^(cv|resume|curriculum|vitae|bio|biodata)$/i;
  const nameOk = firstWords.length >= 2 && !GENERIC.test(firstWords[0]) && /^[A-Za-z.'-]+$/.test(firstWords[0]) && /^[A-Za-z.'-]+$/.test(firstWords[1]) && firstWords[0].length >= 2 && firstWords[1].length >= 2;
  add(nameOk, "error", "Full name", "Your name should be the very first thing on the CV.", "Put your full name (first + last) at the top — not 'CV' or 'Resume'.");

  // 2. Email — valid format, in the header
  const header = t.slice(0, 800);
  const em = header.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  const emailOk = !!em && !em[0].includes("..") && !em[0].startsWith(".") && !em[0].endsWith(".");
  add(emailOk, "error", "Email address", "Recruiters and ATS need a valid email to contact you.", "Add a professional email at the top of your CV.");

  // 3. Phone — valid format, 10–15 digits, not a fake/sequential number
  const phoneCand = header.match(/\+?\d[\d\s().-]{7,}/);
  let phoneOk = false;
  if (phoneCand) {
    const d = phoneCand[0].replace(/\D/g, "");
    const fake = /^(\d)\1+$/.test(d) || /^(12345|01234|09876|00000)/.test(d);
    phoneOk = d.length >= 10 && d.length <= 15 && !fake;
  }
  add(phoneOk, "warn", "Phone number", phoneCand ? "The phone number looks incomplete or invalid." : "A phone number helps recruiters reach you quickly.", "Add a valid phone number near your email, e.g. 0300-1234567 or +92 300 1234567.");

  // 4. LinkedIn — real profile URL, not just the word "LinkedIn"
  add(/linkedin\.com\/in\/[A-Za-z0-9_.-]{2,}/i.test(t), "warn", "LinkedIn profile", "A LinkedIn URL builds trust and gives recruiters a second place to check you.", "Add your LinkedIn URL: linkedin.com/in/your-name.");

  // 5. Experience — heading + dates on entries
  const expSeg = sectionAfter(t, /experience|employment/i, 1500);
  const expOk = expSeg.length > 0 && /\b((19|20)\d{2}|present)\b/i.test(expSeg);
  add(expOk, "error", "Experience section", expSeg.length === 0 ? "ATS parsers look for a standard Experience heading." : "Experience entries are missing dates — without dates, ATS cannot build your timeline.", "Use the heading 'Experience' and add dates to each job, e.g. 2021–2023 or Jan 2022 – Present.");

  // 6. Education — heading + degree + graduation year
  const eduSeg = sectionAfter(t, /education/i, 1200);
  const eduOk = eduSeg.length > 0 && /(bachelor|master|b\.?\s?sc|b\.?\s?a|m\.?\s?sc|mba|phd|diploma|matric|f\.?\s?sc|f\.?\s?a|intermediate|bcom|bcs|\bbs\b|b\.?\s?eng|associate)/i.test(eduSeg) && /\b(19|20)\d{2}\b/.test(eduSeg);
  add(eduOk, "error", "Education section", eduSeg.length === 0 ? "Education is a standard parsed section." : "Education is missing a degree or graduation year.", "Add an 'Education' heading with your degree, institute and graduation year.");

  // 7. Skills — heading + at least 5 separate skills
  const skSeg = sectionAfter(t, /skills/i, 600);
  const skillItems = skSeg.split(/[,;•\n|]/).map(s => s.trim()).filter(s => s.length >= 2 && s.length <= 40 && !/^(and|with|in|for|the)\b/i.test(s));
  const skillsOk = skSeg.length > 0 && skillItems.length >= 5;
  add(skillsOk, "warn", "Skills section", skSeg.length === 0 ? "Skills drive keyword matching." : `Only ${skillItems.length} skill${skillItems.length === 1 ? "" : "s"} found — too few for keyword matching.`, "List at least 5 specific skills, separated by commas.");

  // 8. Professional summary — present, 30–90 words ("About Me" counts as a summary heading)
  const sumSeg = sectionAfter(t, /summary|profile|objective|about me/i, 900);
  const sumWords = sumSeg ? sumSeg.split(/\s+/).filter(Boolean).length : 0;
  const sumOk = sumSeg.length > 0 && sumWords >= 30 && sumWords <= 90;
  let sumWhy = "";
  if (sumSeg.length === 0) sumWhy = "A summary gives context in the first lines.";
  else if (sumWords < 30) sumWhy = `Your summary is only ${sumWords} words — too short to explain your value.`;
  else if (sumWords > 90) sumWhy = `Your summary is ${sumWords} words — too long, recruiters skim past it.`;
  add(sumOk, "warn", "Professional summary", sumWhy, "Write a 2–3 line summary (30–90 words): your role, years of experience and one big achievement.");

  // 9. Measurable results — at least 2 numbers tied to achievements
  const pct = (t.match(/\d+\s*%/g) || []).length;
  const verbNums = (t.match(/\b(increased|decreased|reduced|improved|grew|saved|generated|achieved|delivered|boosted|cut|raised|lowered)\b[^.]{0,50}\d/g) || []).length;
  const signals = pct + verbNums;
  add(signals >= 2, "warn", "Measurable results", signals === 0 ? "No numbers found — achievements without metrics look vague." : `Only ${signals} measurable result${signals === 1 ? "" : "s"} found.`, "Add at least 2 metrics, e.g. 'Increased sales by 30%' or 'Cut load time from 5s to 1s'.");

  // 10. Action verbs & bullets — ONLY inside the Experience section.
  // (No Experience section → skip this check; the Experience error above already covers it.
  //  Skills bullets like "Languages: ..." must not be flagged for missing action verbs.)
  const VERBS = new Set("built developed led managed designed implemented created improved increased reduced delivered launched optimized automated coordinated achieved generated established streamlined migrated integrated engineered drove owned spearheaded transformed supervised mentored analyzed resolved supported maintained tested deployed".split(" "));
  if (expSeg.length > 0) {
    const weakPhrase = /(responsible for|worked on|duties included|in charge of)/i.test(expSeg);
    const starts = [...expSeg.matchAll(/•\s*([A-Za-z]+)/g), ...expSeg.matchAll(/(?:^|\n)\s*[-–]\s+([A-Za-z]+)/g)].map(m => m[1].toLowerCase());
    const strong = starts.filter(w => VERBS.has(w)).length;
    let verbsOk = true; let verbsWhy = ""; let verbsFix = "";
    if (starts.length === 0) { verbsOk = false; verbsWhy = "No bullet points found under Experience — parsers and recruiters scan bullets first."; verbsFix = "Use bullet points under each job, starting with action verbs like Built, Led or Delivered."; }
    else if (weakPhrase) { verbsOk = false; verbsWhy = "Bullets use weak phrases like 'Responsible for' instead of action verbs."; verbsFix = "Rewrite bullets to start with action verbs: Built, Led, Delivered, Improved."; }
    else if (strong / starts.length < 0.5) { verbsOk = false; verbsWhy = "Fewer than half of your bullets start with a strong action verb."; verbsFix = "Start most bullets with action verbs: Built, Led, Delivered, Improved."; }
    add(verbsOk, "warn", "Action verbs & bullets", verbsWhy, verbsFix);
  }

  // 11. Clichés — generic claims without proof
  const cliche = t.match(/hard worker|team player|fast learner|quick learner|highly motivated|self-starter/gi);
  add(!cliche, "warn", "Clichés", cliche ? `Cliché found: "${cliche[0]}" — recruiters ignore generic claims without proof.` : "", "Replace clichés with proof — show one achievement instead of claiming a trait.");

  // 12. Sensitive personal details — hurt international & Gulf applications
  const sensitive = t.match(/\b\d{5}-\d{7}-\d\b|\bcnic\b|date of birth|\bdob\b|marital status|religion/i);
  add(!sensitive, "warn", "Sensitive personal details", sensitive ? `Found "${sensitive[0]}" — recruiters don't need it.` : "", "Remove CNIC / DOB / marital status / religion — they hurt international & Gulf applications. Keep them only if the job ad asks.");

  // 13. Resume length
  const totalWords = t.split(/\s+/).filter(Boolean).length;
  add(totalWords >= 250 && totalWords <= 1200, totalWords < 250 ? "error" : "warn", "Resume length", totalWords < 250 ? `Only ${totalWords} words — too short for ATS matching.` : totalWords > 1200 ? `${totalWords} words — too long, recruiters skim past it.` : "", "Aim for 300–700 words (1–2 pages).");

  // 14. Possible multi-column layout
  add(!/\t{2,}| {6,}\S/.test(t), "warn", "Possible multi-column layout", "Wide gaps often mean columns that parsers read out of order.", "Use a single-column layout.");

  // Strict scoring: every failed check costs points (error 12, warn 6)
  const errors = checks.filter(c => c.level === "error").length;
  const warns = checks.filter(c => c.level === "warn").length;
  const score = Math.max(5, 100 - errors * 12 - warns * 6);
  return { score, checks };
}
export function match(resume: string, jd: string) {
  const r = new Set(words(resume)); const freq = new Map<string, number>();
  words(jd).forEach(w => freq.set(w, (freq.get(w) ?? 0) + 1));
  const keys = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25).map(e => e[0]);
  const matched = keys.filter(k => r.has(k)); const missing = keys.filter(k => !r.has(k));
  return { score: keys.length ? Math.round(100 * matched.length / keys.length) : 0, matched, missing };
}
