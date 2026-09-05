import {
  MapPin,
  IndianRupee,
  Briefcase,
  Bookmark,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Job } from '@/data/jobsData'

export interface RecommendedJobCardProps {
  job: Job
  isSelected: boolean
  onSelect: () => void
  onViewJob: () => void
  onApply: () => void
  isSaved: boolean
  onToggleSave: () => void
}

export const RecommendedJobCard: React.FC<RecommendedJobCardProps> = ({
  job,
  isSelected,
  onSelect,
  onViewJob,
  onApply,
  isSaved,
  onToggleSave,
}) => {
  // Score badge color calculation
  const getScoreBadgeStyles = (score: number) => {
    if (score >= 90) {
      return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/20'
    }
    if (score >= 85) {
      return 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-500/20'
    }
    return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20'
  }

  // Derive strength indicator for each skill
  const getSkillStrength = (skillName: string) => {
    const reason = job.matchReasons.find(
      (r) => r.skill.toLowerCase() === skillName.toLowerCase()
    )
    if (reason) {
      if (reason.status === 'strong') return { label: 'Strong', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
      if (reason.status === 'match') return { label: 'Match', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
      return { label: 'Partial', badge: 'bg-amber-50 text-amber-700 border-amber-200' }
    }

    // Default heuristics based on role
    if (['react.js', 'javascript', 'rest apis'].includes(skillName.toLowerCase())) {
      return { label: 'Strong', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
    }
    if (['typescript'].includes(skillName.toLowerCase())) {
      return { label: 'Partial', badge: 'bg-amber-50 text-amber-700 border-amber-200' }
    }
    return { label: 'Match', badge: 'bg-slate-100 text-slate-700 border-slate-200' }
  }

  return (
    <div
      onClick={onSelect}
      className={`p-5 sm:p-6 rounded-2xl bg-white border transition-all text-left relative cursor-pointer group ${
        isSelected
          ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-md bg-indigo-50/10'
          : 'border-slate-200/80 hover:border-indigo-300 hover:shadow-sm'
      }`}
    >
      {/* Top Bar: Company Avatar, Title, Match Score */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-3.5">
          {/* Company Avatar */}
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.companyColor} flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0`}
          >
            {job.companyLogoText}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {job.title}
              </h3>
              {isSelected && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                  Active Analysis
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5 font-medium flex-wrap">
              <span className="font-semibold text-slate-800">{job.company}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-500">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px]">
                {job.workMode}
              </span>
            </div>
          </div>
        </div>

        {/* AI Match Score Badge */}
        <div className="flex flex-col items-end shrink-0">
          <div
            className={`px-3 py-1 rounded-xl font-black text-xs sm:text-sm tracking-tight shadow-sm flex items-center gap-1.5 ${getScoreBadgeStyles(
              job.matchScore
            )}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{job.matchScore}% Match</span>
          </div>
          <span className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
            AI Ranked
          </span>
        </div>
      </div>

      {/* Salary & Details Chips */}
      <div className="flex items-center gap-3 text-xs text-slate-600 my-3 flex-wrap">
        <span className="inline-flex items-center gap-1 font-bold text-slate-900 bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2.5 py-1 rounded-lg">
          <IndianRupee className="w-3.5 h-3.5" />
          {job.salary}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium">
          <Briefcase className="w-3.5 h-3.5" />
          {job.jobType}
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium">
          {job.experience}
        </span>
      </div>

      {/* AI Explanation Quote Box */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 my-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>AI Match Reasoning:</span>
        </div>
        <p className="text-xs text-slate-600 italic leading-relaxed">
          “{job.matchExplanation}”
        </p>
      </div>

      {/* Skills & Strength Indicators */}
      <div className="my-3">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Skills & Compatibility:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {job.skills.map((skill) => {
            const strength = getSkillStrength(skill)
            return (
              <span
                key={skill}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${strength.badge}`}
              >
                <span>{skill}</span>
                <span className="text-[10px] opacity-75 font-normal">
                  — {strength.label}
                </span>
              </span>
            )
          })}
        </div>
      </div>

      {/* Actions: View Job, Apply, Bookmark */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onViewJob()
            }}
            className="text-xs font-bold"
          >
            View Job
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onApply()
            }}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="text-xs font-bold shadow-xs bg-indigo-600 hover:bg-indigo-700"
          >
            Apply
          </Button>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleSave()
          }}
          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
            isSaved
              ? 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100'
              : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
          }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save job'}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
        </button>
      </div>
    </div>
  )
}
