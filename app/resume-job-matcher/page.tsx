import type { Metadata } from "next";
import Checker from "@/components/Checker";
import { Crumbs } from "@/components/Seo";
import Faq from "@/components/Faq";
export const metadata: Metadata = { title: "Resume Job Description Matcher", description: "Paste a job description and compare it with your resume to find matched and missing keywords. Runs in your browser.", alternates: { canonical: "/resume-job-matcher" } };
export default function Page() { return (<><Crumbs items={[["Job Matcher", "/resume-job-matcher"]]} /><h1 className="text-3xl font-bold">Resume Job Description Matcher</h1><p className="mb-4 mt-2 max-w-2xl text-slate-600">Paste your resume and the job posting, then see which important words appear in both and which are missing. Add missing terms only where they honestly describe your experience.</p><Checker /><Faq
        items={[
          { q: "How does the job description matcher work?", a: "It compares the important words in the job posting with the words in your resume and shows which are matched and which are missing. It runs entirely in your browser." },
          { q: "Should I add every missing keyword?", a: "No. Add missing terms only where they honestly describe your experience. Recruiters and ATS systems both penalize keyword stuffing." },
          { q: "Is my resume or job posting uploaded?", a: "No. The matcher runs entirely in your browser. Nothing is uploaded or stored on a server." },
        ]}
      /></>); }
