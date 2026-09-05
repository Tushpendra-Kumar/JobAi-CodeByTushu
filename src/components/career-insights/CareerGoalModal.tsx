import React, { useState } from 'react'
import { Check, MapPin } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import type { CareerGoal } from '@/services/careerInsightsService'

interface CareerGoalModalProps {
  isOpen: boolean
  onClose: () => void
  currentGoal: CareerGoal
  onSaveGoal: (newGoal: CareerGoal) => void
}

const ROLES = [
  'Software Developer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'AI Application Developer',
  'DevOps Engineer',
]

const WORK_MODES: ('Remote' | 'Hybrid' | 'On-site' | 'Any')[] = [
  'Remote',
  'Hybrid',
  'On-site',
  'Any',
]

const EXP_LEVELS: ('Fresher' | '1–3 years' | '3–5 years' | '5+ years')[] = [
  'Fresher',
  '1–3 years',
  '3–5 years',
  '5+ years',
]

export const CareerGoalModal: React.FC<CareerGoalModalProps> = ({
  isOpen,
  onClose,
  currentGoal,
  onSaveGoal,
}) => {
  const [targetRole, setTargetRole] = useState(currentGoal.targetRole)
  const [location, setLocation] = useState(currentGoal.location)
  const [workMode, setWorkMode] = useState(currentGoal.workMode)
  const [experienceLevel, setExperienceLevel] = useState(currentGoal.experienceLevel)

  const handleSave = () => {
    onSaveGoal({
      targetRole,
      location,
      workMode,
      experienceLevel,
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Set Target Career Direction"
      description="Customize your target role, work mode, and experience to recalibrate career recommendations."
      maxWidth="md"
    >
      <div className="space-y-4 pt-2">
        {/* Role Selection */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Target Role Title</label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            aria-label="Target Role Title"
            className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Location Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Preferred Location</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Noida, Bengaluru, Remote"
              className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Work Mode */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Preferred Work Mode</label>
          <div className="grid grid-cols-4 gap-2">
            {WORK_MODES.map((wm) => (
              <button
                key={wm}
                type="button"
                onClick={() => setWorkMode(wm)}
                className={`py-2 px-2 text-xs rounded-lg border transition-all ${
                  workMode === wm
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {wm}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Experience Tier</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {EXP_LEVELS.map((el) => (
              <button
                key={el}
                type="button"
                onClick={() => setExperienceLevel(el)}
                className={`py-2 px-2 text-xs rounded-lg border transition-all ${
                  experienceLevel === el
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {el}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose} className="text-xs">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            leftIcon={<Check className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Update Career Goal
          </Button>
        </div>
      </div>
    </Modal>
  )
}
