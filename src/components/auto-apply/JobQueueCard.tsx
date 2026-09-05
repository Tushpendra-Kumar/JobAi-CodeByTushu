import React from 'react'
import {
  MapPin,
  Briefcase,
  Sparkles,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  EyeOff,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Job } from '@/data/jobsData'

interface JobQueueCardProps {
  job: Job
  isSelected: boolean
  isSaved: boolean
  onSelect: () => void
  onSkip: () => void
  onToggleSave: () => void
  onReviewApplication: () => void
  activeResumeName?: string
  readinessScore?: number
}

export const JobQueueCard: React.FC<JobQueueCardProps> = ({
  job,
  isSelected,
  isSaved,
  onSelect,
  onSkip,
  onToggleSave,
  onReviewApplication,
  activeResumeName = 'Master Resume (Verified)',
  readinessScore = 88,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer space-y-3.5 ${
        isSelected
          ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
          : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      {/* Top Header: Company Avatar, Title, Match Score & Bookmark */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          {/* Company Avatar */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-2xs"
            style={{ backgroundColor: job.companyColor || '#4F46E5' }}
          >
            {job.companyLogoText || job.company.slice(0, 2).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate leading-snug">
              {job.title}
            </h3>
            <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
              {job.company} • {job.industry}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Match Score Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>{job.matchScore}% Match</span>
          </span>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleSave()
            }}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save opportunity'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Metadata Row: Location, Work Mode, Experience, Salary */}
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{job.location}</span>
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5 text-slate-400" />
          <span>{job.workMode}</span>
        </span>
        <span>•</span>
        <span>{job.experience}</span>
        {job.salary && (
          <>
            <span>•</span>
            <span className="font-semibold text-slate-800">{job.salary}</span>
          </>
        )}
      </div>

      {/* Skill Alignment & Gaps */}
      <div className="space-y-1.5 pt-1">
        {/* Matching Skills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Matching:
          </span>
          {job.skills.slice(0, 4).map((sk) => (
            <span
              key={sk}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-100"
            >
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
              <span>{sk}</span>
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[10px] text-slate-400 font-medium">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Potential Gap */}
        {job.skillGaps && job.skillGaps.length > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50/70 px-2.5 py-1 rounded-lg border border-amber-100">
            <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="truncate">
              Focus Area: {job.skillGaps[0].skill} ({job.skillGaps[0].whyItMatters})
            </span>
          </div>
        )}
      </div>

      {/* Footer: Resume Linked & Readiness Bar + Action Buttons */}
      <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Linked Resume & Readiness */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-semibold text-slate-900 truncate max-w-[140px] sm:max-w-[180px]">
              {activeResumeName}
            </span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-500">
            Readiness: <strong className="text-emerald-700 font-bold">{readinessScore}%</strong>
          </span>
        </div>

        {/* Actions: Skip vs Review Application */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onSkip()
            }}
            leftIcon={<EyeOff className="w-3 h-3 text-slate-400" />}
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            Skip
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onReviewApplication()
            }}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="text-xs font-semibold shadow-xs"
          >
            Review Application
          </Button>
        </div>
      </div>
    </div>
  )
}
