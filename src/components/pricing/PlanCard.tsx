import { Check, Zap, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import { type PricingPlan, type BillingCycle, type PlanId } from '@/config/pricingConfig'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export interface PlanCardProps {
  plan: PricingPlan
  billingCycle: BillingCycle
  isCurrentPlan: boolean
  onSelectPlan: (planId: PlanId) => void
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  billingCycle,
  isCurrentPlan,
  onSelectPlan,
}) => {
  const isYearly = billingCycle === 'yearly'
  const isFree = plan.id === 'free'
  const isPro = plan.id === 'pro'
  const isAutomation = plan.id === 'automation'

  const displayMonthlyPrice = isYearly
    ? plan.pricing.yearlyMonthlyPrice
    : plan.pricing.monthlyPrice

  const regularMonthlyPrice = plan.pricing.monthlyPrice
  const annualTotal = plan.pricing.yearlyTotalPrice

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl transition-all duration-300 ${
        isPro
          ? 'bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-100/70 ring-4 ring-indigo-500/10 scale-100 lg:-translate-y-2 z-10'
          : isAutomation
          ? 'bg-white border border-purple-200/90 shadow-lg shadow-purple-50/50 hover:shadow-xl hover:border-purple-300'
          : 'bg-white/95 border border-slate-200 shadow-md hover:shadow-lg hover:border-slate-300'
      } p-6 sm:p-8`}
    >
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-2 min-h-7 mb-3">
        {plan.badge ? (
          <Badge
            variant={isPro ? 'indigo' : 'purple'}
            size="sm"
            className={`font-semibold tracking-wide uppercase px-3 py-1 ${
              isPro
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 shadow-xs'
                : 'bg-purple-100 text-purple-800 border-purple-200'
            }`}
          >
            {isPro && <Sparkles className="w-3 h-3 mr-1 inline" />}
            {isAutomation && <Zap className="w-3 h-3 mr-1 inline text-purple-600" />}
            {plan.badge}
          </Badge>
        ) : (
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Starter
          </span>
        )}

        {isCurrentPlan && (
          <Badge variant="emerald" size="sm" dot className="font-semibold">
            Current Plan
          </Badge>
        )}
      </div>

      {/* Plan Header */}
      <div>
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          {plan.name}
        </h3>
        <p className="mt-1 text-sm text-slate-500 leading-relaxed font-medium">
          {plan.tagline}
        </p>

        {/* Price Display */}
        <div className="mt-5 pb-5 border-b border-slate-100">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              {plan.pricing.currencySymbol}
              {displayMonthlyPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-sm font-medium text-slate-500">/ month</span>
          </div>

          {/* Billing detail / Strikethrough */}
          <div className="mt-2 min-h-5 text-xs text-slate-500">
            {isFree ? (
              <span className="text-slate-400">Free forever • No credit card needed</span>
            ) : isYearly ? (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="line-through text-slate-400 font-mono">
                  {plan.pricing.currencySymbol}
                  {regularMonthlyPrice}
                </span>
                <span className="font-semibold text-emerald-600">
                  Billed annually ({plan.pricing.currencySymbol}
                  {annualTotal.toLocaleString('en-IN')}/yr)
                </span>
              </div>
            ) : (
              <span className="text-slate-500">Billed monthly • Cancel anytime</span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          <Button
            variant={isCurrentPlan ? 'secondary' : isPro ? 'primary' : 'secondary'}
            size="lg"
            className={`w-full font-semibold cursor-pointer ${
              isCurrentPlan
                ? 'border-slate-300 text-slate-700 bg-slate-50 cursor-default shadow-none'
                : isPro
                ? 'shadow-md shadow-indigo-200 hover:shadow-indigo-300 text-white'
                : isAutomation
                ? 'border-purple-300 text-purple-900 hover:bg-purple-50/80 hover:border-purple-400'
                : 'border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
            disabled={isCurrentPlan}
            onClick={() => onSelectPlan(plan.id)}
            rightIcon={!isCurrentPlan ? <ArrowRight className="w-4 h-4" /> : undefined}
          >
            {isCurrentPlan ? 'Current Active Plan' : plan.ctaLabel}
          </Button>
        </div>

        {/* Key Limits Snapshot */}
        <div className="mt-6 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1.5">
          <div className="font-semibold text-slate-800 flex items-center gap-1 mb-1">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Monthly Capacity</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">AI Job Analyses:</span>
            <span className="font-bold text-slate-900 font-mono">
              {plan.limits.aiJobAnalysesPerMonth} / mo
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Resume ATS Audits:</span>
            <span className="font-bold text-slate-900 font-mono">
              {plan.limits.resumeAnalysesPerMonth} / mo
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">AI Cover Letters:</span>
            <span className="font-bold text-slate-900 font-mono">
              {plan.limits.coverLettersPerMonth} / mo
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Saved Opportunities:</span>
            <span className="font-bold text-slate-900 font-mono">
              {plan.limits.savedJobsLimit} slots
            </span>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">
            What's included:
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            {plan.highlights.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div
                  className={`mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center ${
                    isPro
                      ? 'bg-indigo-100 text-indigo-700'
                      : isAutomation
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="leading-tight text-slate-700 font-normal">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer Trust Note */}
      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
        <span>Strict zero-fabrication safety guarantee</span>
      </div>
    </div>
  )
}
