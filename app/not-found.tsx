import Link from "next/link";
export default function NotFound() {
  return (<div className="py-16 text-center"><h1 className="text-4xl font-extrabold">Page Not Found</h1><p className="mt-2 text-slate-600">The page you want does not exist.</p><p className="mt-6 flex flex-wrap justify-center gap-3"><Link className="rounded-lg bg-indigo-600 px-4 py-2 text-white" href="/resume-builder">Create Resume</Link><Link className="rounded-lg border px-4 py-2" href="/ats-resume-checker">Check Resume</Link><Link className="rounded-lg border px-4 py-2" href="/resume-templates">Browse Templates</Link><Link className="rounded-lg border px-4 py-2" href="/">Go Home</Link></p></div>);
}
