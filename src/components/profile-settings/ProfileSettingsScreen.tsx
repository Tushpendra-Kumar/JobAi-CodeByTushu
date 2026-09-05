import React, { useState, useMemo, useCallback } from 'react'
import { ProfileHeaderCard } from './ProfileHeaderCard'
import { SettingsNavigationSidebar } from './SettingsNavigationSidebar'
import { PersonalInfoSection } from './PersonalInfoSection'
import { ProfessionalProfileSection } from './ProfessionalProfileSection'
import { SkillsManagementSection } from './SkillsManagementSection'
import { JobPreferencesSection } from './JobPreferencesSection'
import { AiSettingsSection } from './AiSettingsSection'
import { ResumeSettingsSection } from './ResumeSettingsSection'
import { ApplicationSettingsSection } from './ApplicationSettingsSection'
import { NotificationSettingsSection } from './NotificationSettingsSection'
import { AccountSecuritySection } from './AccountSecuritySection'
import { DataPrivacySection } from './DataPrivacySection'
import { ConnectedPlatformDataSummary } from './ConnectedPlatformDataSummary'
import { UnsavedChangesBar } from './UnsavedChangesBar'
import {
  getStoredProfileSettings,
  saveProfileSettings,
  resetProfileSettings,
  getConnectedPlatformStats,
  type UserProfileSettings,
} from '@/services/profileSettingsService'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Save,
  ChevronRight,
} from 'lucide-react'

