import React from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'
import type { ParsedResume } from '@/data/resumeData'
import type { TemplateId } from '@/services/resumeBuilderAIService'
import type { ResumeFontSize, ResumeSpacing } from './ResumeCustomizationBar'

interface LiveResumePreviewProps {
  resume: ParsedResume
  templateId: TemplateId
  fontSize: ResumeFontSize
  spacing: ResumeSpacing
  isHighDensity: boolean
  targetRoleTitle?: string
}

export const LiveResumePreview: React.FC<LiveResumePreviewProps> = ({
  resume,
  templateId,
  fontSize,
  spacing,
  isHighDensity,
  targetRoleTitle,
}) => {
  const { personalInfo, summary, skills, workExperience, education, projects, certifications } =
    resume

  // Custom typography style mappings
  const fontSizeClasses = {
    sm: {
      name: 'text-lg sm:text-xl font-bold',
      sectionHeading: 'text-xs font-bold uppercase tracking-wider',
      subheading: 'text-xs font-semibold',
      body: 'text-[11px]',
      meta: 'text-[10px]',
    },
    md: {
      name: 'text-xl sm:text-2xl font-bold',
      sectionHeading: 'text-xs sm:text-sm font-bold uppercase tracking-wider',
      subheading: 'text-xs sm:text-sm font-semibold',
      body: 'text-xs sm:text-[13px]',
      meta: 'text-[11px]',
    },
    lg: {
      name: 'text-2xl sm:text-3xl font-bold',
      sectionHeading: 'text-sm sm:text-base font-bold uppercase tracking-wider',
      subheading: 'text-sm font-semibold',
      body: 'text-xs sm:text-sm',
      meta: 'text-xs',
    },
  }[fontSize]

  const spacingClasses = {
    compact: 'leading-tight space-y-2',
    normal: 'leading-normal space-y-3.5',
    relaxed: 'leading-relaxed space-y-5',
  }[spacing]

  const itemGapClasses = isHighDensity ? 'space-y-1.5' : 'space-y-2.5'
  const sectionMarginClasses = isHighDensity ? 'mb-2.5' : 'mb-4'

  return (
    <div id="printable-resume-container" className="w-full flex justify-center">
      {/* Pristine A4 Document Container */}
      <div
        id="printable-resume"
        className={`w-full max-w-[800px] min-h-[1050px] bg-white text-slate-900 border border-slate-200/90 shadow-lg rounded-2xl sm:rounded-none p-6 sm:p-10 transition-all font-sans relative select-text`}
      >
        {/* =========================================================
            1. TEMPLATE: MODERN ATS
        ========================================================= */}
        {templateId === 'modern' && (
          <div className={spacingClasses}>
            {/* Header: Name & Target Role & Contact Details */}
            <div className="border-b border-slate-200 pb-3.5 mb-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h2 className={`${fontSizeClasses.name} text-slate-950 tracking-tight`}>
                  {personalInfo?.name || 'CANDIDATE NAME'}
                </h2>
                {targetRoleTitle && (
                  <span className={`${fontSizeClasses.meta} font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100`}>
                    {targetRoleTitle}
                  </span>
                )}
              </div>

              {/* Contact Bar with Icons / Links */}
              <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-slate-600 ${fontSizeClasses.meta}`}>
                {personalInfo?.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <a href={`mailto:${personalInfo.email}`} className="hover:text-indigo-600">
                      {personalInfo.email}
                    </a>
                  </span>
                )}
                {personalInfo?.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{personalInfo.phone}</span>
                  </span>
                )}
                {personalInfo?.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{personalInfo.location}</span>
                  </span>
                )}
                {personalInfo?.linkedIn && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <a
                      href={`https://${personalInfo.linkedIn.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-indigo-600 text-indigo-700 font-medium"
                    >
                      {personalInfo.linkedIn.replace(/^https?:\/\//, '')}
                    </a>
                  </span>
                )}
                {personalInfo?.gitHub && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <a
                      href={`https://${personalInfo.gitHub.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-indigo-600 text-slate-700"
                    >
                      {personalInfo.gitHub.replace(/^https?:\/\//, '')}
                    </a>
                  </span>
                )}
                {personalInfo?.portfolioUrl && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <a
                      href={`https://${personalInfo.portfolioUrl.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-indigo-600 text-slate-700"
                    >
                      {personalInfo.portfolioUrl.replace(/^https?:\/\//, '')}
                    </a>
                  </span>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            {summary && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-indigo-900 border-l-2 border-indigo-600 pl-2 mb-1.5`}>
                  Professional Summary
                </h3>
                <p className={`${fontSizeClasses.body} text-slate-700 text-justify`}>
                  {summary}
                </p>
              </div>
            )}

            {/* Technical Skills */}
            {skills && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-indigo-900 border-l-2 border-indigo-600 pl-2 mb-1.5`}>
                  Technical Skills
                </h3>
                <div className={`${fontSizeClasses.body} space-y-1`}>
                  {skills.frontend && skills.frontend.length > 0 && (
                    <p className="text-slate-800">
                      <strong className="font-semibold text-slate-900">Frontend: </strong>
                      <span className="text-slate-700">
                        {skills.frontend.map((s) => s.name).join(', ')}
                      </span>
                    </p>
                  )}
                  {skills.backend && skills.backend.length > 0 && (
                    <p className="text-slate-800">
                      <strong className="font-semibold text-slate-900">Backend & APIs: </strong>
                      <span className="text-slate-700">
                        {skills.backend.map((s) => s.name).join(', ')}
                      </span>
                    </p>
                  )}
                  {skills.database && skills.database.length > 0 && (
                    <p className="text-slate-800">
                      <strong className="font-semibold text-slate-900">Databases: </strong>
                      <span className="text-slate-700">
                        {skills.database.map((s) => s.name).join(', ')}
                      </span>
                    </p>
                  )}
                  {skills.tools && skills.tools.length > 0 && (
                    <p className="text-slate-800">
                      <strong className="font-semibold text-slate-900">Tools & DevOps: </strong>
                      <span className="text-slate-700">
                        {skills.tools.map((s) => s.name).join(', ')}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Work Experience */}
            {workExperience && workExperience.length > 0 && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-indigo-900 border-l-2 border-indigo-600 pl-2 mb-2`}>
                  Work Experience
                </h3>
                <div className={itemGapClasses}>
                  {workExperience.map((exp, idx) => (
                    <div key={exp.id || idx}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                        <span className={`${fontSizeClasses.subheading} text-slate-950`}>
                          {exp.role} <span className="font-normal text-slate-600">at</span>{' '}
                          <span className="font-semibold text-slate-900">{exp.company}</span>
                        </span>
                        <span className={`${fontSizeClasses.meta} text-slate-500 font-medium whitespace-nowrap`}>
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                          {exp.location ? ` | ${exp.location}` : ''}
                        </span>
                      </div>
                      <ul className={`list-disc list-outside ml-4 mt-1 space-y-0.5 ${fontSizeClasses.body} text-slate-700`}>
                        {exp.responsibilities.map((resp, bIdx) => (
                          <li key={bIdx} className="leading-snug">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engineering Projects */}
            {projects && projects.length > 0 && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-indigo-900 border-l-2 border-indigo-600 pl-2 mb-2`}>
                  Engineering Projects
                </h3>
                <div className={itemGapClasses}>
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`${fontSizeClasses.subheading} text-slate-950 font-bold`}>
                            {proj.name}
                          </span>
                          {proj.technologies && proj.technologies.length > 0 && (
                            <span className={`${fontSizeClasses.meta} text-slate-500`}>
                              [{proj.technologies.join(', ')}]
                            </span>
                          )}
                        </div>
                        {(proj.githubLink || proj.link) && (
                          <a
                            href={proj.githubLink || proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`${fontSizeClasses.meta} text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5`}
                          >
                            <span>Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      <p className={`${fontSizeClasses.body} text-slate-700 mt-0.5 leading-snug`}>
                        • {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-indigo-900 border-l-2 border-indigo-600 pl-2 mb-1.5`}>
                  Education
                </h3>
                <div className={itemGapClasses}>
                  {education.map((edu, idx) => (
                    <div key={edu.id || idx} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <span className={`${fontSizeClasses.subheading} text-slate-900 block`}>
                          {edu.degree}
                        </span>
                        <span className={`${fontSizeClasses.body} text-slate-600`}>
                          {edu.institution}
                        </span>
                      </div>
                      <span className={`${fontSizeClasses.meta} text-slate-500 whitespace-nowrap`}>
                        {edu.year} {edu.score ? `• ${edu.score}` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-indigo-900 border-l-2 border-indigo-600 pl-2 mb-1.5`}>
                  Certifications
                </h3>
                <ul className={`list-disc list-outside ml-4 ${fontSizeClasses.body} text-slate-700`}>
                  {certifications.map((c, idx) => (
                    <li key={c.id || idx}>
                      <strong>{c.title}</strong> — {c.issuer} ({c.issueDate})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            2. TEMPLATE: CLASSIC ATS
        ========================================================= */}
        {templateId === 'classic' && (
          <div className={spacingClasses}>
            {/* Header: Centered & Traditional */}
            <div className="text-center border-b border-slate-400 pb-3 mb-3">
              <h2 className={`${fontSizeClasses.name} text-black font-serif tracking-normal uppercase`}>
                {personalInfo?.name || 'CANDIDATE NAME'}
              </h2>
              {targetRoleTitle && (
                <p className={`${fontSizeClasses.meta} font-serif italic text-slate-700 mt-0.5`}>
                  {targetRoleTitle}
                </p>
              )}
              <p className={`mt-1 text-slate-700 ${fontSizeClasses.meta}`}>
                {[
                  personalInfo?.email,
                  personalInfo?.phone,
                  personalInfo?.location,
                  personalInfo?.linkedIn,
                  personalInfo?.gitHub,
                ]
                  .filter(Boolean)
                  .join('  •  ')}
              </p>
            </div>

            {/* Summary */}
            {summary && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-black border-b border-slate-300 pb-0.5 mb-1 font-serif`}>
                  PROFESSIONAL SUMMARY
                </h3>
                <p className={`${fontSizeClasses.body} text-slate-800 text-justify leading-relaxed`}>
                  {summary}
                </p>
              </div>
            )}

            {/* Technical Skills */}
            {skills && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-black border-b border-slate-300 pb-0.5 mb-1 font-serif`}>
                  TECHNICAL SKILLS
                </h3>
                <div className={`${fontSizeClasses.body} text-slate-800 space-y-0.5`}>
                  {skills.frontend?.length > 0 && (
                    <p>
                      <strong>Frontend: </strong>
                      {skills.frontend.map((s) => s.name).join(', ')}
                    </p>
                  )}
                  {skills.backend?.length > 0 && (
                    <p>
                      <strong>Backend: </strong>
                      {skills.backend.map((s) => s.name).join(', ')}
                    </p>
                  )}
                  {skills.database?.length > 0 && (
                    <p>
                      <strong>Databases: </strong>
                      {skills.database.map((s) => s.name).join(', ')}
                    </p>
                  )}
                  {skills.tools?.length > 0 && (
                    <p>
                      <strong>Tools & Platforms: </strong>
                      {skills.tools.map((s) => s.name).join(', ')}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Work Experience */}
            {workExperience && workExperience.length > 0 && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-black border-b border-slate-300 pb-0.5 mb-1 font-serif`}>
                  PROFESSIONAL EXPERIENCE
                </h3>
                <div className={itemGapClasses}>
                  {workExperience.map((exp, idx) => (
                    <div key={exp.id || idx}>
                      <div className="flex justify-between items-baseline">
                        <span className={`${fontSizeClasses.subheading} text-black`}>
                          <strong>{exp.company}</strong>, {exp.role}
                        </span>
                        <span className={`${fontSizeClasses.meta} text-slate-600 font-serif`}>
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <ul className={`list-disc list-outside ml-4 mt-0.5 ${fontSizeClasses.body} text-slate-800`}>
                        {exp.responsibilities.map((resp, bIdx) => (
                          <li key={bIdx}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-black border-b border-slate-300 pb-0.5 mb-1 font-serif`}>
                  SELECTED PROJECTS
                </h3>
                <div className={itemGapClasses}>
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx}>
                      <div className="flex justify-between items-baseline">
                        <span className={`${fontSizeClasses.subheading} text-black`}>
                          <strong>{proj.name}</strong> ({proj.technologies.join(', ')})
                        </span>
                        {proj.githubLink && (
                          <span className={`${fontSizeClasses.meta} text-slate-600`}>
                            {proj.githubLink}
                          </span>
                        )}
                      </div>
                      <p className={`${fontSizeClasses.body} text-slate-800 ml-4`}>
                        • {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-black border-b border-slate-300 pb-0.5 mb-1 font-serif`}>
                  EDUCATION
                </h3>
                <div className={itemGapClasses}>
                  {education.map((edu, idx) => (
                    <div key={edu.id || idx} className="flex justify-between items-baseline">
                      <div>
                        <span className={`${fontSizeClasses.subheading} text-black font-bold`}>
                          {edu.institution}
                        </span>
                        <p className={`${fontSizeClasses.body} text-slate-700`}>{edu.degree}</p>
                      </div>
                      <span className={`${fontSizeClasses.meta} text-slate-600`}>
                        {edu.year} {edu.score ? `| ${edu.score}` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            3. TEMPLATE: MINIMAL ATS
        ========================================================= */}
        {templateId === 'minimal' && (
          <div className={spacingClasses}>
            {/* Header: Clean, single-column & left-aligned */}
            <div className="pb-2 border-b-2 border-slate-900 mb-2">
              <h2 className={`${fontSizeClasses.name} text-slate-900 font-extrabold uppercase`}>
                {personalInfo?.name || 'CANDIDATE NAME'}
              </h2>
              <div className={`mt-1 flex flex-wrap gap-x-2 text-slate-700 font-mono ${fontSizeClasses.meta}`}>
                <span>{personalInfo?.email}</span>
                <span>•</span>
                <span>{personalInfo?.phone}</span>
                <span>•</span>
                <span>{personalInfo?.location}</span>
                {personalInfo?.linkedIn && (
                  <>
                    <span>•</span>
                    <span>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>
                  </>
                )}
              </div>
            </div>

            {/* Summary */}
            {summary && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-slate-900 font-bold mb-1`}>
                  // SUMMARY
                </h3>
                <p className={`${fontSizeClasses.body} text-slate-800 leading-snug`}>
                  {summary}
                </p>
              </div>
            )}

            {/* Skills */}
            {skills && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-slate-900 font-bold mb-1`}>
                  // TECHNICAL SKILLS
                </h3>
                <div className={`${fontSizeClasses.body} space-y-0.5 text-slate-800`}>
                  {skills.frontend?.length > 0 && (
                    <p>Frontend: {skills.frontend.map((s) => s.name).join(' | ')}</p>
                  )}
                  {skills.backend?.length > 0 && (
                    <p>Backend: {skills.backend.map((s) => s.name).join(' | ')}</p>
                  )}
                  {skills.database?.length > 0 && (
                    <p>Databases: {skills.database.map((s) => s.name).join(' | ')}</p>
                  )}
                  {skills.tools?.length > 0 && (
                    <p>DevOps/Tools: {skills.tools.map((s) => s.name).join(' | ')}</p>
                  )}
                </div>
              </div>
            )}

            {/* Experience */}
            {workExperience && workExperience.length > 0 && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-slate-900 font-bold mb-1`}>
                  // EXPERIENCE
                </h3>
                <div className={itemGapClasses}>
                  {workExperience.map((exp, idx) => (
                    <div key={exp.id || idx}>
                      <div className="flex justify-between items-baseline text-slate-900 font-semibold">
                        <span className={fontSizeClasses.subheading}>
                          {exp.role} @ {exp.company}
                        </span>
                        <span className={`${fontSizeClasses.meta} font-mono text-slate-600`}>
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <ul className={`list-disc list-inside mt-0.5 ${fontSizeClasses.body} text-slate-700`}>
                        {exp.responsibilities.map((resp, bIdx) => (
                          <li key={bIdx} className="leading-snug">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-slate-900 font-bold mb-1`}>
                  // PROJECTS
                </h3>
                <div className={itemGapClasses}>
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx}>
                      <div className="flex justify-between items-baseline">
                        <span className={`${fontSizeClasses.subheading} font-semibold text-slate-900`}>
                          {proj.name} — [{proj.technologies.join(', ')}]
                        </span>
                      </div>
                      <p className={`${fontSizeClasses.body} text-slate-700 mt-0.5 leading-snug`}>
                        • {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div className={sectionMarginClasses}>
                <h3 className={`${fontSizeClasses.sectionHeading} text-slate-900 font-bold mb-1`}>
                  // EDUCATION
                </h3>
                <div className={itemGapClasses}>
                  {education.map((edu, idx) => (
                    <div key={edu.id || idx} className="flex justify-between items-baseline">
                      <span className={`${fontSizeClasses.body} text-slate-900`}>
                        {edu.degree}, {edu.institution}
                      </span>
                      <span className={`${fontSizeClasses.meta} font-mono text-slate-600`}>
                        {edu.year} {edu.score ? `[${edu.score}]` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Subtle Watermark on Document Footer */}
        <div className="mt-8 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 no-print">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-indigo-500" />
            <span>ATS-Engine Compliant Format</span>
          </span>
          <span>Powered by JobAI Copilot</span>
        </div>
      </div>
    </div>
  )
}
