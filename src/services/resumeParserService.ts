import { defaultParsedResume, type ParsedResume } from '@/data/resumeData'
import type { CandidateProfile, CandidateSkill } from '@/data/candidateProfile'

export interface FileValidationResult {
  valid: boolean
  error?: string
}

export type ParsingStageId =
  | 'uploading'
  | 'reading'
  | 'extracting'
  | 'structuring'
  | 'complete'

export interface ParsingGranularCheckpoints {
  structure: 'pending' | 'in-progress' | 'completed'
  skills: 'pending' | 'in-progress' | 'completed'
  experience: 'pending' | 'in-progress' | 'completed'
  education: 'pending' | 'in-progress' | 'completed'
  projects: 'pending' | 'in-progress' | 'completed'
  links: 'pending' | 'in-progress' | 'completed'
}

export interface ParsingProgressState {
  stage: ParsingStageId
  progressPercentage: number
  stageLabel: string
  checkpoints: ParsingGranularCheckpoints
  isComplete: boolean
  error?: string
}

const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx']
const ACCEPTED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB

/**
 * Validates file format and size according to SaaS requirements.
 */
export function validateResumeFile(file: File): FileValidationResult {
  // Check file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: 'File exceeds the 10 MB limit. Please upload a smaller document.',
    }
  }

  // Check file extension
  const extension = '.' + file.name.split('.').pop()?.toLowerCase()
  const isExtensionValid = ACCEPTED_EXTENSIONS.includes(extension)
  const isMimeValid = !file.type || ACCEPTED_MIME_TYPES.includes(file.type)

  if (!isExtensionValid && !isMimeValid) {
    return {
      valid: false,
      error: 'Unsupported file type. Please upload a PDF, DOC, or DOCX document.',
    }
  }

  return { valid: true }
}

/**
 * Formats bytes to readable MB/KB string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

/**
 * Simulated AI Parsing Engine that steps through realistic extraction stages.
 * Architecture Note: In production, this service will call a multimodal document
 * extraction endpoint (e.g. Gemini 2.5 Flash / Document AI). In this demo SaaS version,
 * it runs a deterministic step-by-step extraction workflow.
 */
export function simulateResumeParsing(
  file: File,
  onProgressUpdate: (state: ParsingProgressState) => void,
  onFinish: (result: ParsedResume) => void,
  _onError?: (err: string) => void
): () => void {
  let isCancelled = false

  const initialCheckpoints: ParsingGranularCheckpoints = {
    structure: 'pending',
    skills: 'pending',
    experience: 'pending',
    education: 'pending',
    projects: 'pending',
    links: 'pending',
  }

  const steps: {
    delay: number
    state: ParsingProgressState
  }[] = [
    {
      delay: 300,
      state: {
        stage: 'uploading',
        progressPercentage: 20,
        stageLabel: 'Uploading resume securely...',
        checkpoints: { ...initialCheckpoints, structure: 'in-progress' },
        isComplete: false,
      },
    },
    {
      delay: 700,
      state: {
        stage: 'reading',
        progressPercentage: 45,
        stageLabel: 'Reading text layout & optical sections...',
        checkpoints: {
          ...initialCheckpoints,
          structure: 'completed',
          skills: 'in-progress',
          experience: 'in-progress',
        },
        isComplete: false,
      },
    },
    {
      delay: 1200,
      state: {
        stage: 'extracting',
        progressPercentage: 75,
        stageLabel: 'Extracting skills, projects & work history...',
        checkpoints: {
          structure: 'completed',
          skills: 'completed',
          experience: 'completed',
          education: 'in-progress',
          projects: 'in-progress',
          links: 'in-progress',
        },
        isComplete: false,
      },
    },
    {
      delay: 1700,
      state: {
        stage: 'structuring',
        progressPercentage: 90,
        stageLabel: 'Structuring verified career profile...',
        checkpoints: {
          structure: 'completed',
          skills: 'completed',
          experience: 'completed',
          education: 'completed',
          projects: 'completed',
          links: 'completed',
        },
        isComplete: false,
      },
    },
    {
      delay: 2200,
      state: {
        stage: 'complete',
        progressPercentage: 100,
        stageLabel: 'Resume successfully analyzed!',
        checkpoints: {
          structure: 'completed',
          skills: 'completed',
          experience: 'completed',
          education: 'completed',
          projects: 'completed',
          links: 'completed',
        },
        isComplete: true,
      },
    },
  ]

  const timeouts: ReturnType<typeof setTimeout>[] = []

  steps.forEach((step, idx) => {
    const t = setTimeout(() => {
      if (isCancelled) return
      onProgressUpdate(step.state)

      if (idx === steps.length - 1) {
        // Build parsed result with current uploaded file metadata
        const result: ParsedResume = {
          ...defaultParsedResume,
          fileName: file.name,
          fileSize: formatFileSize(file.size),
          parsedAt: 'Just now',
        }
        onFinish(result)
      }
    }, step.delay)
    timeouts.push(t)
  })

  // Return cancel function
  return () => {
    isCancelled = true
    timeouts.forEach((t) => clearTimeout(t))
  }
}

