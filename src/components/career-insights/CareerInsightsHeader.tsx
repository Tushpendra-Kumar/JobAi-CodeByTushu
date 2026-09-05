import React from 'react'
import { Sparkles, RefreshCw, ShieldCheck, Compass, UserCheck, Target } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { CareerGoal } from '@/services/careerInsightsService'

interface CareerInsightsHeaderProps {
  careerGoal: CareerGoal
  onRefresh: () => void
  isRefreshing: boolean
  onOpenGoalModal: () => void
  onNavigateToRecommendations: () => void
  onNavigateToProfile: () => void
}

export const CareerInsightsHeader: React.FC<CareerInsightsHeaderProps> = ({
  careerGoal,
  onRefresh,
  isRefreshing,
  onOpenGoalModal,
  onNavigateToRecommendations,
  onNavigateToProfile,
}) => {
  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Truthfulness Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 pb-1 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-700">JobAI Platform</span>
          <span>/</span>
          <span className="text-indigo-600 font-semibold">AI Career Insights Dashboard</span>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-500 font-medium">Powered by CodeByTushu</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Strictly Grounded in Your Verified Profile & Active Activity</span>
        </div>
      </div>

      {/* Main Header Title & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              AI Career Insights
            </h1>
            <Badge variant="indigo" size="sm" dot>
              AI Career Intelligence
            </Badge>
            <Badge variant="purple" size="sm">
              Target: {careerGoal.targetRole}
            </Badge>
          </div>
          <p className="text-sm text-slate-600 max-w-2xl">
            Understand your strengths, identify skill gaps, and make smarter career decisions with AI
            grounded in your actual resume, applications, and job matches.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenGoalModal}
            leftIcon={<Target className="w-4 h-4 text-indigo-600" />}
            className="text-xs h-9"
          >
            Career Goal: <strong className="ml-1 text-slate-900">{careerGoal.targetRole}</strong>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onRefresh}
            isLoading={isRefreshing}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />}
            className="text-xs h-9"
            title="Recalculate insights using latest profile and application data"
          >
            Refresh Insights
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onNavigateToProfile}
            leftIcon={<UserCheck className="w-4 h-4 text-slate-600" />}
            className="text-xs h-9"
          >
            Analyze Profile
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onNavigateToRecommendations}
            leftIcon={<Compass className="w-4 h-4 text-indigo-100" />}
            className="text-xs h-9 shadow-sm"
          >
            Get Career Recommendations
          </Button>
        </div>
      </div>

      {/* Data Source Footnote */}
      <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-200/60">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
        <span>
          Insights are dynamically synthesized from your verified JobAI profile, parsed resume,
          active catalog job matches, and application pipeline history.
        </span>
      </div>
    </div>
  )
}
