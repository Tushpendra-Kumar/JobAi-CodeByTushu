import React, { useState } from 'react'
import {
  Search,
  X,
  SlidersHorizontal,
  Kanban,
  List,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { NormalizedPipelineStage } from '@/services/applicationTrackingService'

export type TrackingViewMode = 'board' | 'list'

export interface TrackingFilterCriteria {
  searchQuery: string
  stage: NormalizedPipelineStage | 'All'
  minScore?: number
  workMode?: string
  dateRange?: 'all' | 'today' | '7days' | '30days'
  resumeVersionId?: string
  sortBy:
    | 'recently-updated'
    | 'recently-applied'
    | 'highest-match'
    | 'lowest-match'
    | 'job-title'
    | 'company'
    | 'next-action'
}

interface TrackingFilterBarProps {
  filters: TrackingFilterCriteria
  onFilterChange: (filters: TrackingFilterCriteria) => void
  onResetFilters: () => void
  viewMode: TrackingViewMode
  onViewModeChange: (mode: TrackingViewMode) => void
  totalFilteredCount: number
  availableResumeVersions?: { id: string; name: string }[]
}

export const TrackingFilterBar: React.FC<TrackingFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  viewMode,
  onViewModeChange,
  totalFilteredCount,
  availableResumeVersions = [],
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const activeFiltersCount =
    (filters.searchQuery ? 1 : 0) +
    (filters.stage !== 'All' ? 1 : 0) +
    (filters.minScore ? 1 : 0) +
    (filters.workMode ? 1 : 0) +
    (filters.dateRange && filters.dateRange !== 'all' ? 1 : 0) +
    (filters.resumeVersionId ? 1 : 0)

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-3">
      {/* Top Row: Search Input + View Mode Toggle + Mobile Filter Trigger */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input with Clear Icon */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search applications by role, company, location, skills..."
            value={filters.searchQuery}
            onChange={(e) =>
              onFilterChange({ ...filters, searchQuery: e.target.value })
            }
            className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode Switcher (Board vs List) & Mobile Filter Button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => onViewModeChange('board')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'board'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="Kanban Board View"
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Board</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="List Table View"
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="sm:hidden flex items-center gap-1.5 text-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 bg-indigo-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Desktop Filter Row (Hidden on mobile unless expanded) */}
      <div
        className={`${
          isMobileFilterOpen ? 'block' : 'hidden'
        } sm:flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100`}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Match Score Filter */}
          <select
            value={filters.minScore || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                minScore: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            aria-label="Filter by Match Score"
          >
            <option value="">Match: Any</option>
            <option value="90">Match: 90%+</option>
            <option value="80">Match: 80%+</option>
          </select>

          {/* Work Mode Filter */}
          <select
            value={filters.workMode || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                workMode: e.target.value || undefined,
              })
            }
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            aria-label="Filter by Work Mode"
          >
            <option value="">Mode: All</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          {/* Date Filter */}
          <select
            value={filters.dateRange || 'all'}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                dateRange: e.target.value as TrackingFilterCriteria['dateRange'],
              })
            }
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            aria-label="Filter by Date"
          >
            <option value="all">Date: All</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
          </select>

          {/* Resume Version Filter */}
          {availableResumeVersions.length > 0 && (
            <select
              value={filters.resumeVersionId || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  resumeVersionId: e.target.value || undefined,
                })
              }
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-none max-w-[150px] truncate"
              aria-label="Filter by Resume Version"
            >
              <option value="">Resume: All</option>
              {availableResumeVersions.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          )}

          {/* Clear Filters CTA */}
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors ml-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right Sort Controls */}
        <div className="flex items-center gap-2 text-xs self-end sm:self-auto">
          <span className="text-slate-400 font-medium">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                sortBy: e.target.value as TrackingFilterCriteria['sortBy'],
              })
            }
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-semibold focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            aria-label="Sort applications"
          >
            <option value="recently-updated">Recently Updated</option>
            <option value="recently-applied">Recently Applied</option>
            <option value="highest-match">Highest Match %</option>
            <option value="lowest-match">Lowest Match %</option>
            <option value="job-title">Job Title (A-Z)</option>
            <option value="company">Company (A-Z)</option>
            <option value="next-action">Next Action Due</option>
          </select>

          <span className="text-slate-400 text-xs hidden sm:inline">
            ({totalFilteredCount} shown)
          </span>
        </div>
      </div>
    </div>
  )
}
