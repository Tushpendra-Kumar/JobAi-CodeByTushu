import { Check, ArrowRight, UserCheck } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export interface ProfileCompletenessCardProps {
  completeness?: number
  onCompleteProfile: () => void
}

export const ProfileCompletenessCard: React.FC<ProfileCompletenessCardProps> = ({
  completeness = 82,
  onCompleteProfile,
}) => {
  const checklist = [
    { label: 'Basic information', completed: true },
    { label: 'Technical skills', completed: true },
    { label: 'Education', completed: true },
    { label: 'Projects', completed: true },
    { label: 'Career preferences', completed: false },
  ]

  return (
    <Card className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left relative overflow-hidden">
      <div className="space-y-4">
        {/* Header with progress */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Profile Intelligence</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              Improve Your Match Accuracy
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Complete your profile for higher confidence scores.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xl sm:text-2xl font-black text-indigo-600 leading-none block">
              {completeness}%
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Completeness
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-700"
            style={{ width: `${completeness}%` }}
          />
        </div>

        {/* Checklist */}
        <ul className="space-y-2 pt-1">
          {checklist.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between text-xs font-medium"
            >
              <div className="flex items-center gap-2 text-slate-700">
                {item.completed ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 text-[10px] font-bold">
                    △
                  </span>
                )}
                <span>{item.label}</span>
              </div>
              <span className={`text-[10px] font-semibold uppercase ${item.completed ? 'text-emerald-600' : 'text-amber-600'}`}>
                {item.completed ? 'Done' : 'Pending'}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="pt-2">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onCompleteProfile}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="w-full justify-center font-bold text-xs bg-indigo-600 hover:bg-indigo-700"
          >
            Complete Profile
          </Button>
        </div>
      </div>
    </Card>
  )
}
