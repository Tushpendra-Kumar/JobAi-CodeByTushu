import React from 'react'
import { Sparkles, Check, X, ArrowRight, ShieldCheck } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import type { AiImprovementSuggestion } from '@/services/resumeBuilderAIService'

interface AiSuggestionModalProps {
  isOpen: boolean
  onClose: () => void
  suggestion: AiImprovementSuggestion | null
  onApply: (suggestion: AiImprovementSuggestion) => void
}

export const AiSuggestionModal: React.FC<AiSuggestionModalProps> = ({
  isOpen,
  onClose,
  suggestion,
  onApply,
}) => {
  if (!suggestion) return null

  const sectionTitles: Record<string, string> = {
    summary: 'Professional Summary Enhancement',
    experience: 'Work Experience Bullet Optimization',
    project: 'Project Description Enhancement',
    skills: 'Technical Skills Alignment',
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={sectionTitles[suggestion.section] || 'AI Enhancement Preview'}
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Subtitle / Reason */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/80 border border-indigo-100 text-indigo-950">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="text-xs font-semibold">{suggestion.explanation}</span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
            +{suggestion.impactScoreIncrease} pts ATS
          </span>
        </div>

        {/* Side-by-side / Before & After comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Before: Current Phrasing */}
          <div className="rounded-xl border border-rose-200/80 bg-rose-50/30 p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                  Current Phrasing
                </span>
                <span className="text-[10px] text-slate-400">Existing</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic bg-white/70 p-2.5 rounded-lg border border-rose-100">
                "{suggestion.originalText}"
              </p>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              May lack strong technical action verbs or high-frequency ATS keywords.
            </p>
          </div>

          {/* After: AI Optimized Phrasing */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-3.5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>AI-Optimized ATS Phrasing</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded">
                  Recommended
                </span>
              </div>
              <p className="text-xs text-slate-900 leading-relaxed font-medium bg-white p-2.5 rounded-lg border border-emerald-200 shadow-2xs">
                "{suggestion.suggestedText}"
              </p>
            </div>

            <div className="mt-2.5 space-y-1">
              {suggestion.improvements.map((imp, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                  <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{imp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Truthfulness Guarantee */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            Truthful Enhancement Guarantee: No fake employers, dates, or metrics have been created.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            leftIcon={<X className="w-3.5 h-3.5 text-slate-400" />}
          >
            Keep Current Phrasing
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onApply(suggestion)
              onClose()
            }}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Apply Suggestion (+{suggestion.impactScoreIncrease} pts)
          </Button>
        </div>
      </div>
    </Modal>
  )
}
