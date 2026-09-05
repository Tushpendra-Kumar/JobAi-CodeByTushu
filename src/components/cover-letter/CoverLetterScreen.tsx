import React, { useState, useMemo } from 'react'
import {
  CoverLetterHeader,
} from './CoverLetterHeader'
import {
  JobConfigSection,
  type JobTargetState,
} from './JobConfigSection'
import {
  ResumeSelectSection,
} from './ResumeSelectSection'
import {
  StylePersonalizationSection,
} from './StylePersonalizationSection'
import {
  CoverLetterQualityCard,
} from './CoverLetterQualityCard'
import {
  JobAlignmentPanel,
} from './JobAlignmentPanel'
import {
  AiImprovementToolbar,
} from './AiImprovementToolbar'
import {
  CoverLetterEditorPreview,
} from './CoverLetterEditorPreview'
import {
  BeforeAfterDiffModal,
} from './BeforeAfterDiffModal'
import {
  SavedCoverLettersModal,
} from './SavedCoverLettersModal'
import {
  GeneratingCoverLetterModal,
} from './GeneratingCoverLetterModal'
import { initialJobsData } from '@/data/jobsData'
import { getSavedResumeVersions } from '@/services/resumeVersionService'
import {
  getSavedCoverLetters,
  saveCoverLetter,
  deleteSavedCoverLetter,
  duplicateSavedCoverLetter,
  type CoverLetterTone,
  type CoverLetterLength,
  type CoverLetterPersonalizationOptions,
  type SavedCoverLetter,
  type CoverLetterQualityScore,
} from '@/services/coverLetterService'
import {
  defaultCoverLetterAIProvider,
  type AIImproveAction,
} from '@/services/coverLetterAIService'

interface CoverLetterScreenProps {
  onNavigateToApply?: (jobId?: string) => void
  onNavigateToResumeBuilder?: () => void
}

