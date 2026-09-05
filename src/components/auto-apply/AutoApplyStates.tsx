import React from 'react'
import { Sparkles, FileText, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface EmptyJobsStateProps {
  onNavigateToJobs: () => void
  onResetFilters?: () => void
}

export const EmptyJobsState: React.FC<EmptyJobsStateProps> = ({
  onNavigateToJobs,
  onResetFilters,
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-xs">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
        <Search className="w-6 h-6" />
      </div>

      <div className="space-y-1.5 max-w-md mx-auto">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          No Jobs Match Current Auto Apply Filters
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Find more opportunities in our job catalog or adjust your match threshold to populate your
          application queue.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
        {onResetFilters && (
          <Button variant="secondary" size="sm" onClick={onResetFilters} className="text-xs">
            Reset Filters
          </Button>
        )}
        <Button
          variant="primary"
          size="sm"
          onClick={onNavigateToJobs}
          leftIcon={<Search className="w-3.5 h-3.5" />}
          className="text-xs font-semibold"
        >
          Discover Jobs in Catalog
        </Button>
      </div>
    </div>
  )
}

interface ResumeRequiredStateProps {
  onNavigateToResumeBuilder: () => void
  onNavigateToResumeUpload: () => void
}

export const ResumeRequiredState: React.FC<ResumeRequiredStateProps> = ({
  onNavigateToResumeBuilder,
  onNavigateToResumeUpload,
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-xs">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
        <FileText className="w-6 h-6" />
      </div>

      <div className="space-y-1.5 max-w-md mx-auto">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Resume Profile Required for Auto Apply
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          JobAI requires a verified resume profile to tailor applications and generate authentic
          cover letters without hallucination.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
        <Button
          variant="primary"
          size="sm"
          onClick={onNavigateToResumeBuilder}
          leftIcon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
          className="text-xs font-semibold"
        >
          Open AI Resume Builder
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onNavigateToResumeUpload}
          className="text-xs font-medium"
        >
          Upload Resume PDF
        </Button>
      </div>
    </div>
  )
}
