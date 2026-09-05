import React, { useState, useMemo } from 'react'
import type { ParsedResume } from '@/data/resumeData'
import { defaultParsedResume } from '@/data/resumeData'
import { initialJobsData, type Job } from '@/data/jobsData'
import { DashboardSidebar } from '@/components/matching/DashboardSidebar'
import { AutoApplyHeader } from './AutoApplyHeader'
import { AutoApplyOverviewCards } from './AutoApplyOverviewCards'
import { AutoApplyFilterBar, type AutoApplyFilters, type AutoApplySortOption } from './AutoApplyFilterBar'
import { JobQueueCard } from './JobQueueCard'
import { ApplicationPreparationWorkflow } from './ApplicationPreparationWorkflow'
import { ApplicationReviewModal } from './ApplicationReviewModal'
import { SubmittingProgressModal } from './SubmittingProgressModal'
import { ApplicationQueueSidebar } from './ApplicationQueueSidebar'
import { AutoApplyConfigModal } from './AutoApplyConfigModal'
import { EmptyJobsState, ResumeRequiredState } from './AutoApplyStates'
import {
  prepareJobApplication,
  defaultApplicationProvider,
  type AutoApplyConfiguration,
  type PreparedApplicationData,
  type ApplicationSubmissionResult,
} from '@/services/autoApplyService'
import {
  getTrackedApplications,
  type TrackedApplication,
} from '@/services/applicationTrackingService'
import {
  getSavedResumeVersions,
  type ResumeDraftVersion,
} from '@/services/resumeVersionService'
import { generateCoverLetter } from '@/services/autoApplyAIService'

export interface AutoApplyScreenProps {
  parsedResume: ParsedResume | null
  onNavigateToJobs: () => void
  onNavigateToResume: () => void
  onNavigateToAnalysis: () => void
  onNavigateToBuilder: () => void
  onNavigateToMatching: () => void
  onNavigateToApplications?: () => void
  savedJobIds: string[]
  onToggleSaveJob: (jobId: string) => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export const AutoApplyScreen: React.FC<AutoApplyScreenProps> = ({
  parsedResume,
  onNavigateToJobs,
  onNavigateToResume,
  onNavigateToAnalysis,
  onNavigateToBuilder,
  onNavigateToMatching,
  onNavigateToApplications,
  savedJobIds,
  onToggleSaveJob,
  onToast,
}) => {
  // Available resume versions from Screen #7
  const resumeVersions: ResumeDraftVersion[] = useMemo(() => {
    return getSavedResumeVersions(parsedResume || defaultParsedResume)
  }, [parsedResume])

  const [selectedResumeVersionId, setSelectedResumeVersionId] = useState<string>(() => {
    return resumeVersions[0]?.id || 'draft-master'
  })

  const activeResumeVersion =
    resumeVersions.find((v) => v.id === selectedResumeVersionId) || resumeVersions[0]

  // Tracked applications from local storage service
  const [trackedApplications, setTrackedApplications] = useState<TrackedApplication[]>(() => {
    return getTrackedApplications()
  })

  // Skipped job IDs state
  const [skippedJobIds, setSkippedJobIds] = useState<string[]>([])

  // Filters and Sorting
  const [filters, setFilters] = useState<AutoApplyFilters>({
    minScore: 80,
    workMode: undefined,
    experience: undefined,
  })
  const [sortBy, setSortBy] = useState<AutoApplySortOption>('best')

  // Auto Apply Configuration
  const [config, setConfig] = useState<AutoApplyConfiguration>({
    targetRole: 'Software Engineer',
    minMatchScore: 80,
    workMode: 'Any',
    location: 'Noida, India',
    experienceLevel: 'Entry Level',
    resumeVersionId: activeResumeVersion?.id || 'draft-master',
    coverLetterOption: 'generate',
    questionOption: 'suggested',
    applicationLimit: 5,
  })

  // Active reviewing job workflow state
  const [activePreparedApp, setActivePreparedApp] = useState<PreparedApplicationData | null>(null)
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)

