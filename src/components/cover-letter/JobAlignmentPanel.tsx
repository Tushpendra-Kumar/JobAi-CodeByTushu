import React from 'react'
import { Target, CheckCircle2, PlusCircle, Lightbulb } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface JobAlignmentPanelProps {
  matchedKeywords: string[]
  suggestedKeywords: string[]
  onInsertKeyword?: (keyword: string) => void
}

export const JobAlignmentPanel: React.FC<JobAlignmentPanelProps> = ({
  matchedKeywords,
  suggestedKeywords,
  onInsertKeyword,
}) => {
  return (
    <Card className="p-4 space-y-3 bg-white">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Target Job Alignment
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          {matchedKeywords.length} Matched Keywords
        </span>
      </div>

      {/* Matched Keywords */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-semibold text-slate-700">Matched in Cover Letter</div>
        <div className="flex flex-wrap gap-1.5">
          {matchedKeywords.length > 0 ? (
            matchedKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/70"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {kw}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400 italic">No keywords matched yet</span>
          )}
        </div>
      </div>

      {/* Suggested Keywords to Weave In */}
      {suggestedKeywords.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-700">
              Recommended Job Terms (Optional)
            </span>
            <span className="text-[10px] text-slate-400">Click term to append</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedKeywords.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => onInsertKeyword && onInsertKeyword(kw)}
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 transition-colors text-slate-600"
                title={`Add ${kw} to cover letter`}
              >
                <PlusCircle className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
                {kw}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recruiter Tip */}
      <div className="flex items-start gap-2 p-2.5 rounded-lg bg-indigo-50/40 border border-indigo-100 text-[11px] text-indigo-900 leading-tight">
        <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <span>
          <strong>Pro-Tip:</strong> Grounding keywords in concrete actions and results increases
          hiring manager engagement by over 40% compared to keyword stuffing.
        </span>
      </div>
    </Card>
  )
}
