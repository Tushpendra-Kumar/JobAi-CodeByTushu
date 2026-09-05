import React from 'react'
import { BookOpen, GraduationCap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { SkillGapItem } from '@/services/careerInsightsService'

interface SkillGapSectionProps {
  targetRole: string
  gaps: SkillGapItem[]
  onOpenLearningPlan: () => void
}

export const SkillGapSection: React.FC<SkillGapSectionProps> = ({
  targetRole,
  gaps,
  onOpenLearningPlan,
}) => {
  const getPriorityBadgeVariant = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High':
        return 'rose'
      case 'Medium':
        return 'amber'
      case 'Low':
        return 'slate'
    }
  }

  return (
    <div id="skills-to-improve" className="space-y-4 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200/70">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Skills to Improve</h2>
            <Badge variant="amber" size="sm">
              Target: {targetRole}
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Recommended focus areas to unlock higher match rates and salary bands for {targetRole} roles
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenLearningPlan}
          leftIcon={<GraduationCap className="w-4 h-4 text-indigo-600" />}
          className="text-xs h-8"
        >
          Create Learning Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gaps.map((item, idx) => (
          <Card
            key={idx}
            className="p-4 bg-white border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  {item.skill}
                </h3>
                <Badge variant={getPriorityBadgeVariant(item.priority)} size="sm">
                  {item.priority} Priority
                </Badge>
              </div>

              {/* Why it matters */}
              <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <strong className="text-slate-800">Why it matters:</strong> {item.whyItMatters}
              </div>

              {/* Suggested learning direction */}
              <div className="text-xs text-indigo-900 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100/70">
                <div className="flex items-center gap-1 font-semibold text-indigo-950 mb-0.5">
                  <BookOpen className="w-3 h-3 text-indigo-600" />
                  <span>Consider strengthening via:</span>
                </div>
                <div>{item.suggestedLearning}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              <span>Relevance: {item.targetRoleRelevance}</span>
              <span className="text-indigo-600 font-medium">Recommended action</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
