import type { ParsedResume } from '@/data/resumeData'

/**
 * Triggers native browser print dialog, which is formatted cleanly by print styles
 */
export function triggerResumePrint(): void {
  window.print()
}

/**
 * Formats structured resume data into clean ATS-parseable plain text
 */
export function formatResumeAsPlainText(resume: ParsedResume): string {
  const lines: string[] = []

  // Header / Personal Info
  lines.push((resume.personalInfo?.name || 'CANDIDATE NAME').toUpperCase())
  const contactParts = [
    resume.personalInfo?.email,
    resume.personalInfo?.phone,
    resume.personalInfo?.location,
    resume.personalInfo?.linkedIn,
    resume.personalInfo?.gitHub,
    resume.personalInfo?.portfolioUrl,
  ].filter(Boolean)
  lines.push(contactParts.join(' | '))
  lines.push('\n' + '='.repeat(60) + '\n')

  // Summary
  if (resume.summary) {
    lines.push('PROFESSIONAL SUMMARY')
    lines.push('-'.repeat(30))
    lines.push(resume.summary.trim())
    lines.push('\n')
  }

  // Skills
  if (resume.skills) {
    lines.push('TECHNICAL SKILLS')
    lines.push('-'.repeat(30))
    if (resume.skills.frontend?.length) {
      lines.push(`Frontend: ${resume.skills.frontend.map((s) => s.name).join(', ')}`)
    }
    if (resume.skills.backend?.length) {
      lines.push(`Backend: ${resume.skills.backend.map((s) => s.name).join(', ')}`)
    }
    if (resume.skills.database?.length) {
      lines.push(`Databases: ${resume.skills.database.map((s) => s.name).join(', ')}`)
    }
    if (resume.skills.tools?.length) {
      lines.push(`Tools & DevOps: ${resume.skills.tools.map((s) => s.name).join(', ')}`)
    }
    lines.push('\n')
  }

  // Work Experience
  if (resume.workExperience?.length) {
    lines.push('WORK EXPERIENCE')
    lines.push('-'.repeat(30))
    resume.workExperience.forEach((exp) => {
      lines.push(`${exp.role} | ${exp.company}${exp.location ? ` - ${exp.location}` : ''}`)
      lines.push(`${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}`)
      exp.responsibilities.forEach((resp) => {
        lines.push(`  • ${resp}`)
      })
      lines.push('')
    })
  }

  // Projects
  if (resume.projects?.length) {
    lines.push('PROJECTS')
    lines.push('-'.repeat(30))
    resume.projects.forEach((proj) => {
      lines.push(`${proj.name} [${proj.technologies.join(', ')}]`)
      if (proj.githubLink || proj.link) {
        lines.push(`Link: ${proj.githubLink || proj.link}`)
      }
      lines.push(`  • ${proj.description}`)
      lines.push('')
    })
  }

  // Education
  if (resume.education?.length) {
    lines.push('EDUCATION')
    lines.push('-'.repeat(30))
    resume.education.forEach((edu) => {
      lines.push(`${edu.degree}`)
      lines.push(`${edu.institution} | ${edu.year}${edu.score ? ` (${edu.score})` : ''}`)
      lines.push('')
    })
  }

  // Certifications
  if (resume.certifications?.length) {
    lines.push('CERTIFICATIONS')
    lines.push('-'.repeat(30))
    resume.certifications.forEach((cert) => {
      lines.push(`${cert.title} - ${cert.issuer} (${cert.issueDate})`)
    })
    lines.push('')
  }

  return lines.join('\n')
}

/**
 * Download plain text file (.txt) for the user
 */
export function downloadResumePlainText(resume: ParsedResume, filename?: string): void {
  const text = formatResumeAsPlainText(resume)
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename || `${(resume.personalInfo?.name || 'Resume').replace(/\s+/g, '_')}_ATS.txt`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

/**
 * Copy plain text to clipboard with fallback
 */
export async function copyResumePlainText(resume: ParsedResume): Promise<boolean> {
  const text = formatResumeAsPlainText(resume)
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // clipboard fallback
  }
  return false
}
