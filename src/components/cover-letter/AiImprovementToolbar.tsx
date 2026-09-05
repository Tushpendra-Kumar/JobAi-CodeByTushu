import React from 'react'
import {
  Sparkles,
  Scissors,
  Flame,
  Cpu,
  Target,
  FileCheck,
  Zap,
  CheckCheck,
  Loader2,
} from 'lucide-react'
import type { AIImproveAction } from '@/services/coverLetterAIService'

interface AiImprovementToolbarProps {
  onAction: (action: AIImproveAction) => void
  isImproving: boolean
  activeAction?: AIImproveAction | null
  disabled?: boolean
}

interface ActionItem {
  id: AIImproveAction
  label: string
  icon: React.ComponentType<{ className?: string }>
  desc: string
}

const ACTIONS: ActionItem[] = [
  {
    id: 'improve-writing',
    label: 'Polish Writing',
    icon: Sparkles,
    desc: 'Enhance vocabulary, flow, and sentence variety',
  },
  {
    id: 'make-concise',
    label: 'Make Concise',
    icon: Scissors,
    desc: 'Remove filler and make every sentence impactful',
  },
  {
    id: 'make-confident',
    label: 'Make Confident',
    icon: Flame,
    desc: 'Replace passive phrases with strong ownership statements',
  },
  {
    id: 'make-technical',
    label: 'Technical Depth',
    icon: Cpu,
    desc: 'Emphasize architectural rigor, typing, and efficiency',
  },
  {
    id: 'improve-alignment',
    label: 'Role Alignment',
    icon: Target,
    desc: 'Reinforce company name and job title specificity',
  },
  {
    id: 'improve-opening',
    label: 'Hook Opening',
    icon: Zap,
    desc: 'Draft an attention-grabbing opening paragraph',
  },
  {
    id: 'improve-closing',
    label: 'Strong Closing',
    icon: FileCheck,
    desc: 'Write an assertive call to action for the interview',
  },
  {
    id: 'fix-grammar',
    label: 'Grammar Clean',
    icon: CheckCheck,
    desc: 'Normalize punctuation, paragraph spacing, and syntax',
  },
]

export const AiImprovementToolbar: React.FC<AiImprovementToolbarProps> = ({
  onAction,
  isImproving,
  activeAction,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>AI Refinement Copilot</span>
        </div>
        <span className="text-[11px] text-slate-400">Preview changes before applying</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ACTIONS.map((item) => {
          const Icon = item.icon
          const isActive = isImproving && activeAction === item.id
          return (
            <button
              key={item.id}
              type="button"
              disabled={disabled || isImproving}
              onClick={() => onAction(item.id)}
              className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-white hover:bg-indigo-50/50 hover:border-indigo-200 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-50 group-hover:bg-indigo-100/70 flex items-center justify-center shrink-0 text-slate-600 group-hover:text-indigo-700 transition-colors">
                {isActive ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-800 group-hover:text-indigo-900 truncate">
                  {item.label}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
