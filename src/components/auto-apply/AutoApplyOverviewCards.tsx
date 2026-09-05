import React from 'react'
import { Briefcase, CheckCircle2, FileEdit, Send, Sparkles } from 'lucide-react'

interface AutoApplyOverviewCardsProps {
  totalJobsCount: number
  readyToApplyCount: number
  preparedCount: number
  submittedCount: number
}

export const AutoApplyOverviewCards: React.FC<AutoApplyOverviewCardsProps> = ({
  totalJobsCount,
  readyToApplyCount,
  preparedCount,
  submittedCount,
}) => {
  const cards = [
    {
      title: 'Recommended Jobs',
      value: totalJobsCount,
      subtext: 'Catalog opportunities evaluated',
      icon: Briefcase,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
    },
    {
      title: 'Ready to Apply',
      value: readyToApplyCount,
      subtext: 'Match score >= 80%',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
    },
    {
      title: 'Applications Prepared',
      value: preparedCount,
      subtext: 'Awaiting your final review',
      icon: FileEdit,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
    },
    {
      title: 'Applications Submitted',
      value: submittedCount,
      subtext: 'Recorded in demo tracker',
      icon: Send,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100',
    },
  ]

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Auto Apply Pipeline Overview
          </h2>
        </div>
        <span className="text-[10px] text-slate-400">Demo Environment Metrics</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className={`p-4 rounded-2xl bg-white border ${card.borderColor} shadow-xs transition-all hover:shadow-sm`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600 truncate mr-1">
                  {card.title}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg ${card.bgColor} ${card.color} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {card.value}
                </span>
                <span className="text-[10px] text-slate-400 truncate">{card.subtext}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
