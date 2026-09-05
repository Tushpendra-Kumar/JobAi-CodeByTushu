import React, { useState } from 'react'
import {
  Smartphone,
  Wifi,
  Battery,
  CheckCircle2,
  Layers,
  RotateCcw,
  ExternalLink,
  Sliders,
  Maximize2,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { HeroSection } from '@/components/landing/HeroSection'
import { JobSearchScreen } from '@/components/jobs/JobSearchScreen'
import { MatchingDashboardScreen } from '@/components/matching/MatchingDashboardScreen'
import { ResumeBuilderScreen } from '@/components/resume-builder/ResumeBuilderScreen'
import { AutoApplyScreen } from '@/components/auto-apply/AutoApplyScreen'
import { ApplicationTrackingScreen } from '@/components/applications/ApplicationTrackingScreen'
import { CareerInsightsScreen } from '@/components/career-insights/CareerInsightsScreen'
import { ProfileSettingsScreen } from '@/components/profile-settings/ProfileSettingsScreen'
import { PricingScreen } from '@/components/pricing/PricingScreen'
import { defaultCandidateProfile } from '@/data/candidateProfile'
import { defaultParsedResume } from '@/data/resumeData'

export interface MobilePreviewScreenProps {
  onNavigateScreen: (screenName: string) => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

type DeviceModel = 'iphone15' | 'iphonese' | 'pixel8' | 'galaxys24'
type PreviewScreenKey =
  | 'home'
  | 'jobs'
  | 'matching'
  | 'builder'
  | 'autoapply'
  | 'tracking'
  | 'insights'
  | 'profile'
  | 'pricing'

interface DeviceSpec {
  name: string
  width: number
  height: number
  bezel: string
  islandStyle: 'island' | 'punch' | 'notch'
}

const DEVICE_SPECS: Record<DeviceModel, DeviceSpec> = {
  iphone15: {
    name: 'iPhone 15 Pro',
    width: 393,
    height: 852,
    bezel: 'rounded-[50px] border-[12px] border-slate-900',
    islandStyle: 'island',
  },
  iphonese: {
    name: 'iPhone SE (375px Compact)',
    width: 375,
    height: 667,
    bezel: 'rounded-[40px] border-[10px] border-slate-900',
    islandStyle: 'notch',
  },
  pixel8: {
    name: 'Google Pixel 8',
    width: 412,
    height: 890,
    bezel: 'rounded-[46px] border-[11px] border-slate-900',
    islandStyle: 'punch',
  },
  galaxys24: {
    name: 'Galaxy S24 (360px)',
    width: 360,
    height: 780,
    bezel: 'rounded-[44px] border-[10px] border-slate-900',
    islandStyle: 'punch',
  },
}

export const MobilePreviewScreen: React.FC<MobilePreviewScreenProps> = ({
  onNavigateScreen,
  onToast,
}) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceModel>('iphone15')
  const [activeScreen, setActiveScreen] = useState<PreviewScreenKey>('home')
  const [zoomScale, setZoomScale] = useState<number>(0.9)
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-2'])

  const device = DEVICE_SPECS[selectedDevice]

  const screenOptions = [
    { key: 'home' as const, label: 'Landing / Home', route: 'home' },
    { key: 'jobs' as const, label: 'Job Search', route: 'jobs' },
    { key: 'matching' as const, label: 'AI Matching', route: 'ai-matching' },
    { key: 'builder' as const, label: 'Resume Builder', route: 'resume-builder' },
    { key: 'autoapply' as const, label: 'Auto Apply', route: 'ai-auto-apply' },
    { key: 'tracking' as const, label: 'Applications', route: 'applications' },
    { key: 'insights' as const, label: 'Career Insights', route: 'career-insights' },
    { key: 'profile' as const, label: 'Profile & Settings', route: 'profile' },
    { key: 'pricing' as const, label: 'Pricing & Plans', route: 'pricing' },
  ]

  const responsivePillars = [
    {
      title: 'Persistent Mobile Bottom Navigation',
      description: '5-key bottom nav with safe-area spacing and a prominent elevated central AI Hub trigger.',
    },
    {
      title: 'Adaptive Workspace Sidebars',
      description: 'Desktop sidebars automatically condense into 36px collapsible headers, saving 400px of vertical space.',
    },
    {
      title: 'Split-to-Toggle Modes',
      description: 'Desktop 42%/58% split panels (e.g. Resume Builder) convert to seamless "Edit Content" vs "Live Preview" tabs.',
    },
    {
      title: 'Zero Horizontal Layout Bleed',
      description: 'Kanban boards and comparison tables convert into stacked card carousels and filtered category accordions.',
    },
    {
      title: 'Touch-First Ergonomics',
      description: 'All buttons, filter tags, and selectors meet or exceed the 44px x 44px WCAG touch target guideline.',
    },
    {
      title: 'Offline Telemetry Safeguard',
      description: 'Active network monitoring notifies candidates without crashing local offline demo state.',
    },
  ]

  const renderScreenContent = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <HeroSection
            onOpenAuth={() => onToast('Demo auth opened in preview', 'info')}
            onStartSearch={() => setActiveScreen('jobs')}
            onExploreFeatures={() => onToast('Explore features clicked', 'info')}
          />
        )
      case 'jobs':
        return (
          <JobSearchScreen
            onToast={onToast}
            onSelectJob={() => onToast('Job selected in preview', 'info')}
            savedJobIds={savedJobIds}
            onToggleSave={(id) => {
              setSavedJobIds((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
              )
            }}
          />
        )
      case 'matching':
        return (
          <MatchingDashboardScreen
            savedJobIds={savedJobIds}
            onToggleSave={(id) => {
              setSavedJobIds((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
              )
            }}
            onSelectJob={() => onToast('Job selected in preview', 'info')}
            onToast={onToast}
            onNavigateToJobs={() => setActiveScreen('jobs')}
            candidateProfile={defaultCandidateProfile}
          />
        )
      case 'builder':
        return (
          <ResumeBuilderScreen
            parsedResume={defaultParsedResume}
            onParsedResumeChange={() => {}}
            onNavigateToJobs={() => setActiveScreen('jobs')}
            onNavigateToResume={() => setActiveScreen('builder')}
            onNavigateToAnalysis={() => setActiveScreen('builder')}
            onToast={onToast}
          />
        )
      case 'autoapply':
        return (
          <AutoApplyScreen
            parsedResume={defaultParsedResume}
            onNavigateToJobs={() => setActiveScreen('jobs')}
            onNavigateToResume={() => setActiveScreen('builder')}
            onNavigateToAnalysis={() => setActiveScreen('builder')}
            onNavigateToBuilder={() => setActiveScreen('builder')}
            onNavigateToMatching={() => setActiveScreen('matching')}
            savedJobIds={savedJobIds}
            onToggleSaveJob={(id) => {
              setSavedJobIds((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
              )
            }}
            onToast={onToast}
          />
        )
      case 'tracking':
        return (
          <ApplicationTrackingScreen
            onNavigateToJobs={() => setActiveScreen('jobs')}
            onToast={onToast}
          />
        )
      case 'insights':
        return (
          <CareerInsightsScreen
            parsedResume={defaultParsedResume}
            candidateProfile={defaultCandidateProfile}
            onNavigateToJobs={() => setActiveScreen('jobs')}
            onNavigateToMatching={() => setActiveScreen('matching')}
            onNavigateToResume={() => setActiveScreen('builder')}
            onNavigateToResumeBuilder={() => setActiveScreen('builder')}
            onNavigateToCoverLetter={() => setActiveScreen('builder')}
            onNavigateToAutoApply={() => setActiveScreen('autoapply')}
            onNavigateToApplications={() => setActiveScreen('tracking')}
            onToast={onToast}
          />
        )
      case 'profile':
        return (
          <ProfileSettingsScreen
            initialTab="overview"
            onNavigateToJobs={() => setActiveScreen('jobs')}
            onNavigateToMatching={() => setActiveScreen('matching')}
            onNavigateToResume={() => setActiveScreen('builder')}
            onNavigateToResumeAnalysis={() => setActiveScreen('builder')}
            onNavigateToResumeBuilder={() => setActiveScreen('builder')}
            onNavigateToCoverLetter={() => setActiveScreen('builder')}
            onNavigateToAutoApply={() => setActiveScreen('autoapply')}
            onNavigateToApplications={() => setActiveScreen('tracking')}
            onNavigateToInsights={() => setActiveScreen('insights')}
            onToast={onToast}
          />
        )
      case 'pricing':
        return (
          <PricingScreen
            onNavigateToJobs={() => setActiveScreen('jobs')}
            onNavigateToMatching={() => setActiveScreen('matching')}
            onToast={onToast}
          />
        )
      default:
        return null
    }
  }

  const currentRoute =
    screenOptions.find((s) => s.key === activeScreen)?.route || 'home'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge
              variant="indigo"
              size="md"
              className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30 font-semibold uppercase tracking-wider"
            >
              <Smartphone className="w-3.5 h-3.5" />
              Screen #14 Showcase
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            JobAI Mobile Experience
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Your AI-powered job search, wherever you are. Explore how every screen, copilot workflow,
            and data asset adapts dynamically for mobile devices from 360px up to tablet viewports.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigateScreen(currentRoute)}
              className="cursor-pointer font-semibold shadow-md bg-indigo-600 hover:bg-indigo-500 text-white"
              rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
            >
              Open Full-Screen Native View
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setActiveScreen('home')
                setSelectedDevice('iphone15')
                setZoomScale(0.9)
                onToast('Preview reset to default viewport', 'info')
              }}
              className="cursor-pointer text-slate-800"
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Reset Preview
            </Button>
          </div>
        </div>

        {/* Control Toolbar */}
        <div className="bg-slate-800/80 rounded-3xl p-4 sm:p-6 border border-slate-700/80 shadow-xl backdrop-blur-md space-y-5">
          {/* Device Model Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Device Frame:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {(Object.keys(DEVICE_SPECS) as DeviceModel[]).map((key) => {
                  const spec = DEVICE_SPECS[key]
                  const isSelected = selectedDevice === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedDevice(key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {spec.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Scale Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Scale:
              </span>
              <div className="flex items-center gap-1.5">
                {[0.75, 0.85, 0.9, 1.0].map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setZoomScale(scale)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold cursor-pointer ${
                      zoomScale === scale
                        ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-400/40'
                        : 'bg-slate-700/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    {Math.round(scale * 100)}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Screen Navigation Tabs */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interactive Screen Preview:
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {screenOptions.map((screen) => {
                const isActive = activeScreen === screen.key
                return (
                  <button
                    key={screen.key}
                    type="button"
                    onClick={() => setActiveScreen(screen.key)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-900/40'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {screen.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Device Stage Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Phone Mockup (lg:col-span-7) */}
          <div className="lg:col-span-7 flex justify-center items-center py-6">
            <div
              className="relative transition-transform duration-300 origin-top shadow-2xl shadow-indigo-950/80"
              style={{
                width: `${device.width}px`,
                transform: `scale(${zoomScale})`,
              }}
            >
              {/* Outer Bezel Frame */}
              <div
                className={`relative ${device.bezel} bg-slate-950 shadow-2xl overflow-hidden`}
                style={{
                  height: `${device.height}px`,
                  boxShadow:
                    '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Top Status Bar with Dynamic Island or Punch Hole */}
                <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-semibold text-white select-none">
                  <span>9:41</span>

                  {/* Island / Notch */}
                  {device.islandStyle === 'island' ? (
                    <div className="w-24 h-6 bg-black rounded-full flex items-center justify-end px-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
                    </div>
                  ) : device.islandStyle === 'punch' ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800" />
                  ) : (
                    <div className="w-20 h-4 bg-black rounded-b-xl" />
                  )}

                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5" />
                    <Battery className="w-4 h-4" />
                  </div>
                </div>

                {/* Internal Scrollable Viewport Container */}
                <div
                  className="h-[calc(100%-40px)] overflow-y-auto text-slate-900 bg-[#F8FAFC] scrollbar-none relative pb-16"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  {renderScreenContent()}
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/70 rounded-full pointer-events-none z-50" />
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Highlights & Specs (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/80 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  Active Frame Metrics
                </h3>
                <Badge variant="indigo" size="sm" className="font-mono text-xs">
                  {device.width} × {device.height}px
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 block text-[11px]">Viewport Width</span>
                  <strong className="text-white font-mono text-sm">{device.width}px</strong>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 block text-[11px]">Target Device</span>
                  <strong className="text-white text-xs">{device.name}</strong>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 block text-[11px]">Touch Target Min</span>
                  <strong className="text-emerald-400 font-mono text-sm">44px × 44px</strong>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 block text-[11px]">Horizontal Overflow</span>
                  <strong className="text-emerald-400 font-mono text-sm">0px (100% Fit)</strong>
                </div>
              </div>
            </div>

            {/* Mobile Architecture Highlights */}
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/80 shadow-lg space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Mobile Engineering Innovations
              </h3>

              <div className="space-y-3">
                {responsivePillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-900/60 rounded-2xl border border-slate-700/60 hover:border-indigo-500/40 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          {pillar.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Screen Action */}
            <div className="p-5 bg-gradient-to-r from-indigo-950 to-purple-950 rounded-2xl border border-indigo-800/50 flex items-center justify-between gap-3">
              <div className="text-xs text-indigo-200">
                <span className="font-bold text-white block">Ready to test in your browser?</span>
                Resize your current desktop window or inspect in DevTools at 375px.
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigateScreen(currentRoute)}
                className="shrink-0 text-xs font-semibold cursor-pointer"
                rightIcon={<Maximize2 className="w-3.5 h-3.5" />}
              >
                Go to {activeScreen}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
