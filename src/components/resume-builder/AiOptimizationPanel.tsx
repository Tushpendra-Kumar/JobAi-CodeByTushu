import React from 'react'
import {
  Sparkles,
  Zap,
  TrendingUp,
  Target,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
} from 'lucide-react'
import type { BuilderOptimizationToggles } from '@/services/resumeBuilderAIService'

interface AiOptimizationPanelProps {
  toggles: BuilderOptimizationToggles
  onToggleChange: (newToggles: BuilderOptimizationToggles) => void
  currentScore: number
  potentialScore: number
}

export const AiOptimizationPanel: React.FC<AiOptimizationPanelProps> = ({
  toggles,
  onToggleChange,
  currentScore,
  potentialScore,
}) => {
  const handleToggle = (key: keyof BuilderOptimizationToggles) => {
    onToggleChange({
      ...toggles,
      [key]: !toggles[key],
    })
  }

  const toggleOptions: {
    key: keyof BuilderOptimizationToggles
    label: string
    description: string
    icon: React.ElementType
    pts: string
  }[] = [
    {
      key: 'actionVerbs',
      label: 'Strengthen Action Verbs',
      description: 'Replaces passive phrasing with authoritative technical verbs (Architected, Engineered, Spearheaded)',
      icon: Zap,
      pts: '+4 pts',
    },
    {
      key: 'quantifyMetrics',
      label: 'Quantify Achievements & Outcomes',
      description: 'Formats bullets to highlight business outcomes, latency reductions, and uptime impacts',
      icon: TrendingUp,
      pts: '+4 pts',
    },
    {
      key: 'keywordAlignment',
      label: 'Role Keyword Alignment',
      description: 'Harmonizes skills taxonomy with industry hiring benchmarks and target JD terms',
      icon: Target,
      pts: '+5 pts',
    },
    {
      key: 'conciseBullets',
      label: 'Concise ATS Bullet Formatting',
      description: 'Trims narrative fluff to maintain optimal 1–2 line scannability for automated parsers',
      icon: FileCheck2,
      pts: '+3 pts',
    },
    {
      key: 'professionalTone',
      label: 'Professional Tone Refinement',
      description: 'Removes first-person pronouns and sets confident executive tone throughout summary',
      icon: CheckCircle2,
      pts: '+3 pts',
    },
  ]

  const delta = Math.max(0, potentialScore - currentScore)

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">AI Optimization Engine</h2>
            <p className="text-[11px] text-slate-500">
              Active enhancement parameters applied during resume generation
            </p>
          </div>
        </div>
      </div>

      {/* Before / After Projection Gauge Card */}
      <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 border border-indigo-100/80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Projected ATS Score</span>
            <div className="group relative">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
              <div className="absolute left-0 bottom-full mb-1.5 hidden group-hover:block w-48 p-2 bg-slate-900 text-white text-[10px] rounded-lg shadow-lg z-50">
                Calculated dynamically based on target role keywords, bullet strength, and ATS parsing criteria.
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            +{delta} pts potential
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className="text-2xl font-black text-slate-900">{currentScore}</span>
            <span className="text-xs font-medium text-slate-400">/100 current</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-indigo-600">{potentialScore}</span>
            <span className="text-xs font-medium text-indigo-400">/100 optimized</span>
          </div>
        </div>

        {/* Dual Progress Track */}
        <div className="relative h-2.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
          {/* Potential Score track */}
          <div
            className="absolute top-0 left-0 h-full bg-purple-300 transition-all duration-500 rounded-full"
            style={{ width: `${potentialScore}%` }}
          />
          {/* Current Score track */}
          <div
            className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-500 rounded-full shadow-xs"
            style={{ width: `${currentScore}%` }}
          />
        </div>
      </div>

      {/* Feature Toggles List */}
      <div className="space-y-2.5">
        {toggleOptions.map((opt) => {
          const Icon = opt.icon
          const isActive = toggles[opt.key]
          return (
            <div
              key={opt.key}
              onClick={() => handleToggle(opt.key)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                isActive
                  ? 'bg-indigo-50/40 border-indigo-200/80 shadow-2xs'
                  : 'bg-white border-slate-200/70 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-900">{opt.label}</span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100">
                      {opt.pts}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
                    {opt.description}
                  </p>
                </div>
              </div>

              {/* iOS style switch */}
              <div
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isActive ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    isActive ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
