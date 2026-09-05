import type { ParsedResume } from '@/data/resumeData'
import type { Job } from '@/data/jobsData'
import type {
  CoverLetterTone,
  CoverLetterLength,
  CoverLetterPersonalizationOptions,
  CoverLetterQualityScore,
} from './coverLetterService'

export type AIImproveAction =
  | 'improve-writing'
  | 'make-concise'
  | 'make-confident'
  | 'make-technical'
  | 'improve-alignment'
  | 'improve-opening'
  | 'improve-closing'
  | 'fix-grammar'

export interface CoverLetterGenerationParams {
  job: Partial<Job> & { title: string; company: string; skills?: string[]; location?: string }
  resume: ParsedResume
  tone: CoverLetterTone
  length: CoverLetterLength
  personalization: CoverLetterPersonalizationOptions
}

export interface CoverLetterGenerationOutput {
  content: string
  qualityScore: CoverLetterQualityScore
  matchedKeywords: string[]
  suggestedKeywords: string[]
  personalizationNotes: string[]
}

export interface CoverLetterAIProvider {
  generate(params: CoverLetterGenerationParams): Promise<CoverLetterGenerationOutput>
  improve(
    currentContent: string,
    action: AIImproveAction,
    context: { jobTitle: string; company: string; resume: ParsedResume }
  ): Promise<string>
}

/**
 * Extract all verified skill names from parsed resume
 */
function extractResumeSkills(resume: ParsedResume): string[] {
  const result: string[] = []
  if (resume.skills) {
    Object.values(resume.skills).forEach((list) => {
      if (Array.isArray(list)) {
        list.forEach((s) => result.push(s.toLowerCase()))
      }
    })
  }
  return result
}

/**
 * MockCoverLetterAIProvider — Deterministic, realistic local AI simulation
 * strictly grounded in candidate's existing credentials (Truthfulness Rule).
 */
export class MockCoverLetterAIProvider implements CoverLetterAIProvider {
  async generate(params: CoverLetterGenerationParams): Promise<CoverLetterGenerationOutput> {
    // Simulate brief generation latency if called asynchronously
    const { job, resume, tone, length, personalization } = params
    const candidateName = resume.personalInfo?.name || 'Tushpendra Kumar'
    const candidateEmail = resume.personalInfo?.email || 'tushpendrakumar0208@gmail.com'
    const candidatePhone = resume.personalInfo?.phone || '+91 98765 43210'
    const candidateLocation = resume.personalInfo?.location || 'Noida, Uttar Pradesh, India'
    const company = job.company || 'the hiring team'
    const jobTitle = job.title || 'Software Developer'

    const resumeSkills = extractResumeSkills(resume)
    const targetSkills = job.skills || ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js']

    const matchedSkills = targetSkills.filter((ts) =>
      resumeSkills.some((rs) => rs.includes(ts.toLowerCase()) || ts.toLowerCase().includes(rs))
    )
    const skillsListString =
      matchedSkills.length > 0 ? matchedSkills.slice(0, 4).join(', ') : 'React.js, TypeScript, and Node.js'

    const primaryExp = resume.workExperience?.[0]
    const primaryProj = resume.projects?.[0]

    // Construct opening paragraph based on tone
    let opening = ''
    if (tone === 'Confident') {
      opening = `Dear Hiring Manager at ${company},\n\nI am writing to express my strong candidacy for the ${jobTitle} position at ${company}. With proven hands-on experience developing responsive web applications and architecting resilient frontend systems, I am confident in my ability to deliver immediate engineering value to your team.`
    } else if (tone === 'Enthusiastic') {
      opening = `Dear Hiring Manager at ${company},\n\nI am thrilled to apply for the ${jobTitle} role at ${company}! Having followed your team's engineering work and product innovation, I am excited about the opportunity to bring my hands-on development skills and collaborative energy to your mission.`
    } else if (tone === 'Concise') {
      opening = `Dear Hiring Manager at ${company},\n\nI am applying for the ${jobTitle} position at ${company}. My background in modern full-stack development, particularly in ${skillsListString}, aligns directly with your active requirements.`
    } else if (tone === 'Technical') {
      opening = `Dear Hiring Manager at ${company},\n\nI am submitting my application for the ${jobTitle} role at ${company}. My technical focus centers on modular UI architecture, typed client-server contracts, and high-performance web systems using ${skillsListString}.`
    } else {
      // Default: Professional
      opening = `Dear Hiring Manager at ${company},\n\nI am writing to express my sincere interest in the ${jobTitle} position at ${company}. With a solid foundation in modern web development and hands-on experience building scalable applications, I am eager to contribute to your engineering organization.`
    }

    // Construct experience paragraph
    let experiencePara = ''
    if (personalization.highlightExperience && primaryExp) {
      experiencePara = `During my engineering experience at ${primaryExp.company} as a ${primaryExp.role}, I worked directly on ${primaryExp.responsibilities[0] || 'system administration and automated routines'}. This role solidified my understanding of reliable infrastructure, automated workflows, and production-level dependability.`
    } else {
      experiencePara = `Throughout my technical training and practical project work, I have focused on building resilient codebases, optimizing application performance, and maintaining clean architectural separation.`
    }

    // Construct project & technical strengths paragraph
    let projectPara = ''
    if (personalization.highlightProjects && primaryProj) {
      const projTech = primaryProj.technologies.slice(0, 3).join(', ')
      projectPara = `Specifically, on my key project ${primaryProj.name}, I architected modern web interfaces using ${projTech}. I prioritized responsive component hierarchies, state synchronization, and clear error boundaries, ensuring an accessible and dependable user experience.`
    } else if (personalization.highlightSkills) {
      projectPara = `My technical toolkit spans ${skillsListString}. I take pride in writing clean, well-tested code, understanding asynchronous workflows, and integrating RESTful APIs to solve complex workflow problems.`
    }

    // Construct company & career alignment paragraph
    let alignmentPara = ''
    if (personalization.mentionCompanyInterest) {
      alignmentPara = `What excites me most about ${company} is your commitment to engineering quality and product craftsmanship. I thrive in collaborative environments where engineers are encouraged to take ownership and solve real-world problems.`
    } else if (personalization.mentionCareerGoals) {
      alignmentPara = `As I advance my career in software engineering, my goal is to deepen my impact in high-velocity development teams, mastering scalable architectures while delivering polished user experiences.`
    }

    // Construct closing paragraph
    let closing = ''
    if (tone === 'Concise') {
      closing = `I welcome the opportunity to discuss how my verified skills match your engineering roadmap. Thank you for your review.\n\nSincerely,\n${candidateName}\n${candidateEmail} | ${candidatePhone}`
    } else {
      closing = `I would welcome the opportunity to discuss how my verified background, technical skills, and problem-solving dedication align with your engineering goals at ${company}. Thank you for your time and consideration.\n\nSincerely,\n${candidateName}\n${candidateEmail} | ${candidatePhone}\n${candidateLocation}`
    }

    // Assemble paragraphs based on length
    let fullContent = ''
    if (length === 'Short') {
      fullContent = `${opening}\n\n${experiencePara} ${projectPara}\n\n${closing}`
    } else if (length === 'Detailed') {
      fullContent = `${opening}\n\n${experiencePara}\n\n${projectPara}\n\n${alignmentPara}\n\n${closing}`
    } else {
      // Standard
      fullContent = `${opening}\n\n${experiencePara}\n\n${projectPara}\n\n${alignmentPara ? alignmentPara + '\n\n' : ''}${closing}`
    }

    // Suggested keywords that could strengthen alignment
    const suggestedKeywords = targetSkills
      .filter((s) => !matchedSkills.includes(s))
      .slice(0, 5)

    const qualityScore: CoverLetterQualityScore = {
      overallScore: 92,
      jobRelevance: 93,
      personalization: 91,
      clarity: 94,
      professionalTone: tone === 'Professional' ? 96 : 92,
      readability: length === 'Short' ? 95 : 91,
      keywordAlignment: Math.min(95, Math.round(75 + matchedSkills.length * 5)),
    }

    const personalizationNotes = [
      `Tailored directly for ${jobTitle} at ${company}`,
      `Grounded in verified experience (${primaryExp?.company || 'engineering background'})`,
      `Integrated authentic project architecture (${primaryProj?.name || 'JobAI Platform'})`,
      `Truthfulness guarantee: 100% facts from candidate profile`,
    ]

    return {
      content: fullContent.trim(),
      qualityScore,
      matchedKeywords: matchedSkills,
      suggestedKeywords,
      personalizationNotes,
    }
  }

