import React from 'react'
import {
  MapPin,
  Sparkles,
  Clock,
  ExternalLink,
  PlusCircle,
  AlertCircle,
} from 'lucide-react'
import type {
  TrackedApplication,
  ApplicationStatus,
} from '@/services/applicationTrackingService'
import {
  normalizeStatus,
  PIPELINE_STAGES,
} from '@/services/applicationTrackingService'

interface ApplicationListViewProps {
  applications: TrackedApplication[]
  onSelectApplication: (app: TrackedApplication) => void
  onUpdateStatus: (id: string, newStatus: ApplicationStatus) => void
  onAddNote: (app: TrackedApplication) => void
}

export const ApplicationListView: React.FC<ApplicationListViewProps> = ({
  applications,
  onSelectApplication,
  onUpdateStatus,
  onAddNote,
}) => {
  const getStageBadge = (status: ApplicationStatus) => {
    const norm = normalizeStatus(status)
    const stage = PIPELINE_STAGES.find((s) => s.id === norm)
    return {
      label: stage?.label || norm,
      color: stage?.color || 'text-slate-700',
      bgColor: stage?.bgColor || 'bg-slate-100',
      borderColor: stage?.borderColor || 'border-slate-200',
    }
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
      {/* 1. Desktop Table View (Hidden on mobile < 768px) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 pl-6 pr-4">Opportunity</th>
              <th className="py-3.5 px-4">Location & Mode</th>
              <th className="py-3.5 px-4 text-center">Match</th>
              <th className="py-3.5 px-4">Applied Date</th>
              <th className="py-3.5 px-4">Pipeline Status</th>
              <th className="py-3.5 px-4">Next Action</th>
              <th className="py-3.5 px-4">Last Updated</th>
              <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {applications.map((app) => {
              const badge = getStageBadge(app.status)

              return (
                <tr
                  key={app.id}
                  onClick={() => onSelectApplication(app)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  {/* Job & Company */}
                  <td className="py-3.5 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-2xs"
                        style={{
                          backgroundColor: app.companyColor || '#4F46E5',
                        }}
                      >
                        {app.companyLogoText || app.company.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate max-w-[200px] xl:max-w-[260px]">
                          {app.jobTitle}
                        </div>
                        <div className="text-xs text-slate-500 font-medium truncate">
                          {app.company}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Location & Mode */}
                  <td className="py-3.5 px-4">
                    <div className="text-xs text-slate-700 font-medium truncate max-w-[140px]">
                      {app.location}
                    </div>
                    <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-slate-100 text-[10px] font-semibold text-slate-600">
                      {app.workMode}
                    </span>
                  </td>

                  {/* Match Score */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        app.matchScore >= 90
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      {app.matchScore}%
                    </span>
                  </td>

                  {/* Applied Date */}
                  <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                    {app.appliedAt}
                  </td>

                  {/* Status Dropdown */}
                  <td
                    className="py-3.5 px-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      value={normalizeStatus(app.status)}
                      onChange={(e) =>
                        onUpdateStatus(
                          app.id,
                          e.target.value as ApplicationStatus
                        )
                      }
                      className={`text-xs font-bold py-1 px-2 rounded-lg border cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 ${badge.bgColor} ${badge.color} ${badge.borderColor}`}
                      aria-label={`Update pipeline status for ${app.jobTitle}`}
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
                  </td>

                  {/* Next Action */}
                  <td className="py-3.5 px-4">
                    {app.nextAction ? (
                      <div className="max-w-[180px] truncate">
                        <div className="text-xs font-semibold text-slate-800 truncate flex items-center gap-1">
                          {app.nextAction.isOverdue ? (
                            <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                          ) : (
                            <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                          )}
                          <span className="truncate">{app.nextAction.action}</span>
                        </div>
                        {app.nextAction.dueDate && (
                          <div className="text-[11px] text-slate-400 truncate">
                            {app.nextAction.dueDate}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">None set</span>
                    )}
                  </td>

                  {/* Last Updated */}
                  <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                    {app.lastUpdated || 'Recently'}
                  </td>

                  {/* Actions */}
                  <td
                    className="py-3.5 pl-4 pr-6 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onAddNote(app)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition-colors"
                        title="Add note"
                        aria-label="Add note to application"
                      >
                        <PlusCircle className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectApplication(app)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 2. Mobile Responsive Stacked Card Layout (< 768px) */}
      <div className="md:hidden divide-y divide-slate-100">
        {applications.map((app) => {
          const badge = getStageBadge(app.status)

          return (
            <div
              key={app.id}
              onClick={() => onSelectApplication(app)}
              className="p-4 hover:bg-slate-50 transition-colors space-y-3"
            >
              {/* Top Row: Logo + Job Title + Match Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0"
                    style={{
                      backgroundColor: app.companyColor || '#4F46E5',
                    }}
                  >
                    {app.companyLogoText || app.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 truncate">
                      {app.jobTitle}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {app.company}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                    app.matchScore >= 90
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  {app.matchScore}%
                </span>
              </div>

              {/* Middle: Location, Work Mode & Applied Date */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {app.location} ({app.workMode})
                </span>
                <span className="text-slate-400 shrink-0">{app.appliedAt}</span>
              </div>

              {/* Next Action Pill if any */}
              {app.nextAction && (
                <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900">
                  <div className="font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>{app.nextAction.action}</span>
                  </div>
                  {app.nextAction.dueDate && (
                    <div className="text-[11px] text-slate-500 mt-0.5 ml-4">
                      Due: {app.nextAction.dueDate}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Row: Status changer & Details button */}
              <div
                className="pt-2 flex items-center justify-between gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <select
                  value={normalizeStatus(app.status)}
                  onChange={(e) =>
                    onUpdateStatus(
                      app.id,
                      e.target.value as ApplicationStatus
                    )
                  }
                  className={`text-xs font-bold py-1 px-2.5 rounded-lg border ${badge.bgColor} ${badge.color} ${badge.borderColor}`}
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

                <button
                  type="button"
                  onClick={() => onSelectApplication(app)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
