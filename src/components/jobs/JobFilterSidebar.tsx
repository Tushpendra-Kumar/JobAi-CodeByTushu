import React from 'react'
import { RotateCcw, Building2, MapPin, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export interface FilterState {
  jobTypes: string[]
  workModes: string[]
  experienceLevels: string[]
  minSalaryLpa: number
  maxSalaryLpa: number
  locationFilter: string
  companyFilter: string
  datePosted: 'any' | '24h' | 'week' | 'month'
  selectedSkills: string[]
}

export interface JobFilterSidebarProps {
  filters: FilterState
  onFilterChange: (newFilters: FilterState) => void
  onResetFilters: () => void
  totalCount?: number
  isMobileDrawer?: boolean
  onCloseMobileDrawer?: () => void
}

export const JobFilterSidebar: React.FC<JobFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const jobTypeOptions = ['Full Time', 'Part Time', 'Contract', 'Internship']
  const workModeOptions = ['Remote', 'Hybrid', 'On-site']
  const experienceOptions = ['Fresher', '1–3 years', '3–5 years', '5+ years']
  const availableSkills = [
    'React.js',
    'JavaScript',
    'Node.js',
    'Python',
    'Java',
    'SQL',
    'AWS',
    'Docker',
  ]
  const datePostedOptions: { label: string; value: FilterState['datePosted'] }[] = [
    { label: 'Any time', value: 'any' },
    { label: 'Past 24 hours', value: '24h' },
    { label: 'Past week', value: 'week' },
    { label: 'Past month', value: 'month' },
  ]

  const toggleArrayItem = (list: string[], item: string): string[] => {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
  }

  const handleJobTypeToggle = (type: string) => {
    onFilterChange({ ...filters, jobTypes: toggleArrayItem(filters.jobTypes, type) })
  }

  const handleWorkModeToggle = (mode: string) => {
    onFilterChange({ ...filters, workModes: toggleArrayItem(filters.workModes, mode) })
  }

  const handleExperienceToggle = (exp: string) => {
    onFilterChange({ ...filters, experienceLevels: toggleArrayItem(filters.experienceLevels, exp) })
  }

  const handleSkillToggle = (skill: string) => {
    onFilterChange({ ...filters, selectedSkills: toggleArrayItem(filters.selectedSkills, skill) })
  }

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    onFilterChange({ ...filters, maxSalaryLpa: val })
  }

  return (
    <aside
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 text-left space-y-6 ${
        isMobileDrawer ? 'h-full overflow-y-auto' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Filters
          </h2>
          {totalCount !== undefined && (
            <Badge variant="slate" size="sm" className="font-semibold text-[10px]">
              {totalCount} results
            </Badge>
          )}
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Job Type */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wide text-slate-700 block">
          Job Type
        </label>
        <div className="space-y-2">
          {jobTypeOptions.map((type) => {
            const isChecked = filters.jobTypes.includes(type)
            return (
              <label
                key={type}
                className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none group"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleJobTypeToggle(type)}
                  className="sr-only"
                />
                <span className={isChecked ? 'font-semibold text-slate-900' : ''}>
                  {type}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {/* 2. Work Mode */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wide text-slate-700 block">
          Work Mode
        </label>
        <div className="space-y-2">
          {workModeOptions.map((mode) => {
            const isChecked = filters.workModes.includes(mode)
            return (
              <label
                key={mode}
                className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none group"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleWorkModeToggle(mode)}
                  className="sr-only"
                />
                <span className={isChecked ? 'font-semibold text-slate-900' : ''}>
                  {mode}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {/* 3. Experience Level */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wide text-slate-700 block">
          Experience Level
        </label>
        <div className="space-y-2">
          {experienceOptions.map((exp) => {
            const isChecked = filters.experienceLevels.includes(exp)
            return (
              <label
                key={exp}
                className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none group"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleExperienceToggle(exp)}
                  className="sr-only"
                />
                <span className={isChecked ? 'font-semibold text-slate-900' : ''}>
                  {exp}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {/* 4. Salary Range Slider */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-700">
            Salary Range
          </label>
          <span className="text-xs font-bold text-indigo-600">
            Up to ₹{filters.maxSalaryLpa} LPA
          </span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min={5}
            max={50}
            step={1}
            value={filters.maxSalaryLpa}
            onChange={handleSalaryChange}
            aria-label="Max salary range filter"
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-medium text-slate-400">
            <span>₹0 LPA</span>
            <span>₹25 LPA</span>
            <span>₹50 LPA</span>
          </div>
        </div>
      </div>

      {/* 5. Location Search */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wide text-slate-700 block">
          Location
        </label>
        <div className="relative flex items-center">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search location"
            value={filters.locationFilter}
            onChange={(e) =>
              onFilterChange({ ...filters, locationFilter: e.target.value })
            }
            className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* 6. Company Search */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wide text-slate-700 block">
          Company
        </label>
        <div className="relative flex items-center">
          <Building2 className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search company"
            value={filters.companyFilter}
            onChange={(e) =>
              onFilterChange({ ...filters, companyFilter: e.target.value })
            }
            className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* 7. Date Posted */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wide text-slate-700 block">
          Date Posted
        </label>
        <div className="space-y-2">
          {datePostedOptions.map((opt) => {
            const isSelected = filters.datePosted === opt.value
            return (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="datePosted"
                  checked={isSelected}
                  onChange={() =>
                    onFilterChange({ ...filters, datePosted: opt.value })
                  }
                  className="accent-indigo-600"
                />
                <span className={isSelected ? 'font-semibold text-slate-900' : ''}>
                  {opt.label}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {/* 8. Skills Chips */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wide text-slate-700 block">
          Skills
        </label>
        <div className="flex flex-wrap gap-1.5">
          {availableSkills.map((skill) => {
            const isSelected = filters.selectedSkills.includes(skill)
            return (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillToggle(skill)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {skill}
              </button>
            )
          })}
        </div>
      </div>

      {/* Reset Action */}
      <div className="pt-4 border-t border-slate-100">
        <Button
          type="button"
          variant="secondary"
          className="w-full justify-center text-xs h-9"
          onClick={onResetFilters}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Reset Filters
        </Button>

        {isMobileDrawer && onCloseMobileDrawer && (
          <Button
            type="button"
            variant="primary"
            className="w-full justify-center text-xs h-9 mt-2"
            onClick={onCloseMobileDrawer}
          >
            Apply Filters
          </Button>
        )}
      </div>
    </aside>
  )
}
