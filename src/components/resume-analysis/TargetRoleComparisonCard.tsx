import React from 'react'
import {
  Target,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  TARGET_ROLE_OPTIONS,
  type TargetRole,
} from '@/services/resumeAnalysisService'

export interface TargetRoleComparisonCardProps {
  selectedRole: TargetRole
  onSelectRole: (role: TargetRole) => void
  selectedJobTitle?: string
  matchScore: number
  matchingSkills: string[]
  improvementSkills: string[]
  onOpenCompareJobModal: () => void
}

export const TargetRoleComparisonCard: React.FC<TargetRoleComparisonCardProps> = ({
  selectedRole,
  onSelectRole,
  selectedJobTitle,
  matchScore,
  matchingSkills,
  improvementSkills,
  onOpenCompareJobModal,
}) => {
  return (
    <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6 text-left">
      {/* 1. Selector Bar: Target Role & Compare with Job */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Analyze Resume For
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Target Role & Market Benchmark
          </h3>
        </div>

        {/* Action button to compare with job */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onOpenCompareJobModal}
          leftIcon={<Briefcase className="w-3.5 h-3.5 text-indigo-600" />}
          className="text-xs border-indigo-200 hover:bg-indigo-50/70 text-indigo-700 self-start md:self-auto"
        >
          {selectedJobTitle ? 'Change Job Target' : 'Analyze Against Job'}
        </Button>
      </div>

      {/* 2. Target Role Selector Chips */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-500 block">
          Select Standard Engineering Benchmark:
        </span>
        <div className="flex flex-wrap gap-2">
          {TARGET_ROLE_OPTIONS.map((role) => {
            const isSelected = selectedRole === role && !selectedJobTitle

            return (
              <button
                key={role}
                type="button"
                onClick={() => onSelectRole(role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                }`}
              >
                <span>{role}</span>
                {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Role/Job Active Match Score Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-slate-50/50 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
              {selectedJobTitle ? 'Job-Specific Benchmark' : 'Role-Level Benchmark'}
            </span>
            <span className="w-1 h-1 rounded-full bg-indigo-400" />
            <span className="text-xs text-slate-500">
              {selectedJobTitle ? selectedJobTitle : `Target: ${selectedRole}`}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
            Resume Match: {matchScore}%
          </h4>
        </div>

        {/* Match progress bar */}
        <div className="w-full sm:w-48 space-y-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-700">
            <span>Market Compatibility</span>
            <span className="text-indigo-600">{matchScore}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-indigo-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-700"
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. Comparison Columns: Matching Areas vs Areas to Improve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-1">
        {/* Left Column: Matching Areas (✓) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100/80 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <h4 className="text-xs sm:text-sm font-bold">
              Matching Areas ({matchingSkills.length})
            </h4>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Skills and proficiencies detected on your resume that directly align with {selectedRole} requirements:
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {matchingSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-2xs"
              >
                <span className="text-emerald-600">✓</span>
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Areas to Improve (△) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/40 border border-amber-100/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <h4 className="text-xs sm:text-sm font-bold">
              Areas to Improve ({improvementSkills.length})
            </h4>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            High-demand technical competencies recommended to increase hiring relevance for this track:
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {improvementSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-xs font-semibold text-amber-800 shadow-2xs"
              >
                <span className="text-amber-500 font-bold">△</span>
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
