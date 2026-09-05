import React from 'react'
import {
  Sparkles,
  AlertCircle,
  Wand2,
  FileEdit,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export interface ImprovementPlanAndPreviewSectionProps {
  onImproveResume: () => void
  beforeAfterPreview: {
    context: string
    before: string
    after: string
    note: string
  }
}

export const ImprovementPlanAndPreviewSection: React.FC<ImprovementPlanAndPreviewSectionProps> = ({
  onImproveResume,
  beforeAfterPreview,
}) => {
  const steps = [
    {
      number: '01',
      title: 'Improve Keyword Alignment',
      description: 'Incorporate missing target role keywords (e.g., automated testing, CI/CD) into your skills and summary.',
    },
    {
      number: '02',
      title: 'Strengthen Project Descriptions',
      description: 'Detail architecture choices, state management, and real problem-solving context across your top portfolio projects.',
    },
    {
      number: '03',
      title: 'Improve Experience Bullet Impact',
      description: 'Reframe duty descriptions into proactive engineering contributions using strong action verbs and technical ownership.',
    },
    {
      number: '04',
      title: 'Re-run AI Analysis',
      description: 'Re-upload or re-analyze the updated profile to verify score improvements and enhanced ATS indexing.',
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
      {/* 1. 4-Step Resume Improvement Plan (col-span-7) */}
      <Card className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Action Roadmap
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Your 4-Step Resume Improvement Plan
            </h3>
          </div>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onImproveResume}
            leftIcon={<Wand2 className="w-3.5 h-3.5" />}
            className="text-xs bg-indigo-600 hover:bg-indigo-700 self-start sm:self-auto shadow-xs"
          >
            Improve My Resume
          </Button>
        </div>

        {/* 4 Steps Visual Timeline */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50/60 border border-slate-200/60 hover:border-indigo-200 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                {step.number}
              </div>

              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 2. Before / After Preview (col-span-5) */}
      <Card className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white via-indigo-50/20 to-white border border-indigo-100/90 shadow-sm space-y-5">
        <div className="space-y-1 pb-4 border-b border-indigo-100">
          <div className="flex items-center gap-2">
            <FileEdit className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              AI Improvement Preview
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Bullet Rewriting Sample
          </h3>
          <p className="text-xs text-slate-500">
            {beforeAfterPreview.context}
          </p>
        </div>

        {/* Before Card */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Before (Current Bullet)</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
              Generic Duty
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 italic leading-relaxed">
            “{beforeAfterPreview.before}”
          </div>
        </div>

        {/* After Card */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              After (AI Enhanced Bullet)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Engineering Action
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200/80 text-xs text-emerald-950 font-medium leading-relaxed">
            “{beforeAfterPreview.after}”
          </div>
        </div>

        {/* AI Disclaimer / Human Review Note */}
        <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-2 text-[11px] text-indigo-900">
          <AlertCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            <strong>Review before applying:</strong> {beforeAfterPreview.note} AI suggestions reframe genuine experience without fabricating metrics or false responsibilities.
          </p>
        </div>
      </Card>
    </div>
  )
}
