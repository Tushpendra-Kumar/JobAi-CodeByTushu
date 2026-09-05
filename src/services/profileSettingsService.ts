import { defaultCandidateProfile, type CandidateProfile } from '@/data/candidateProfile'
import { getSavedResumeVersions } from './resumeVersionService'
import { getSavedCoverLetters } from './coverLetterService'
import { getTrackedApplications } from './applicationTrackingService'
import { initialJobsData } from '@/data/jobsData'

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  city: string
  country: string
  linkedIn: string
  gitHub: string
  portfolioUrl: string
}

export type SkillProficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
export type SkillCategory = 'technical' | 'tools' | 'soft'

export interface ProfileSkillItem {
  id: string
  name: string
  category: SkillCategory
  proficiency: SkillProficiency
  yearsOfExperience: number
}

export interface ProfessionalProfileData {
  headline: string
  currentRole: string
  yearsOfExperience: number
  careerLevel: 'Student' | 'Fresher' | 'Entry Level' | 'Junior' | 'Mid Level' | 'Senior' | 'Lead'
  primaryRole: string
  secondaryRoles: string[]
  summary: string
  skills: ProfileSkillItem[]
}

export interface JobPreferencesData {
  targetRoles: string[]
  preferredLocations: string[]
  remotePreference: 'Remote' | 'Hybrid' | 'On-site' | 'Any'
  employmentTypes: ('Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance')[]
  preferredIndustries: string[]
  minSalaryLpa: number
  maxSalaryLpa: number
  experienceLevel: 'Fresher' | '1–3 years' | '3–5 years' | '5+ years'
  noticePeriod: string
  preferredCompanies: string[]
}

export interface AISettingsData {
  jobMatchingEnabled: boolean
  resumeOptimizationEnabled: boolean
  resumeAnalysisEnabled: boolean
  coverLetterGenerationEnabled: boolean
  careerInsightsEnabled: boolean
  applicationAssistanceEnabled: boolean
  personalizationLevel: 'Low' | 'Balanced' | 'High'
  aiTone: 'Professional' | 'Confident' | 'Concise' | 'Friendly'
  matchingPriorities: {
    id: string
    label: string
    weight: number // 1 to 5
    description: string
  }[]
}

export interface ResumeSettingsData {
  defaultResumeId: string
  defaultTemplateId: 'modern' | 'classic' | 'minimal'
  defaultLanguage: string
  defaultLength: '1 Page' | '2 Pages' | 'Auto'
}

export interface ApplicationSettingsData {
  autoFillEnabled: boolean
  coverLetterAssistanceEnabled: boolean
  reviewRequiredBeforeSubmit: boolean // STRICT DEFAULT: true
  defaultCoverLetterId: string
  defaultResumeId: string
  defaultNotes: string
}

export interface NotificationChannel {
  email: boolean
  inApp: boolean
}

export interface NotificationPreferencesData {
  jobMatches: NotificationChannel
  applicationUpdates: NotificationChannel
  interviewUpdates: NotificationChannel
  resumeRecommendations: NotificationChannel
  careerInsights: NotificationChannel
  systemNotifications: NotificationChannel
}

export interface AccountSettingsData {
  email: string
  accountType: 'Demo Account'
  authStatus: 'Active Demo Session'
  connectedGoogle: boolean
  connectedGitHub: boolean
  connectedLinkedIn: boolean
  memberSince: string
  lastActive: string
}

export interface CompletionFactor {
  id: string
  label: string
  completed: boolean
  impact: number // percentage contribution
  hint: string
}

export interface ConnectedPlatformStats {
  resumesCount: number
  savedJobsCount: number
  applicationsCount: number
  coverLettersCount: number
  aiAnalysesCount: number
  matchedJobsCount: number
}

export interface UserProfileSettings {
  personalInfo: PersonalInfo
  professionalProfile: ProfessionalProfileData
  jobPreferences: JobPreferencesData
  aiSettings: AISettingsData
  resumeSettings: ResumeSettingsData
  applicationSettings: ApplicationSettingsData
  notifications: NotificationPreferencesData
  account: AccountSettingsData
  completionPercentage: number
  completionFactors: CompletionFactor[]
}

