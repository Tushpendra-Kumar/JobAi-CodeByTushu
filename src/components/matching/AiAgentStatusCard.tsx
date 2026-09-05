import { Bot, RefreshCw } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { AiAgentTelemetry } from '@/services/matchingService'

export interface AiAgentStatusCardProps {
  telemetry: AiAgentTelemetry
  onRefresh: () => void
  isRefreshing?: boolean
}

export const AiAgentStatusCard: React.FC<AiAgentStatusCardProps> = ({
  telemetry,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left relative overflow-hidden">
      <div className="space-y-4">
        {/* Header with Live Badge */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-none">
                AI Career Agent
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Autonomous Discovery Engine
              </p>
            </div>
          </div>

          {/* Active Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Active</span>
          </div>
        </div>

        {/* Status Message */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            “Analyzing new opportunities for you.”
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1">
            <span>Last updated:</span>
            <strong className="text-slate-600 font-semibold">{telemetry.lastUpdated}</strong>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <span className="text-base sm:text-lg font-black text-slate-900 block leading-tight">
              {telemetry.jobsAnalyzedToday}
            </span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter block mt-0.5">
              Analyzed Today
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
            <span className="text-base sm:text-lg font-black text-emerald-700 block leading-tight">
              {telemetry.strongMatches}
            </span>
            <span className="text-[10px] font-medium text-emerald-800 uppercase tracking-tighter block mt-0.5">
              Strong Matches
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-200/60">
            <span className="text-base sm:text-lg font-black text-indigo-700 block leading-tight">
              {telemetry.newRecommendations}
            </span>
            <span className="text-[10px] font-medium text-indigo-800 uppercase tracking-tighter block mt-0.5">
              New Recs
            </span>
          </div>
        </div>

        {/* Refresh Action */}
        <div className="pt-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            leftIcon={
              <RefreshCw
                className={`w-3.5 h-3.5 text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`}
              />
            }
            className="w-full justify-center text-xs font-semibold"
          >
            {isRefreshing ? 'Refreshing Agent...' : 'Refresh'}
          </Button>
        </div>

        {/* Subtle Disclaimer */}
        <p className="text-[10px] text-slate-400 text-center leading-tight">
          Simulated demo agent activity reflecting batch scoring telemetry.
        </p>
      </div>
    </Card>
  )
}
