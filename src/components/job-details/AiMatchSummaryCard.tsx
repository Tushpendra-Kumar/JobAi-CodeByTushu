import React from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { MatchScoreBreakdown } from '@/data/jobsData'

export interface AiMatchSummaryCardProps {
  score: number
  breakdown: MatchScoreBreakdown
  onViewAllMatches?: () => void
}

export const AiMatchSummaryCard: React.FC<AiMatchSummaryCardProps> = ({
  score,
  breakdown,
  onViewAllMatches,
}) => {
  const metrics = [
    { label: 'Skills Match', value: breakdown.skillsMatch },
    { label: 'Experience Match', value: breakdown.experienceMatch },
    { label: 'Technology Match', value: breakdown.technologyMatch },
    { label: 'Career Goals', value: breakdown.careerGoals },
    { label: 'Location Match', value: breakdown.locationMatch },
  ]

  return (
    <Card className="p-6 border-indigo-100 bg-gradient-to-b from-white via-indigo-50/20 to-white shadow-sm text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            AI Job Match
          </h2>
        </div>
        <Badge variant="emerald" size="sm" dot>
          {breakdown.label}
        </Badge>
      </div>

      {/* Main Score Callout */}
      <div className="py-5 flex items-baseline gap-3">
        <span className="text-5xl font-black tracking-tight text-slate-900 font-heading">
          {score}%
        </span>
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            {breakdown.label}
          </span>
          <p className="text-xs text-slate-500 font-medium">
            AI compatibility index
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
        {breakdown.summary}
      </p>

      {/* 5-Metric Clean Progress Bars */}
      <div className="space-y-3.5 pt-2 border-t border-slate-100">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">{m.label}</span>
              <span className="font-bold text-indigo-700 font-mono">{m.value}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-violet-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${m.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {onViewAllMatches && (
        <div className="pt-4 mt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onViewAllMatches}
            className="w-full text-center text-xs font-bold text-indigo-600 hover:text-indigo-700 py-1.5 px-3 rounded-lg hover:bg-indigo-50/70 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Compare With All AI Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </Card>
  )
}
