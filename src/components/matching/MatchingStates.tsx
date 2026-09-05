import { RefreshCw, AlertCircle, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/**
 * Shimmering skeleton loader for AI matching cards and panels
 */
export const MatchingSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-200" />
              <div className="space-y-2">
                <div className="w-48 h-5 rounded-md bg-slate-200" />
                <div className="w-32 h-3.5 rounded-md bg-slate-200" />
              </div>
            </div>
            <div className="w-24 h-7 rounded-xl bg-slate-200" />
          </div>

          <div className="flex gap-2">
            <div className="w-20 h-6 rounded-lg bg-slate-200" />
            <div className="w-20 h-6 rounded-lg bg-slate-200" />
            <div className="w-24 h-6 rounded-lg bg-slate-200" />
          </div>

          <div className="w-full h-14 rounded-xl bg-slate-100" />

          <div className="flex gap-2">
            <div className="w-16 h-6 rounded-md bg-slate-200" />
            <div className="w-20 h-6 rounded-md bg-slate-200" />
            <div className="w-16 h-6 rounded-md bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  )
}

export interface MatchingEmptyStateProps {
  onUpdateProfile: () => void
  onResetFilters: () => void
}

export const MatchingEmptyState: React.FC<MatchingEmptyStateProps> = ({
  onUpdateProfile,
  onResetFilters,
}) => {
  return (
    <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center space-y-4 max-w-xl mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
        <SearchX className="w-7 h-7" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl font-bold text-slate-900">
          No strong matches yet
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Add more skills or update your career preferences to improve your recommendations.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onUpdateProfile}
          className="w-full sm:w-auto font-bold text-xs bg-indigo-600 hover:bg-indigo-700"
        >
          Update Profile
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onResetFilters}
          className="w-full sm:w-auto font-semibold text-xs text-slate-600"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
}

export interface MatchingErrorStateProps {
  onRetry: () => void
}

export const MatchingErrorState: React.FC<MatchingErrorStateProps> = ({
  onRetry,
}) => {
  return (
    <div className="p-8 sm:p-12 rounded-2xl bg-rose-50/40 border border-rose-200/80 shadow-sm text-center space-y-4 max-w-xl mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
        <AlertCircle className="w-7 h-7" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl font-bold text-slate-900">
          AI recommendations are temporarily unavailable.
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Our recommendation pipeline encountered a temporary communication glitch. Try refreshing the ranking engine.
        </p>
      </div>

      <div className="pt-2">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
          className="font-bold text-xs bg-rose-600 hover:bg-rose-700 shadow-sm"
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}
