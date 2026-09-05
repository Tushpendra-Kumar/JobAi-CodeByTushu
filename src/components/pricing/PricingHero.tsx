import React from 'react'
import { Sparkles, Shield, Lock, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export const PricingHero: React.FC = () => {
  return (
    <div className="relative pt-8 pb-10 text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 blur-3xl -z-10 pointer-events-none" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 mb-4">
        <Badge variant="indigo" size="md" className="py-1 px-3.5 shadow-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span>Transparent, Human-Centered AI Pricing</span>
          <span className="text-indigo-300">|</span>
          <span className="text-indigo-800 text-xs">Powered by CodeByTushu</span>
        </Badge>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight sm:leading-tight">
        Choose the plan that fits your{' '}
        <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
          career journey.
        </span>
      </h1>

      {/* Supporting Text */}
      <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Start with the essentials. Upgrade when you’re ready to automate more of your job search,
        optimize ATS resumes, and accelerate applications.
      </p>

      {/* Subtle Trust Indicators */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm font-medium text-slate-600">
        <div className="inline-flex items-center gap-1.5 text-slate-700">
          <Shield className="w-4 h-4 text-indigo-600" />
          <span>Your career. Your data. Your decisions.</span>
        </div>
        <div className="hidden sm:inline-block text-slate-300">•</div>
        <div className="inline-flex items-center gap-1.5 text-slate-600">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>No job outcome exaggerations</span>
        </div>
        <div className="hidden sm:inline-block text-slate-300">•</div>
        <div className="inline-flex items-center gap-1.5 text-slate-600">
          <Lock className="w-4 h-4 text-purple-600" />
          <span>Strict human-in-the-loop approval</span>
        </div>
      </div>
    </div>
  )
}
