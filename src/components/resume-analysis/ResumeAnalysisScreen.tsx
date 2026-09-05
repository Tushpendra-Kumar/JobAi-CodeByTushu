import React, { useState, useMemo } from 'react'
import type { ParsedResume } from '@/data/resumeData'
import type { Job } from '@/data/jobsData'
import {
  analyzeResume,
  type TargetRole,
  type ResumeAnalysisResult,
} from '@/services/resumeAnalysisService'
import { AnalysisHeader } from './AnalysisHeader'
import { OverallScoreCard } from './OverallScoreCard'
import { ScoreBreakdownGrid } from './ScoreBreakdownGrid'
import { TargetRoleComparisonCard } from './TargetRoleComparisonCard'
import { AtsCompatibilitySection } from './AtsCompatibilitySection'
import { KeywordCoverageSection } from './KeywordCoverageSection'
import { TechnicalSkillsAnalysisSection } from './TechnicalSkillsAnalysisSection'
import { ExperienceAndProjectAnalysisSection } from './ExperienceAndProjectAnalysisSection'
import { StrengthsAndWeaknessesSection } from './StrengthsAndWeaknessesSection'
import { PriorityRecommendationsSection } from './PriorityRecommendationsSection'
import { ImprovementPlanAndPreviewSection } from './ImprovementPlanAndPreviewSection'
import { SectionScoresAndHistoryCard } from './SectionScoresAndHistoryCard'
import { AnalysisActionPanel } from './AnalysisActionPanel'
import { CompareJobModal } from './CompareJobModal'
import {
  AnalysisLoadingView,
  AnalysisEmptyState,
  AnalysisErrorState,
} from './AnalysisStates'

export interface ResumeAnalysisScreenProps {
  parsedResume: ParsedResume | null
  onNavigateToUpload: () => void
  onNavigateToBuilder?: () => void
  onToast: (message: string, type?: 'success' | 'info' | 'warning') => void
}

