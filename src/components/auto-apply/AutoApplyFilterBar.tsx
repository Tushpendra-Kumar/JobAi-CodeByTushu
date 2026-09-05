import React, { useState } from 'react'
import { Filter, SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react'

export type AutoApplySortOption = 'best' | 'highest-match' | 'newest' | 'readiness'

export interface AutoApplyFilters {
  minScore?: number
  role?: string
  workMode?: string
  experience?: string
  readiness?: string
  searchQuery?: string
}

interface AutoApplyFilterBarProps {
  filters: AutoApplyFilters
  onChangeFilters: (newFilters: AutoApplyFilters) => void
  sortBy: AutoApplySortOption
  onChangeSortBy: (newSort: AutoApplySortOption) => void
  totalCount: number
  onResetFilters: () => void
}

export const AutoApplyFilterBar: React.FC<AutoApplyFilterBarProps> = ({
  filters,
  onChangeFilters,
  sortBy,
  onChangeSortBy,
  totalCount,
  onResetFilters,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const scoreOptions = [
    { label: 'All Scores', value: undefined },
    { label: '80%+ Match', value: 80 },
    { label: '85%+ Match', value: 85 },
    { label: '90%+ Match', value: 90 },
  ]

  const hasActiveFilters =
    Boolean(filters.minScore) ||
    Boolean(filters.workMode) ||
    Boolean(filters.experience) ||
    Boolean(filters.searchQuery)

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs space-y-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Search input & quick score chips */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Score Chips */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl">
            {scoreOptions.map((opt) => {
              const isSelected = filters.minScore === opt.value
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => onChangeFilters({ ...filters, minScore: opt.value })}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>

          {/* Quick Work Mode dropdown */}
          <select
            value={filters.workMode || ''}
            onChange={(e) =>
              onChangeFilters({ ...filters, workMode: e.target.value || undefined })
            }
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer hidden sm:block"
          >
            <option value="">All Work Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          {/* Quick Experience dropdown */}
          <select
            value={filters.experience || ''}
            onChange={(e) =>
              onChangeFilters({ ...filters, experience: e.target.value || undefined })
            }
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer hidden md:block"
          >
            <option value="">All Experience</option>
            <option value="Fresher">Fresher</option>
            <option value="1–3 years">1–3 years</option>
            <option value="3–5 years">3–5 years</option>
          </select>

          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="sm:hidden px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
            <span>More Filters</span>
          </button>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 cursor-pointer ml-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Sort controls & Result count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
          <span className="text-xs text-slate-500 font-medium">
            <strong className="text-slate-900 font-bold">{totalCount}</strong> jobs ready
          </span>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onChangeSortBy(e.target.value as AutoApplySortOption)}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="best">Best Match First</option>
              <option value="highest-match">Highest Match Score</option>
              <option value="readiness">Application Readiness</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-full bg-white rounded-t-2xl p-5 space-y-4 shadow-xl z-10 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-indigo-600" />
                <span>Filter Application Queue</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Mode
                </label>
                <select
                  value={filters.workMode || ''}
                  onChange={(e) =>
                    onChangeFilters({ ...filters, workMode: e.target.value || undefined })
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="">All Work Modes</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Experience Level
                </label>
                <select
                  value={filters.experience || ''}
                  onChange={(e) =>
                    onChangeFilters({ ...filters, experience: e.target.value || undefined })
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="">All Experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1–3 years">1–3 years</option>
                  <option value="3–5 years">3–5 years</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onResetFilters()
                  setMobileFilterOpen(false)
                }}
                className="flex-1 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
