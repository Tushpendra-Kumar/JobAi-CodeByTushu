import React, { useState } from 'react'
import { Sparkles, ShieldCheck, FileText } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import type { AutoApplyConfiguration } from '@/services/autoApplyService'
import type { ResumeDraftVersion } from '@/services/resumeVersionService'

interface AutoApplyConfigModalProps {
  isOpen: boolean
  onClose: () => void
  onSaveConfig: (config: AutoApplyConfiguration) => void
  resumeVersions: ResumeDraftVersion[]
  currentConfig: AutoApplyConfiguration
}

const TARGET_ROLE_PRESETS = [
  'Software Engineer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'React Developer',
  'Node.js Developer',
]

export const AutoApplyConfigModal: React.FC<AutoApplyConfigModalProps> = ({
  isOpen,
  onClose,
  onSaveConfig,
  resumeVersions,
  currentConfig,
}) => {
  const [config, setConfig] = useState<AutoApplyConfiguration>(currentConfig)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSaveConfig(config)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configure AI Auto Apply"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Intro description */}
        <p className="text-xs text-slate-500">
          Set your matching criteria and preferences. JobAI will filter high-fit opportunities and
          prepare tailored application packages for your review.
        </p>

        {/* Target Role */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Target Job Title / Role
          </label>
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {TARGET_ROLE_PRESETS.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setConfig({ ...config, targetRole: role })}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  config.targetRole === role
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={config.targetRole}
            onChange={(e) => setConfig({ ...config, targetRole: e.target.value })}
            className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500"
            placeholder="Custom role title..."
          />
        </div>

        {/* Match Score & Batch Limit Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Minimum Match Score */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Minimum Match Score</span>
              <span className="text-indigo-600 font-bold">{config.minMatchScore}%</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[75, 80, 85].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setConfig({ ...config, minMatchScore: score })}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition-colors cursor-pointer ${
                    config.minMatchScore === score
                      ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {score}%+ Match
                </button>
              ))}
            </div>
          </div>

          {/* Batch Limit */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Batch Queue Limit</span>
              <span className="text-slate-900 font-bold">{config.applicationLimit} jobs</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[3, 5, 10].map((lim) => (
                <button
                  key={lim}
                  type="button"
                  onClick={() => setConfig({ ...config, applicationLimit: lim })}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition-colors cursor-pointer ${
                    config.applicationLimit === lim
                      ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lim} Applications
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Work Mode & Experience Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Work Mode Preference
            </label>
            <select
              value={config.workMode}
              onChange={(e) =>
                setConfig({ ...config, workMode: e.target.value as AutoApplyConfiguration['workMode'] })
              }
              className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl"
            >
              <option value="Any">Any Work Mode</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Experience Level
            </label>
            <select
              value={config.experienceLevel}
              onChange={(e) =>
                setConfig({
                  ...config,
                  experienceLevel: e.target.value as AutoApplyConfiguration['experienceLevel'],
                })
              }
              className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl"
            >
              <option value="Any">Any Experience</option>
              <option value="Fresher">Fresher</option>
              <option value="Entry Level">Entry Level (0-2 yrs)</option>
              <option value="Junior">Junior (1-3 yrs)</option>
              <option value="Mid Level">Mid Level (3-5 yrs)</option>
            </select>
          </div>
        </div>

        {/* Resume Version Selection */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>Default Resume Version</span>
          </label>
          <select
            value={config.resumeVersionId}
            onChange={(e) => setConfig({ ...config, resumeVersionId: e.target.value })}
            className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl"
          >
            {resumeVersions.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.targetRole}) — {v.lastModified}
              </option>
            ))}
          </select>
        </div>

        {/* Cover Letter & Application Questions Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <span className="text-xs font-bold text-slate-800 block">Cover Letter Handling</span>
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="clOption"
                checked={config.coverLetterOption === 'generate'}
                onChange={() => setConfig({ ...config, coverLetterOption: 'generate' })}
                className="text-indigo-600"
              />
              <span>Generate Tailored with AI</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="clOption"
                checked={config.coverLetterOption === 'skip'}
                onChange={() => setConfig({ ...config, coverLetterOption: 'skip' })}
                className="text-indigo-600"
              />
              <span>Skip Cover Letter</span>
            </label>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <span className="text-xs font-bold text-slate-800 block">Application Questions</span>
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="qOption"
                checked={config.questionOption === 'suggested'}
                onChange={() => setConfig({ ...config, questionOption: 'suggested' })}
                className="text-indigo-600"
              />
              <span>Pre-fill with AI suggestions</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="qOption"
                checked={config.questionOption === 'manual'}
                onChange={() => setConfig({ ...config, questionOption: 'manual' })}
                className="text-indigo-600"
              />
              <span>Leave blank for manual entry</span>
            </label>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-900 leading-relaxed">
            <strong>Human Approval Required: </strong>
            Saving this configuration prepares targeted opportunities in your review queue. No external
            application is ever sent without your explicit click on “Approve & Apply”.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <Button variant="secondary" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
          >
            Apply Configuration & Build Queue
          </Button>
        </div>
      </form>
    </Modal>
  )
}
