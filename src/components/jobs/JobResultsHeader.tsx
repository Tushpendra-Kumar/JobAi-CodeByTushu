import React from 'react'
import { LayoutList, LayoutGrid, ArrowUpDown, SlidersHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export type SortOption = 'best' | 'recent' | 'salary-desc' | 'salary-asc'
export type ViewMode = 'list' | 'grid'

export interface JobResultsHeaderProps {
  totalCount: number
  filteredCount: number
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onOpenMobileFilters: () => void
  activeFilterCount: number
}

export const JobResultsHeader: React.FC<JobResultsHeaderProps> = ({
  filteredCount,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenMobileFilters,
  activeFilterCount,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 mb-6">
      {/* Left: Result Count & AI Ranking Subtitle */}
      <div className="text-left">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {filteredCount.toLocaleString()} {filteredCount === 1 ? 'job' : 'jobs'} found
          </h2>
          <Badge variant="indigo" size="sm" className="hidden sm:inline-flex text-[10px]">
            AI Verified
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          AI-ranked opportunities based on your profile
        </p>
      </div>

      {/* Right: Mobile Filter Button + Sort Dropdown + View Switcher */}
      <div className="flex items-center justify-between sm:justify-end gap-2.5">
        {/* Mobile Filter Trigger */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort Dropdown */}
        <div className="relative flex items-center">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Sort jobs by"
            className="text-xs font-semibold rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-8 text-slate-700 hover:border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer appearance-none shadow-xs"
          >
            <option value="best">Best Match</option>
            <option value="recent">Most Recent</option>
            <option value="salary-desc">Salary: High to Low</option>
            <option value="salary-asc">Salary: Low to High</option>
          </select>
          <div className="pointer-events-none absolute right-2.5 flex items-center text-slate-400">
            <span className="text-[9px]">▼</span>
          </div>
        </div>

        {/* View Switcher: List View vs Grid View */}
        <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            aria-label="Switch to list view"
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <LayoutList className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            aria-label="Switch to grid view"
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
