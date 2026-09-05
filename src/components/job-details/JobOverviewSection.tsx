import React from 'react'
import { FileText, Award, GraduationCap, Briefcase } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { Job } from '@/data/jobsData'

export interface JobOverviewSectionProps {
  job: Job
}

export const JobOverviewSection: React.FC<JobOverviewSectionProps> = ({ job }) => {
  return (
    <Card className="p-6 sm:p-8 border-slate-200/90 bg-white shadow-xs text-left mb-8 space-y-8">
      {/* 1. Job Overview */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Job Overview
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
          {job.jobOverview}
        </p>
      </div>

      {/* 2. Key Responsibilities */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Key Responsibilities
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {job.responsibilities.map((resp, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
              <span>{resp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. What You'll Need */}
      <div className="space-y-5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
            <Briefcase className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            What You'll Need
          </h3>
        </div>

        {/* Required Skills Chips */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500 block">
            Required Technical Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {job.requirements.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl bg-slate-100/90 text-slate-800 text-xs font-semibold border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/40 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
              <span>Experience Level</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {job.requirements.experience}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              <span>Education</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {job.requirements.education}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
