import React from 'react'
import { ArrowRight, Bot, Sparkles, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export interface ApplyCtaCardProps {
  onApplyNow: () => void
  onPrepareWithAi: () => void
}

export const ApplyCtaCard: React.FC<ApplyCtaCardProps> = ({
  onApplyNow,
  onPrepareWithAi,
}) => {
  return (
    <Card className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white border-indigo-500/30 shadow-xl text-left relative overflow-hidden mb-6">
      {/* Glow */}
      <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-indigo-500/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-800/60 border border-indigo-700/60 text-[11px] font-semibold text-indigo-200">
          <Bot className="w-3.5 h-3.5 text-indigo-400" />
          <span>Copilot Assisted Application</span>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-white leading-snug">
          Ready to apply?
        </h3>

        <p className="text-xs text-indigo-200/90 leading-relaxed">
          Your AI career copilot can help prepare your application for this role.
        </p>

        <div className="space-y-2 pt-2">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onApplyNow}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full justify-center text-xs font-bold h-11 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 shadow-md shadow-indigo-600/30 border border-indigo-400/30"
          >
            Apply Now
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onPrepareWithAi}
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
            className="w-full justify-center text-xs font-semibold h-10 border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 shadow-xs"
          >
            Prepare with AI
          </Button>
        </div>

        <div className="pt-2 flex items-center gap-2 text-[10px] text-indigo-300/70 border-t border-indigo-800/40">
          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
          <span>Human-in-the-loop review before any submission</span>
        </div>
      </div>
    </Card>
  )
}
