import React, { useState, useMemo } from 'react'
import { DashboardSidebar } from '@/components/matching/DashboardSidebar'
import { TrackingHeader } from './TrackingHeader'
import { TrackingOverviewCards } from './TrackingOverviewCards'
import { PipelineStageBar } from './PipelineStageBar'
import { TrackingFilterBar } from './TrackingFilterBar'
import type { TrackingFilterCriteria, TrackingViewMode } from './TrackingFilterBar'
import { ApplicationKanbanBoard } from './ApplicationKanbanBoard'
import { ApplicationListView } from './ApplicationListView'
import { ApplicationDetailDrawer } from './ApplicationDetailDrawer'
import { FollowUpRemindersCard } from './FollowUpRemindersCard'
import { AiInsightsModal } from './AiInsightsModal'
import { AddApplicationModal } from './AddApplicationModal'
import { ViewCoverLetterModal } from './ViewCoverLetterModal'
import { TrackingEmptyState } from './TrackingEmptyState'
import type {
  TrackedApplication,
  NormalizedPipelineStage,
  ApplicationStatus,
  ApplicationNextAction,
} from '@/services/applicationTrackingService'
import {
  getTrackedApplications,
  saveTrackedApplication,
  updateApplicationStatus,
  addApplicationNote,
  deleteApplicationNote,
  updateNextAction,
  normalizeStatus,
} from '@/services/applicationTrackingService'
import { getSavedResumeVersions } from '@/services/resumeVersionService'

export interface ApplicationTrackingScreenProps {
  onNavigateToJobs: () => void
  onNavigateToAutoApply?: () => void
  onNavigateToResumeBuilder?: () => void
  onNavigateToResume?: () => void
  onNavigateToAnalysis?: () => void
  onNavigateToMatching?: () => void
  onNavigateToCoverLetter?: () => void
  onNavigateToCareerInsights?: () => void
  onNavigateToProfile?: () => void
  onNavigateToPricing?: () => void
  onSelectJob?: (jobId: string) => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export const ApplicationTrackingScreen: React.FC<ApplicationTrackingScreenProps> = ({
  onNavigateToJobs,
  onNavigateToAutoApply,
  onNavigateToResumeBuilder,
  onNavigateToResume,
  onNavigateToAnalysis,
  onNavigateToMatching,
  onNavigateToCoverLetter,
  onNavigateToCareerInsights,
  onNavigateToProfile,
  onNavigateToPricing,
  onSelectJob,
  onToast,
}) => {
  // Loaded applications state
  const [applications, setApplications] = useState<TrackedApplication[]>(() =>
    getTrackedApplications()
  )

  // Selected application ID for slide-out detail drawer
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null)

  // Derived selected application instance
  const selectedApplication = useMemo(() => {
    if (!selectedAppId) return null
    return applications.find((a) => a.id === selectedAppId) || null
  }, [applications, selectedAppId])

  // Modals state
  const [isInsightsModalOpen, setIsInsightsModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [coverLetterApp, setCoverLetterApp] = useState<TrackedApplication | null>(
    null
  )

  // View mode: 'board' vs 'list'
  const [viewMode, setViewMode] = useState<TrackingViewMode>('board')

  // Available resume versions for filtering
  const resumeVersions = useMemo(() => {
    return getSavedResumeVersions().map((v) => ({ id: v.id, name: v.name }))
  }, [])

  // Filter & Search criteria
  const [filters, setFilters] = useState<TrackingFilterCriteria>({
    searchQuery: '',
    stage: 'All',
    minScore: undefined,
    workMode: undefined,
    dateRange: 'all',
    resumeVersionId: undefined,
    sortBy: 'recently-updated',
  })

  // Compute stage counts
  const stageCounts = useMemo(() => {
    const counts: Record<NormalizedPipelineStage, number> = {
      Saved: 0,
      Preparing: 0,
      'Ready to Apply': 0,
      Applied: 0,
      Screening: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
      Withdrawn: 0,
    }

    applications.forEach((app) => {
      const norm = normalizeStatus(app.status)
      if (counts[norm] !== undefined) {
        counts[norm]++
      }
    })

    return counts
  }, [applications])

  // Overview metrics
  const overviewStats = useMemo(() => {
    return {
      total: applications.length,
      applied: stageCounts['Applied'] || 0,
      screening: stageCounts['Screening'] || 0,
      interview: stageCounts['Interview'] || 0,
      offer: stageCounts['Offer'] || 0,
      rejected: stageCounts['Rejected'] || 0,
    }
  }, [applications, stageCounts])

  // Applications with upcoming or overdue actions
  const applicationsWithActions = useMemo(() => {
    return applications.filter(
      (app) => app.nextAction && !app.nextAction.completed
    )
  }, [applications])

  // Filtered and Sorted Applications
  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        // Search query filter
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase()
          const matchTitle = app.jobTitle.toLowerCase().includes(q)
          const matchCompany = app.company.toLowerCase().includes(q)
          const matchLocation = app.location.toLowerCase().includes(q)
          if (!matchTitle && !matchCompany && !matchLocation) {
            return false
          }
        }

