import React from 'react'
import { TrendingUp, AlertTriangle, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { AiCareerInsight } from '@/services/careerInsightsService'

interface AiInsightsSectionProps {
  insights: AiCareerInsight[]
  onActionClick: (screen: string) => void
}

export const AiInsightsSection: React.FC<AiInsightsSectionProps> = ({
  insights,
  onActionClick,
}) => {
  const getCategoryIcon = (category: AiCareerInsight['category']) => {
    switch (category) {
      case 'strength':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />
      case 'opportunity':
        return <TrendingUp className="w-4 h-4 text-indigo-600" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />
      case 'recommendation':
        return <Lightbulb className="w-4 h-4 text-purple-600" />
    }
  }

  const getCategoryBadgeVariant = (category: AiCareerInsight['category']) => {
    switch (category) {
      case 'strength':
        return 'emerald'
      case 'opportunity':
        return 'indigo'
      case 'warning':
        return 'amber'
      case 'recommendation':
        return 'purple'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200/70">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">AI Career Insights</h2>
            <Badge variant="indigo" size="sm">
              Grounded Observations
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Actionable intelligence synthesized from your career profile data, catalog matches, and application stages
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((item) => (
          <Card
            key={item.id}
            className="p-4 bg-white border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3 hover:border-indigo-300 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                    {getCategoryIcon(item.category)}
                  </div>
                  <Badge variant={getCategoryBadgeVariant(item.category)} size="sm">
                    {item.category.toUpperCase()}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <span>Confidence:</span>
                  <strong className="text-slate-700">{item.confidence}</strong>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.explanation}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onActionClick(item.actionScreen)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-7 px-2 font-semibold"
              >
                {item.actionLabel}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
