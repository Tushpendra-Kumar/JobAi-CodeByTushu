import React from 'react'
import { Wand2, Briefcase, Download, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export interface AnalysisActionPanelProps {
  onImproveResume: () => void
  onAnalyzeAgainstJob: () => void
  onDownloadAnalysis: () => void
}

export const AnalysisActionPanel: React.FC<AnalysisActionPanelProps> = ({
  onImproveResume,
  onAnalyzeAgainstJob,
  onDownloadAnalysis,
}) => {
  return (
    <Card className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0A0F1D] to-indigo-950 text-white shadow-xl relative overflow-hidden text-left">
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold border border-indigo-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              Next Step in Your Copilot Workflow
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Ready to Take Your Resume to 95%+?
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Apply automated AI recommendations, strengthen your engineering bullet points, and re-test against active hiring criteria.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {/* Primary CTA: Improve My Resume */}
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onImproveResume}
            leftIcon={<Wand2 className="w-4 h-4 text-white" />}
            className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 justify-center text-xs sm:text-sm"
          >
            Improve My Resume
          </Button>

          {/* Secondary CTA: Analyze Against a Job */}
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onAnalyzeAgainstJob}
            leftIcon={<Briefcase className="w-4 h-4 text-slate-800" />}
            className="bg-white hover:bg-slate-100 text-slate-900 justify-center text-xs sm:text-sm"
          >
            Analyze Against a Job
          </Button>

          {/* Tertiary CTA: Download Analysis */}
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onDownloadAnalysis}
            leftIcon={<Download className="w-4 h-4 text-slate-300" />}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white justify-center text-xs sm:text-sm"
          >
            Download Analysis
          </Button>
        </div>
      </div>
    </Card>
  )
}
