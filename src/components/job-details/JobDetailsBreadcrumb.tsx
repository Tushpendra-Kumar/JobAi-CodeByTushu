import React from 'react'
import { ChevronRight, ArrowLeft } from 'lucide-react'

export interface JobDetailsBreadcrumbProps {
  jobTitle: string
  onBackToJobs: () => void
}

export const JobDetailsBreadcrumb: React.FC<JobDetailsBreadcrumbProps> = ({
  jobTitle,
  onBackToJobs,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-slate-200/80 mb-6">
      {/* Breadcrumb Path */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
        <button
          type="button"
          onClick={onBackToJobs}
          className="hover:text-indigo-600 transition-colors font-medium cursor-pointer"
        >
          Jobs
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          type="button"
          onClick={onBackToJobs}
          className="hover:text-indigo-600 transition-colors font-medium cursor-pointer"
        >
          Search Results
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900 truncate max-w-xs">
          {jobTitle}
        </span>
      </nav>

      {/* Back Button */}
      <button
        type="button"
        onClick={onBackToJobs}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer self-start sm:self-auto"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Search Results</span>
      </button>
    </div>
  )
}
