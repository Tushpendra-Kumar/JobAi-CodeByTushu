import React from 'react'
import {
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  Share2,
  Building2,
  Users,
  Check,
  ArrowRight,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Job } from '@/data/jobsData'

export interface JobDetailsHeaderProps {
  job: Job
  isSaved: boolean
  onToggleSave: () => void
  onApply: () => void
  onShare: () => void
}

export const JobDetailsHeader: React.FC<JobDetailsHeaderProps> = ({
  job,
  isSaved,
  onToggleSave,
  onApply,
  onShare,
}) => {
  return (
    <Card className="p-6 sm:p-8 border-slate-200/90 shadow-sm text-left mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Company Avatar & Job Titles */}
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Avatar */}
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${job.companyColor} text-white flex items-center justify-center font-extrabold text-lg sm:text-xl shadow-md shrink-0 ring-2 ring-white`}
          >
            {job.companyLogoText}
          </div>

          {/* Details */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {job.title}
              </h1>
              {job.isFeatured && (
                <Badge variant="indigo" size="sm" className="font-semibold text-xs">
                  Featured
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-slate-700">
              <span className="text-indigo-600 font-bold">{job.company}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {job.industry}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                {job.companySize}
              </span>
            </div>

            {/* Sub-meta tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                {job.salary}
              </span>
              <span className="font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {job.location}
              </span>
              <span className="font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                {job.workMode}
              </span>
              <span className="font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {job.postedAt}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Match Badge & Action CTAs */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          {/* Match Score Indicator */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-extrabold">{job.matchScore}% AI Match</span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Share Button */}
            <button
              type="button"
              onClick={onShare}
              aria-label="Share this job opportunity"
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Save Job Button */}
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onToggleSave}
              leftIcon={
                isSaved ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )
              }
              className={`text-xs font-semibold ${
                isSaved ? 'text-emerald-700 border-emerald-200 bg-emerald-50/50' : ''
              }`}
            >
              {isSaved ? 'Saved' : 'Save Job'}
            </Button>

            {/* Primary Apply Button */}
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={onApply}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="text-xs font-bold px-6 shadow-md"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
