import React from 'react'
import { ArrowRight, ShieldAlert } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { CareerRiskGap } from '@/services/careerInsightsService'

interface CareerRisksGapsCardProps {
  risks: CareerRiskGap[]
  onActionClick: (screen: string) => void
}

export const CareerRisksGapsCard: React.FC<CareerRisksGapsCardProps> = ({
  risks,
  onActionClick,
}) => {
  const getPriorityVariant = (p: 'High' | 'Medium' | 'Low') => {
    switch (p) {
      case 'High':
        return 'rose'
      case 'Medium':
        return 'amber'
      case 'Low':
        return 'slate'
    }
  }

  return (
    <Card className="p-5 bg-white border-slate-200/80 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-semibold">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Potential Career Gaps</h2>
              <Badge variant="amber" size="sm">
                Preventative Safeguards
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Evidence-based observations to prevent avoidable ATS disqualifications and recruiter friction
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {risks.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant={getPriorityVariant(item.priority)} size="sm">
                  {item.priority} Priority
                </Badge>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  {item.category} Gap
                </span>
                <span className="text-xs font-semibold text-slate-900">— {item.title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => onActionClick(item.actionScreen)}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="text-xs shrink-0 self-start sm:self-center h-8"
            >
              {item.actionLabel}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
