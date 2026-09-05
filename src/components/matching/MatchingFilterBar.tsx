import React, { useState } from 'react'
import {
  SlidersHorizontal,
  RotateCcw,
  ArrowUpDown,
  Check,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { MatchFilterCriteria, MatchSortOption } from '@/services/matchingService'

export interface MatchingFilterBarProps {
  filters: MatchFilterCriteria
  onFilterChange: (newFilters: MatchFilterCriteria) => void
  onResetFilters: () => void
  sortBy: MatchSortOption
  onSortChange: (sort: MatchSortOption) => void
  totalCount: number
}

export const MatchingFilterBar: React.FC<MatchingFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  sortBy,
  onSortChange,
  totalCount,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const scoreOptions = [
    { label: 'All Matches', value: 0 },
    { label: '80%+', value: 80 },
    { label: '85%+', value: 85 },
    { label: '90%+', value: 90 },
    { label: '95%+', value: 95 },
  ]

  const roleOptions = [
    'Frontend Developer',
    'Full Stack Developer',
    'AI Developer',
    'Software Developer',
    'Backend Developer',
    'DevOps Engineer',
  ]

  const workModeOptions = ['Remote', 'Hybrid', 'On-site']

  const locationOptions = ['Noida', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Remote']

  const experienceOptions = ['Fresher', '1–3 years', '3–5 years']

  const sortOptions: { label: string; value: MatchSortOption }[] = [
    { label: 'Best Match', value: 'best' },
    { label: 'Most Relevant', value: 'relevant' },
    { label: 'Newest', value: 'newest' },
    { label: 'Highest Salary', value: 'salary' },
    { label: 'Career Growth', value: 'growth' },
  ]

  const toggleRole = (role: string) => {
    const next = filters.roles.includes(role)
      ? filters.roles.filter((r) => r !== role)
      : [...filters.roles, role]
    onFilterChange({ ...filters, roles: next })
  }

  const toggleWorkMode = (mode: string) => {
    const next = filters.workModes.includes(mode)
      ? filters.workModes.filter((m) => m !== mode)
      : [...filters.workModes, mode]
    onFilterChange({ ...filters, workModes: next })
  }

  const toggleLocation = (loc: string) => {
    const next = filters.locations.includes(loc)
      ? filters.locations.filter((l) => l !== loc)
      : [...filters.locations, loc]
    onFilterChange({ ...filters, locations: next })
  }

  const toggleExperience = (exp: string) => {
    const next = filters.experienceLevels.includes(exp)
      ? filters.experienceLevels.filter((e) => e !== exp)
      : [...filters.experienceLevels, exp]
    onFilterChange({ ...filters, experienceLevels: next })
  }

  const hasActiveFilters =
    (filters.minMatchScore ?? 0) > 0 ||
    filters.roles.length > 0 ||
    filters.workModes.length > 0 ||
    filters.locations.length > 0 ||
    filters.experienceLevels.length > 0

  return (
    <div className="space-y-3">
      {/* Top Filter & Sort Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-left">
        {/* Left: Score Chips & Mobile Filter Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline-block">
            Min Score:
          </span>
          <div className="inline-flex rounded-xl bg-slate-100 p-1 gap-1">
            {scoreOptions.map((opt) => {
              const isSelected = (filters.minMatchScore || 0) === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      minMatchScore: opt.value === 0 ? undefined : opt.value,
                    })
                  }
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            leftIcon={<SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />}
            rightIcon={<ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileDrawerOpen ? 'rotate-180' : ''}`} />}
            className="text-xs font-semibold ml-1"
          >
            Filters
            {hasActiveFilters && (
              <span className="ml-1 w-2 h-2 rounded-full bg-indigo-600" />
            )}
          </Button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Results Count & Rank By Dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-slate-900">{totalCount}</strong> opportunities
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-500">Rank by:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as MatchSortOption)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Expandable Multi-Category Filter Bar */}
      {mobileDrawerOpen && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left space-y-4 animate-in fade-in-50 duration-200">
          {/* Roles */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2">
              Role Focus:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {roleOptions.map((role) => {
                const active = filters.roles.includes(role)
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={`px-3 py-1 text-xs rounded-lg font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                      active
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-semibold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {active && <Check className="w-3 h-3 text-indigo-600" />}
                    <span>{role}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            {/* Work Mode */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Work Mode:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {workModeOptions.map((mode) => {
                  const active = filters.workModes.includes(mode)
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => toggleWorkMode(mode)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-medium border transition-all cursor-pointer ${
                        active
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-semibold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {mode}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Location */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Location:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {locationOptions.map((loc) => {
                  const active = filters.locations.includes(loc)
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => toggleLocation(loc)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-medium border transition-all cursor-pointer ${
                        active
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-semibold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {loc}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Experience */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Experience:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {experienceOptions.map((exp) => {
                  const active = filters.experienceLevels.includes(exp)
                  return (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => toggleExperience(exp)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-medium border transition-all cursor-pointer ${
                        active
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-semibold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {exp}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
