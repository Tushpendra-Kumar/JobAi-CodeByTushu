import React from 'react'
import { Bell, Clock, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { TrackedApplication } from '@/services/applicationTrackingService'

interface FollowUpRemindersCardProps {
  applicationsWithActions: TrackedApplication[]
  onSelectApplication: (app: TrackedApplication) => void
  onMarkActionDone: (appId: string) => void
}

export const FollowUpRemindersCard: React.FC<FollowUpRemindersCardProps> = ({
  applicationsWithActions,
  onSelectApplication,
  onMarkActionDone,
}) => {
  if (applicationsWithActions.length === 0) return null

  return (
    <section aria-label="Imminent Next Actions" className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/80 rounded-2xl p-4 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
            <Bell className="w-4 h-4" />
          </span>
          <h2 className="text-sm font-bold text-amber-950">
            Imminent Follow-Ups & Next Actions ({applicationsWithActions.length})
          </h2>
        </div>
        <span className="text-[11px] text-amber-700 font-medium">
          Local reminders for active interview pipelines
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {applicationsWithActions.slice(0, 4).map((app) => {
          const action = app.nextAction!
          return (
            <div
              key={app.id}
              className="bg-white/90 border border-amber-200/70 rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs hover:border-amber-400 transition-all"
            >
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {app.jobTitle}
                  </span>
                  <span className="text-[11px] text-slate-500 truncate">
                    • {app.company}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-amber-900 font-medium">
                  {action.isOverdue ? (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  )}
                  <span className="truncate">{action.action}</span>
                </div>

                {action.dueDate && (
                  <div className="text-[11px] text-slate-400">
                    Due: {action.dueDate}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMarkActionDone(app.id)}
                  className="h-7 px-2 text-[11px] text-emerald-700 hover:bg-emerald-50 border-emerald-200 font-semibold"
                  title="Mark action as completed"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  <span>Done</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectApplication(app)}
                  className="h-7 px-2 text-[11px] text-slate-600 hover:text-indigo-600"
                >
                  <span>View</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
