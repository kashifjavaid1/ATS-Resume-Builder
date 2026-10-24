import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "CV Maker Pakistan — Free Online Resume Builder | ATS-Friendly CV", template: "%s | CV Maker Pakistan" },
  description: "CV Maker Pakistan — build a professional, ATS-friendly CV online free. No sign-up. Create your resume, check it, and print to PDF. Your CV stays on your device.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CV Maker Pakistan — Free Online Resume Builder" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col" suppressHydrationWarning>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SLYHWKH165"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SLYHWKH165');`}
        </Script>

        <Navbar />

        <main className="mx-auto max-w-6xl scroll-mt-24 p-4 pt-6 sm:p-6 sm:pt-8 flex-grow w-full">{children}</main>

        <footer className="mt-16 bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 print:hidden">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
            <div className="md:col-span-5 space-y-3">
              {/* ===== NEW LOGO — CV badge + CV Maker Pakistan ===== */}
              <Link href="/" className="flex items-center gap-2.5 no-underline">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 text-sm font-black tracking-tight text-white shadow-lg shadow-indigo-900/40 ring-1 ring-white/20">
                  CV
                  <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 text-[8px] text-emerald-950 ring-2 ring-slate-900">✓</span>
                </span>
                <span className="text-base font-extrabold tracking-tight text-white">
                  CV Maker <span className="text-emerald-400">Pakistan</span>
                  <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400">Pakistan & International Resume Builder</span>
                </span>
              </Link>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Your resume stays on your device. Nothing is uploaded or stored on servers. You can delete your data anytime.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-medium">
              <div className="space-y-2.5">
                <p className="font-bold uppercase tracking-wider text-white text-[11px]">Tools</p>
                <ul className="space-y-2 text-slate-400">
                  <li><Link href="/resume-builder" prefetch={true} className="hover:text-white transition-colors">Resume Builder</Link></li>
                  <li><Link href="/cv-maker-pakistan" prefetch={true} className="hover:text-white transition-colors">CV Maker Pakistan</Link></li>
                  <li><Link href="/resume-job-matcher" prefetch={true} className="hover:text-white transition-colors">Job Matcher</Link></li>
                  <li><Link href="/ats-resume-checker" prefetch={true} className="hover:text-white transition-colors">Resume Checker</Link></li>
                  <li><Link href="/resume-templates" prefetch={true} className="hover:text-white transition-colors">Resume Templates</Link></li>
                  <li><Link href="/resume-examples" prefetch={true} className="hover:text-white transition-colors">Resume Examples</Link></li>
                  <li><Link href="/country-templates" prefetch={true} className="hover:text-white transition-colors">Country Templates</Link></li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <p className="font-bold uppercase tracking-wider text-white text-[11px]">Resources</p>
                <ul className="space-y-2 text-slate-400">
                  <li><Link href="/ats-resume-guide" prefetch={true} className="hover:text-white transition-colors">ATS Guide</Link></li>
                  <li><Link href="/resume-format-guide" prefetch={true} className="hover:text-white transition-colors">Format Guide</Link></li>
                  <li><Link href="/cv-format-pakistan" prefetch={true} className="hover:text-white transition-colors">CV Format Pakistan</Link></li>
                  <li><Link href="/cv-for-freshers-pakistan" prefetch={true} className="hover:text-white transition-colors">CV for Freshers</Link></li>
                  <li><Link href="/cv-for-gulf-saudi-jobs" prefetch={true} className="hover:text-white transition-colors">Gulf CV Guide</Link></li>
                  <li><Link href="/europe-cv-format" prefetch={true} className="hover:text-white transition-colors">Europe CV Guide</Link></li>
                  <li><Link href="/blog" prefetch={true} className="hover:text-white transition-colors">Blog</Link></li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <p className="font-bold uppercase tracking-wider text-white text-[11px]">Company</p>
                <ul className="space-y-2 text-slate-400">
                  <li><Link href="/about" prefetch={true} className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/contact" prefetch={true} className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/privacy" prefetch={true} className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" prefetch={true} className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 CV Maker Pakistan. All rights reserved.</p>
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-full text-[11px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Client-Side Secure & Private
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
