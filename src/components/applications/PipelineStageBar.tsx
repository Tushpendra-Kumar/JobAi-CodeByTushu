import React from 'react'
import {
  Bookmark,
  FileEdit,
  CheckCircle2,
  Send,
  Eye,
  Video,
  Award,
  XCircle,
  ChevronRight,
} from 'lucide-react'
import type { NormalizedPipelineStage } from '@/services/applicationTrackingService'

interface PipelineStageBarProps {
  stageCounts: Record<NormalizedPipelineStage, number>
  selectedStage: NormalizedPipelineStage | 'All'
  onSelectStage: (stage: NormalizedPipelineStage | 'All') => void
}

interface StageConfig {
  id: NormalizedPipelineStage
  label: string
  icon: React.ComponentType<{ className?: string }>
  dotColor: string
  activeBorder: string
  activeBg: string
}

export const PipelineStageBar: React.FC<PipelineStageBarProps> = ({
  stageCounts,
  selectedStage,
  onSelectStage,
}) => {
  const stages: StageConfig[] = [
    {
      id: 'Saved',
      label: 'Saved',
      icon: Bookmark,
      dotColor: 'bg-slate-500',
      activeBorder: 'border-slate-500',
      activeBg: 'bg-slate-100/80 text-slate-900',
    },
    {
      id: 'Preparing',
      label: 'Preparing',
      icon: FileEdit,
      dotColor: 'bg-amber-500',
      activeBorder: 'border-amber-500',
      activeBg: 'bg-amber-50 text-amber-900',
    },
    {
      id: 'Ready to Apply',
      label: 'Ready',
      icon: CheckCircle2,
      dotColor: 'bg-indigo-500',
      activeBorder: 'border-indigo-500',
      activeBg: 'bg-indigo-50 text-indigo-900',
    },
    {
      id: 'Applied',
      label: 'Applied',
      icon: Send,
      dotColor: 'bg-blue-500',
      activeBorder: 'border-blue-500',
      activeBg: 'bg-blue-50 text-blue-900',
    },
    {
      id: 'Screening',
      label: 'Screening',
      icon: Eye,
      dotColor: 'bg-purple-500',
      activeBorder: 'border-purple-500',
      activeBg: 'bg-purple-50 text-purple-900',
    },
    {
      id: 'Interview',
      label: 'Interview',
      icon: Video,
      dotColor: 'bg-emerald-500',
      activeBorder: 'border-emerald-500',
      activeBg: 'bg-emerald-50 text-emerald-900',
    },
    {
      id: 'Offer',
      label: 'Offer',
      icon: Award,
      dotColor: 'bg-teal-500',
      activeBorder: 'border-teal-500',
      activeBg: 'bg-teal-50 text-teal-900',
    },
    {
      id: 'Rejected',
      label: 'Rejected',
      icon: XCircle,
      dotColor: 'bg-rose-500',
      activeBorder: 'border-rose-500',
      activeBg: 'bg-rose-50 text-rose-900',
    },
  ]

  return (
    <nav aria-label="Pipeline Stage Filter" className="bg-white border border-slate-200/80 rounded-2xl p-3 sm:p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Pipeline Progression
          </span>
          <span className="text-xs text-slate-400">
            (Click any stage to filter)
          </span>
        </div>

        {selectedStage !== 'All' && (
          <button
            type="button"
            onClick={() => onSelectStage('All')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Show All Stages
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Progression Container */}
      <div className="overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
        <div className="flex items-center min-w-[720px] gap-1.5 sm:gap-2">
          {stages.map((st, index) => {
            const Icon = st.icon
            const count = stageCounts[st.id] || 0
            const isSelected = selectedStage === st.id

            return (
              <React.Fragment key={st.id}>
                <button
                  type="button"
                  onClick={() => onSelectStage(isSelected ? 'All' : st.id)}
                  className={`flex-1 flex items-center justify-between gap-2 py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    isSelected
                      ? `${st.activeBorder} ${st.activeBg} shadow-xs`
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${st.dotColor}`} />
                    <Icon className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                    <span className="truncate font-semibold">{st.label}</span>
                  </div>

                  <span
                    className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                      count > 0
                        ? isSelected
                          ? 'bg-white/80 text-slate-900 shadow-2xs'
                          : 'bg-slate-200/80 text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>

                {index < stages.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