export const ResumeAnalysisScreen: React.FC<ResumeAnalysisScreenProps> = ({
  parsedResume,
  onNavigateToUpload,
  onNavigateToBuilder,
  onToast,
}) => {
  // State for target role and selected benchmark job
  const [selectedRole, setSelectedRole] = useState<TargetRole>('Software Developer')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isCompareJobModalOpen, setIsCompareJobModalOpen] = useState(false)

  // Loading, Re-analyzing, and Error states
  const [isLoading, setIsLoading] = useState(false)
  const [isReanalyzing, setIsReanalyzing] = useState(false)
  const [isError, setIsError] = useState(false)

  // Memoized evaluation result computed through the decoupled service
  const analysisResult: ResumeAnalysisResult = useMemo(() => {
    if (!parsedResume) {
      // Fallback placeholder object if no resume is loaded
      return analyzeResume({} as ParsedResume, selectedRole, selectedJob)
    }
    return analyzeResume(parsedResume, selectedRole, selectedJob)
  }, [parsedResume, selectedRole, selectedJob])

  // Re-analyze trigger with realistic progressive loading animation
  const handleReanalyze = () => {
    setIsReanalyzing(true)
    setTimeout(() => {
      setIsReanalyzing(false)
      onToast('AI resume analysis refreshed with latest hiring models.', 'success')
    }, 750)
  }

  // Handle Target Role change
  const handleSelectRole = (role: TargetRole) => {
    setSelectedJob(null)
    setSelectedRole(role)
    onToast(`Recalibrated analysis benchmark for “${role}”.`, 'info')
  }

  // Handle Compare With Job selection
  const handleSelectJob = (job: Job | null) => {
    setSelectedJob(job)
    if (job) {
      onToast(`Comparing resume against “${job.title}” at ${job.company}.`, 'success')
    } else {
      onToast(`Reverted to general ${selectedRole} benchmark.`, 'info')
    }
  }

  // Handle "Improve My Resume" CTA (Navigates to Screen #7 AI Resume Builder)
  const handleImproveResume = () => {
    if (onNavigateToBuilder) {
      onNavigateToBuilder()
      onToast('Launched AI Resume Builder with verified analysis benchmarks.', 'success')
    } else {
      onToast(
        'AI Resume Builder: Launching automated ATS builder.',
        'info'
      )
    }
  }

  // Handle "Download Analysis" demo action
  const handleDownloadAnalysis = () => {
    onToast(
      'Demo Summary: You can print or save this page as PDF via browser print (Ctrl+P / Cmd+P).',
      'info'
    )
  }

  // 1. Empty State: No resume present
  if (!parsedResume) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
        <AnalysisEmptyState onUploadResume={onNavigateToUpload} />
      </div>
    )
  }

  // 2. Error State: Analysis calculation failure
  if (isError) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
        <AnalysisErrorState
          onRetry={() => setIsError(false)}
          onReplaceResume={onNavigateToUpload}
        />
      </div>
    )
  }

  // 3. Loading State: Full loading screen simulation
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
        <AnalysisLoadingView onComplete={() => setIsLoading(false)} />
      </div>
    )
  }

  // 4. Main Dashboard View
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* 1. Header with file metadata and actions */}
        <AnalysisHeader
          fileName={parsedResume.fileName || 'Tushpendra_Kumar_Resume.pdf'}
          status="Analyzed"
          isReanalyzing={isReanalyzing}
          onReplaceResume={onNavigateToUpload}
          onReanalyze={handleReanalyze}
        />

        {/* 2. Overall Resume Score Hero Card */}
        <OverallScoreCard
          score={analysisResult.overallScore}
          label={analysisResult.scoreLabel}
          message={analysisResult.scoreMessage}
          confidenceScore={analysisResult.confidenceScore}
          confidenceNote={analysisResult.confidenceNote}
        />

        {/* 3. 7 Evaluation Dimension Cards */}
        <ScoreBreakdownGrid items={analysisResult.breakdown} />

        {/* 4. Target Role & Job Comparison Section */}
        <TargetRoleComparisonCard
          selectedRole={selectedRole}
          onSelectRole={handleSelectRole}
          selectedJobTitle={analysisResult.selectedJobTitle}
          matchScore={analysisResult.roleMatchScore}
          matchingSkills={analysisResult.roleMatchingSkills}
          improvementSkills={analysisResult.roleImprovementSkills}
          onOpenCompareJobModal={() => setIsCompareJobModalOpen(true)}
        />

        {/* 5. ATS Compatibility Section */}
        <AtsCompatibilitySection
          score={analysisResult.atsScore}
          checks={analysisResult.atsChecks}
          improvements={analysisResult.atsImprovements}
        />

        {/* 6. Keyword Coverage Section */}
        <KeywordCoverageSection
          detectedKeywords={analysisResult.detectedKeywords}
          recommendedKeywords={analysisResult.recommendedKeywords}
        />

        {/* 7. Technical Skills Categorization & AI Interpretation */}
        <TechnicalSkillsAnalysisSection
          skills={parsedResume.skills}
          interpretation={analysisResult.skillsInterpretation}
        />

        {/* 8. Experience Strength & Project Strength Split Grid */}
        <ExperienceAndProjectAnalysisSection
          experienceAnalysis={analysisResult.experienceAnalysis}
          projectAnalysis={analysisResult.projectAnalysis}
        />

        {/* 9. Strengths & Weaknesses 2-Column Section */}
        <StrengthsAndWeaknessesSection
          strengths={analysisResult.strengths}
          weaknesses={analysisResult.weaknesses}
        />

        {/* 10. Prioritized Top Recommendations */}
        <PriorityRecommendationsSection
          recommendations={analysisResult.priorityRecommendations}
        />

        {/* 11. 4-Step Improvement Plan & Before/After Preview */}
        <ImprovementPlanAndPreviewSection
          onImproveResume={handleImproveResume}
          beforeAfterPreview={analysisResult.beforeAfterPreview}
        />

        {/* 12. Section-by-Section Scores & History Tracking */}
        <SectionScoresAndHistoryCard
          sectionScores={analysisResult.sectionScores}
          history={analysisResult.history}
        />

        {/* 13. Final Action Panel */}
        <AnalysisActionPanel
          onImproveResume={handleImproveResume}
          onAnalyzeAgainstJob={() => setIsCompareJobModalOpen(true)}
          onDownloadAnalysis={handleDownloadAnalysis}
        />
      </div>

      {/* Compare With Job Modal */}
      <CompareJobModal
        isOpen={isCompareJobModalOpen}
        onClose={() => setIsCompareJobModalOpen(false)}
        onSelectJob={handleSelectJob}
        currentlySelectedJobId={selectedJob?.id}
      />
    </div>
  )
}
