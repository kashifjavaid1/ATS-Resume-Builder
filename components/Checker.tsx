"use client";
import { useState } from "react";
import { analyze, match, Result } from "@/lib/analyze";
import { resumeToText, emptyResume } from "@/types/resume";
import * as pdfjsLib from "pdfjs-dist";

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

const ic = { 
  pass: { symbol: "✓", bg: "bg-emerald-50/80 text-emerald-700 border-emerald-200/80" }, 
  warn: { symbol: "⚠", bg: "bg-amber-50/80 text-amber-700 border-amber-200/80" }, 
  error: { symbol: "✕", bg: "bg-rose-50/80 text-rose-700 border-rose-200/80" } 
} as const;

const inputStyle = "w-full rounded-2xl border border-indigo-100 bg-slate-50/80 p-4 text-sm font-medium text-slate-900 transition-all focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-600/10 shadow-sm";

export default function Checker() {
  const [text, setText] = useState(""); 
  const [jd, setJd] = useState(""); 
  const [res, setRes] = useState<Result | null>(null); 
  const [err, setErr] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoadingFile, setIsLoadingFile] = useState(false);

  const m = jd.trim() ? match(text, jd) : null;

  const loadFile = async (f?: File) => {
    setErr(""); 
    if (!f) return;
    setFileName(f.name);
    setIsLoadingFile(true);

    try {
      if (f.name.endsWith(".txt")) {
        const rawText = await f.text();
        setText(rawText);
      } else if (f.name.endsWith(".pdf")) {
        const arrayBuffer = await f.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdfDoc = await loadingTask.promise;
        
        let fullText = "";
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(" ");
          fullText += pageText + "\n";
        }

        if (fullText.trim().length > 20) {
          setText(fullText);
        } else {
          setErr("Could not extract text from this PDF. Please paste your text below.");
        }
      } else {
        const rawText = await f.text();
        setText(rawText);
      }
    } catch {
      setErr("Failed to parse the uploaded file. Please paste your resume text.");
    } finally {
      setIsLoadingFile(false);
    }
  };

  const fromBuilder = () => { 
    try { 
      const s = localStorage.getItem("ats-resume-v1"); 
      setText(resumeToText(s ? { ...emptyResume, ...JSON.parse(s) } : emptyResume)); 
      setFileName("Loaded from Resume Builder Pro");
      setErr("");
    } catch { 
      setErr("Could not read saved resume."); 
    } 
  };

  const run = () => { 
    if (text.trim().length < 50) return setErr("Please add or paste more resume text (at least 50 characters) to run a thorough analysis."); 
    setErr(""); 
    const analysisResult = analyze(text);

    // Agar Job Description di hai, toh overall score mein JD match ko bhi factor in karein
    if (jd.trim() && m) {
      // 50% formatting score + 50% job description match score
      analysisResult.score = Math.round((analysisResult.score * 0.4) + (m.score * 0.6));
    }

    setRes(analysisResult); 
  };

  // Smart Role Detector based on Resume text
  const getBestFitRole = (resumeText: string) => {
    const lower = resumeText.toLowerCase();
    if (lower.includes("mern") || lower.includes("react") || lower.includes("node") || lower.includes("next.js")) {
      return "Full Stack MERN Developer";
    } else if (lower.includes("python") || lower.includes("django") || lower.includes("flask") || lower.includes("data")) {
      return "Python & Data Analytics Specialist";
    } else if (lower.includes("frontend") || lower.includes("tailwind") || lower.includes("css")) {
      return "Frontend React Developer";
    }
    return "Software Engineer / Web Developer";
  };

  const bestRole = text ? getBestFitRole(text) : "";

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start">
      {/* Left Input Section */}
      <div className="space-y-6 lg:col-span-6 bg-gradient-to-b from-white via-slate-50/60 to-indigo-50/30 p-6 sm:p-8 rounded-3xl border border-indigo-100/80 shadow-xl shadow-indigo-500/5 backdrop-blur-xl">
        
        {/* File Upload Box */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-indigo-900">Upload Resume File (PDF, TXT)</label>
          <div className="flex items-center justify-between w-full rounded-2xl border-2 border-dashed border-indigo-200 bg-white/80 p-4 hover:border-indigo-500 transition-all cursor-pointer relative group">
            <input 
              type="file" 
              accept=".txt,.pdf" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={e => loadFile(e.target.files?.[0])} 
            />
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-inner">📄</div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  {isLoadingFile ? "Reading PDF text..." : fileName ? fileName : "Click to upload PDF or TXT"}
                </p>
                <p className="text-[11px] text-slate-400">Supports PDF and TXT formats</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">Browse</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-900">Or Paste Resume Text</label>
            <button onClick={fromBuilder} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline">Use Builder Resume</button>
          </div>
          <textarea rows={8} className={inputStyle} value={text} onChange={e => setText(e.target.value)} placeholder="Paste your complete resume text here..." />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-indigo-900">Job Description (Optional — for Keyword Matching)</label>
          <textarea rows={4} className={inputStyle} value={jd} onChange={e => setJd(e.target.value)} placeholder="Paste job description here to check missing skills & keyword match..." />
        </div>

        <button onClick={run} className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/40 hover:from-indigo-500 hover:to-violet-500 transition-all active:scale-[0.98]">
          Analyze Resume & Find Mistakes 🚀
        </button>

        {err && <p role="alert" className="text-xs font-semibold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">{err}</p>}
      </div>

      {/* Right Results & Mistakes Section */}
      <div aria-live="polite" className="lg:col-span-6">
        {res ? (
          <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-2xl shadow-indigo-500/10 space-y-6 animate-fadeIn">
            
            {/* Unified Score Card */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-6 bg-gradient-to-r from-indigo-50/50 via-slate-50 to-transparent p-4 rounded-2xl border border-indigo-50">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
                  {jd.trim() ? "Job Match & Health Score" : "Overall ATS Health Score"}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl font-black text-slate-900">{res.score}</span>
                  <span className="text-lg text-slate-400 font-bold">/ 100</span>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-2xl font-black text-xl shadow-sm border flex items-center gap-2 ${
                res.score >= 80 ? "bg-emerald-100 text-emerald-800 border-emerald-200" : 
                res.score >= 50 ? "bg-amber-100 text-amber-800 border-amber-200" : 
                "bg-rose-100 text-rose-800 border-rose-200"
              }`}>
                <span>{res.score >= 80 ? "🌟" : res.score >= 50 ? "⚡" : "⚠️"}</span>
                {res.score}%
              </div>
            </div>

            {/* Best Fit Role Banner */}
            {bestRole && (
              <div className="bg-indigo-50/70 border border-indigo-100 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700">🎯 Resume Best Fit For:</p>
                  <p className="text-sm font-black text-slate-900 mt-0.5">{bestRole}</p>
                </div>
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm">100% Match</span>
              </div>
            )}

            {/* Job Description Match Section (if JD is provided) */}
            {jd.trim() && m && (
              <div className="bg-slate-50/90 p-5 rounded-2xl border border-indigo-100 space-y-3 shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Specific JD Match Score</span>
                  <span className="text-lg font-black text-indigo-600">{m.score}%</span>
                </div>
                <p className="text-xs text-slate-600"><b>Matched Keywords:</b> {m.matched.join(", ") || "none"}</p>
                <p className="text-xs text-slate-600"><b>Missing Keywords:</b> {m.missing.join(", ") || "none"}</p>
              </div>
            )}

            {/* Mistakes and Fixes Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">Detailed Checks & Fixes</h3>
              <ul className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {res.checks.map((c, i) => (
                  <li key={i} className={`p-4 rounded-2xl border ${ic[c.level].bg} space-y-2 shadow-sm transition-all hover:shadow-md`}>
                    <div className="flex items-center justify-between font-bold text-sm">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm text-xs font-extrabold">{ic[c.level].symbol}</span>
                        <span className="text-slate-800">{c.title}</span>
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                        c.level === 'pass' ? 'bg-emerald-100 text-emerald-800' : 
                        c.level === 'warn' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {c.level}
                      </span>
                    </div>
                    {c.level !== "pass" && (
                      <div className="text-xs opacity-90 pl-8 space-y-1.5 mt-1">
                        <p className="text-slate-700"><b>Mistake Found:</b> {c.why}</p>
                        <p className="font-bold text-indigo-950 bg-indigo-50/90 p-2.5 rounded-xl border border-indigo-100 shadow-sm">🛠️ How to Fix: {c.fix}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/50 p-12 text-center text-slate-400 flex flex-col items-center justify-center h-full min-h-[480px] shadow-sm">
            <div className="h-16 w-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-2xl mb-4 shadow-inner">📊</div>
            <p className="text-sm font-bold text-slate-700">Ready to Scan Your Resume</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">Upload your file or paste text on the left, then click analyze to view score, mistakes, and fixes.</p>
          </div>
        )}
      </div>
    </div>
  );
}