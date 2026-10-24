import type { TemplateId } from "@/types/resume";

// Templates shown in the plain builder (no country selected). Every other
// template is country-exclusive: it only appears inside its country's flow,
// never in the plain builder list.
export const GENERAL_TEMPLATES: TemplateId[] = [
  "executive", "modern", "minimal", "creative", "tech",
  "graduate", "classic", "sidebar", "bold",
];

// Per-country template sets. The first entry is the country's existing
// locked template (unchanged); the rest are new designs made for that
// country or region. Two-column designs (sidebar, duo) appear only for
// markets where two-column CVs are accepted: UK, NL, AU, SG, CA, UAE.
// No set includes a photo template — resumes here never use photos.
export const COUNTRY_TEMPLATE_SETS: Record<string, TemplateId[]> = {
  // United States (kept as built)
  US: ["modern", "slate", "midnight", "ivy", "compact"],
  USA: ["modern", "slate", "midnight", "ivy", "compact"],
  // Pakistan
  PK: ["classic", "heritage", "emerald", "executive", "graduate"],
  PAKISTAN: ["classic", "heritage", "emerald", "executive", "graduate"],
  // United Kingdom
  UK: ["classic", "oxford", "duo", "sidebar", "modern"],
  GB: ["classic", "oxford", "duo", "sidebar", "modern"],
  "UNITED-KINGDOM": ["classic", "oxford", "duo", "sidebar", "modern"],
  // Germany & Austria
  DE: ["classic", "berlin", "euro", "minimal", "tech"],
  "GERMANY-AUSTRIA": ["classic", "berlin", "euro", "minimal", "tech"],
  // Canada
  CA: ["modern", "maple", "duo", "tech", "executive"],
  CANADA: ["modern", "maple", "duo", "tech", "executive"],
  // Japan
  JP: ["minimal", "sakura", "classic", "graduate"],
  JAPAN: ["minimal", "sakura", "classic", "graduate"],
  // Sweden
  SE: ["minimal", "nordic", "berlin", "modern"],
  SWEDEN: ["minimal", "nordic", "berlin", "modern"],
  // Italy
  IT: ["classic", "euro", "minimal", "creative"],
  // Spain
  ES: ["classic", "iberia", "euro", "creative"],
  // Singapore
  SG: ["modern", "harbour", "duo", "tech", "executive"],
  SINGAPORE: ["modern", "harbour", "duo", "tech", "executive"],
  // Hong Kong
  HK: ["executive", "pearl", "harbour", "minimal"],
  "HONG-KONG": ["executive", "pearl", "harbour", "minimal"],
  // Netherlands
  NL: ["minimal", "tulip", "nordic", "duo", "modern"],
  NETHERLANDS: ["minimal", "tulip", "nordic", "duo", "modern"],
  // United Arab Emirates
  UAE: ["executive", "gulf", "emerald", "duo", "modern"],
  // Saudi Arabia
  "SAUDI-ARABIA": ["executive", "emerald", "heritage", "classic"],
  KSA: ["executive", "emerald", "heritage", "classic"],
  SA: ["executive", "emerald", "heritage", "classic"],
  // Qatar
  QA: ["executive", "maroon", "emerald", "modern"],
  QATAR: ["executive", "maroon", "emerald", "modern"],
  // Australia
  AU: ["modern", "southern", "duo", "sidebar", "executive"],
  AUSTRALIA: ["modern", "southern", "duo", "sidebar", "executive"],
  // New Zealand
  NZ: ["modern", "fern", "southern", "minimal"],
  "NEW-ZEALAND": ["modern", "fern", "southern", "minimal"],
};