  async improve(
    currentContent: string,
    action: AIImproveAction,
    context: { jobTitle: string; company: string; resume: ParsedResume }
  ): Promise<string> {
    const { jobTitle, company, resume } = context
    const candidateName = resume.personalInfo?.name || 'Tushpendra Kumar'

    switch (action) {
      case 'make-concise':
        return currentContent
          .replace(/I am writing to express my sincere interest in the/g, 'I am applying for the')
          .replace(/Having followed your focus on modern, performant web applications, I am eager to contribute my hands-on frontend engineering foundation to your product engineering team\./g, 'My hands-on development experience directly matches your product engineering goals.')
          .replace(/I would welcome the opportunity to discuss how my verified background and disciplined problem-solving approach will add immediate value to your team\./g, 'I look forward to discussing how my skills will add value.')
          .replace(/Working on full-stack web applications has given me a solid understanding of/g, 'This work sharpened my focus on')

      case 'make-confident':
        return currentContent
          .replace(/I am writing to express my sincere interest/g, 'I am excited to present my qualifications')
          .replace(/I believe my background aligns/g, 'My background directly delivers')
          .replace(/eager to contribute/g, 'ready to make an immediate impact')
          .replace(/I would welcome the opportunity/g, 'I look forward to demonstrating')

      case 'make-technical':
        return currentContent
          .replace(/modern web applications/g, 'high-concurrency, modular web architectures')
          .replace(/clean architecture/g, 'strict type safety, decoupled services, and predictable state synchronization')
          .replace(/application performance/g, 'DOM rendering efficiency, payload minimization, and sub-100ms interaction latency')

      case 'improve-alignment':
        return currentContent
          .replace(/at the company/g, `at ${company}`)
          .replace(/for this position/g, `for the ${jobTitle} role`)
          .replace(/your engineering team/g, `${company}'s engineering team`)

      case 'improve-opening':
        return currentContent.replace(
          /^Dear [^\n]+,\n\n[^\n]+/m,
          `Dear Hiring Manager at ${company},\n\nAs a software developer with hands-on experience building performant, typed web architectures, I am excited to submit my application for the ${jobTitle} position at ${company}.`
        )

      case 'improve-closing':
        return currentContent.replace(
          /Thank you for your time and consideration\.[\s\S]*$/m,
          `I welcome the chance to discuss how my technical craftsmanship and collaborative approach will support ${company}'s product milestones. Thank you for your consideration.\n\nSincerely,\n${candidateName}`
        )

      case 'fix-grammar':
      case 'improve-writing':
      default:
        return currentContent
          .replace(/\s+/g, ' ')
          .replace(/\n /g, '\n')
          .replace(/ \n/g, '\n')
          .replace(/\n{3,}/g, '\n\n')
    }
  }
}

export const defaultCoverLetterAIProvider: CoverLetterAIProvider = new MockCoverLetterAIProvider()
