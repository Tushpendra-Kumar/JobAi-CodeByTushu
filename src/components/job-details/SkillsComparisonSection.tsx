import React from 'react'
import { CheckCircle2, AlertTriangle, HelpCircle, Layers } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { SkillComparison } from '@/data/jobsData'

export interface SkillsComparisonSectionProps {
  comparisons: SkillComparison[]
}

export const SkillsComparisonSection: React.FC<SkillsComparisonSectionProps> = ({
  comparisons,
}) => {
  return (
    <Card className="p-6 sm:p-7 border-slate-200/90 bg-white shadow-xs text-left mb-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Layers className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Your Skills vs Job Requirements
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Diagnostic Matrix
        </span>
      </div>

      {/* Comparison Table / List */}
      <div className="pt-4 overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="pb-3 pl-1 font-semibold">Skill</th>
              <th className="pb-3 font-semibold">Your Profile</th>
              <th className="pb-3 font-semibold">Job Requirement</th>
              <th className="pb-3 pr-1 text-right font-semibold">Match Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {comparisons.map((c, idx) => {
              const isMatch = c.matchStatus === 'match'
              const isPartial = c.matchStatus === 'partial'
              return (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 pl-1 font-bold text-slate-900">
                    {c.skill}
                  </td>
                  <td className="py-3 font-medium text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      {c.userProfile}
                    </span>
                  </td>
                  <td className="py-3 font-medium text-slate-500">
                    {c.jobRequirement}
                  </td>
                  <td className="py-3 pr-1 text-right">
                    {isMatch ? (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Match
                      </span>
                    ) : isPartial ? (
                      <span className="inline-flex items-center gap-1 font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                        <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                        Partial
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        Improve
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
