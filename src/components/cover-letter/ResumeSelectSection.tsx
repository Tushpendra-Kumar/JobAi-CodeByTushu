import React from 'react'
import { CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { ResumeDraftVersion } from '@/services/resumeVersionService'

interface ResumeSelectSectionProps {
  resumeVersions: ResumeDraftVersion[]
  selectedVersionId: string
  onSelectVersion: (versionId: string) => void
  onNavigateToBuilder?: () => void
}

export const ResumeSelectSection: React.FC<ResumeSelectSectionProps> = ({
  resumeVersions,
  selectedVersionId,
  onSelectVersion,
  onNavigateToBuilder,
}) => {
  const selectedResume = resumeVersions.find((r) => r.id === selectedVersionId)

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold text-sm">
            2
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">Source Resume Profile</h2>
            <p className="text-xs text-slate-500">
              Select which verified resume data to ground your cover letter upon
            </p>
          </div>
        </div>

        {onNavigateToBuilder && (
          <button
            type="button"
            onClick={onNavigateToBuilder}
            className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <span>Resume Builder</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {resumeVersions.map((draft) => {
          const isSelected = draft.id === selectedVersionId
          const skillCount = draft.resumeData.skills
            ? Object.values(draft.resumeData.skills).flat().length
            : 0
          const expCount = draft.resumeData.workExperience?.length || 0
          const projCount = draft.resumeData.projects?.length || 0

          return (
            <div
              key={draft.id}
              onClick={() => onSelectVersion(draft.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className="font-semibold text-xs text-slate-900 line-clamp-1">
                    {draft.name}
                  </span>
                </div>
                {isSelected && (
                  <Badge variant="indigo" size="sm">
                    Active Source
                  </Badge>
                )}
              </div>

              <div className="text-[11px] text-slate-500 space-y-1 pl-6">
                <div>Target Role: {draft.targetRole}</div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span>{expCount} Experience</span>
                  <span>•</span>
                  <span>{projCount} Projects</span>
                  <span>•</span>
                  <span>{skillCount} Skills</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {selectedResume && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/60 text-[11px] text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Candidate profile:{' '}
            <strong className="text-slate-800 font-semibold">
              {selectedResume.resumeData.personalInfo?.name || 'Tushpendra Kumar'}
            </strong>{' '}
            • Grounded on verified projects (
            {selectedResume.resumeData.projects?.map((p) => p.name).join(', ') || 'JobAI'}) and
            work history.
          </span>
        </div>
      )}
    </Card>
  )
}
