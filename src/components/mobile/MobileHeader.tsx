import React from 'react'
import { Bot, ArrowLeft, User, Sparkles } from 'lucide-react'

export interface MobileHeaderProps {
  currentScreen: string
  onNavigateHome: () => void
  onNavigateBack?: () => void
  onNavigateProfile?: () => void
  onOpenAuth?: (tab?: 'login' | 'signup') => void
  currentUser?: { email: string; name?: string } | null
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  currentScreen,
  onNavigateHome,
  onNavigateBack,
  onNavigateProfile,
  onOpenAuth,
  currentUser,
}) => {
  const getScreenTitle = (screen: string): string => {
    switch (screen) {
      case 'home':
        return 'JobAI Copilot'
      case 'jobs':
        return 'Job Discovery'
      case 'job-details':
        return 'Job Details'
      case 'ai-matching':
        return 'AI Match Dashboard'
      case 'resume':
        return 'Resume Upload'
      case 'resume-analysis':
        return 'ATS Resume Audit'
      case 'resume-builder':
        return 'AI Resume Builder'
      case 'ai-auto-apply':
        return 'Auto Apply Queue'
      case 'applications':
        return 'Application Tracking'
      case 'ai-cover-letter':
        return 'Cover Letter Studio'
      case 'career-insights':
        return 'Career Insights'
      case 'profile':
        return 'Profile & Settings'
      case 'pricing':
        return 'Pricing & Plans'
      case 'mobile-preview':
        return 'Mobile Showcase'
      default:
        return 'JobAI'
    }
  }

  const isSubScreen = ['job-details', 'resume-analysis'].includes(currentScreen)
  const title = getScreenTitle(currentScreen)

  return (
    <div className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between shadow-2xs">
      {/* Left: Back button or Logo */}
      <div className="flex items-center gap-2">
        {isSubScreen && onNavigateBack ? (
          <button
            type="button"
            onClick={onNavigateBack}
            className="p-1.5 -ml-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
          </button>
        )}

        <div className="flex flex-col">
          <span className="text-xs font-black tracking-tight text-slate-900 leading-none">
            {title}
          </span>
          <span className="text-[10px] text-slate-400 leading-tight">
            by CodeByTushu
          </span>
        </div>
      </div>

      {/* Right: Quick action or Profile Avatar */}
      <div className="flex items-center gap-2">
        {currentUser ? (
          <button
            type="button"
            onClick={onNavigateProfile}
            className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-indigo-600" />
            <span className="max-w-[70px] truncate text-[11px]">
              {currentUser.name || currentUser.email.split('@')[0]}
            </span>
          </button>
        ) : onNavigateProfile ? (
          <button
            type="button"
            onClick={onNavigateProfile}
            className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Profile"
          >
            <User className="w-4 h-4" />
          </button>
        ) : onOpenAuth ? (
          <button
            type="button"
            onClick={() => onOpenAuth('signup')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Copilot</span>
          </div>
        )}
      </div>
    </div>
  )
}
