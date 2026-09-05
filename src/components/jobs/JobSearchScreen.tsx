import React, { useState, useMemo, useEffect } from 'react'
import { initialJobsData, type Job } from '@/data/jobsData'
import { JobSearchHeader } from './JobSearchHeader'
import { JobFilterSidebar, type FilterState } from './JobFilterSidebar'
import { JobResultsHeader, type SortOption, type ViewMode } from './JobResultsHeader'
import { JobResultCard } from './JobResultCard'
import { AiCareerCopilotPanel } from './AiCareerCopilotPanel'
import { JobSkeletonLoader } from './JobSkeletonLoader'
import { JobEmptyState } from './JobEmptyState'
import { JobErrorState } from './JobErrorState'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Sparkles } from 'lucide-react'

export interface JobSearchScreenProps {
  initialSearchQuery?: string
  initialLocationQuery?: string
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
  onSelectJob?: (jobId: string) => void
  savedJobIds?: string[]
  onToggleSave?: (jobId: string) => void
  onNavigateToAiMatching?: () => void
}

const defaultFilters: FilterState = {
  jobTypes: [],
  workModes: [],
  experienceLevels: [],
  minSalaryLpa: 0,
  maxSalaryLpa: 50,
  locationFilter: '',
  companyFilter: '',
  datePosted: 'any',
  selectedSkills: [],
}

