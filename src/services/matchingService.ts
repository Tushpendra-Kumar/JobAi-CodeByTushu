import type { Job } from '@/data/jobsData'
import type { CandidateProfile } from '@/data/candidateProfile'

export interface MatchBreakdownMetrics {
  technicalSkills: number
  projects: number
  experience: number
  education: number
  location: number
  careerGoals: number
  jobRequirements: number
}

export interface SkillCategorization {
  strongMatch: string[]
  partialMatch: string[]
  skillGap: string[]
}

export interface SkillGapItem {
  skill: string
  currentLevel: string
  recommendedLevel: string
  whyItMatters: string
}

export interface JobMatchAnalysis {
  jobId: string
  overallScore: number
  summary: string
  positiveAlignments: string[]
  potentialGaps: string[]
  recommendationText: string
  breakdown: MatchBreakdownMetrics
  skillCompatibility: SkillCategorization
  skillGaps: SkillGapItem[]
}

export interface MatchFilterCriteria {
  minMatchScore?: number // 80, 85, 90, 95
  roles: string[]
  workModes: string[]
  locations: string[]
  experienceLevels: string[]
  searchQuery?: string
}

export type MatchSortOption = 'best' | 'relevant' | 'newest' | 'salary' | 'growth'

export interface AiAgentTelemetry {
  jobsAnalyzedToday: number
  strongMatches: number
  newRecommendations: number
  lastUpdated: string
}

/**
 * Evaluates candidate profile against a job posting to derive explainable AI match diagnostics.
 * Architecture Note: In a production setting, this service will call an LLM reasoning endpoint
 * or vector similarity service. For demo mode, it uses deterministic heuristic scoring.
 */
export function evaluateJobMatch(job: Job, profile: CandidateProfile): JobMatchAnalysis {
  // Candidate skill map for fast lookup
  const candidateSkillMap = new Map(
    profile.skills.map((s) => [s.name.toLowerCase(), s.level])
  )

  const strongMatch: string[] = []
  const partialMatch: string[] = []
  const skillGap: string[] = []

  job.skills.forEach((skill) => {
    const key = skill.toLowerCase()
    const level = candidateSkillMap.get(key)
    if (level === 'Strong') {
      strongMatch.push(skill)
    } else if (level === 'Intermediate') {
      partialMatch.push(skill)
    } else {
      skillGap.push(skill)
    }
  })

  // Ensure default demonstration categories align with specification if empty
  if (strongMatch.length === 0) {
    strongMatch.push('React.js', 'JavaScript', 'REST APIs')
  }
  if (partialMatch.length === 0) {
    partialMatch.push('TypeScript')
  }
  if (skillGap.length === 0) {
    skillGap.push('Cloud Deployment', 'CI/CD')
  }

  // Breakdown metrics
  const breakdown: MatchBreakdownMetrics = {
    technicalSkills: job.matchScore >= 90 ? 96 : job.matchScore >= 85 ? 90 : 84,
    projects: job.matchScore >= 90 ? 94 : 88,
    experience: job.experience === profile.experienceLevel ? 92 : 86,
    education: 90,
    location:
      job.workMode === 'Remote' || profile.preferredLocations.some((loc) => job.location.includes(loc))
        ? 92
        : 80,
    careerGoals: job.matchScore >= 90 ? 91 : 85,
    jobRequirements: job.matchScore >= 90 ? 95 : 88,
  }

  const positiveAlignments = [
    'Technical Skills',
    'Relevant Projects',
    'Experience Alignment',
    'Career Direction',
    'Location Preference',
  ]

  const potentialGaps = [
    'TypeScript',
    'Automated Testing',
    'Cloud Deployment',
  ]

  const recommendationText =
    job.matchScore >= 90
      ? 'Strongly recommended. Your current profile covers most core requirements. Improving TypeScript and testing experience could further strengthen your application.'
      : job.matchScore >= 85
      ? 'Recommended opportunity. Your foundational skills match the position requirements well, with minor tooling gaps easily bridged.'
      : 'Viable growth opportunity. Good alignment with core fundamentals, but requires ramp-up in specialized domain tools.'

  // Skill gaps insights
  const skillGaps: SkillGapItem[] = [
    {
      skill: 'TypeScript',
      currentLevel: 'Intermediate',
      recommendedLevel: 'Strong',
      whyItMatters: 'Large-scale codebases require strict static typing and generic architectural patterns.',
    },
    {
      skill: 'Testing',
      currentLevel: 'Beginner',
      recommendedLevel: 'Intermediate',
      whyItMatters: 'Unit and end-to-end test coverage (Jest, Playwright) is required for production shipping.',
    },
    {
      skill: 'Cloud Deployment',
      currentLevel: 'Beginner',
      recommendedLevel: 'Intermediate',
      whyItMatters: 'Containerized deployment knowledge accelerates feature rollout velocity.',
    },
  ]

  return {
    jobId: job.id,
    overallScore: job.matchScore,
    summary: job.matchExplanation,
    positiveAlignments,
    potentialGaps,
    recommendationText,
    breakdown,
    skillCompatibility: {
      strongMatch,
      partialMatch,
      skillGap,
    },
    skillGaps,
  }
}

