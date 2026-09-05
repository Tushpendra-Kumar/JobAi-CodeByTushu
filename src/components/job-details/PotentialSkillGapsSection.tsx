import React from 'react'
import { AlertTriangle, ArrowRight, Compass } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { SkillGap } from '@/data/jobsData'

export interface PotentialSkillGapsSectionProps {
  skillGaps: SkillGap[]
  onViewSkillRoadmap: () => void
}

export const PotentialSkillGapsSection: React.FC<PotentialSkillGapsSectionProps> = ({
  skillGaps,
  onViewSkillRoadmap,
}) => {
  return (
    <Card className="p-6 sm:p-7 border-slate-200/90 bg-white shadow-xs text-left mb-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200/70">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Potential Skill Gaps
          </h2>
        </div>
        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
          {skillGaps.length} areas to strengthen
        </span>
      </div>

      {/* Gaps Cards Grid */}
      <div className="pt-5 space-y-3.5">
        {skillGaps.map((gap, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-bold text-sm text-slate-900">
                {gap.skill}
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Current: <strong className="text-slate-700">{gap.currentLevel}</strong>
                </span>
                <span className="text-slate-300">→</span>
                <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60 font-semibold">
                  Target: {gap.recommendedLevel}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-700">Why it matters:</strong> {gap.whyItMatters}
            </p>
          </div>
        ))}
      </div>

      {/* Footer CTA: View Skill Roadmap */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Targeted study pathways tailored to bridge these gaps automatically.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onViewSkillRoadmap}
          leftIcon={<Compass className="w-3.5 h-3.5" />}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="text-xs shrink-0"
        >
          View Skill Roadmap
        </Button>
      </div>
    </Card>
  )
}
