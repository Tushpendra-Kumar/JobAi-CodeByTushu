import React from 'react'
import { Search, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export interface KeywordCoverageSectionProps {
  detectedKeywords: string[]
  recommendedKeywords: string[]
}

export const KeywordCoverageSection: React.FC<KeywordCoverageSectionProps> = ({
  detectedKeywords,
  recommendedKeywords,
}) => {
  return (
    <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Keyword Optimization
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Keyword Coverage & Density
          </h3>
          <p className="text-xs text-slate-500">
            Keywords identified on your resume compared to high-frequency terms in active engineering job postings.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 self-start sm:self-auto">
          <span className="font-semibold text-slate-800">{detectedKeywords.length}</span>
          <span>Keywords Found</span>
        </div>
      </div>

      {/* Two Column Grid: Strong Coverage vs Needs Attention */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category A: Strong Coverage (Detected Keywords) */}
        <div className="p-5 rounded-2xl bg-emerald-50/30 border border-emerald-100 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Strong Coverage
            </h4>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
              {detectedKeywords.length} Detected
            </span>
          </div>

          <p className="text-xs text-slate-600">
            These terms are clearly indexed in your skills, experience, or project descriptions:
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {detectedKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200/80 text-xs font-semibold text-emerald-900 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{kw}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Category B: Needs Attention (Recommended Keywords) */}
        <div className="p-5 rounded-2xl bg-amber-50/30 border border-amber-100 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Needs Attention
            </h4>
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-full">
              {recommendedKeywords.length} Recommended
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Frequently required by hiring teams for software roles, but absent or low-frequency on your resume:
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {recommendedKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200/80 text-xs font-semibold text-amber-900 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>{kw}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Guidance Note */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2 text-[11px] text-slate-500">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-700">Recommendation only:</strong> JobAI does not automatically insert recommended keywords into your profile. Only add technologies you have genuinely worked with or are currently learning.
        </p>
      </div>
    </Card>
  )
}
