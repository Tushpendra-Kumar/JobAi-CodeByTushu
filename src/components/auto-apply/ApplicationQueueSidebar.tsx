import React from 'react'
import {
  ListOrdered,
  Sparkles,
  ArrowRight,
  EyeOff,
  History,
} from 'lucide-react'
import type { TrackedApplication } from '@/services/applicationTrackingService'
import type { Job } from '@/data/jobsData'

interface ApplicationQueueSidebarProps {
  queueJobs: Job[]
  activeJobId: string | null
  onSelectJob: (jobId: string) => void
  onSkipJob: (jobId: string) => void
  trackedApplications: TrackedApplication[]
  onSelectTrackedApp?: (app: TrackedApplication) => void
  currentTab: 'queue' | 'history'
  onChangeTab: (tab: 'queue' | 'history') => void
}

export const ApplicationQueueSidebar: React.FC<ApplicationQueueSidebarProps> = ({
  queueJobs,
  activeJobId,
  onSelectJob,
  onSkipJob,
  trackedApplications,
  currentTab,
  onChangeTab,
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3.5">
      {/* Header & Mode Tabs */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Pipeline Queue
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
          <button
            type="button"
            onClick={() => onChangeTab('queue')}
            className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
              currentTab === 'queue'
                ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ready ({queueJobs.length})
          </button>
          <button
            type="button"
            onClick={() => onChangeTab('history')}
            className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
              currentTab === 'history'
                ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Applied ({trackedApplications.length})
          </button>
        </div>
      </div>

      {/* List Content */}
      <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
        {currentTab === 'queue' ? (
          queueJobs.length > 0 ? (
            queueJobs.map((job, idx) => {
              const isActive = job.id === activeJobId
              return (
                <div
                  key={job.id}
                  onClick={() => onSelectJob(job.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isActive
                      ? 'bg-indigo-50/50 border-indigo-500 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold text-slate-400">#{idx + 1}</span>
                        <h4 className="text-xs font-bold text-slate-900 truncate">{job.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{job.company}</p>
                    </div>

                    <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 shrink-0">
                      {job.matchScore}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="text-slate-500 font-medium">Ready for Review</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSkipJob(job.id)
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        title="Skip this job"
                      >
                        <EyeOff className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectJob(job.id)
                        }}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 ml-1"
                      >
                        <span>Review</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="py-8 text-center space-y-2">
              <Sparkles className="w-6 h-6 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">All queued applications have been processed.</p>
            </div>
          )
        ) : (
          /* History View */
          trackedApplications.length > 0 ? (
            trackedApplications.map((app) => (
              <div
                key={app.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{app.jobTitle}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{app.company}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                    Applied
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                  <span className="font-mono">{app.confirmationCode}</span>
                  <span>{app.appliedAt}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center space-y-2">
              <History className="w-6 h-6 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">No applications recorded yet.</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
