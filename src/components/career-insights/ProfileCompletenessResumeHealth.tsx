import React from 'react'
import { UserCheck, FileCheck, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { CareerInsightsReport } from '@/services/careerInsightsService'

interface ProfileCompletenessResumeHealthProps {
  completeness: CareerInsightsReport['profileCompleteness']
  resumeHealth: CareerInsightsReport['resumeHealth']
  onCompleteProfile: () => void
  onImproveResume: () => void
}

export const ProfileCompletenessResumeHealth: React.FC<ProfileCompletenessResumeHealthProps> = ({
  completeness,
  resumeHealth,
  onCompleteProfile,
  onImproveResume,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Profile Completeness */}
      <Card className="p-5 bg-white border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Profile Completeness
              </h3>
            </div>
            <Badge variant={completeness.percentage >= 80 ? 'emerald' : 'amber'} size="sm">
              {completeness.percentage}% Complete
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${completeness.percentage}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400">
              Profiles above 80% completeness receive 2.4x higher AI matching confidence.
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-1.5 pt-1">
            {completeness.completedChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Missing items */}
          {completeness.missingItems.length > 0 && (
            <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900 space-y-1">
              <div className="font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Recommended additions to reach 100%:</span>
              </div>
              <ul className="list-disc pl-4 text-[11px] text-amber-800">
                {completeness.missingItems.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100">
          <Button
            variant="secondary"
            size="sm"
            onClick={onCompleteProfile}
            className="w-full text-xs h-8"
          >
            Complete Remaining Items
          </Button>
        </div>
      </Card>

      {/* 2. Resume Health Card */}
      <Card className="p-5 bg-white border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Resume Health (Screen #6 Sync)
              </h3>
            </div>
            <Badge variant="emerald" size="sm">
              {resumeHealth.overallScore}/100 Overall
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-[11px] text-slate-500">ATS Score</div>
              <div className="text-base font-bold text-slate-900">{resumeHealth.atsScore}%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-[11px] text-slate-500">Keywords</div>
              <div className="text-base font-bold text-slate-900">{resumeHealth.keywordCoverage}%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-[11px] text-slate-500">Readability</div>
              <div className="text-base font-bold text-slate-900">{resumeHealth.readabilityScore}%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-[11px] text-slate-500">Skills Fit</div>
              <div className="text-base font-bold text-slate-900">{resumeHealth.skillsRelevance}%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-[11px] text-slate-500">Projects Fit</div>
              <div className="text-base font-bold text-slate-900">{resumeHealth.projectRelevance}%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-[11px] text-slate-500">Formatting</div>
              <div className="text-base font-bold text-emerald-600">Standard A4</div>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Based on direct ATS parser simulation auditing header hierarchy, bullet quantification, and keyword frequency.
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <Button
            variant="primary"
            size="sm"
            onClick={onImproveResume}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="w-full text-xs h-8 shadow-2xs"
          >
            Open in Resume Builder
          </Button>
        </div>
      </Card>
    </div>
  )
}
