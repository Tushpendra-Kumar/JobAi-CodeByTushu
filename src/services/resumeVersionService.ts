import { defaultParsedResume, type ParsedResume } from '@/data/resumeData'
import type { TemplateId } from '@/services/resumeBuilderAIService'

export interface ResumeDraftVersion {
  id: string
  name: string
  targetRole: string
  lastModified: string
  templateId: TemplateId
  resumeData: ParsedResume
}

const STORAGE_KEY = 'jobai_resume_draft_versions'

/**
 * Get saved draft versions from localStorage with a default fallback
 */
export function getSavedResumeVersions(
  initialResume: ParsedResume = defaultParsedResume
): ResumeDraftVersion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as ResumeDraftVersion[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {
    // fallback if json parse fails
  }

  // Create default initial version from currently loaded parsed resume
  const defaultVersion: ResumeDraftVersion = {
    id: 'draft-master',
    name: 'Master Resume (Verified)',
    targetRole: 'Software Developer',
    lastModified: 'Just now',
    templateId: 'modern',
    resumeData: JSON.parse(JSON.stringify(initialResume)),
  }

  const secondVersion: ResumeDraftVersion = {
    id: 'draft-frontend',
    name: 'Frontend Engineer (React Focus)',
    targetRole: 'Frontend Developer',
    lastModified: 'Saved draft',
    templateId: 'minimal',
    resumeData: JSON.parse(JSON.stringify(initialResume)),
  }

  const initialList = [defaultVersion, secondVersion]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialList))
  } catch {
    // quota exceeded fallback
  }

  return initialList
}

/**
 * Save all draft versions to localStorage
 */
export function saveResumeVersions(versions: ResumeDraftVersion[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(versions))
  } catch {
    // storage fallback
  }
}

/**
 * Create a new draft version
 */
export function createDraftVersion(
  name: string,
  targetRole: string,
  resumeData: ParsedResume,
  templateId: TemplateId = 'modern'
): ResumeDraftVersion {
  return {
    id: `draft-${Date.now()}`,
    name,
    targetRole,
    lastModified: 'Just now',
    templateId,
    resumeData: JSON.parse(JSON.stringify(resumeData)),
  }
}
