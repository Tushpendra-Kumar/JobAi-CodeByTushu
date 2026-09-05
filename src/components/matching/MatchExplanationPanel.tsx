import React from 'react'
import {
  Sparkles,
  Check,
  AlertTriangle,
  Award,
  CheckCircle2,
  Info,
  Layers,
  TrendingUp,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { Job } from '@/data/jobsData'
import type { JobMatchAnalysis } from '@/services/matchingService'

export interface MatchExplanationPanelProps {
  job: Job
  analysis: JobMatchAnalysis
}

export const MatchExplanationPanel: React.FC<MatchExplanationPanelProps> = ({
  job,
  analysis,
}) => {
  const breakdownRows = [
    { label: 'Technical Skills', value: analysis.breakdown.technicalSkills, color: 'bg-indigo-600' },
    { label: 'Projects', value: analysis.breakdown.projects, color: 'bg-blue-600' },
    { label: 'Experience', value: analysis.breakdown.experience, color: 'bg-emerald-600' },
    { label: 'Education', value: analysis.breakdown.education, color: 'bg-teal-600' },
    { label: 'Location', value: analysis.breakdown.location, color: 'bg-cyan-600' },
    { label: 'Career Goals', value: analysis.breakdown.careerGoals, color: 'bg-violet-600' },
    { label: 'Job Requirements', value: analysis.breakdown.jobRequirements, color: 'bg-purple-600' },
  ]

  return (
    <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left space-y-6">
      {/* Panel Header */}
      <div className="pb-4 border-b border-slate-100 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Explainable AI Diagnostics</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Why this job matches you
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed algorithmic alignment for <strong className="text-slate-800">{job.title}</strong> at <strong className="text-slate-800">{job.company}</strong>
          </p>
        </div>

        {/* Overall Match Badge */}
        <div className="text-center p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 shrink-0">
          <span className="text-2xl sm:text-3xl font-black text-indigo-700 leading-none block">
            {job.matchScore}%
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 block">
            Overall Match
          </span>
        </div>
      </div>

      {/* 1. Alignment Factors & Potential Gaps Side-by-Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Positive Alignments */}
        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Strong Profile Alignments</span>
          </div>
          <ul className="space-y-2">
            {analysis.positiveAlignments.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Potential Gaps */}
        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Potential Gaps</span>
          </div>
          <ul className="space-y-2">
            {analysis.potentialGaps.map((gap) => (
              <li key={gap} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 text-[10px] font-bold">
                  △
                </span>
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. AI Recommendation Quote */}
      <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/70 relative">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 mb-1.5">
          <Award className="w-4 h-4 text-indigo-600" />
          <span>AI Recommendation</span>
        </div>
        <p className="text-xs text-indigo-950 font-medium leading-relaxed">
          “{analysis.recommendationText}”
        </p>
      </div>

      {/* 3. Match Breakdown Progress Bars */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Match Breakdown</span>
          </h3>
          <span className="text-[11px] font-medium text-slate-400">
            Weighted Score Components
          </span>
        </div>

        <div className="space-y-2.5">
          {breakdownRows.map((row) => (
            <div key={row.label} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600">{row.label}</span>
                <span className="text-slate-900 font-bold">{row.value}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${row.color} transition-all duration-700`}
                  style={{ width: `${row.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Skill Compatibility Matrix */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <span>Skill Compatibility</span>
          </h3>
          <span className="text-[11px] font-medium text-slate-400">
            Profile vs Requirements
          </span>
        </div>

        <div className="space-y-3">
          {/* Strong Match */}
          <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100/60">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-2">
              Strong Match
            </span>
            <div className="flex flex-wrap gap-1.5">
              {analysis.skillCompatibility.strongMatch.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-0.5 rounded-md bg-white text-emerald-700 border border-emerald-200 text-xs font-semibold shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Partial Match */}
          <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-100/60">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-2">
              Partial Match
            </span>
            <div className="flex flex-wrap gap-1.5">
              {analysis.skillCompatibility.partialMatch.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-0.5 rounded-md bg-white text-amber-700 border border-amber-200 text-xs font-semibold shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Skill Gap */}
          <div className="p-3 rounded-xl bg-rose-50/40 border border-rose-100/60">
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block mb-2">
              Skill Gap
            </span>
            <div className="flex flex-wrap gap-1.5">
              {analysis.skillCompatibility.skillGap.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-0.5 rounded-md bg-white text-rose-700 border border-rose-200 text-xs font-semibold shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2 text-[11px] text-slate-500">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span>
          AI Match scores are derived from candidate skills, project history, and target role criteria. In production, this runs through an agentic reasoning pipeline.
        </span>
      </div>
    </Card>
  )
}
