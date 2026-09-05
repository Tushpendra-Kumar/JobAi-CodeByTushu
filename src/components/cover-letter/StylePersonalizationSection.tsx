import React from 'react'
import { Sliders, CheckSquare, Square } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type {
  CoverLetterTone,
  CoverLetterLength,
  CoverLetterPersonalizationOptions,
} from '@/services/coverLetterService'

interface StylePersonalizationSectionProps {
  tone: CoverLetterTone
  length: CoverLetterLength
  personalization: CoverLetterPersonalizationOptions
  onToneChange: (tone: CoverLetterTone) => void
  onLengthChange: (length: CoverLetterLength) => void
  onPersonalizationToggle: (key: keyof CoverLetterPersonalizationOptions) => void
}

const TONES: { id: CoverLetterTone; label: string; desc: string }[] = [
  { id: 'Professional', label: 'Professional', desc: 'Recruiter-ready & balanced' },
  { id: 'Confident', label: 'Confident', desc: 'Achievement & impact focused' },
  { id: 'Concise', label: 'Concise', desc: 'Tight, direct & fast to read' },
  { id: 'Enthusiastic', label: 'Enthusiastic', desc: 'High energy & mission aligned' },
  { id: 'Technical', label: 'Technical', desc: 'Architecture & rigor focused' },
]

const LENGTHS: { id: CoverLetterLength; label: string; words: string }[] = [
  { id: 'Short', label: 'Short', words: '~200 words' },
  { id: 'Standard', label: 'Standard', words: '~320 words' },
  { id: 'Detailed', label: 'Detailed', words: '~450 words' },
]

const PERSONALIZATION_CONFIGS: {
  key: keyof CoverLetterPersonalizationOptions
  label: string
  detail: string
}[] = [
  {
    key: 'highlightSkills',
    label: 'Highlight Matching Skills',
    detail: 'Directly weave in matched tech stack keywords',
  },
  {
    key: 'highlightProjects',
    label: 'Reference Engineering Projects',
    detail: 'Mention hands-on projects like JobAI',
  },
  {
    key: 'highlightExperience',
    label: 'Highlight Internship Achievements',
    detail: 'Highlight real responsibilities from TechCorp',
  },
  {
    key: 'mentionCompanyInterest',
    label: 'Company Culture & Mission',
    detail: 'Incorporate genuine enthusiasm for their team',
  },
  {
    key: 'mentionCareerGoals',
    label: 'Long-Term Growth Intent',
    detail: 'Express commitment to technical career progression',
  },
  {
    key: 'focusTechnicalStrengths',
    label: 'Technical Rigor & Best Practices',
    detail: 'Emphasize code cleanliness, type safety, and testing',
  },
]

export const StylePersonalizationSection: React.FC<StylePersonalizationSectionProps> = ({
  tone,
  length,
  personalization,
  onToneChange,
  onLengthChange,
  onPersonalizationToggle,
}) => {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold text-sm">
          3
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">Tone & Personalization Style</h2>
          <p className="text-xs text-slate-500">
            Tailor the voice, depth, and specific sections emphasized by the AI generator
          </p>
        </div>
      </div>

      {/* Tone Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700">Writing Tone</label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {TONES.map((t) => {
            const isSelected = tone === t.id
            return (
              <button
                type="button"
                key={t.id}
                onClick={() => onToneChange(t.id)}
                className={`text-left p-2.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-semibold shadow-xs ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-xs font-semibold">{t.label}</div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{t.desc}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Length Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700">Cover Letter Length</label>
        <div className="grid grid-cols-3 gap-2">
          {LENGTHS.map((l) => {
            const isSelected = length === l.id
            return (
              <button
                type="button"
                key={l.id}
                onClick={() => onLengthChange(l.id)}
                className={`py-2 px-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-semibold shadow-xs ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-xs font-semibold">{l.label}</div>
                <div className="text-[10px] text-slate-500">{l.words}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Personalization Options */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <Sliders className="w-3.5 h-3.5 text-indigo-600" />
          <span>Personalization Elements Grounded in Your Resume</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PERSONALIZATION_CONFIGS.map((cfg) => {
            const isChecked = personalization[cfg.key]
            return (
              <div
                key={cfg.key}
                onClick={() => onPersonalizationToggle(cfg.key)}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer select-none transition-all ${
                  isChecked
                    ? 'bg-indigo-50/30 border-indigo-200/90 text-slate-800'
                    : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="mt-0.5 text-indigo-600 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 fill-indigo-100 text-indigo-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800">{cfg.label}</div>
                  <div className="text-[10px] text-slate-500 leading-tight">{cfg.detail}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
