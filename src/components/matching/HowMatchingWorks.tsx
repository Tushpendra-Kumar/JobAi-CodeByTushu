import React from 'react'
import {
  FileText,
  UserCheck,
  Briefcase,
  Cpu,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'

export const HowMatchingWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Your Resume',
      desc: 'Extract relevant professional information',
      icon: FileText,
      accent: 'from-blue-500 to-indigo-500',
    },
    {
      step: '02',
      title: 'Skills & Experience',
      desc: 'Identify technical and functional strengths',
      icon: UserCheck,
      accent: 'from-indigo-500 to-violet-500',
    },
    {
      step: '03',
      title: 'Job Requirements',
      desc: 'Analyze requirements and responsibilities',
      icon: Briefcase,
      accent: 'from-violet-500 to-purple-500',
    },
    {
      step: '04',
      title: 'AI Matching',
      desc: 'Compare profile against job requirements',
      icon: Cpu,
      accent: 'from-purple-500 to-pink-500',
    },
    {
      step: '05',
      title: 'Recommendation',
      desc: 'Prioritize the strongest opportunities',
      icon: Sparkles,
      accent: 'from-pink-500 to-emerald-500',
    },
  ]

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-sm text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>How JobAI Matches You</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              Deterministic Logic
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            End-to-end intelligence comparing candidate competencies directly to live company demands.
          </p>
        </div>
      </div>

      {/* Workflow Steps Horizontal Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon
          const isLast = idx === steps.length - 1

          return (
            <div key={item.step} className="relative group">
              <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xs transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      STEP {item.step}
                    </span>
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${item.accent} text-white flex items-center justify-center shadow-2xs`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Connector Arrow for Desktop */}
              {!isLast && (
                <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-400">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                </div>
              )}

              {/* Connector for Mobile */}
              {!isLast && (
                <div className="flex md:hidden justify-center my-1 text-slate-300">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
