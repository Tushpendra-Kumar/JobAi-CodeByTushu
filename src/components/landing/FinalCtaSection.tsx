import { ArrowRight, Sparkles, Bot, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface FinalCtaSectionProps {
  onStartJourney: () => void
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onStartJourney }) => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0A0F1D] via-[#0F172A] to-[#1E1B4B] p-8 sm:p-12 lg:p-16 text-center text-white overflow-hidden shadow-2xl border border-indigo-500/20">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 text-xs font-semibold shadow-xs">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>JobAI Career Automation</span>
              <span className="text-indigo-600">|</span>
              <span className="text-indigo-200">Powered by CodeByTushu</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Stop Searching.{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                Start Building Your Career.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Let AI handle the repetitive work while you focus on getting hired.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onStartJourney}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold shadow-xl shadow-indigo-600/30"
              >
                Start Your Journey
              </Button>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Instant Demo Access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>No Credit Card Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