const STORAGE_KEY = 'jobai_user_profile_settings'

/**
 * Creates default user profile settings synthesized from defaultCandidateProfile
 */
export function createDefaultProfileSettings(
  profile: CandidateProfile = defaultCandidateProfile
): UserProfileSettings {
  const initialSkills: ProfileSkillItem[] = (profile.skills || []).map((s, idx) => ({
    id: `skill-${idx + 1}`,
    name: s.name,
    category:
      s.category === 'tools' || s.category === 'devops'
        ? 'tools'
        : s.category === 'frontend' || s.category === 'backend' || s.category === 'database' || s.category === 'ai'
        ? 'technical'
        : 'soft',
    proficiency:
      s.level === 'Strong' ? 'Expert' : s.level === 'Intermediate' ? 'Advanced' : 'Intermediate',
    yearsOfExperience: s.yearsOfExperience || 2,
  }))

  // Add a couple soft skills if none present
  if (!initialSkills.some((s) => s.category === 'soft')) {
    initialSkills.push(
      { id: 'skill-soft-1', name: 'Technical Communication', category: 'soft', proficiency: 'Advanced', yearsOfExperience: 3 },
      { id: 'skill-soft-2', name: 'Problem Solving', category: 'soft', proficiency: 'Expert', yearsOfExperience: 3.5 }
    )
  }

  const personalInfo: PersonalInfo = {
    fullName: profile.fullName || 'Alex Morgan',
    email: profile.email || 'alex.morgan@example.com',
    phone: '+91 98765 43210',
    location: profile.location || 'Bangalore, India',
    city: 'Bangalore',
    country: 'India',
    linkedIn: 'https://linkedin.com/in/alex-morgan-dev',
    gitHub: 'https://github.com/alex-morgan',
    portfolioUrl: 'https://alexmorgan.dev',
  }

  const professionalProfile: ProfessionalProfileData = {
    headline: 'Software Developer | Full Stack Engineer',
    currentRole: profile.title || 'Frontend & Full Stack Engineer',
    yearsOfExperience: profile.experienceYears || 3.5,
    careerLevel: 'Mid Level',
    primaryRole: 'Frontend Developer',
    secondaryRoles: ['Full Stack Developer', 'Software Developer'],
    summary:
      profile.summary ||
      'Frontend-focused software engineer with 3+ years of experience building modern React, TypeScript, and responsive web applications with microservices and API integrations.',
    skills: initialSkills,
  }

  const jobPreferences: JobPreferencesData = {
    targetRoles: profile.preferredRoles || ['Frontend Developer', 'Full Stack Developer', 'Software Developer'],
    preferredLocations: profile.preferredLocations || ['Bangalore', 'Remote', 'Delhi NCR', 'Noida'],
    remotePreference: 'Remote',
    employmentTypes: ['Full-time', 'Contract'],
    preferredIndustries: ['AI & SaaS', 'FinTech', 'E-Commerce', 'Developer Tools'],
    minSalaryLpa: profile.expectedSalaryLpa?.min || 14,
    maxSalaryLpa: profile.expectedSalaryLpa?.max || 24,
    experienceLevel: profile.experienceLevel || '3–5 years',
    noticePeriod: '15–30 Days',
    preferredCompanies: ['TechFlow Solutions', 'Nexus AI', 'CloudScale Inc'],
  }

  const aiSettings: AISettingsData = {
    jobMatchingEnabled: true,
    resumeOptimizationEnabled: true,
    resumeAnalysisEnabled: true,
    coverLetterGenerationEnabled: true,
    careerInsightsEnabled: true,
    applicationAssistanceEnabled: true,
    personalizationLevel: 'Balanced',
    aiTone: 'Professional',
    matchingPriorities: [
      { id: 'skills', label: 'Skills Match', weight: 5, description: 'Prioritize required technical stack compatibility' },
      { id: 'role', label: 'Role & Title Fit', weight: 4, description: 'Align with primary and secondary target roles' },
      { id: 'remote', label: 'Remote Flexibility', weight: 4, description: 'Weight remote and hybrid work arrangement' },
      { id: 'growth', label: 'Career Growth', weight: 3, description: 'Consider learning opportunities and promotion trajectory' },
      { id: 'salary', label: 'Compensation Target', weight: 4, description: 'Match within preferred LPA salary range' },
      { id: 'location', label: 'Geographic Proximity', weight: 2, description: 'Match preferred city hubs if on-site' },
    ],
  }

  const resumeSettings: ResumeSettingsData = {
    defaultResumeId: 'draft-master',
    defaultTemplateId: 'modern',
    defaultLanguage: 'English (US)',
    defaultLength: '1 Page',
  }

  const applicationSettings: ApplicationSettingsData = {
    autoFillEnabled: true,
    coverLetterAssistanceEnabled: true,
    reviewRequiredBeforeSubmit: true, // MANDATORY SAFETY DEFAULT
    defaultCoverLetterId: 'cl-frontend-01',
    defaultResumeId: 'draft-master',
    defaultNotes: 'Prepared via JobAI Career Copilot. Review required prior to dispatch.',
  }

  const notifications: NotificationPreferencesData = {
    jobMatches: { email: true, inApp: true },
    applicationUpdates: { email: true, inApp: true },
    interviewUpdates: { email: true, inApp: true },
    resumeRecommendations: { email: false, inApp: true },
    careerInsights: { email: true, inApp: true },
    systemNotifications: { email: false, inApp: true },
  }

  const account: AccountSettingsData = {
    email: personalInfo.email,
    accountType: 'Demo Account',
    authStatus: 'Active Demo Session',
    connectedGoogle: true,
    connectedGitHub: true,
    connectedLinkedIn: false,
    memberSince: 'September 2026',
    lastActive: 'Active Now',
  }

  const baseSettings: Omit<UserProfileSettings, 'completionPercentage' | 'completionFactors'> = {
    personalInfo,
    professionalProfile,
    jobPreferences,
    aiSettings,
    resumeSettings,
    applicationSettings,
    notifications,
    account,
  }

  const { percentage, factors } = calculateProfileCompletion(baseSettings)

  return {
    ...baseSettings,
    completionPercentage: percentage,
    completionFactors: factors,
  }
}

