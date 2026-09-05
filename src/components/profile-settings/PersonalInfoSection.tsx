import React from 'react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { User, Mail, Phone, MapPin, Globe } from 'lucide-react'
import type { PersonalInfo } from '@/services/profileSettingsService'

interface PersonalInfoSectionProps {
  data: PersonalInfo
  onChange: (updated: Partial<PersonalInfo>) => void
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ data, onChange }) => {
  return (
    <Card className="p-6 border-slate-200/90 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Personal Information</h3>
            <Badge variant="indigo" size="sm">
              Primary Identity
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Your contact information is used to pre-populate job applications and recruiter contact fields.
          </p>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <Input
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="e.g. Alex Morgan"
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
            className="text-xs font-medium"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Displayed on generated resumes and job applications.
          </p>
        </div>

        {/* Email Address */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <Badge variant="emerald" size="sm" className="text-[10px] py-0 px-1.5">
              Verified
            </Badge>
          </div>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="alex.morgan@example.com"
            leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
            className="text-xs font-medium"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Primary account identifier for notifications and interview updates.
          </p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <Input
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+91 98765 43210"
            leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
            className="text-xs font-medium"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Used for employer interview scheduling and auto-fill.
          </p>
        </div>

        {/* Primary Location */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Current Location / Metro <span className="text-rose-500">*</span>
          </label>
          <Input
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="e.g. Bangalore, India"
            leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
            className="text-xs font-medium"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Helps calculate local commute and hybrid match scores.
          </p>
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">City</label>
          <Input
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="e.g. Bangalore"
            className="text-xs font-medium"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Country</label>
          <Input
            value={data.country}
            onChange={(e) => onChange({ country: e.target.value })}
            placeholder="e.g. India"
            className="text-xs font-medium"
          />
        </div>
      </div>

      {/* Online Profiles & Portfolio */}
      <div className="pt-4 border-t border-slate-100 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Professional Links & Social Presence
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* LinkedIn */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">LinkedIn Profile</label>
            <Input
              value={data.linkedIn}
              onChange={(e) => onChange({ linkedIn: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              leftIcon={
                <svg className="w-4 h-4 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
                </svg>
              }
              className="text-xs font-medium"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">GitHub Profile</label>
            <Input
              value={data.gitHub}
              onChange={(e) => onChange({ gitHub: e.target.value })}
              placeholder="https://github.com/username"
              leftIcon={
                <svg className="w-4 h-4 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                </svg>
              }
              className="text-xs font-medium"
            />
          </div>

          {/* Portfolio */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Portfolio Website</label>
            <Input
              value={data.portfolioUrl}
              onChange={(e) => onChange({ portfolioUrl: e.target.value })}
              placeholder="https://myportfolio.dev"
              leftIcon={<Globe className="w-4 h-4 text-indigo-600" />}
              className="text-xs font-medium"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
