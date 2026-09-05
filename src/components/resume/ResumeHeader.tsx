import React from 'react'
import { FileText, Sparkles, CheckCircle2 } from 'lucide-react'

export const ResumeHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 text-left">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Build Your AI Career Profile
          </h1>

          {/* AI Parser Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Resume Parser</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Upload your resume and let JobAI extract your experience, skills and career information automatically.
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pt-0.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Ready to analyze your resume</span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100/70 border border-slate-200/60 px-3.5 py-2 rounded-xl">
        <FileText className="w-4 h-4 text-indigo-600" />
        <span>Supports PDF, DOC, DOCX • Up to 10 MB</span>
      </div>
    </div>
  )
}
