import React, { useState, useEffect } from 'react'
import {
  X,
  Bot,
  Sparkles,
  ShieldCheck,
  Mail,
  Globe,
  FileText,
  Compass,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Send,
  Lock,
  Layers,
  Award,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export type FooterInfoTab =
  | 'about'
  | 'contact'
  | 'resources'
  | 'tips'
  | 'guide'
  | 'privacy'
  | 'terms'

export interface FooterInfoModalProps {
  isOpen: boolean
  onClose: () => void
  activeTab?: FooterInfoTab
  onSelectTab?: (tab: FooterInfoTab) => void
  onNavigateScreen?: (screen: string) => void
}

export const FooterInfoModal: React.FC<FooterInfoModalProps> = ({
  isOpen,
  onClose,
  activeTab = 'about',
  onSelectTab,
  onNavigateScreen,
}) => {
  const [currentTab, setCurrentTab] = useState<FooterInfoTab>(activeTab)
  const [prevActiveTab, setPrevActiveTab] = useState<FooterInfoTab>(activeTab)

  if (activeTab !== prevActiveTab) {
    setPrevActiveTab(activeTab)
    setCurrentTab(activeTab)
  }

  // Escape key listener & body lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Contact Form State
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactSubject, setContactSubject] = useState('Hiring / Project Opportunity')
  const [contactMessage, setContactMessage] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactError, setContactError] = useState('')

  const handleTabChange = (tab: FooterInfoTab) => {
    setCurrentTab(tab)
    onSelectTab?.(tab)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError('Please fill in your name, email, and message.')
      return
    }
    setContactError('')
    setContactSubmitted(true)
  }

  const handleResetContact = () => {
    setContactName('')
    setContactEmail('')
    setContactMessage('')
    setContactSubmitted(false)
  }

  if (!isOpen) return null

  const tabsConfig = [
    { id: 'about' as const, label: 'About JobAI', icon: Bot },
    { id: 'contact' as const, label: 'Contact & Hire', icon: Mail },
    { id: 'resources' as const, label: 'Career Resources', icon: BookOpen },
    { id: 'tips' as const, label: 'Resume Tips', icon: FileText },
    { id: 'guide' as const, label: 'Job Search Guide', icon: Compass },
    { id: 'privacy' as const, label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms' as const, label: 'Terms of Service', icon: Lock },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200/80 flex flex-col max-h-[90vh] overflow-hidden z-10"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-xs">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 leading-tight">
                  Job<span className="text-indigo-600">AI</span> Platform Information
                </h2>
                <Badge variant="indigo" size="sm" className="hidden sm:inline-flex px-2 py-0.5 text-[10px]">
                  Powered by CodeByTushu
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                Documentation, developer attribution, resources & policies
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-1 px-4 sm:px-6 py-2 border-b border-slate-100 bg-white overflow-x-auto scrollbar-thin">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon
            const isActive = currentTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/70 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-left space-y-6">
          {/* TAB 1: ABOUT */}
          {currentTab === 'about' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200/60">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Agentic Career Platform</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  About JobAI & Engineering Architecture
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  JobAI is an autonomous career copilot and application automation SaaS engineered to
                  eliminate the fragmentation, repetitive manual work, and opaque algorithms of the modern
                  technical job hunt.
                </p>
              </div>

              {/* Developer Attribution Card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-transparent border border-indigo-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Lead Creator & Architect
                    </span>
                    <Badge variant="indigo" size="sm">
                      CodeByTushu
                    </Badge>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Engineered by CodeByTushu
                  </h4>
                  <p className="text-xs text-slate-500 max-w-lg">
                    Designed as a full-stack portfolio showcase demonstrating production-grade frontend architecture,
                    responsive layout systems, zero-fabrication AI workflows, and state synchronization.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleTabChange('contact')}
                  className="shrink-0 cursor-pointer shadow-xs"
                >
                  Contact Developer
                </Button>
              </div>

              {/* 5 Core Agentic Subsystems */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  5 Autonomous Agentic Modules
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <Zap className="w-4 h-4 text-indigo-600" />
                      <span>Opportunity Discovery Agent</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Indexes verified openings across global tech hubs with salary transparencies, remote indicators, and real-time freshness ranking.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span>ATS Compatibility Neural Engine</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Calculates multi-dimensional match scores (85%+ standard) with transparent explanations, skill gaps, and strengths breakdown.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>Live A4 Resume & ATS Optimizer</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Interactive A4 builder with real-time keyword density scoring, PDF export simulation, and zero-fabrication safety gates.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <Layers className="w-4 h-4 text-amber-600" />
                      <span>Human-in-the-Loop Auto Apply Pipeline</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Autonomous stage progression with pre-flight checklist verification, audit trails, and strict anti-spam rate limiting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Stack Pills */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-700">Technology Stack & Deployment</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                    React 19 & TypeScript
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                    Tailwind CSS & Lucide Icons
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                    Vite Build Pipeline
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                    Netlify Continuous Deployment
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/60">
                    15 Fully Interactive Screens
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT & HIRE */}
          {currentTab === 'contact' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct Communication</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Contact CodeByTushu & Collaboration
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Interested in discussing software engineering opportunities, contract roles, or technical feedback on JobAI? Reach out directly.
                </p>
              </div>

              {/* Quick Contact Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <a
                  href="mailto:codebytushu@gmail.com"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <Mail className="w-5 h-5 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Email</span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">codebytushu@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <GithubIcon className="w-5 h-5 text-slate-800 mb-2 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">GitHub</span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">@CodeByTushu</span>
                  </div>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <LinkedinIcon className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">LinkedIn</span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">CodeByTushu</span>
                  </div>
                </a>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 text-left flex flex-col justify-between">
                  <Globe className="w-5 h-5 text-indigo-600 mb-2" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Deployment</span>
                    <span className="text-xs font-bold text-slate-900">Netlify Ready</span>
                  </div>
                </div>
              </div>

              {/* Interactive Message Inquiry Form */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">
                  Send a Direct Message to CodeByTushu
                </h4>

                {contactSubmitted ? (
                  <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <div className="space-y-1">
                      <h5 className="text-base font-bold text-emerald-900">Message Successfully Sent!</h5>
                      <p className="text-xs text-emerald-700 max-w-md mx-auto">
                        Thank you for reaching out! Your simulated inquiry for “{contactSubject}” has been recorded.
                      </p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={handleResetContact}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3.5">
                    {contactError && (
                      <div className="p-2.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200">
                        {contactError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Your Full Name</label>
                        <input
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Sarah Jenkins (Recruiter)"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Your Email Address</label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="sarah@company.com"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Subject</label>
                      <select
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
                      >
                        <option value="Hiring / Project Opportunity">Hiring / Project Opportunity</option>
                        <option value="Code Review & Architecture Feedback">Code Review & Architecture Feedback</option>
                        <option value="Freelance & Consulting Inquiry">Freelance & Consulting Inquiry</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Message</label>
                      <textarea
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Hi CodeByTushu, I saw your JobAI SaaS portfolio project and would like to connect regarding..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      leftIcon={<Send className="w-3.5 h-3.5" />}
                      className="cursor-pointer"
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CAREER RESOURCES */}
          {currentTab === 'resources' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Curated Knowledge Base</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  High-Impact Career Resources for Technical Talent
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Actionable guides curated to help developers navigate modern ATS algorithms, compensation benchmarks, and interview frameworks.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600">Guide 01</span>
                    <Badge variant="indigo" size="sm">2026 Strategy</Badge>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Mastering Algorithmic ATS Filtering in 2026
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Modern applicant tracking systems (Greenhouse, Lever, Workday) use semantic embedding models rather than raw keyword matching. Learn how to structure your projects and experience bullets to maximize neural cosine similarity without keyword stuffing.
                  </p>
                  {onNavigateScreen && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        onNavigateScreen('resume')
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer pt-1"
                    >
                      <span>Test your resume with JobAI Parser</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-600">Guide 02</span>
                    <Badge variant="purple" size="sm">Market Intelligence</Badge>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Engineering Compensation & Leveling Benchmarks
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Understanding the variance between Base Salary, Equity Grants (RSUs vs. Stock Options), and Performance Bonuses across Seed-stage startups, Series B scaleups, and Tier-1 Tech enterprises.
                  </p>
                  {onNavigateScreen && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        onNavigateScreen('career-insights')
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-700 cursor-pointer pt-1"
                    >
                      <span>Explore Career Insights Dashboard</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600">Guide 03</span>
                    <Badge variant="emerald" size="sm">Interview Playbook</Badge>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    System Design & Architectural Walkthrough Checklist
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A rigorous 5-step checklist for whiteboarding: 1. Functional & Non-functional requirements; 2. Scale & QPS estimation; 3. Data Schema & Storage tiers; 4. API Endpoints; 5. Bottlenecks, caching, and failover redundancy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RESUME TIPS */}
          {currentTab === 'tips' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200/60">
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>ATS Benchmarking</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  ATS Resume Optimization Best Practices
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Engineered guidelines to consistently score 85+ on enterprise resume scoring engines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Google XYZ Formula</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Format every bullet point as: <strong className="text-slate-800">“Accomplished [X] as measured by [Y], by doing [Z].”</strong> Example: “Reduced API response latency by 42% (from 320ms to 185ms) by implementing Redis caching and query batching.”
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Single-Column Typography</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Never use multi-column tables, text boxes, or floating vector graphics in your primary resume body. Standard linear layouts guarantee 100% ATS text-parsing fidelity.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>High-Yield Action Verbs</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Replace passive phrases (“Worked on”, “Helped with”) with authoritative verbs: <em className="text-indigo-600 font-medium">Architected, Engineered, Orchestrated, Benchmarked, Automated, Optimized</em>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Standard Section Headers</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Stick to universally parsed headers: <code className="text-[11px] bg-white px-1.5 py-0.5 rounded border border-slate-200">Work Experience</code>, <code className="text-[11px] bg-white px-1.5 py-0.5 rounded border border-slate-200">Technical Skills</code>, <code className="text-[11px] bg-white px-1.5 py-0.5 rounded border border-slate-200">Projects</code>, <code className="text-[11px] bg-white px-1.5 py-0.5 rounded border border-slate-200">Education</code>.
                  </p>
                </div>
              </div>

              {onNavigateScreen && (
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h5 className="text-xs font-bold text-indigo-900">Build Your ATS Resume in Real-Time</h5>
                    <p className="text-[11px] text-indigo-700">Use the built-in JobAI Live A4 Resume Builder to format and score your resume.</p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      onClose()
                      onNavigateScreen('resume-builder')
                    }}
                    className="cursor-pointer"
                  >
                    Open Resume Builder
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: JOB SEARCH GUIDE */}
          {currentTab === 'guide' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200/60">
                  <Compass className="w-3.5 h-3.5 text-purple-600" />
                  <span>Agentic Search Roadmap</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  The 4-Stage Job Search Execution Guide
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  How to utilize JobAI’s autonomous capabilities systematically to maximize interview conversion rates.
                </p>
              </div>

              <div className="relative pl-6 space-y-6 border-l-2 border-indigo-200">
                <div className="relative space-y-1">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Stage 1</span>
                  <h4 className="text-sm font-bold text-slate-900">Profile Calibration & Resume Parsing</h4>
                  <p className="text-xs text-slate-600">
                    Upload your baseline resume. Let the parser extract your skills, roles, and quantified achievements. Ensure profile completeness reaches 85%+.
                  </p>
                </div>

                <div className="relative space-y-1">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Stage 2</span>
                  <h4 className="text-sm font-bold text-slate-900">AI Compatibility Scoring & Filtering</h4>
                  <p className="text-xs text-slate-600">
                    Filter opportunities by match threshold (80%+). Review the explainable AI rationale for why each opening matches your background.
                  </p>
                </div>

                <div className="relative space-y-1">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Stage 3</span>
                  <h4 className="text-sm font-bold text-slate-900">Grounded Cover Letter Personalization</h4>
                  <p className="text-xs text-slate-600">
                    Generate role-targeted cover letters strictly aligned to the employer’s tech stack, without exaggerating or hallucinating non-existent past experience.
                  </p>
                </div>

                <div className="relative space-y-1">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Stage 4</span>
                  <h4 className="text-sm font-bold text-slate-900">Track Pipeline & Close Skill Gaps</h4>
                  <p className="text-xs text-slate-600">
                    Monitor application statuses in the Kanban tracker, set follow-up reminders, and review the Career Insights diagnostic for any emerging tech gaps.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PRIVACY POLICY */}
          {currentTab === 'privacy' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Data Protection Commitment</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  JobAI Privacy & Data Security Policy
                </h3>
                <p className="text-xs text-slate-500">
                  Effective: 2026 &bull; Developed by CodeByTushu
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">1. Local Storage & Client-Side Privacy</h4>
                  <p>
                    JobAI is designed with a strict privacy-first architecture. Candidate profiles, uploaded resume text, saved opportunities, job applications, and simulated subscriptions are stored directly within your local browser storage (<code className="text-indigo-600 font-mono">localStorage</code>). No personal data or resumes are transmitted to third-party data brokers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">2. Zero Data Selling Guarantee</h4>
                  <p>
                    We maintain an unequivocal policy: We do not sell, rent, monetize, or barter candidate email addresses, contact details, career credentials, or application histories to recruiters, ad networks, or data brokers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">3. Transparent AI & Zero Fabrication</h4>
                  <p>
                    Our simulated AI agents run client-side heuristics and deterministic parsing routines. In accordance with ethical AI standards, the system is hard-coded to never fabricate qualifications, employers, education, or achievements.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">4. Right to Data Erasure</h4>
                  <p>
                    You retain total sovereignty over your test data. Signing out or clearing your browser cache immediately purges your active session and candidate settings from your device.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: TERMS OF SERVICE */}
          {currentTab === 'terms' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200/60">
                  <Lock className="w-3.5 h-3.5 text-purple-600" />
                  <span>Platform Terms</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Terms of Service & Demonstration License
                </h3>
                <p className="text-xs text-slate-500">
                  Effective: 2026 &bull; Author: CodeByTushu
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">1. Purpose & Demonstration Status</h4>
                  <p>
                    JobAI is created and maintained by <strong>CodeByTushu</strong> as a high-fidelity software engineering showcase and SaaS product MVP. It is presented for evaluation by recruiters, engineering managers, and technical peers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">2. Acceptable Use & Ethical AI Standard</h4>
                  <p>
                    Users must use this application responsibly. Automated application workflows must be conducted with human-in-the-loop oversight to uphold fair recruitment standards and prevent employer inbox spamming.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">3. Intellectual Property Rights</h4>
                  <p>
                    The visual design, brand identity, user experience workflows, component architecture, and codebase of JobAI are proprietary works authored by <strong>CodeByTushu</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">4. Disclaimer of Warranty</h4>
                  <p>
                    The platform is provided “as is” for demonstration and evaluation purposes. While designed with production-grade engineering principles, simulated hiring outcomes or mock AI suggestions do not constitute a formal employment guarantee.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/70 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Crafted by</span>
            <strong className="text-slate-800">CodeByTushu</strong>
            <span>&bull; JobAI Platform</span>
          </div>
          <Button variant="secondary" size="sm" onClick={onClose} className="cursor-pointer">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
