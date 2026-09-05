import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import {
  MapPin,
  Briefcase,
  Building2,
  IndianRupee,
  X,
} from 'lucide-react'
import type { JobPreferencesData } from '@/services/profileSettingsService'

interface JobPreferencesSectionProps {
  data: JobPreferencesData
  onChange: (updated: Partial<JobPreferencesData>) => void
}

const REMOTE_PREFERENCES: JobPreferencesData['remotePreference'][] = [
  'Remote',
  'Hybrid',
  'On-site',
  'Any',
]

const EMPLOYMENT_TYPES: JobPreferencesData['employmentTypes'][number][] = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Freelance',
]

const NOTICE_PERIODS = [
  'Immediate Joiner (0–15 Days)',
  '15–30 Days',
  '30–60 Days',
  '60–90 Days',
]

const POPULAR_LOCATIONS = [
  'Bangalore',
  'Remote',
  'Delhi NCR',
  'Noida',
  'Hyderabad',
  'Pune',
  'Mumbai',
  'Chennai',
]

export const JobPreferencesSection: React.FC<JobPreferencesSectionProps> = ({
  data,
  onChange,
}) => {
  const [newRoleInput, setNewRoleInput] = useState('')
  const [newLocationInput, setNewLocationInput] = useState('')
  const [newIndustryInput, setNewIndustryInput] = useState('')
  const [newCompanyInput, setNewCompanyInput] = useState('')

  const handleAddRole = (role: string) => {
    const trimmed = role.trim()
    if (!trimmed || data.targetRoles.includes(trimmed)) return
    onChange({ targetRoles: [...data.targetRoles, trimmed] })
    setNewRoleInput('')
  }

  const handleRemoveRole = (role: string) => {
    onChange({ targetRoles: data.targetRoles.filter((r) => r !== role) })
  }

  const handleAddLocation = (loc: string) => {
    const trimmed = loc.trim()
    if (!trimmed || data.preferredLocations.includes(trimmed)) return
    onChange({ preferredLocations: [...data.preferredLocations, trimmed] })
    setNewLocationInput('')
  }

  const handleRemoveLocation = (loc: string) => {
    onChange({ preferredLocations: data.preferredLocations.filter((l) => l !== loc) })
  }

  const handleToggleEmploymentType = (type: JobPreferencesData['employmentTypes'][number]) => {
    if (data.employmentTypes.includes(type)) {
      if (data.employmentTypes.length > 1) {
        onChange({ employmentTypes: data.employmentTypes.filter((t) => t !== type) })
      }
    } else {
      onChange({ employmentTypes: [...data.employmentTypes, type] })
    }
  }

  const handleAddIndustry = (ind: string) => {
    const trimmed = ind.trim()
    if (!trimmed || data.preferredIndustries.includes(trimmed)) return
    onChange({ preferredIndustries: [...data.preferredIndustries, trimmed] })
    setNewIndustryInput('')
  }

  const handleRemoveIndustry = (ind: string) => {
    onChange({ preferredIndustries: data.preferredIndustries.filter((i) => i !== ind) })
  }

  const handleAddCompany = (comp: string) => {
    const trimmed = comp.trim()
    if (!trimmed || data.preferredCompanies.includes(trimmed)) return
    onChange({ preferredCompanies: [...data.preferredCompanies, trimmed] })
    setNewCompanyInput('')
  }

  const handleRemoveCompany = (comp: string) => {
    onChange({ preferredCompanies: data.preferredCompanies.filter((c) => c !== comp) })
  }

  return (
    <Card className="p-6 border-slate-200/90 shadow-sm space-y-6">
      {/* Section Header */}
      <div className="pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">Job Preferences</h3>
          <Badge variant="indigo" size="sm">
            Search & AI Matching Filter
          </Badge>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          These preferences directly steer Screen #2 Job Search filtering, Screen #4 AI Matching scoring, Screen #8 Auto Apply queue, and Screen #11 Career Insights.
        </p>
      </div>

      {/* Target Roles Multi-Select */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">
          Target Job Titles / Roles <span className="text-rose-500">*</span>
        </label>

        <div className="flex flex-wrap gap-2">
          {data.targetRoles.map((role) => (
            <span
              key={role}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200/80 text-indigo-900 text-xs font-bold shadow-2xs"
            >
              <Briefcase className="w-3 h-3 text-indigo-600" />
              <span>{role}</span>
              <button
                type="button"
                onClick={() => handleRemoveRole(role)}
                className="text-indigo-400 hover:text-rose-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2 pt-1 max-w-md">
          <Input
            value={newRoleInput}
            onChange={(e) => setNewRoleInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddRole(newRoleInput)
              }
            }}
            placeholder="Add target role (e.g. React Native Engineer)..."
            className="text-xs"
          />
          <button
            type="button"
            onClick={() => handleAddRole(newRoleInput)}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs shrink-0 cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>

      {/* Preferred Locations Multi-Select */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold text-slate-700">
          Preferred Work Locations <span className="text-rose-500">*</span>
        </label>

        <div className="flex flex-wrap gap-2">
          {data.preferredLocations.map((loc) => (
            <span
              key={loc}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold"
            >
              <MapPin className="w-3 h-3 text-slate-500" />
              <span>{loc}</span>
              <button
                type="button"
                onClick={() => handleRemoveLocation(loc)}
                className="text-slate-400 hover:text-rose-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-400 font-medium">Quick add:</span>
          {POPULAR_LOCATIONS.filter((l) => !data.preferredLocations.includes(l)).map(
            (suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleAddLocation(suggestion)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 cursor-pointer"
              >
                + {suggestion}
              </button>
            )
          )}
        </div>

        <div className="flex gap-2 pt-1 max-w-md">
          <Input
            value={newLocationInput}
            onChange={(e) => setNewLocationInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddLocation(newLocationInput)
              }
            }}
            placeholder="Add custom city or state..."
            className="text-xs"
          />
          <button
            type="button"
            onClick={() => handleAddLocation(newLocationInput)}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs shrink-0 cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>

      {/* Remote Preference & Employment Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Remote Preference */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Work Mode / Remote Preference <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {REMOTE_PREFERENCES.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onChange({ remotePreference: mode })}
                className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                  data.remotePreference === mode
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Employment Type */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Employment Types (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {EMPLOYMENT_TYPES.map((type) => {
              const selected = data.employmentTypes.includes(type)
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleToggleEmploymentType(type)}
                  className={`py-1.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    selected
                      ? 'bg-indigo-50 text-indigo-900 border-indigo-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {selected && '✓ '}
                  {type}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Salary Expectation & Notice Period */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Target Salary Range LPA */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">
              Expected Annual Compensation (LPA)
            </label>
            <span className="text-xs font-extrabold text-indigo-700">
              ₹{data.minSalaryLpa} LPA – ₹{data.maxSalaryLpa} LPA
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Minimum (LPA)</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={data.minSalaryLpa}
                onChange={(e) => onChange({ minSalaryLpa: parseInt(e.target.value) || 0 })}
                leftIcon={<IndianRupee className="w-3.5 h-3.5 text-slate-400" />}
                className="text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Target / Max (LPA)</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={data.maxSalaryLpa}
                onChange={(e) => onChange({ maxSalaryLpa: parseInt(e.target.value) || 0 })}
                leftIcon={<IndianRupee className="w-3.5 h-3.5 text-slate-400" />}
                className="text-xs"
              />
            </div>
          </div>
        </div>

        {/* Notice Period */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Notice Period / Availability
          </label>
          <select
            value={data.noticePeriod}
            onChange={(e) => onChange({ noticePeriod: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {NOTICE_PERIODS.map((np) => (
              <option key={np} value={np}>
                {np}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400">
            Helps auto-fill application forms that require immediate or 30-day notice.
          </p>
        </div>
      </div>

      {/* Target Industries & Preferred Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Preferred Industries */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Preferred Industries & Sectors
          </label>
          <div className="flex flex-wrap gap-1.5">
            {data.preferredIndustries.map((ind) => (
              <span
                key={ind}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
              >
                <span>{ind}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIndustry(ind)}
                  className="text-slate-400 hover:text-rose-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newIndustryInput}
              onChange={(e) => setNewIndustryInput(e.target.value)}
              placeholder="Add industry (e.g. EdTech, HealthTech)..."
              className="text-xs"
            />
            <button
              type="button"
              onClick={() => handleAddIndustry(newIndustryInput)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs shrink-0 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* Preferred Companies / Dream List */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Target / Dream Companies
          </label>
          <div className="flex flex-wrap gap-1.5">
            {data.preferredCompanies.map((comp) => (
              <span
                key={comp}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-900 text-xs font-medium border border-emerald-200/80"
              >
                <Building2 className="w-3 h-3 text-emerald-600" />
                <span>{comp}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCompany(comp)}
                  className="text-emerald-400 hover:text-rose-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newCompanyInput}
              onChange={(e) => setNewCompanyInput(e.target.value)}
              placeholder="Add company name..."
              className="text-xs"
            />
            <button
              type="button"
              onClick={() => handleAddCompany(newCompanyInput)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs shrink-0 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}
