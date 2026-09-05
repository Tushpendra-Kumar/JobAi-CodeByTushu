import React from 'react'
import { ArrowRight, MapPin, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Job } from '@/data/jobsData'

export interface SimilarJobsSectionProps {
  similarJobs: Job[]
  onSelectJob: (jobId: string) => void
}

export const SimilarJobsSection: React.FC<SimilarJobsSectionProps> = ({
  similarJobs,
  onSelectJob,
}) => {
  if (similarJobs.length === 0) return null

  return (
    <div className="pt-10 border-t border-slate-200/80 text-left mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Similar Jobs</span>
            <Sparkles className="w-4 h-4 text-indigo-500" />
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Other high-match roles aligned with your technical capabilities
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {similarJobs.map((simJob) => (
          <Card
            key={simJob.id}
            hoverEffect
            className="p-5 border-slate-200/90 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header: Avatar + Match Score */}
              <div className="flex items-start justify-between">
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${simJob.companyColor} text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0`}
                >
                  {simJob.companyLogoText}
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{simJob.matchScore}%</span>
                </div>
              </div>

              {/* Title & Company */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {simJob.title}
                </h4>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">
                  {simJob.company}
                </p>
              </div>

              {/* Location & Salary */}
              <div className="text-xs text-slate-500 space-y-1">
                <p className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{simJob.location}</span>
                </p>
                <p className="font-semibold text-slate-700">
                  {simJob.salary}
                </p>
              </div>
            </div>

            {/* View Job CTA */}
            <div className="pt-4 mt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  onSelectJob(simJob.id)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="w-full justify-center text-xs h-8.5 font-semibold text-indigo-700 hover:bg-indigo-50 border-indigo-200/80"
              >
                View Job
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
