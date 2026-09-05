import { ArrowRight, Target } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export interface SkillGapInsightsCardProps {
  onViewSkillRoadmap: () => void
}

export const SkillGapInsightsCard: React.FC<SkillGapInsightsCardProps> = ({
  onViewSkillRoadmap,
}) => {
  const gaps = [
    {
      skill: 'TypeScript',
      current: 'Intermediate',
      recommended: 'Strong',
      impact: '+6% Match across 14 roles',
    },
    {
      skill: 'Testing',
      current: 'Beginner',
      recommended: 'Intermediate',
      impact: '+4% Match across 9 roles',
    },
    {
      skill: 'Cloud Deployment',
      current: 'Beginner',
      recommended: 'Intermediate',
      impact: '+8% Match across 12 roles',
    },
  ]

  return (
    <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left relative overflow-hidden">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              <span>Career Growth Opportunity</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Close Your Skill Gaps
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Strengthening these skills could improve your match with more opportunities.
            </p>
          </div>
        </div>

        {/* Gaps List */}
        <div className="space-y-3">
          {gaps.map((gap) => (
            <div
              key={gap.skill}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-900">
                  {gap.skill}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  {gap.impact}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 block font-medium uppercase">
                    Current
                  </span>
                  <span className="font-semibold text-slate-700">
                    {gap.current}
                  </span>
                </div>

                <div className="p-1.5 rounded-lg bg-indigo-50/50 border border-indigo-100">
                  <span className="text-[10px] text-indigo-500 block font-medium uppercase">
                    Recommended
                  </span>
                  <span className="font-semibold text-indigo-700">
                    {gap.recommended}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onViewSkillRoadmap}
            rightIcon={<ArrowRight className="w-3.5 h-3.5 text-indigo-600" />}
            className="w-full justify-center font-bold text-xs text-indigo-700 hover:text-indigo-800 bg-indigo-50/60 hover:bg-indigo-100/70 border-indigo-200"
          >
            View Skill Roadmap
          </Button>
        </div>
      </div>
    </Card>
  )
}
