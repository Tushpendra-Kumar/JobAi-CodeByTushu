import React from 'react'
import { AlertCircle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface JobErrorStateProps {
  onRetry: () => void
  errorMessage?: string
}

export const JobErrorState: React.FC<JobErrorStateProps> = ({
  onRetry,
  errorMessage = "We couldn't load jobs right now.",
}) => {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-10 text-center max-w-md mx-auto space-y-4 my-8">
      <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
        <AlertCircle className="w-7 h-7" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-rose-950">
          Sync Connection Error
        </h3>
        <p className="text-xs text-rose-800/80 leading-relaxed">
          {errorMessage}
        </p>
      </div>

      <div className="pt-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onRetry}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          className="text-xs border-rose-200 text-rose-800 hover:bg-rose-100"
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}