/**
 * Calculates dynamic profile completion score and breakdown
 */
export function calculateProfileCompletion(
  settings: Omit<UserProfileSettings, 'completionPercentage' | 'completionFactors'>
): { percentage: number; factors: CompletionFactor[] } {
  const factors: CompletionFactor[] = [
    {
      id: 'basic-info',
      label: 'Basic Information',
      completed: Boolean(
        settings.personalInfo.fullName &&
          settings.personalInfo.email &&
          settings.personalInfo.phone &&
          settings.personalInfo.location
      ),
      impact: 15,
      hint: 'Add full name, verified email, phone, and current city',
    },
    {
      id: 'headline',
      label: 'Professional Headline',
      completed: Boolean(
        settings.professionalProfile.headline && settings.professionalProfile.currentRole
      ),
      impact: 15,
      hint: 'Define your professional headline and target engineering discipline',
    },
    {
      id: 'summary',
      label: 'Professional Summary',
      completed: Boolean(
        settings.professionalProfile.summary && settings.professionalProfile.summary.length >= 60
      ),
      impact: 15,
      hint: 'Write at least 60 characters highlighting key engineering accomplishments',
    },
    {
      id: 'skills',
      label: 'Technical & Soft Skills',
      completed: (settings.professionalProfile.skills || []).length >= 8,
      impact: 20,
      hint: 'Add at least 8 verified skills across technical, tools, and soft categories',
    },
    {
      id: 'job-prefs',
      label: 'Job Preferences',
      completed: Boolean(
        settings.jobPreferences.targetRoles.length > 0 &&
          settings.jobPreferences.preferredLocations.length > 0 &&
          settings.jobPreferences.remotePreference
      ),
      impact: 15,
      hint: 'Select target roles, preferred work locations, and remote mode',
    },
    {
      id: 'resume-default',
      label: 'Default Resume Linked',
      completed: Boolean(settings.resumeSettings.defaultResumeId),
      impact: 10,
      hint: 'Select an active resume version for auto-matching and applications',
    },
    {
      id: 'links',
      label: 'Portfolio & Social Profiles',
      completed: Boolean(
        settings.personalInfo.linkedIn || settings.personalInfo.gitHub || settings.personalInfo.portfolioUrl
      ),
      impact: 10,
      hint: 'Connect your GitHub or LinkedIn profile link for recruiter visibility',
    },
  ]

  const totalEarned = factors.reduce((acc, f) => acc + (f.completed ? f.impact : 0), 0)
  const percentage = Math.min(100, Math.max(0, totalEarned))

  return { percentage, factors }
}

