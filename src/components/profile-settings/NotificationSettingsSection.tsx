import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Bell,
  Mail,
  Smartphone,
  Briefcase,
  TrendingUp,
  FileText,
  ShieldAlert,
  Calendar,
} from 'lucide-react'
import type {
  NotificationPreferencesData,
  NotificationChannel,
} from '@/services/profileSettingsService'

interface NotificationSettingsSectionProps {
  data: NotificationPreferencesData
  onChange: (updated: Partial<NotificationPreferencesData>) => void
}

interface NotificationItemConfig {
  key: keyof NotificationPreferencesData
  title: string
  desc: string
  icon: React.ElementType
}

const NOTIFICATION_ITEMS: NotificationItemConfig[] = [
  {
    key: 'jobMatches',
    title: 'New High-Match Job Opportunities',
    desc: 'Alerts when a posted job matches 85%+ of your skills and career preferences.',
    icon: Briefcase,
  },
  {
    key: 'applicationUpdates',
    title: 'Application Status Changes',
    desc: 'Real-time updates when an application moves through Screening, Interview, or Offer stages.',
    icon: Bell,
  },
  {
    key: 'interviewUpdates',
    title: 'Interview Invitations & Reminders',
    desc: 'Direct calendar alerts, recruiter contact prompts, and round preparation milestones.',
    icon: Calendar,
  },
  {
    key: 'resumeRecommendations',
    title: 'Resume Optimization & ATS Alerts',
    desc: 'Suggestions when target roles introduce new high-frequency keywords or frameworks.',
    icon: FileText,
  },
  {
    key: 'careerInsights',
    title: 'AI Career Trajectory & Skill Gaps',
    desc: 'Weekly digests summarizing application response rates and recommended 4-week milestones.',
    icon: TrendingUp,
  },
  {
    key: 'systemNotifications',
    title: 'Platform Maintenance & Product Updates',
    desc: 'Security notices, release notes, and essential account service announcements.',
    icon: ShieldAlert,
  },
]

export const NotificationSettingsSection: React.FC<NotificationSettingsSectionProps> = ({
  data,
  onChange,
}) => {
  const handleToggleChannel = (
    category: keyof NotificationPreferencesData,
    channel: keyof NotificationChannel
  ) => {
    const currentCategory = data[category]
    onChange({
      [category]: {
        ...currentCategory,
        [channel]: !currentCategory[channel],
      },
    })
  }

  return (
    <Card className="p-6 border-slate-200/90 shadow-sm space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">Notification Preferences</h3>
          <Badge variant="indigo" size="sm">
            Alert Channels
          </Badge>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Control how and when JobAI communicates opportunity alerts, application milestones, and career digests.
        </p>
      </div>

      {/* Channel Header Indicators */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-500">
        <span>Alert Category</span>
        <div className="flex items-center gap-8 pr-4">
          <span className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            Email
          </span>
          <span className="flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-slate-400" />
            In-App
          </span>
        </div>
      </div>

      {/* Category Rows */}
      <div className="divide-y divide-slate-100">
        {NOTIFICATION_ITEMS.map((item) => {
          const Icon = item.icon
          const channel = data[item.key]
          return (
            <div
              key={item.key}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{item.title}</div>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5 max-w-md">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8 pl-11 sm:pl-0 sm:pr-4">
                {/* Email Toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channel.email}
                    onChange={() => handleToggleChannel(item.key, 'email')}
                    className="sr-only peer"
                    aria-label={`Email notification for ${item.title}`}
                  />
                  <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>

                {/* In-App Toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channel.inApp}
                    onChange={() => handleToggleChannel(item.key, 'inApp')}
                    className="sr-only peer"
                    aria-label={`In-App notification for ${item.title}`}
                  />
                  <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
