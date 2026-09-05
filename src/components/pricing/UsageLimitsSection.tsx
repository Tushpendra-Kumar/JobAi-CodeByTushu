import React from 'react'
import {
  AlertTriangle,
  FileText,
  Search,
  Bookmark,
  FileSignature,
  ArrowUpRight,
} from 'lucide-react'
import { type PlanId } from '@/config/pricingConfig'
import { type UsageTelemetry } from '@/services/subscriptionService'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export interface UsageLimitsSectionProps {
  currentPlanId: PlanId
  usageTelemetry: UsageTelemetry
  onOpenUpgradeModal: (planId: PlanId) => void
  onSimulateLimitReached: () => void
}

export const UsageLimitsSection: React.FC<UsageLimitsSectionProps> = ({
  currentPlanId,
  usageTelemetry,
  onOpenUpgradeModal,
  onSimulateLimitReached,
}) => {
  const getProgressColor = (percentage: number, isExceeded: boolean) => {
    if (isExceeded || percentage >= 90) return 'bg-rose-500'
    if (percentage >= 70) return 'bg-amber-500'
    return 'bg-gradient-to-r from-indigo-500 to-violet-600'
  }

  const usageCards = [
    {
      title: 'AI Job Analyses',
      item: usageTelemetry.jobAnalyses,
      icon: Search,
      helper: 'Deconstructing tech stacks & keywords',
    },
    {
      title: 'ATS Resume Audits',
      item: usageTelemetry.resumeAnalyses,
      icon: FileText,
      helper: 'Full multi-dimensional scoring audits',
    },
    {
      title: 'AI Cover Letters',
      item: usageTelemetry.coverLetters,
      icon: FileSignature,
      helper: 'Role-targeted generated letters',
    },
    {
      title: 'Saved Opportunities',
      item: usageTelemetry.savedJobs,
      icon: Bookmark,
      helper: 'Active bookmarked job slots',
    },
  ]

  return (
    <div className="mt-16 bg-gradient-to-b from-slate-50 to-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="indigo" size="sm" className="font-semibold uppercase tracking-wider">
              Live Demo Telemetry
            </Badge>
            <span className="text-xs text-slate-500 font-mono">Resets on the 1st</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
            Your Monthly Usage & Plan Capacity
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Track your consumption against current plan limits. Upgrade at any time if your job search
            demands higher analysis and preparation capacity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onSimulateLimitReached}
            className="text-xs cursor-pointer"
            leftIcon={<AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
          >
            Simulate Limit State
          </Button>

          {currentPlanId !== 'automation' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onOpenUpgradeModal(currentPlanId === 'free' ? 'pro' : 'automation')}
              className="cursor-pointer"
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
            >
              Increase Limits
            </Button>
          )}
        </div>
      </div>

      {/* Usage Progress Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {usageCards.map((card) => {
          const Icon = card.icon
          const item = card.item
          const percent = item.percentage

          return (
            <div
              key={item.key}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{card.title}</span>
                </div>
                <span className="text-xs font-semibold font-mono text-slate-500">
                  {percent}%
                </span>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {item.used}{' '}
                  <span className="text-xs font-semibold text-slate-400 font-sans">
                    / {item.limit} {item.unit}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
                    percent,
                    item.isExceeded
                  )}`}
                  style={{ width: `${Math.min(100, percent)}%` }}
                />
              </div>

              <p className="mt-2.5 text-[11px] text-slate-500 leading-tight">
                {card.helper}
              </p>
            </div>
          )
        })}
      </div>

      {/* Current Plan Status Banner */}
      <div className="mt-8 p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-indigo-950">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            You are currently on the{' '}
            <strong className="uppercase font-bold tracking-wide">
              {currentPlanId} Plan
            </strong>
            . Unlimited basic job searching and manual pipeline management remain available regardless of AI limits.
          </span>
        </div>
        <div className="text-indigo-600 font-medium whitespace-nowrap">
          Deterministic quota resets every 30 days
        </div>
      </div>
    </div>
  )
}