interface ProfileSettingsScreenProps {
  initialTab?: string
  onNavigateToJobs: () => void
  onNavigateToMatching: () => void
  onNavigateToResume: () => void
  onNavigateToResumeAnalysis: () => void
  onNavigateToResumeBuilder: () => void
  onNavigateToCoverLetter: () => void
  onNavigateToAutoApply: () => void
  onNavigateToApplications: () => void
  onNavigateToInsights: () => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  initialTab = 'overview',
  onNavigateToJobs,
  onNavigateToMatching,
  onNavigateToResume,
  onNavigateToResumeAnalysis,
  onNavigateToResumeBuilder,
  onNavigateToCoverLetter,
  onNavigateToAutoApply,
  onNavigateToApplications,
  onNavigateToInsights,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab)
  const [prevInitialTab, setPrevInitialTab] = useState<string>(initialTab)

  if (initialTab !== prevInitialTab) {
    setPrevInitialTab(initialTab)
    setActiveTab(initialTab)
  }

  const [savedSettings, setSavedSettings] = useState<UserProfileSettings>(() =>
    getStoredProfileSettings()
  )
  const [draftSettings, setDraftSettings] = useState<UserProfileSettings>(() =>
    JSON.parse(JSON.stringify(savedSettings))
  )
  const [isSaving, setIsSaving] = useState(false)
  const [stats, setStats] = useState(() => getConnectedPlatformStats())

  // Check dirty state
  const isDirty = useMemo(() => {
    return JSON.stringify(draftSettings) !== JSON.stringify(savedSettings)
  }, [draftSettings, savedSettings])

  // Handle Save
  const handleSave = useCallback(() => {
    setIsSaving(true)
    try {
      const updated = saveProfileSettings(draftSettings)
      setSavedSettings(updated)
      setDraftSettings(JSON.parse(JSON.stringify(updated)))
      setStats(getConnectedPlatformStats())
      onToast('Profile preferences updated.', 'success')
    } catch (err) {
      console.error('Failed to save settings:', err)
      onToast('Failed to save settings. Please try again.', 'warning')
    } finally {
      setIsSaving(false)
    }
  }, [draftSettings, onToast])

  // Handle Discard
  const handleDiscard = useCallback(() => {
    setDraftSettings(JSON.parse(JSON.stringify(savedSettings)))
    onToast('Unsaved changes discarded.', 'info')
  }, [savedSettings, onToast])

  // Handle Reset All
  const handleResetAll = useCallback(() => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset all profile settings and preferences to default values?'
    )
    if (!confirmReset) return

    const defaults = resetProfileSettings()
    setSavedSettings(defaults)
    setDraftSettings(JSON.parse(JSON.stringify(defaults)))
    setStats(getConnectedPlatformStats())
    onToast('All settings restored to factory defaults.', 'info')
  }, [onToast])

  // Handle Clear AI Personalization
  const handleClearAi = useCallback(() => {
    setDraftSettings((prev) => {
      const next = {
        ...prev,
        aiSettings: {
          ...prev.aiSettings,
          personalizationLevel: 'Balanced' as const,
          aiTone: 'Professional' as const,
          matchingPriorities: [
            { id: 'skills', label: 'Skills Match', weight: 5, description: 'Prioritize required technical stack compatibility' },
            { id: 'role', label: 'Role & Title Fit', weight: 4, description: 'Align with primary and secondary target roles' },
            { id: 'remote', label: 'Remote Flexibility', weight: 4, description: 'Weight remote and hybrid work arrangement' },
            { id: 'growth', label: 'Career Growth', weight: 3, description: 'Consider learning opportunities and promotion trajectory' },
            { id: 'salary', label: 'Compensation Target', weight: 4, description: 'Match within preferred LPA salary range' },
            { id: 'location', label: 'Geographic Proximity', weight: 2, description: 'Match preferred city hubs if on-site' },
          ],
        },
      }
      return next
    })
    onToast('AI matching weights and tone reset to balanced defaults.', 'info')
  }, [onToast])

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Top Breadcrumb & Page Action Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Breadcrumb & Title */}
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <button
                  onClick={onNavigateToMatching}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Dashboard
                </button>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="font-semibold text-slate-800">Profile & Settings</span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Profile & Settings
                </h1>
                <Badge variant="indigo" size="sm" className="hidden sm:inline-flex">
                  Career Copilot Hub
                </Badge>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2.5">
              {isDirty && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDiscard}
                  disabled={isSaving}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Discard
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                disabled={!isDirty || isSaving}
                isLoading={isSaving}
                leftIcon={<Save className="w-3.5 h-3.5" />}
                className="text-xs shadow-xs"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 1. Profile Overview Header Card */}
        <ProfileHeaderCard
          settings={draftSettings}
          onNavigateTab={(tab) => setActiveTab(tab)}
          onQuickEdit={() => {
            setActiveTab('overview')
            window.scrollTo({ top: 380, behavior: 'smooth' })
          }}
        />

        {/* 2. Desktop Two-Column Layout (Sidebar + Active Tab Content) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Settings Navigation Sidebar */}
          <SettingsNavigationSidebar
            activeTab={activeTab}
            onSelectTab={(tabId) => {
              setActiveTab(tabId)
              window.location.hash = `#/profile/${tabId}`
            }}
            hasUnsavedChanges={isDirty}
          />

          {/* Right Active Content Area */}
          <div className="flex-1 w-full space-y-6">
            {activeTab === 'overview' && (
              <PersonalInfoSection
                data={draftSettings.personalInfo}
                onChange={(updated) =>
                  setDraftSettings((prev) => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, ...updated },
                  }))
                }
              />
            )}

            {activeTab === 'professional' && (
              <div className="space-y-6">
                <ProfessionalProfileSection
                  data={draftSettings.professionalProfile}
                  onChange={(updated) =>
                    setDraftSettings((prev) => ({
                      ...prev,
                      professionalProfile: { ...prev.professionalProfile, ...updated },
                    }))
                  }
                />
                <SkillsManagementSection
                  skills={draftSettings.professionalProfile.skills}
                  onChange={(updatedSkills) =>
                    setDraftSettings((prev) => ({
                      ...prev,
                      professionalProfile: {
                        ...prev.professionalProfile,
                        skills: updatedSkills,
                      },
                    }))
                  }
                />
              </div>
            )}

            {activeTab === 'job-preferences' && (
              <JobPreferencesSection
                data={draftSettings.jobPreferences}
                onChange={(updated) =>
                  setDraftSettings((prev) => ({
                    ...prev,
                    jobPreferences: { ...prev.jobPreferences, ...updated },
                  }))
                }
              />
            )}

            {activeTab === 'resume-settings' && (
              <ResumeSettingsSection
                data={draftSettings.resumeSettings}
                onChange={(updated) =>
                  setDraftSettings((prev) => ({
                    ...prev,
                    resumeSettings: { ...prev.resumeSettings, ...updated },
                  }))
                }
                onNavigateToBuilder={onNavigateToResumeBuilder}
                onNavigateToAnalysis={onNavigateToResumeAnalysis}
                onNavigateToUpload={onNavigateToResume}
              />
            )}

            {activeTab === 'ai-settings' && (
              <AiSettingsSection
                data={draftSettings.aiSettings}
                onChange={(updated) =>
                  setDraftSettings((prev) => ({
                    ...prev,
                    aiSettings: { ...prev.aiSettings, ...updated },
                  }))
                }
              />
            )}

            {activeTab === 'application-settings' && (
              <ApplicationSettingsSection
                data={draftSettings.applicationSettings}
                onChange={(updated) =>
                  setDraftSettings((prev) => ({
                    ...prev,
                    applicationSettings: { ...prev.applicationSettings, ...updated },
                  }))
                }
                onNavigateToAutoApply={onNavigateToAutoApply}
                onNavigateToApplications={onNavigateToApplications}
                onNavigateToCoverLetter={onNavigateToCoverLetter}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationSettingsSection
                data={draftSettings.notifications}
                onChange={(updated) =>
                  setDraftSettings((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, ...updated },
                  }))
                }
              />
            )}

            {activeTab === 'account' && (
              <AccountSecuritySection
                data={draftSettings.account}
                onChange={(updated) =>
                  setDraftSettings((prev) => ({
                    ...prev,
                    account: { ...prev.account, ...updated },
                  }))
                }
                onResetAccount={handleResetAll}
                onToast={onToast}
              />
            )}

            {activeTab === 'data-privacy' && (
              <DataPrivacySection
                settings={draftSettings}
                onResetPreferences={handleResetAll}
                onClearAiPersonalization={handleClearAi}
                onToast={onToast}
              />
            )}
          </div>
        </div>

        {/* 3. Connected Platform Data Telemetry Summary */}
        <ConnectedPlatformDataSummary
          stats={stats}
          onNavigateToJobs={onNavigateToJobs}
          onNavigateToMatching={onNavigateToMatching}
          onNavigateToResume={onNavigateToResume}
          onNavigateToCoverLetter={onNavigateToCoverLetter}
          onNavigateToApplications={onNavigateToApplications}
          onNavigateToInsights={onNavigateToInsights}
        />
      </div>

      {/* 4. Sticky Floating Unsaved Changes Alert Bar */}
      <UnsavedChangesBar
        isVisible={isDirty}
        isSaving={isSaving}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </div>
  )
}
