import React, { useState } from 'react'
import {
  MapPin,
  Mail,
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Edit3,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { UserProfileSettings } from '@/services/profileSettingsService'

interface ProfileHeaderCardProps {
  settings: UserProfileSettings
  onNavigateTab: (tabId: string) => void
  onQuickEdit: () => void
}

export const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
  settings,
  onNavigateTab,
  onQuickEdit,
}) => {
  const [showFactorList, setShowFactorList] = useState(false)
  const { personalInfo, professionalProfile, completionPercentage, completionFactors } = settings

  const pendingFactors = completionFactors.filter((f) => !f.completed)

  return (
    <Card className="p-6 border-slate-200/90 shadow-sm bg-gradient-to-br from-white via-white to-indigo-50/20">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Avatar & Identity Details */}
        <div className="flex items-start sm:items-center gap-4.5">
          {/* Avatar with dynamic initials and active indicator */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md ring-4 ring-indigo-50">
              {personalInfo.fullName
                ? personalInfo.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                : 'AM'}
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs"
              title="Profile Active & AI Ready"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
          </div>

          {/* Core Identity Info */}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {personalInfo.fullName || 'Alex Morgan'}
              </h2>
              <Badge variant="indigo" size="sm" className="font-semibold">
                {professionalProfile.careerLevel}
              </Badge>
              <Badge variant="slate" size="sm" className="text-[11px] font-mono text-slate-500">
                Demo Profile
              </Badge>
              <Badge variant="indigo" size="sm" className="text-[11px] font-medium bg-indigo-50 text-indigo-700 border-indigo-200">
                Powered by CodeByTushu
              </Badge>
            </div>

            <p className="text-sm font-medium text-slate-700">
              {professionalProfile.headline || 'Software Developer | Full Stack Engineer'}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.location || 'Bangalore, India'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.email || 'alex.morgan@example.com'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-indigo-700 font-medium">
                <Target className="w-3.5 h-3.5 text-indigo-600" />
                Goal: {professionalProfile.primaryRole}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Profile Completion & Actions */}
        <div className="w-full lg:w-auto lg:min-w-[280px] bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-800">Profile Completion</span>
            </div>
            <span className="text-sm font-extrabold text-indigo-600">
              {completionPercentage}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                completionPercentage >= 80
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                  : completionPercentage >= 60
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600'
              }`}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 leading-snug">
            {completionPercentage >= 90
              ? 'Excellent! Your profile is fully optimized for AI matching and applications.'
              : 'Complete your profile to improve AI job matching and personalized resumes.'}
          </p>

          <div className="flex items-center justify-between gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFactorList(!showFactorList)}
              className="text-xs py-1 px-2.5 h-8 flex-1 text-slate-600 border-slate-200"
              rightIcon={
                showFactorList ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )
              }
            >
              {pendingFactors.length > 0 ? `${pendingFactors.length} missing` : 'All done'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onQuickEdit}
              className="text-xs py-1 px-3 h-8 shadow-xs"
              leftIcon={<Edit3 className="w-3.5 h-3.5" />}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Expandable Completion Checklist Breakdown */}
      {showFactorList && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 animate-fadeIn">
          {completionFactors.map((factor) => (
            <div
              key={factor.id}
              onClick={() => {
                if (factor.id === 'skills') onNavigateTab('professional')
                else if (factor.id === 'job-prefs') onNavigateTab('job-preferences')
                else if (factor.id === 'resume-default') onNavigateTab('resume-settings')
                else onNavigateTab('overview')
              }}
              className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2 ${
                factor.completed
                  ? 'bg-emerald-50/40 border-emerald-200/60 text-emerald-900'
                  : 'bg-amber-50/50 border-amber-200 text-amber-900 hover:bg-amber-50'
              }`}
            >
              {factor.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <div className="font-bold flex items-center gap-1.5">
                  <span>{factor.label}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    (+{factor.impact}%)
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">{factor.hint}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
