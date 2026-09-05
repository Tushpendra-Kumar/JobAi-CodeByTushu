import React from 'react'
import {
  MapPin,
  Sparkles,
  FileText,
  Clock,
  ExternalLink,
  PlusCircle,
  AlertCircle,
} from 'lucide-react'
import type {
  TrackedApplication,
  NormalizedPipelineStage,
  ApplicationStatus,
} from '@/services/applicationTrackingService'
import {
  KANBAN_COLUMNS,
  normalizeStatus,
} from '@/services/applicationTrackingService'

interface ApplicationKanbanBoardProps {
  applications: TrackedApplication[]
  onSelectApplication: (app: TrackedApplication) => void
  onUpdateStatus: (id: string, newStatus: ApplicationStatus) => void
  onAddNote: (app: TrackedApplication) => void
}

export const ApplicationKanbanBoard: React.FC<ApplicationKanbanBoardProps> = ({
  applications,
  onSelectApplication,
  onUpdateStatus,
  onAddNote,
}) => {
  const columnConfigs: Record<
    NormalizedPipelineStage,
    { title: string; color: string; bgColor: string; borderColor: string }
  > = {
    Saved: {
      title: 'Saved',
      color: 'text-slate-700',
      bgColor: 'bg-slate-100',
      borderColor: 'border-slate-300',
    },
    Preparing: {
      title: 'Preparing',
      color: 'text-amber-800',
      bgColor: 'bg-amber-100',
      borderColor: 'border-amber-300',
    },
    'Ready to Apply': {
      title: 'Ready',
      color: 'text-indigo-800',
      bgColor: 'bg-indigo-100',
      borderColor: 'border-indigo-300',
    },
    Applied: {
      title: 'Applied',
      color: 'text-blue-800',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-300',
    },
    Screening: {
      title: 'Screening',
      color: 'text-purple-800',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-300',
    },
    Interview: {
      title: 'Interview',
      color: 'text-emerald-800',
      bgColor: 'bg-emerald-100',
      borderColor: 'border-emerald-300',
    },
    Offer: {
      title: 'Offer',
      color: 'text-teal-800',
      bgColor: 'bg-teal-100',
      borderColor: 'border-teal-300',
    },
    Rejected: {
      title: 'Rejected',
      color: 'text-rose-800',
      bgColor: 'bg-rose-100',
      borderColor: 'border-rose-300',
    },
    Withdrawn: {
      title: 'Withdrawn',
      color: 'text-slate-600',
      bgColor: 'bg-slate-100',
      borderColor: 'border-slate-300',
    },
  }

  return (
    <div className="overflow-x-auto pb-4 pt-1 -mx-2 px-2 scrollbar-thin">
      <div className="flex items-start gap-4 min-w-[1300px]">
        {KANBAN_COLUMNS.map((stage) => {
          const cfg = columnConfigs[stage]
          const stageApps = applications.filter(
            (app) => normalizeStatus(app.status) === stage
          )

          return (
            <div
              key={stage}
              className="w-[280px] shrink-0 bg-slate-100/70 border border-slate-200/80 rounded-2xl p-3 flex flex-col max-h-[800px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      stage === 'Interview'
                        ? 'bg-emerald-500'
                        : stage === 'Offer'
                        ? 'bg-teal-500'
                        : stage === 'Applied'
                        ? 'bg-blue-500'
                        : stage === 'Screening'
                        ? 'bg-purple-500'
                        : stage === 'Preparing'
                        ? 'bg-amber-500'
                        : stage === 'Rejected'
                        ? 'bg-rose-500'
                        : 'bg-slate-400'
                    }`}
                  />
                  <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                    {cfg.title}
                  </h2>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${cfg.bgColor} ${cfg.color}`}
                >
                  {stageApps.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 overflow-y-auto pr-1 flex-1 min-h-[140px]">
                {stageApps.length === 0 ? (
                  <div className="h-28 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-400">
                    No applications in {cfg.title}
                  </div>
                ) : (
                  stageApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
                      onClick={() => onSelectApplication(app)}
                    >
                      {/* Top: Company Logo + Title + Match Badge */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0"
                            style={{
                              backgroundColor: app.companyColor || '#4F46E5',
                            }}
                          >
                            {app.companyLogoText || app.company.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                              {app.jobTitle}
                            </h3>
                            <p className="text-[11px] text-slate-500 truncate font-medium">
                              {app.company}
                            </p>
                          </div>
                        </div>

                        {/* Match Score Badge */}
                        <div
                          className={`shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                            app.matchScore >= 90
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          }`}
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{app.matchScore}%</span>
                        </div>
                      </div>

                      {/* Location & Work Mode */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2.5">
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          {app.location}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                          {app.workMode}
                        </span>
                      </div>

                      {/* Next Action Pill if available */}
                      {app.nextAction && (
                        <div
                          className={`mb-2.5 p-2 rounded-lg text-[11px] border ${
                            app.nextAction.isOverdue
                              ? 'bg-rose-50/70 border-rose-200 text-rose-800'
                              : 'bg-amber-50/60 border-amber-200/80 text-amber-800'
                          }`}
                        >
                          <div className="flex items-center gap-1 font-semibold">
                            {app.nextAction.isOverdue ? (
                              <AlertCircle className="w-3 h-3 text-rose-600 shrink-0" />
                            ) : (
                              <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                            )}
                            <span className="truncate">
                              {app.nextAction.action}
                            </span>
                          </div>
                          {app.nextAction.dueDate && (
                            <div className="text-[10px] text-slate-500 mt-0.5 ml-4">
                              Due: {app.nextAction.dueDate}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Footer: Resume link + Status changer dropdown */}
                      <div
                        className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[11px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="flex items-center gap-1 text-slate-400 truncate max-w-[120px]">
                          <FileText className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{app.resumeVersionName}</span>
                        </span>

                        {/* Quick Status Select */}
                        <div className="relative">
                          <select
                            value={normalizeStatus(app.status)}
                            onChange={(e) =>
                              onUpdateStatus(
                                app.id,
                                e.target.value as ApplicationStatus
                              )
                            }
                            className="text-[10px] font-semibold py-1 px-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            aria-label={`Change status for ${app.jobTitle}`}
                          >
                            <option value="Saved">Saved</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Ready to Apply">Ready to Apply</option>
                            <option value="Applied">Applied</option>
                            <option value="Screening">Screening</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                      </div>

                      {/* Hover action row */}
                      <div className="mt-2 pt-1 flex items-center justify-between text-[11px] text-slate-400">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onAddNote(app)
                          }}
                          className="hover:text-indigo-600 flex items-center gap-1 transition-colors"
                        >
                          <PlusCircle className="w-3 h-3" />
                          <span>Note</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectApplication(app)}
                          className="hover:text-indigo-600 flex items-center gap-1 transition-colors font-medium"
                        >
                          <span>Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
