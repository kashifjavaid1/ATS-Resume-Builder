"use client";

import { useState } from "react";
import Link from "next/link";

// FIX — "Home" wapas: logo ke saath Navbar me bhi Home link hona chahiye
const LINKS = [
  { href: "/", label: "Home" },
  { href: "/resume-builder", label: "Resume Builder" },
  { href: "/cv-maker-pakistan", label: "CV Maker Pakistan" },
  { href: "/country-templates", label: "Country Formats" },
  { href: "/ats-resume-checker", label: "ATS Checker" },
  { href: "/resume-templates", label: "Templates" },
  { href: "/resume-examples", label: "Examples & Guides" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/95 backdrop-blur print:hidden">
      <nav className="mx-auto flex h-16 max-w-7xl flex-nowrap items-center justify-between gap-2 px-4 sm:px-6" aria-label="Main">
        <Link href="/" prefetch={true} className="flex shrink-0 items-center gap-2.5 no-underline">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 text-sm font-black tracking-tight text-white shadow-md shadow-indigo-200 ring-1 ring-indigo-100">
            CV
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 text-[8px] text-emerald-950 ring-2 ring-white">✓</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-extrabold tracking-tight text-slate-900">
              CV Maker <span className="text-emerald-600">Pakistan</span>
            </span>
            {/* Tagline sirf bohat bari screen (2xl) pe, warna jagah kha ke links ko dabata hai */}
            <span className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-wider text-slate-400 2xl:block">
              Pakistan & International Resume Builder
            </span>
          </span>
        </Link>

        {/* Links 1280px (xl) se upar hi dikhenge. Isse neeche hamburger aayega, overlap kabhi nahi hoga */}
        <div className="hidden min-w-0 items-center gap-0.5 text-[13px] font-medium text-slate-600 xl:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} prefetch={true} className="whitespace-nowrap rounded-lg px-2 py-2 transition-all hover:bg-indigo-50 hover:text-indigo-600">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link href="/resume-builder" prefetch={true} className="hidden whitespace-nowrap rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 sm:inline-flex">
            Create Resume
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 xl:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-2 shadow-lg xl:hidden">
          <div className="flex flex-col text-base font-medium text-slate-700">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-indigo-50 hover:text-indigo-600">
                {l.label}
              </Link>
            ))}
          </div>
          <Link href="/resume-builder" onClick={() => setIsOpen(false)} className="mt-3 block w-full rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-indigo-700">
            Create Resume
          </Link>
        </div>
      )}
    </header>
  );
}
