import type { Metadata } from "next";
import Faq from "@/components/Faq";
import Builder from "@/components/Builder";

export const metadata: Metadata = {
  title: "Free Resume Builder Pakistan — ATS Templates, Instant PDF",
  description: "Build an ATS-friendly resume online with live preview and 38 templates. Autosaves locally and downloads as a PDF.",
  alternates: { canonical: "/resume-builder" }
};

export default function Page() {
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold print:hidden">Free Online Resume Builder</h1>
      <Builder />
      <div className="print:hidden"><Faq
        items={[
          { q: "Is this resume builder free?", a: "Yes. The resume builder is free to use online. There is no sign-up and no watermark. You build your resume in your browser and use Print to PDF to save it." },
          { q: "Does my resume stay private?", a: "Yes. Your resume is stored only in your browser's local storage. Nothing is uploaded to a server. Clearing your browser data deletes your saved draft, so export a JSON backup if you want one." },
          { q: "What happens to my data after I download?", a: "After you print or download, you choose: 'Clear data' deletes your saved resume from this browser, and 'Keep saved' keeps it so you can edit it again later." },
          { q: "Will my resume work with ATS?", a: "The builder uses templates with standard headings that ATS software can read more easily. Most designs are single-column for maximum parser compatibility; two-column options are offered only for markets where they are accepted. The ATS checker highlights common formatting and completeness issues. No tool can guarantee a pass, because every employer configures its system differently." },
        ]}
      /></div>
    </>
  );
}