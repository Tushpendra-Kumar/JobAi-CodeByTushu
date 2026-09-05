import React, { useState } from 'react'
import {
  X,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
  Info,
  CreditCard,
} from 'lucide-react'
import {
  type PlanId,
  type BillingCycle,
  PRICING_PLANS,
} from '@/config/pricingConfig'
import { createDemoCheckoutSession } from '@/services/subscriptionService'
import { Button } from '@/components/ui/Button'

export interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  targetPlanId: PlanId
  billingCycle: BillingCycle
  onConfirmDemoUpgrade: (planId: PlanId, billingCycle: BillingCycle) => void
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  targetPlanId,
  billingCycle,
  onConfirmDemoUpgrade,
}) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccessState, setShowSuccessState] = useState(false)

  if (!isOpen) return null

  const plan = PRICING_PLANS[targetPlanId]
  const session = createDemoCheckoutSession(targetPlanId, billingCycle)
  const isYearly = billingCycle === 'yearly'

  const handleSimulateCheckout = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setShowSuccessState(true)
      onConfirmDemoUpgrade(targetPlanId, billingCycle)
    }, 1200)
  }

  const handleClose = () => {
    setShowSuccessState(false)
    setIsProcessing(false)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-modal-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <h3 id="upgrade-modal-title" className="text-lg font-bold">
                Upgrade to {plan.name} Plan
              </h3>
              <p className="text-xs text-indigo-100/90">
                Checkout Preview • Frictionless Demo Simulation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {showSuccessState ? (
          /* Demo Success State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">
              Demo Subscription Activated!
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your account has been upgraded to the{' '}
              <strong className="text-indigo-700">{plan.name} Plan</strong> in local demo mode.
              Higher quota limits and advanced features are now unlocked for testing.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 max-w-md mx-auto text-left space-y-1 font-mono">
              <div>Session: {session.sessionId}</div>
              <div>Billing: {session.billingCycleLabel}</div>
              <div>Amount: {session.formattedAmount} (Demo simulated)</div>
              <div>Status: Active (Local Demo Persistence)</div>
            </div>

            <div className="pt-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleClose}
                className="w-full max-w-sm mx-auto font-semibold cursor-pointer"
              >
                Return to JobAI Workspace
              </Button>
            </div>
          </div>
        ) : (
          /* Checkout Review State */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Transparent Demo Notice */}
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
              <Info className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Portfolio Demo Environment:</strong> No real payment gateway is charged.
                Clicking confirm will safely simulate activating the {plan.name} plan in your local
                browser session.
              </div>
            </div>

            {/* Plan Pricing Summary */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-base font-bold text-slate-900">{plan.name} Tier</span>
                  <span className="text-xs text-slate-500 block">
                    {session.billingCycleLabel}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-slate-900 font-mono">
                    {session.formattedAmount}
                  </div>
                  {isYearly && (
                    <span className="text-[11px] font-semibold text-emerald-600">
                      ₹{session.monthlyEquivalent}/mo (Saved 20%)
                    </span>
                  )}
                </div>
              </div>

              {/* Key Limits Unlocked */}
              <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>
                    <strong>{plan.limits.aiJobAnalysesPerMonth}</strong> AI Job Analyses
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>
                    <strong>{plan.limits.resumeAnalysesPerMonth}</strong> ATS Audits
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>
                    <strong>{plan.limits.coverLettersPerMonth}</strong> Cover Letters
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>
                    <strong>{plan.limits.savedJobsLimit}</strong> Saved Job Slots
                  </span>
                </div>
              </div>
            </div>

            {/* What you receive */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Included with {plan.name}:
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {plan.highlights.slice(0, 4).map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture note */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5" />
              <span>
                Ready for Stripe & Razorpay Webhook Orchestration in future releases.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="secondary"
                size="md"
                onClick={handleClose}
                disabled={isProcessing}
                className="w-full sm:w-auto cursor-pointer"
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleSimulateCheckout}
                isLoading={isProcessing}
                className="w-full sm:w-auto font-semibold shadow-md cursor-pointer"
                leftIcon={<CreditCard className="w-4 h-4" />}
                rightIcon={!isProcessing ? <ArrowRight className="w-4 h-4" /> : undefined}
              >
                {isProcessing ? 'Simulating Checkout...' : 'Confirm Demo Upgrade'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
