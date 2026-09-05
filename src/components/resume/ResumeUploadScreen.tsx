import React, { useState, useRef, useEffect } from 'react'
import { DashboardSidebar } from '@/components/matching/DashboardSidebar'
import { ResumeHeader } from './ResumeHeader'
import { ResumeDropzone } from './ResumeDropzone'
import { FilePreviewCard } from './FilePreviewCard'
import { ParsingProgressView } from './ParsingProgressView'
import { ParsedProfileReview } from './ParsedProfileReview'
import {
  EditResumeSectionModal,
  type EditSectionType,
} from './EditResumeSectionModal'
import {
  ResumeErrorState,
  ResumeSuccessState,
} from './ResumeStates'
import {
  defaultParsedResume,
  type ParsedResume,
  type ParsedPersonalInfo,
  type ParsedExperience,
  type ParsedEducation,
  type ParsedProject,
} from '@/data/resumeData'
import {
  simulateResumeParsing,
  convertParsedResumeToCandidateProfile,
  type ParsingProgressState,
} from '@/services/resumeParserService'
import type { CandidateProfile } from '@/data/candidateProfile'

export interface ResumeUploadScreenProps {
  parsedResume?: ParsedResume
  onParsedResumeChange?: (resume: ParsedResume) => void
  onProfileConfirmed?: (profile: CandidateProfile) => void
  onNavigateToMatching?: () => void
  onNavigateToAnalysis?: () => void
  onNavigateToBuilder?: () => void
  onNavigateToAutoApply?: () => void
  onNavigateToApplications?: () => void
  onNavigateToJobs?: () => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export type ResumeUploadScreenState =
  | 'upload'
  | 'file-selected'
  | 'parsing'
  | 'review'
  | 'confirmed'
  | 'error'

export const ResumeUploadScreen: React.FC<ResumeUploadScreenProps> = ({
  parsedResume: propParsedResume,
  onParsedResumeChange,
  onProfileConfirmed,
  onNavigateToMatching,
  onNavigateToAnalysis,
  onNavigateToBuilder,
  onNavigateToAutoApply,
  onNavigateToApplications,
  onNavigateToJobs,
  onToast,
}) => {
  const [screenState, setScreenState] =
    useState<ResumeUploadScreenState>('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [parsedResume, setParsedResume] = useState<ParsedResume>(
    propParsedResume || defaultParsedResume
  )
  const [isSubmittingConfirmation, setIsSubmittingConfirmation] =
    useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    onParsedResumeChange?.(parsedResume)
  }, [parsedResume, onParsedResumeChange])

  // Parsing progress state
  const [progressState, setProgressState] = useState<ParsingProgressState>({
    stage: 'uploading',
    progressPercentage: 0,
    stageLabel: 'Initializing parser...',
    checkpoints: {
      structure: 'pending',
      skills: 'pending',
      experience: 'pending',
      education: 'pending',
      projects: 'pending',
      links: 'pending',
    },
    isComplete: false,
  })

  // Edit Modal State
  const [editModal, setEditModal] = useState<{
    isOpen: boolean
    sectionType: EditSectionType
    initialData?: unknown
  }>({
    isOpen: false,
    sectionType: 'personalInfo',
  })

  const cancelParsingRef = useRef<(() => void) | null>(null)

  // 1. File Selected Handler
  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setScreenState('file-selected')
    onToast(`“${file.name}” selected. Ready for AI parsing.`, 'info')
  }

  // 2. Trigger Parsing Handler
  const handleStartParsing = () => {
    if (!selectedFile) return
    setScreenState('parsing')

    const cancelFn = simulateResumeParsing(
      selectedFile,
      (stepState) => {
        setProgressState(stepState)
      },
      (result) => {
        setParsedResume(result)
        setTimeout(() => {
          setScreenState('review')
          onToast('Resume parsed successfully! Review extracted profile details.', 'success')
        }, 500)
      },
      (err) => {
        setErrorMessage(err || 'Failed to extract text from this document format.')
        setScreenState('error')
        onToast('Resume analysis failed. Please try another file.', 'warning')
      }
    )

    cancelParsingRef.current = cancelFn
  }

  // 3. Reset/Replace File Handler
  const handleReplaceFile = () => {
    if (cancelParsingRef.current) {
      cancelParsingRef.current()
    }
    setSelectedFile(null)
    setScreenState('upload')
  }

  // 4. Edit Modal Handlers
  const handleOpenEditModal = (
    sectionType: EditSectionType,
    extraData?: { initialData?: unknown }
  ) => {
    setEditModal({
      isOpen: true,
      sectionType,
      initialData: extraData?.initialData,
    })
  }

  const handleCloseEditModal = () => {
    setEditModal((prev) => ({ ...prev, isOpen: false }))
  }

  const handleSavePersonalInfo = (data: ParsedPersonalInfo) => {
    setParsedResume((prev) => ({ ...prev, personalInfo: data }))
    onToast('Personal information updated.', 'success')
  }

  const handleSaveSummary = (summary: string) => {
    setParsedResume((prev) => ({ ...prev, summary }))
    onToast('Professional summary updated.', 'success')
  }

  const handleAddSkill = (
    category: 'frontend' | 'backend' | 'database' | 'tools',
    skillName: string
  ) => {
    setParsedResume((prev) => {
      const currentList = prev.skills[category]
      if (currentList.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) {
        return prev
      }
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [category]: [
            ...currentList,
            { name: skillName, confidence: 'High confidence' },
          ],
        },
      }
    })
    onToast(`Added “${skillName}” to ${category} skills.`, 'success')
  }

  const handleRemoveSkill = (
    category: 'frontend' | 'backend' | 'database' | 'tools',
    skillName: string
  ) => {
    setParsedResume((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((s) => s.name !== skillName),
      },
    }))
    onToast(`Removed “${skillName}”.`, 'info')
  }

  const handleSaveExperience = (exp: ParsedExperience) => {
    setParsedResume((prev) => {
      const exists = prev.workExperience.some((e) => e.id === exp.id)
      const updated = exists
        ? prev.workExperience.map((e) => (e.id === exp.id ? exp : e))
        : [...prev.workExperience, exp]
      return { ...prev, workExperience: updated }
    })
    onToast(`Experience at ${exp.company} saved.`, 'success')
  }

  const handleRemoveExperience = (expId: string) => {
    setParsedResume((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((e) => e.id !== expId),
    }))
    onToast('Experience entry removed.', 'info')
  }

  const handleSaveEducation = (edu: ParsedEducation) => {
    setParsedResume((prev) => {
      const exists = prev.education.some((e) => e.id === edu.id)
      const updated = exists
        ? prev.education.map((e) => (e.id === edu.id ? edu : e))
        : [...prev.education, edu]
      return { ...prev, education: updated }
    })
    onToast('Education details updated.', 'success')
  }

  const handleSaveProject = (proj: ParsedProject) => {
    setParsedResume((prev) => {
      const exists = prev.projects.some((p) => p.id === proj.id)
      const updated = exists
        ? prev.projects.map((p) => (p.id === proj.id ? proj : p))
        : [...prev.projects, proj]
      return { ...prev, projects: updated }
    })
    onToast(`Project “${proj.name}” saved.`, 'success')
  }

  const handleAddCertification = (cert: {
    title: string
    issuer: string
    issueDate: string
  }) => {
    const newCert = {
      id: `cert-${Date.now()}`,
      ...cert,
    }
    setParsedResume((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }))
    onToast(`Certification “${cert.title}” added.`, 'success')
  }

  // 5. Confirm Profile and Connect with AI Matching
  const handleConfirmProfile = () => {
    setIsSubmittingConfirmation(true)
    setTimeout(() => {
      setIsSubmittingConfirmation(false)
      const updatedProfile = convertParsedResumeToCandidateProfile(parsedResume)
      if (onProfileConfirmed) {
        onProfileConfirmed(updatedProfile)
      }
      setScreenState('confirmed')
      onToast('Your AI career profile is ready and synced with AI Matching!', 'success')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Dashboard Sidebar with Resume active */}
          <DashboardSidebar
            activeTab="resume"
            onSelectTab={(tab) => {
              if (tab === 'ai-matching' && onNavigateToMatching) {
                onNavigateToMatching()
              }
            }}
            onNavigateToJobs={onNavigateToJobs || (() => {})}
            onNavigateToAnalysis={onNavigateToAnalysis}
            onNavigateToBuilder={onNavigateToBuilder}
            onNavigateToAutoApply={onNavigateToAutoApply}
            onNavigateToApplications={onNavigateToApplications}
            onToast={onToast}
            className="lg:sticky lg:top-20"
          />

          {/* Main Content Area */}
          <div className="flex-1 w-full space-y-6 sm:space-y-8">
            {/* Header */}
            <ResumeHeader />

            {/* Content per Screen State */}
            {screenState === 'upload' && (
              <ResumeDropzone onFileSelect={handleFileSelect} />
            )}

            {screenState === 'file-selected' && selectedFile && (
              <FilePreviewCard
                file={selectedFile}
                onReplaceFile={handleReplaceFile}
                onAnalyzeResume={handleStartParsing}
              />
            )}

            {screenState === 'parsing' && (
              <ParsingProgressView
                progressState={progressState}
                fileName={selectedFile?.name}
              />
            )}

            {screenState === 'review' && (
              <ParsedProfileReview
                parsedResume={parsedResume}
                onOpenEditModal={handleOpenEditModal}
                onRemoveExperience={handleRemoveExperience}
                onRemoveSkill={handleRemoveSkill}
                onConfirmProfile={handleConfirmProfile}
                onReviewAgain={handleReplaceFile}
                onNavigateToAnalysis={onNavigateToAnalysis}
                isSubmitting={isSubmittingConfirmation}
              />
            )}

            {screenState === 'confirmed' && (
              <ResumeSuccessState
                candidateName={parsedResume.personalInfo.name}
                onViewMatches={() => {
                  if (onNavigateToMatching) onNavigateToMatching()
                }}
                onViewAnalysis={onNavigateToAnalysis}
                onReupload={handleReplaceFile}
              />
            )}

            {screenState === 'error' && (
              <ResumeErrorState
                errorMessage={errorMessage}
                onTryAgain={handleStartParsing}
                onChooseAnother={handleReplaceFile}
              />
            )}
          </div>
        </div>
      </div>

      {/* Edit Section Modal */}
      {editModal.isOpen && (
        <EditResumeSectionModal
          isOpen={editModal.isOpen}
          sectionType={editModal.sectionType}
          onClose={handleCloseEditModal}
          onSavePersonalInfo={handleSavePersonalInfo}
          onSaveSummary={handleSaveSummary}
          onAddSkill={handleAddSkill}
          onSaveExperience={handleSaveExperience}
          onSaveEducation={handleSaveEducation}
          onSaveProject={handleSaveProject}
          onAddCertification={handleAddCertification}
          initialPersonalInfo={parsedResume.personalInfo}
          initialSummary={parsedResume.summary}
          initialExperience={
            editModal.sectionType === 'experience'
              ? (editModal.initialData as ParsedExperience)
              : undefined
          }
          initialEducation={
            editModal.sectionType === 'education'
              ? (editModal.initialData as ParsedEducation)
              : undefined
          }
          initialProject={
            editModal.sectionType === 'project'
              ? (editModal.initialData as ParsedProject)
              : undefined
          }
        />
      )}
    </div>
  )
}
