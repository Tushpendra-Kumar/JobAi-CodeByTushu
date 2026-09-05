import React, { useState, useMemo } from 'react'
import { initialJobsData } from '@/data/jobsData'
import { JobDetailsBreadcrumb } from './JobDetailsBreadcrumb'
import { JobDetailsHeader } from './JobDetailsHeader'
import { AiMatchSummaryCard } from './AiMatchSummaryCard'
import { AiExplanationSection } from './AiExplanationSection'
import { PotentialSkillGapsSection } from './PotentialSkillGapsSection'
import { SkillsComparisonSection } from './SkillsComparisonSection'
import { JobOverviewSection } from './JobOverviewSection'
import { ApplicationReadinessCard } from './ApplicationReadinessCard'
import { AboutCompanyCard } from './AboutCompanyCard'
import { JobMetadataCard } from './JobMetadataCard'
import { ApplyCtaCard } from './ApplyCtaCard'
import { SimilarJobsSection } from './SimilarJobsSection'
import { JobNotFoundState } from './JobNotFoundState'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Bot, CheckCircle2, Sparkles, FileText, Send } from 'lucide-react'

export interface JobDetailsScreenProps {
  jobId: string
  savedJobIds: string[]
  onToggleSave: (jobId: string) => void
  onBackToJobs: () => void
  onSelectJob: (jobId: string) => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
  onNavigateToAiMatching?: () => void
}

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({
  jobId,
  savedJobIds,
  onToggleSave,
  onBackToJobs,
  onSelectJob,
  onToast,
  onNavigateToAiMatching,
}) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [isSubmittingApp, setIsSubmittingApp] = useState(false)

  // Retrieve current job
  const job = useMemo(() => {
    return initialJobsData.find((j) => j.id === jobId)
  }, [jobId])

  // Retrieve similar jobs
  const similarJobs = useMemo(() => {
    if (!job) return []
    return initialJobsData
      .filter((j) => j.id !== job.id && (job.similarJobIds.includes(j.id) || j.skills.some((s) => job.skills.includes(s))))
      .slice(0, 3)
  }, [job])

  if (!job) {
    return <JobNotFoundState onBackToSearch={onBackToJobs} />
  }

  const isSaved = savedJobIds.includes(job.id)

  const handleShare = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href)
      }
      onToast('Job link copied to clipboard!', 'success')
    } catch {
      onToast('Job link copied to clipboard!', 'info')
    }
  }

  const handlePrepareWithAi = () => {
    onToast(
      `AI Copilot: Auto-drafting customized cover letter & tailoring resume bullets for ${job.company}...`,
      'info'
    )
    setIsApplyModalOpen(true)
  }

  const handleConfirmApply = () => {
    setIsSubmittingApp(true)
    setTimeout(() => {
      setIsSubmittingApp(false)
      setIsApplyModalOpen(false)
      onToast(
        `Application successfully prepared for ${job.title} at ${job.company}! Added to your tracking pipeline.`,
        'success'
      )
    }, 700)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 1. Breadcrumb Navigation */}
        <JobDetailsBreadcrumb
          jobTitle={job.title}
          onBackToJobs={onBackToJobs}
        />

        {/* 2. Top Job Header Card */}
        <JobDetailsHeader
          job={job}
          isSaved={isSaved}
          onToggleSave={() => onToggleSave(job.id)}
          onApply={() => setIsApplyModalOpen(true)}
          onShare={handleShare}
        />

        {/* 3. Two-Column Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Content (col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            {/* AI Recommendation Explanation */}
            <AiExplanationSection reasons={job.aiRecommendationReasons} />

            {/* Core Job Overview, Responsibilities, Requirements */}
            <JobOverviewSection job={job} />

            {/* Your Skills vs Job Requirements Comparison Table */}
            <SkillsComparisonSection comparisons={job.skillComparisons} />

            {/* Potential Skill Gaps */}
            <PotentialSkillGapsSection
              skillGaps={job.skillGaps}
              onViewSkillRoadmap={() =>
                onToast(
                  `Personalized Skill Roadmap for ${job.title}: Previewing future Career Insights roadmap.`,
                  'info'
                )
              }
            />
          </div>

          {/* Right Sidebar (col-span-4) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
            {/* AI Match Summary Card */}
            <AiMatchSummaryCard
              score={job.matchScore}
              breakdown={job.matchScoreBreakdown}
              onViewAllMatches={onNavigateToAiMatching}
            />

            {/* Ready to Apply CTA Card */}
            <ApplyCtaCard
              onApplyNow={() => setIsApplyModalOpen(true)}
              onPrepareWithAi={handlePrepareWithAi}
            />

            {/* Application Readiness Card */}
            <ApplicationReadinessCard
              readiness={job.applicationReadiness}
              onImproveProfile={() =>
                onToast(
                  'Profile Diagnostic: Opening ATS resume analyzer (Screen #6 feature preview).',
                  'info'
                )
              }
            />

            {/* Job Metadata Specification Card */}
            <JobMetadataCard job={job} />

            {/* About Company Card */}
            <AboutCompanyCard
              job={job}
              onViewCompany={() =>
                onToast(`Viewing official profile for ${job.company}`, 'info')
              }
            />
          </div>
        </div>

        {/* 4. Similar Jobs Section */}
        <SimilarJobsSection
          similarJobs={similarJobs}
          onSelectJob={onSelectJob}
        />
      </div>

      {/* Demo Application Modal */}
      {isApplyModalOpen && (
        <Modal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          title={`Apply for ${job.title}`}
          description={`${job.company} • ${job.location}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-left pt-2">
            {/* AI Readiness Banner */}
            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3 text-xs">
              <Bot className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-indigo-950">
                    Copilot Application Preparation
                  </span>
                  <Badge variant="indigo" size="sm" className="px-1.5 py-0 text-[10px]">
                    {job.matchScore}% Match
                  </Badge>
                </div>
                <p className="text-indigo-900/80 leading-relaxed">
                  Your profile highlights matching experience in {job.skills.slice(0, 3).join(', ')}. Review your application package below before dispatching.
                </p>
              </div>
            </div>

            {/* Package Checklist */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Application Package Components
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-600" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        Tailored Resume Variant
                      </p>
                      <p className="text-[11px] text-slate-500">
                        ATS-optimized for {job.company} specifications
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Ready
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        AI Personalized Cover Letter
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Contextualized for {job.title} responsibilities
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    Drafted
                  </span>
                </div>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-500">
              <p className="flex items-center gap-1.5 font-semibold text-slate-700 mb-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Portfolio Demo Application Flow
              </p>
              <p>
                In this demo mode, submitting simulates instant application packaging and registers the opportunity into your Application Tracking pipeline (Screen #9 preview).
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 flex items-center justify-end gap-2.5">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsApplyModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleConfirmApply}
                isLoading={isSubmittingApp}
                leftIcon={<Send className="w-3.5 h-3.5" />}
                className="font-bold text-xs"
              >
                Submit Demo Application
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
