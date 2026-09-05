import React from 'react'
import { Briefcase, MapPin, Clock, DollarSign, Calendar, Compass } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { Job } from '@/data/jobsData'

export interface JobMetadataCardProps {
  job: Job
}

export const JobMetadataCard: React.FC<JobMetadataCardProps> = ({ job }) => {
  const items = [
    { label: 'Job Type', value: job.jobType, icon: <Briefcase className="w-4 h-4 text-indigo-500" /> },
    { label: 'Work Mode', value: job.workMode, icon: <Compass className="w-4 h-4 text-violet-500" /> },
    { label: 'Experience', value: job.experience, icon: <Calendar className="w-4 h-4 text-blue-500" /> },
    { label: 'Salary Bracket', value: job.salary, icon: <DollarSign className="w-4 h-4 text-emerald-500" /> },
    { label: 'Location', value: job.location, icon: <MapPin className="w-4 h-4 text-rose-500" /> },
    { label: 'Date Posted', value: job.postedAt.replace('Posted ', ''), icon: <Clock className="w-4 h-4 text-amber-500" /> },
  ]

  return (
    <Card className="p-6 border-slate-200/90 bg-white shadow-xs text-left mb-6">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">
        Job Specification
      </h3>
      <div className="grid grid-cols-2 gap-3.5 text-xs">
        {items.map((item) => (
          <div key={item.label} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              {item.icon}
              <span className="text-[11px]">{item.label}</span>
            </div>
            <p className="font-bold text-slate-900 truncate">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
