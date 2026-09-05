import React, { useEffect, useState } from 'react'
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'

interface GeneratingCoverLetterModalProps {
  isOpen: boolean
  onComplete: () => void
}

const GENERATION_STEPS = [
  'Analyzing target job description and core competencies...',
  'Extracting verified skills and projects from resume profile...',
  'Synthesizing truth-grounded experience hooks...',
  'Calibrating tone, length, and technical depth parameters...',
  'Drafting ATS-friendly paragraphs with role-aligned achievements...',
  'Auditing draft against hallucination and factual grounding rules...',
  'Computing quality score, readability, and keyword alignment...',
]

const GeneratingCoverLetterModalContent: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < GENERATION_STEPS.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          setTimeout(onComplete, 400)
          return prev
        }
      })
    }, 450)

    return () => clearInterval(interval)
  }, [onComplete])

  const progressPercent = Math.min(
    100,
    Math.round(((currentStep + 1) / GENERATION_STEPS.length) * 100)
  )

  return (
    <div className="space-y-5 py-3">
      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Generation Progress</span>
          <span className="text-indigo-600 font-bold">{progressPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-2.5 pt-1">
        {GENERATION_STEPS.map((step, idx) => {
          const isCompleted = idx < currentStep
          const isCurrent = idx === currentStep
          const isPending = idx > currentStep

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs transition-opacity duration-200 ${
                isPending ? 'opacity-40 text-slate-400' : 'opacity-100'
              }`}
            >
              {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              {isCurrent && <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />}
              {isPending && (
                <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
              )}

              <span
                className={
                  isCurrent
                    ? 'font-semibold text-indigo-900'
                    : isCompleted
                      ? 'text-slate-700 font-medium'
                      : 'text-slate-400'
                }
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>

      {/* Truthful Grounding Footnote */}
      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200/70 text-[11px] text-emerald-800">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Factual Grounding Check Active: No fabricated metrics or dates allowed.</span>
      </div>
    </div>
  )
}

export const GeneratingCoverLetterModal: React.FC<GeneratingCoverLetterModalProps> = ({
  isOpen,
  onComplete,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} // Non-dismissible while generating
      title="AI Career Copilot Generating Letter"
      description="Synthesizing a role-targeted cover letter grounded strictly in your verified background."
      maxWidth="md"
    >
      {isOpen && <GeneratingCoverLetterModalContent onComplete={onComplete} />}
    </Modal>
  )
}
