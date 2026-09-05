import React, { useState } from 'react'
import {
  Bookmark,
  MapPin,
  Briefcase,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Job } from '@/data/jobsData'

export interface JobResultCardProps {
  job: Job
  isSaved: boolean
  onToggleSave: (jobId: string) => void
  onViewDetails: (job: Job) => void
  viewMode?: 'list' | 'grid'
}

export const JobResultCard: React.FC<JobResultCardProps> = ({
  job,
  isSaved,
  onToggleSave,
  onViewDetails,
  viewMode = 'list',
}) => {
  const [showMatchDetails, setShowMatchDetails] = useState(false)

  // Color scheme based on match score
  const getScoreVariant = (score: number) => {
    if (score >= 90) return { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500' }
    if (score >= 80) return { text: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200', dot: 'bg-indigo-500' }
    return { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' }
  }

  const scoreTheme = getScoreVariant(job.matchScore)

  return (
    <Card
      hoverEffect
      className={`p-5 sm:p-6 transition-all text-left group border-slate-200/90 hover:border-indigo-300 relative ${
        viewMode === 'grid' ? 'flex flex-col justify-between' : ''
      }`}
    >
      <div>
        {/* Top Header Row: Company Avatar + Title + Bookmark + Match Score */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            {/* Company Avatar */}
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${job.companyColor} text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 ring-1 ring-black/5`}
            >
              {job.companyLogoText}
            </div>

            {/* Title & Company */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                  {job.title}
                </h3>
                {job.isFeatured && (
                  <Badge variant="indigo" size="sm" className="py-0 px-2 text-[10px] font-semibold">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 flex items-center gap-1.5">
                <span>{job.company}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {job.location}
                </span>
              </p>
            </div>
          </div>

          {/* Top Right: Bookmark + AI Match Pill */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Bookmark Action */}
            <button
              type="button"
              onClick={() => onToggleSave(job.id)}
              aria-label={isSaved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isSaved
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Bookmark
                className={`w-4 h-4 transition-transform active:scale-90 ${
                  isSaved ? 'fill-indigo-600' : ''
                }`}
              />
            </button>

            {/* AI Match Score Badge with Glow */}
            <div
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 shadow-xs ${scoreTheme.bg} ${scoreTheme.border}`}
            >
              <span className={`w-2 h-2 rounded-full ${scoreTheme.dot} animate-pulse`} />
              <div className="flex flex-col items-start leading-none">
                <span className={`text-xs font-black ${scoreTheme.text}`}>
                  {job.matchScore}%
                </span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-tighter mt-0.5">
                  Match
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Badges: Work Mode, Experience, Salary, Posted */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">
            {job.salary}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            {job.workMode}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium">
            {job.experience}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {job.postedAt}
          </span>
        </div>

        {/* AI Explanation Banner */}
        <div className="mt-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100/70 p-2.5 sm:p-3 text-xs flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-indigo-950 font-medium leading-relaxed">
              {job.matchExplanation}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowMatchDetails(!showMatchDetails)}
            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 shrink-0 cursor-pointer"
            aria-expanded={showMatchDetails}
          >
            <span>{showMatchDetails ? 'Hide' : 'Why this matches'}</span>
            {showMatchDetails ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Expandable "Why This Matches" Breakdown */}
        {showMatchDetails && (
          <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2 animate-in slide-in-from-top-1 duration-150">
            <div className="flex items-center justify-between font-bold text-slate-700 text-[11px] uppercase tracking-wider pb-1.5 border-b border-slate-200/60">
              <span>Candidate Skill Alignment</span>
              <span className="text-indigo-600 font-semibold">
                AI Diagnostic Telemetry
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {job.matchReasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-white border border-slate-200/60 text-xs"
                >
                  <div className="flex items-center gap-1.5">
                    {reason.status === 'improve' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    )}
                    <span className="font-semibold text-slate-800">
                      {reason.skill}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      reason.status === 'strong'
                        ? 'bg-emerald-50 text-emerald-700'
                        : reason.status === 'match'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {reason.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skill Pills */}
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200/90 text-slate-700 text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Row: Description Preview & View Details CTA */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-slate-500 line-clamp-1 max-w-lg">
          {job.descriptionPreview}
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onViewDetails(job)}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="shrink-0 w-full sm:w-auto justify-center font-semibold text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50"
        >
          View Details
        </Button>
      </div>
    </Card>
  )
}
