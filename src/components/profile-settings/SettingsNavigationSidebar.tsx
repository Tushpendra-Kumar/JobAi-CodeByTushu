import React from 'react'
import {
  User,
  Briefcase,
  Sliders,
  FileText,
  Sparkles,
  Send,
  Bell,
  Shield,
  Database,
  ChevronRight,
} from 'lucide-react'

export interface NavTabItem {
  id: string
  label: string
  shortDesc: string
  icon: React.ElementType
  badge?: string
}

const SETTINGS_TABS: NavTabItem[] = [
  {
    id: 'overview',
    label: 'Personal Information',
    shortDesc: 'Contact details & identity links',
    icon: User,
  },
  {
    id: 'professional',
    label: 'Professional & Skills',
    shortDesc: 'Headline, roles, bio & skills inventory',
    icon: Briefcase,
  },
  {
    id: 'job-preferences',
    label: 'Job Preferences',
    shortDesc: 'Target roles, remote, salary & location',
    icon: Sliders,
  },
  {
    id: 'resume-settings',
    label: 'Resume Settings',
    shortDesc: 'Default resume, templates & formatting',
    icon: FileText,
  },
  {
    id: 'ai-settings',
    label: 'AI & Copilot Behavior',
    shortDesc: 'Matching algorithms & personalization tone',
    icon: Sparkles,
    badge: 'AI Core',
  },
  {
    id: 'application-settings',
    label: 'Application Defaults',
    shortDesc: 'Auto-fill & mandatory human review gate',
    icon: Send,
    badge: 'Safety',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    shortDesc: 'Job alerts & application email updates',
    icon: Bell,
  },
  {
    id: 'account',
    label: 'Account & Security',
    shortDesc: 'Demo session & connected logins',
    icon: Shield,
  },
  {
    id: 'data-privacy',
    label: 'Data & Privacy',
    shortDesc: 'Telemetry, data export & reset',
    icon: Database,
  },
]

interface SettingsNavigationSidebarProps {
  activeTab: string
  onSelectTab: (tabId: string) => void
  hasUnsavedChanges?: boolean
}

export const SettingsNavigationSidebar: React.FC<SettingsNavigationSidebarProps> = ({
  activeTab,
  onSelectTab,
  hasUnsavedChanges = false,
}) => {
  return (
    <aside className="w-full lg:w-72 shrink-0">
      {/* Mobile Tab Scroller / Dropdown Alternative */}
      <div className="lg:hidden mb-4">
        <label htmlFor="mobile-settings-tab" className="sr-only">
          Select Settings Category
        </label>
        <div className="relative">
          <select
            id="mobile-settings-tab"
            value={activeTab}
            onChange={(e) => onSelectTab(e.target.value)}
            aria-label="Select Settings Category"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 text-sm shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {SETTINGS_TABS.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Vertical Navigation */}
      <div className="hidden lg:block bg-white border border-slate-200/90 rounded-2xl p-3 shadow-xs sticky top-24 space-y-1">
        <div className="px-3 pt-2 pb-1.5 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Settings Menu
          </span>
          {hasUnsavedChanges && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 animate-pulse">
              Unsaved changes
            </span>
          )}
        </div>

        <nav className="space-y-1" aria-label="Settings Categories">
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200/70 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`p-2 rounded-lg shrink-0 transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 pr-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold truncate block">{tab.label}</span>
                      {tab.badge && (
                        <span
                          className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-md ${
                            isActive
                              ? 'bg-indigo-200/70 text-indigo-900'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate leading-tight mt-0.5">
                      {tab.shortDesc}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive
                      ? 'text-indigo-600 translate-x-0.5'
                      : 'text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5'
                  }`}
                />
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
