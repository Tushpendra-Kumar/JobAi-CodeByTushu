import React from 'react'
import {
  X,
  Sparkles,
  TrendingUp,
  Award,
  AlertCircle,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { TrackedApplication } from '@/services/applicationTrackingService'
import {
  calculateApplicationStatistics,
  generateApplicationInsights,
} from '@/services/applicationInsightsService'

interface AiInsightsModalProps {
  isOpen: boolean
  onClose: () => void
  applications: TrackedApplication[]
}

export const AiInsightsModal: React.FC<AiInsightsModalProps> = ({
  isOpen,
  onClose,
  applications,
}) => {
  if (!isOpen) return null

  const stats = calculateApplicationStatistics(applications)
  const { insights, hasEnoughData, summary } = generateApplicationInsights(applications)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  AI Career Insights & Analytics
                </h2>
                <Badge variant="indigo" size="sm">
                  Demo Intelligence
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Calculated strictly from your active {applications.length} pipeline records.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            aria-label="Close AI Insights modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Truthfulness & Demo Mode Notice Banner */}
          <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold">Honest AI Analytics: </span>
              Metrics represent your current local demo dataset. No fabricated percentages or external scraping are claimed.
            </div>
          </div>

          {/* Key Pipeline Performance Metrics */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Application Performance Metrics
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-2xl font-bold text-slate-900">
                  {stats.responseRate}%
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-1">
                  Response Rate
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Screening & beyond
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {stats.interviewRate}%
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-1">
                  Interview Rate
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {stats.interviewCount} Active rounds
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-2xl font-bold text-teal-600">
                  {stats.offerRate}%
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-1">
                  Offer Yield
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {stats.offerCount} Formal offers
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {stats.averageMatchScore}%
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-1">
                  Avg Match Score
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Target alignment
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights & Observations */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Actionable Career Observations
              </h3>
              {hasEnoughData && (
                <span className="text-xs text-indigo-600 font-semibold">
                  {insights.length} Observations
                </span>
              )}
            </div>

            <div className="space-y-3">
              {insights.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                    item.type === 'trend'
                      ? 'bg-blue-50/50 border-blue-200 text-blue-950'
                      : item.type === 'strength'
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                      : item.type === 'alert'
                      ? 'bg-amber-50/50 border-amber-200 text-amber-950'
                      : 'bg-indigo-50/50 border-indigo-200 text-indigo-950'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-white shadow-2xs shrink-0 mt-0.5">
                    {item.type === 'trend' ? (
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    ) : item.type === 'strength' ? (
                      <Award className="w-4 h-4 text-emerald-600" />
                    ) : item.type === 'alert' ? (
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Lightbulb className="w-4 h-4 text-indigo-600" />
                    )}
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-bold">
                        {item.title}
                      </h4>
                      {item.metricBadge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/80 border border-current shadow-2xs">
                          {item.metricBadge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {summary}
          </div>
          <Button variant="primary" size="sm" onClick={onClose} className="text-xs">
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
