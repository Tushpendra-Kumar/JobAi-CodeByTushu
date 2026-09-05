import React, { useState, useEffect, useCallback } from 'react'
import {
  CareerInsightsHeader,
} from './CareerInsightsHeader'
import {
  CareerReadinessHeroCard,
} from './CareerReadinessHeroCard'
import {
  BestCareerDirectionCard,
} from './BestCareerDirectionCard'
import {
  RoleFitSection,
} from './RoleFitSection'
import {
  SkillProfileSection,
} from './SkillProfileSection'
import {
  SkillGapSection,
} from './SkillGapSection'
import {
  TechnicalProfileSummaryCard,
} from './TechnicalProfileSummaryCard'
import {
  ProjectPortfolioStrengthCard,
} from './ProjectPortfolioStrengthCard'
import {
  JobMarketAlignmentCard,
} from './JobMarketAlignmentCard'
import {
  ApplicationPerformanceSection,
} from './ApplicationPerformanceSection'
import {
  AiInsightsSection,
} from './AiInsightsSection'
import {
  CareerRisksGapsCard,
} from './CareerRisksGapsCard'
import {
  Next5ActionsPlanSection,
} from './Next5ActionsPlanSection'
import {
  ProfileCompletenessResumeHealth,
} from './ProfileCompletenessResumeHealth'
import {
  CareerGoalModal,
} from './CareerGoalModal'
import {
  LearningPlanModal,
} from './LearningPlanModal'
import {
  defaultCareerInsightsProvider,
  getSavedCareerGoal,
  saveCareerGoal,
  type CareerGoal,
  type CareerInsightsReport,
} from '@/services/careerInsightsService'
import { defaultParsedResume, type ParsedResume } from '@/data/resumeData'
import { defaultCandidateProfile, type CandidateProfile } from '@/data/candidateProfile'
import { getTrackedApplications } from '@/services/applicationTrackingService'
import { initialJobsData } from '@/data/jobsData'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CareerInsightsScreenProps {
  parsedResume?: ParsedResume
  candidateProfile?: CandidateProfile
  onNavigateToJobs: () => void
  onNavigateToMatching: () => void
  onNavigateToResume: () => void
  onNavigateToResumeBuilder: () => void
  onNavigateToCoverLetter: () => void
  onNavigateToAutoApply: () => void
  onNavigateToApplications: (stage?: string) => void
  onToast?: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export const CareerInsightsScreen: React.FC<CareerInsightsScreenProps> = ({
  parsedResume = defaultParsedResume,
  candidateProfile = defaultCandidateProfile,
  onNavigateToJobs,
  onNavigateToMatching,
  onNavigateToResume,
  onNavigateToResumeBuilder,
  onNavigateToCoverLetter,
  onNavigateToAutoApply,
  onNavigateToApplications,
  onToast,
}) => {
  const [careerGoal, setCareerGoal] = useState<CareerGoal>(() => getSavedCareerGoal())
  const [report, setReport] = useState<CareerInsightsReport | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
  const [isLearningPlanModalOpen, setIsLearningPlanModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCurrent = true
    const fetchInitial = async () => {
      try {
        setError(null)
        const apps = getTrackedApplications()
        const res = await defaultCareerInsightsProvider.generateInsights(
          parsedResume,
          candidateProfile,
          careerGoal,
          apps,
          initialJobsData
        )
        if (isCurrent) {
          setReport(res)
          setIsLoading(false)
        }
      } catch (err) {
        if (isCurrent) {
          console.error('Failed to calculate career insights:', err)
          setError('Failed to analyze career data. Please try again.')
          setIsLoading(false)
        }
      }
    }
    fetchInitial()
    return () => {
      isCurrent = false
    }
  }, [careerGoal, parsedResume, candidateProfile])

  const refreshReport = useCallback(
    async (goal: CareerGoal) => {
      try {
        setIsRefreshing(true)
        setError(null)
        const apps = getTrackedApplications()
        const res = await defaultCareerInsightsProvider.generateInsights(
          parsedResume,
          candidateProfile,
          goal,
          apps,
          initialJobsData
        )
        setReport(res)
        if (onToast) {
          onToast('Career insights successfully updated with latest activity.', 'success')
        }
      } catch (err) {
        console.error('Failed to calculate career insights:', err)
        setError('Failed to analyze career data. Please try again.')
      } finally {
        setIsRefreshing(false)
      }
    },
    [parsedResume, candidateProfile, onToast]
  )

  const handleSaveGoal = (newGoal: CareerGoal) => {
    saveCareerGoal(newGoal)
    setCareerGoal(newGoal)
    refreshReport(newGoal)
  }

  const handleManualRefresh = () => {
    refreshReport(careerGoal)
  }

  // Handle generic screen routing from action cards
  const handleActionClick = (screen: string, param?: string) => {
    switch (screen) {
      case 'jobs':
        onNavigateToJobs()
        break
      case 'ai-matching':
        onNavigateToMatching()
        break
      case 'resume':
        onNavigateToResume()
        break
      case 'resume-builder':
        onNavigateToResumeBuilder()
        break
      case 'ai-cover-letter':
        onNavigateToCoverLetter()
        break
      case 'ai-auto-apply':
        onNavigateToAutoApply()
        break
      case 'applications':
        onNavigateToApplications(param)
        break
      default:
        onNavigateToJobs()
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle scroll to Skill Gaps section
  const handleScrollToSkillGaps = () => {
    const el = document.getElementById('skills-to-improve')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle scroll to recommendations
  const handleScrollToRecommendations = () => {
    const el = document.getElementById('skills-to-improve')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-7">
        {/* 1. Page Header */}
        <CareerInsightsHeader
          careerGoal={careerGoal}
          onRefresh={handleManualRefresh}
          isRefreshing={isRefreshing}
          onOpenGoalModal={() => setIsGoalModalOpen(true)}
          onNavigateToRecommendations={handleScrollToRecommendations}
          onNavigateToProfile={onNavigateToResume}
        />

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-56 bg-slate-200/70 rounded-2xl w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 bg-slate-200/70 rounded-2xl" />
              <div className="h-64 bg-slate-200/70 rounded-2xl" />
            </div>
            <div className="h-48 bg-slate-200/70 rounded-2xl" />
          </div>
        ) : error ? (
          /* Error State */
          <div className="p-8 rounded-2xl bg-white border border-rose-200 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-base font-bold text-slate-900">Career Insights Unavailable</div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">{error}</p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => refreshReport(careerGoal)}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              Retry Analysis
            </Button>
          </div>
        ) : report ? (
          /* Main Dashboard Content Layout */
          <div className="space-y-7">
            {/* 2. Career Readiness Hero Score Card */}
            <CareerReadinessHeroCard
              readiness={report.readiness}
              onOptimizeResume={onNavigateToResumeBuilder}
              onCompleteProfile={onNavigateToResume}
            />

            {/* 3. Best Career Direction & Primary Recommendation */}
            <BestCareerDirectionCard
              role={report.bestRoleRecommendation.role}
              fitScore={report.bestRoleRecommendation.fitScore}
              reasons={report.bestRoleRecommendation.reasons}
              matchingSkills={report.bestRoleRecommendation.matchingSkills}
              skillGaps={report.bestRoleRecommendation.skillGaps}
              onExploreJobs={onNavigateToJobs}
              onOptimizeResume={onNavigateToResumeBuilder}
              onScrollToSkillGaps={handleScrollToSkillGaps}
            />

            {/* 4. Role Fit Analysis (6 comparative roles) */}
            <RoleFitSection
              roles={report.roleFitList}
              onSelectRoleAction={(screen) => handleActionClick(screen)}
            />

            {/* 5. Middle Row: Technical Profile Summary & Skill Profile */}
            <TechnicalProfileSummaryCard
              summary={report.technicalProfileSummary}
              onImproveSummary={onNavigateToResumeBuilder}
            />

            <SkillProfileSection skillProfile={report.skillProfile} />

            {/* 6. Skill Gap Analysis (High / Medium / Low priorities) */}
            <SkillGapSection
              targetRole={report.careerGoal.targetRole}
              gaps={report.skillGaps}
              onOpenLearningPlan={() => setIsLearningPlanModalOpen(true)}
            />

            {/* 7. Next 5 Actions Prioritized Plan */}
            <Next5ActionsPlanSection
              actions={report.next5Actions}
              onActionClick={handleActionClick}
            />

            {/* 8. Project Portfolio Strength & Job Market Alignment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <ProjectPortfolioStrengthCard
                projects={report.projectPortfolio}
                onImproveProject={onNavigateToResumeBuilder}
              />
              <JobMarketAlignmentCard
                alignment={report.marketAlignment}
                onExploreJobs={onNavigateToJobs}
              />
            </div>

            {/* 9. Application Performance Insights & Trend */}
            <ApplicationPerformanceSection
              metrics={report.applicationMetrics}
              statusDistribution={report.applicationStatusDistribution}
              onNavigateToApplications={onNavigateToApplications}
            />

            {/* 10. AI Career Insights & Potential Career Gaps */}
            <div className="space-y-6">
              <AiInsightsSection
                insights={report.aiInsights}
                onActionClick={handleActionClick}
              />
              <CareerRisksGapsCard
                risks={report.careerRisks}
                onActionClick={handleActionClick}
              />
            </div>

            {/* 11. Profile Completeness & Resume Health */}
            <ProfileCompletenessResumeHealth
              completeness={report.profileCompleteness}
              resumeHealth={report.resumeHealth}
              onCompleteProfile={onNavigateToResume}
              onImproveResume={onNavigateToResumeBuilder}
            />
          </div>
        ) : null}
      </div>

      {/* Career Goal Setting Modal */}
      <CareerGoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        currentGoal={careerGoal}
        onSaveGoal={handleSaveGoal}
      />

      {/* 4-Week Skill Roadmap Modal */}
      <LearningPlanModal
        isOpen={isLearningPlanModalOpen}
        onClose={() => setIsLearningPlanModalOpen(false)}
        targetRole={careerGoal.targetRole}
      />
    </div>
  )
}
