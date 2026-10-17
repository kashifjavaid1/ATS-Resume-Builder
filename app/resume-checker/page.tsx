import { redirect } from "next/navigation";
export const metadata = { title: "Resume Checker", description: "Redirecting to the ATS Resume Checker." };
export default function Page() { redirect("/ats-resume-checker"); }
