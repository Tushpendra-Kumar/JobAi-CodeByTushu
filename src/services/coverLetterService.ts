export type CoverLetterTone =
  | 'Professional'
  | 'Confident'
  | 'Concise'
  | 'Enthusiastic'
  | 'Technical'

export type CoverLetterLength = 'Short' | 'Standard' | 'Detailed'

export interface CoverLetterPersonalizationOptions {
  highlightSkills: boolean
  highlightProjects: boolean
  highlightExperience: boolean
  mentionCareerGoals: boolean
  mentionCompanyInterest: boolean
  focusTechnicalStrengths: boolean
}

export interface CoverLetterQualityScore {
  overallScore: number
  jobRelevance: number
  personalization: number
  clarity: number
  professionalTone: number
  readability: number
  keywordAlignment: number
}

export interface CoverLetterVersion {
  id: string
  name: string
  content: string
  tone: CoverLetterTone
  length: CoverLetterLength
  updatedAt: string
}

export interface SavedCoverLetter {
  id: string
  jobId?: string
  jobTitle: string
  company: string
  location?: string
  targetRole: string
  resumeVersionId: string
  resumeVersionName: string
  activeVersionId: string
  versions: CoverLetterVersion[]
  qualityScore: CoverLetterQualityScore
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'jobai_saved_cover_letters'

const DEFAULT_INITIAL_SAVED_LETTERS: SavedCoverLetter[] = [
  {
    id: 'cl-demo-1',
    jobId: 'job-1',
    jobTitle: 'Frontend Engineer (React)',
    company: 'TechFlow Solutions',
    location: 'Noida, India',
    targetRole: 'Frontend Developer',
    resumeVersionId: 'draft-master',
    resumeVersionName: 'Master Resume (Verified)',
    activeVersionId: 'v-1',
    versions: [
      {
        id: 'v-1',
        name: 'Version 1 — Professional',
        content: `Dear Hiring Manager at TechFlow Solutions,

I am writing to express my strong interest in the Frontend Engineer (React) position at TechFlow Solutions. Having followed your focus on modern, performant web applications, I am eager to contribute my hands-on frontend engineering foundation to your product engineering team.

My technical background aligns directly with your core stack, particularly in React.js, TypeScript, Tailwind CSS, and REST API integration. At my recent engineering internship at TechCorp, I gained practical experience administering Linux infrastructure, streamlining deployment scripts, and collaborating on responsive client interfaces. This experience instilled in me a deep commitment to code maintainability, clean architecture, and reliable web performance.

Specifically, on my JobAI project, I architected modern user interfaces and client state models using React.js and TypeScript, with a strict emphasis on responsive component hierarchies, explainable AI workflows, and accessible design patterns. Working on full-stack web applications has given me a solid understanding of frontend optimization, client-side routing, and modular component architectures.

I am particularly energized by the prospect of joining TechFlow Solutions because of your high standards for user experience and engineering craftsmanship. I would welcome the opportunity to discuss how my verified background and disciplined problem-solving approach will add immediate value to your team.

Thank you for your time and consideration.

Sincerely,
Tushpendra Kumar
tushpendrakumar0208@gmail.com | +91 98765 43210
Noida, Uttar Pradesh, India`,
        tone: 'Professional',
        length: 'Standard',
        updatedAt: '03 Sep 2026',
      },
      {
        id: 'v-2',
        name: 'Version 2 — Concise',
        content: `Dear Hiring Manager at TechFlow Solutions,

I am excited to apply for the Frontend Engineer position. My background in React.js, TypeScript, and modern component architecture aligns closely with TechFlow Solutions' technical goals.

At TechCorp and through my independent engineering projects like JobAI, I have built accessible, responsive interfaces and integrated RESTful APIs with strict performance standards. My foundation in clean code and modern frontend toolchains enables me to deliver immediate value.

I would love to discuss how my verified skills can support your engineering roadmap. Thank you for your review.

Sincerely,
Tushpendra Kumar
tushpendrakumar0208@gmail.com | +91 98765 43210`,
        tone: 'Concise',
        length: 'Short',
        updatedAt: '04 Sep 2026',
      },
    ],
    qualityScore: {
      overallScore: 92,
      jobRelevance: 94,
      personalization: 91,
      clarity: 93,
      professionalTone: 95,
      readability: 90,
      keywordAlignment: 89,
    },
    createdAt: '03 Sep 2026',
    updatedAt: '04 Sep 2026',
  },
]

/**
 * Get all saved cover letters from local storage
 */
export function getSavedCoverLetters(): SavedCoverLetter[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as SavedCoverLetter[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {
    // quota fallback
  }
  return DEFAULT_INITIAL_SAVED_LETTERS
}

/**
 * Save or update a cover letter
 */
export function saveCoverLetter(letter: SavedCoverLetter): void {
  try {
    const current = getSavedCoverLetters()
    const idx = current.findIndex((l) => l.id === letter.id)
    let updated: SavedCoverLetter[]
    if (idx >= 0) {
      updated = [...current]
      updated[idx] = { ...letter, updatedAt: 'Just now' }
    } else {
      updated = [{ ...letter, updatedAt: 'Just now' }, ...current]
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // quota fallback
  }
}

/**
 * Delete a cover letter
 */
export function deleteSavedCoverLetter(id: string): void {
  try {
    const current = getSavedCoverLetters()
    const updated = current.filter((l) => l.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // fallback
  }
}

/**
 * Duplicate an existing cover letter
 */
export function duplicateSavedCoverLetter(id: string): SavedCoverLetter | null {
  const current = getSavedCoverLetters()
  const source = current.find((l) => l.id === id)
  if (!source) return null

  const duplicated: SavedCoverLetter = {
    ...JSON.parse(JSON.stringify(source)),
    id: `cl-${Date.now()}`,
    jobTitle: `${source.jobTitle} (Copy)`,
    createdAt: 'Just now',
    updatedAt: 'Just now',
  }

  saveCoverLetter(duplicated)
  return duplicated
}
