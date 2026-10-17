import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";
export const metadata: Metadata = { title: "Contact", description: "How to get in touch about the CV Maker Pakistan resume builder.", alternates: { canonical: "/contact" } };
export default function Page() { return (<div className="mx-auto max-w-3xl space-y-4 leading-7"><h1 className="text-3xl font-extrabold">Contact</h1><p>This site has no backend, so there is no contact form that sends messages. Email us at <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We reply to questions about the builder, checker and templates.</p><p>Please do not send your full CV by email. Build and download it directly in your browser so your personal data stays on your device.</p></div>); }
