import React from 'react'
import { ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { ApplicationReadiness } from '@/data/jobsData'

export interface ApplicationReadinessCardProps {
  readiness: ApplicationReadiness
  onImproveProfile: () => void
}

export const ApplicationReadinessCard: React.FC<ApplicationReadinessCardProps> = ({
  readiness,
  onImproveProfile,
}) => {
  return (
    <Card className="p-6 border-slate-200/90 bg-white shadow-xs text-left mb-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Application Readiness
          </h3>
        </div>
        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          {readiness.score}%
        </span>
      </div>

      {/* Checklist */}
      <div className="py-4 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-600 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Resume Match
          </span>
          <span className="font-bold text-slate-900">{readiness.resumeMatch}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Skills Match
          </span>
          <span className="font-bold text-slate-900">{readiness.skillsMatch}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
            Profile Completeness
          </span>
          <span className="font-bold text-slate-900">{readiness.profileCompleteness}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Application Content
          </span>
          <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] border border-emerald-200">
            {readiness.applicationContent}
          </span>
        </div>
      </div>

      {/* Advisory Message */}
      <p className="text-[11px] text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
        {readiness.message}
      </p>

      {/* Action CTA */}
      <div className="pt-4">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onImproveProfile}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="w-full justify-center text-xs h-9 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
        >
          Improve Profile
        </Button>
      </div>
    </Card>
  )
}
