import React, { useState } from 'react'
import { Check, Minus, HelpCircle, Sparkles } from 'lucide-react'
import {
  FEATURE_COMPARISON_CATEGORIES,
  type PlanId,
} from '@/config/pricingConfig'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export interface FeatureComparisonTableProps {
  currentPlanId: PlanId
  onSelectPlan: (planId: PlanId) => void
}

export const FeatureComparisonTable: React.FC<FeatureComparisonTableProps> = ({
  currentPlanId,
  onSelectPlan,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all')

  const renderValue = (val: boolean | string, isProCol = false) => {
    if (typeof val === 'boolean') {
      return val ? (
        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      ) : (
        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400">
          <Minus className="w-3.5 h-3.5" />
        </div>
      )
    }

    return (
      <span
        className={`text-xs font-semibold ${
          isProCol ? 'text-indigo-900 font-bold' : 'text-slate-700'
        }`}
      >
        {val}
      </span>
    )
  }

  const filteredCategories =
    activeCategoryFilter === 'all'
      ? FEATURE_COMPARISON_CATEGORIES
      : FEATURE_COMPARISON_CATEGORIES.filter((c) => c.categoryName === activeCategoryFilter)

  return (
    <div className="mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <Badge variant="indigo" size="sm" className="mb-3 uppercase tracking-wider font-semibold">
          Detailed Matrix
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Compare every feature
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Transparent breakdown of core features, advanced AI engines, and automation capabilities
          across each tier.
        </p>

        {/* Filter Pills for quick scanning */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            type="button"
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeCategoryFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Features
          </button>
          {FEATURE_COMPARISON_CATEGORIES.map((cat) => (
            <button
              key={cat.categoryName}
              type="button"
              onClick={() => setActiveCategoryFilter(cat.categoryName)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeCategoryFilter === cat.categoryName
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.categoryName}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table View (Desktop & Tablet) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="py-5 px-6 text-sm font-bold text-slate-900 w-2/5">
                  Capability / Feature
                </th>
                <th className="py-5 px-4 text-center text-sm font-bold text-slate-900 w-1/5">
                  <div className="flex flex-col items-center gap-1">
                    <span>Free</span>
                    {currentPlanId === 'free' && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </th>
                <th className="py-5 px-4 text-center text-sm font-bold text-indigo-950 w-1/5 bg-indigo-50/60 border-x border-indigo-100">
                  <div className="flex flex-col items-center gap-1">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Pro
                    </span>
                    {currentPlanId === 'pro' && (
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-200/80 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </th>
                <th className="py-5 px-4 text-center text-sm font-bold text-purple-950 w-1/5">
                  <div className="flex flex-col items-center gap-1">
                    <span>Automation</span>
                    {currentPlanId === 'automation' && (
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredCategories.map((cat) => (
                <React.Fragment key={cat.categoryName}>
                  {/* Category Header Row */}
                  <tr className="bg-slate-50/90 font-bold text-xs uppercase tracking-wider text-slate-700">
                    <td colSpan={4} className="py-3 px-6">
                      <span className="text-indigo-600 mr-2">#</span>
                      {cat.categoryName}
                      <span className="ml-2 font-normal lowercase tracking-normal text-slate-400 hidden sm:inline">
                        — {cat.description}
                      </span>
                    </td>
                  </tr>

                  {/* Feature Rows */}
                  {cat.features.map((feature, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      <td className="py-3.5 px-6 font-medium text-slate-800">
                        <div className="flex items-center gap-1.5">
                          <span>{feature.name}</span>
                          {feature.tooltip && (
                            <div className="relative group/tooltip">
                              <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                              <div className="absolute left-0 bottom-full mb-1.5 hidden group-hover/tooltip:block w-56 p-2 bg-slate-900 text-white text-[11px] rounded-lg shadow-lg z-20 pointer-events-none leading-tight">
                                {feature.tooltip}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {renderValue(feature.free)}
                      </td>
                      <td className="py-3.5 px-4 text-center bg-indigo-50/30 border-x border-indigo-100">
                        {renderValue(feature.pro, true)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {renderValue(feature.automation)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* Table CTA Footer Row */}
              <tr className="bg-slate-50/50">
                <td className="py-6 px-6 font-bold text-slate-900">
                  Ready to upgrade your workflow?
                </td>
                <td className="py-6 px-4 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPlanId === 'free'}
                    onClick={() => onSelectPlan('free')}
                    className="text-xs cursor-pointer"
                  >
                    {currentPlanId === 'free' ? 'Active' : 'Select Free'}
                  </Button>
                </td>
                <td className="py-6 px-4 text-center bg-indigo-50/50 border-x border-indigo-100">
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={currentPlanId === 'pro'}
                    onClick={() => onSelectPlan('pro')}
                    className="text-xs shadow-sm cursor-pointer"
                  >
                    {currentPlanId === 'pro' ? 'Active' : 'Upgrade to Pro'}
                  </Button>
                </td>
                <td className="py-6 px-4 text-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentPlanId === 'automation'}
                    onClick={() => onSelectPlan('automation')}
                    className="text-xs border-purple-200 text-purple-900 hover:bg-purple-50 cursor-pointer"
                  >
                    {currentPlanId === 'automation' ? 'Active' : 'Choose Automation'}
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
