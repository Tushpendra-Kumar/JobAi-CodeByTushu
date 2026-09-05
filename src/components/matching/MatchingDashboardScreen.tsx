import React, { useState, useMemo } from 'react'
import { Bot, CheckCircle2 } from 'lucide-react'
import { initialJobsData, type Job } from '@/data/jobsData'
import { defaultCandidateProfile, type CandidateProfile } from '@/data/candidateProfile'
import {
  evaluateJobMatch,
  filterAndRankJobs,
  getSimulatedAgentTelemetry,
  type MatchFilterCriteria,
  type MatchSortOption,
} from '@/services/matchingService'
import { DashboardSidebar } from './DashboardSidebar'
import { MatchingHeader } from './MatchingHeader'
import { CareerMatchOverview } from './CareerMatchOverview'
import { HowMatchingWorks } from './HowMatchingWorks'
import { MatchingFilterBar } from './MatchingFilterBar'
import { RecommendedJobCard } from './RecommendedJobCard'
import { MatchExplanationPanel } from './MatchExplanationPanel'
import { SkillGapInsightsCard } from './SkillGapInsightsCard'
import { AiAgentStatusCard } from './AiAgentStatusCard'
import { PersonalizedInsightCard } from './PersonalizedInsightCard'
import { ProfileCompletenessCard } from './ProfileCompletenessCard'
import { MatchingSkeleton, MatchingEmptyState, MatchingErrorState } from './MatchingStates'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

export interface MatchingDashboardScreenProps {
  savedJobIds: string[]
  onToggleSave: (jobId: string) => void
  onSelectJob: (jobId: string) => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
  onNavigateToJobs: () => void
  onNavigateToResume?: () => void
  onNavigateToAnalysis?: () => void
  onNavigateToBuilder?: () => void
  onNavigateToCoverLetter?: () => void
  onNavigateToAutoApply?: () => void
  onNavigateToApplications?: () => void
  onNavigateToCareerInsights?: () => void
  onNavigateToProfile?: () => void
  onNavigateToPricing?: () => void
  onOpenAuthModal?: () => void
  candidateProfile?: CandidateProfile
}