/**
 * Transforms parsed resume data into candidate profile for Screen #4 AI Job Matching.
 */
export function convertParsedResumeToCandidateProfile(
  parsed: ParsedResume
): CandidateProfile {
  const allParsedSkills: CandidateSkill[] = []

  parsed.skills.frontend.forEach((s) => {
    allParsedSkills.push({
      name: s.name,
      level: s.confidence === 'High confidence' ? 'Strong' : 'Intermediate',
      category: 'frontend',
      yearsOfExperience: 3.0,
    })
  })

  parsed.skills.backend.forEach((s) => {
    allParsedSkills.push({
      name: s.name,
      level: s.confidence === 'High confidence' ? 'Strong' : 'Intermediate',
      category: 'backend',
      yearsOfExperience: 2.5,
    })
  })

  parsed.skills.database.forEach((s) => {
    allParsedSkills.push({
      name: s.name,
      level: s.confidence === 'High confidence' ? 'Strong' : 'Intermediate',
      category: 'database',
      yearsOfExperience: 2.0,
    })
  })

  parsed.skills.tools.forEach((s) => {
    allParsedSkills.push({
      name: s.name,
      level: s.confidence === 'High confidence' ? 'Strong' : 'Intermediate',
      category: 'tools',
      yearsOfExperience: 3.0,
    })
  })

  return {
    id: 'cand-parsed',
    fullName: parsed.personalInfo.name,
    title: 'Frontend & Full Stack Engineer',
    summary: parsed.summary,
    email: parsed.personalInfo.email,
    location: parsed.personalInfo.location,
    preferredLocations: ['Noida', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Remote'],
    preferredWorkModes: ['Remote', 'Hybrid', 'On-site'],
    preferredRoles: [
      'Frontend Developer',
      'Full Stack Developer',
      'Software Developer',
      'AI Developer',
    ],
    experienceYears: 3.5,
    experienceLevel: '3–5 years',
    expectedSalaryLpa: { min: 14, max: 24 },
    skills: allParsedSkills,
    profileCompleteness: parsed.profileCompleteness,
    completenessChecklist: [
      { label: 'Basic information', completed: true, description: 'Verified contact email & links' },
      { label: 'Technical skills', completed: true, description: 'Verified technical frameworks' },
      { label: 'Education', completed: true, description: parsed.education[0]?.degree || 'Technical Degree' },
      { label: 'Projects', completed: true, description: `${parsed.projects.length} verified projects` },
      { label: 'Career preferences', completed: false, description: 'Specify target startup vs enterprise culture' },
    ],
    careerFitRoles: [
      { role: 'Frontend Development', score: 94 },
      { role: 'Full Stack Development', score: 91 },
      { role: 'AI Application Development', score: 85 },
    ],
  }
}
