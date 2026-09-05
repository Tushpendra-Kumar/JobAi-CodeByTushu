import React from 'react'
import { Bot, Sparkles, CheckCircle2, ShieldCheck, Zap, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { type FooterInfoTab } from '@/components/footer/FooterInfoModal'

export interface AuthLayoutProps {
  children: React.ReactNode
  onBackToHome?: () => void
  onOpenInfoModal?: (tab: FooterInfoTab) => void
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  onBackToHome,
  onOpenInfoModal,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center">
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT COLUMN: Brand & Product Visual Showcase (Visible on lg+) */}
        <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-12 flex-col justify-between overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Top Header: Logo & Back Button (if provided) */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-md ring-1 ring-indigo-400/30">
                <Bot className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-bold tracking-tight text-white leading-none">
                  Job<span className="text-indigo-400">AI</span>
                </span>
                <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase mt-1">
                  Your AI Career Copilot
                </span>
              </div>
            </div>

            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </button>
            )}
          </div>

          {/* Middle Body: Value Proposition & Feature Highlights */}
          <div className="relative z-10 my-auto py-8 space-y-8 max-w-md text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Next-Gen Career Automation</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
                One workspace for your entire job search.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Discover verified opportunities, match against ATS algorithms, generate truthful cover letters, and track pipeline metrics.
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">AI Job Matching Engine</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Compatibility scoring with explainable rationale and skill-gap recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Resume ATS Intelligence</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Live A4 builder, keyword alignment, and 85+ score benchmarking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Zero-Fabrication Guarantee</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Strict human review safety gate; your real credentials are never exaggerated.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Attribution */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span>Powered by</span>
              <span className="font-bold text-white">CodeByTushu</span>
            </div>
            <Badge variant="indigo" size="sm" className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30">
              Demo SaaS Platform
            </Badge>
          </div>
        </div>

        {/* RIGHT COLUMN: Form Card Area (Mobile + Desktop) */}
        <div className="col-span-1 lg:col-span-7 xl:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-y-auto">
          {/* Mobile Top Header (Visible on < lg) */}
          <div className="lg:hidden flex items-center justify-between pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-xs">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base font-bold text-slate-900">
                  Job<span className="text-indigo-600">AI</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  By CodeByTushu
                </span>
              </div>
            </div>

            {onBackToHome ? (
              <button
                type="button"
                onClick={onBackToHome}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
            ) : (
              <Badge variant="indigo" size="sm" className="text-[10px] px-2 py-0.5 font-medium">
                Demo Gateway
              </Badge>
            )}
          </div>

          {/* Form Content Center Container */}
          <div className="w-full max-w-md mx-auto my-auto py-8">
            {children}
          </div>

          {/* Bottom Disclaimer */}
          <div className="w-full max-w-md mx-auto pt-6 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1.5">
            <p>
              By continuing, you agree to the{' '}
              <button
                type="button"
                onClick={() => onOpenInfoModal?.('terms')}
                className="font-medium text-slate-700 underline hover:text-indigo-600 cursor-pointer"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => onOpenInfoModal?.('privacy')}
                className="font-medium text-slate-700 underline hover:text-indigo-600 cursor-pointer"
              >
                Privacy Policy
              </button>.
            </p>
            <p className="text-[11px] text-slate-400">
              JobAI Portfolio Demo Edition &bull; Powered by CodeByTushu &bull; No production credentials stored
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
