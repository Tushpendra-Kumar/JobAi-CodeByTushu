import React from 'react'
import { Target, Search, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { JobMarketAlignmentData } from '@/services/careerInsightsService'

interface JobMarketAlignmentCardProps {
  alignment: JobMarketAlignmentData
  onExploreJobs: () => void
}

export const JobMarketAlignmentCard: React.FC<JobMarketAlignmentCardProps> = ({
  alignment,
  onExploreJobs,
}) => {
  return (
    <Card className="p-5 bg-white border-slate-200/80 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Job Market Alignment</h2>
              <Badge variant="indigo" size="sm">
                JobAI Catalog Intelligence
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Grounded in current role requirements across opportunities in your active JobAI catalog
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onExploreJobs}
          leftIcon={<Search className="w-3.5 h-3.5 text-slate-600" />}
          className="text-xs h-8"
        >
          Explore Catalog Jobs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Top Skills in Catalog Demand */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wide">
            <span>Most Requested Stack Skills in Catalog</span>
            <span className="text-[11px] text-slate-400 font-normal">Occurrence Rate</span>
          </div>

          <div className="space-y-2">
            {alignment.topSkillsInCatalog.map((sk) => (
              <div key={sk.skill} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>{sk.skill}</span>
                  <span className="text-indigo-600">{sk.percentage}% of roles</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${sk.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Common Requirements */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Key Patterns Across Matched Roles
          </div>

          <div className="space-y-2">
            {alignment.commonRequirements.map((req, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 text-xs text-slate-700"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keywords footer */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-slate-600">Frequent ATS Keywords:</span>
        {alignment.frequentKeywords.map((kw) => (
          <span
            key={kw}
            className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
          >
            {kw}
          </span>
        ))}
      </div>
    </Card>
  )
}
