import React from 'react'
import { CheckCircle2, AlertTriangle, ShieldCheck, Info } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { AtsCheck } from '@/services/resumeAnalysisService'

export interface AtsCompatibilitySectionProps {
  score?: number
  checks: AtsCheck[]
  improvements: string[]
}

export const AtsCompatibilitySection: React.FC<AtsCompatibilitySectionProps> = ({
  score = 90,
  checks,
  improvements,
}) => {
  return (
    <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6 text-left">
      {/* Section Header with ATS Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Recruitment Screening
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            ATS Compatibility
          </h3>
          <p className="text-xs text-slate-500">
            How cleanly your resume parses through automated Applicant Tracking Systems.
          </p>
        </div>

        {/* ATS Score Visual Pill */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 shrink-0 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
              ATS Score
            </span>
            <span className="text-2xl font-black text-emerald-900 leading-tight">
              {score}
              <span className="text-xs font-bold text-emerald-600">/100</span>
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {score}%
          </div>
        </div>
      </div>

      {/* Grid: Positive Checks vs Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: 6 Positive Checks (col-span-7) */}
        <div className="md:col-span-7 space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Positive Parsing Checks ({checks.length})
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {checks.map((c, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-md bg-emerald-100/80 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">
                    {c.title}
                  </span>
                  <span className="text-[11px] text-slate-500 block leading-tight">
                    {c.details}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Potential Improvements (col-span-5) */}
        <div className="md:col-span-5 space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Potential Improvements
          </h4>

          <div className="space-y-2.5">
            {improvements.map((imp, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 flex items-start gap-2.5"
              >
                <span className="text-amber-600 font-bold text-xs shrink-0 mt-0.5">
                  △
                </span>
                <p className="text-xs text-amber-900 leading-snug">
                  {imp}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer / Notice callout */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2 text-[11px] text-slate-500">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-700">JobAI demo analysis:</strong> This evaluation tests standard typographic and structural layout heuristics. It does not claim compatibility with any specific commercial ATS vendor (e.g. Workday, Greenhouse, Taleo) or guarantee recruiter interview callbacks.
        </p>
      </div>
    </Card>
  )
}
