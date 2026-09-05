import React, { useState, useEffect, useMemo } from 'react'
import {
  PRICING_PLANS,
  type PlanId,
  type BillingCycle,
} from '@/config/pricingConfig'
import {
  getCurrentSubscription,
  updateSubscription,
  getUsageTelemetry,
  type SubscriptionState,
} from '@/services/subscriptionService'
import { PricingHero } from '@/components/pricing/PricingHero'
import { BillingToggle } from '@/components/pricing/BillingToggle'
import { PlanCard } from '@/components/pricing/PlanCard'
import { UsageLimitsSection } from '@/components/pricing/UsageLimitsSection'
import { FeatureComparisonTable } from '@/components/pricing/FeatureComparisonTable'
import { UpgradeModal } from '@/components/pricing/UpgradeModal'
import { LimitReachedModal } from '@/components/pricing/LimitReachedModal'
import { TrustSection } from '@/components/pricing/TrustSection'
import { FaqSection } from '@/components/pricing/FaqSection'
import { PricingCtaSection } from '@/components/pricing/PricingCtaSection'
import { Badge } from '@/components/ui/Badge'
import { RotateCcw } from 'lucide-react'

export interface PricingScreenProps {
  onNavigateToJobs: () => void
  onNavigateToMatching: () => void
  onNavigateToResume?: () => void
  onNavigateToApplications?: () => void
  onNavigateToProfile?: () => void
  onOpenAuth?: (initialTab?: 'login' | 'signup') => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export const PricingScreen: React.FC<PricingScreenProps> = ({
  onNavigateToJobs,
  onNavigateToMatching,
  onNavigateToResume,
  onNavigateToApplications,
  onNavigateToProfile,
  onOpenAuth,
  onToast,
}) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly')
  const [subscription, setSubscription] = useState<SubscriptionState>(() =>
    getCurrentSubscription()
  )

  // Derive usage telemetry dynamically based on current plan
  const usageTelemetry = useMemo(
    () => getUsageTelemetry(subscription.planId),
    [subscription.planId]
  )

  // Modals state
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const [targetUpgradePlan, setTargetUpgradePlan] = useState<PlanId>('pro')
  const [limitModalOpen, setLimitModalOpen] = useState(false)

  // SEO document title
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'JobAI Pricing — AI-Powered Job Search & Career Automation'
    return () => {
      document.title = prevTitle
    }
  }, [])

  const handleSelectPlan = (planId: PlanId) => {
    if (planId === subscription.planId) {
      onToast(`You are already subscribed to the ${PRICING_PLANS[planId].name} plan.`, 'info')
      return
    }

    if (planId === 'free') {
      const updated = updateSubscription('free', billingCycle)
      setSubscription(updated)
      onToast('Switched account back to the Free plan (Demo Mode).', 'info')
      return
    }

    // Open checkout preview modal for paid plans
    setTargetUpgradePlan(planId)
    setUpgradeModalOpen(true)
  }

  const handleConfirmDemoUpgrade = (planId: PlanId, cycle: BillingCycle) => {
    const updated = updateSubscription(planId, cycle)
    setSubscription(updated)
    onToast(
      `Successfully upgraded to ${PRICING_PLANS[planId].name} (${cycle === 'yearly' ? 'Yearly' : 'Monthly'}) in Demo Mode!`,
      'success'
    )
  }

  const handleResetToFree = () => {
    const updated = updateSubscription('free', 'yearly')
    setSubscription(updated)
    onToast('Reset demo subscription to Free tier.', 'info')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb & Demo Info Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Pricing & Plans</span>
            <span>/</span>
            <span className="text-indigo-600 font-medium capitalize">
              Active Tier: {subscription.planId}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 font-medium text-slate-500">
              {onNavigateToProfile && (
                <button
                  type="button"
                  onClick={onNavigateToProfile}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Profile & Settings
                </button>
              )}
              {onNavigateToApplications && (
                <>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={onNavigateToApplications}
                    className="hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    Applications
                  </button>
                </>
              )}
              {onNavigateToResume && (
                <>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={onNavigateToResume}
                    className="hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    Resume
                  </button>
                </>
              )}
            </div>

            <Badge variant="slate" size="sm" className="font-mono text-[11px]">
              Frictionless Portfolio Mode
            </Badge>

            {subscription.planId !== 'free' && (
              <button
                type="button"
                onClick={handleResetToFree}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Free</span>
              </button>
            )}
          </div>
        </div>

        {/* 1. Page Hero */}
        <PricingHero />

        {/* 2. Billing Cycle Toggle */}
        <BillingToggle billingCycle={billingCycle} onChange={setBillingCycle} />

        {/* 3. 3-Plan Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 items-stretch">
          <PlanCard
            plan={PRICING_PLANS.free}
            billingCycle={billingCycle}
            isCurrentPlan={subscription.planId === 'free'}
            onSelectPlan={handleSelectPlan}
          />
          <PlanCard
            plan={PRICING_PLANS.pro}
            billingCycle={billingCycle}
            isCurrentPlan={subscription.planId === 'pro'}
            onSelectPlan={handleSelectPlan}
          />
          <PlanCard
            plan={PRICING_PLANS.automation}
            billingCycle={billingCycle}
            isCurrentPlan={subscription.planId === 'automation'}
            onSelectPlan={handleSelectPlan}
          />
        </div>

        {/* 4. Live Usage Telemetry & Capacity Section */}
        <UsageLimitsSection
          currentPlanId={subscription.planId}
          usageTelemetry={usageTelemetry}
          onOpenUpgradeModal={(planId) => {
            setTargetUpgradePlan(planId)
            setUpgradeModalOpen(true)
          }}
          onSimulateLimitReached={() => setLimitModalOpen(true)}
        />

        {/* 5. Detailed Feature Comparison Table */}
        <FeatureComparisonTable
          currentPlanId={subscription.planId}
          onSelectPlan={handleSelectPlan}
        />

        {/* 6. User Control & Trust Pillars */}
        <TrustSection />

        {/* 7. Comprehensive FAQ Accordion */}
        <FaqSection />

        {/* 8. Conversion CTA Section */}
        <PricingCtaSection
          onStartFree={() => {
            if (onOpenAuth) {
              onOpenAuth('signup')
            } else {
              onNavigateToJobs()
            }
          }}
          onExplorePlatform={onNavigateToMatching}
        />
      </div>

      {/* Upgrade Checkout Preview Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        targetPlanId={targetUpgradePlan}
        billingCycle={billingCycle}
        onConfirmDemoUpgrade={handleConfirmDemoUpgrade}
      />

      {/* Limit Reached Simulated Modal */}
      <LimitReachedModal
        isOpen={limitModalOpen}
        onClose={() => setLimitModalOpen(false)}
        onUpgrade={(planId) => {
          setTargetUpgradePlan(planId)
          setUpgradeModalOpen(true)
        }}
        currentPlanId={subscription.planId}
      />
    </div>
  )
}