export const CoverLetterScreen: React.FC<CoverLetterScreenProps> = ({
  onNavigateToApply,
  onNavigateToResumeBuilder,
}) => {
  // 1. Data Sources
  const [savedLetters, setSavedLetters] = useState<SavedCoverLetter[]>(() => getSavedCoverLetters())
  const resumeVersions = useMemo(() => getSavedResumeVersions(), [])

  // 2. Form & Target State
  const [selectedResumeId, setSelectedResumeId] = useState<string>(
    resumeVersions[0]?.id || 'draft-master'
  )
  const [jobState, setJobState] = useState<JobTargetState>({
    mode: 'catalog',
    selectedJobId: initialJobsData[0].id,
    customTitle: initialJobsData[0].title,
    customCompany: initialJobsData[0].company,
    customLocation: initialJobsData[0].location,
    customDescription: '',
  })

  // 3. Style & Personalization State
  const [tone, setTone] = useState<CoverLetterTone>('Professional')
  const [length, setLength] = useState<CoverLetterLength>('Standard')
  const [personalization, setPersonalization] = useState<CoverLetterPersonalizationOptions>({
    highlightSkills: true,
    highlightProjects: true,
    highlightExperience: true,
    mentionCareerGoals: true,
    mentionCompanyInterest: true,
    focusTechnicalStrengths: true,
  })

  // 4. Active Letter Content & Metrics State
  const initialLetter = savedLetters[0]?.versions[0]?.content || ''
  const [activeContent, setActiveContent] = useState<string>(initialLetter)
  const [qualityScore, setQualityScore] = useState<CoverLetterQualityScore>(
    savedLetters[0]?.qualityScore || {
      overallScore: 92,
      jobRelevance: 94,
      personalization: 91,
      clarity: 93,
      professionalTone: 95,
      readability: 90,
      keywordAlignment: 89,
    }
  )
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([
    'React.js',
    'TypeScript',
    'Tailwind CSS',
    'REST APIs',
    'Component Design',
  ])
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([
    'State Management',
    'Web Performance',
    'Automated Testing',
  ])

  // 5. Mobile Tab Switcher ('configure' | 'letter')
  const [mobileTab, setMobileTab] = useState<'configure' | 'letter'>('letter')

  // 6. Modal States
  const [isGeneratingModalOpen, setIsGeneratingModalOpen] = useState(false)
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false)
  const [isImproving, setIsImproving] = useState(false)
  const [activeImproveAction, setActiveImproveAction] = useState<AIImproveAction | null>(null)
  const [diffModal, setDiffModal] = useState<{
    isOpen: boolean
    actionName: string
    originalContent: string
    improvedContent: string
  }>({
    isOpen: false,
    actionName: '',
    originalContent: '',
    improvedContent: '',
  })

  // Active Resume Draft Data
  const activeResumeDraft = useMemo(() => {
    return (
      resumeVersions.find((r) => r.id === selectedResumeId) ||
      resumeVersions[0]
    )
  }, [resumeVersions, selectedResumeId])

  // Current Target Job Info
  const targetJobInfo = useMemo(() => {
    if (jobState.mode === 'catalog') {
      const catalogJob = initialJobsData.find((j) => j.id === jobState.selectedJobId)
      return {
        id: catalogJob?.id,
        title: catalogJob?.title || 'Software Developer',
        company: catalogJob?.company || 'Target Company',
        location: catalogJob?.location || 'Remote',
        skills: catalogJob?.skills || [],
      }
    } else {
      return {
        title: jobState.customTitle || 'Software Developer',
        company: jobState.customCompany || 'Target Company',
        location: jobState.customLocation || 'Remote',
        skills: jobState.analysis?.extractedSkills || [],
      }
    }
  }, [jobState])

  // Handle Toggle Personalization Option
  const handlePersonalizationToggle = (key: keyof CoverLetterPersonalizationOptions) => {
    setPersonalization((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Handle Generation Trigger
  const handleStartGeneration = () => {
    setIsGeneratingModalOpen(true)
  }

  // Handle Generation Completion (called by modal)
  const handleGenerationComplete = async () => {
    try {
      const output = await defaultCoverLetterAIProvider.generate({
        job: targetJobInfo,
        resume: activeResumeDraft.resumeData,
        tone,
        length,
        personalization,
      })

      setActiveContent(output.content)
      setQualityScore(output.qualityScore)
      setMatchedKeywords(output.matchedKeywords)
      setSuggestedKeywords(output.suggestedKeywords)
      setMobileTab('letter')
    } catch (err) {
      console.error('Failed to generate cover letter:', err)
    } finally {
      setIsGeneratingModalOpen(false)
    }
  }

  // Handle AI Improvement Action
  const handleAIImprove = async (action: AIImproveAction) => {
    setIsImproving(true)
    setActiveImproveAction(action)
    try {
      const improved = await defaultCoverLetterAIProvider.improve(activeContent, action, {
        jobTitle: targetJobInfo.title,
        company: targetJobInfo.company,
        resume: activeResumeDraft.resumeData,
      })

      const actionLabels: Record<AIImproveAction, string> = {
        'improve-writing': 'Polish Writing',
        'make-concise': 'Make Concise',
        'make-confident': 'Make Confident',
        'make-technical': 'Technical Depth',
        'improve-alignment': 'Role Alignment',
        'improve-opening': 'Hook Opening',
        'improve-closing': 'Strong Closing',
        'fix-grammar': 'Grammar Clean',
      }

      setDiffModal({
        isOpen: true,
        actionName: actionLabels[action] || action,
        originalContent: activeContent,
        improvedContent: improved,
      })
    } catch (err) {
      console.error('Improvement error:', err)
    } finally {
      setIsImproving(false)
      setActiveImproveAction(null)
    }
  }

  // Handle Apply Diff
  const handleApplyDiff = () => {
    setActiveContent(diffModal.improvedContent)
    // Slightly boost score for applied polish
    setQualityScore((prev) => ({
      ...prev,
      overallScore: Math.min(99, prev.overallScore + 2),
      clarity: Math.min(98, prev.clarity + 2),
    }))
  }

  // Handle Save Current Cover Letter
  const handleSaveCurrentLetter = () => {
    const newLetter: SavedCoverLetter = {
      id: `cl-${Date.now()}`,
      jobId: targetJobInfo.id,
      jobTitle: targetJobInfo.title,
      company: targetJobInfo.company,
      location: targetJobInfo.location,
      targetRole: targetJobInfo.title,
      resumeVersionId: activeResumeDraft.id,
      resumeVersionName: activeResumeDraft.name,
      activeVersionId: 'v-1',
      versions: [
        {
          id: 'v-1',
          name: `Version 1 — ${tone}`,
          content: activeContent,
          tone,
          length,
          updatedAt: 'Just now',
        },
      ],
      qualityScore,
      createdAt: 'Just now',
      updatedAt: 'Just now',
    }

    saveCoverLetter(newLetter)
    setSavedLetters(getSavedCoverLetters())
  }

  // Handle Open/Select Saved Letter
  const handleSelectSavedLetter = (letter: SavedCoverLetter) => {
    if (letter.versions.length > 0) {
      setActiveContent(letter.versions[0].content)
      setQualityScore(letter.qualityScore)
      setTone(letter.versions[0].tone)
      setLength(letter.versions[0].length)
    }
    if (letter.jobId) {
      setJobState((prev) => ({
        ...prev,
        mode: 'catalog',
        selectedJobId: letter.jobId,
      }))
    } else {
      setJobState((prev) => ({
        ...prev,
        mode: 'custom',
        customTitle: letter.jobTitle,
        customCompany: letter.company,
      }))
    }
    setMobileTab('letter')
  }

  // Handle Duplicate Saved Letter
  const handleDuplicateLetter = (id: string) => {
    duplicateSavedCoverLetter(id)
    setSavedLetters(getSavedCoverLetters())
  }

  // Handle Delete Saved Letter
  const handleDeleteLetter = (id: string) => {
    deleteSavedCoverLetter(id)
    setSavedLetters(getSavedCoverLetters())
  }

  // Insert suggested keyword into letter
  const handleInsertKeyword = (kw: string) => {
    setActiveContent((prev) => `${prev}\n\nAdditionally, I bring experience leveraging ${kw} to maintain system reliability and performance.`)
    setMatchedKeywords((prev) => Array.from(new Set([...prev, kw])))
    setSuggestedKeywords((prev) => prev.filter((k) => k !== kw))
  }

  // Use In Application
  const handleUseInApplication = () => {
    handleSaveCurrentLetter()
    if (onNavigateToApply) {
      onNavigateToApply(targetJobInfo.id)
    } else {
      window.location.hash = '#ai-auto-apply'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header Section */}
        <CoverLetterHeader
          savedCount={savedLetters.length}
          onOpenSavedModal={() => setIsSavedModalOpen(true)}
          onGenerate={handleStartGeneration}
          isGenerating={isGeneratingModalOpen}
        />

        {/* Mobile Tab Bar */}
        <div className="flex lg:hidden items-center justify-center p-1 bg-slate-200/70 rounded-xl max-w-sm mx-auto">
          <button
            type="button"
            onClick={() => setMobileTab('configure')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              mobileTab === 'configure'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Configure & Target
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('letter')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              mobileTab === 'letter'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Letter & Review
          </button>
        </div>

        {/* Main 2-Panel Layout: Desktop 5-col / 7-col */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Configuration (Job, Resume, Tone, Style) */}
          <div
            className={`lg:col-span-5 space-y-5 ${
              mobileTab === 'configure' ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* Step 1: Job Target */}
            <JobConfigSection jobState={jobState} onChange={setJobState} />

            {/* Step 2: Resume Select */}
            <ResumeSelectSection
              resumeVersions={resumeVersions}
              selectedVersionId={selectedResumeId}
              onSelectVersion={setSelectedResumeId}
              onNavigateToBuilder={onNavigateToResumeBuilder}
            />

            {/* Step 3: Style & Personalization */}
            <StylePersonalizationSection
              tone={tone}
              length={length}
              personalization={personalization}
              onToneChange={setTone}
              onLengthChange={setLength}
              onPersonalizationToggle={handlePersonalizationToggle}
            />
          </div>

          {/* Right Panel: Editor / Preview, Quality Score, AI Copilot, Alignment */}
          <div
            className={`lg:col-span-7 space-y-5 ${
              mobileTab === 'letter' ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* AI Refinement Toolbar */}
            <AiImprovementToolbar
              onAction={handleAIImprove}
              isImproving={isImproving}
              activeAction={activeImproveAction}
              disabled={isGeneratingModalOpen}
            />

            {/* Editor and Document Preview Card */}
            <CoverLetterEditorPreview
              content={activeContent}
              onChangeContent={setActiveContent}
              onSave={handleSaveCurrentLetter}
              onUseInApplication={handleUseInApplication}
              jobTitle={targetJobInfo.title}
              company={targetJobInfo.company}
              candidateName={activeResumeDraft.resumeData.personalInfo?.name || 'Tushpendra Kumar'}
              candidateEmail={
                activeResumeDraft.resumeData.personalInfo?.email || 'tushpendrakumar0208@gmail.com'
              }
              candidatePhone={activeResumeDraft.resumeData.personalInfo?.phone}
              candidateLocation={activeResumeDraft.resumeData.personalInfo?.location}
            />

            {/* Bottom Row: Quality Card and Job Alignment Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CoverLetterQualityCard score={qualityScore} />
              <JobAlignmentPanel
                matchedKeywords={matchedKeywords}
                suggestedKeywords={suggestedKeywords}
                onInsertKeyword={handleInsertKeyword}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <GeneratingCoverLetterModal
        isOpen={isGeneratingModalOpen}
        onComplete={handleGenerationComplete}
      />

      <SavedCoverLettersModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedLetters={savedLetters}
        onSelectLetter={handleSelectSavedLetter}
        onDuplicateLetter={handleDuplicateLetter}
        onDeleteLetter={handleDeleteLetter}
      />

      <BeforeAfterDiffModal
        isOpen={diffModal.isOpen}
        onClose={() => setDiffModal((prev) => ({ ...prev, isOpen: false }))}
        onApply={handleApplyDiff}
        actionName={diffModal.actionName}
        originalContent={diffModal.originalContent}
        improvedContent={diffModal.improvedContent}
      />
    </div>
  )
}
