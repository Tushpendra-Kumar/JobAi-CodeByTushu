import React from 'react'
import { Sparkles, Compass, CheckCircle2, Search, FileEdit } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface BestCareerDirectionCardProps {
  role: string
  fitScore: number
  reasons: string[]
  matchingSkills: string[]
  skillGaps: string[]
  onExploreJobs: () => void
  onOptimizeResume: () => void
  onScrollToSkillGaps: () => void
}

export const BestCareerDirectionCard: React.FC<BestCareerDirectionCardProps> = ({
  role,
  fitScore,
  reasons,
  matchingSkills,
  skillGaps,
  onExploreJobs,
  onOptimizeResume,
  onScrollToSkillGaps,
}) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-white via-indigo-50/10 to-violet-50/20 border-indigo-200/70 shadow-xs space-y-5">
      {/* Top Tag & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100/60">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Primary Career Recommendation
              </span>
              <Badge variant="indigo" size="sm" dot>
                Top Direction
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">{role}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium">Role Fit Score</div>
            <div className="text-2xl font-black text-indigo-600">{fitScore}%</div>
          </div>
          <Badge variant="emerald" size="sm" className="h-6">
            Exceptional Match
          </Badge>
        </div>
      </div>

      {/* Why this role? Evidence-based reasons */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Why This Role? (Grounded in Verified Profile Evidence)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs text-xs text-slate-700 leading-relaxed"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Matching Skills & Recommended Gaps Pills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Matching Skills */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-slate-700">
            Verified Matching Skills ({matchingSkills.length}):
          </div>
          <div className="flex flex-wrap gap-1.5">
            {matchingSkills.map((sk) => (
              <span
                key={sk}
                className="text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Skill Gaps */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-slate-700">
            Recommended Focus Gaps ({skillGaps.length}):
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillGaps.map((gap) => (
              <button
                key={gap}
                type="button"
                onClick={onScrollToSkillGaps}
                className="text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 transition-colors text-left"
                title="View skill gap learning guidance"
              >
                {gap}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-indigo-100/60">
        <div className="text-xs text-slate-500">
          Targeting this direction delivers the fastest interview conversion based on your current codebase evidence.
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onScrollToSkillGaps}
            className="text-xs h-8"
          >
            View Skill Gaps
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onOptimizeResume}
            leftIcon={<FileEdit className="w-3.5 h-3.5 text-slate-600" />}
            className="text-xs h-8"
          >
            Optimize Resume
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onExploreJobs}
            leftIcon={<Search className="w-3.5 h-3.5 text-indigo-100" />}
            className="text-xs h-8 shadow-xs"
          >
            Explore Jobs
          </Button>
        </div>
      </div>
    </Card>
  )
}
