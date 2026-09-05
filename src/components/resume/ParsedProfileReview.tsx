import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Trash2,
  Plus,
  Award,
  Briefcase,
  GraduationCap,
  FolderGit2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  FileCheck,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { ParsedResume } from '@/data/resumeData'
import type { EditSectionType } from './EditResumeSectionModal'

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.78c-.96 0-1.74.78-1.74 1.74s.78 1.74 1.74 1.74 1.74-.78 1.74-1.74-.78-1.74-1.74-1.74Z" />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export interface ParsedProfileReviewProps {
  parsedResume: ParsedResume
  onOpenEditModal: (
    sectionType: EditSectionType,
    extraData?: { itemIndex?: number; initialData?: unknown }
  ) => void
  onRemoveExperience: (expId: string) => void
  onRemoveSkill: (category: 'frontend' | 'backend' | 'database' | 'tools', skillName: string) => void
  onConfirmProfile: () => void
  onReviewAgain: () => void
  onNavigateToAnalysis?: () => void
  isSubmitting?: boolean
}

export const ParsedProfileReview: React.FC<ParsedProfileReviewProps> = ({
  parsedResume,
  onOpenEditModal,
  onRemoveExperience,
  onRemoveSkill,
  onConfirmProfile,
  onReviewAgain,
  onNavigateToAnalysis,
  isSubmitting = false,
}) => {
  const { personalInfo, summary, skills, workExperience, education, projects, certifications, confidenceScores, profileCompleteness, missingItems } =
    parsedResume

  const confidenceItems = [
    { label: 'Personal Information', score: confidenceScores.personalInfo, color: 'bg-emerald-600' },
    { label: 'Skills', score: confidenceScores.skills, color: 'bg-indigo-600' },
    { label: 'Experience', score: confidenceScores.experience, color: 'bg-blue-600' },
    { label: 'Education', score: confidenceScores.education, color: 'bg-teal-600' },
    { label: 'Projects', score: confidenceScores.projects, color: 'bg-violet-600' },
  ]

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto">
      {/* 1. Review Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white shadow-xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-bold text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Extraction Complete</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Your Resume Has Been Parsed
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
              Review the information extracted by JobAI before using it for recommendations.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-2xl sm:text-3xl font-black text-white block leading-none">
              {confidenceScores.overall}%
            </span>
            <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider mt-1 block">
              Confidence Index
            </span>
          </div>
        </div>
      </div>

      {/* 2. Two-Column Layout: Main Parsed Content + Intelligence Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Core Parsed Sections (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card A: Personal Information */}
          <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Personal Information
                </h3>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onOpenEditModal('personalInfo')}
                leftIcon={<Edit2 className="w-3.5 h-3.5 text-indigo-600" />}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Full Name
                </span>
                <p className="font-bold text-slate-900 text-sm">
                  {personalInfo.name}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Email Address
                </span>
                <p className="font-medium text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {personalInfo.email}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Phone Number
                </span>
                <p className="font-medium text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {personalInfo.phone}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Location
                </span>
                <p className="font-medium text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {personalInfo.location}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  LinkedIn
                </span>
                <p className="font-medium text-indigo-600 hover:underline flex items-center gap-1.5 truncate">
                  <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{personalInfo.linkedIn}</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  GitHub
                </span>
                <p className="font-medium text-slate-800 hover:underline flex items-center gap-1.5 truncate">
                  <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{personalInfo.gitHub}</span>
                </p>
              </div>
            </div>
          </Card>

          {/* Card B: Professional Summary */}
          <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Professional Summary
                </h3>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onOpenEditModal('summary')}
                leftIcon={<Edit2 className="w-3.5 h-3.5 text-indigo-600" />}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                Edit
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60">
              “{summary}”
            </p>
          </Card>

          {/* Card C: Skills Detected */}
          <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Skills Detected
                </h3>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onOpenEditModal('addSkill')}
                leftIcon={<Plus className="w-3.5 h-3.5 text-indigo-600" />}
                className="text-xs font-semibold"
              >
                Add Skill
              </Button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Frontend */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Frontend Development
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.frontend.map((sk) => (
                    <span
                      key={sk.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/70 font-semibold text-xs group"
                    >
                      <span>{sk.name}</span>
                      <span className="text-[10px] font-normal opacity-75">
                        • {sk.confidence.split(' ')[0]}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveSkill('frontend', sk.name)}
                        className="hover:text-rose-600 ml-0.5 text-slate-400 hover:bg-rose-50 rounded-xs p-0.5"
                        aria-label={`Remove ${sk.name}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Backend & APIs
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.backend.map((sk) => (
                    <span
                      key={sk.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/70 font-semibold text-xs group"
                    >
                      <span>{sk.name}</span>
                      <span className="text-[10px] font-normal opacity-75">
                        • {sk.confidence.split(' ')[0]}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveSkill('backend', sk.name)}
                        className="hover:text-rose-600 ml-0.5 text-slate-400 hover:bg-rose-50 rounded-xs p-0.5"
                        aria-label={`Remove ${sk.name}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Databases
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.database.map((sk) => (
                    <span
                      key={sk.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-200/70 font-semibold text-xs group"
                    >
                      <span>{sk.name}</span>
                      <span className="text-[10px] font-normal opacity-75">
                        • {sk.confidence.split(' ')[0]}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveSkill('database', sk.name)}
                        className="hover:text-rose-600 ml-0.5 text-slate-400 hover:bg-rose-50 rounded-xs p-0.5"
                        aria-label={`Remove ${sk.name}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Tools & DevOps
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.tools.map((sk) => (
                    <span
                      key={sk.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs group"
                    >
                      <span>{sk.name}</span>
                      <span className="text-[10px] font-normal opacity-75">
                        • {sk.confidence.split(' ')[0]}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveSkill('tools', sk.name)}
                        className="hover:text-rose-600 ml-0.5 text-slate-400 hover:bg-rose-50 rounded-xs p-0.5"
                        aria-label={`Remove ${sk.name}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Card D: Work Experience */}
          <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Work Experience
                </h3>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onOpenEditModal('experience')}
                leftIcon={<Plus className="w-3.5 h-3.5 text-indigo-600" />}
                className="text-xs font-semibold"
              >
                Add Experience
              </Button>
            </div>

            {workExperience.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500">
                No work experience detected in uploaded resume.
              </div>
            ) : (
              <div className="space-y-4">
                {workExperience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-2.5 relative group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {exp.role}
                        </h4>
                        <p className="text-xs text-indigo-700 font-semibold">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          {exp.startDate} – {exp.endDate}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              onOpenEditModal('experience', { initialData: exp })
                            }
                            className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-white"
                            aria-label="Edit experience"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemoveExperience(exp.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-white"
                            aria-label="Remove experience"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-600 leading-relaxed">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Card E: Education */}
          <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Education
                </h3>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  onOpenEditModal('education', { initialData: education[0] })
                }
                leftIcon={<Edit2 className="w-3.5 h-3.5 text-indigo-600" />}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                Edit
              </Button>
            </div>

            <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {edu.score && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                        {edu.score}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-500">
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Card F: Projects Detected */}
          <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Projects Detected
                </h3>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onOpenEditModal('project')}
                leftIcon={<Plus className="w-3.5 h-3.5 text-indigo-600" />}
                className="text-xs font-semibold"
              >
                Add Project
              </Button>
            </div>

            <div className="space-y-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {proj.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {proj.description}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        onOpenEditModal('project', { initialData: proj })
                      }
                      className="text-slate-400 hover:text-indigo-600 p-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 text-[10px] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {proj.githubLink && (
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1 shrink-0"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Card G: Certifications */}
          <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Certifications
                </h3>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onOpenEditModal('certification')}
                leftIcon={<Plus className="w-3.5 h-3.5 text-indigo-600" />}
                className="text-xs font-semibold"
              >
                Add Certification
              </Button>
            </div>

            {certifications.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-center space-y-2">
                <p className="text-xs font-semibold text-slate-500">
                  No certifications detected
                </p>
                <p className="text-[11px] text-slate-400">
                  Adding verified certifications (e.g. AWS, Linux, CKAD) provides a +5% match boost for relevant roles.
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenEditModal('certification')}
                  className="text-xs font-bold text-indigo-600"
                >
                  Add Certification
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {certifications.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {c.title}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {c.issuer} • {c.issueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Parsing Confidence & Completeness (col-span-4) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          {/* Parsing Confidence Card */}
          <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left space-y-4">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                  AI Optical Extraction
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Parsing Confidence
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-indigo-600 leading-none block">
                  {confidenceScores.overall}%
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Overall
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              {confidenceItems.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-bold text-slate-900">{item.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-700`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 leading-tight">
              Confidence rates reflect token alignment and section identification clarity.
            </p>
          </Card>

          {/* Profile Completeness Card */}
          <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left space-y-4">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                  Profile Maturity
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Profile Completeness
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-emerald-600 leading-none block">
                  {profileCompleteness}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-emerald-500"
                  style={{ width: `${profileCompleteness}%` }}
                />
              </div>

              <div className="pt-2 space-y-1.5">
                <span className="text-xs font-bold text-slate-700 block">
                  Potential Missing Info:
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {missingItems.map((m) => (
                    <li key={m} className="flex items-start gap-1.5 text-[11px]">
                      <span className="text-amber-500 font-bold shrink-0">△</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                Adding this information can improve your AI job recommendations.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* 3. Bottom Confirmation Action Card */}
      <Card className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Confirm & Build My Profile
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Use this information to personalize your AI job recommendations and career match scoring.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onReviewAgain}
            className="w-full sm:w-auto text-xs font-semibold"
          >
            Review Again
          </Button>

          {onNavigateToAnalysis && (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onNavigateToAnalysis}
              leftIcon={<Sparkles className="w-4 h-4 text-indigo-600" />}
              className="w-full sm:w-auto text-xs font-semibold border-indigo-200 text-indigo-700 hover:bg-indigo-50"
            >
              Analyze Resume
            </Button>
          )}

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onConfirmProfile}
            disabled={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 px-6"
          >
            {isSubmitting ? 'Building Profile...' : 'Confirm Profile'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
