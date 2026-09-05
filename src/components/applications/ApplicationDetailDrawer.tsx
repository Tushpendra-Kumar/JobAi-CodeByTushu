import React, { useState } from 'react'
import {
  X,
  MapPin,
  Sparkles,
  Building2,
  Calendar,
  Clock,
  FileText,
  Mail,
  ExternalLink,
  Edit3,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type {
  TrackedApplication,
  ApplicationStatus,
  ApplicationNextAction,
} from '@/services/applicationTrackingService'
import {
  normalizeStatus,
  PIPELINE_STAGES,
} from '@/services/applicationTrackingService'
import { ApplicationTimelineView } from './ApplicationTimelineView'
import { ApplicationNotesSection } from './ApplicationNotesSection'

interface ApplicationDetailDrawerProps {
  application: TrackedApplication | null
  isOpen: boolean
  onClose: () => void
  onUpdateStatus: (id: string, newStatus: ApplicationStatus, note?: string) => void
  onAddNote: (appId: string, noteText: string) => void
  onDeleteNote: (appId: string, noteId: string) => void
  onUpdateNextAction: (appId: string, nextAction: ApplicationNextAction | undefined) => void
  onNavigateToResumeBuilder?: () => void
  onViewCoverLetter?: (app: TrackedApplication) => void
  onViewJobDetails?: (jobId: string) => void
}

export const ApplicationDetailDrawer: React.FC<ApplicationDetailDrawerProps> = ({
  application,
  isOpen,
  onClose,
  onUpdateStatus,
  onAddNote,
  onDeleteNote,
  onUpdateNextAction,
  onNavigateToResumeBuilder,
  onViewCoverLetter,
  onViewJobDetails,
}) => {
  const [isEditingNextAction, setIsEditingNextAction] = useState(false)
  const [actionTitle, setActionTitle] = useState('')
  const [actionDueDate, setActionDueDate] = useState('')
  const [actionNote, setActionNote] = useState('')

  if (!isOpen || !application) return null

  const normStatus = normalizeStatus(application.status)
  const stageConfig = PIPELINE_STAGES.find((s) => s.id === normStatus)

  const handleStartEditNextAction = () => {
    setActionTitle(application.nextAction?.action || '')
    setActionDueDate(application.nextAction?.dueDate || '')
    setActionNote(application.nextAction?.note || '')
    setIsEditingNextAction(true)
  }

  const handleSaveNextAction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!actionTitle.trim()) {
      onUpdateNextAction(application.id, undefined)
    } else {
      onUpdateNextAction(application.id, {
        action: actionTitle.trim(),
        dueDate: actionDueDate.trim() || undefined,
        note: actionNote.trim() || undefined,
        isOverdue: false,
      })
    }
    setIsEditingNextAction(false)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/60 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0 shadow-xs"
                style={{
                  backgroundColor: application.companyColor || '#4F46E5',
                }}
              >
                {application.companyLogoText || application.company.slice(0, 2).toUpperCase()}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                    {application.jobTitle}
                  </h2>
                  <Badge
                    variant={application.matchScore >= 90 ? 'emerald' : 'indigo'}
                    size="sm"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {application.matchScore}% Match
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mt-1 font-medium flex-wrap">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {application.company}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {application.location}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-xs font-semibold">
                    {application.workMode}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              aria-label="Close application drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* 1. Status Management Bar */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Current Pipeline Stage
                </span>
                <span className="text-xs text-slate-400">
                  Updated: {application.lastUpdated || 'Recently'}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={normStatus}
                  onChange={(e) =>
                    onUpdateStatus(
                      application.id,
                      e.target.value as ApplicationStatus
                    )
                  }
                  className={`text-sm font-bold py-1.5 px-3 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${stageConfig?.bgColor} ${stageConfig?.color} ${stageConfig?.borderColor}`}
                >
                  <option value="Saved">Saved</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Ready to Apply">Ready to Apply</option>
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Withdrawn">Withdrawn</option>
                </select>

                <div className="text-xs text-slate-500">
                  Selecting a stage logs a timestamped event to the timeline.
                </div>
              </div>
            </div>

            {/* 2. Next Action Callout & Editor */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Next Action / Reminder
                  </h3>
                </div>

                {!isEditingNextAction && (
                  <button
                    type="button"
                    onClick={handleStartEditNextAction}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>{application.nextAction ? 'Edit' : 'Set Action'}</span>
                  </button>
                )}
              </div>

              {isEditingNextAction ? (
                <form onSubmit={handleSaveNextAction} className="space-y-2 pt-2">
                  <input
                    type="text"
                    placeholder="Action item (e.g. Technical Round 2 with Lead Architect)..."
                    value={actionTitle}
                    onChange={(e) => setActionTitle(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    autoFocus
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Due date (e.g. Tomorrow, 3:00 PM)"
                      value={actionDueDate}
                      onChange={(e) => setActionDueDate(e.target.value)}
                      className="text-xs p-2 bg-white border border-amber-300 rounded-lg focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Optional note"
                      value={actionNote}
                      onChange={(e) => setActionNote(e.target.value)}
                      className="text-xs p-2 bg-white border border-amber-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => setIsEditingNextAction(false)}
                      className="text-xs h-7"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      type="submit"
                      className="text-xs h-7 bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Save Action
                    </Button>
                  </div>
                </form>
              ) : application.nextAction ? (
                <div className="space-y-1">
                  <div className="text-sm font-bold text-amber-950 flex items-center gap-2">
                    <span>{application.nextAction.action}</span>
                    {application.nextAction.dueDate && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        {application.nextAction.dueDate}
                      </span>
                    )}
                  </div>
                  {application.nextAction.note && (
                    <p className="text-xs text-amber-800/90 leading-relaxed">
                      {application.nextAction.note}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-amber-700 italic">
                  No next action set. Click “Set Action” to schedule interview prep, follow-up, or review reminders.
                </p>
              )}
            </div>

            {/* 3. Job & Application Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Job Info */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Opportunity Details
                  </h3>
                  {application.jobId && onViewJobDetails && (
                    <button
                      type="button"
                      onClick={() => onViewJobDetails(application.jobId)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>View Job</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Compensation:</span>
                    <span className="font-semibold text-slate-800">
                      {application.salary || 'Not specified'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Application Source:</span>
                    <span className="font-semibold text-slate-800">
                      {application.source || 'Company Website'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Work Mode:</span>
                    <span className="font-semibold text-slate-800">
                      {application.workMode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Application Tracking Metadata */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tracking Records
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Confirmation Code:</span>
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                      {application.confirmationCode || 'JOBAI-APP-PENDING'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Applied Date:</span>
                    <span className="font-semibold text-slate-800">
                      {application.appliedAt}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Readiness Score:</span>
                    <span className="font-semibold text-slate-800">
                      {application.readinessScore || application.matchScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Resume & Cover Letter Connection */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Linked Resume & Cover Letter
                  </h3>
                </div>
                <Badge variant="slate" size="sm">
                  Truthful Credentials
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Resume Card */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {application.resumeVersionName || 'Master Resume'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      ATS Quality Score: 88/100
                    </div>
                  </div>

                  {onNavigateToResumeBuilder && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onNavigateToResumeBuilder}
                      className="text-xs h-7 w-full flex items-center justify-center gap-1 border-slate-300"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit in Resume Builder</span>
                    </Button>
                  )}
                </div>

                {/* Cover Letter Card */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Cover Letter
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Status: {application.coverLetterText ? 'Generated & Grounded' : 'None'}
                    </div>
                  </div>

                  {application.coverLetterText && onViewCoverLetter ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewCoverLetter(application)}
                      className="text-xs h-7 w-full flex items-center justify-center gap-1 border-slate-300 text-indigo-700 hover:bg-indigo-50"
                    >
                      <Mail className="w-3 h-3 text-indigo-600" />
                      <span>View Cover Letter</span>
                    </Button>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">No cover letter recorded</span>
                  )}
                </div>
              </div>
            </div>

            {/* 5. Application Timeline */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Application History & Timeline
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">
                  {application.timeline?.length || 0} events
                </span>
              </div>

              <ApplicationTimelineView timeline={application.timeline} />
            </div>

            {/* 6. Private Notes Section */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <ApplicationNotesSection
                appId={application.id}
                notesList={application.notesList}
                legacyNotes={application.notes}
                onAddNote={(text) => onAddNote(application.id, text)}
                onDeleteNote={(noteId) => onDeleteNote(application.id, noteId)}
              />
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Demo application record • Local storage persisted
            </div>

            <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
              Close Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
