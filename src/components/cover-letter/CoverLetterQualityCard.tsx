import React from 'react'
import { Award } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { CoverLetterQualityScore } from '@/services/coverLetterService'

interface CoverLetterQualityCardProps {
  score: CoverLetterQualityScore
}

export const CoverLetterQualityCard: React.FC<CoverLetterQualityCardProps> = ({ score }) => {
  const getScoreColor = (val: number) => {
    if (val >= 85) return 'text-emerald-600'
    if (val >= 70) return 'text-amber-600'
    return 'text-slate-600'
  }

  const getProgressColor = (val: number) => {
    if (val >= 85) return 'bg-emerald-500'
    if (val >= 70) return 'bg-amber-500'
    return 'bg-slate-400'
  }

  const metrics: { label: string; value: number }[] = [
    { label: 'Job Relevance', value: score.jobRelevance },
    { label: 'Resume Grounding', value: score.personalization },
    { label: 'Clarity & Flow', value: score.clarity },
    { label: 'Professional Tone', value: score.professionalTone },
    { label: 'Readability', value: score.readability },
    { label: 'Keyword Alignment', value: score.keywordAlignment },
  ]

  return (
    <Card className="p-4 space-y-3.5 bg-gradient-to-br from-white via-white to-slate-50/50">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Letter Quality & Impact Score
          </h3>
        </div>
        <Badge variant={score.overallScore >= 85 ? 'emerald' : 'amber'} size="sm">
          {score.overallScore >= 85 ? 'Strong Impact' : 'Good Draft'}
        </Badge>
      </div>

      {/* Main Score & Summary */}
      <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
        <div className="space-y-0.5">
          <div className="text-xs font-semibold text-slate-700">Overall ATS & Recruiter Score</div>
          <div className="text-[11px] text-slate-500">
            Based on role keyword density, structural clarity, and truthful profile match
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className={`text-2xl font-black ${getScoreColor(score.overallScore)}`}>
            {score.overallScore}
            <span className="text-xs text-slate-400 font-medium">/100</span>
          </div>
        </div>
      </div>

      {/* 6 Sub-metric Progress Bars */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600">{m.label}</span>
              <span className="font-semibold text-slate-800">{m.value}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(m.value)}`}
                style={{ width: `${m.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
