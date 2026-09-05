import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Send,
  ShieldCheck,
  FileSignature,
  AlertTriangle,
  Info,
} from 'lucide-react'
import type { ApplicationSettingsData } from '@/services/profileSettingsService'
import { getSavedCoverLetters, type SavedCoverLetter } from '@/services/coverLetterService'
import { getSavedResumeVersions, type ResumeDraftVersion } from '@/services/resumeVersionService'

interface ApplicationSettingsSectionProps {
  data: ApplicationSettingsData
  onChange: (updated: Partial<ApplicationSettingsData>) => void
  onNavigateToAutoApply: () => void
  onNavigateToApplications: () => void
  onNavigateToCoverLetter: () => void
}

export const ApplicationSettingsSection: React.FC<ApplicationSettingsSectionProps> = ({
  data,
  onChange,
  onNavigateToAutoApply,
  onNavigateToApplications,
  onNavigateToCoverLetter,
}) => {
  const [coverLetters] = useState<SavedCoverLetter[]>(() => getSavedCoverLetters())
  const [resumes] = useState<ResumeDraftVersion[]>(() => getSavedResumeVersions())

  return (
    <Card className="p-6 border-slate-200/90 shadow-sm space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">Application Defaults & Safety</h3>
          <Badge variant="indigo" size="sm">
            Screen #8 & #9 Config
          </Badge>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure default assets and supervisory controls for Screen #8 AI Auto Apply and Screen #9 Application Tracking.
        </p>
      </div>

      {/* Mandatory Human Review Safety Control (Default: ON) */}
      <div className="p-4.5 rounded-2xl bg-gradient-to-br from-indigo-50/60 via-white to-emerald-50/30 border-2 border-indigo-200 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-xs shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">
                  Require My Approval Before Any Application Submission
                </h4>
                <Badge variant="emerald" size="sm">
                  Mandatory Safety Gate
                </Badge>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                JobAI prepares application responses, tailors cover letters, and checks ATS keywords, but you always review and click approve before any submission is finalized. JobAI never silently spams or submits without your explicit consent.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={data.reviewRequiredBeforeSubmit}
              onChange={(e) => {
                if (!e.target.checked) {
                  const confirmOff = window.confirm(
                    'Safety Warning: Disabling manual approval means JobAI will queue automated dispatches. Are you sure you want to bypass manual review?'
                  )
                  if (!confirmOff) return
                }
                onChange({ reviewRequiredBeforeSubmit: e.target.checked })
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {!data.reviewRequiredBeforeSubmit && (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Manual approval is disabled. We strongly recommend keeping this ON to protect your recruiter reputation.
            </span>
          </div>
        )}
      </div>

      {/* Auto-Fill & Cover Letter Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Auto-Fill Information */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="font-bold text-xs text-slate-800 flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-indigo-600" />
              <span>Auto-Fill Screening Answers</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Pre-populate standard questions (notice period, city, years of experience) from your profile.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={data.autoFillEnabled}
              onChange={(e) => onChange({ autoFillEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {/* AI Cover Letter Assistance */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="font-bold text-xs text-slate-800 flex items-center gap-2">
              <FileSignature className="w-3.5 h-3.5 text-indigo-600" />
              <span>Include AI Cover Letter</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Automatically attach tailored, factual cover letter drafts to applications where requested.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={data.coverLetterAssistanceEnabled}
              onChange={(e) => onChange({ coverLetterAssistanceEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>

      {/* Default Documents Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
        {/* Default Resume for Applications */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">
              Default Resume Attachment
            </label>
            <span className="text-[11px] text-indigo-600 font-semibold">
              {resumes.length} versions saved
            </span>
          </div>
          <select
            value={data.defaultResumeId}
            onChange={(e) => onChange({ defaultResumeId: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {resumes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.targetRole})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400">
            Attached automatically when jobs are queued in Screen #8 Auto Apply.
          </p>
        </div>

        {/* Default Cover Letter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">
              Default Cover Letter Draft
            </label>
            <button
              type="button"
              onClick={onNavigateToCoverLetter}
              className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
            >
              Open Studio (Screen #10)
            </button>
          </div>
          <select
            value={data.defaultCoverLetterId}
            onChange={(e) => onChange({ defaultCoverLetterId: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {coverLetters.map((cl) => (
              <option key={cl.id} value={cl.id}>
                {cl.company} — {cl.jobTitle}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400">
            Base letterhead draft adapted dynamically for matching companies.
          </p>
        </div>
      </div>

      {/* Default Application Notes */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="block text-xs font-bold text-slate-700">
          Default Private Notes & Disclaimer
        </label>
        <textarea
          rows={3}
          value={data.defaultNotes}
          onChange={(e) => onChange({ defaultNotes: e.target.value })}
          placeholder="e.g. Prepared via JobAI Career Copilot. Prioritize full-remote and hybrid Bangalore roles."
          className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none leading-relaxed"
        />
        <p className="text-[11px] text-slate-400">
          Attached internally to application records in Screen #9 Application Tracking dashboard.
        </p>
      </div>

      {/* Screen Navigation Quick Shortcuts */}
      <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <Info className="w-4 h-4 text-indigo-600" />
          <span>Need to check queued opportunities or active pipeline?</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNavigateToAutoApply}
            className="font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            Auto Apply (#8)
          </button>
          <span className="text-slate-300">•</span>
          <button
            type="button"
            onClick={onNavigateToApplications}
            className="font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            Tracking (#9)
          </button>
        </div>
      </div>
    </Card>
  )
}
