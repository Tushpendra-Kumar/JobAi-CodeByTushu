import React from 'react'
import { Sparkles } from 'lucide-react'
import { type BillingCycle } from '@/config/pricingConfig'

export interface BillingToggleProps {
  billingCycle: BillingCycle
  onChange: (cycle: BillingCycle) => void
}

export const BillingToggle: React.FC<BillingToggleProps> = ({ billingCycle, onChange }) => {
  const isYearly = billingCycle === 'yearly'

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-6">
      <div
        className="inline-flex items-center p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner"
        role="group"
        aria-label="Billing cycle selector"
      >
        <button
          type="button"
          role="radio"
          aria-checked={!isYearly}
          onClick={() => onChange('monthly')}
          className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
            !isYearly
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Monthly billing
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={isYearly}
          onClick={() => onChange('yearly')}
          className={`relative px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 ${
            isYearly
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Yearly billing</span>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300">
            Save 20%
          </span>
        </button>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Annual plans include 2 months free</span>
      </div>
    </div>
  )
}
