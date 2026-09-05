import { useState, useEffect, useCallback } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FooterInfoModal, type FooterInfoTab } from '@/components/footer/FooterInfoModal'
import { HeroSection } from '@/components/landing/HeroSection'
import { JobSearchSection } from '@/components/landing/JobSearchSection'
import { ValueMetricsSection } from '@/components/landing/ValueMetricsSection'
import { FeatureSection } from '@/components/landing/FeatureSection'
import { CopilotWorkflowSection } from '@/components/landing/CopilotWorkflowSection'
import { FinalCtaSection } from '@/components/landing/FinalCtaSection'
import { JobSearchScreen } from '@/components/jobs/JobSearchScreen'
import { JobDetailsScreen } from '@/components/job-details/JobDetailsScreen'
import { MatchingDashboardScreen } from '@/components/matching/MatchingDashboardScreen'
import { ResumeUploadScreen } from '@/components/resume/ResumeUploadScreen'
import { ResumeAnalysisScreen } from '@/components/resume-analysis/ResumeAnalysisScreen'
import { ResumeBuilderScreen } from '@/components/resume-builder/ResumeBuilderScreen'
import { AutoApplyScreen } from '@/components/auto-apply/AutoApplyScreen'
import { ApplicationTrackingScreen } from '@/components/applications/ApplicationTrackingScreen'
import { CoverLetterScreen } from '@/components/cover-letter/CoverLetterScreen'
import { CareerInsightsScreen } from '@/components/career-insights/CareerInsightsScreen'
import { ProfileSettingsScreen } from '@/components/profile-settings/ProfileSettingsScreen'
import { PricingScreen } from '@/components/pricing/PricingScreen'
import { MobileBottomNav } from '@/components/mobile/MobileBottomNav'
import { MobileAiHubSheet } from '@/components/mobile/MobileAiHubSheet'
import { NetworkStatusIndicator } from '@/components/mobile/NetworkStatusIndicator'
import { MobilePreviewScreen } from '@/components/mobile/MobilePreviewScreen'
import { DemoAuthModal } from '@/components/auth/DemoAuthModal'
import { AuthScreen } from '@/components/auth/AuthScreen'
import {
  restoreSession,
  logout as authLogout,
  isProtectedRoute,
} from '@/services/authService'
import { Toast } from '@/components/ui/Toast'
import { initialJobsData } from '@/data/jobsData'
import { defaultCandidateProfile, type CandidateProfile } from '@/data/candidateProfile'
import { defaultParsedResume, type ParsedResume } from '@/data/resumeData'