export const JobSearchScreen: React.FC<JobSearchScreenProps> = ({
  initialSearchQuery = '',
  initialLocationQuery = '',
  onToast,
  onSelectJob,
  savedJobIds: propSavedJobIds,
  onToggleSave: propOnToggleSave,
  onNavigateToAiMatching,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [locationQuery, setLocationQuery] = useState(initialLocationQuery)
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [sortBy, setSortBy] = useState<SortOption>('best')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [selectedJobForPreview, setSelectedJobForPreview] = useState<Job | null>(null)

  // Bookmarking state fallback if not controlled by parent
  const [localSavedJobIds, setLocalSavedJobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jobai_saved_jobs')
      return saved ? JSON.parse(saved) : ['job-1']
    } catch {
      return ['job-1']
    }
  })

  const effectiveSavedJobIds = propSavedJobIds || localSavedJobIds

  useEffect(() => {
    try {
      localStorage.setItem('jobai_saved_jobs', JSON.stringify(effectiveSavedJobIds))
    } catch {
      // Local storage fallback
    }
  }, [effectiveSavedJobIds])

  const handleToggleSave = (jobId: string) => {
    if (propOnToggleSave) {
      propOnToggleSave(jobId)
      return
    }

    const job = initialJobsData.find((j) => j.id === jobId)
    const jobTitle = job ? job.title : 'Job'

    if (effectiveSavedJobIds.includes(jobId)) {
      setLocalSavedJobIds((prev) => prev.filter((id) => id !== jobId))
      onToast(`“${jobTitle}” removed from saved jobs.`, 'info')
    } else {
      setLocalSavedJobIds((prev) => [...prev, jobId])
      onToast(`“${jobTitle}” saved to your opportunities.`, 'success')
    }
  }

  const handleResetFilters = () => {
    setFilters(defaultFilters)
    setSearchQuery('')
    setLocationQuery('')
    onToast('All filters have been reset.', 'info')
  }

  const handleSearchSubmit = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onToast(`Search updated for “${searchQuery || 'All Positions'}”`, 'info')
    }, 280)
  }

  const handleViewAiMatches = () => {
    if (onNavigateToAiMatching) {
      onNavigateToAiMatching()
      return
    }
    // Fallback: filter for 90%+ match
    setSortBy('best')
    onToast('Filtered 18 high-compatibility matches with 90%+ match score.', 'success')
  }

  // Active filter count calculator
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.jobTypes.length > 0) count += filters.jobTypes.length
    if (filters.workModes.length > 0) count += filters.workModes.length
    if (filters.experienceLevels.length > 0) count += filters.experienceLevels.length
    if (filters.maxSalaryLpa < 50) count += 1
    if (filters.locationFilter.trim()) count += 1
    if (filters.companyFilter.trim()) count += 1
    if (filters.datePosted !== 'any') count += 1
    if (filters.selectedSkills.length > 0) count += filters.selectedSkills.length
    return count
  }, [filters])

  // Filter & Sort Pipeline
  const filteredJobs = useMemo(() => {
    return initialJobsData.filter((job) => {
      // 1. Text Search: matches title, company or skills
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const titleMatch = job.title.toLowerCase().includes(q)
        const companyMatch = job.company.toLowerCase().includes(q)
        const skillMatch = job.skills.some((s) => s.toLowerCase().includes(q))
        if (!titleMatch && !companyMatch && !skillMatch) return false
      }

      // 2. Location Search
      const locTarget = (locationQuery || filters.locationFilter).toLowerCase().trim()
      if (locTarget) {
        if (!job.location.toLowerCase().includes(locTarget)) return false
      }

      // 3. Company Filter
      if (filters.companyFilter.trim()) {
        if (!job.company.toLowerCase().includes(filters.companyFilter.toLowerCase().trim())) {
          return false
        }
      }

      // 4. Job Types
      if (filters.jobTypes.length > 0) {
        if (!filters.jobTypes.includes(job.jobType)) return false
      }

      // 5. Work Modes
      if (filters.workModes.length > 0) {
        if (!filters.workModes.includes(job.workMode)) return false
      }

      // 6. Experience Levels
      if (filters.experienceLevels.length > 0) {
        if (!filters.experienceLevels.includes(job.experience)) return false
      }

      // 7. Salary Max Cap
      if (job.salaryMinLpa > filters.maxSalaryLpa) {
        return false
      }

      // 8. Date Posted
      if (filters.datePosted === '24h' && job.postedDaysAgo > 1) return false
      if (filters.datePosted === 'week' && job.postedDaysAgo > 7) return false
      if (filters.datePosted === 'month' && job.postedDaysAgo > 30) return false

      // 9. Skills Chips
      if (filters.selectedSkills.length > 0) {
        const hasAllSkills = filters.selectedSkills.every((reqSkill) =>
          job.skills.some(
            (js) => js.toLowerCase() === reqSkill.toLowerCase()
          )
        )
        if (!hasAllSkills) return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'best') return b.matchScore - a.matchScore
      if (sortBy === 'recent') return a.postedDaysAgo - b.postedDaysAgo
      if (sortBy === 'salary-desc') return b.salaryMaxLpa - a.salaryMaxLpa
      if (sortBy === 'salary-asc') return a.salaryMinLpa - b.salaryMinLpa
      return 0
    })
  }, [searchQuery, locationQuery, filters, sortBy])

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Header & Prominent Search Area */}
      <JobSearchHeader
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        locationQuery={locationQuery}
        onLocationQueryChange={setLocationQuery}
        onSearchSubmit={handleSearchSubmit}
        isFilterOpen={isFilterSidebarVisible}
        onToggleFilters={() => setIsFilterSidebarVisible(!isFilterSidebarVisible)}
        activeFilterCount={activeFilterCount}
      />

      {/* 2. Main Content Layout: Sidebar + Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Inline AI Career Copilot Panel */}
        <AiCareerCopilotPanel onViewAiMatches={handleViewAiMatches} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Desktop Filter Sidebar */}
          {isFilterSidebarVisible && (
            <div className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-20">
              <JobFilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onResetFilters={handleResetFilters}
                totalCount={filteredJobs.length}
              />
            </div>
          )}

          {/* Right Main Job Results Column */}
          <div
            className={`w-full ${
              isFilterSidebarVisible ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'
            }`}
          >
            {/* Results Header: Count, Sorting, View Switcher */}
            <JobResultsHeader
              totalCount={initialJobsData.length}
              filteredCount={filteredJobs.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
              activeFilterCount={activeFilterCount}
            />

            {/* Content States */}
            {isLoading ? (
              <JobSkeletonLoader />
            ) : hasError ? (
              <JobErrorState
                onRetry={() => {
                  setHasError(false)
                  handleSearchSubmit()
                }}
              />
            ) : filteredJobs.length === 0 ? (
              <JobEmptyState
                onResetFilters={handleResetFilters}
                query={searchQuery}
              />
            ) : (
              <div
                className={`gap-4 ${
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2'
                    : 'space-y-4 flex flex-col'
                }`}
              >
                {filteredJobs.map((job) => (
                  <JobResultCard
                    key={job.id}
                    job={job}
                    isSaved={effectiveSavedJobIds.includes(job.id)}
                    onToggleSave={handleToggleSave}
                    onViewDetails={(j) => (onSelectJob ? onSelectJob(j.id) : setSelectedJobForPreview(j))}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl z-10 flex flex-col">
            <JobFilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              totalCount={filteredJobs.length}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Job Details Screen #3 Preview Modal */}
      {selectedJobForPreview && (
        <Modal
          isOpen={Boolean(selectedJobForPreview)}
          onClose={() => setSelectedJobForPreview(null)}
          title={selectedJobForPreview.title}
          description={`${selectedJobForPreview.company} • ${selectedJobForPreview.location}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-left pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/70 border border-indigo-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-semibold text-indigo-950">
                  {selectedJobForPreview.matchScore}% Match Alignment
                </span>
              </div>
              <Badge variant="emerald" size="sm">
                {selectedJobForPreview.salary}
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Role Overview
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedJobForPreview.descriptionPreview}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Competencies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedJobForPreview.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-medium text-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Screen 3 Notice */}
            <div className="rounded-xl border border-dashed border-slate-200 p-3 bg-slate-50 text-xs text-slate-500">
              <p className="font-semibold text-slate-700 mb-0.5">
                Screen #3 (Job Details) Preview
              </p>
              <p>
                The complete Job Details screen with full responsibilities, hiring manager notes, and one-click AI Auto Apply will be available in the next release.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedJobForPreview(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleToggleSave(selectedJobForPreview.id)
                  setSelectedJobForPreview(null)
                }}
              >
                {effectiveSavedJobIds.includes(selectedJobForPreview.id)
                  ? 'Remove from Saved'
                  : 'Save This Job'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