/**
 * Filter and Rank candidate jobs based on user criteria and AI scoring preferences.
 */
export function filterAndRankJobs(
  jobs: Job[],
  criteria: MatchFilterCriteria,
  sortBy: MatchSortOption = 'best'
): Job[] {
  let results = [...jobs]

  // Filter 1: Minimum Match Score
  if (criteria.minMatchScore && criteria.minMatchScore > 0) {
    results = results.filter((job) => job.matchScore >= criteria.minMatchScore!)
  }

  // Filter 2: Roles
  if (criteria.roles.length > 0) {
    results = results.filter((job) =>
      criteria.roles.some((role) => {
        const title = job.title.toLowerCase()
        const r = role.toLowerCase()
        if (r.includes('frontend')) return title.includes('frontend') || title.includes('ui')
        if (r.includes('full stack')) return title.includes('full stack')
        if (r.includes('ai')) return title.includes('ai') || title.includes('machine learning')
        if (r.includes('backend')) return title.includes('backend')
        if (r.includes('devops')) return title.includes('devops') || title.includes('cloud')
        if (r.includes('software developer')) return title.includes('software') || title.includes('developer')
        return title.includes(r)
      })
    )
  }

  // Filter 3: Work Mode
  if (criteria.workModes.length > 0) {
    results = results.filter((job) => criteria.workModes.includes(job.workMode))
  }

  // Filter 4: Location
  if (criteria.locations.length > 0) {
    results = results.filter((job) =>
      criteria.locations.some((loc) => {
        if (loc === 'Remote') return job.workMode === 'Remote' || job.location.includes('Remote')
        return job.location.toLowerCase().includes(loc.toLowerCase())
      })
    )
  }

  // Filter 5: Experience
  if (criteria.experienceLevels.length > 0) {
    results = results.filter((job) => criteria.experienceLevels.includes(job.experience))
  }

  // Filter 6: Search Query (if any)
  if (criteria.searchQuery && criteria.searchQuery.trim()) {
    const q = criteria.searchQuery.toLowerCase()
    results = results.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q))
    )
  }

  // Sorting
  results.sort((a, b) => {
    if (sortBy === 'best') {
      return b.matchScore - a.matchScore
    }
    if (sortBy === 'relevant') {
      // Relevance heuristic: matchScore + priority boost
      return b.matchScore - a.matchScore
    }
    if (sortBy === 'newest') {
      return a.postedDaysAgo - b.postedDaysAgo
    }
    if (sortBy === 'salary') {
      return b.salaryMaxLpa - a.salaryMaxLpa
    }
    if (sortBy === 'growth') {
      const isGrowthA = a.skills.some((s) => ['AI Integration', 'TypeScript', 'Docker'].includes(s))
      const isGrowthB = b.skills.some((s) => ['AI Integration', 'TypeScript', 'Docker'].includes(s))
      if (isGrowthA && !isGrowthB) return -1
      if (!isGrowthA && isGrowthB) return 1
      return b.matchScore - a.matchScore
    }
    return 0
  })

  return results
}

/**
 * Returns current simulated agent telemetry
 */
export function getSimulatedAgentTelemetry(): AiAgentTelemetry {
  return {
    jobsAnalyzedToday: 248,
    strongMatches: 32,
    newRecommendations: 12,
    lastUpdated: 'Just now',
  }
}
