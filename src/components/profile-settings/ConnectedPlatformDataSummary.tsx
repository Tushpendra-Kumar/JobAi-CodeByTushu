import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  FileText,
  Bookmark,
  Briefcase,
  FileSignature,
  Compass,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import type { ConnectedPlatformStats } from '@/services/profileSettingsService'

interface ConnectedPlatformDataSummaryProps {
  stats: ConnectedPlatformStats
  onNavigateToJobs: () => void
  onNavigateToMatching: () => void
  onNavigateToResume: () => void
  onNavigateToCoverLetter: () => void
  onNavigateToApplications: () => void
  onNavigateToInsights: () => void
}

export const ConnectedPlatformDataSummary: React.FC<ConnectedPlatformDataSummaryProps> = ({
  stats,
  onNavigateToJobs,
  onNavigateToMatching,
  onNavigateToResume,
  onNavigateToCoverLetter,
  onNavigateToApplications,
  onNavigateToInsights,
}) => {
  const cards = [
    {
      title: 'Active Resumes',
      count: stats.resumesCount,
      icon: FileText,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200/70',
      action: onNavigateToResume,
      actionLabel: 'Resume Hub',
    },
    {
      title: 'Saved Jobs',
      count: stats.savedJobsCount,
      icon: Bookmark,
      color: 'text-amber-600 bg-amber-50 border-amber-200/70',
      action: onNavigateToJobs,
      actionLabel: 'View Jobs',
    },
    {
      title: 'Tracked Applications',
      count: stats.applicationsCount,
      icon: Briefcase,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/70',
      action: onNavigateToApplications,
      actionLabel: 'Kanban Board',
    },
    {
      title: 'Cover Letter Drafts',
      count: stats.coverLettersCount,
      icon: FileSignature,
      color: 'text-purple-600 bg-purple-50 border-purple-200/70',
      action: onNavigateToCoverLetter,
      actionLabel: 'Cover Letters',
    },
    {
      title: 'High-Match Opportunities',
      count: stats.matchedJobsCount,
      icon: Sparkles,
      color: 'text-sky-600 bg-sky-50 border-sky-200/70',
      action: onNavigateToMatching,
      actionLabel: 'AI Matching',
    },
    {
      title: 'Career Trajectory Reports',
      count: stats.aiAnalysesCount,
      icon: Compass,
      color: 'text-rose-600 bg-rose-50 border-rose-200/70',
      action: onNavigateToInsights,
      actionLabel: 'Insights',
    },
  ]

  return (
    <Card className="p-6 border-slate-200/90 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Connected JobAI Assets</h3>
            <Badge variant="emerald" size="sm" dot>
              Live Telemetry
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time synchronization across all your active JobAI modules and stored documents.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              onClick={item.action}
              className="p-3.5 rounded-xl border border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.count}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 leading-tight">
                    {item.title}
                  </div>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-indigo-600 group-hover:text-indigo-800">
                <span>{item.actionLabel}</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
