import React from 'react'
import { Search, MapPin, SlidersHorizontal, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export interface JobSearchHeaderProps {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  locationQuery: string
  onLocationQueryChange: (loc: string) => void
  onSearchSubmit: () => void
  isFilterOpen: boolean
  onToggleFilters: () => void
  activeFilterCount: number
}

export const JobSearchHeader: React.FC<JobSearchHeaderProps> = ({
  searchQuery,
  onSearchQueryChange,
  locationQuery,
  onLocationQueryChange,
  onSearchSubmit,
  isFilterOpen,
  onToggleFilters,
  activeFilterCount,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchSubmit()
  }

  return (
    <div className="border-b border-slate-200/80 bg-gradient-to-b from-white via-indigo-50/15 to-transparent pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Heading */}
        <div className="max-w-3xl mb-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Match Index Active</span>
            <span className="text-indigo-300">•</span>
            <span className="text-slate-500 font-medium">Powered by CodeByTushu</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find Jobs That Match Your Future
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-2.5 leading-relaxed">
            Search thousands of opportunities and let AI identify the roles that best match your skills, experience and career goals.
          </p>
        </div>

        {/* Prominent Search Container */}
        <div className="relative rounded-2xl bg-white p-3 sm:p-4 shadow-xl border border-slate-200/90 ring-1 ring-slate-900/5">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch gap-3">
            {/* Input 1: Job title, skills or company */}
            <div className="relative flex-1 flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-indigo-600">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder="Job title, skills or company"
                aria-label="Job title, skills or company"
                className="w-full bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Input 2: Location */}
            <div className="relative md:w-72 flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => onLocationQueryChange(e.target.value)}
                placeholder="Location"
                aria-label="Job location"
                className="w-full bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Actions: Search button & Advanced Filters toggle */}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={onToggleFilters}
                className="px-4 py-3.5 text-slate-700 flex items-center gap-2 shrink-0 border-slate-200"
                aria-label="Toggle Advanced Filters"
                aria-expanded={isFilterOpen}
              >
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Advanced Filters</span>
                <span className="sm:hidden">Filters</span>
                {activeFilterCount > 0 && (
                  <Badge variant="indigo" size="sm" className="px-1.5 py-0 text-[10px] font-bold">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="flex-1 md:flex-none px-7 py-3.5 font-semibold text-sm shadow-md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Search Jobs
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
