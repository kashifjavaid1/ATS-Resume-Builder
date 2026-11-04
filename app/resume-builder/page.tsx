import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/Faq";
import Builder from "@/components/Builder";

export const metadata: Metadata = {
  title: "Free Resume Builder Pakistan — ATS Templates, Instant PDF",
  description: "Build an ATS-friendly resume online with live preview and 43 templates. Autosaves locally and downloads as a PDF.",
  alternates: { canonical: "/resume-builder" }
};

export default function Page() {
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold print:hidden">Free Online Resume Builder</h1>
      <Builder />
      <div className="print:hidden mx-auto mt-12 max-w-3xl space-y-4 leading-7 text-slate-600">
        <h2 className="text-2xl font-bold text-slate-900">How this free resume builder works</h2>
        <p><strong>Step 1 — Pick your format and template.</strong> Start with the country you are applying in because photo and length rules change with the country. Then choose any of the 43 templates.</p>
        <p><strong>Step 2 — Fill the steps.</strong> Personal info and summary and experience and education and skills. The builder autosaves in your browser as you type.</p>
        <p><strong>Step 3 — Watch the live preview.</strong> Your CV updates as you write and the preview adjusts to your screen if you are working on a phone.</p>
        <p><strong>Step 4 — Print to PDF.</strong> Your browser turns the preview into a clean PDF with no watermark and no sign up. That file is the one you send.</p>
        <h2 className="pt-4 text-2xl font-bold text-slate-900">What makes these templates ATS friendly</h2>
        <p>Every template here uses section headings in plain standard words that employer software can map. The text on the page is real selectable text and never a picture of text. Most designs use a single column so a parser reads your story from top to bottom in the right order. Two column designs appear only inside the country formats where employers accept them. There are no hidden tables holding your details hostage and no graphics swallowing your job titles.</p>
        <h2 className="pt-4 text-2xl font-bold text-slate-900">One builder for Pakistan and 20 more countries</h2>
        <p>The same builder carries the format rules for <Link className="underline" href="/country-templates">21 countries</Link>. Pakistan follows the local pattern with your CNIC name and your father name and your Matric and FSc record. Gulf formats add the visa details employers there expect. Western formats leave the photo out entirely. If you are not sure which rules apply to you then read the <Link className="underline" href="/cv-format-pakistan">CV format guide</Link> first and build after.</p>
        <h2 className="pt-4 text-2xl font-bold text-slate-900">Before you print</h2>
        <p>Read every date on the preview once out loud. A swapped year is the most common mistake on an otherwise strong CV. Name the saved file with your own name and the role so a recruiter can find it again in a crowded folder. And export the JSON backup from the builder before you close the tab. It lets you rebuild or adjust this same CV later without typing it all again.</p>
      </div>
      <div className="print:hidden"><Faq
        items={[
          { q: "Is this resume builder free?", a: "Yes. The resume builder is free to use online. There is no sign-up and no watermark. You build your resume in your browser and use Print to PDF to save it." },
          { q: "Does my resume stay private?", a: "Yes. Your resume is stored only in your browser's local storage. Nothing is uploaded to a server. Clearing your browser data deletes your saved draft, so export a JSON backup if you want one." },
          { q: "What happens to my data after I download?", a: "After you print or download, you choose: 'Clear data' deletes your saved resume from this browser, and 'Keep saved' keeps it so you can edit it again later." },
          { q: "Will my resume work with ATS?", a: "The builder uses templates with standard headings that ATS software can read more easily. Most designs are single-column for maximum parser compatibility; two-column options are offered only for markets where they are accepted. The ATS checker highlights common formatting and completeness issues. No tool can guarantee a pass, because every employer configures its system differently." },
          { q: "Can I add a photo to my CV?", a: "Yes where the format allows one. Upload your photo in the Personal Info step and it appears on templates that support photos. Country formats that leave photos out such as the USA and the UK keep it hidden automatically." },
          { q: "Can I build my CV on my phone?", a: "Yes. The builder works in your mobile browser and the live preview adjusts to your screen. Many people fill the details on a phone and print the PDF later from any computer by importing their JSON backup." },
        ]}
      /></div>
    </>
  );
}