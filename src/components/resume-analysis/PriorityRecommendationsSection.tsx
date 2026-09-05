import React from 'react'
import { CheckSquare, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { PriorityRecommendation } from '@/services/resumeAnalysisService'

export interface PriorityRecommendationsSectionProps {
  recommendations: PriorityRecommendation[]
  onApplyRecommendation?: (recId: string) => void
}

export const PriorityRecommendationsSection: React.FC<PriorityRecommendationsSectionProps> = ({
  recommendations,
}) => {
  return (
    <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Strategic Action Items
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Top Recommendations
          </h3>
          <p className="text-xs text-slate-500">
            Actionable steps prioritized by their potential impact on screening and hiring callback rates.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold self-start sm:self-auto">
          {recommendations.length} Prioritized Steps
        </span>
      </div>

      {/* Prioritized Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {recommendations.map((rec) => {
          const isHigh = rec.priority === 'High'
          const isMedium = rec.priority === 'Medium'

          return (
            <div
              key={rec.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isHigh
                  ? 'bg-rose-50/20 border-rose-200/70 hover:border-rose-300 shadow-2xs'
                  : isMedium
                  ? 'bg-amber-50/20 border-amber-200/70 hover:border-amber-300 shadow-2xs'
                  : 'bg-slate-50/50 border-slate-200/70 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                {/* Priority Badge & Title */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      isHigh
                        ? 'bg-rose-100 text-rose-800'
                        : isMedium
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {rec.priority} Priority
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">
                  {rec.title}
                </h4>

                {/* Why It Matters (Reason) */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Why It Matters:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rec.reason}
                  </p>
                </div>
              </div>

              {/* Recommended Action */}
              <div className="p-3 rounded-xl bg-white/80 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-700">
                  <CheckSquare className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Recommended Action:
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-800 leading-snug">
                  {rec.action}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
