import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Briefcase, X, Plus } from 'lucide-react'
import type { ProfessionalProfileData } from '@/services/profileSettingsService'

interface ProfessionalProfileSectionProps {
  data: ProfessionalProfileData
  onChange: (updated: Partial<ProfessionalProfileData>) => void
}

const CAREER_LEVELS: ProfessionalProfileData['careerLevel'][] = [
  'Student',
  'Fresher',
  'Entry Level',
  'Junior',
  'Mid Level',
  'Senior',
  'Lead',
]

const POPULAR_ROLES = [
  'Software Developer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Mobile Developer',
  'Data Analyst',
  'UI/UX Engineer',
  'Product Manager',
  'AI / ML Engineer',
]

export const ProfessionalProfileSection: React.FC<ProfessionalProfileSectionProps> = ({
  data,
  onChange,
}) => {
  const [newRoleInput, setNewRoleInput] = useState('')

  const handleAddSecondaryRole = (role: string) => {
    const trimmed = role.trim()
    if (!trimmed || data.secondaryRoles.includes(trimmed) || trimmed === data.primaryRole) return
    onChange({ secondaryRoles: [...data.secondaryRoles, trimmed] })
    setNewRoleInput('')
  }

  const handleRemoveSecondaryRole = (role: string) => {
    onChange({ secondaryRoles: data.secondaryRoles.filter((r) => r !== role) })
  }

  return (
    <Card className="p-6 border-slate-200/90 shadow-sm space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">Professional Identity</h3>
          <Badge variant="indigo" size="sm">
            AI Matching Core
          </Badge>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Your professional profile is used by JobAI to calibrate role fit scoring, ATS tailoring, and career path recommendations.
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Professional Headline */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Professional Headline <span className="text-rose-500">*</span>
          </label>
          <Input
            value={data.headline}
            onChange={(e) => onChange({ headline: e.target.value })}
            placeholder="e.g. Software Developer | Full Stack Engineer"
            leftIcon={<Briefcase className="w-4 h-4 text-slate-400" />}
            className="text-xs font-medium"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Appears at the top of your tailored resumes and application cover letters.
          </p>
        </div>

        {/* Current Role */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Current / Most Recent Role <span className="text-rose-500">*</span>
          </label>
          <Input
            value={data.currentRole}
            onChange={(e) => onChange({ currentRole: e.target.value })}
            placeholder="e.g. Frontend & Full Stack Engineer"
            className="text-xs font-medium"
          />
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Total Years of Experience <span className="text-rose-500">*</span>
          </label>
          <Input
            type="number"
            step="0.5"
            min="0"
            max="30"
            value={data.yearsOfExperience}
            onChange={(e) => onChange({ yearsOfExperience: parseFloat(e.target.value) || 0 })}
            placeholder="3.5"
            className="text-xs font-medium"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Calculated across internships, contract roles, and full-time employment.
          </p>
        </div>

        {/* Career Level */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Career Level <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.careerLevel}
            onChange={(e) =>
              onChange({
                careerLevel: e.target.value as ProfessionalProfileData['careerLevel'],
              })
            }
            aria-label="Career Level"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {CAREER_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Primary Target Role */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Primary Target Role <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.primaryRole}
            onChange={(e) => onChange({ primaryRole: e.target.value })}
            aria-label="Primary Target Role"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {POPULAR_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Secondary Target Roles Multi-Select */}
      <div className="pt-2 space-y-2">
        <label className="block text-xs font-bold text-slate-700">
          Secondary Target Roles
        </label>
        <p className="text-[11px] text-slate-500">
          JobAI will also search and evaluate opportunities matching these secondary career disciplines.
        </p>

        {/* Active Secondary Roles Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {data.secondaryRoles.map((role) => (
            <span
              key={role}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200/70 text-indigo-900 font-semibold text-xs"
            >
              <span>{role}</span>
              <button
                type="button"
                onClick={() => handleRemoveSecondaryRole(role)}
                className="text-indigo-400 hover:text-rose-600 transition-colors cursor-pointer"
                title={`Remove ${role}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {data.secondaryRoles.length === 0 && (
            <span className="text-xs text-slate-400 italic">No secondary roles added yet.</span>
          )}
        </div>

        {/* Add Secondary Role Input & Quick Suggestions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <div className="flex-1 flex gap-2">
            <Input
              value={newRoleInput}
              onChange={(e) => setNewRoleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddSecondaryRole(newRoleInput)
                }
              }}
              placeholder="Type another target role (e.g. AI Engineer)..."
              className="text-xs"
            />
            <button
              type="button"
              onClick={() => handleAddSecondaryRole(newRoleInput)}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] text-slate-400 font-medium">Quick add:</span>
          {POPULAR_ROLES.filter(
            (r) => r !== data.primaryRole && !data.secondaryRoles.includes(r)
          )
            .slice(0, 4)
            .map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleAddSecondaryRole(suggestion)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                + {suggestion}
              </button>
            ))}
        </div>
      </div>

      {/* Professional Summary */}
      <div className="pt-2 space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700">
            Professional Summary <span className="text-rose-500">*</span>
          </label>
          <span
            className={`text-[11px] font-medium ${
              data.summary.length >= 60 ? 'text-emerald-600' : 'text-amber-600'
            }`}
          >
            {data.summary.length} characters (min. 60 recommended)
          </span>
        </div>
        <textarea
          rows={4}
          value={data.summary}
          onChange={(e) => onChange({ summary: e.target.value })}
          placeholder="Briefly highlight your engineering background, core technology stack, production projects, and career aspirations..."
          className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed resize-y"
        />
        <p className="text-[11px] text-slate-400 leading-normal">
          Tip: A strong summary mentions your core frontend or full-stack tech stack (e.g. React, TypeScript, Node.js) and impact metrics.
        </p>
      </div>
    </Card>
  )
}
