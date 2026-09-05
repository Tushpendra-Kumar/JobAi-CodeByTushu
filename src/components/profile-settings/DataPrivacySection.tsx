import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  Download,
  RotateCcw,
  Sparkles,
  FileText,
  Briefcase,
  User,
} from 'lucide-react'
import type { UserProfileSettings } from '@/services/profileSettingsService'
import { exportUserDataJson } from '@/services/profileSettingsService'

interface DataPrivacySectionProps {
  settings: UserProfileSettings
  onResetPreferences: () => void
  onClearAiPersonalization: () => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

const DATA_CATEGORIES = [
  {
    title: 'Profile & Identity Data',
    icon: User,
    desc: 'Full name, verified email, phone number, city, and linked social handles.',
    usage: 'Used to calibrate role fit scoring, pre-populate application fields, and generate tailored resume headers.',
  },
  {
    title: 'Resume & Document Data',
    icon: FileText,
    desc: 'Structured resume drafts, work history bullets, education, and verified skills inventory.',
    usage: 'Audited by Screen #6 ATS Analyzer and formatted into recruiter-ready templates in Screen #7 Resume Builder.',
  },
  {
    title: 'Application & Pipeline Data',
    icon: Briefcase,
    desc: 'Tracked job submissions, application stage transitions, private notes, and interview schedules.',
    usage: 'Monitored in Screen #9 Kanban Board and synthesized into truthful response rate telemetry in Screen #11.',
  },
  {
    title: 'AI Personalization & Preferences',
    icon: Sparkles,
    desc: 'Target roles, salary expectations, remote mode choices, and matching priority weights.',
    usage: 'Calibrates sorting algorithms in Screen #2 and fine-tunes generation tone in Screen #10 Cover Letter Studio.',
  },
]

export const DataPrivacySection: React.FC<DataPrivacySectionProps> = ({
  settings,
  onResetPreferences,
  onClearAiPersonalization,
  onToast,
}) => {
  const handleExportData = () => {
    exportUserDataJson(settings)
    onToast('Profile and settings data exported as JSON.', 'success')
  }

  return (
    <Card className="p-6 border-slate-200/90 shadow-sm space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">Data Ownership & Privacy</h3>
          <Badge variant="indigo" size="sm">
            Data Transparency
          </Badge>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          JobAI operates with complete data transparency. Learn how your data is utilized and export or reset your preferences anytime.
        </p>
      </div>

      {/* Categories Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DATA_CATEGORIES.map((cat) => {
          const Icon = cat.icon
          return (
            <div
              key={cat.title}
              className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">{cat.title}</h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">{cat.desc}</p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 leading-normal">
                <strong className="text-slate-800 font-semibold">How it is used: </strong>
                {cat.usage}
              </div>
            </div>
          )
        })}
      </div>

      {/* Data Export & Controls Shelf */}
      <div className="pt-2 space-y-3 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          User Data Actions
        </h4>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Download className="w-4 h-4 text-indigo-600" />
              <span>Download My Complete Profile Data</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Download a clean, structured JSON file containing all your profile information, skills, job preferences, and AI configurations.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="text-xs shrink-0 bg-white"
          >
            Download JSON
          </Button>
        </div>

        {/* Clear AI Personalization & Reset */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-slate-800">Reset AI Weights</div>
              <p className="text-[11px] text-slate-500">
                Restore default balanced weights for job ranking and tone.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={onClearAiPersonalization}
              className="text-xs py-1 px-2.5 h-8 shrink-0"
            >
              Reset AI
            </Button>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-slate-800">Reset All Preferences</div>
              <p className="text-[11px] text-slate-500">
                Restore all settings across all categories to default values.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onResetPreferences}
              leftIcon={<RotateCcw className="w-3 h-3" />}
              className="text-xs py-1 px-2.5 h-8 shrink-0 text-slate-600"
            >
              Reset All
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
