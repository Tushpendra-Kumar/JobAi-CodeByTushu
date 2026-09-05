import { useState } from 'react'
import { Search, MapPin, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface JobSearchSectionProps {
  onSearch: (criteria: { query: string; location: string }) => void
}

export const JobSearchSection: React.FC<JobSearchSectionProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('Software Engineer')
  const [location, setLocation] = useState('Noida, India')
  const [activeChip, setActiveChip] = useState('Software Engineer')

  const popularChips = [
    'Software Engineer',
    'Full Stack Developer',
    'React Developer',
    'Backend Developer',
    'AI Engineer',
    'DevOps Engineer',
    'Data Analyst',
  ]

  const handleChipClick = (chip: string) => {
    setActiveChip(chip)
    setQuery(chip)
    onSearch({ query: chip, location })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({ query, location })
  }

  return (
    <section id="search-section" className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Badge variant="indigo" size="sm" className="mb-2">
            Intelligent Discovery
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Discover Verified Opportunities Matched by AI
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Query across verified tech ecosystems with algorithmic skill matching.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="relative rounded-2xl bg-white p-3 sm:p-4 shadow-xl border border-slate-200/90 ring-1 ring-slate-900/5">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch gap-3">
            {/* Query Input */}
            <div className="relative flex-1 flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-indigo-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Job title, skills or company"
                className="w-full bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Location Input */}
            <div className="relative md:w-72 flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Search Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="md:w-auto px-8 py-3.5 font-semibold text-sm shadow-md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Search Jobs
            </Button>
          </form>

          {/* Popular Search Chips */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Popular:
            </span>
            {popularChips.map((chip) => {
              const isSelected = activeChip === chip
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                      : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {chip}
                </button>
              )
            })}
          </div>
        </div>

        {/* Demo Search Feedback Snapshot Card */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-2">
          <span>
            Showing demonstration results for{' '}
            <strong className="text-slate-700 font-semibold">{query}</strong> in{' '}
            <strong className="text-slate-700 font-semibold">{location}</strong>
          </span>
          <span className="hidden sm:inline-block">Updated via AI match index</span>
        </div>
      </div>
    </section>
  )
}