  // View mode: 'queue' vs 'history'
  const [sidebarTab, setSidebarTab] = useState<'queue' | 'history'>('queue')

  // Modals state
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isSubmittingModalOpen, setIsSubmittingModalOpen] = useState(false)
  const [submittingStepIndex, setSubmittingStepIndex] = useState(0)
  const [isSubmissionCompleted, setIsSubmissionCompleted] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<ApplicationSubmissionResult | null>(null)

  const SUBMISSION_STEPS = [
    'Preparing verified application package...',
    'Validating ATS resume compliance...',
    'Compiling role-tailored responses & cover letter...',
    'Conducting final pre-submission integrity review...',
    'Recording application in JobAI tracking pipeline...',
  ]

  // Filtered Jobs Ready for Application
  const appliedJobIds = useMemo(() => {
    return trackedApplications.map((app) => app.jobId)
  }, [trackedApplications])

  const filteredJobs = useMemo(() => {
    return initialJobsData.filter((job) => {
      // Exclude already applied jobs and skipped jobs
      if (appliedJobIds.includes(job.id)) return false
      if (skippedJobIds.includes(job.id)) return false

      // Match Score filter
      if (filters.minScore && job.matchScore < filters.minScore) return false

      // Work Mode filter
      if (filters.workMode && job.workMode !== filters.workMode) return false

      // Experience filter
      if (filters.experience && !job.experience.toLowerCase().includes(filters.experience.toLowerCase())) {
        return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'highest-match') return b.matchScore - a.matchScore
      if (sortBy === 'readiness') return (b.applicationReadiness?.score || 0) - (a.applicationReadiness?.score || 0)
      if (sortBy === 'newest') return a.postedDaysAgo - b.postedDaysAgo
      return b.matchScore - a.matchScore
    })
  }, [appliedJobIds, skippedJobIds, filters, sortBy])

  // Count metrics
  const totalCatalogCount = initialJobsData.length
  const readyToApplyCount = initialJobsData.filter((j) => j.matchScore >= 80).length
  const preparedInQueueCount = filteredJobs.length
  const submittedCount = trackedApplications.length

  // --- Handlers ---
  const handleSelectJobForReview = (job: Job) => {
    setSelectedJobId(job.id)
    const prep = prepareJobApplication(job, activeResumeVersion, config)
    setActivePreparedApp(prep)
    window.scrollTo({ top: 180, behavior: 'smooth' })
  }

  const handleSkipJob = (jobId: string) => {
    setSkippedJobIds((prev) => [...prev, jobId])
    if (activePreparedApp?.jobId === jobId) {
      setActivePreparedApp(null)
      setSelectedJobId(null)
    }
    onToast('Job skipped and moved to excluded queue.', 'info')
  }

  const handleSelectResumeVersion = (verId: string) => {
    setSelectedResumeVersionId(verId)
    const ver = resumeVersions.find((v) => v.id === verId)
    if (ver && activePreparedApp) {
      const updatedPrep = prepareJobApplication(activePreparedApp.job, ver, config)
      setActivePreparedApp(updatedPrep)
      onToast(`Switched active resume to “${ver.name}”. Cover letter refreshed.`, 'info')
    }
  }

  const handleRegenerateCoverLetter = () => {
    if (!activePreparedApp) return
    const cl = generateCoverLetter(activePreparedApp.job, activeResumeVersion.resumeData)
    setActivePreparedApp({
      ...activePreparedApp,
      coverLetter: cl.coverLetter,
      personalizationReasons: cl.personalizationReasons,
    })
    onToast('Cover letter refreshed with targeted role alignment.', 'success')
  }

  const handleChangeQuestionAnswer = (qId: string, answer: string) => {
    if (!activePreparedApp) return
    const updatedQs = activePreparedApp.questions.map((q) =>
      q.id === qId ? { ...q, suggestedAnswer: answer } : q
    )
    setActivePreparedApp({ ...activePreparedApp, questions: updatedQs })
  }

  const handleSaveConfig = (newConfig: AutoApplyConfiguration) => {
    setConfig(newConfig)
    setFilters((prev) => ({ ...prev, minScore: newConfig.minMatchScore }))
    onToast(`Auto apply configuration updated for “${newConfig.targetRole}”. Queue rebuilt.`, 'success')
  }

  // --- Final Approval & Demo Submission ---
  const handleConfirmApplication = async () => {
    if (!activePreparedApp) return

    setIsReviewModalOpen(false)
    setIsSubmittingModalOpen(true)
    setIsSubmissionCompleted(false)
    setSubmittingStepIndex(0)

    try {
      const result = await defaultApplicationProvider.submitApplication(
        activePreparedApp,
        (stepIdx) => {
          setSubmittingStepIndex(stepIdx)
        }
      )

      setSubmissionResult(result)
      setIsSubmissionCompleted(true)
      setTrackedApplications(getTrackedApplications())
      onToast(
        `Application recorded for ${activePreparedApp.job.title} at ${activePreparedApp.job.company}!`,
        'success'
      )
    } catch {
      setIsSubmittingModalOpen(false)
      onToast('An error occurred while submitting application.', 'warning')
    }
  }

  const handleContinueNextJob = () => {
    setIsSubmittingModalOpen(false)
    setActivePreparedApp(null)
    setSelectedJobId(null)
    // If more jobs exist, open the first one
    const remaining = filteredJobs.filter(
      (j) => j.id !== activePreparedApp?.jobId && !appliedJobIds.includes(j.id)
    )
    if (remaining.length > 0) {
      handleSelectJobForReview(remaining[0])
    }
  }

  // If candidate has no parsed resume data at all
  if (!parsedResume && !defaultParsedResume) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ResumeRequiredState
          onNavigateToResumeBuilder={onNavigateToBuilder}
          onNavigateToResumeUpload={onNavigateToResume}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Header */}
      <AutoApplyHeader
        onStartAutoApply={() => setIsConfigModalOpen(true)}
        onViewHistory={() => setSidebarTab('history')}
        isShowingHistory={sidebarTab === 'history'}
        appliedCount={submittedCount}
      />

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Metric Cards */}
        <AutoApplyOverviewCards
          totalJobsCount={totalCatalogCount}
          readyToApplyCount={readyToApplyCount}
          preparedCount={preparedInQueueCount}
          submittedCount={submittedCount}
        />

        {/* Workspace Shell: Left Sidebar (Global Nav), Center (Content), Right (Queue Sidebar) */}
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Left Global Dashboard Navigation */}
          <div className="w-full lg:w-64 shrink-0">
            <DashboardSidebar
              activeTab="auto-apply"
              onSelectTab={(tab) => {
                if (tab === 'jobs') onNavigateToJobs()
                else if (tab === 'ai-matching') onNavigateToMatching()
                else if (tab === 'resume') onNavigateToResume()
              }}
              onNavigateToJobs={onNavigateToJobs}
              onNavigateToResume={onNavigateToResume}
              onNavigateToAnalysis={onNavigateToAnalysis}
              onNavigateToBuilder={onNavigateToBuilder}
              onNavigateToMatching={onNavigateToMatching}
              onNavigateToApplications={onNavigateToApplications}
              onToast={onToast}
            />
          </div>

          {/* Center Main Stage */}
          <div className="flex-1 w-full min-w-0 space-y-5">
            {/* If user is reviewing an individual application */}
            {activePreparedApp ? (
              <ApplicationPreparationWorkflow
                job={activePreparedApp.job}
                resumeVersions={resumeVersions}
                selectedVersionId={selectedResumeVersionId}
                onSelectResumeVersion={handleSelectResumeVersion}
                onNavigateToResumeBuilder={onNavigateToBuilder}
                readiness={activePreparedApp.readiness}
                coverLetter={activePreparedApp.coverLetter}
                onChangeCoverLetter={(text) =>
                  setActivePreparedApp({ ...activePreparedApp, coverLetter: text })
                }
                personalizationReasons={activePreparedApp.personalizationReasons}
                onRegenerateCoverLetter={handleRegenerateCoverLetter}
                questions={activePreparedApp.questions}
                onChangeQuestionAnswer={handleChangeQuestionAnswer}
                onToggleAcceptQuestion={() => {}}
                onProceedToReview={() => setIsReviewModalOpen(true)}
                onBackToQueue={() => {
                  setActivePreparedApp(null)
                  setSelectedJobId(null)
                }}
                onToast={onToast}
              />
            ) : (
              /* Standard Queue Overview Stage */
              <>
                {/* Filter and Sort Bar */}
                <AutoApplyFilterBar
                  filters={filters}
                  onChangeFilters={setFilters}
                  sortBy={sortBy}
                  onChangeSortBy={setSortBy}
                  totalCount={filteredJobs.length}
                  onResetFilters={() =>
                    setFilters({ minScore: undefined, workMode: undefined, experience: undefined })
                  }
                />

                {/* Job Cards Queue List */}
                {filteredJobs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredJobs.map((job) => (
                      <JobQueueCard
                        key={job.id}
                        job={job}
                        isSelected={selectedJobId === job.id}
                        isSaved={savedJobIds.includes(job.id)}
                        onSelect={() => setSelectedJobId(job.id)}
                        onSkip={() => handleSkipJob(job.id)}
                        onToggleSave={() => onToggleSaveJob(job.id)}
                        onReviewApplication={() => handleSelectJobForReview(job)}
                        activeResumeName={activeResumeVersion.name}
                        readinessScore={job.applicationReadiness?.score || 88}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyJobsState
                    onNavigateToJobs={onNavigateToJobs}
                    onResetFilters={() =>
                      setFilters({ minScore: undefined, workMode: undefined, experience: undefined })
                    }
                  />
                )}
              </>
            )}

            {/* Subtle Professional Branding Footer */}
            <div className="pt-6 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>JobAI Career Automation Pipeline</span>
              <span className="font-semibold text-slate-500">Powered by CodeByTushu</span>
            </div>
          </div>

          {/* Right Queue Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <ApplicationQueueSidebar
              queueJobs={filteredJobs}
              activeJobId={selectedJobId}
              onSelectJob={(jobId) => {
                const target = initialJobsData.find((j) => j.id === jobId)
                if (target) handleSelectJobForReview(target)
              }}
              onSkipJob={handleSkipJob}
              trackedApplications={trackedApplications}
              currentTab={sidebarTab}
              onChangeTab={setSidebarTab}
            />
          </div>
        </div>
      </div>

      {/* Auto Apply Configuration Modal */}
      <AutoApplyConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onSaveConfig={handleSaveConfig}
        resumeVersions={resumeVersions}
        currentConfig={config}
      />

      {/* Review & Confirmation Modal */}
      <ApplicationReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        application={activePreparedApp}
        onConfirmApplication={handleConfirmApplication}
      />

      {/* 5-Step Animated Submission & Receipt Modal */}
      <SubmittingProgressModal
        isOpen={isSubmittingModalOpen}
        onClose={() => setIsSubmittingModalOpen(false)}
        currentStepIndex={submittingStepIndex}
        steps={SUBMISSION_STEPS}
        isCompleted={isSubmissionCompleted}
        result={submissionResult}
        job={activePreparedApp?.job || null}
        resumeVersionName={activeResumeVersion.name}
        onContinueQueue={handleContinueNextJob}
        onViewHistory={() => {
          setIsSubmittingModalOpen(false)
          setActivePreparedApp(null)
          setSelectedJobId(null)
          if (onNavigateToApplications) {
            onNavigateToApplications()
          } else {
            setSidebarTab('history')
          }
        }}
      />
    </div>
  )
}
