import React from 'react'
import { AlertCircle, ArrowRight, Zap, X } from 'lucide-react'
import { type PlanId } from '@/config/pricingConfig'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export interface LimitReachedModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: (targetPlan: PlanId) => void
  currentPlanId: PlanId
  resourceName?: string
}

export const LimitReachedModal: React.FC<LimitReachedModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  currentPlanId,
  resourceName = 'AI Job Analysis',
}) => {
  if (!isOpen) return null

  const targetPlan = currentPlanId === 'free' ? 'pro' : 'automation'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="limit-modal-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="amber" size="sm" className="font-semibold">
              Monthly Limit Reached
            </Badge>
          </div>
          <h3 id="limit-modal-title" className="text-xl font-bold text-slate-900">
            You've reached your monthly {resourceName} limit.
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Your current <strong>{currentPlanId.toUpperCase()}</strong> quota has been fully utilized
            for this 30-day billing cycle. Basic manual features, job search, and pipeline management
            remain unlimited and completely available.
          </p>
        </div>

        <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs text-indigo-950 space-y-1.5">
          <div className="font-bold flex items-center gap-1.5 text-indigo-700">
            <Zap className="w-4 h-4" />
            <span>Unlock higher capacity with {targetPlan.toUpperCase()}</span>
          </div>
          <p className="text-indigo-800/90 leading-relaxed">
            Instantly scale to {targetPlan === 'pro' ? '100' : '250'} monthly analyses, 50+ ATS resume
            evaluations, and advanced copilot features.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-2">
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            className="w-full sm:w-auto cursor-pointer"
          >
            Dismiss
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onClose()
              onUpgrade(targetPlan)
            }}
            className="w-full sm:w-auto font-semibold cursor-pointer"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Upgrade to {targetPlan.toUpperCase()}
          </Button>
        </div>
      </div>
    </div>
  )
}
