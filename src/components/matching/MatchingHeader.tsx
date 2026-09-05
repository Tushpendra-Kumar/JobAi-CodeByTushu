import { RefreshCw, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export interface MatchingHeaderProps {
  onRefresh: () => void
  isRefreshing?: boolean
}

export const MatchingHeader: React.FC<MatchingHeaderProps> = ({
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
      {/* Title and Subtitle */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            AI Job Recommendations
          </h1>

          {/* AI Status Indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>AI Matching Active</span>
          </div>

          <Badge variant="indigo" size="sm" className="hidden sm:inline-flex py-0.5 px-2 text-[10px] font-medium bg-indigo-50 text-indigo-700 border-indigo-200">
            Powered by CodeByTushu
          </Badge>
        </div>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Discover opportunities ranked by how well they match your skills, experience and career goals.
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pt-0.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Your profile was last analyzed today.</span>
        </div>
      </div>

      {/* Refresh Action */}
      <div className="flex items-center gap-3 shrink-0">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onRefresh}
          disabled={isRefreshing}
          leftIcon={
            <RefreshCw
              className={`w-4 h-4 text-indigo-600 ${isRefreshing ? 'animate-spin' : ''}`}
            />
          }
          className="border-slate-200 hover:border-slate-300 shadow-2xs font-semibold text-xs sm:text-sm text-slate-700"
        >
          {isRefreshing ? 'Analyzing...' : 'Refresh Recommendations'}
        </Button>
      </div>
    </div>
  )
}
