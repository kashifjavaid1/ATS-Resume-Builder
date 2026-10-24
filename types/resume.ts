export type Exp = { title: string; company: string; dates: string; bullets: string };
export type Cert = { name: string; issuer: string; date: string };
export type Edu = { degree: string; institution: string; dates: string; details?: string };
export type Language = { name: string; proficiency: string };
export type Project = { name: string; description: string; link?: string };

export type TemplateId = 
  | "executive" 
  | "modern" 
  | "minimal" 
  | "creative" 
  | "tech" 
  | "graduate" 
  | "classic"
  | "sidebar"
  | "bold"
  | "slate"
  | "midnight"
  | "ivy"
  | "compact"
  | "heritage"
  | "oxford"
  | "berlin"
  | "maple"
  | "sakura"
  | "nordic"
  | "euro"
  | "iberia"
  | "harbour"
  | "pearl"
  | "tulip"
  | "gulf"
  | "emerald"
  | "maroon"
  | "southern"
  | "fern"
  | "duo"
  | "india"
  | "bengal"
  | "lanka"
  | "china"
  | "lotus"
  | "bamboo"
  | "spice"
  | "twin";

export type Resume = { 
  name: string; 
  title: string; 
  email: string; 
  phone: string; 
  location: string; 
  targetCountry: string;
  nationality?: string;
  visaStatus?: string;
  dateOfBirth?: string;
  summary: string; 
  skills: string; 
  experience: Exp[]; 
  educationList: Edu[]; 
  certifications: Cert[];
  languages: Language[];
  projects?: Project[];
  template: TemplateId; 
  accent: string 
};

export const emptyResume: Resume = { 
  name: "Your Name", 
  title: "Professional Title", 
  email: "you@email.com", 
  phone: "+1 555 000 0000", 
  location: "City, Country", 
  targetCountry: "US",
  nationality: "",
  visaStatus: "",
  dateOfBirth: "",
  summary: "Results-driven professional with experience delivering measurable outcomes.", 
  skills: "Communication, Project Management, Excel", 
  experience: [
    { title: "Job Title", company: "Company", dates: "2022 - Present", bullets: "Increased team output by 20%\nLed a project from planning to launch" }
  ], 
  educationList: [
    { degree: "B.Sc. Your Degree", institution: "University Name", dates: "2018 - 2021", details: "CGPA: 3.0" }
  ],
  certifications: [
    { name: "Certification Name", issuer: "Issuing Organization", date: "2025" }
  ],
  languages: [
    { name: "English", proficiency: "Professional" }
  ],
  projects: [
    { name: "Project Title", description: "What you built and the result it produced\nTools or skills you used", link: "" }
  ],
  template: "modern", 
  accent: "#4f46e5" 
};

export const resumeToText = (r: Resume) => [
  r.name, r.title, r.email, r.phone, r.location, r.targetCountry, r.nationality, r.visaStatus, r.dateOfBirth,
  "Summary", r.summary, 
  "Skills", r.skills, 
  "Experience", ...r.experience.flatMap(e => [`${e.title} ${e.company} ${e.dates}`, e.bullets]), 
  "Education", ...(r.educationList || []).map(ed => `${ed.degree} ${ed.institution} ${ed.dates} ${ed.details || ""}`),
  "Certifications", ...(r.certifications || []).map(c => `${c.name} ${c.issuer} ${c.date}`),
  "Languages", ...(r.languages || []).map(l => `${l.name} ${l.proficiency}`),
  "Projects", ...(r.projects || []).map(p => `${p.name} ${p.link || ""} ${p.description}`)
].join("\n");