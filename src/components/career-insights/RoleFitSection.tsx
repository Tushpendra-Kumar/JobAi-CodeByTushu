import React from 'react'
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { RoleFitItem } from '@/services/careerInsightsService'

interface RoleFitSectionProps {
  roles: RoleFitItem[]
  onSelectRoleAction: (screen: string, roleName: string) => void
}

export const RoleFitSection: React.FC<RoleFitSectionProps> = ({
  roles,
  onSelectRoleAction,
}) => {
  const getBadgeVariant = (score: number) => {
    if (score >= 90) return 'emerald'
    if (score >= 80) return 'indigo'
    return 'amber'
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500'
    if (score >= 80) return 'bg-indigo-600'
    return 'bg-amber-500'
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200/70">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Your Best-Fit Roles</h2>
            <Badge variant="indigo" size="sm">
              6 Roles Evaluated
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Comparative analysis of your verified profile skills against common engineering titles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((item) => {
          return (
            <Card
              key={item.id}
              className="p-4 bg-white border-slate-200/80 hover:border-indigo-300 transition-all shadow-xs flex flex-col justify-between space-y-3.5 group"
            >
              {/* Header & Fit Score */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.role}
                    </h3>
                    <div className="text-[11px] text-slate-400">{item.projectRelevance}</div>
                  </div>
                  <Badge variant={getBadgeVariant(item.fitScore)} size="sm">
                    {item.fitScore}% Fit
                  </Badge>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getProgressColor(item.fitScore)}`}
                    style={{ width: `${item.fitScore}%` }}
                  />
                </div>
              </div>

              {/* Matching Skills */}
              <div className="space-y-1.5 text-xs">
                <div className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Matching Profile Skills:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.matchingSkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Focus Gaps */}
              <div className="space-y-1.5 text-xs">
                <div className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  <span>Recommended Gaps to Address:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.skillGaps.map((gap) => (
                    <span
                      key={gap}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60"
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Action CTA */}
              <div className="pt-2 border-t border-slate-100">
                <Button
                  variant={item.fitScore >= 90 ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => onSelectRoleAction(item.actionScreen, item.role)}
                  className="w-full text-xs h-8 justify-between"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  <span>{item.recommendedAction}</span>
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
