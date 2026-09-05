import React from 'react'
import { SearchX, RotateCcw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface JobEmptyStateProps {
  onResetFilters: () => void
  query?: string
}

export const JobEmptyState: React.FC<JobEmptyStateProps> = ({
  onResetFilters,
  query,
}) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center max-w-xl mx-auto space-y-4 my-8">
      <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
        <SearchX className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl font-bold text-slate-900">
          No jobs match your current search
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          {query ? (
            <>
              No results found for <strong className="text-slate-700 font-semibold">"{query}"</strong> with the active filter combination.
            </>
          ) : (
            'Try adjusting your keywords, expanding your salary range, or removing specific filter tags.'
          )}
        </p>
      </div>

      <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onResetFilters}
          leftIcon={<RotateCcw className="w-4 h-4" />}
          className="text-xs"
        >
          Clear Filters
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onResetFilters}
          leftIcon={<Sparkles className="w-4 h-4" />}
          className="text-xs"
        >
          Show All Opportunities
        </Button>
      </div>
    </div>
  )
}
