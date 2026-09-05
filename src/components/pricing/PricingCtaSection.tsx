import React from 'react'
import { Sparkles, ArrowRight, Bot } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export interface PricingCtaSectionProps {
  onStartFree: () => void
  onExplorePlatform: () => void
}

export const PricingCtaSection: React.FC<PricingCtaSectionProps> = ({
  onStartFree,
  onExplorePlatform,
}) => {
  return (
    <div className="mt-20 relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-14 text-center shadow-xl">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge
            variant="indigo"
            size="md"
            className="bg-indigo-500/20 text-indigo-200 border-indigo-400/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            Empower Your Career Today
          </Badge>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
          Build a smarter job search.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
          Let JobAI handle the repetitive work while you stay in control of every important
          decision. Start free with zero obligation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={onStartFree}
            className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-950 font-bold px-8 shadow-lg shadow-indigo-950/50 cursor-pointer"
            rightIcon={<ArrowRight className="w-4 h-4 text-indigo-600" />}
          >
            Start Free
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onExplorePlatform}
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-semibold px-8 cursor-pointer"
            leftIcon={<Bot className="w-4 h-4 text-indigo-400" />}
          >
            Explore JobAI
          </Button>
        </div>

        <p className="text-xs text-slate-400 pt-2">
          No credit card required • Instant access in frictionless demo mode
        </p>
      </div>
    </div>
  )
}
