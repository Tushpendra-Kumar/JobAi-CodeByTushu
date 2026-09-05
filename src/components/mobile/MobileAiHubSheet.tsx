import React from 'react'
import {
  X,
  Sparkles,
  FileCheck2,
  FileEdit,
  FileSignature,
  Send,
  TrendingUp,
  ArrowRight,
  Bot,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export interface MobileAiHubSheetProps {
  isOpen: boolean
  onClose: () => void
  onNavigateScreen: (
    screen:
      | 'ai-matching'
      | 'resume-analysis'
      | 'resume-builder'
      | 'ai-cover-letter'
      | 'ai-auto-apply'
      | 'career-insights'
  ) => void
  currentScreen?: string
}

export const MobileAiHubSheet: React.FC<MobileAiHubSheetProps> = ({
  isOpen,
  onClose,
  onNavigateScreen,
  currentScreen,
}) => {
  if (!isOpen) return null

  const aiTools = [
    {
      id: 'ai-matching' as const,
      name: 'AI Job Matching',
      tagline: 'Compatibility score & reasonings',
      icon: Sparkles,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconBg: 'bg-indigo-600 text-white',
      badge: '92% Fit',
    },
    {
      id: 'resume-analysis' as const,
      name: 'Resume ATS Analysis',
      tagline: '85/100 ATS diagnostic audit',
      icon: FileCheck2,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      iconBg: 'bg-purple-600 text-white',
      badge: 'ATS Score',
    },
    {
      id: 'resume-builder' as const,
      name: 'AI Resume Builder',
      tagline: 'Live A4 preview & 3 templates',
      icon: FileEdit,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-600 text-white',
      badge: '3 Templates',
    },
    {
      id: 'ai-cover-letter' as const,
      name: 'Cover Letter Studio',
      tagline: '5 writing tones & side-by-side diff',
      icon: FileSignature,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      iconBg: 'bg-amber-600 text-white',
      badge: '5 Tones',
    },
    {
      id: 'ai-auto-apply' as const,
      name: 'AI Auto Apply',
      tagline: 'Curated queue with human approval',
      icon: Send,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      iconBg: 'bg-rose-600 text-white',
      badge: 'Approval Gate',
    },
    {
      id: 'career-insights' as const,
      name: 'Career Insights',
      tagline: 'Readiness report & 4-week roadmap',
      icon: TrendingUp,
      color: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      iconBg: 'bg-cyan-600 text-white',
      badge: '89/100',
    },
  ]

  const handleSelect = (id: typeof aiTools[number]['id']) => {
    onClose()
    onNavigateScreen(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-xs animate-fadeIn md:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-hub-title"
    >
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Container */}
      <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 flex flex-col z-10 animate-slideUp">
        {/* Drag Handle Bar */}
        <div className="flex items-center justify-center pt-3 pb-1 cursor-grab">
          <div className="w-12 h-1.5 rounded-full bg-slate-300" />
        </div>

        {/* Sheet Header */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 id="ai-hub-title" className="text-base font-bold text-slate-900 leading-tight">
                AI Copilot Hub
              </h3>
              <p className="text-[11px] text-slate-500">
                Choose an intelligent agent workflow
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Tools Grid */}
        <div className="p-4 overflow-y-auto space-y-2.5 max-h-[60vh]">
          {aiTools.map((tool) => {
            const Icon = tool.icon
            const isActive = currentScreen === tool.id

            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => handleSelect(tool.id)}
                className={`w-full p-3.5 rounded-2xl text-left border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50/90 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.99]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${tool.iconBg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900 truncate">
                        {tool.name}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {tool.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Badge variant="slate" size="sm" className="font-mono text-[10px] hidden sm:inline-flex">
                    {tool.badge}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </button>
            )
          })}
        </div>

        {/* Safety Footer Callout */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          <span className="font-medium text-indigo-700">Strict Non-Fabrication Rule:</span> AI agents only synthesize verified candidate data.
        </div>
      </div>
    </div>
  )
}
