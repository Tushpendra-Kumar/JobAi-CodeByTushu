import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  FileText,
  CheckCircle2,
  Edit3,
  Eye,
  FileCheck,
  Upload,
} from 'lucide-react'
import type { ResumeSettingsData } from '@/services/profileSettingsService'
import {
  getSavedResumeVersions,
  type ResumeDraftVersion,
} from '@/services/resumeVersionService'

interface ResumeSettingsSectionProps {
  data: ResumeSettingsData
  onChange: (updated: Partial<ResumeSettingsData>) => void
  onNavigateToBuilder: () => void
  onNavigateToAnalysis: () => void
  onNavigateToUpload: () => void
}

const TEMPLATES: { id: ResumeSettingsData['defaultTemplateId']; name: string; desc: string }[] = [
  { id: 'modern', name: 'Modern ATS', desc: 'Clean header, subtle badges, high scan rate.' },
  { id: 'classic', name: 'Classic Serif', desc: 'Traditional academic & executive serif format.' },
  { id: 'minimal', name: 'Minimal Tech', desc: 'Dense, developer-first single page layout.' },
]

const LENGTHS: ResumeSettingsData['defaultLength'][] = ['1 Page', '2 Pages', 'Auto']

export const ResumeSettingsSection: React.FC<ResumeSettingsSectionProps> = ({
  data,
  onChange,
  onNavigateToBuilder,
  onNavigateToAnalysis,
  onNavigateToUpload,
}) => {
  const [resumeVersions] = useState<ResumeDraftVersion[]>(() => getSavedResumeVersions())
  const [viewVersionModal, setViewVersionModal] = useState<ResumeDraftVersion | null>(null)

  const activeResume =
    resumeVersions.find((r) => r.id === data.defaultResumeId) || resumeVersions[0]

  return (
    <Card className="p-6 border-slate-200/90 shadow-sm space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">Resume Preferences & Defaults</h3>
          <Badge variant="indigo" size="sm">
            Document Automation
          </Badge>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Select which resume version and styling template JobAI uses by default for job matches, ATS audits, and auto-apply submissions.
        </p>
      </div>

      {/* Active Default Resume Card */}
      <div className="p-4 rounded-2xl border-2 border-indigo-200/80 bg-gradient-to-br from-indigo-50/40 via-white to-white space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-xs shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Active Default Resume
                </span>
                <Badge variant="emerald" size="sm" className="text-[10px]">
                  Default for Applications
                </Badge>
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">
                {activeResume?.name || 'Master Resume (Verified)'}
              </h4>
              <p className="text-xs text-slate-500">
                Target Role: <strong className="text-slate-700">{activeResume?.targetRole}</strong> • Last Modified: {activeResume?.lastModified}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewVersionModal(activeResume)}
              leftIcon={<Eye className="w-3.5 h-3.5" />}
              className="text-xs py-1 px-2.5"
            >
              Quick View
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onNavigateToBuilder}
              leftIcon={<Edit3 className="w-3.5 h-3.5" />}
              className="text-xs py-1 px-2.5"
            >
              Open in Builder
            </Button>
          </div>
        </div>

        {/* Quick Screen Links */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-indigo-100/60 text-xs">
          <span className="text-slate-400 text-[11px] font-medium">Quick actions:</span>
          <button
            type="button"
            onClick={onNavigateToAnalysis}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5" />
            Run ATS Diagnostic (Screen #6)
          </button>
          <span className="text-slate-300">•</span>
          <button
            type="button"
            onClick={onNavigateToUpload}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload New File (Screen #5)
          </button>
        </div>
      </div>

      {/* Choose from Saved Resume Drafts */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs font-bold text-slate-700">
          Switch Default Resume Version
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {resumeVersions.map((version) => {
            const isSelected = data.defaultResumeId === version.id
            return (
              <div
                key={version.id}
                onClick={() => onChange({ defaultResumeId: version.id })}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-50/70 border-indigo-400 text-indigo-950 ring-1 ring-indigo-400/40 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="truncate pr-1">{version.name}</span>
                  {isSelected ? (
                    <Badge variant="indigo" size="sm">
                      Active
                    </Badge>
                  ) : (
                    <span className="text-[11px] text-slate-400">Click to set</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Role: {version.targetRole} • {version.lastModified}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Default Template Selection */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <label className="block text-xs font-bold text-slate-700">
          Default ATS Template Style
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TEMPLATES.map((tmpl) => {
            const isSelected = data.defaultTemplateId === tmpl.id
            return (
              <div
                key={tmpl.id}
                onClick={() => onChange({ defaultTemplateId: tmpl.id })}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-50/70 border-indigo-400 text-indigo-950 ring-1 ring-indigo-400/40 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>{tmpl.name}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-tight mt-1">{tmpl.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Target Length & Language */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
        {/* Resume Length */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Target Resume Length</label>
          <div className="grid grid-cols-3 gap-2">
            {LENGTHS.map((len) => (
              <button
                key={len}
                type="button"
                onClick={() => onChange({ defaultLength: len })}
                className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                  data.defaultLength === len
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {len}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400">
            1 Page recommended for &lt; 5 years experience to maximize ATS scanning efficiency.
          </p>
        </div>

        {/* Resume Language */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Document Language</label>
          <select
            value={data.defaultLanguage}
            onChange={(e) => onChange({ defaultLanguage: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="English (US)">English (US)</option>
            <option value="English (UK)">English (UK)</option>
            <option value="English (India)">English (India)</option>
          </select>
          <p className="text-[11px] text-slate-400">
            Affects spellcheck locale and date formatting standards (MM/YYYY vs DD/MM/YYYY).
          </p>
        </div>
      </div>

      {/* Quick View Modal */}
      {viewVersionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {viewVersionModal.name}
                </h4>
                <p className="text-xs text-slate-500">
                  Target: {viewVersionModal.targetRole} • Template: {viewVersionModal.templateId}
                </p>
              </div>
              <Badge variant="indigo" size="sm">
                Default Draft
              </Badge>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/80 font-mono">
              <div className="font-bold text-slate-900">
                {viewVersionModal.resumeData.personalInfo?.name}
              </div>
              <div className="text-slate-500">
                {viewVersionModal.resumeData.personalInfo?.email} •{' '}
                {viewVersionModal.resumeData.personalInfo?.phone} •{' '}
                {viewVersionModal.resumeData.personalInfo?.location}
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-indigo-700">Experience Count:</span>{' '}
                {viewVersionModal.resumeData.workExperience?.length || 0} positions recorded
              </div>
              <div>
                <span className="font-bold text-indigo-700">Projects Count:</span>{' '}
                {viewVersionModal.resumeData.projects?.length || 0} projects recorded
              </div>
              <div>
                <span className="font-bold text-indigo-700">Education:</span>{' '}
                {viewVersionModal.resumeData.education?.[0]?.degree || 'B.Tech CS'}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewVersionModal(null)}
                className="text-xs"
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setViewVersionModal(null)
                  onNavigateToBuilder()
                }}
                className="text-xs"
                leftIcon={<Edit3 className="w-3.5 h-3.5" />}
              >
                Open in Full Editor
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
