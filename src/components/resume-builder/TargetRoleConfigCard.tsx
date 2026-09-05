import React, { useState } from 'react'
import {
  Briefcase,
  Sliders,
  ChevronDown,
  ChevronUp,
  FileSearch,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import type {
  BuilderTargetConfig,
  ExperienceLevel,
  DocumentLength,
} from '@/services/resumeBuilderAIService'

interface TargetRoleConfigCardProps {
  config: BuilderTargetConfig
  onChangeConfig: (newConfig: BuilderTargetConfig) => void
  onExtractKeywordsFromJd?: () => void
}

const PRESET_ROLES = [
  'Software Developer',
  'Frontend Developer',
  'Full Stack Developer',
  'Backend Developer',
  'DevOps Engineer',
]

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'Entry Level (0-2 yrs)',
  'Mid Level (2-5 yrs)',
  'Senior Level (5+ yrs)',
  'Lead / Principal',
]

export const TargetRoleConfigCard: React.FC<TargetRoleConfigCardProps> = ({
  config,
  onChangeConfig,
}) => {
  const [isJdExpanded, setIsJdExpanded] = useState(Boolean(config.jobDescription))

  const handleRoleSelect = (role: string) => {
    onChangeConfig({ ...config, targetRole: role })
  }

  const handleExpLevelSelect = (level: ExperienceLevel) => {
    onChangeConfig({ ...config, experienceLevel: level })
  }

  const handleLengthSelect = (length: DocumentLength) => {
    onChangeConfig({ ...config, documentLength: length })
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Target Role & Career Benchmark</h2>
            <p className="text-[11px] text-slate-500">
              Directs AI keyword prioritization and ATS relevancy weighting
            </p>
          </div>
        </div>
      </div>

      {/* Target Role Selector & Quick Chips */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700">
          Target Job Title
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {PRESET_ROLES.map((role) => {
            const isSelected = config.targetRole === role
            return (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelect(role)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {role}
              </button>
            )
          })}
        </div>

        <div className="relative">
          <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={config.targetRole}
            onChange={(e) => onChangeConfig({ ...config, targetRole: e.target.value })}
            placeholder="e.g. Senior Frontend Engineer"
            className="w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Experience Level & Document Length Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Experience Level */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Target Experience Level</span>
          </label>
          <select
            value={config.experienceLevel}
            onChange={(e) => handleExpLevelSelect(e.target.value as ExperienceLevel)}
            className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
          >
            {EXPERIENCE_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Document Length Target */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Document Length
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => handleLengthSelect('1-page')}
              className={`py-2 px-2 rounded-xl text-xs font-medium text-center transition-all cursor-pointer ${
                config.documentLength === '1-page'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              1-Page (ATS Standard)
            </button>
            <button
              type="button"
              onClick={() => handleLengthSelect('2-page')}
              className={`py-2 px-2 rounded-xl text-xs font-medium text-center transition-all cursor-pointer ${
                config.documentLength === '2-page'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              2-Page (Comprehensive)
            </button>
          </div>
        </div>
      </div>

      {/* Target Location */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>Target Location / Work Flexibility</span>
        </label>
        <input
          type="text"
          value={config.location}
          onChange={(e) => onChangeConfig({ ...config, location: e.target.value })}
          placeholder="e.g. Noida / Bengaluru / Remote India"
          className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        />
      </div>

      {/* Target Job Description Collapsible Accordion */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setIsJdExpanded(!isJdExpanded)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-2">
            <FileSearch className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-semibold text-slate-800">
              Paste Target Job Description (Optional)
            </span>
            {config.jobDescription ? (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                JD Attached
              </span>
            ) : (
              <span className="text-[10px] text-slate-400">Enhance keyword match</span>
            )}
          </div>
          {isJdExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {isJdExpanded && (
          <div className="mt-2 space-y-2 animate-in fade-in-50 duration-150">
            <textarea
              rows={4}
              value={config.jobDescription}
              onChange={(e) => onChangeConfig({ ...config, jobDescription: e.target.value })}
              placeholder="Paste the target job description or requirements here to automatically extract and prioritize missing high-value ATS keywords..."
              className="w-full p-3 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400 font-sans"
            />
            {config.jobDescription && (
              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span>{config.jobDescription.length} characters parsed</span>
                <span className="text-indigo-600 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Live keyword synchronization active
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Truthfulness Notice Banner */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-slate-50 border border-indigo-100/70 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-[11px] text-slate-600 leading-relaxed">
          <span className="font-bold text-indigo-950">Truthfulness Rule: </span>
          JobAI sharpens phrasing, active verbs, and ATS alignment. We never fabricate unverified
          employers, degrees, dates, or false metrics.
        </div>
      </div>
    </div>
  )
}