/**
 * Loads profile settings from localStorage or initial defaults
 */
export function getStoredProfileSettings(): UserProfileSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as UserProfileSettings
      if (parsed && parsed.personalInfo && parsed.professionalProfile) {
        // Recalculate completion dynamically
        const { percentage, factors } = calculateProfileCompletion(parsed)
        return {
          ...parsed,
          completionPercentage: percentage,
          completionFactors: factors,
        }
      }
    }
  } catch (err) {
    console.warn('Failed to load profile settings from localStorage:', err)
  }

  const defaults = createDefaultProfileSettings()
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults))
  } catch {
    // storage fallback
  }
  return defaults
}

/**
 * Saves profile settings to localStorage
 */
export function saveProfileSettings(settings: UserProfileSettings): UserProfileSettings {
  const { percentage, factors } = calculateProfileCompletion(settings)
  const updated: UserProfileSettings = {
    ...settings,
    completionPercentage: percentage,
    completionFactors: factors,
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (err) {
    console.error('Failed to save profile settings to localStorage:', err)
  }
  return updated
}

/**
 * Resets profile settings to factory defaults
 */
export function resetProfileSettings(): UserProfileSettings {
  const defaults = createDefaultProfileSettings()
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults))
  } catch {
    // fallback
  }
  return defaults
}

/**
 * Aggregates live connected data counts from across the JobAI platform
 */
export function getConnectedPlatformStats(): ConnectedPlatformStats {
  // Resumes
  let resumesCount = 2
  try {
    const drafts = getSavedResumeVersions()
    resumesCount = drafts.length
  } catch {
    resumesCount = 2
  }

  // Saved Jobs
  let savedJobsCount = 3
  try {
    const rawSaved = localStorage.getItem('jobai_saved_jobs')
    if (rawSaved) {
      const parsed = JSON.parse(rawSaved)
      if (Array.isArray(parsed)) {
        savedJobsCount = parsed.length
      }
    }
  } catch {
    savedJobsCount = 3
  }

  // Tracked Applications
  let applicationsCount = 5
  try {
    const apps = getTrackedApplications()
    applicationsCount = apps.length
  } catch {
    applicationsCount = 5
  }

  // Cover Letters
  let coverLettersCount = 2
  try {
    const cls = getSavedCoverLetters()
    coverLettersCount = cls.length
  } catch {
    coverLettersCount = 2
  }

  // AI Analyses
  const aiAnalysesCount = 12

  // Matched Jobs
  const matchedJobsCount = initialJobsData.filter((j) => j.matchScore >= 80).length || 8

  return {
    resumesCount,
    savedJobsCount,
    applicationsCount,
    coverLettersCount,
    aiAnalysesCount,
    matchedJobsCount,
  }
}

/**
 * Exports user settings as a clean JSON document for user data ownership
 */
export function exportUserDataJson(settings: UserProfileSettings): void {
  try {
    const exportPayload = {
      exportDate: new Date().toISOString(),
      platform: 'JobAI — Your AI Career Copilot',
      version: '1.0.0',
      data: settings,
    }
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `jobai-profile-settings-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Failed to export profile data:', err)
  }
}
