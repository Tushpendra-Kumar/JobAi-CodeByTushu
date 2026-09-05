import React from 'react'
import { Home, Search, Sparkles, Briefcase, User } from 'lucide-react'

export interface MobileBottomNavProps {
  currentScreen: string
  onNavigate: (
    screen: 'home' | 'jobs' | 'applications' | 'profile'
  ) => void
  onOpenAiHub: () => void
  applicationCount?: number
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenAiHub,
  applicationCount = 8,
}) => {
  const isHomeActive = currentScreen === 'home'
  const isJobsActive = currentScreen === 'jobs' || currentScreen === 'job-details'
  const isAiActive = [
    'ai-matching',
    'resume',
    'resume-analysis',
    'resume-builder',
    'ai-cover-letter',
    'ai-auto-apply',
    'career-insights',
  ].includes(currentScreen)
  const isAppsActive = currentScreen === 'applications'
  const isProfileActive = currentScreen === 'profile'

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-2xl px-2 py-1.5 flex items-center justify-around safe-area-bottom"
      aria-label="Mobile Bottom Navigation"
      role="navigation"
    >
      {/* 1. Home Tab */}
      <button
        type="button"
        onClick={() => {
          onNavigate('home')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
          isHomeActive
            ? 'text-indigo-600 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className={`w-5 h-5 ${isHomeActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] mt-0.5 font-medium">Home</span>
      </button>

      {/* 2. Jobs Tab */}
      <button
        type="button"
        onClick={() => {
          onNavigate('jobs')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
          isJobsActive
            ? 'text-indigo-600 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Search className={`w-5 h-5 ${isJobsActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] mt-0.5 font-medium">Jobs</span>
      </button>

      {/* 3. Central AI Hub Button (Elevated Accent) */}
      <button
        type="button"
        onClick={onOpenAiHub}
        className="relative -mt-4 flex flex-col items-center justify-center min-w-[58px] cursor-pointer group"
        aria-label="Open AI Copilot Hub"
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 active:scale-95 ${
            isAiActive
              ? 'bg-gradient-to-tr from-indigo-600 via-indigo-600 to-purple-600 text-white shadow-indigo-300/60 ring-3 ring-indigo-400/30'
              : 'bg-gradient-to-tr from-slate-900 to-indigo-900 text-white shadow-slate-900/30 hover:shadow-indigo-500/20'
          }`}
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <span
          className={`text-[10px] mt-0.5 font-bold ${
            isAiActive ? 'text-indigo-600' : 'text-slate-600'
          }`}
        >
          AI Hub
        </span>
      </button>

      {/* 4. Applications Tab */}
      <button
        type="button"
        onClick={() => {
          onNavigate('applications')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
          isAppsActive
            ? 'text-indigo-600 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className="relative">
          <Briefcase className={`w-5 h-5 ${isAppsActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
          {applicationCount > 0 && (
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-indigo-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
              {applicationCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 font-medium">Pipeline</span>
      </button>

      {/* 5. Profile Tab */}
      <button
        type="button"
        onClick={() => {
          onNavigate('profile')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
          isProfileActive
            ? 'text-indigo-600 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <User className={`w-5 h-5 ${isProfileActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] mt-0.5 font-medium">Profile</span>
      </button>
    </nav>
  )
}
