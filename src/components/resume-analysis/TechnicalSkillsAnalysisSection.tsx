import React from 'react'
import { Cpu, Sparkles, Layout, Server, Database, Wrench } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { ParsedSkillCategories } from '@/data/resumeData'

export interface TechnicalSkillsAnalysisSectionProps {
  skills: ParsedSkillCategories
  interpretation: string
}

export const TechnicalSkillsAnalysisSection: React.FC<TechnicalSkillsAnalysisSectionProps> = ({
  skills,
  interpretation,
}) => {
  const categories = [
    {
      id: 'frontend',
      label: 'Frontend Development',
      icon: <Layout className="w-4 h-4 text-indigo-600" />,
      items: skills.frontend,
      badgeColor: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    },
    {
      id: 'backend',
      label: 'Backend & APIs',
      icon: <Server className="w-4 h-4 text-blue-600" />,
      items: skills.backend,
      badgeColor: 'bg-blue-50 border-blue-200 text-blue-800',
    },
    {
      id: 'database',
      label: 'Database Systems',
      icon: <Database className="w-4 h-4 text-emerald-600" />,
      items: skills.database,
      badgeColor: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    },
    {
      id: 'tools',
      label: 'Tools & Operating Systems',
      icon: <Wrench className="w-4 h-4 text-purple-600" />,
      items: skills.tools,
      badgeColor: 'bg-purple-50 border-purple-200 text-purple-800',
    },
  ]

  return (
    <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Profile Taxonomy
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Technical Skills Analysis
          </h3>
          <p className="text-xs text-slate-500">
            Categorized technical capabilities mapped directly from your parsed resume without alterations.
          </p>
        </div>
      </div>

      {/* AI Interpretation Quote Banner */}
      <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50/50 to-white border border-indigo-100 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider block">
            AI Skill Positioning
          </span>
          <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
            “{interpretation}”
          </p>
        </div>
      </div>

      {/* 4 Category Skill Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200/70 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  {cat.icon}
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                  {cat.label}
                </h4>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-2 py-1 rounded-lg text-[11px] font-semibold border ${cat.badgeColor}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/50 text-[10px] text-slate-500 font-medium">
              {cat.items.length} skills identified
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
