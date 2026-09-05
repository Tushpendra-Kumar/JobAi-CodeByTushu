import React from 'react'
import {
  Briefcase,
  Search,
  Sparkles,
  ArrowRight,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface TrackingEmptyStateProps {
  isFilteredEmpty?: boolean
  onResetFilters?: () => void
  onNavigateToJobs: () => void
  onNavigateToAutoApply: () => void
  onAddApplication: () => void
}

export const TrackingEmptyState: React.FC<TrackingEmptyStateProps> = ({
  isFilteredEmpty = false,
  onResetFilters,
  onNavigateToJobs,
  onNavigateToAutoApply,
  onAddApplication,
}) => {
  if (isFilteredEmpty) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 sm:p-12 text-center shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
          <Search className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          No Applications Match Your Filters
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          Try clearing your search query or selecting a different pipeline stage to inspect your opportunities.
        </p>
        <div className="flex items-center justify-center gap-3">
          {onResetFilters && (
            <Button variant="outline" size="sm" onClick={onResetFilters}>
              Reset Filters
            </Button>
          )}
          <Button variant="primary" size="sm" onClick={onAddApplication}>
            Add Application
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-8 sm:p-12 shadow-sm text-center">
      {/* Icon */}
      <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 shadow-xs">
        <Briefcase className="w-8 h-8" />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        No Applications Yet
      </h2>
      <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-8">
        Your application pipeline will appear here once you start preparing or recording applications.
      </p>

      {/* 3-Step First-Time User Experience */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
            1
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            Find Matching Jobs
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Discover roles with 85%+ AI match scores tailored to your profile.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
            2
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            Prepare with AI
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Generate truthful cover letters and interview answers in Auto Apply.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
            3
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            Track Progress
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Manage stages from Screening and Interviews to Final Offers.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={onNavigateToJobs}
          className="flex items-center gap-2 shadow-sm shadow-indigo-200"
        >
          <Search className="w-4 h-4" />
          <span>Find Jobs</span>
          <ArrowRight className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="md"
          onClick={onNavigateToAutoApply}
          className="flex items-center gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>AI Auto Apply</span>
        </Button>

        <Button
          variant="ghost"
          size="md"
          onClick={onAddApplication}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
        >
          <Plus className="w-4 h-4" />
          <span>Add Manually</span>
        </Button>
      </div>
    </div>
  )
}
