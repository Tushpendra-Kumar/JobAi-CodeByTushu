import React from 'react'
import { Sparkles, CheckCircle2, TrendingUp, Cpu, Target, Award } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export interface CareerMatchOverviewProps {
  overallScore?: number // 92
  skillsMatch?: number // 94
  experienceMatch?: number // 88
  technologyMatch?: number // 95
  careerGoalsMatch?: number // 90
}

export const CareerMatchOverview: React.FC<CareerMatchOverviewProps> = ({
  overallScore = 92,
  skillsMatch = 94,
  experienceMatch = 88,
  technologyMatch = 95,
  careerGoalsMatch = 90,
}) => {
  const metrics = [
    {
      label: 'Skills Match',
      value: skillsMatch,
      icon: Award,
      color: 'text-indigo-600',
      barColor: 'bg-indigo-600',
      bgLight: 'bg-indigo-50',
    },
    {
      label: 'Experience Match',
      value: experienceMatch,
      icon: TrendingUp,
      color: 'text-blue-600',
      barColor: 'bg-blue-600',
      bgLight: 'bg-blue-50',
    },
    {
      label: 'Technology Match',
      value: technologyMatch,
      icon: Cpu,
      color: 'text-violet-600',
      barColor: 'bg-violet-600',
      bgLight: 'bg-violet-50',
    },
    {
      label: 'Career Goals',
      value: careerGoalsMatch,
      icon: Target,
      color: 'text-emerald-600',
      barColor: 'bg-emerald-600',
      bgLight: 'bg-emerald-50',
    },
  ]

  return (
    <Card className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm relative overflow-hidden text-left">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-indigo-50/60 via-violet-50/20 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left: Large Score Callout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:border-r lg:border-slate-100 lg:pr-8 lg:max-w-md shrink-0">
          {/* Circular / Badge Visual */}
          <div className="relative flex items-center justify-center shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 flex flex-col items-center justify-center text-white shadow-lg shadow-indigo-600/20 ring-4 ring-indigo-50">
              <span className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
                {overallScore}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-indigo-200 mt-1">
                / 100
              </span>
            </div>
            <div className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-white shadow-xs border border-slate-100">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 fill-indigo-100" />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>High Compatibility</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Your Career Match Score
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Your profile currently aligns strongly with the jobs you're exploring.
            </p>
          </div>
        </div>

        {/* Right: 4 Supporting Metrics with Elegant Progress Indicators */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {metrics.map((m) => {
            const Icon = m.icon
            return (
              <div
                key={m.label}
                className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${m.bgLight} ${m.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      {m.label}
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-slate-900">
                    {m.value}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.barColor} transition-all duration-700`}
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
