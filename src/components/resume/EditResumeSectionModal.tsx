import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type {
  ParsedPersonalInfo,
  ParsedExperience,
  ParsedEducation,
  ParsedProject,
} from '@/data/resumeData'

export type EditSectionType =
  | 'personalInfo'
  | 'summary'
  | 'addSkill'
  | 'experience'
  | 'education'
  | 'project'
  | 'certification'

export interface EditResumeSectionModalProps {
  isOpen: boolean
  sectionType: EditSectionType
  onClose: () => void
  onSavePersonalInfo?: (data: ParsedPersonalInfo) => void
  onSaveSummary?: (summary: string) => void
  onAddSkill?: (category: 'frontend' | 'backend' | 'database' | 'tools', skillName: string) => void
  onSaveExperience?: (exp: ParsedExperience) => void
  onSaveEducation?: (edu: ParsedEducation) => void
  onSaveProject?: (proj: ParsedProject) => void
  onAddCertification?: (cert: { title: string; issuer: string; issueDate: string }) => void
  initialPersonalInfo?: ParsedPersonalInfo
  initialSummary?: string
  initialExperience?: ParsedExperience
  initialEducation?: ParsedEducation
  initialProject?: ParsedProject
}

export const EditResumeSectionModal: React.FC<EditResumeSectionModalProps> = ({
  isOpen,
  sectionType,
  onClose,
  onSavePersonalInfo,
  onSaveSummary,
  onAddSkill,
  onSaveExperience,
  onSaveEducation,
  onSaveProject,
  onAddCertification,
  initialPersonalInfo,
  initialSummary = '',
  initialExperience,
  initialEducation,
  initialProject,
}) => {
  // Local state for personal info
  const [personalInfo, setPersonalInfo] = useState<ParsedPersonalInfo>(
    initialPersonalInfo || {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      gitHub: '',
      portfolioUrl: '',
    }
  )

  // Local state for summary
  const [summaryText, setSummaryText] = useState(initialSummary)

  // Local state for new skill
  const [newSkillCategory, setNewSkillCategory] = useState<
    'frontend' | 'backend' | 'database' | 'tools'
  >('frontend')
  const [newSkillName, setNewSkillName] = useState('')

  // Local state for experience
  const [experience, setExperience] = useState<ParsedExperience>(
    initialExperience || {
      id: 'exp-new',
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      responsibilities: [''],
    }
  )

  // Local state for education
  const [education, setEducation] = useState<ParsedEducation>(
    initialEducation || {
      id: 'edu-new',
      degree: '',
      institution: '',
      year: '',
      score: '',
    }
  )

  // Local state for project
  const [project, setProject] = useState<ParsedProject>(
    initialProject || {
      id: 'proj-new',
      name: '',
      technologies: [],
      description: '',
      githubLink: '',
    }
  )
  const [projectTechInput, setProjectTechInput] = useState(
    initialProject?.technologies.join(', ') || ''
  )

  // Local state for certification
  const [certTitle, setCertTitle] = useState('')
  const [certIssuer, setCertIssuer] = useState('')
  const [certDate, setCertDate] = useState('')

  const getTitle = () => {
    switch (sectionType) {
      case 'personalInfo':
        return 'Edit Personal Information'
      case 'summary':
        return 'Edit Professional Summary'
      case 'addSkill':
        return 'Add Technical Skill'
      case 'experience':
        return initialExperience ? 'Edit Work Experience' : 'Add Work Experience'
      case 'education':
        return initialEducation ? 'Edit Education' : 'Add Education'
      case 'project':
        return initialProject ? 'Edit Project' : 'Add Project'
      case 'certification':
        return 'Add Certification'
      default:
        return 'Edit Section'
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (sectionType === 'personalInfo' && onSavePersonalInfo) {
      onSavePersonalInfo(personalInfo)
    } else if (sectionType === 'summary' && onSaveSummary) {
      onSaveSummary(summaryText)
    } else if (sectionType === 'addSkill' && onAddSkill && newSkillName.trim()) {
      onAddSkill(newSkillCategory, newSkillName.trim())
    } else if (sectionType === 'experience' && onSaveExperience) {
      onSaveExperience(experience)
    } else if (sectionType === 'education' && onSaveEducation) {
      onSaveEducation(education)
    } else if (sectionType === 'project' && onSaveProject) {
      const techList = projectTechInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
      onSaveProject({ ...project, technologies: techList })
    } else if (sectionType === 'certification' && onAddCertification && certTitle.trim()) {
      onAddCertification({
        title: certTitle.trim(),
        issuer: certIssuer.trim() || 'Verified Issuer',
        issueDate: certDate.trim() || '2025',
      })
    }

    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      description="Update your parsed career information. Changes will update your AI Job Matching recommendations."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Personal Info Form */}
        {sectionType === 'personalInfo' && (
          <div className="space-y-3">
            <Input
              label="Full Name"
              value={personalInfo.name}
              onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                required
              />
              <Input
                label="Phone"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              />
            </div>
            <Input
              label="Location"
              value={personalInfo.location}
              onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="LinkedIn Profile"
                value={personalInfo.linkedIn}
                onChange={(e) => setPersonalInfo({ ...personalInfo, linkedIn: e.target.value })}
              />
              <Input
                label="GitHub Profile"
                value={personalInfo.gitHub}
                onChange={(e) => setPersonalInfo({ ...personalInfo, gitHub: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Summary Form */}
        {sectionType === 'summary' && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Professional Summary
            </label>
            <textarea
              rows={4}
              value={summaryText}
              onChange={(e) => setSummaryText(e.target.value)}
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 leading-relaxed"
              required
            />
          </div>
        )}

        {/* Add Skill Form */}
        {sectionType === 'addSkill' && (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={newSkillCategory}
                onChange={(e) =>
                  setNewSkillCategory(
                    e.target.value as 'frontend' | 'backend' | 'database' | 'tools'
                  )
                }
                className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                <option value="frontend">Frontend Development</option>
                <option value="backend">Backend & APIs</option>
                <option value="database">Databases & Storage</option>
                <option value="tools">Developer Tools & DevOps</option>
              </select>
            </div>
            <Input
              label="Skill Name"
              placeholder="e.g. Next.js, Docker, GraphQL"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              required
            />
          </div>
        )}

        {/* Experience Form */}
        {sectionType === 'experience' && (
          <div className="space-y-3">
            <Input
              label="Role / Title"
              value={experience.role}
              onChange={(e) => setExperience({ ...experience, role: e.target.value })}
              required
            />
            <Input
              label="Company Name"
              value={experience.company}
              onChange={(e) => setExperience({ ...experience, company: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Start Date"
                placeholder="e.g. Aug 2025"
                value={experience.startDate}
                onChange={(e) => setExperience({ ...experience, startDate: e.target.value })}
                required
              />
              <Input
                label="End Date"
                placeholder="e.g. Jan 2026 or Present"
                value={experience.endDate}
                onChange={(e) => setExperience({ ...experience, endDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Responsibilities (One per line)
              </label>
              <textarea
                rows={3}
                value={experience.responsibilities.join('\n')}
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    responsibilities: e.target.value.split('\n').filter(Boolean),
                  })
                }
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
              />
            </div>
          </div>
        )}

        {/* Education Form */}
        {sectionType === 'education' && (
          <div className="space-y-3">
            <Input
              label="Degree / Program"
              value={education.degree}
              onChange={(e) => setEducation({ ...education, degree: e.target.value })}
              required
            />
            <Input
              label="Institution / University"
              value={education.institution}
              onChange={(e) => setEducation({ ...education, institution: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Year Duration"
                placeholder="e.g. 2021 – 2025"
                value={education.year}
                onChange={(e) => setEducation({ ...education, year: e.target.value })}
                required
              />
              <Input
                label="Score / CGPA"
                placeholder="e.g. 8.4 CGPA"
                value={education.score || ''}
                onChange={(e) => setEducation({ ...education, score: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Project Form */}
        {sectionType === 'project' && (
          <div className="space-y-3">
            <Input
              label="Project Name"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              required
            />
            <Input
              label="Technology Stack (comma separated)"
              placeholder="e.g. React.js, TypeScript, Tailwind CSS"
              value={projectTechInput}
              onChange={(e) => setProjectTechInput(e.target.value)}
              required
            />
            <Input
              label="GitHub / Demo URL"
              placeholder="https://github.com/..."
              value={project.githubLink || ''}
              onChange={(e) => setProject({ ...project, githubLink: e.target.value })}
            />
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Project Description
              </label>
              <textarea
                rows={3}
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
                required
              />
            </div>
          </div>
        )}

        {/* Add Certification Form */}
        {sectionType === 'certification' && (
          <div className="space-y-3">
            <Input
              label="Certification Title"
              placeholder="e.g. AWS Certified Cloud Practitioner"
              value={certTitle}
              onChange={(e) => setCertTitle(e.target.value)}
              required
            />
            <Input
              label="Issuing Organization"
              placeholder="e.g. Amazon Web Services, Linux Foundation"
              value={certIssuer}
              onChange={(e) => setCertIssuer(e.target.value)}
              required
            />
            <Input
              label="Issue Year / Date"
              placeholder="e.g. 2025"
              value={certDate}
              onChange={(e) => setCertDate(e.target.value)}
              required
            />
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 font-bold text-xs"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}
