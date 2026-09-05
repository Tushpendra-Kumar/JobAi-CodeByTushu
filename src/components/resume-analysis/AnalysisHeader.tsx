import React from 'react'
import { RefreshCw, FileText, Upload, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export interface AnalysisHeaderProps {
  fileName?: string
  status?: string
  isReanalyzing?: boolean
  onReplaceResume: () => void
  onReanalyze: () => void
}

export const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({
  fileName = 'Tushpendra_Kumar_Resume.pdf',
  status = 'Analyzed',
  isReanalyzing = false,
  onReplaceResume,
  onReanalyze,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
      <div className="space-y-1.5 text-left">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge
            variant="purple"
            size="sm"
            dot
          >
            AI Resume Analysis Active
          </Badge>
          <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase hidden sm:inline">
            Powered by CodeByTushu
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0F1D] tracking-tight">
          AI Resume Analysis
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          Get actionable AI insights to make your resume stronger, clearer and more relevant to your target roles.
        </p>

        {/* Current File Metadata Badge */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs text-xs text-slate-700">
            <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="font-semibold text-slate-900 truncate max-w-[220px]">
              {fileName}
            </span>
          </div>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{status}</span>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onReplaceResume}
          leftIcon={<Upload className="w-3.5 h-3.5" />}
          className="text-xs"
        >
          Replace Resume
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onReanalyze}
          disabled={isReanalyzing}
          leftIcon={
            <RefreshCw
              className={`w-3.5 h-3.5 text-indigo-600 ${
                isReanalyzing ? 'animate-spin text-indigo-500' : ''
              }`}
            />
          }
          className="text-xs border-indigo-200 hover:bg-indigo-50/70 text-indigo-700"
        >
          {isReanalyzing ? 'Analyzing...' : 'Re-analyze'}
        </Button>
      </div>
    </div>
  )
}
