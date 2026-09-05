import React from 'react'
import { Briefcase, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { ApplicationMetrics } from '@/services/applicationInsightsService'

interface ApplicationPerformanceSectionProps {
  metrics: ApplicationMetrics
  statusDistribution: { stage: string; count: number; color: string }[]
  onNavigateToApplications: (stage?: string) => void
}

export const ApplicationPerformanceSection: React.FC<ApplicationPerformanceSectionProps> = ({
  metrics,
  statusDistribution,
  onNavigateToApplications,
}) => {
  if (!metrics.hasEnoughData) {
    return (
      <Card className="p-6 bg-white border-slate-200/80 shadow-xs text-center space-y-3">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Briefcase className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold text-slate-800">Application History Pending</div>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Track active applications through the Application Tracking Dashboard to unlock conversion benchmarks and response rates.
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onNavigateToApplications()}
          className="text-xs"
        >
          Open Application Tracker
        </Button>
      </Card>
    )
  }

  const statCards = [
    { label: 'Total Tracked', value: metrics.totalApplications, sub: 'In pipeline' },
    { label: 'Response Rate', value: `${metrics.responseRate}%`, sub: 'Recruiter replies' },
    { label: 'Interview Rate', value: `${metrics.interviewRate}%`, sub: 'Screening to interview' },
    { label: 'Offer Yield', value: `${metrics.offerRate}%`, sub: 'Offers generated' },
    { label: 'Average Match', value: `${metrics.averageMatchScore}%`, sub: 'Job alignment' },
    { label: 'Avg Response', value: metrics.averageTimeToResponse, sub: 'Calendar days' },
  ]

  return (
    <Card className="p-5 bg-white border-slate-200/80 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Application Performance</h2>
              <Badge variant="indigo" size="sm">
                Pipeline Health
              </Badge>
              <Badge variant="slate" size="sm">
                Local Demo Records
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Evaluates conversion velocity and interview yields across your active career pipeline
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onNavigateToApplications()}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="text-xs h-8"
        >
          Manage in Tracker
        </Button>
      </div>

      {/* 6 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((st) => (
          <div
            key={st.label}
            className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-1"
          >
            <div className="text-[11px] font-medium text-slate-500 line-clamp-1">{st.label}</div>
            <div className="text-xl font-bold text-slate-900">{st.value}</div>
            <div className="text-[10px] text-slate-400">{st.sub}</div>
          </div>
        ))}
      </div>

      {/* Pipeline Status Distribution Breakdown Bar */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Application Pipeline Distribution (Click stage to filter tracker)</span>
          <span className="text-[11px] text-slate-400">
            {metrics.totalApplications} opportunities
          </span>
        </div>

        {/* Visual Progress Segments */}
        <div className="flex h-3 w-full rounded-full overflow-hidden bg-slate-100 p-0.5 gap-0.5">
          {statusDistribution.map((item) => {
            const widthPct = Math.max(0, (item.count / Math.max(1, metrics.totalApplications)) * 100)
            if (item.count === 0) return null
            return (
              <div
                key={item.stage}
                className={`h-full ${item.color} rounded-sm transition-all duration-500 cursor-pointer hover:opacity-85`}
                style={{ width: `${widthPct}%` }}
                title={`${item.stage}: ${item.count}`}
                onClick={() => onNavigateToApplications(item.stage)}
              />
            )
          })}
        </div>

        {/* Stage Legend Pills with Counts */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {statusDistribution.map((item) => (
            <button
              key={item.stage}
              type="button"
              onClick={() => onNavigateToApplications(item.stage)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/70 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span>{item.stage}</span>
              <span className="font-bold text-slate-800 ml-0.5">{item.count}</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  )
}
