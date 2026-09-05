import React, { useState } from 'react'
import { Sparkles, Menu, X, ArrowRight, Bot } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface NavbarProps {
  onOpenAuth: (initialTab?: 'login' | 'signup') => void
  onNavigateSection?: (sectionId: string) => void
  currentScreen?:
    | 'home'
    | 'jobs'
    | 'job-details'
    | 'ai-matching'
    | 'resume'
    | 'resume-analysis'
    | 'resume-builder'
    | 'ai-auto-apply'
    | 'applications'
    | 'ai-cover-letter'
    | 'career-insights'
    | 'profile'
    | 'pricing'
    | 'mobile-preview'
    | 'login'
    | 'signup'
    | 'forgot-password'
  onNavigateScreen?: (
    screen:
      | 'home'
      | 'jobs'
      | 'job-details'
      | 'ai-matching'
      | 'resume'
      | 'resume-analysis'
      | 'resume-builder'
      | 'ai-auto-apply'
      | 'applications'
      | 'ai-cover-letter'
      | 'career-insights'
      | 'profile'
      | 'pricing'
      | 'mobile-preview'
      | 'login'
      | 'signup'
      | 'forgot-password'
  ) => void
  currentUser?: { email: string; name?: string } | null
  onLogout?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onNavigateSection,
  currentScreen = 'home',
  onNavigateScreen,
  currentUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Jobs', href: '#jobs', screen: 'jobs' as const },
    { name: 'AI Matching', href: '#ai-matching', screen: 'ai-matching' as const },
    { name: 'Resume', href: '#resume', screen: 'resume' as const },
    { name: 'Cover Letter', href: '#ai-cover-letter', screen: 'ai-cover-letter' as const },
    { name: 'Auto Apply', href: '#ai-auto-apply', screen: 'ai-auto-apply' as const },
    { name: 'Applications', href: '#applications', screen: 'applications' as const },
    { name: 'Insights', href: '#career-insights', screen: 'career-insights' as const },
    { name: 'Pricing', href: '#pricing', screen: 'pricing' as const },
    { name: 'Profile', href: '#profile', screen: 'profile' as const },
    { name: 'Mobile', href: '#mobile-preview', screen: 'mobile-preview' as const },
    { name: 'AI Tools', href: '#features-section', screen: 'home' as const },
  ]

  const handleLinkClick = (link: typeof navLinks[number]) => {
    setMobileMenuOpen(false)
    if (link.screen === 'jobs') {
      onNavigateScreen?.('jobs')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (link.screen === 'ai-matching') {
      onNavigateScreen?.('ai-matching')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (link.screen === 'resume') {
      onNavigateScreen?.('resume')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (link.screen === 'ai-cover-letter') {
      onNavigateScreen?.('ai-cover-letter')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (link.screen === 'ai-auto-apply') {
      onNavigateScreen?.('ai-auto-apply')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (link.screen === 'applications') {
      onNavigateScreen?.('applications')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (link.screen === 'career-insights') {
      onNavigateScreen?.('career-insights')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (link.screen === 'profile') {
      onNavigateScreen?.('profile')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (link.screen === 'pricing') {
      onNavigateScreen?.('pricing')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (link.screen === 'mobile-preview') {
      onNavigateScreen?.('mobile-preview')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (currentScreen !== 'home') {
      onNavigateScreen?.('home')
      setTimeout(() => {
        onNavigateSection?.(link.href.replace('#', ''))
      }, 50)
      return
    }

    if (onNavigateSection) {
      onNavigateSection(link.href.replace('#', ''))
    } else {
      const element = document.querySelector(link.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                onNavigateScreen?.('home')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="group flex items-center gap-2.5 transition-transform hover:opacity-95 cursor-pointer"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 text-white shadow-sm ring-1 ring-indigo-500/30">
                <Bot className="h-5 w-5 transition-transform group-hover:scale-105" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-lg font-bold tracking-tight text-slate-900 leading-none flex items-center gap-1.5">
                  Job<span className="text-indigo-600">AI</span>
                </span>
                <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase mt-0.5">
                  Career Copilot
                </span>
              </div>
            </a>

            {/* Subtle Platform Attribution */}
            <Badge variant="indigo" size="sm" className="hidden sm:inline-flex ml-2 py-0.5 px-2 text-[10px] font-medium bg-indigo-50/70 text-indigo-700 border-indigo-200/50">
              Powered by CodeByTushu
            </Badge>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive =
                (link.screen === 'jobs' &&
                  (currentScreen === 'jobs' || currentScreen === 'job-details')) ||
                (link.screen === 'ai-matching' && currentScreen === 'ai-matching') ||
                (link.screen === 'ai-cover-letter' && currentScreen === 'ai-cover-letter') ||
                (link.screen === 'ai-auto-apply' && currentScreen === 'ai-auto-apply') ||
                (link.screen === 'applications' && currentScreen === 'applications') ||
                (link.screen === 'career-insights' && currentScreen === 'career-insights') ||
                (link.screen === 'pricing' && currentScreen === 'pricing') ||
                (link.screen === 'profile' && currentScreen === 'profile') ||
                (link.screen === 'mobile-preview' && currentScreen === 'mobile-preview') ||
                (link.screen === 'resume' &&
                  (currentScreen === 'resume' ||
                    currentScreen === 'resume-analysis' ||
                    currentScreen === 'resume-builder'))
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link)}
                  className={`px-3.5 py-1.5 text-sm rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/60'
                      : 'font-medium text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                  }`}
                >
                  {link.name}
                </button>
              )
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onNavigateScreen?.('profile')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer text-xs font-semibold text-slate-800"
                  title="Manage Profile & Settings"
                >
                  <Badge variant="emerald" size="sm" dot>
                    {currentUser.name || currentUser.email.split('@')[0]}
                  </Badge>
                </button>
                {onLogout && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onLogout}
                    className="text-xs text-slate-500 hover:text-rose-600"
                  >
                    Sign Out
                  </Button>
                )}
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (onNavigateScreen) {
                      onNavigateScreen('login')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    } else {
                      onOpenAuth('login')
                    }
                  }}
                  className="text-slate-700 hover:text-slate-950 font-medium cursor-pointer"
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    if (onNavigateScreen) {
                      onNavigateScreen('signup')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    } else {
                      onOpenAuth('signup')
                    }
                  }}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="shadow-sm cursor-pointer"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="pb-2 border-b border-slate-100">
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Powered by CodeByTushu
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className="flex items-center justify-between w-full px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                {link.name}
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex flex-col gap-2">
                <div className="px-3 py-2 bg-emerald-50 rounded-lg flex items-center justify-between text-xs text-emerald-800">
                  <span className="font-semibold">Demo User:</span>
                  <span>{currentUser.email}</span>
                </div>
                {onLogout && (
                  <Button
                    variant="secondary"
                    className="w-full justify-center"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      onLogout()
                    }}
                  >
                    Sign Out
                  </Button>
                )}
              </div>
            ) : (
              <>
                <Button
                  variant="secondary"
                  className="w-full justify-center"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onNavigateScreen) {
                      onNavigateScreen('login')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    } else {
                      onOpenAuth('login')
                    }
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onNavigateScreen) {
                      onNavigateScreen('signup')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    } else {
                      onOpenAuth('signup')
                    }
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
