export type Check = { level: "pass" | "warn" | "error"; title: string; why: string; fix: string };
export type Result = { score: number; checks: Check[] };
const STOP = new Set("the a an and or of to in for with on at by is are be as you your we our will from that this have has can it their they not but all more able work team".split(" "));
export const words = (t: string) => (t.toLowerCase().match(/[a-z][a-z+#.]{1,}/g) ?? []).filter(w => !STOP.has(w));
export function analyze(text: string): Result {
  const t = text.trim(); const checks: Check[] = [];
  const add = (ok: boolean, level: "warn" | "error", title: string, why: string, fix: string) => checks.push(ok ? { level: "pass", title, why: "", fix: "" } : { level, title, why, fix });
  add(/[\w.+-]+@[\w-]+\.[\w.]+/.test(t), "error", "Email address", "Recruiters and ATS need an email to contact you.", "Add a professional email at the top.");
  add(/\+?\d[\d\s().-]{7,}/.test(t), "warn", "Phone number", "A phone number helps recruiters reach you quickly.", "Add a phone number near your email.");
  add(/experience|employment/i.test(t), "error", "Experience section", "ATS parsers look for a standard Experience heading.", "Use the heading 'Experience' or 'Work Experience'.");
  add(/education/i.test(t), "error", "Education section", "Education is a standard parsed section.", "Add an 'Education' heading.");
  add(/skills/i.test(t), "warn", "Skills section", "Skills drive keyword matching.", "Add a 'Skills' section.");
  add(/summary|profile|objective/i.test(t), "warn", "Professional summary", "A summary gives context in the first lines.", "Add a 2-3 line summary.");
  add(/\d+%|\$\d|\b\d{2,}\b/.test(t), "warn", "Measurable results", "Numbers make achievements concrete.", "Add metrics such as percentages or counts.");
  add(t.split(/\s+/).length >= 150, "warn", "Resume length", "Very short resumes give little to match.", "Aim for 300-700 words.");
  add(!/\t{2,}| {6,}\S/.test(t), "warn", "Possible multi-column layout", "Wide gaps often mean columns that parsers read out of order.", "Use a single-column layout.");
  const w = Math.round(100 * checks.filter(c => c.level === "pass").length / checks.length);
  return { score: w, checks };
}
export function match(resume: string, jd: string) {
  const r = new Set(words(resume)); const freq = new Map<string, number>();
  words(jd).forEach(w => freq.set(w, (freq.get(w) ?? 0) + 1));
  const keys = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25).map(e => e[0]);
  const matched = keys.filter(k => r.has(k)); const missing = keys.filter(k => !r.has(k));
  return { score: keys.length ? Math.round(100 * matched.length / keys.length) : 0, matched, missing };
}
