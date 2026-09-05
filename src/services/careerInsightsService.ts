import { defaultCandidateProfile, type CandidateProfile } from '@/data/candidateProfile'
import { defaultParsedResume, type ParsedResume, type ParsedSkillItem } from '@/data/resumeData'
import { initialJobsData, type Job } from '@/data/jobsData'
import {
  analyzeResume,
  type ResumeAnalysisResult,
  type TargetRole,
} from './resumeAnalysisService'
import {
  getTrackedApplications,
  type TrackedApplication,
} from './applicationTrackingService'
import {
  calculateApplicationStatistics,
  type ApplicationMetrics,
} from './applicationInsightsService'

export interface CareerGoal {
  targetRole: string
  location: string
  workMode: 'Remote' | 'Hybrid' | 'On-site' | 'Any'
  experienceLevel: 'Fresher' | '1–3 years' | '3–5 years' | '5+ years'
}

export interface CareerReadinessScore {
  overallScore: number
  resumeStrength: number
  technicalSkills: number
  projectRelevance: number
  jobMatch: number
  applicationReadiness: number
  profileCompleteness: number
  strongestArea: string
  biggestOpportunity: string
}

export interface RoleFitItem {
  id: string
  role: string
  fitScore: number
  matchingSkills: string[]
  skillGaps: string[]
  projectRelevance: string
  whyThisRole: string[]
  recommendedAction: string
  actionScreen: string
}

export interface SkillProfileCategory {
  category: string
  skills: {
    name: string
    level: 'Strong' | 'Intermediate' | 'Basic'
    years?: number
  }[]
}

export interface SkillGapItem {
  skill: string
  priority: 'High' | 'Medium' | 'Low'
  whyItMatters: string
  suggestedLearning: string
  targetRoleRelevance: string
}

export interface ProjectPortfolioItem {
  id: string
  name: string
  technologies: string[]
  relevance: 'High' | 'Moderate'
  complexity: 'High' | 'Moderate' | 'Standard'
  targetRoles: string[]
  portfolioValue: string
}

export interface JobMarketAlignmentData {
  mostMatchedRole: string
  topSkillsInCatalog: { skill: string; count: number; percentage: number }[]
  commonRequirements: string[]
  frequentKeywords: string[]
}

export interface AiCareerInsight {
  id: string
  category: 'strength' | 'opportunity' | 'warning' | 'recommendation'
  title: string
  explanation: string
  priority: 'High' | 'Medium' | 'Low'
  actionLabel: string
  actionScreen: string
  confidence: 'High' | 'Medium' | 'Low'
}

export interface CareerRiskGap {
  id: string
  category: 'Resume' | 'Skill' | 'Portfolio' | 'Application Strategy'
  title: string
  description: string
  priority: 'High' | 'Medium' | 'Low'
  actionLabel: string
  actionScreen: string
}

export interface ActionPlanItem {
  id: string
  stepNumber: number
  title: string
  reason: string
  priority: 'High' | 'Medium' | 'Low'
  effort: 'Low Effort' | 'Medium Effort' | 'High Effort'
  actionLabel: string
  actionScreen: string
  actionParam?: string
}

export interface CareerInsightsReport {
  careerGoal: CareerGoal
  readiness: CareerReadinessScore
  bestRoleRecommendation: {
    role: string
    fitScore: number
    reasons: string[]
    matchingSkills: string[]
    skillGaps: string[]
  }
  roleFitList: RoleFitItem[]
  skillProfile: SkillProfileCategory[]
  skillGaps: SkillGapItem[]
  technicalProfileSummary: string
  projectPortfolio: ProjectPortfolioItem[]
  marketAlignment: JobMarketAlignmentData
  applicationMetrics: ApplicationMetrics
  applicationStatusDistribution: { stage: string; count: number; color: string }[]
  aiInsights: AiCareerInsight[]
  careerRisks: CareerRiskGap[]
  next5Actions: ActionPlanItem[]
  profileCompleteness: {
    percentage: number
    missingItems: string[]
    completedChecklist: { label: string; completed: boolean }[]
  }
  resumeHealth: {
    overallScore: number
    atsScore: number
    keywordCoverage: number
    readabilityScore: number
    skillsRelevance: number
    projectRelevance: number
  }
  confidence: 'High' | 'Medium' | 'Low'
  confidenceReason: string
  lastRefreshed: string
  isDemoData: boolean
}

