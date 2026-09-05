import React from 'react'
import { CheckCircle2, Loader2, Circle, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import type { ApplicationSubmissionResult } from '@/services/autoApplyService'
import type { Job } from '@/data/jobsData'

interface SubmittingProgressModalProps {
  isOpen: boolean
  onClose: () => void
  currentStepIndex: number
  steps: string[]
  isCompleted: boolean
  result: ApplicationSubmissionResult | null
  job: Job | null
  resumeVersionName: string
  onContinueQueue: () => void
  onViewHistory: () => void
}

export const SubmittingProgressModal: React.FC<SubmittingProgressModalProps> = ({
  isOpen,
  onClose,
  currentStepIndex,
  steps,
  isCompleted,
  result,
  job,
  resumeVersionName,
  onContinueQueue,
  onViewHistory,
}) => {
  const progressPercent = isCompleted
    ? 100
    : Math.min(95, Math.round(((currentStepIndex + 1) / steps.length) * 100))

  return (
    <Modal
      isOpen={isOpen}
      onClose={isCompleted ? onClose : () => {}}
      title={isCompleted ? 'Application Successfully Recorded!' : 'Recording Application...'}
      maxWidth="md"
    >
      <div className="space-y-5 py-1">
        {!isCompleted ? (
          <>
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                  <span>Submitting to Demo Application Pipeline...</span>
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

            {/* 5 Steps Progression */}
            <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200/70">
              {steps.map((step, idx) => {
                const isStepCompleted = idx < currentStepIndex
                const isStepCurrent = idx === currentStepIndex
                const isStepPending = idx > currentStepIndex

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 transition-opacity duration-200 ${
                      isStepPending ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {isStepCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isStepCurrent ? (
                        <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-xs font-medium ${
                          isStepCurrent
                            ? 'text-indigo-950 font-bold'
                            : isStepCompleted
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

            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                Safety Control: All details were verified by you prior to this recorded action.
              </span>
            </div>
          </>
        ) : (
          /* Success Summary View */
          <div className="space-y-4 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Application Recorded</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Your application has been registered in the JobAI tracking pipeline.
              </p>
            </div>

            {/* Application Receipt Card */}
            {job && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs">
                <div className="flex justify-between items-start pb-2 border-b border-slate-200/80">
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">{job.title}</span>
                    <span className="text-slate-500 text-xs">{job.company}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    Status: Applied
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Confirmation Code:</span>
                    <strong className="text-indigo-700 font-mono">
                      {result?.confirmationCode || 'JOBAI-APP-9281'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Recorded Date:</span>
                    <strong className="text-slate-800">{result?.timestamp || 'Today'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Resume Used:</span>
                    <strong className="text-slate-800 truncate block">{resumeVersionName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Match Score:</span>
                    <strong className="text-emerald-700">{job.matchScore}% Match</strong>
                  </div>
                </div>
              </div>
            )}

            <div className="p-2.5 bg-indigo-50/60 rounded-xl border border-indigo-100/80 text-[11px] text-slate-600 text-left flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>
                Demo Note: In full SaaS production, this connects to employer ATS and job board APIs.
                For your portfolio demo, it is safely tracked in local storage.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onViewHistory}
                className="w-full sm:w-auto text-xs"
              >
                View in Application Tracker
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={onContinueQueue}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="w-full sm:w-auto text-xs font-semibold"
              >
                Next Job in Queue
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
