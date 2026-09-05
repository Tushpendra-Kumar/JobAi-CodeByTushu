import React from 'react'
import { FileText, ShieldCheck, Edit3 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface TechnicalProfileSummaryCardProps {
  summary: string
  onImproveSummary: () => void
}

export const TechnicalProfileSummaryCard: React.FC<TechnicalProfileSummaryCardProps> = ({
  summary,
  onImproveSummary,
}) => {
  return (
    <Card className="p-5 bg-gradient-to-br from-white via-white to-slate-50/70 border-slate-200/80 shadow-xs space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Your Technical Profile
          </h3>
          <Badge variant="indigo" size="sm">
            AI Synthesis
          </Badge>
          <Badge variant="emerald" size="sm">
            100% Truthful Grounding
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onImproveSummary}
          leftIcon={<Edit3 className="w-3.5 h-3.5 text-indigo-600" />}
          className="text-xs h-7 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
        >
          Improve in Resume Builder
        </Button>
      </div>

      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans select-text">
        {summary}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5 text-emerald-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Factual Grounding Rule: Zero invented degrees, false job titles, or inflated metrics.</span>
        </div>
        <span className="text-slate-400">Synchronized with Screen #7 Resume Builder</span>
      </div>
    </Card>
  )
}
