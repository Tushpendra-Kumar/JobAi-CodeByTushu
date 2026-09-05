import React, { useState } from 'react'
import {
  LayoutDashboard,
  Search,
  Sparkles,
  FileText,
  Send,
  Bookmark,
  Briefcase,
  TrendingUp,
  Settings,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  FileSignature,
  CreditCard,
} from 'lucide-react'

export interface DashboardSidebarProps {
  activeTab?: string
  onSelectTab: (tabId: string) => void
  onNavigateToJobs: () => void
  onNavigateToResume?: () => void
  onNavigateToAnalysis?: () => void
  onNavigateToMatching?: () => void
  onNavigateToBuilder?: () => void
  onNavigateToCoverLetter?: () => void
  onNavigateToAutoApply?: () => void
  onNavigateToApplications?: () => void
  onNavigateToCareerInsights?: () => void
  onNavigateToProfile?: () => void
  onNavigateToPricing?: () => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
  className?: string
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab = 'ai-matching',
  onSelectTab,
  onNavigateToJobs,
  onNavigateToResume,
  onNavigateToAnalysis,
  onNavigateToMatching,
  onNavigateToBuilder,
  onNavigateToCoverLetter,
  onNavigateToAutoApply,
  onNavigateToApplications,
  onNavigateToCareerInsights,
  onNavigateToProfile,
  onNavigateToPricing,
  onToast,
  className = '',
}) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, isFuture: true },
    { id: 'jobs', label: 'Job Search', icon: Search, isAction: 'jobs' },
    { id: 'ai-matching', label: 'AI Job Matching', icon: Sparkles, badge: 'Live' },
    { id: 'resume', label: 'Resume', icon: FileText, badge: 'Live' },
    { id: 'cover-letter', label: 'Cover Letter', icon: FileSignature, badge: 'Live' },
    { id: 'auto-apply', label: 'Auto Apply', icon: Send, badge: 'Live' },
    { id: 'saved-jobs', label: 'Saved Jobs', icon: Bookmark, isFuture: true },
    { id: 'applications', label: 'Applications', icon: Briefcase, badge: 'Live' },
    { id: 'career-insights', label: 'Career Insights', icon: TrendingUp, badge: 'Live' },
    { id: 'pricing', label: 'Pricing & Plans', icon: CreditCard, badge: 'Live' },
    { id: 'settings', label: 'Profile & Settings', icon: Settings, badge: 'Live' },
  ]

  const handleClick = (item: typeof navItems[number]) => {
    setIsMobileExpanded(false)
    if (item.isAction === 'jobs') {
      onNavigateToJobs()
      return
    }

    if (item.id === 'career-insights') {
      if (onNavigateToCareerInsights) {
        onNavigateToCareerInsights()
      } else {
        onSelectTab('career-insights')
      }
      return
    }

    if (item.id === 'pricing') {
      if (onNavigateToPricing) {
        onNavigateToPricing()
      } else {
        onSelectTab('pricing')
      }
      return
    }

    if (item.id === 'cover-letter') {
      if (onNavigateToCoverLetter) {
        onNavigateToCoverLetter()
      } else {
        onSelectTab('cover-letter')
      }
      return
    }

    if (item.id === 'resume') {
      if (activeTab === 'resume-builder' && onNavigateToBuilder) {
        onNavigateToBuilder()
      } else if (activeTab === 'resume-analysis' && onNavigateToAnalysis) {
        onNavigateToAnalysis()
      } else if (onNavigateToResume) {
        onNavigateToResume()
      }
      return
    }

    if (item.id === 'auto-apply') {
      if (onNavigateToAutoApply) {
        onNavigateToAutoApply()
      } else {
        onSelectTab('auto-apply')
      }
      return
    }

    if (item.id === 'applications') {
      if (onNavigateToApplications) {
        onNavigateToApplications()
      } else {
        onSelectTab('applications')
      }
      return
    }

    if (item.id === 'ai-matching' && onNavigateToMatching) {
      onNavigateToMatching()
      return
    }

    if (item.id === 'settings') {
      if (onNavigateToProfile) {
        onNavigateToProfile()
      } else {
        onSelectTab('settings')
      }
      return
    }

    if (item.isFuture) {
      onToast(`“${item.label}” screen will be available in upcoming releases.`, 'info')
      return
    }

    onSelectTab(item.id)
  }

  const activeItem =
    navItems.find((item) => item.id === activeTab) ||
    (activeTab.startsWith('resume') ? navItems.find((i) => i.id === 'resume') : null) ||
    navItems[2]

  return (
    <aside
      className={`w-full lg:w-64 shrink-0 bg-white border border-slate-200/80 rounded-2xl p-3.5 lg:p-4 shadow-sm flex flex-col justify-between ${className}`}
      aria-label="Dashboard Navigation"
    >
      {/* Mobile Collapsible Header (Hidden on lg screens) */}
      <div
        className="flex items-center justify-between lg:hidden cursor-pointer py-0.5 select-none"
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        role="button"
        tabIndex={0}
        aria-expanded={isMobileExpanded}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <LayoutDashboard className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-800 truncate">Career Workspace</span>
          <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 truncate">
            {activeItem?.label}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600">
          <span>{isMobileExpanded ? 'Close' : 'Switch'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isMobileExpanded ? 'rotate-180 text-indigo-600' : ''
            }`}
          />
        </div>
      </div>

      <div className={`${isMobileExpanded ? 'block' : 'hidden'} lg:block space-y-6 mt-3 lg:mt-0`}>
        {/* Navigation Section Title */}
        <div className="px-2 pt-1 pb-1 hidden lg:block">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Career Workspace
          </p>
        </div>

        {/* Navigation Items List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              activeTab === item.id ||
              (item.id === 'resume' &&
                (activeTab === 'resume-analysis' || activeTab === 'resume-builder'))

            return (
              <div key={item.id} className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleClick(item)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50/90 text-indigo-700 font-semibold shadow-xs border border-indigo-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-4 h-4 text-indigo-600" />}
                  </div>
                </button>

                {/* Nested Resume Sub-Items (Upload Resume, AI Analysis, Resume Builder) */}
                {item.id === 'resume' &&
                  (activeTab === 'resume' ||
                    activeTab === 'resume-analysis' ||
                    activeTab === 'resume-builder') && (
                    <div className="pl-11 pr-2 pt-1 pb-1 space-y-1 text-left animate-in slide-in-from-top-1 duration-150">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (onNavigateToResume) onNavigateToResume()
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          activeTab === 'resume'
                            ? 'bg-indigo-100/80 text-indigo-900 font-bold'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span>Upload Resume</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (onNavigateToAnalysis) onNavigateToAnalysis()
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          activeTab === 'resume-analysis'
                            ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span>AI Analysis</span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                            activeTab === 'resume-analysis'
                              ? 'bg-white/20 text-white'
                              : 'bg-indigo-100 text-indigo-700'
                          }`}
                        >
                          Live
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (onNavigateToBuilder) {
                            onNavigateToBuilder()
                          } else {
                            onSelectTab('resume-builder')
                          }
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          activeTab === 'resume-builder'
                            ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span>Resume Builder</span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                            activeTab === 'resume-builder'
                              ? 'bg-white/20 text-white'
                              : 'bg-indigo-100 text-indigo-700'
                          }`}
                        >
                          Live
                        </span>
                      </button>
                    </div>
                  )}
              </div>
            )
          })}
        </nav>
      </div>

      {/* Bottom Pro Badge / Session info */}
      <div className="pt-6 mt-6 border-t border-slate-100">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50/50 border border-indigo-100/60 text-left">
          <div className="flex items-center gap-2 text-indigo-900 font-semibold text-xs mb-1">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>AI Copilot Verified</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Candidate profile actively synched with verified hiring criteria.
          </p>
        </div>
      </div>
    </aside>
  )
}
