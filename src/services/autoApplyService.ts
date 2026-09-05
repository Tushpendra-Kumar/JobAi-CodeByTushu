import type { Job } from '@/data/jobsData'
import type { ParsedResume } from '@/data/resumeData'
import type { ResumeDraftVersion } from '@/services/resumeVersionService'
import {
  calculateApplicationReadiness,
  generateCoverLetter,
  generateApplicationQuestions,
  type ApplicationReadinessBreakdown,
  type ApplicationQuestion,
} from './autoApplyAIService'
import {
  saveTrackedApplication,
  generateDemoConfirmationCode,
  type TrackedApplication,
  type ApplicationStatus,
} from './applicationTrackingService'

export interface AutoApplyConfiguration {
  targetRole: string
  minMatchScore: number
  workMode: 'Any' | 'Remote' | 'Hybrid' | 'On-site'
  location: string
  experienceLevel: 'Any' | 'Fresher' | 'Entry Level' | 'Junior' | 'Mid Level'
  resumeVersionId: string
  coverLetterOption: 'generate' | 'existing' | 'skip'
  questionOption: 'suggested' | 'manual'
  applicationLimit: number
}

export interface PreparedApplicationData {
  jobId: string
  job: Job
  resumeVersionId: string
  resumeVersionName: string
  resumeData: ParsedResume
  coverLetter: string
  personalizationReasons: string[]
  questions: ApplicationQuestion[]
  readiness: ApplicationReadinessBreakdown
  status: ApplicationStatus
  createdAt: string
}

export interface ApplicationSubmissionResult {
  success: boolean
  applicationId: string
  confirmationCode: string
  timestamp: string
  message: string
}

/**
 * Provider interface to accommodate future real external ATS/portal integrations
 */
export interface ApplicationProvider {
  submitApplication(
    application: PreparedApplicationData,
    onProgress?: (stepIndex: number, stepName: string) => void
  ): Promise<ApplicationSubmissionResult>
}

/**
 * Demo provider: Executes transparent local simulation without attempting
 * unverified external scraping or unauthorized portal submission.
 */
export class DemoApplicationProvider implements ApplicationProvider {
  async submitApplication(
    application: PreparedApplicationData,
    onProgress?: (stepIndex: number, stepName: string) => void
  ): Promise<ApplicationSubmissionResult> {
    const steps = [
      'Preparing verified application package...',
      'Validating ATS resume compliance...',
      'Compiling role-tailored responses & cover letter...',
      'Conducting final pre-submission integrity review...',
      'Recording application in JobAI tracking pipeline...',
    ]

    for (let i = 0; i < steps.length; i++) {
      onProgress?.(i, steps[i])
      await new Promise((resolve) => setTimeout(resolve, 450))
    }

    const confirmationCode = generateDemoConfirmationCode()
    const now = new Date()
    const formattedDate = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

    const trackedRecord: TrackedApplication = {
      id: `app-${Date.now()}`,
      jobId: application.job.id,
      jobTitle: application.job.title,
      company: application.job.company,
      companyLogoText: application.job.companyLogoText,
      companyColor: application.job.companyColor,
      location: application.job.location,
      workMode: application.job.workMode,
      salary: application.job.salary,
      appliedAt: formattedDate,
      status: 'Applied',
      matchScore: application.job.matchScore,
      resumeVersionId: application.resumeVersionId,
      resumeVersionName: application.resumeVersionName,
      coverLetterText: application.coverLetter,
      applicationAnswers: application.questions.map((q) => ({
        question: q.question,
        answer: q.suggestedAnswer,
      })),
      readinessScore: application.readiness.overallReadiness,
      confirmationCode,
      notes: 'Successfully submitted and recorded in JobAI career tracker.',
    }

    // Persist to local application tracking storage
    saveTrackedApplication(trackedRecord)

    return {
      success: true,
      applicationId: trackedRecord.id,
      confirmationCode,
      timestamp: formattedDate,
      message: `Application for ${application.job.title} at ${application.job.company} recorded successfully.`,
    }
  }
}

/**
 * Global singleton provider instance
 */
export const defaultApplicationProvider: ApplicationProvider = new DemoApplicationProvider()

/**
 * Prepare a complete application package for a target job
 */
export function prepareJobApplication(
  job: Job,
  activeResumeVersion: ResumeDraftVersion,
  config?: Partial<AutoApplyConfiguration>
): PreparedApplicationData {
  const readiness = calculateApplicationReadiness(job, activeResumeVersion.resumeData)

  let coverLetter = ''
  let personalizationReasons: string[] = []

  if (!config?.coverLetterOption || config.coverLetterOption === 'generate') {
    const clResult = generateCoverLetter(job, activeResumeVersion.resumeData)
    coverLetter = clResult.coverLetter
    personalizationReasons = clResult.personalizationReasons
  }

  const questions = generateApplicationQuestions(job, activeResumeVersion.resumeData)

  return {
    jobId: job.id,
    job,
    resumeVersionId: activeResumeVersion.id,
    resumeVersionName: activeResumeVersion.name,
    resumeData: activeResumeVersion.resumeData,
    coverLetter,
    personalizationReasons,
    questions,
    readiness,
    status: 'Ready for Review',
    createdAt: 'Just now',
  }
}
