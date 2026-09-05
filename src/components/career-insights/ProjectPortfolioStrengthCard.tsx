import React from 'react'
import { FolderGit2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { ProjectPortfolioItem } from '@/services/careerInsightsService'

interface ProjectPortfolioStrengthCardProps {
  projects: ProjectPortfolioItem[]
  onImproveProject: () => void
}

export const ProjectPortfolioStrengthCard: React.FC<ProjectPortfolioStrengthCardProps> = ({
  projects,
  onImproveProject,
}) => {
  return (
    <Card className="p-5 bg-white border-slate-200/80 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Project Portfolio Strength</h2>
              <Badge variant="indigo" size="sm">
                {projects.length} Verified Repositories
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Evaluates the architectural depth and role-relevance of your codebase contributions
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onImproveProject}
          className="text-xs h-8"
        >
          Improve in Resume Builder
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 transition-all space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-xs text-slate-900 line-clamp-1">
                  {proj.name}
                </h3>
                <div className="flex items-center gap-1">
                  <Badge variant={proj.complexity === 'High' ? 'purple' : 'indigo'} size="sm">
                    {proj.complexity} Complexity
                  </Badge>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1">
                {proj.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="text-xs text-slate-600 leading-relaxed pt-1">
                {proj.portfolioValue}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
              <span>Target: {proj.targetRoles.slice(0, 2).join(', ')}</span>
              <Badge variant="emerald" size="sm">
                {proj.relevance} Relevance
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
