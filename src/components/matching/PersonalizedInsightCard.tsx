import { Compass, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export interface PersonalizedInsightCardProps {
  onExploreCareerPaths: () => void
}

export const PersonalizedInsightCard: React.FC<PersonalizedInsightCardProps> = ({
  onExploreCareerPaths,
}) => {
  const roles = [
    { name: 'Frontend Development', match: 92, barColor: 'bg-indigo-600' },
    { name: 'Full Stack Development', match: 89, barColor: 'bg-blue-600' },
    { name: 'AI Application Development', match: 82, barColor: 'bg-violet-600' },
  ]

  return (
    <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left relative overflow-hidden">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span>Personalized Insight</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              Your profile is strongest for Frontend and Full Stack roles.
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Based on your current technical skills and project experience, these roles currently show the highest compatibility.
            </p>
          </div>
        </div>

        {/* Roles Breakdown */}
        <div className="space-y-2.5">
          {roles.map((r) => (
            <div key={r.name} className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/60">
              <div className="flex justify-between items-center text-xs font-semibold mb-1">
                <span className="text-slate-800">{r.name}</span>
                <span className="text-slate-900 font-extrabold">{r.match}%</span>
              </div>
              <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${r.barColor} transition-all duration-700`}
                  style={{ width: `${r.match}%` }}
                />
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
            onClick={onExploreCareerPaths}
            rightIcon={<ArrowRight className="w-3.5 h-3.5 text-indigo-600" />}
            className="w-full justify-center font-bold text-xs text-indigo-700 hover:text-indigo-800 bg-indigo-50/60 hover:bg-indigo-100/70 border-indigo-200"
          >
            Explore Career Paths
          </Button>
        </div>
      </div>
    </Card>
  )
}
