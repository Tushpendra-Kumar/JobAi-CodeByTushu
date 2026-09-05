import React from 'react'
import { Sparkles, FolderOpen, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface CoverLetterHeaderProps {
  savedCount: number
  onOpenSavedModal: () => void
  onGenerate: () => void
  isGenerating?: boolean
  canGenerate?: boolean
}

export const CoverLetterHeader: React.FC<CoverLetterHeaderProps> = ({
  savedCount,
  onOpenSavedModal,
  onGenerate,
  isGenerating = false,
  canGenerate = true,
}) => {
  return (
    <div className="space-y-4">
      {/* Top Banner / Breadcrumb & Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 pb-1 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-700">JobAI Platform</span>
          <span>/</span>
          <span className="text-indigo-600 font-semibold">AI Cover Letter Generator</span>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-500 font-medium">Powered by CodeByTushu</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Truthful Grounding Guarantee — No invented roles, employers, or metrics</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              AI Cover Letter Generator
            </h1>
            <Badge variant="indigo" size="sm" dot>
              AI Copilot
            </Badge>
            <Badge variant="emerald" size="sm">
              ATS-Optimized
            </Badge>
          </div>
          <p className="text-sm text-slate-600 max-w-2xl">
            Generate highly personalized, role-targeted cover letters strictly aligned with your
            verified resume and target job requirements in seconds.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            onClick={onOpenSavedModal}
            leftIcon={<FolderOpen className="w-4 h-4 text-slate-600" />}
            className="text-sm font-medium"
          >
            Saved Letters
            {savedCount > 0 && (
              <span className="ml-1.5 px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                {savedCount}
              </span>
            )}
          </Button>

          <Button
            variant="primary"
            onClick={onGenerate}
            isLoading={isGenerating}
            disabled={!canGenerate || isGenerating}
            leftIcon={<Sparkles className="w-4 h-4 text-amber-300" />}
            className="shadow-sm hover:shadow-indigo-500/25"
          >
            Generate Cover Letter
          </Button>
        </div>
      </div>
    </div>
  )
}