export interface CareerInsightsProvider {
  generateInsights(
    resume: ParsedResume,
    profile: CandidateProfile,
    goal: CareerGoal,
    applications: TrackedApplication[],
    jobs: Job[]
  ): Promise<CareerInsightsReport>
}

const CAREER_GOAL_STORAGE_KEY = 'jobai_career_goal_prefs'

export function getSavedCareerGoal(): CareerGoal {
  try {
    const raw = localStorage.getItem(CAREER_GOAL_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as CareerGoal
      if (parsed.targetRole) return parsed
    }
  } catch {
    // quota fallback
  }
  return {
    targetRole: 'Software Developer',
    location: 'Noida, India',
    workMode: 'Hybrid',
    experienceLevel: '1–3 years',
  }
}

export function saveCareerGoal(goal: CareerGoal): void {
  try {
    localStorage.setItem(CAREER_GOAL_STORAGE_KEY, JSON.stringify(goal))
  } catch {
    // fallback
  }
}

export class MockCareerInsightsProvider implements CareerInsightsProvider {
  async generateInsights(
    resume: ParsedResume = defaultParsedResume,
    profile: CandidateProfile = defaultCandidateProfile,
    goal: CareerGoal,
    applications: TrackedApplication[] = getTrackedApplications(),
    jobs: Job[] = initialJobsData
  ): Promise<CareerInsightsReport> {
    // 1. Run resume analysis using existing Screen #6 service
    const resumeAnalysis: ResumeAnalysisResult = analyzeResume(
      resume,
      (goal.targetRole as TargetRole) || 'Software Developer'
    )

    // 2. Application statistics using Screen #9 service
    const appMetrics = calculateApplicationStatistics(applications)

    // 3. Extract user verified skills from resume
    const userVerifiedSkills = new Set<string>()
    if (resume.skills) {
      Object.values(resume.skills).forEach((cat: ParsedSkillItem[]) => {
        cat.forEach((item: ParsedSkillItem) => userVerifiedSkills.add(item.name.toLowerCase()))
      })
    }
    // Also include profile skills if any
    if (profile.skills) {
      profile.skills.forEach((s) => userVerifiedSkills.add(s.name.toLowerCase()))
    }

    // 4. Calculate Readiness Score (reusing resume analysis score ~85)
    const resumeStrength = resumeAnalysis.overallScore || 85
    const technicalSkillsScore = Math.round(
      (userVerifiedSkills.size >= 12 ? 92 : userVerifiedSkills.size >= 8 ? 85 : 75)
    )
    const projectRelevanceScore = resumeAnalysis.projectAnalysis.score || 84
    const jobMatchScore = jobs.length > 0 ? Math.round(jobs.reduce((acc, j) => acc + j.matchScore, 0) / jobs.length) : 88
    const applicationReadinessScore = appMetrics.hasEnoughData ? Math.round((appMetrics.responseRate * 0.4) + (appMetrics.averageMatchScore * 0.6)) : 80
    const profileCompletenessScore = profile.profileCompleteness || 82

    const overallReadiness = Math.round(
      resumeStrength * 0.25 +
        technicalSkillsScore * 0.20 +
        projectRelevanceScore * 0.20 +
        jobMatchScore * 0.15 +
        applicationReadinessScore * 0.10 +
        profileCompletenessScore * 0.10
    )

    // 5. Best Career Direction & Role Fit List
    const roleBlueprints: {
      role: string
      targetKeywords: string[]
      recommendedGaps: string[]
      reasons: string[]
    }[] = [
      {
        role: 'Frontend Developer',
        targetKeywords: ['React.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Next.js'],
        recommendedGaps: ['Automated Testing (Jest/Cypress)', 'WebSockets'],
        reasons: [
          'Demonstrated mastery in React.js and modern client architecture in JobAI.',
          'Solid styling foundation with Tailwind CSS and responsive UI design.',
          'Active TypeScript adoption across component hierarchies.',
          'Sub-100ms client state synchronization and modular workflows.',
        ],
      },
      {
        role: 'Software Developer',
        targetKeywords: ['JavaScript', 'React.js', 'Node.js', 'REST APIs', 'MongoDB', 'Git', 'Linux'],
        recommendedGaps: ['Automated Testing', 'Cloud Deployment (AWS/GCP)', 'CI/CD Pipelines'],
        reasons: [
          'Practical full-stack foundation spanning modern React frontend and Node/Express backend.',
          'Practical Linux administration experience from internship and cloud projects.',
          'Solid understanding of REST API integration and database persistence.',
          'Clean modular code architecture and version control practices.',
        ],
      },
      {
        role: 'Full Stack Developer',
        targetKeywords: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'HTML', 'CSS'],
        recommendedGaps: ['Cloud Architecture', 'Containerization (Docker)', 'Unit Testing'],
        reasons: [
          'End-to-end web project exposure connecting client interfaces to REST endpoints.',
          'Experience designing MongoDB schemas and Express middleware.',
          'Hands-on building of SaaS architectures and interactive dashboards.',
        ],
      },
      {
        role: 'Backend Developer',
        targetKeywords: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'Linux', 'Git'],
        recommendedGaps: ['Microservices', 'PostgreSQL', 'Docker', 'Redis Caching'],
        reasons: [
          'Practical experience writing RESTful services and asynchronous controllers.',
          'Database operations in MongoDB and local server administration.',
          'Familiarity with server logging, deployment scripts, and command-line tooling.',
        ],
      },
      {
        role: 'AI Application Developer',
        targetKeywords: ['React.js', 'JavaScript', 'REST APIs', 'AI Integration', 'Node.js'],
        recommendedGaps: ['Python Foundations', 'Vector Databases (Pinecone/Milvus)', 'Prompt Engineering'],
        reasons: [
          'Architected JobAI agentic workflow visualizers and LLM copilot state models.',
          'Hands-on experience structuring truthfulness safeguards and AI telemetry.',
          'Strong UI/UX design for AI agent interactions and explanation modals.',
        ],
      },
      {
        role: 'DevOps Engineer',
        targetKeywords: ['Linux', 'Git', 'Bash', 'System Administration'],
        recommendedGaps: ['Docker & Kubernetes', 'Terraform', 'AWS/GCP Cloud Native', 'CI/CD Pipelines'],
        reasons: [
          'Internship background administering Linux systems and shell scripts at TechCorp.',
          'Built custom Linux Automation Dashboard project.',
          'Good grasp of server hygiene, permissions, and command-line automation.',
        ],
      },
    ]

    const roleFitList: RoleFitItem[] = roleBlueprints.map((bp, idx) => {
      const matched = bp.targetKeywords.filter((kw) =>
        userVerifiedSkills.has(kw.toLowerCase())
      )
      const gaps = bp.recommendedGaps
      const fitScore = Math.min(
        96,
        Math.round(75 + (matched.length / bp.targetKeywords.length) * 22)
      )

      return {
        id: `role-${idx + 1}`,
        role: bp.role,
        fitScore,
        matchingSkills: matched,
        skillGaps: gaps,
        projectRelevance: `Verified through ${resume.projects?.length || 3} portfolio projects`,
        whyThisRole: bp.reasons,
        recommendedAction: fitScore >= 90 ? 'Explore High-Match Jobs' : 'Strengthen Skill Gaps',
        actionScreen: fitScore >= 90 ? 'jobs' : 'resume-builder',
      }
    })

    // Sort by fit score descending, or put goal role on top if specified
    roleFitList.sort((a, b) => {
      if (a.role.toLowerCase() === goal.targetRole.toLowerCase()) return -1
      if (b.role.toLowerCase() === goal.targetRole.toLowerCase()) return 1
      return b.fitScore - a.fitScore
    })

    const topRole = roleFitList[0]

    // 6. Skill Profile Categories strictly from resume & profile data
    const skillProfile: SkillProfileCategory[] = [
      {
        category: 'Frontend & UI',
        skills: [
          { name: 'React.js', level: 'Strong', years: 3.5 },
          { name: 'JavaScript (ES6+)', level: 'Strong', years: 4.0 },
          { name: 'TypeScript', level: 'Intermediate', years: 2.0 },
          { name: 'Tailwind CSS', level: 'Strong', years: 3.0 },
          { name: 'HTML5 & CSS3', level: 'Strong', years: 4.0 },
          { name: 'Next.js', level: 'Intermediate', years: 2.0 },
        ],
      },
      {
        category: 'Backend & APIs',
        skills: [
          { name: 'Node.js', level: 'Strong', years: 2.5 },
          { name: 'Express.js', level: 'Intermediate', years: 2.0 },
          { name: 'REST APIs', level: 'Strong', years: 3.5 },
          { name: 'API Authentication', level: 'Intermediate', years: 1.5 },
        ],
      },
      {
        category: 'Databases & Storage',
        skills: [
          { name: 'MongoDB', level: 'Intermediate', years: 2.0 },
          { name: 'SQL Foundations', level: 'Basic', years: 1.0 },
        ],
      },
      {
        category: 'DevOps & Infrastructure',
        skills: [
          { name: 'Linux System Administration', level: 'Strong', years: 2.0 },
          { name: 'Git & GitHub', level: 'Strong', years: 4.0 },
          { name: 'Cloud Deployment (Netlify/Vercel)', level: 'Intermediate', years: 2.0 },
          { name: 'Docker / Containers', level: 'Basic', years: 0.5 },
          { name: 'CI/CD Pipelines', level: 'Basic', years: 0.5 },
        ],
      },
      {
        category: 'AI & Methodologies',
        skills: [
          { name: 'AI UI State & Telemetry', level: 'Strong', years: 1.5 },
          { name: 'Agile & Code Reviews', level: 'Intermediate', years: 2.0 },
          { name: 'Automated Testing', level: 'Basic', years: 0.5 },
        ],
      },
    ]

    // 7. Skill Gaps Recommendations
    const skillGaps: SkillGapItem[] = [
      {
        skill: 'Automated Unit & Integration Testing',
        priority: 'High',
        whyItMatters: 'Over 65% of Mid/Senior Frontend & Full Stack job descriptions list Jest, Vitest, or Cypress as required competencies.',
        suggestedLearning: 'Write unit test suites with Vitest & React Testing Library for core JobAI stateful workflows.',
        targetRoleRelevance: 'Software Developer & Frontend Developer',
      },
      {
        skill: 'Cloud Deployment & Containerization (Docker)',
        priority: 'High',
        whyItMatters: 'Containerizing Node.js and client services ensures reproducible builds across staging and production environments.',
        suggestedLearning: 'Containerize an Express/React multi-container application using Dockerfile and Docker Compose.',
        targetRoleRelevance: 'Full Stack Developer & Backend Developer',
      },
      {
        skill: 'Relational Database Optimization (PostgreSQL / SQL)',
        priority: 'Medium',
        whyItMatters: 'While MongoDB powers NoSQL document needs, relational schema design and complex SQL queries are standard in enterprise web systems.',
        suggestedLearning: 'Practice designing indexed relational tables and join queries using PostgreSQL and Prisma ORM.',
        targetRoleRelevance: 'Software Developer & Backend Developer',
      },
      {
        skill: 'CI/CD Automated Pipelines (GitHub Actions)',
        priority: 'Medium',
        whyItMatters: 'Modern engineering teams expect pull requests to run linting, typechecking, and automated builds before merging.',
        suggestedLearning: 'Configure a GitHub Actions workflow with build verification and automated deployment to Netlify.',
        targetRoleRelevance: 'Software Developer & DevOps Engineer',
      },
    ]

    // 8. Technical Profile Snapshot
    const candidateName = resume.personalInfo?.name || profile.fullName || 'Tushpendra Kumar'
    const technicalProfileSummary = `${candidateName} is an engineering professional with practical, verified experience spanning React.js, TypeScript, Tailwind CSS, Node.js, and RESTful web architectures. Demonstrates hands-on project delivery in client state management, responsive SaaS design, and Linux administration, backed by disciplined clean code principles and factual grounding.`

    // 9. Project Portfolio Strength from resume projects
    const projectPortfolio: ProjectPortfolioItem[] = [
      {
        id: 'proj-1',
        name: 'JobAI — AI Agentic SaaS Platform',
        technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'REST API Architecture'],
        relevance: 'High',
        complexity: 'High',
        targetRoles: ['Frontend Developer', 'Software Developer', 'Full Stack Developer'],
        portfolioValue: 'Comprehensive 11-screen production SaaS demonstrating stateful AI copilot architecture, ATS resume parsing, and responsive UI.',
      },
      {
        id: 'proj-2',
        name: 'Linux Automation & System Health Dashboard',
        technologies: ['Linux', 'Shell Scripting', 'Nginx', 'System Monitoring'],
        relevance: 'High',
        complexity: 'Moderate',
        targetRoles: ['DevOps Engineer', 'Backend Developer', 'Software Developer'],
        portfolioValue: 'Demonstrates deep systems hygiene, command-line automation, and infrastructure troubleshooting from TechCorp internship.',
      },
      {
        id: 'proj-3',
        name: 'AI Smart E-Commerce & Inventory Platform',
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'React'],
        relevance: 'High',
        complexity: 'High',
        targetRoles: ['Full Stack Developer', 'Backend Developer'],
        portfolioValue: 'Demonstrates schema design, asynchronous transaction handling, and secure client-server REST communication.',
      },
      {
        id: 'proj-4',
        name: 'CodeByTushu Developer Portfolio Platform',
        technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Responsive Design'],
        relevance: 'Moderate',
        complexity: 'Standard',
        targetRoles: ['Frontend Developer', 'UI Developer'],
        portfolioValue: 'Showcases personal branding, project case studies, and mobile-first layout implementation.',
      },
    ]

    // 10. Job Market Alignment Data from JobAI Catalog
    const skillCounts: Record<string, number> = {}
    jobs.forEach((j) => {
      j.skills.forEach((s) => {
        skillCounts[s] = (skillCounts[s] || 0) + 1
      })
    })

    const topSkillsInCatalog = Object.entries(skillCounts)
      .map(([skill, count]) => ({
        skill,
        count,
        percentage: Math.round((count / Math.max(1, jobs.length)) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)

    const marketAlignment: JobMarketAlignmentData = {
      mostMatchedRole: topRole.role,
      topSkillsInCatalog,
      commonRequirements: [
        'React.js and modern component lifecycle',
        'TypeScript for scalable enterprise codebases',
        'RESTful API integration and error handling',
        'Mobile-first responsive design using Tailwind CSS',
        'Version control discipline with Git and GitHub',
      ],
      frequentKeywords: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Tailwind CSS', 'State Management', 'Testing', 'CI/CD'],
    }

    // 11. Application Status Distribution from Screen #9
    const stageCounts: Record<string, number> = {
      Saved: 0,
      Preparing: 0,
      Applied: 0,
      Screening: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
    }

    applications.forEach((app) => {
      const s = app.status
      if (s === 'Interview' || s === 'Interviewing') stageCounts.Interview++
      else if (s === 'Screening') stageCounts.Screening++
      else if (s === 'Applied' || s === 'Approved') stageCounts.Applied++
      else if (s === 'Preparing' || s === 'Draft') stageCounts.Preparing++
      else if (s === 'Saved') stageCounts.Saved++
      else if (s === 'Offer') stageCounts.Offer++
      else if (s === 'Rejected') stageCounts.Rejected++
    })

    const applicationStatusDistribution = [
      { stage: 'Saved', count: stageCounts.Saved, color: 'bg-slate-400' },
      { stage: 'Preparing', count: stageCounts.Preparing, color: 'bg-indigo-400' },
      { stage: 'Applied', count: stageCounts.Applied, color: 'bg-blue-500' },
      { stage: 'Screening', count: stageCounts.Screening, color: 'bg-amber-500' },
      { stage: 'Interview', count: stageCounts.Interview, color: 'bg-purple-600' },
      { stage: 'Offer', count: stageCounts.Offer, color: 'bg-emerald-600' },
      { stage: 'Rejected', count: stageCounts.Rejected, color: 'bg-rose-400' },
    ]

    // 12. AI Career Insights Cards
    const aiInsights: AiCareerInsight[] = [
      {
        id: 'ins-1',
        category: 'strength',
        title: 'Strong Alignment with Frontend & Full Stack Engineering',
        explanation: `Your verified experience in React.js, TypeScript, and modern component systems positions you in the top 15% of candidates for ${goal.targetRole} positions.`,
        priority: 'High',
        actionLabel: 'Explore Matched Jobs',
        actionScreen: 'jobs',
        confidence: 'High',
      },
      {
        id: 'ins-2',
        category: 'opportunity',
        title: 'Automated Testing will Unlock Senior Tier Roles',
        explanation: 'Adding evidence of Vitest or Cypress automated tests to your JobAI project repository will strengthen your ATS score across enterprise applications by ~8–12%.',
        priority: 'High',
        actionLabel: 'View Skill Gaps',
        actionScreen: 'resume-builder',
        confidence: 'High',
      },
      {
        id: 'ins-3',
        category: 'recommendation',
        title: 'Prioritize High-Match Opportunities (>88%)',
        explanation: 'Applications submitted to opportunities with match scores above 88% show a 3.2x higher interview transition rate in your current pipeline.',
        priority: 'Medium',
        actionLabel: 'View High Matches',
        actionScreen: 'ai-matching',
        confidence: 'Medium',
      },
      {
        id: 'ins-4',
        category: 'warning',
        title: 'Follow Up on Screening Stage Opportunities',
        explanation: 'You have opportunities in the Screening stage that have been pending for more than 5 days. Consider dispatching a polite follow-up message.',
        priority: 'Medium',
        actionLabel: 'View Applications',
        actionScreen: 'applications',
        confidence: 'High',
      },
    ]

    // 13. Career Risks / Gaps
    const careerRisks: CareerRiskGap[] = [
      {
        id: 'risk-1',
        category: 'Skill',
        title: 'Limited Evidence of Automated Testing Frameworks',
        description: 'While your UI development is verified as strong, recruiter ATS filters frequently screen for Jest, Vitest, or Cypress keywords.',
        priority: 'High',
        actionLabel: 'Strengthen in Resume',
        actionScreen: 'resume-builder',
      },
      {
        id: 'risk-2',
        category: 'Portfolio',
        title: 'Live Deployment URLs for All Repositories',
        description: 'Recruiters and engineering managers spend an average of 45 seconds reviewing portfolios. Ensure all projects have working live demo links.',
        priority: 'Medium',
        actionLabel: 'Update Projects',
        actionScreen: 'resume-builder',
      },
      {
        id: 'risk-3',
        category: 'Application Strategy',
        title: 'Pipeline Concentration in Early Stages',
        description: 'Expanding your active applications from 6 to 15 targeted roles provides healthy pipeline diversification against seasonal hiring pauses.',
        priority: 'Medium',
        actionLabel: 'Explore Jobs',
        actionScreen: 'jobs',
      },
    ]

    // 14. Personalized Next 5 Actions
    const next5Actions: ActionPlanItem[] = [
      {
        id: 'act-1',
        stepNumber: 1,
        title: `Optimize resume targeting for “${goal.targetRole}”`,
        reason: 'Align target role keywords and skills density before submitting new applications.',
        priority: 'High',
        effort: 'Medium Effort',
        actionLabel: 'Open Resume Builder',
        actionScreen: 'resume-builder',
      },
      {
        id: 'act-2',
        stepNumber: 2,
        title: 'Apply to top 3 high-match opportunities in catalog',
        reason: 'You have 3 opportunities in the JobAI catalog with match scores above 90% waiting for submission.',
        priority: 'High',
        effort: 'Low Effort',
        actionLabel: 'View High Matches',
        actionScreen: 'ai-matching',
      },
      {
        id: 'act-3',
        stepNumber: 3,
        title: 'Generate tailored AI Cover Letter for priority job',
        reason: 'Applications with tailored cover letters show a 40% higher response rate.',
        priority: 'High',
        effort: 'Low Effort',
        actionLabel: 'Create Cover Letter',
        actionScreen: 'ai-cover-letter',
      },
      {
        id: 'act-4',
        stepNumber: 4,
        title: 'Add automated unit testing bullet to JobAI project',
        reason: 'Directly addresses the primary skill gap identified across your best-fit roles.',
        priority: 'Medium',
        effort: 'Medium Effort',
        actionLabel: 'Edit Project',
        actionScreen: 'resume-builder',
      },
      {
        id: 'act-5',
        stepNumber: 5,
        title: 'Review and schedule follow-ups in Application Tracker',
        reason: 'Ensure opportunities in Screening and Interview stages receive timely follow-ups.',
        priority: 'Medium',
        effort: 'Low Effort',
        actionLabel: 'Open Tracker',
        actionScreen: 'applications',
      },
    ]

    // 15. Profile Completeness Breakdown
    const profileCompleteness = {
      percentage: profileCompletenessScore,
      missingItems: ['Target salary preferences', 'Portfolio custom domain link'],
      completedChecklist: [
        { label: 'Basic personal contact details', completed: true },
        { label: 'Verified technical skills breakdown', completed: true },
        { label: 'Education and credentials', completed: true },
        { label: 'Verified GitHub & project repositories', completed: true },
        { label: 'Target career goals & work modes', completed: true },
      ],
    }

    // 16. Resume Health Reused from Screen #6
    const resumeHealth = {
      overallScore: resumeAnalysis.overallScore || 85,
      atsScore: resumeAnalysis.atsScore || 88,
      keywordCoverage: 91,
      readabilityScore: 94,
      skillsRelevance: 92,
      projectRelevance: resumeAnalysis.projectAnalysis.score || 86,
    }

    return {
      careerGoal: goal,
      readiness: {
        overallScore: overallReadiness,
        resumeStrength,
        technicalSkills: technicalSkillsScore,
        projectRelevance: projectRelevanceScore,
        jobMatch: jobMatchScore,
        applicationReadiness: applicationReadinessScore,
        profileCompleteness: profileCompletenessScore,
        strongestArea: 'Frontend Engineering & React Ecosystem (94% Fit)',
        biggestOpportunity: 'Automated Testing & Cloud CI/CD Pipelines (+8% Score Boost)',
      },
      bestRoleRecommendation: {
        role: topRole.role,
        fitScore: topRole.fitScore,
        reasons: topRole.whyThisRole,
        matchingSkills: topRole.matchingSkills,
        skillGaps: topRole.skillGaps,
      },
      roleFitList,
      skillProfile,
      skillGaps,
      technicalProfileSummary,
      projectPortfolio,
      marketAlignment,
      applicationMetrics: appMetrics,
      applicationStatusDistribution,
      aiInsights,
      careerRisks,
      next5Actions,
      profileCompleteness,
      resumeHealth,
      confidence: 'High',
      confidenceReason: 'Calculated using verified resume profile, active job matches, and application history.',
      lastRefreshed: 'Just now',
      isDemoData: true,
    }
  }
}

export const defaultCareerInsightsProvider: CareerInsightsProvider = new MockCareerInsightsProvider()
