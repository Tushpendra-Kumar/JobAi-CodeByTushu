import React from 'react'
import { Building2, Users, MapPin, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Job } from '@/data/jobsData'

export interface AboutCompanyCardProps {
  job: Job
  onViewCompany: () => void
}

export const AboutCompanyCard: React.FC<AboutCompanyCardProps> = ({
  job,
  onViewCompany,
}) => {
  return (
    <Card className="p-6 border-slate-200/90 bg-white shadow-xs text-left mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${job.companyColor} text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0`}
        >
          {job.companyLogoText}
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {job.company}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            {job.industry}
          </p>
        </div>
      </div>

      {/* Meta Specs */}
      <div className="py-3.5 space-y-2 text-xs border-b border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1.5 font-medium">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            Company Size
          </span>
          <span className="font-semibold text-slate-800">{job.companySize}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            Headquarters
          </span>
          <span className="font-semibold text-slate-800">{job.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1.5 font-medium">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            Industry
          </span>
          <span className="font-semibold text-slate-800">{job.industry}</span>
        </div>
      </div>

      {/* About Summary */}
      <div className="pt-3.5 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          About the Company
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          {job.aboutCompany}
        </p>
      </div>

      {/* Action CTA */}
      <div className="pt-4">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onViewCompany}
          rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
          className="w-full justify-center text-xs h-9"
        >
          View Company Profile
        </Button>
      </div>
    </Card>
  )
}
