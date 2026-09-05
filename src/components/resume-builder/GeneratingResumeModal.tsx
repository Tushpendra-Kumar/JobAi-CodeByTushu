import React from 'react'
import { CheckCircle2, Loader2, Circle, Sparkles, ShieldCheck } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'

interface GeneratingResumeModalProps {
  isOpen: boolean
  currentStepIndex: number
  steps: string[]
}

export const GeneratingResumeModal: React.FC<GeneratingResumeModalProps> = ({
  isOpen,
  currentStepIndex,
  steps,
}) => {
  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / steps.length) * 100))

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="Generating AI-Optimized Resume" maxWidth="md">
      <div className="space-y-5 py-1">
        {/* Animated Progress Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>Tailoring Resume for Target Role...</span>
            </span>
            <span className="text-indigo-600">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-full transition-all duration-300 animate-pulse"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 5-Step List */}
        <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200/70">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex
            const isCurrent = idx === currentStepIndex
            const isPending = idx > currentStepIndex

            return (
              <div
                key={idx}
                className={`flex items-start gap-3 transition-opacity duration-200 ${
                  isPending ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-xs font-medium ${
                      isCurrent
                        ? 'text-indigo-950 font-bold'
                        : isCompleted
                        ? 'text-slate-800 font-semibold'
                        : 'text-slate-500'
                    }`}
                  >
                    {step}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Truthfulness Assurance Note */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            Verifying all factual details: titles, employers, education, and dates remain 100% genuine.
          </span>
        </div>
      </div>
    </Modal>
  )
}
