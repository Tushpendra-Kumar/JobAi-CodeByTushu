import React from 'react'
import { Award, CheckCircle2, ArrowRight, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { CareerReadinessScore } from '@/services/careerInsightsService'

interface CareerReadinessHeroCardProps {
  readiness: CareerReadinessScore
  onOptimizeResume: () => void
  onCompleteProfile: () => void
}

export const CareerReadinessHeroCard: React.FC<CareerReadinessHeroCardProps> = ({
  readiness,
  onOptimizeResume,
  onCompleteProfile,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600'
    if (score >= 70) return 'text-indigo-600'
    return 'text-amber-600'
  }

  const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-500'
    if (score >= 70) return 'bg-indigo-600'
    return 'bg-amber-500'
  }

  const breakdownMetrics: { label: string; value: number; note: string }[] = [
    { label: 'Resume Strength', value: readiness.resumeStrength, note: 'Screen #6 ATS Audit' },
    { label: 'Technical Skills', value: readiness.technicalSkills, note: 'Verified Proficiencies' },
    { label: 'Project Relevance', value: readiness.projectRelevance, note: 'Portfolio Alignment' },
    { label: 'Job Match Score', value: readiness.jobMatch, note: 'Catalog Compatibility' },
    { label: 'Application Readiness', value: readiness.applicationReadiness, note: 'Package Preparedness' },
    { label: 'Profile Completeness', value: readiness.profileCompleteness, note: 'Verified Credentials' },
  ]

  return (
    <Card className="p-6 bg-gradient-to-br from-white via-white to-indigo-50/20 border-slate-200/80 shadow-xs space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-xs">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Career Readiness Score</h2>
              <Badge variant="indigo" size="sm">
                Composite Benchmark
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Evaluated across your resume health, technical skills, project depth, and market compatibility
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onCompleteProfile}
            className="text-xs h-8"
          >
            Complete Profile
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onOptimizeResume}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="text-xs h-8"
          >
            Optimize Resume
          </Button>
        </div>
      </div>

      {/* Main Score Display & Strongest / Opportunity Callouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Big Gauge (5 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 border border-slate-200/80 flex flex-col items-center justify-center text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Overall Readiness
          </div>
          <div className={`text-5xl sm:text-6xl font-black tracking-tight ${getScoreColor(readiness.overallScore)}`}>
            {readiness.overallScore}
            <span className="text-lg text-slate-400 font-semibold">/100</span>
          </div>
          <Badge variant={readiness.overallScore >= 85 ? 'emerald' : 'indigo'} size="sm">
            {readiness.overallScore >= 85 ? 'Highly Competitive Profile' : 'Strong Candidate Foundation'}
          </Badge>
          <p className="text-[11px] text-slate-500 max-w-xs pt-1">
            Calculated by weighting resume ATS compliance (25%), technical proficiencies (20%), project relevance (20%), and market match (35%).
          </p>
        </div>

        {/* Right Callouts: Strongest Area & Biggest Opportunity (8 cols) */}
        <div className="lg:col-span-8 space-y-3.5">
          {/* Strongest Area */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/70 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                Your Strongest Area
              </div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5">
                {readiness.strongestArea}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Your verified hands-on development with React.js, TypeScript, and modern component hierarchies provides high leverage for Frontend and Full Stack opportunities.
              </div>
            </div>
          </div>

          {/* Biggest Opportunity */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                Your Biggest Score Booster
              </div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5">
                {readiness.biggestOpportunity}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Adding verified automated unit testing (Vitest/Jest) and containerization evidence will close the most common requirement gap on higher-tier roles.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Sub-metric Breakdown Grid */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Diagnostic Score Breakdown
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {breakdownMetrics.map((item) => (
            <div
              key={item.label}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 line-clamp-1">{item.label}</span>
                <span className={`font-bold ${getScoreColor(item.value)}`}>{item.value}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200/70 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor(item.value)}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 truncate">{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
