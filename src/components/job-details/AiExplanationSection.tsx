import React from 'react'
import { CheckCircle2, Bot } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export interface AiExplanationSectionProps {
  reasons: string[]
}

export const AiExplanationSection: React.FC<AiExplanationSectionProps> = ({
  reasons,
}) => {
  return (
    <Card className="p-6 sm:p-7 border-indigo-100 bg-white shadow-xs text-left mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Bot className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Why AI recommends this job
          </h2>
        </div>
        <Badge variant="indigo" size="sm" className="text-[10px] font-medium py-0.5 px-2 bg-indigo-50/70 border-indigo-200">
          Analyzed from your profile + this job description
        </Badge>
      </div>

      {/* Bullet Items */}
      <div className="pt-5 space-y-3">
        {reasons.map((reason, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 hover:border-indigo-200 transition-colors"
          >
            <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
              {reason}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
