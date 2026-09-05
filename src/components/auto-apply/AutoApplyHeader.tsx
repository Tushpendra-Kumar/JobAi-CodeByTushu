import React from 'react'
import { Play, History, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface AutoApplyHeaderProps {
  onStartAutoApply: () => void
  onViewHistory: () => void
  isShowingHistory: boolean
  appliedCount: number
}

export const AutoApplyHeader: React.FC<AutoApplyHeaderProps> = ({
  onStartAutoApply,
  onViewHistory,
  isShowingHistory,
  appliedCount,
}) => {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left Title & Status Badges */}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                AI Auto Apply
              </h1>
              <Badge variant="indigo" size="sm" dot>
                AI-Powered
              </Badge>
              <Badge variant="emerald" size="sm">
                Human-in-the-Loop
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Prepare and manage personalized job applications with AI-powered assistance.
            </p>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              variant={isShowingHistory ? 'primary' : 'secondary'}
              size="sm"
              onClick={onViewHistory}
              leftIcon={<History className="w-3.5 h-3.5" />}
              className="text-xs font-semibold"
            >
              Application History {appliedCount > 0 && `(${appliedCount})`}
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={onStartAutoApply}
              leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
              className="text-xs font-semibold shadow-xs"
            >
              Start Auto Apply
            </Button>
          </div>
        </div>

        {/* Informational Safety Note */}
        <div className="mt-3.5 py-2 px-3 rounded-xl bg-indigo-50/70 border border-indigo-100/80 flex items-center justify-between text-[11px] text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <strong className="font-semibold text-indigo-950">Safety Guarantee: </strong>
              JobAI prepares your applications automatically, but you review and approve every submission before recording.
            </span>
          </div>
          <span className="hidden sm:inline text-indigo-600 font-medium text-[10px] uppercase tracking-wider">
            Zero Unauthorized Submissions
          </span>
        </div>
      </div>
    </header>
  )
}