export const MatchingDashboardScreen: React.FC<MatchingDashboardScreenProps> = ({
  savedJobIds,
  onToggleSave,
  onSelectJob,
  onToast,
  onNavigateToJobs,
  onNavigateToResume,
  onNavigateToAnalysis,
  onNavigateToBuilder,
  onNavigateToCoverLetter,
  onNavigateToAutoApply,
  onNavigateToApplications,
  onNavigateToCareerInsights,
  onNavigateToProfile,
  onNavigateToPricing,
  onOpenAuthModal,
  candidateProfile: propCandidateProfile,
}) => {
  // Navigation & Filtering states
  const [activeSidebarTab, setActiveSidebarTab] = useState('ai-matching')
  const [selectedJobId, setSelectedJobId] = useState<string>('job-1')
  const [filters, setFilters] = useState<MatchFilterCriteria>({
    minMatchScore: undefined,
    roles: [],
    workModes: [],
    locations: [],
    experienceLevels: [],
  })
  const [sortBy, setSortBy] = useState<MatchSortOption>('best')

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isError, setIsError] = useState(false)

  // Quick Apply Modal state
  const [applyModalJob, setApplyModalJob] = useState<Job | null>(null)
  const [isSubmittingApp, setIsSubmittingApp] = useState(false)

  // Telemetry state
  const [telemetry, setTelemetry] = useState(getSimulatedAgentTelemetry)

  // Candidate Profile
  const candidateProfile = propCandidateProfile || defaultCandidateProfile

  // Filtered and Ranked jobs
  const rankedJobs = useMemo(() => {
    return filterAndRankJobs(initialJobsData, filters, sortBy)
  }, [filters, sortBy])

  // Active Job for the Explanation Panel
  const activeJob = useMemo(() => {
    const found = rankedJobs.find((j) => j.id === selectedJobId)
    if (found) return found
    return rankedJobs.length > 0 ? rankedJobs[0] : initialJobsData[0]
  }, [rankedJobs, selectedJobId])

  // Active Job Explanation Analysis
  const activeAnalysis = useMemo(() => {
    return evaluateJobMatch(activeJob, candidateProfile)
  }, [activeJob, candidateProfile])

  // Handlers
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      setTelemetry((prev) => ({
        ...prev,
        jobsAnalyzedToday: prev.jobsAnalyzedToday + 6,
        newRecommendations: prev.newRecommendations + 2,
        lastUpdated: 'Just now',
      }))
      onToast('AI matching recommendations refreshed against latest postings.', 'success')
    }, 600)
  }

  const handleResetFilters = () => {
    setIsLoading(true)
    setFilters({
      minMatchScore: undefined,
      roles: [],
      workModes: [],
      locations: [],
      experienceLevels: [],
    })
    setSortBy('best')
    setTimeout(() => {
      setIsLoading(false)
      onToast('Matching filters have been reset.', 'info')
    }, 200)
  }

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!applyModalJob) return

    setIsSubmittingApp(true)
    setTimeout(() => {
      setIsSubmittingApp(false)
      const job = applyModalJob
      setApplyModalJob(null)
      onToast(
        `Application dispatched for ${job.title} at ${job.company}! Added to your tracking pipeline.`,
        'success'
      )
    }, 650)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Responsive Dashboard Shell: Sidebar on Desktop + Main Dashboard */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Left Navigation Sidebar */}
          <DashboardSidebar
            activeTab={activeSidebarTab}
            onSelectTab={setActiveSidebarTab}
            onNavigateToJobs={onNavigateToJobs}
            onNavigateToResume={onNavigateToResume}
            onNavigateToAnalysis={onNavigateToAnalysis}
            onNavigateToBuilder={onNavigateToBuilder}
            onNavigateToCoverLetter={onNavigateToCoverLetter}
            onNavigateToAutoApply={onNavigateToAutoApply}
            onNavigateToApplications={onNavigateToApplications}
            onNavigateToCareerInsights={onNavigateToCareerInsights}
            onNavigateToProfile={onNavigateToProfile}
            onNavigateToPricing={onNavigateToPricing}
            onToast={onToast}
            className="lg:sticky lg:top-20"
          />

          {/* Main Dashboard Content Area */}
          <div className="flex-1 w-full space-y-6 sm:space-y-8">
            {/* 1. Page Header */}
            <MatchingHeader
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />

            {/* 2. Career Match Overview Section */}
            <CareerMatchOverview
              overallScore={92}
              skillsMatch={94}
              experienceMatch={88}
              technologyMatch={95}
              careerGoalsMatch={90}
            />

            {/* 3. How AI Matching Works Section */}
            <HowMatchingWorks />

            {/* 4. Match Filters and Rank Controls */}
            <MatchingFilterBar
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalCount={rankedJobs.length}
            />

            {/* 5. Main Job Recommendations + AI Explanation Split View */}
            {isLoading ? (
              <MatchingSkeleton />
            ) : isError ? (
              <MatchingErrorState onRetry={() => setIsError(false)} />
            ) : rankedJobs.length === 0 ? (
              <MatchingEmptyState
                onUpdateProfile={() => {
                  if (onNavigateToResume) onNavigateToResume()
                  else if (onOpenAuthModal) onOpenAuthModal()
                  else onToast('Opening profile preferences...', 'info')
                }}
                onResetFilters={handleResetFilters}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Recommended Job Cards (col-span-7) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between pb-1">
                    <div className="text-left">
                      <h2 className="text-lg font-bold text-slate-900">
                        Top Matches For You
                      </h2>
                      <p className="text-xs text-slate-500">
                        Jobs ranked by AI based on your current career profile.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {rankedJobs.map((job) => (
                      <RecommendedJobCard
                        key={job.id}
                        job={job}
                        isSelected={activeJob.id === job.id}
                        onSelect={() => setSelectedJobId(job.id)}
                        onViewJob={() => onSelectJob(job.id)}
                        onApply={() => setApplyModalJob(job)}
                        isSaved={savedJobIds.includes(job.id)}
                        onToggleSave={() => onToggleSave(job.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Column: AI Match Explanation Panel (col-span-5) */}
                <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6">
                  <MatchExplanationPanel
                    job={activeJob}
                    analysis={activeAnalysis}
                  />
                </div>
              </div>
            )}

            {/* 6. Supporting Career Intelligence Cards (4 Grid Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-4 border-t border-slate-200/80">
              {/* Card 1: Close Your Skill Gaps */}
              <SkillGapInsightsCard
                onViewSkillRoadmap={() =>
                  onToast(
                    'Skill Roadmap: Connecting to future Screen #11 Career Insights roadmap.',
                    'info'
                  )
                }
              />

              {/* Card 2: AI Career Agent Telemetry */}
              <AiAgentStatusCard
                telemetry={telemetry}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
              />

              {/* Card 3: Personalized Insight */}
              <PersonalizedInsightCard
                onExploreCareerPaths={() =>
                  onToast(
                    'Career Paths: Previewing future Screen #11 Career Insights module.',
                    'info'
                  )
                }
              />

              {/* Card 4: Improve Your Match Accuracy */}
              <ProfileCompletenessCard
                completeness={82}
                onCompleteProfile={() => {
                  if (onNavigateToResume) onNavigateToResume()
                  else if (onOpenAuthModal) onOpenAuthModal()
                  else onToast('Opening profile setup modal...', 'info')
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Application Modal */}
      {applyModalJob && (
        <Modal
          isOpen={true}
          onClose={() => setApplyModalJob(null)}
          title={`Quick Apply — ${applyModalJob.title}`}
          description={`Submit your verified AI-matched profile directly to ${applyModalJob.company}`}
          maxWidth="md"
        >
          <form onSubmit={handleApplySubmit} className="space-y-4 text-left">
            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-900 block">
                  {applyModalJob.title}
                </span>
                <span className="text-xs text-indigo-700">
                  {applyModalJob.company} • {applyModalJob.location}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs">
                {applyModalJob.matchScore}% Match
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Default resume attached: Arjun_Verma_Frontend_2026.pdf</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Bot className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>AI-generated cover letter draft will be reviewed before submission</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setApplyModalJob(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isSubmittingApp}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {isSubmittingApp ? 'Submitting...' : 'Confirm & Dispatch Application'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
