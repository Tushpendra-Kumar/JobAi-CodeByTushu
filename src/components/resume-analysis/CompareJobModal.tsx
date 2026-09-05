import React, { useState } from 'react'
import { Building2, MapPin, CheckCircle2, Search, X } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { initialJobsData, type Job } from '@/data/jobsData'

export interface CompareJobModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectJob: (job: Job | null) => void
  currentlySelectedJobId?: string
}

export const CompareJobModal: React.FC<CompareJobModalProps> = ({
  isOpen,
  onClose,
  onSelectJob,
  currentlySelectedJobId,
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredJobs = initialJobsData.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Analyze Resume Against a Job Posting"
      description="Compare your parsed resume directly against the technical requirements of an active job opening."
      maxWidth="lg"
    >
      <div className="space-y-4 text-left">
        {/* Search filter input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search job title, company, or tech stack..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Job Listings List */}
        <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
          {filteredJobs.map((job) => {
            const isSelected = job.id === currentlySelectedJobId

            return (
              <div
                key={job.id}
                onClick={() => {
                  onSelectJob(job)
                  onClose()
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-2xs'
                    : 'border-slate-200/80 bg-white hover:border-indigo-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {job.title}
                    </span>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Selected
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {job.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-indigo-700">
                      {job.salary}
                    </span>
                  </div>

                  {/* Skills tags preview */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {job.skills.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                    {job.skills.length > 4 && (
                      <span className="text-[10px] text-slate-400 font-medium">
                        +{job.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="shrink-0 text-right">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-bold">
                    {job.matchScore}% Match
                  </span>
                </div>
              </div>
            )
          })}

          {filteredJobs.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching jobs found in demo catalog for “{searchQuery}”.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          {currentlySelectedJobId ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                onSelectJob(null)
                onClose()
              }}
              className="text-xs text-slate-600 hover:text-red-600"
            >
              Reset to General Role Analysis
            </Button>
          ) : (
            <span className="text-[11px] text-slate-400">
              Select any role to compare skill alignments.
            </span>
          )}

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}
