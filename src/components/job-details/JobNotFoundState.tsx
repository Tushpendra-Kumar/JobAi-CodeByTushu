import React from 'react'
import { SearchX, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface JobNotFoundStateProps {
  onBackToSearch: () => void
}

export const JobNotFoundState: React.FC<JobNotFoundStateProps> = ({
  onBackToSearch,
}) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 sm:p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
          <SearchX className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Job Not Found
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            This opportunity may no longer be available or the link may be outdated.
          </p>
        </div>

        <div className="pt-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onBackToSearch}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="text-xs"
          >
            Back to Job Search
          </Button>
        </div>
      </div>
    </div>
  )
}
