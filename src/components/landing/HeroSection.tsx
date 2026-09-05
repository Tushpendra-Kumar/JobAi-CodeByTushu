import React from 'react'
import { ArrowRight, Sparkles, CheckCircle2, Bot, FileText, Zap, TrendingUp, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface HeroSectionProps {
  onStartSearch: () => void
  onExploreFeatures: () => void
  onOpenAuth: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartSearch,
  onExploreFeatures,
  onOpenAuth,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-white via-indigo-50/20 to-transparent">
      {/* Background Decorative Grids & Subtle Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Super Header Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide">
                Next-Gen Career Automation
              </span>
              <span className="text-indigo-300">|</span>
              <span className="text-xs font-medium text-slate-600">
                Powered by CodeByTushu
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Find Your Dream Job{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Faster with AI
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Search smarter. Match better. Automate your job applications with an AI-powered career copilot.
            </p>

            {/* Primary / Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={onStartSearch}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shadow-md shadow-indigo-500/20"
              >
                Start Your AI Job Search
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onExploreFeatures}
              >
                Explore Features
              </Button>
            </div>

            {/* Trust Micro-Bullets */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero spam submissions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                <span>Human-in-the-loop review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Real-time ATS benchmarking</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity AI Career Copilot Visual Mockup */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Copilot Interface Container */}
              <div className="relative rounded-2xl border border-slate-200/90 bg-white/95 p-5 sm:p-6 shadow-2xl backdrop-blur-xl ring-1 ring-slate-900/5">
                {/* Simulated Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-rose-400/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">
                      jobai.agent / copilot-live-v2.8
                    </span>
                  </div>
                  <Badge variant="indigo" size="sm" dot>
                    Copilot Active
                  </Badge>
                </div>

                {/* Copilot Dashboard Content */}
                <div className="mt-5 space-y-4">
                  {/* Job Match Highlight Row */}
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:bg-slate-50">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            Senior Full Stack Engineer
                          </span>
                          <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                            Remote / Hybrid
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Apex Technologies • $140,000 - $175,000/yr
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200 shadow-xs">
                          95% Job Match
                        </div>
                      </div>
                    </div>

                    {/* Skill Match Pills */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                        TypeScript
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                        React 19
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                        Node.js
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                        AI Agent APIs
                      </span>
                      <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5 ml-1">
                        +5 more aligned
                      </span>
                    </div>
                  </div>

                  {/* Telemetry Metrics Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-500">
                          ATS Resume Score
                        </span>
                        <FileText className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-slate-900">
                          92
                        </span>
                        <span className="text-xs text-emerald-600 font-semibold">
                          +14 pts optimized
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full w-[92%]" />
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-500">
                          Agent Status
                        </span>
                        <Bot className="w-4 h-4 text-violet-500" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-slate-800">
                          Application Ready
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Cover letter customized
                      </p>
                    </div>
                  </div>

                  {/* Agent Task Activity Stream */}
                  <div className="rounded-xl border border-indigo-100/60 bg-gradient-to-r from-indigo-50/40 via-violet-50/30 to-white p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-[11px]">
                          Automated Application Pipeline
                        </p>
                        <p className="text-[10px] text-slate-500">
                          3 high-fit opportunities analyzed for review
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onOpenAuth}
                      className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      Inspect →
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating UI Badges for Depth */}
              <div className="absolute -top-4 -right-4 sm:-right-6 hidden sm:flex items-center gap-2 bg-white/95 border border-indigo-100 px-3.5 py-2 rounded-xl shadow-lg backdrop-blur-md animate-float">
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-800">3 New Matches</p>
                  <p className="text-[9px] text-slate-400">90%+ match threshold</p>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-4 sm:-left-6 hidden sm:flex items-center gap-2 bg-white/95 border border-indigo-100 px-3.5 py-2 rounded-xl shadow-lg backdrop-blur-md animate-float-delayed">
                <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-800">Career Intelligence</p>
                  <p className="text-[9px] text-emerald-600 font-semibold">+35% Interview Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
