import React, { useState } from 'react'
import {
  User,
  FileText,
  Briefcase,
  Code2,
  FolderGit2,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type {
  ParsedResume,
  ParsedExperience,
  ParsedProject,
  ParsedEducation,
  ParsedCertification,
  ParsedSkillItem,
} from '@/data/resumeData'
import type { KeywordSuggestion } from '@/services/resumeBuilderAIService'

interface ResumeEditorAccordionProps {
  resume: ParsedResume
  onChangeResume: (updated: ParsedResume) => void
  onImproveSummary: () => void
  onImproveBullet: (bullet: string, role: string, company: string, expIndex: number, bulletIndex: number) => void
  onImproveProject: (desc: string, name: string, techs: string[], projIndex: number) => void
  keywordSuggestions: KeywordSuggestion[]
  onAddSuggestedSkill: (keyword: string, category: 'frontend' | 'backend' | 'database' | 'tools') => void
}

type AccordionSection = 'personal' | 'summary' | 'experience' | 'skills' | 'projects' | 'education' | 'certifications'

export const ResumeEditorAccordion: React.FC<ResumeEditorAccordionProps> = ({
  resume,
  onChangeResume,
  onImproveSummary,
  onImproveBullet,
  onImproveProject,
  keywordSuggestions,
  onAddSuggestedSkill,
}) => {
  const [openSections, setOpenSections] = useState<Record<AccordionSection, boolean>>({
    personal: true,
    summary: true,
    experience: true,
    skills: true,
    projects: false,
    education: false,
    certifications: false,
  })

  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({
    frontend: '',
    backend: '',
    database: '',
    tools: '',
  })

  const toggleSection = (section: AccordionSection) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  // --- Handlers for Personal Info ---
  const handlePersonalInfoChange = (field: keyof ParsedResume['personalInfo'], value: string) => {
    onChangeResume({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value,
      },
    })
  }

  // --- Handlers for Work Experience ---
  const handleExpChange = (index: number, field: keyof ParsedExperience, value: unknown) => {
    const updated = [...resume.workExperience]
    updated[index] = { ...updated[index], [field]: value }
    onChangeResume({ ...resume, workExperience: updated })
  }

  const handleAddExperience = () => {
    const newExp: ParsedExperience = {
      id: `exp-${Date.now()}`,
      role: 'Software Engineer',
      company: 'Company Name',
      location: 'City, Country',
      startDate: '2024',
      endDate: 'Present',
      current: true,
      responsibilities: [
        'Spearheaded development of responsive web applications using React and Node.js.',
      ],
    }
    onChangeResume({
      ...resume,
      workExperience: [newExp, ...resume.workExperience],
    })
  }

  const handleDeleteExperience = (index: number) => {
    const updated = resume.workExperience.filter((_, i) => i !== index)
    onChangeResume({ ...resume, workExperience: updated })
  }

  const handleBulletChange = (expIndex: number, bulletIndex: number, text: string) => {
    const updated = [...resume.workExperience]
    const updatedBullets = [...updated[expIndex].responsibilities]
    updatedBullets[bulletIndex] = text
    updated[expIndex] = { ...updated[expIndex], responsibilities: updatedBullets }
    onChangeResume({ ...resume, workExperience: updated })
  }

  const handleAddBullet = (expIndex: number) => {
    const updated = [...resume.workExperience]
    const updatedBullets = [...updated[expIndex].responsibilities, 'Contributed to technical documentation and automated test suites.']
    updated[expIndex] = { ...updated[expIndex], responsibilities: updatedBullets }
    onChangeResume({ ...resume, workExperience: updated })
  }

  const handleDeleteBullet = (expIndex: number, bulletIndex: number) => {
    const updated = [...resume.workExperience]
    const updatedBullets = updated[expIndex].responsibilities.filter((_, i) => i !== bulletIndex)
    updated[expIndex] = { ...updated[expIndex], responsibilities: updatedBullets }
    onChangeResume({ ...resume, workExperience: updated })
  }

  // --- Handlers for Skills ---
  const handleRemoveSkill = (category: 'frontend' | 'backend' | 'database' | 'tools', skillIndex: number) => {
    const updatedCat = resume.skills[category].filter((_, i) => i !== skillIndex)
    onChangeResume({
      ...resume,
      skills: {
        ...resume.skills,
        [category]: updatedCat,
      },
    })
  }

  const handleAddManualSkill = (category: 'frontend' | 'backend' | 'database' | 'tools') => {
    const val = newSkillInputs[category]?.trim()
    if (!val) return
    const newItem: ParsedSkillItem = { name: val, confidence: 'High confidence' }
    onChangeResume({
      ...resume,
      skills: {
        ...resume.skills,
        [category]: [...(resume.skills[category] || []), newItem],
      },
    })
    setNewSkillInputs((prev) => ({ ...prev, [category]: '' }))
  }

  // --- Handlers for Projects ---
  const handleProjectChange = (index: number, field: keyof ParsedProject, value: unknown) => {
    const updated = [...resume.projects]
    updated[index] = { ...updated[index], [field]: value }
    onChangeResume({ ...resume, projects: updated })
  }

  const handleAddProject = () => {
    const newProj: ParsedProject = {
      id: `proj-${Date.now()}`,
      name: 'New Project Title',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      description: 'Architected and launched full-stack web application featuring real-time state management.',
      githubLink: 'https://github.com/codebytushu/new-project',
    }
    onChangeResume({ ...resume, projects: [...resume.projects, newProj] })
  }

  const handleDeleteProject = (index: number) => {
    const updated = resume.projects.filter((_, i) => i !== index)
    onChangeResume({ ...resume, projects: updated })
  }

  // --- Handlers for Education ---
  const handleEduChange = (index: number, field: keyof ParsedEducation, value: string) => {
    const updated = [...resume.education]
    updated[index] = { ...updated[index], [field]: value }
    onChangeResume({ ...resume, education: updated })
  }

  const handleAddEducation = () => {
    const newEdu: ParsedEducation = {
      id: `edu-${Date.now()}`,
      degree: 'B.S. in Computer Science',
      institution: 'University Name',
      year: '2021 – 2025',
      score: '8.0 CGPA',
    }
    onChangeResume({ ...resume, education: [...resume.education, newEdu] })
  }

  const handleDeleteEducation = (index: number) => {
    const updated = resume.education.filter((_, i) => i !== index)
    onChangeResume({ ...resume, education: updated })
  }

  // --- Handlers for Certifications ---
  const handleAddCert = () => {
    const newCert: ParsedCertification = {
      id: `cert-${Date.now()}`,
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: '2025',
    }
    onChangeResume({
      ...resume,
      certifications: [...(resume.certifications || []), newCert],
    })
  }

  const handleDeleteCert = (index: number) => {
    const updated = resume.certifications.filter((_, i) => i !== index)
    onChangeResume({ ...resume, certifications: updated })
  }

  return (
    <div className="space-y-3">
      {/* 1. PERSONAL INFORMATION */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('personal')}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <User className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                1. Personal & Contact Details
              </span>
              <span className="text-[10px] text-slate-500">
                {resume.personalInfo?.name || 'Empty'} • {resume.personalInfo?.email || 'No email'}
              </span>
            </div>
          </div>
          {openSections.personal ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.personal && (
          <div className="p-4 space-y-3 border-t border-slate-100 animate-in fade-in-50 duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={resume.personalInfo?.name || ''}
                  onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={resume.personalInfo?.email || ''}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={resume.personalInfo?.phone || ''}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={resume.personalInfo?.location || ''}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={resume.personalInfo?.linkedIn || ''}
                  onChange={(e) => handlePersonalInfoChange('linkedIn', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  GitHub Profile
                </label>
                <input
                  type="text"
                  value={resume.personalInfo?.gitHub || ''}
                  onChange={(e) => handlePersonalInfoChange('gitHub', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Portfolio / Website
                </label>
                <input
                  type="text"
                  value={resume.personalInfo?.portfolioUrl || ''}
                  onChange={(e) => handlePersonalInfoChange('portfolioUrl', e.target.value)}
                  placeholder="codebytushu.dev"
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. PROFESSIONAL SUMMARY */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('summary')}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                2. Professional Summary
              </span>
              <span className="text-[10px] text-slate-500">
                Opening elevator pitch for recruiters and automated parsers
              </span>
            </div>
          </div>
          {openSections.summary ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.summary && (
          <div className="p-4 space-y-3 border-t border-slate-100 animate-in fade-in-50 duration-150">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-700">
                Summary Phrasing ({resume.summary?.length || 0} characters)
              </span>
              <Button
                variant="subtle"
                size="sm"
                onClick={onImproveSummary}
                leftIcon={<Sparkles className="w-3 h-3 text-indigo-600" />}
                className="text-xs py-1 h-7"
              >
                Improve with AI
              </Button>
            </div>
            <textarea
              rows={4}
              value={resume.summary || ''}
              onChange={(e) => onChangeResume({ ...resume, summary: e.target.value })}
              className="w-full p-3 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed font-sans"
              placeholder="Write a concise 3-4 sentence professional summary highlighting your core skills, experience, and target value..."
            />
          </div>
        )}
      </div>

      {/* 3. WORK EXPERIENCE */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('experience')}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                3. Work Experience ({resume.workExperience?.length || 0})
              </span>
              <span className="text-[10px] text-slate-500">
                Career history, achievements, and impact bullets
              </span>
            </div>
          </div>
          {openSections.experience ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.experience && (
          <div className="p-4 space-y-4 border-t border-slate-100 animate-in fade-in-50 duration-150">
            {resume.workExperience.map((exp, expIdx) => (
              <div
                key={exp.id || expIdx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Role #{expIdx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteExperience(expIdx)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                    title="Delete experience entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleExpChange(expIdx, 'role', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExpChange(expIdx, 'company', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleExpChange(expIdx, 'startDate', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => handleExpChange(expIdx, 'endDate', e.target.value)}
                      disabled={exp.current}
                      className="w-full px-2.5 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-end pb-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(exp.current)}
                        onChange={(e) => handleExpChange(expIdx, 'current', e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Currently Working</span>
                    </label>
                  </div>
                </div>

                {/* Bullets List with Individual "Improve with AI" */}
                <div className="space-y-2 pt-2 border-t border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-700">
                      Responsibilities & Impact Bullets
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddBullet(expIdx)}
                      className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Add Bullet
                    </button>
                  </div>

                  {exp.responsibilities.map((bullet, bulletIdx) => (
                    <div key={bulletIdx} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-slate-400 text-xs mt-1.5">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => handleBulletChange(expIdx, bulletIdx, e.target.value)}
                        className="flex-1 text-xs text-slate-900 border-0 focus:ring-0 p-0 resize-none font-sans"
                      />
                      <div className="flex items-center gap-1 shrink-0 mt-0.5">
                        <button
                          type="button"
                          onClick={() =>
                            onImproveBullet(bullet, exp.role, exp.company, expIdx, bulletIdx)
                          }
                          className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors cursor-pointer"
                          title="Improve this bullet with AI"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBullet(expIdx, bulletIdx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                          title="Remove bullet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={handleAddExperience}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              className="w-full text-xs font-semibold"
            >
              Add Work Experience Entry
            </Button>
          </div>
        )}
      </div>

      {/* 4. TECHNICAL SKILLS */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('skills')}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                4. Categorized Technical Skills
              </span>
              <span className="text-[10px] text-slate-500">
                Frontend, Backend, Databases, and DevOps tooling
              </span>
            </div>
          </div>
          {openSections.skills ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.skills && (
          <div className="p-4 space-y-4 border-t border-slate-100 animate-in fade-in-50 duration-150">
            {(['frontend', 'backend', 'database', 'tools'] as const).map((cat) => {
              const catLabels: Record<string, string> = {
                frontend: 'Frontend Technologies',
                backend: 'Backend & APIs',
                database: 'Databases & Storage',
                tools: 'DevOps, Cloud & Tools',
              }

              const list = resume.skills[cat] || []

              return (
                <div key={cat} className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    {catLabels[cat]} ({list.length})
                  </span>

                  {/* Skills tags list */}
                  <div className="flex flex-wrap gap-1.5">
                    {list.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200/80 group"
                      >
                        <span>{item.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(cat, itemIdx)}
                          className="text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add skill input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={newSkillInputs[cat]}
                      onChange={(e) =>
                        setNewSkillInputs((prev) => ({ ...prev, [cat]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddManualSkill(cat)
                        }
                      }}
                      placeholder={`Add new ${cat} skill... (Press Enter)`}
                      className="flex-1 px-2.5 py-1.5 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddManualSkill(cat)}
                      className="px-2.5 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )
            })}

            {/* Quick Add from Role Suggestions */}
            {keywordSuggestions.filter((k) => !k.matchedInResume).length > 0 && (
              <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/80 space-y-1.5">
                <span className="text-[11px] font-bold text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Recommended benchmark skills to add:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {keywordSuggestions
                    .filter((k) => !k.matchedInResume)
                    .slice(0, 6)
                    .map((k) => (
                      <button
                        key={k.keyword}
                        type="button"
                        onClick={() => onAddSuggestedSkill(k.keyword, k.category)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium bg-white text-indigo-800 border border-indigo-200 hover:bg-indigo-50 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3 text-indigo-600" />
                        <span>{k.keyword}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. PROJECTS */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('projects')}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <FolderGit2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                5. Key Engineering Projects ({resume.projects?.length || 0})
              </span>
              <span className="text-[10px] text-slate-500">
                Showcase technical architecture, libraries, and live repositories
              </span>
            </div>
          </div>
          {openSections.projects ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.projects && (
          <div className="p-4 space-y-4 border-t border-slate-100 animate-in fade-in-50 duration-150">
            {resume.projects.map((proj, projIdx) => (
              <div
                key={proj.id || projIdx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Project #{projIdx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(projIdx)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => handleProjectChange(projIdx, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Technologies (comma separated)
                    </label>
                    <input
                      type="text"
                      value={proj.technologies.join(', ')}
                      onChange={(e) =>
                        handleProjectChange(
                          projIdx,
                          'technologies',
                          e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                        )
                      }
                      className="w-full px-2.5 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                    Repository Link / Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={proj.githubLink || proj.link || ''}
                    onChange={(e) => handleProjectChange(projIdx, 'githubLink', e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-2.5 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-semibold text-slate-600">
                      Technical Description
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        onImproveProject(proj.description, proj.name, proj.technologies, projIdx)
                      }
                      className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      Improve Description with AI
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={proj.description}
                    onChange={(e) => handleProjectChange(projIdx, 'description', e.target.value)}
                    className="w-full p-2.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={handleAddProject}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              className="w-full text-xs font-semibold"
            >
              Add Project Entry
            </Button>
          </div>
        )}
      </div>

      {/* 6. EDUCATION */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('education')}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                6. Education ({resume.education?.length || 0})
              </span>
              <span className="text-[10px] text-slate-500">
                Degrees, universities, graduation years, and scores
              </span>
            </div>
          </div>
          {openSections.education ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.education && (
          <div className="p-4 space-y-4 border-t border-slate-100 animate-in fade-in-50 duration-150">
            {resume.education.map((edu, eduIdx) => (
              <div
                key={edu.id || eduIdx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Education #{eduIdx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteEducation(eduIdx)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                    title="Delete education"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Degree / Qualification
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEduChange(eduIdx, 'degree', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Institution / College
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleEduChange(eduIdx, 'institution', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Graduation Year
                    </label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => handleEduChange(eduIdx, 'year', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Score / CGPA
                    </label>
                    <input
                      type="text"
                      value={edu.score || ''}
                      onChange={(e) => handleEduChange(eduIdx, 'score', e.target.value)}
                      placeholder="e.g. 8.4 CGPA"
                      className="w-full px-2.5 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={handleAddEducation}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              className="w-full text-xs font-semibold"
            >
              Add Education Entry
            </Button>
          </div>
        )}
      </div>

      {/* 7. CERTIFICATIONS */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('certifications')}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                7. Certifications ({resume.certifications?.length || 0})
              </span>
              <span className="text-[10px] text-slate-500">
                Industry accreditations and verifiable badges
              </span>
            </div>
          </div>
          {openSections.certifications ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.certifications && (
          <div className="p-4 space-y-3 border-t border-slate-100 animate-in fade-in-50 duration-150">
            {resume.certifications && resume.certifications.length > 0 ? (
              resume.certifications.map((cert, certIdx) => (
                <div
                  key={cert.id || certIdx}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 flex items-center justify-between gap-2"
                >
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">{cert.title}</p>
                    <p className="text-slate-500 text-[11px]">
                      {cert.issuer} • {cert.issueDate}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteCert(certIdx)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No certifications added yet.</p>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleAddCert}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              className="w-full text-xs font-semibold"
            >
              Add Certification
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
