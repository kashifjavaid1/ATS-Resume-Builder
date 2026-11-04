import type { Metadata } from "next";
import Faq from "@/components/Faq";
import Checker from "@/components/Checker";

export const metadata: Metadata = { 
  title: "Free ATS Resume Checker Pakistan — Score Your CV Online",
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
      <section className="mx-auto mt-12 max-w-3xl space-y-4 leading-7 text-slate-600">
        <h2 className="text-2xl font-bold text-slate-900">What this ATS checker looks at</h2>
        <p>Paste your CV text or open your file and the checker reads it the way a parser would. It looks for the basics every employer system needs before a human ever sees your name. It checks whether an email address and a phone number are present and easy to find. It looks for the standard sections that parsers map their fields from. It reads your summary and your skills and it looks for measurable results with numbers in them. It weighs the length of the document. And it flags layout risks that can scramble the reading order of your file.</p>
        <h2 className="pt-4 text-2xl font-bold text-slate-900">How the score works</h2>
        <p>Each item the checker finds adds points and each missing item is listed for you by name. The score stops at 95 on purpose. No tool that runs on your own device can see inside the exact system an employer uses so a perfect 100 would be a claim nobody can back up. A score in the high range means your CV passed every check this tool performs. The list under the score matters more than the number itself because it tells you exactly what to fix.</p>
        <h2 className="pt-4 text-2xl font-bold text-slate-900">How to check your CV in one minute</h2>
        <p><strong>Step 1 — Add your CV.</strong> Paste the text or open the file. Nothing leaves your device.</p>
        <p><strong>Step 2 — Read the issue list.</strong> Work from the top. Missing sections hurt more than small wording issues.</p>
        <p><strong>Step 3 — Fix what it names.</strong> Use the builder on this site or edit your own document and then come back.</p>
        <p><strong>Step 4 — Match one real job.</strong> Paste the job description to see which expected keywords your CV is missing.</p>
        <p><strong>Step 5 — Check again.</strong> Re-run the checker after every fix until the issue list is empty.</p>
        <h2 className="pt-4 text-2xl font-bold text-slate-900">How to raise a low score</h2>
        <p>Most low scores come from the same handful of causes. Add any missing section and name it with a standard heading like Experience or Education or Skills. Put numbers on your results wherever the work had a count or a size or a saving. Bring the document to one page if you are early in your career or two pages if your experience needs the room. If layout risks are flagged then move to a single column design so the reading order stays clean. And mirror the honest words of the job description for skills you truly have. Recruiters search with those words and parsers rank with them.</p>
        <h2 className="pt-4 text-2xl font-bold text-slate-900">Why CVs get filtered out before a human reads them</h2>
        <p>Most large employers and many recruitment agencies sort applications with software first. The software hunts for contact details and section headings and role keywords. A CV saved as one big image or split into tangled columns can come out as scrambled text on the other side. When the parser finds nothing it understands then the file sinks even if the person behind it is strong. The checks on this page exist to catch those silent failures while you can still fix them.</p>
      </section>
      <Faq
        items={[
          { q: "What does the ATS resume checker check?", a: "It checks for an email address, phone number, Experience, Education and Skills sections, a professional summary, measurable results, resume length, and possible multi-column layout risks." },
          { q: "Is the ATS score a real ATS result?", a: "No. The score is a simple on-device heuristic that highlights common formatting and completeness issues. Real ATS systems are configured differently by every employer, so no online tool can reproduce their exact result." },
          { q: "Is my resume uploaded anywhere?", a: "No. The checker runs entirely in your browser. Nothing is uploaded or stored on a server." },
          { q: "How do I improve a low score?", a: "Add the missing sections the checker lists, use standard headings (Experience, Education, Skills), add measurable results, and keep a single-column layout. Then re-check." },
          { q: "What is a good ATS score for a CV?", a: "Aim for a high score with an empty issue list. Chasing the number alone misses the point. Fix every item the checker names and your CV is as ready as this tool can make it. No score here or anywhere else can promise an interview." },
          { q: "Can I check my CV against one specific job?", a: "Yes. Paste the job description into the match view and the checker compares its keywords with your CV text. It shows which expected words are missing so you can add the ones that honestly describe your experience. Never add skills you do not have just to raise the match." },
        ]}
      />
    </div>
  ); 
}