export function App() {
  const [currentUser, setCurrentUser] = useState<{ email: string; name?: string } | null>(() => {
    return restoreSession().user
  })
  const [currentScreen, setCurrentScreen] = useState<
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
  >(() => {
    const sessionUser = restoreSession().user
    const hash = window.location.hash.toLowerCase()
    if (hash === '#signup' || hash === '#/signup') return 'signup'
    if (hash === '#forgot-password' || hash === '#/forgot-password') return 'forgot-password'
    if (!sessionUser) {
      return 'login'
    }
    return 'home'
  })
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null)
  const [isMobileAiHubOpen, setIsMobileAiHubOpen] = useState(false)
  const [profileActiveTab, setProfileActiveTab] = useState<string>('overview')
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [infoModalTab, setInfoModalTab] = useState<FooterInfoTab>('about')
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(() => {
    const sessionUser = restoreSession().user
    if (sessionUser) {
      return {
        ...defaultCandidateProfile,
        fullName: sessionUser.name || defaultCandidateProfile.fullName,
        email: sessionUser.email || defaultCandidateProfile.email,
      }
    }
    return defaultCandidateProfile
  })
  const [parsedResume, setParsedResume] = useState<ParsedResume>(defaultParsedResume)
  const [selectedJobId, setSelectedJobId] = useState<string>('job-1')
  const [searchParams, setSearchParams] = useState<{ query: string; location: string }>({
    query: 'Software Engineer',
    location: 'Noida, India',
  })
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'signup'>('login')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'success' | 'info' | 'warning'>('info')

  const showToast = useCallback(
    (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
      setToastMessage(message)
      setToastType(type)
    },
    []
  )

  const handleOpenInfoModal = useCallback((tab: FooterInfoTab = 'about') => {
    setInfoModalTab(tab)
    setInfoModalOpen(true)
  }, [])

  // Centralized Route Guard: intercepts protected screens if unauthenticated
  const handleNavigateScreen = useCallback(
    (screenName: string) => {
      if (isProtectedRoute(screenName) && !currentUser) {
        setPendingRedirect(screenName)
        showToast('Please sign in to access your protected career workspace.', 'info')
        setCurrentScreen('login')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      setCurrentScreen(screenName as any)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [currentUser, showToast]
  )

  // Centralized saved jobs state for seamless synchronization
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jobai_saved_jobs')
      return saved ? JSON.parse(saved) : ['job-1']
    } catch {
      return ['job-1']
    }
  })

  // URL Hash Synchronizer for direct links (e.g. /#ai-matching)
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.toLowerCase()

      // 1. Check footer info modal hashes
      if (hash === '#about' || hash === '#/about') {
        handleOpenInfoModal('about')
        return
      } else if (hash === '#contact' || hash === '#/contact') {
        handleOpenInfoModal('contact')
        return
      } else if (hash === '#resources' || hash === '#/resources') {
        handleOpenInfoModal('resources')
        return
      } else if (hash === '#tips' || hash === '#/tips') {
        handleOpenInfoModal('tips')
        return
      } else if (hash === '#guide' || hash === '#/guide') {
        handleOpenInfoModal('guide')
        return
      } else if (hash === '#privacy' || hash === '#/privacy') {
        handleOpenInfoModal('privacy')
        return
      } else if (hash === '#terms' || hash === '#/terms') {
        handleOpenInfoModal('terms')
        return
      }

      // 2. Unauthenticated public gateway check
      if (!currentUser) {
        if (hash === '#signup' || hash === '#/signup') {
          setCurrentScreen('signup')
        } else if (hash === '#forgot-password' || hash === '#/forgot-password') {
          setCurrentScreen('forgot-password')
        } else {
          setCurrentScreen('login')
        }
        return
      }

      // 3. Authenticated full application routes
      if (hash === '#ai-matching' || hash === '#/ai-matching') {
        handleNavigateScreen('ai-matching')
      } else if (hash === '#jobs' || hash === '#/jobs') {
        setCurrentScreen('jobs')
      } else if (
        hash === '#ai-auto-apply' ||
        hash === '#/ai-auto-apply' ||
        hash === '#auto-apply' ||
        hash === '#/auto-apply'
      ) {
        handleNavigateScreen('ai-auto-apply')
      } else if (
        hash === '#resume/builder' ||
        hash === '#resume-builder' ||
        hash === '#/resume/builder' ||
        hash === '#/resume-builder'
      ) {
        handleNavigateScreen('resume-builder')
      } else if (
        hash === '#resume/analysis' ||
        hash === '#resume-analysis' ||
        hash === '#/resume/analysis' ||
        hash === '#/resume-analysis'
      ) {
        handleNavigateScreen('resume-analysis')
      } else if (
        hash === '#ai-cover-letter' ||
        hash === '#/ai-cover-letter' ||
        hash === '#cover-letter' ||
        hash === '#/cover-letter'
      ) {
        handleNavigateScreen('ai-cover-letter')
      } else if (
        hash === '#career-insights' ||
        hash === '#/career-insights' ||
        hash === '#insights' ||
        hash === '#/insights'
      ) {
        handleNavigateScreen('career-insights')
      } else if (
        hash === '#applications' ||
        hash === '#/applications' ||
        hash.startsWith('#/applications') ||
        hash.startsWith('#applications')
      ) {
        handleNavigateScreen('applications')
      } else if (
        hash === '#profile' ||
        hash === '#/profile' ||
        hash.startsWith('#profile/') ||
        hash.startsWith('#/profile/')
      ) {
        handleNavigateScreen('profile')
        const raw = hash.replace('#/', '').replace('#', '')
        const segments = raw.split('/')
        if (segments.length > 1 && segments[1]) {
          setProfileActiveTab(segments[1])
        }
      } else if (
        hash === '#pricing' ||
        hash === '#/pricing' ||
        hash === '#plans' ||
        hash === '#/plans'
      ) {
        setCurrentScreen('pricing')
      } else if (
        hash === '#mobile-preview' ||
        hash === '#/mobile-preview' ||
        hash === '#mobile' ||
        hash === '#/mobile'
      ) {
        setCurrentScreen('mobile-preview')
      } else if (hash === '#resume' || hash === '#/resume') {
        handleNavigateScreen('resume')
      } else if (hash === '#home' || hash === '#/home' || hash === '' || hash === '#') {
        setCurrentScreen('home')
      } else if (hash === '#login' || hash === '#/login') {
        setCurrentScreen('login')
      } else if (hash === '#signup' || hash === '#/signup') {
        setCurrentScreen('signup')
      } else if (
        hash === '#forgot-password' ||
        hash === '#/forgot-password' ||
        hash === '#reset-password' ||
        hash === '#/reset-password'
      ) {
        setCurrentScreen('forgot-password')
      }
    }
    handleHashSync()
    window.addEventListener('hashchange', handleHashSync)
    return () => window.removeEventListener('hashchange', handleHashSync)
  }, [currentUser, handleNavigateScreen, handleOpenInfoModal])

  useEffect(() => {
    try {
      localStorage.setItem('jobai_saved_jobs', JSON.stringify(savedJobIds))
    } catch {
      // Local storage fallback
    }
  }, [savedJobIds])

  const handleToggleSave = (jobId: string) => {
    const job = initialJobsData.find((j) => j.id === jobId)
    const jobTitle = job ? job.title : 'Job'

    if (savedJobIds.includes(jobId)) {
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId))
      showToast(`“${jobTitle}” removed from saved jobs.`, 'info')
    } else {
      setSavedJobIds((prev) => [...prev, jobId])
      showToast(`“${jobTitle}” saved to your opportunities.`, 'success')
    }
  }

  const handleOpenAuth = (tab: 'login' | 'signup' = 'login') => {
    setAuthInitialTab(tab)
    setAuthModalOpen(true)
  }

  const handleAuthSuccess = (user: { email: string; name?: string }) => {
    setCurrentUser(user)
    setCandidateProfile((prev) => ({
      ...prev,
      fullName: user.name || prev.fullName,
      email: user.email || prev.email,
    }))

    const destination = pendingRedirect || 'home'
    setPendingRedirect(null)
    setCurrentScreen(destination as any)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    showToast(
      `Welcome, ${user.name || user.email}! Demo session activated.`,
      'success'
    )
  }

  const handleLogout = async () => {
    await authLogout()
    setCurrentUser(null)
    setPendingRedirect(null)
    setCurrentScreen('login')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    showToast('Demo session closed. You have been signed out.', 'info')
  }

  const handleHomeSearch = (criteria: { query: string; location: string }) => {
    setSearchParams(criteria)
    setCurrentScreen('jobs')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    showToast(
      `Showing verified jobs for “${criteria.query}” in “${criteria.location}”`,
      'info'
    )
  }

  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId)
    setCurrentScreen('job-details')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleScrollTo = (sectionId: string) => {
    if (currentScreen !== 'home') {
      setCurrentScreen('home')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 60)
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Network Status Indicator */}
      <NetworkStatusIndicator />

      {/* Global Navigation Header - ONLY visible when user is logged in and not on auth gateway */}
      {currentUser && currentScreen !== 'login' && currentScreen !== 'signup' && currentScreen !== 'forgot-password' && (
        <Navbar
          onOpenAuth={handleOpenAuth}
          onNavigateSection={handleScrollTo}
          currentScreen={currentScreen}
          onNavigateScreen={handleNavigateScreen}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content Areas: Switching between Home, Jobs, and Job Details */}
      <main className="flex-1 w-full pb-20 md:pb-0">
        {currentScreen === 'home' ? (
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onStartSearch={() => {
                setCurrentScreen('jobs')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              onExploreFeatures={() => handleScrollTo('features-section')}
              onOpenAuth={() => handleOpenAuth('signup')}
            />

            {/* 2. Prominent Job Search Component */}
            <JobSearchSection onSearch={handleHomeSearch} />

            {/* 3. Product Value Metrics */}
            <ValueMetricsSection />

            {/* 4. Core Features Section */}
            <FeatureSection
              onSelectFeature={() => handleScrollTo('workflow-section')}
            />

            {/* 5. AI Career Copilot Workflow Section */}
            <CopilotWorkflowSection />

            {/* 6. Final Call to Action */}
            <FinalCtaSection
              onStartJourney={() => handleOpenAuth('signup')}
            />
          </>
        ) : currentScreen === 'jobs' ? (
          /* SCREEN #2: JOB SEARCH & JOB LISTING */
          <JobSearchScreen
            key={searchParams.query + searchParams.location}
            initialSearchQuery={searchParams.query}
            initialLocationQuery={searchParams.location}
            onToast={showToast}
            onSelectJob={handleSelectJob}
            savedJobIds={savedJobIds}
            onToggleSave={handleToggleSave}
            onNavigateToAiMatching={() => {
              setCurrentScreen('ai-matching')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        ) : currentScreen === 'job-details' ? (
          /* SCREEN #3: JOB DETAILS + AI JOB ANALYSIS */
          <JobDetailsScreen
            key={selectedJobId}
            jobId={selectedJobId}
            savedJobIds={savedJobIds}
            onToggleSave={handleToggleSave}
            onBackToJobs={() => {
              setCurrentScreen('jobs')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onSelectJob={handleSelectJob}
            onToast={showToast}
            onNavigateToAiMatching={() => {
              setCurrentScreen('ai-matching')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        ) : currentScreen === 'ai-matching' ? (
          /* SCREEN #4: AI JOB MATCHING DASHBOARD */
          <MatchingDashboardScreen
            savedJobIds={savedJobIds}
            onToggleSave={handleToggleSave}
            onSelectJob={handleSelectJob}
            onToast={showToast}
            onNavigateToJobs={() => {
              setCurrentScreen('jobs')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToResume={() => {
              setCurrentScreen('resume')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToAnalysis={() => {
              setCurrentScreen('resume-analysis')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToBuilder={() => {
              setCurrentScreen('resume-builder')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToCoverLetter={() => {
              setCurrentScreen('ai-cover-letter')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToCareerInsights={() => {
              setCurrentScreen('career-insights')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToAutoApply={() => {
              setCurrentScreen('ai-auto-apply')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToApplications={() => {
              setCurrentScreen('applications')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToProfile={() => {
              setCurrentScreen('profile')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToPricing={() => {
              setCurrentScreen('pricing')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onOpenAuthModal={() => handleOpenAuth('signup')}
            candidateProfile={candidateProfile}
          />
        ) : currentScreen === 'resume' ? (
          /* SCREEN #5: RESUME UPLOAD & AI RESUME PARSING */
          <ResumeUploadScreen
            parsedResume={parsedResume}
            onParsedResumeChange={setParsedResume}
            onToast={showToast}
            onNavigateToMatching={() => {
              setCurrentScreen('ai-matching')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToAnalysis={() => {
              setCurrentScreen('resume-analysis')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToBuilder={() => {
              setCurrentScreen('resume-builder')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToAutoApply={() => {
              setCurrentScreen('ai-auto-apply')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToApplications={() => {
              setCurrentScreen('applications')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToJobs={() => {
              setCurrentScreen('jobs')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onProfileConfirmed={(newProfile) => {
              setCandidateProfile(newProfile)
              showToast(
                `Profile updated for ${newProfile.fullName}! AI matching models updated.`,
                'success'
              )
            }}
          />
        ) : currentScreen === 'resume-analysis' ? (
          /* SCREEN #6: AI RESUME ANALYSIS DASHBOARD */
          <ResumeAnalysisScreen
            parsedResume={parsedResume}
            onNavigateToUpload={() => {
              setCurrentScreen('resume')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToBuilder={() => {
              setCurrentScreen('resume-builder')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onToast={showToast}
          />
        ) : currentScreen === 'resume-builder' ? (
          /* SCREEN #7: AI RESUME BUILDER */
          <ResumeBuilderScreen
            parsedResume={parsedResume}
            onParsedResumeChange={setParsedResume}
            onNavigateToJobs={() => {
              setCurrentScreen('jobs')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToResume={() => {
              setCurrentScreen('resume')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToAnalysis={() => {
              setCurrentScreen('resume-analysis')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToMatching={() => {
              setCurrentScreen('ai-matching')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToAutoApply={() => {
              setCurrentScreen('ai-auto-apply')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToApplications={() => {
              setCurrentScreen('applications')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onToast={showToast}
          />
        ) : currentScreen === 'ai-auto-apply' ? (
          /* SCREEN #8: AI AUTO APPLY */
          <AutoApplyScreen
            parsedResume={parsedResume}
            onNavigateToJobs={() => {
              setCurrentScreen('jobs')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToResume={() => {
              setCurrentScreen('resume')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToAnalysis={() => {
              setCurrentScreen('resume-analysis')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToBuilder={() => {
              setCurrentScreen('resume-builder')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToMatching={() => {
              setCurrentScreen('ai-matching')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToApplications={() => {
              setCurrentScreen('applications')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            savedJobIds={savedJobIds}
            onToggleSaveJob={handleToggleSave}
            onToast={showToast}
          />
        ) : currentScreen === 'applications' ? (
          /* SCREEN #9: APPLICATION TRACKING */
          <ApplicationTrackingScreen
            onNavigateToJobs={() => {
              setCurrentScreen('jobs')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToAutoApply={() => {
              setCurrentScreen('ai-auto-apply')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToResume={() => {
              setCurrentScreen('resume')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToAnalysis={() => {
              setCurrentScreen('resume-analysis')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToResumeBuilder={() => {
              setCurrentScreen('resume-builder')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToMatching={() => {
              setCurrentScreen('ai-matching')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToCoverLetter={() => {
              setCurrentScreen('ai-cover-letter')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToCareerInsights={() => {
              setCurrentScreen('career-insights')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToProfile={() => {
              setCurrentScreen('profile')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToPricing={() => {
              setCurrentScreen('pricing')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onSelectJob={(jobId) => {
              setSelectedJobId(jobId)
              setCurrentScreen('job-details')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onToast={showToast}
          />
        ) : currentScreen === 'ai-cover-letter' ? (
          /* SCREEN #10: AI COVER LETTER GENERATOR */
          <CoverLetterScreen
            onNavigateToApply={(jobId) => {
              if (jobId) setSelectedJobId(jobId)
              setCurrentScreen('ai-auto-apply')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToResumeBuilder={() => {
              setCurrentScreen('resume-builder')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        ) : currentScreen === 'career-insights' ? (
          /* SCREEN #11: AI CAREER INSIGHTS DASHBOARD */
          <CareerInsightsScreen
            parsedResume={parsedResume}
            candidateProfile={candidateProfile}
            onNavigateToJobs={() => {
              setCurrentScreen('jobs')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToMatching={() => {
              setCurrentScreen('ai-matching')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToResume={() => {
              setCurrentScreen('resume')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToResumeBuilder={() => {
              setCurrentScreen('resume-builder')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToCoverLetter={() => {
              setCurrentScreen('ai-cover-letter')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToAutoApply={() => {
              setCurrentScreen('ai-auto-apply')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToApplications={() => {
              setCurrentScreen('applications')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onToast={showToast}
          />
        ) : currentScreen === 'profile' ? (
          /* SCREEN #12: PROFILE & SETTINGS */
          <ProfileSettingsScreen
            initialTab={profileActiveTab}
            onNavigateToJobs={() => {
              setCurrentScreen('jobs')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToMatching={() => {
              setCurrentScreen('ai-matching')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToResume={() => {
              setCurrentScreen('resume')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToResumeAnalysis={() => {
              setCurrentScreen('resume-analysis')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToResumeBuilder={() => {
              setCurrentScreen('resume-builder')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToCoverLetter={() => {
              setCurrentScreen('ai-cover-letter')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToAutoApply={() => {
              setCurrentScreen('ai-auto-apply')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToApplications={() => {
              setCurrentScreen('applications')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToInsights={() => {
              setCurrentScreen('career-insights')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onToast={showToast}
          />
        ) : currentScreen === 'pricing' ? (
          /* SCREEN #13: PRICING & PLANS */
          <PricingScreen
            onNavigateToJobs={() => {
              setCurrentScreen('jobs')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToMatching={() => {
              setCurrentScreen('ai-matching')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToResume={() => {
              setCurrentScreen('resume')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToApplications={() => {
              setCurrentScreen('applications')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToProfile={() => {
              setCurrentScreen('profile')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onOpenAuth={(tab) => {
              setAuthInitialTab(tab || 'signup')
              setAuthModalOpen(true)
            }}
            onToast={showToast}
          />
        ) : currentScreen === 'mobile-preview' ? (
          /* SCREEN #14: MOBILE EXPERIENCE & RESPONSIVE SHOWCASE */
          <MobilePreviewScreen
            onNavigateScreen={(screenName) => handleNavigateScreen(screenName)}
            onToast={showToast}
          />
        ) : currentScreen === 'login' || currentScreen === 'signup' || currentScreen === 'forgot-password' ? (
          /* SCREEN #15: AUTHENTICATION & ACCESS SYSTEM */
          <AuthScreen
            initialView={
              currentScreen === 'signup'
                ? 'signup'
                : currentScreen === 'forgot-password'
                ? 'forgot-password'
                : 'login'
            }
            onAuthSuccess={handleAuthSuccess}
            onNavigateScreen={handleNavigateScreen}
            onToast={showToast}
            currentUser={currentUser}
            onLogout={handleLogout}
            redirectPath={pendingRedirect}
            onOpenInfoModal={handleOpenInfoModal}
          />
        ) : (
          /* Fallback Screen */
          <PricingScreen
            onNavigateToJobs={() => {
              setCurrentScreen('jobs')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onNavigateToMatching={() => {
              handleNavigateScreen('ai-matching')
            }}
            onNavigateToResume={() => {
              handleNavigateScreen('resume')
            }}
            onNavigateToApplications={() => {
              handleNavigateScreen('applications')
            }}
            onNavigateToProfile={() => {
              handleNavigateScreen('profile')
            }}
            onOpenAuth={(tab) => {
              setAuthInitialTab(tab || 'signup')
              setAuthModalOpen(true)
            }}
            onToast={showToast}
          />
        )}
      </main>

      {/* Global SaaS Footer (hidden on focused authentication views) */}
      {currentScreen !== 'login' && currentScreen !== 'signup' && currentScreen !== 'forgot-password' && (
        <Footer
          onNavigateScreen={handleNavigateScreen}
          onOpenInfoModal={handleOpenInfoModal}
        />
      )}

      {/* Mobile Experience: Bottom Floating Nav (visible on mobile/tablet < md, hidden on auth) */}
      {currentScreen !== 'login' && currentScreen !== 'signup' && currentScreen !== 'forgot-password' && (
        <MobileBottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => handleNavigateScreen(screen)}
          onOpenAiHub={() => setIsMobileAiHubOpen(true)}
        />
      )}

      {/* Mobile Experience: AI Hub Bottom Sheet Drawer */}
      <MobileAiHubSheet
        isOpen={isMobileAiHubOpen}
        onClose={() => setIsMobileAiHubOpen(false)}
        onNavigateScreen={(screen) => handleNavigateScreen(screen)}
        currentScreen={currentScreen}
      />

      {/* Lightweight Demo Authentication Modal */}
      <DemoAuthModal
        key={authInitialTab}
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authInitialTab}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Global Footer Information & Policy Modal */}
      <FooterInfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        activeTab={infoModalTab}
        onSelectTab={setInfoModalTab}
        onNavigateScreen={handleNavigateScreen}
      />

      {/* User Feedback Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  )
}

export default App
