import React from 'react'
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export interface StrengthsAndWeaknessesSectionProps {
  strengths: { title: string; description: string }[]
  weaknesses: { title: string; description: string }[]
}

export const StrengthsAndWeaknessesSection: React.FC<StrengthsAndWeaknessesSectionProps> = ({
  strengths,
  weaknesses,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
      {/* 1. Resume Strengths */}
      <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-emerald-100/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-emerald-100/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Competitive Advantages
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              What Your Resume Does Well
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
            {strengths.length} Strengths
          </span>
        </div>

        <div className="space-y-3">
          {strengths.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100/70 space-y-1 hover:border-emerald-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* 2. Resume Weaknesses */}
      <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-amber-100/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-amber-100/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Refinement Opportunities
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              What Could Be Improved
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-xs border border-amber-200">
            {weaknesses.length} Areas
          </span>
        </div>

        <div className="space-y-3">
          {weaknesses.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-amber-50/30 border border-amber-100/70 space-y-1 hover:border-amber-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-600 font-bold text-xs shrink-0">△</span>
                <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 pl-4 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
