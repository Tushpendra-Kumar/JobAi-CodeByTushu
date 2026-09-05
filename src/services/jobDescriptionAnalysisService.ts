export interface ExtractedJobRequirements {
  extractedRole?: string
  extractedSkills: string[]
  extractedKeywords: string[]
  extractedResponsibilities: string[]
  extractedRequirements: string[]
  characterCount: number
  wordCount: number
}

const COMMON_TECH_KEYWORDS = [
  'react',
  'react.js',
  'typescript',
  'javascript',
  'node',
  'node.js',
  'tailwind',
  'css',
  'html',
  'next.js',
  'redux',
  'rest',
  'api',
  'graphql',
  'python',
  'sql',
  'postgresql',
  'mongodb',
  'git',
  'docker',
  'aws',
  'linux',
  'ci/cd',
  'agile',
  'scrum',
  'microservices',
  'vitest',
  'jest',
  'testing',
  'performance',
  'accessibility',
]

/**
 * Heuristic extractor that parses pasted job descriptions to identify keywords,
 * core skills, and requirements without fabricating AI capabilities.
 */
export function analyzeJobDescription(text: string): ExtractedJobRequirements {
  if (!text || text.trim().length === 0) {
    return {
      extractedSkills: [],
      extractedKeywords: [],
      extractedResponsibilities: [],
      extractedRequirements: [],
      characterCount: 0,
      wordCount: 0,
    }
  }

  const cleanText = text.trim()
  const lower = cleanText.toLowerCase()
  const words = cleanText.split(/\s+/).filter(Boolean)

  // 1. Identify skills and keywords matching our technical dictionary
  const foundSkillsSet = new Set<string>()
  COMMON_TECH_KEYWORDS.forEach((kw) => {
    // Regex whole word match
    const regex = new RegExp(`\\b${kw.replace('.', '\\.')}\\b`, 'i')
    if (regex.test(lower)) {
      foundSkillsSet.add(kw.charAt(0).toUpperCase() + kw.slice(1))
    }
  })

  // 2. Extract potential role title if mentioned in common headers
  let extractedRole: string | undefined = undefined
  const roleMatch = cleanText.match(
    /(?:Job Title|Role|Position|Looking for an?|Hiring an?)\s*[:\-–]\s*([A-Za-z0-9\s/()]+)/i
  )
  if (roleMatch && roleMatch[1]) {
    extractedRole = roleMatch[1].split('\n')[0].trim().slice(0, 50)
  }

  // 3. Extract responsibilities & requirements from bullet points or numbered lists
  const lines = cleanText.split('\n').map((l) => l.trim()).filter(Boolean)
  const responsibilities: string[] = []
  const requirements: string[] = []

  let inResponsibilitiesSection = false
  let inRequirementsSection = false

  lines.forEach((line) => {
    const lLower = line.toLowerCase()
    if (lLower.includes('responsibilit') || lLower.includes('what you will do') || lLower.includes('what you’ll do')) {
      inResponsibilitiesSection = true
      inRequirementsSection = false
      return
    }
    if (lLower.includes('requirement') || lLower.includes('qualification') || lLower.includes('skills needed') || lLower.includes('who you are')) {
      inRequirementsSection = true
      inResponsibilitiesSection = false
      return
    }

    const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || /^\d+[.)]/.test(line)
    if (isBullet) {
      const bulletContent = line.replace(/^[•\-*\d.)\s]+/, '').trim()
      if (bulletContent.length > 10) {
        if (inResponsibilitiesSection && responsibilities.length < 5) {
          responsibilities.push(bulletContent)
        } else if (inRequirementsSection && requirements.length < 5) {
          requirements.push(bulletContent)
        }
      }
    }
  })

  const extractedSkills = Array.from(foundSkillsSet)
  const extractedKeywords = extractedSkills.slice(0, 10)

  return {
    extractedRole,
    extractedSkills,
    extractedKeywords,
    extractedResponsibilities: responsibilities,
    extractedRequirements: requirements,
    characterCount: cleanText.length,
    wordCount: words.length,
  }
}
