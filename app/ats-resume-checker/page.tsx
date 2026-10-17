import type { Metadata } from "next";
import Faq from "@/components/Faq";
import Checker from "@/components/Checker";

export const metadata: Metadata = { 
  title: "ATS Resume Checker & Job Matcher", 
  description: "Check your resume for ATS readability and compare it with a job description. Runs in your browser; nothing is uploaded.", 
  alternates: { canonical: "/ats-resume-checker" } 
};

export default function Page() { 
  return (
    <div className="mx-auto max-w-6xl py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">ATS Resume Checker</h1>
        <p className="mt-2 text-base text-slate-600">Analyze your resume formatting, layout risks, and job match score instantly.</p>
      </div>
      <Checker />
      <Faq
        items={[
          { q: "What does the ATS resume checker check?", a: "It checks for an email address, phone number, Experience, Education and Skills sections, a professional summary, measurable results, resume length, and possible multi-column layout risks." },
          { q: "Is the ATS score a real ATS result?", a: "No. The score is a simple on-device heuristic that highlights common formatting and completeness issues. Real ATS systems are configured differently by every employer, so no online tool can reproduce their exact result." },
          { q: "Is my resume uploaded anywhere?", a: "No. The checker runs entirely in your browser. Nothing is uploaded or stored on a server." },
          { q: "How do I improve a low score?", a: "Add the missing sections the checker lists, use standard headings (Experience, Education, Skills), add measurable results, and keep a single-column layout. Then re-check." },
        ]}
      />
    </div>
  ); 
}