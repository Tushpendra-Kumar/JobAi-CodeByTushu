import React from 'react'
import { CheckSquare, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { ActionPlanItem } from '@/services/careerInsightsService'

interface Next5ActionsPlanSectionProps {
  actions: ActionPlanItem[]
  onActionClick: (screen: string, param?: string) => void
}

export const Next5ActionsPlanSection: React.FC<Next5ActionsPlanSectionProps> = ({
  actions,
  onActionClick,
}) => {
  const getEffortBadge = (effort: ActionPlanItem['effort']) => {
    switch (effort) {
      case 'Low Effort':
        return <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">~15 mins • Low Effort</span>
      case 'Medium Effort':
        return <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">~45 mins • Med Effort</span>
      case 'High Effort':
        return <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">~2 hours • High Effort</span>
    }
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-white via-indigo-50/15 to-violet-50/10 border-indigo-200/80 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Your Next 5 Actions</h2>
              <Badge variant="indigo" size="sm">
                Prioritized Action Plan
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Ranked sequentially to generate maximum interview velocity with minimal friction
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {actions.map((act) => (
          <div
            key={act.id}
            className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Step Number & Content */}
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {act.stepNumber}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{act.title}</h3>
                  <Badge variant={act.priority === 'High' ? 'rose' : 'indigo'} size="sm">
                    {act.priority} Priority
                  </Badge>
                  {getEffortBadge(act.effort)}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {act.reason}
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="shrink-0 self-end md:self-center">
              <Button
                variant={act.stepNumber <= 2 ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => onActionClick(act.actionScreen, act.actionParam)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="text-xs h-8 whitespace-nowrap"
              >
                {act.actionLabel}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