        // Stage filter
        if (filters.stage !== 'All') {
          const norm = normalizeStatus(app.status)
          if (norm !== filters.stage) {
            return false
          }
        }

        // Min score filter
        if (filters.minScore && app.matchScore < filters.minScore) {
          return false
        }

        // Work mode filter
        if (filters.workMode && app.workMode !== filters.workMode) {
          return false
        }

        // Resume version filter
        if (
          filters.resumeVersionId &&
          app.resumeVersionId !== filters.resumeVersionId
        ) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'highest-match':
            return b.matchScore - a.matchScore
          case 'lowest-match':
            return a.matchScore - b.matchScore
          case 'job-title':
            return a.jobTitle.localeCompare(b.jobTitle)
          case 'company':
            return a.company.localeCompare(b.company)
          case 'next-action':
            return (a.nextAction?.dueDate || 'zzz').localeCompare(
              b.nextAction?.dueDate || 'zzz'
            )
          case 'recently-applied':
            return (b.appliedAt || '').localeCompare(a.appliedAt || '')
          case 'recently-updated':
          default:
            return 0
        }
      })
  }, [applications, filters])

  // Handlers for status, notes, next action
  const handleUpdateStatus = (
    id: string,
    newStatus: ApplicationStatus,
    optionalNote?: string
  ) => {
    const updated = updateApplicationStatus(id, newStatus, optionalNote)
    if (updated) {
      setApplications(getTrackedApplications())
      onToast(`Status updated to “${newStatus}” for ${updated.jobTitle}.`, 'success')
    }
  }

  const handleAddNote = (appId: string, text: string) => {
    const note = addApplicationNote(appId, text)
    if (note) {
      setApplications(getTrackedApplications())
      onToast('Note added to application record.', 'success')
    }
  }

  const handleDeleteNote = (appId: string, noteId: string) => {
    const ok = deleteApplicationNote(appId, noteId)
    if (ok) {
      setApplications(getTrackedApplications())
      onToast('Note removed.', 'info')
    }
  }

  const handleUpdateNextAction = (
    appId: string,
    action: ApplicationNextAction | undefined
  ) => {
    updateNextAction(appId, action)
    setApplications(getTrackedApplications())
    onToast(action ? 'Next action scheduled.' : 'Next action cleared.', 'success')
  }

  const handleMarkActionDone = (appId: string) => {
    const app = applications.find((a) => a.id === appId)
    if (app && app.nextAction) {
      updateNextAction(appId, { ...app.nextAction, completed: true })
      setApplications(getTrackedApplications())
      onToast(`Action completed for ${app.jobTitle}!`, 'success')
    }
  }

  const handleSaveNewApplication = (newApp: TrackedApplication) => {
    saveTrackedApplication(newApp)
    setApplications(getTrackedApplications())
    onToast(`Added application for ${newApp.jobTitle} at ${newApp.company}!`, 'success')
  }

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      stage: 'All',
      minScore: undefined,
      workMode: undefined,
      dateRange: 'all',
      resumeVersionId: undefined,
      sortBy: 'recently-updated',
    })
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Left Navigation Sidebar with Applications active */}
          <DashboardSidebar
            activeTab="applications"
            onSelectTab={() => {}}
            onNavigateToJobs={onNavigateToJobs}
            onNavigateToResume={onNavigateToResume}
            onNavigateToAnalysis={onNavigateToAnalysis}
            onNavigateToBuilder={onNavigateToResumeBuilder}
            onNavigateToCoverLetter={onNavigateToCoverLetter}
            onNavigateToAutoApply={onNavigateToAutoApply}
            onNavigateToMatching={onNavigateToMatching}
            onNavigateToCareerInsights={onNavigateToCareerInsights}
            onNavigateToProfile={onNavigateToProfile}
            onNavigateToPricing={onNavigateToPricing}
            onToast={onToast}
            className="lg:sticky lg:top-20"
          />

          {/* Main Applications Workspace */}
          <main className="flex-1 w-full space-y-6 sm:space-y-7">
            {/* 1. Page Header */}
            <TrackingHeader
              totalCount={applications.length}
              activeFollowUpsCount={applicationsWithActions.length}
              onAddApplication={() => setIsAddModalOpen(true)}
              onOpenAiInsights={() => setIsInsightsModalOpen(true)}
            />

            {/* 2. Follow-Up Reminders Alert Card (if any pending actions) */}
            <FollowUpRemindersCard
              applicationsWithActions={applicationsWithActions}
              onSelectApplication={(app) => setSelectedAppId(app.id)}
              onMarkActionDone={handleMarkActionDone}
            />

            {/* 3. Metric Summary Cards */}
            <TrackingOverviewCards
              totalCount={overviewStats.total}
              appliedCount={overviewStats.applied}
              screeningCount={overviewStats.screening}
              interviewCount={overviewStats.interview}
              offerCount={overviewStats.offer}
              rejectedCount={overviewStats.rejected}
              selectedStageFilter={filters.stage}
              onSelectStage={(stage) =>
                setFilters((prev) => ({ ...prev, stage }))
              }
            />

            {/* 4. Visual 8-Stage Pipeline Progression Bar */}
            <PipelineStageBar
              stageCounts={stageCounts}
              selectedStage={filters.stage}
              onSelectStage={(stage) =>
                setFilters((prev) => ({ ...prev, stage }))
              }
            />

            {/* 5. Filter & View Switcher Bar */}
            <TrackingFilterBar
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalFilteredCount={filteredApplications.length}
              availableResumeVersions={resumeVersions}
            />

            {/* 6. Main Pipeline Content (Kanban vs List vs Empty State) */}
            {applications.length === 0 ? (
              <TrackingEmptyState
                onNavigateToJobs={onNavigateToJobs}
                onNavigateToAutoApply={onNavigateToAutoApply || onNavigateToJobs}
                onAddApplication={() => setIsAddModalOpen(true)}
              />
            ) : filteredApplications.length === 0 ? (
              <TrackingEmptyState
                isFilteredEmpty
                onResetFilters={handleResetFilters}
                onNavigateToJobs={onNavigateToJobs}
                onNavigateToAutoApply={onNavigateToAutoApply || onNavigateToJobs}
                onAddApplication={() => setIsAddModalOpen(true)}
              />
            ) : viewMode === 'board' ? (
              <ApplicationKanbanBoard
                applications={filteredApplications}
                onSelectApplication={(app) => setSelectedAppId(app.id)}
                onUpdateStatus={handleUpdateStatus}
                onAddNote={(app) => {
                  setSelectedAppId(app.id)
                }}
              />
            ) : (
              <ApplicationListView
                applications={filteredApplications}
                onSelectApplication={(app) => setSelectedAppId(app.id)}
                onUpdateStatus={handleUpdateStatus}
                onAddNote={(app) => {
                  setSelectedAppId(app.id)
                }}
              />
            )}

            {/* Footer Branding */}
            <footer className="pt-6 pb-2 text-center text-xs text-slate-400">
              JobAI Career Copilot • Application Tracking Workspace • Powered by CodeByTushu
            </footer>
          </main>
        </div>
      </div>

      {/* Slide-out Application Detail Drawer */}
      <ApplicationDetailDrawer
        application={selectedApplication}
        isOpen={Boolean(selectedApplication)}
        onClose={() => setSelectedAppId(null)}
        onUpdateStatus={handleUpdateStatus}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        onUpdateNextAction={handleUpdateNextAction}
        onNavigateToResumeBuilder={onNavigateToResumeBuilder}
        onViewCoverLetter={(app) => setCoverLetterApp(app)}
        onViewJobDetails={onSelectJob}
      />

      {/* Add Application Modal */}
      <AddApplicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSaveApplication={handleSaveNewApplication}
      />

      {/* AI Career Insights Modal */}
      <AiInsightsModal
        isOpen={isInsightsModalOpen}
        onClose={() => setIsInsightsModalOpen(false)}
        applications={applications}
      />

      {/* View Cover Letter Modal */}
      <ViewCoverLetterModal
        application={coverLetterApp}
        isOpen={Boolean(coverLetterApp)}
        onClose={() => setCoverLetterApp(null)}
        onToast={onToast}
      />
    </div>
  )
}
