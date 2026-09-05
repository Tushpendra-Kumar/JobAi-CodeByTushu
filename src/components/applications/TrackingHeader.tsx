import React from 'react'
import { Plus, Sparkles, Briefcase, Bell } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface TrackingHeaderProps {
  totalCount: number
  activeFollowUpsCount: number
  onAddApplication: () => void
  onOpenAiInsights: () => void
  onOpenFollowUps?: () => void
}

export const TrackingHeader: React.FC<TrackingHeaderProps> = ({
  totalCount,
  activeFollowUpsCount,
  onAddApplication,
  onOpenAiInsights,
}) => {
  return (
    <header className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title & Metadata */}
        <div>
          <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Briefcase className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Application Tracking
            </h1>
            <Badge variant="indigo" size="sm">
              Career Pipeline
            </Badge>
            <Badge variant="slate" size="sm">
              {totalCount} {totalCount === 1 ? 'Opportunity' : 'Opportunities'}
            </Badge>
            {activeFollowUpsCount > 0 && (
              <Badge variant="amber" size="sm" className="flex items-center gap-1">
                <Bell className="w-3 h-3 text-amber-600" />
                {activeFollowUpsCount} Action Due
              </Badge>
            )}
          </div>
          <p className="text-sm sm:text-base text-slate-600">
            Track every opportunity from application to offer in one place.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <Button
            variant="outline"
            size="md"
            onClick={onOpenAiInsights}
            className="flex items-center gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50/60 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI Insights</span>
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={onAddApplication}
            className="flex items-center gap-2 shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
