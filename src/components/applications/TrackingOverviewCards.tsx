import React from 'react'
import {
  Layers,
  Send,
  Clock,
  Video,
  Award,
  XCircle,
} from 'lucide-react'
import type { NormalizedPipelineStage } from '@/services/applicationTrackingService'

interface TrackingOverviewCardsProps {
  totalCount: number
  appliedCount: number
  screeningCount: number
  interviewCount: number
  offerCount: number
  rejectedCount: number
  selectedStageFilter: NormalizedPipelineStage | 'All'
  onSelectStage: (stage: NormalizedPipelineStage | 'All') => void
}

export const TrackingOverviewCards: React.FC<TrackingOverviewCardsProps> = ({
  totalCount,
  appliedCount,
  screeningCount,
  interviewCount,
  offerCount,
  rejectedCount,
  selectedStageFilter,
  onSelectStage,
}) => {
  const cards = [
    {
      id: 'All' as const,
      label: 'Total Pipeline',
      count: totalCount,
      icon: Layers,
      color: 'text-slate-700',
      bgColor: 'bg-slate-50',
      activeRing: 'ring-2 ring-slate-400 border-slate-400',
      desc: 'All tracked applications',
    },
    {
      id: 'Applied' as const,
      label: 'Applied',
      count: appliedCount,
      icon: Send,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      activeRing: 'ring-2 ring-blue-500 border-blue-400',
      desc: 'Submitted packages',
    },
    {
      id: 'Screening' as const,
      label: 'In Review',
      count: screeningCount,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      activeRing: 'ring-2 ring-purple-500 border-purple-400',
      desc: 'Under recruiter review',
    },
    {
      id: 'Interview' as const,
      label: 'Interviews',
      count: interviewCount,
      icon: Video,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      activeRing: 'ring-2 ring-emerald-500 border-emerald-400',
      desc: 'Active rounds scheduled',
    },
    {
      id: 'Offer' as const,
      label: 'Offers',
      count: offerCount,
      icon: Award,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      activeRing: 'ring-2 ring-teal-500 border-teal-400',
      desc: 'Formal offers extended',
    },
    {
      id: 'Rejected' as const,
      label: 'Archived',
      count: rejectedCount,
      icon: XCircle,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      activeRing: 'ring-2 ring-rose-500 border-rose-400',
      desc: 'Closed opportunities',
    },
  ]

  return (
    <section aria-label="Application Metrics Summary" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        const isSelected = selectedStageFilter === card.id

        return (
          <button
            key={card.label}
            type="button"
            onClick={() => {
              if (isSelected && card.id !== 'All') {
                onSelectStage('All')
              } else {
                onSelectStage(card.id)
              }
            }}
            className={`text-left transition-all p-3.5 sm:p-4 rounded-xl border bg-white shadow-sm flex flex-col justify-between hover:shadow hover:-translate-y-0.5 cursor-pointer ${
              isSelected ? card.activeRing : 'border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`p-2 rounded-lg ${card.bgColor} ${card.color}`}>
                <Icon className="w-4 h-4" />
              </span>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {card.count}
              </span>
            </div>

            <div>
              <div className="text-xs sm:text-sm font-semibold text-slate-800">
                {card.label}
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                {card.desc}
              </div>
            </div>
          </button>
        )
      })}
    </section>
  )
}
