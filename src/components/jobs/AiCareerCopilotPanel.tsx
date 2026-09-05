import React from 'react'
import { Bot, ArrowRight, Zap, Target, Flame } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export interface AiCareerCopilotPanelProps {
  onViewAiMatches: () => void
}

export const AiCareerCopilotPanel: React.FC<AiCareerCopilotPanelProps> = ({
  onViewAiMatches,
}) => {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white p-5 sm:p-6 border border-indigo-500/30 shadow-xl relative overflow-hidden mb-8 text-left">
      {/* Subtle Glows */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute left-1/3 top-0 w-32 h-32 bg-violet-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Copilot Title & Message */}
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold tracking-tight text-indigo-100">
              AI Career Copilot
            </span>
            <Badge variant="indigo" size="sm" dot className="bg-indigo-900/60 text-indigo-200 border-indigo-700/60 py-0.5 px-2 text-[10px]">
              Live Agent
            </Badge>
          </div>
          <p className="text-sm sm:text-base font-semibold text-white leading-snug">
            “I found 18 opportunities that closely match your profile.”
          </p>
          <p className="text-xs text-indigo-200/80 leading-relaxed">
            Ranked based on your verified tech stack, past production experience, and competitive compensation targets.
          </p>
        </div>

        {/* Middle: 3 Metric Badges */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          <div className="rounded-xl bg-white/10 backdrop-blur-md p-2.5 sm:p-3 border border-white/10 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
              <Target className="w-3.5 h-3.5" />
              <span className="text-sm sm:text-base font-extrabold">18</span>
            </div>
            <p className="text-[10px] font-medium text-slate-300 uppercase tracking-tighter">
              Strong Matches
            </p>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-md p-2.5 sm:p-3 border border-white/10 text-center">
            <div className="flex items-center justify-center gap-1 text-cyan-400 mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-sm sm:text-base font-extrabold">7</span>
            </div>
            <p className="text-[10px] font-medium text-slate-300 uppercase tracking-tighter">
              New Today
            </p>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-md p-2.5 sm:p-3 border border-white/10 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span className="text-sm sm:text-base font-extrabold">3</span>
            </div>
            <p className="text-[10px] font-medium text-slate-300 uppercase tracking-tighter">
              High-Priority
            </p>
          </div>
        </div>

        {/* Right CTA */}
        <div className="shrink-0 pt-2 lg:pt-0">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onViewAiMatches}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-xs font-bold py-2.5 px-5 shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
          >
            View AI Matches
          </Button>
        </div>
      </div>
    </div>
  )
}
