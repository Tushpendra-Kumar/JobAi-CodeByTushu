import React, { useState } from 'react'
import { Code2, ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { SkillProfileCategory } from '@/services/careerInsightsService'

interface SkillProfileSectionProps {
  skillProfile: SkillProfileCategory[]
}

export const SkillProfileSection: React.FC<SkillProfileSectionProps> = ({ skillProfile }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...skillProfile.map((c) => c.category)]

  const filteredCategories =
    selectedCategory === 'All'
      ? skillProfile
      : skillProfile.filter((c) => c.category === selectedCategory)

  const getLevelBadgeVariant = (level: 'Strong' | 'Intermediate' | 'Basic') => {
    switch (level) {
      case 'Strong':
        return 'emerald'
      case 'Intermediate':
        return 'indigo'
      case 'Basic':
        return 'slate'
    }
  }

  const totalSkills = skillProfile.reduce((acc, cat) => acc + cat.skills.length, 0)
  const strongSkillsCount = skillProfile.reduce(
    (acc, cat) => acc + cat.skills.filter((s) => s.level === 'Strong').length,
    0
  )

  return (
    <Card className="p-5 bg-white border-slate-200/80 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">My Skill Profile</h2>
              <Badge variant="indigo" size="sm">
                {totalSkills} Skills Categorized
              </Badge>
              <Badge variant="emerald" size="sm">
                {strongSkillsCount} Strong
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Verified technical proficiencies organized by discipline with genuine evidence-based levels
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg transition-all text-xs font-medium cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((cat) => (
          <div
            key={cat.category}
            className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                {cat.category}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {cat.skills.length} skills
              </span>
            </div>

            <div className="space-y-1.5">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/60 shadow-2xs text-xs"
                >
                  <div className="font-semibold text-slate-800">{skill.name}</div>
                  <div className="flex items-center gap-1.5">
                    {skill.years && (
                      <span className="text-[10px] text-slate-400">{skill.years}y</span>
                    )}
                    <Badge variant={getLevelBadgeVariant(skill.level)} size="sm">
                      {skill.level}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>
          Skill levels reflect actual project commits, internship responsibilities, and resume keyword frequency.
        </span>
      </div>
    </Card>
  )
}
