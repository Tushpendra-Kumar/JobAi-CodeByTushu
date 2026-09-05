import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  FileCheck,
  Send,
  Compass,
  FileText,
} from 'lucide-react'
import type { AISettingsData } from '@/services/profileSettingsService'

interface AiSettingsSectionProps {
  data: AISettingsData
  onChange: (updated: Partial<AISettingsData>) => void
}

const PERSONALIZATION_LEVELS: {
  level: AISettingsData['personalizationLevel']
  label: string
  desc: string
}[] = [
  {
    level: 'Low',
    label: 'Standard',
    desc: 'Uses strict literal keyword matching without contextual inference.',
  },
  {
    level: 'Balanced',
    label: 'Balanced (Recommended)',
    desc: 'Smart semantic alignment between verified skills and job requirements.',
  },
  {
    level: 'High',
    label: 'Deep Tailoring',
    desc: 'Synthesizes achievements, project impacts, and fine-tuned role keywords.',
  },
]

const AI_TONES: {
  tone: AISettingsData['aiTone']
  desc: string
}[] = [
  { tone: 'Professional', desc: 'Authoritative, polite, and industry standard.' },
  { tone: 'Confident', desc: 'Direct, impact-driven, emphasizing tangible outcomes.' },
  { tone: 'Concise', desc: 'High-density, brief bullets with zero corporate fluff.' },
  { tone: 'Friendly', desc: 'Approachable, enthusiastic, and collaborative.' },
]

export const AiSettingsSection: React.FC<AiSettingsSectionProps> = ({ data, onChange }) => {
  const handleToggleFeature = (key: keyof AISettingsData) => {
    onChange({ [key]: !data[key] })
  }

  const handleUpdatePriorityWeight = (priorityId: string, newWeight: number) => {
    const updated = data.matchingPriorities.map((p) =>
      p.id === priorityId ? { ...p, weight: newWeight } : p
    )
    onChange({ matchingPriorities: updated })
  }

  return (
    <Card className="p-6 border-slate-200/90 shadow-sm space-y-7">
      {/* Header */}
      <div className="pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">AI & Copilot Behavior</h3>
          <Badge variant="indigo" size="sm">
            Core Intelligence
          </Badge>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure how JobAI AI agents operate across job ranking, resume optimization, cover letter drafting, and career trajectory intelligence.
        </p>
      </div>

      {/* Mandatory Non-Fabrication Truth Guarantee */}
      <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-200/80 space-y-2">
        <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Strict Factual Grounding & Ethical Guarantee</span>
        </div>
        <p className="text-xs text-indigo-950/80 leading-relaxed">
          JobAI AI agents are strictly hardwired to never fabricate experience, skills, company names, degrees, certifications, metrics, or achievements. AI suggestions are assistive recommendations. You always remain in full control of your documents.
        </p>
      </div>

      {/* AI Feature Modules Toggles */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          AI Copilot Feature Modules
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* AI Job Matching */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI Job Matching</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Use your profile, skills, resume and preferences to rank and surface high-match jobs.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={data.jobMatchingEnabled}
                onChange={() => handleToggleFeature('jobMatchingEnabled')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* AI Resume Optimization */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>AI Resume Optimization</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Analyze your resume against selected job descriptions and suggest keyword alignment.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={data.resumeOptimizationEnabled}
                onChange={() => handleToggleFeature('resumeOptimizationEnabled')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* AI Resume Analysis */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>AI Resume ATS Analysis</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Audit ATS compliance, keyword frequency, structural checks, and target role readiness.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={data.resumeAnalysisEnabled}
                onChange={() => handleToggleFeature('resumeAnalysisEnabled')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* AI Cover Letter Generation */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>AI Cover Letter Generator</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Draft tailored letters grounded exclusively in verified profile achievements and experience.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={data.coverLetterGenerationEnabled}
                onChange={() => handleToggleFeature('coverLetterGenerationEnabled')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* AI Career Insights */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                <Compass className="w-3.5 h-3.5 text-purple-600" />
                <span>AI Career Insights & Gaps</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Synthesize application performance, role fit scoring, and 4-week learning roadmaps.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={data.careerInsightsEnabled}
                onChange={() => handleToggleFeature('careerInsightsEnabled')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* AI Application Assistance */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                <Send className="w-3.5 h-3.5 text-rose-600" />
                <span>AI Auto-Apply Preparation</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Stage pre-filled screening answers and match diagnostics for mandatory human review.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={data.applicationAssistanceEnabled}
                onChange={() => handleToggleFeature('applicationAssistanceEnabled')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Advanced AI Behavior Preferences */}
      <div className="pt-2 space-y-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          AI Generation & Personalization Style
        </h4>

        {/* Personalization Level */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Personalization Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PERSONALIZATION_LEVELS.map((item) => {
              const isSelected = data.personalizationLevel === item.level
              return (
                <div
                  key={item.level}
                  onClick={() => onChange({ personalizationLevel: item.level })}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-300 text-indigo-950 ring-1 ring-indigo-400/40 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>{item.label}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight mt-1">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* AI Tone */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-bold text-slate-700">
            Default AI Writing Tone
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {AI_TONES.map((item) => {
              const isSelected = data.aiTone === item.tone
              return (
                <div
                  key={item.tone}
                  onClick={() => onChange({ aiTone: item.tone })}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all text-center ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold">{item.tone}</div>
                  <p
                    className={`text-[10px] mt-1 leading-tight ${
                      isSelected ? 'text-indigo-100' : 'text-slate-400'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Job Matching Priority Weights */}
      <div className="pt-2 space-y-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-800">Job Matching Priority Factors</h4>
            <p className="text-[11px] text-slate-500">
              Adjust how much weight JobAI assigns to each dimension when ranking opportunities.
            </p>
          </div>
          <Badge variant="indigo" size="sm">
            Weighted Ranking
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {data.matchingPriorities.map((factor) => (
            <div
              key={factor.id}
              className="p-3 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">{factor.label}</span>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  {factor.weight === 5
                    ? 'Critical (5/5)'
                    : factor.weight === 4
                    ? 'High (4/5)'
                    : factor.weight === 3
                    ? 'Medium (3/5)'
                    : factor.weight === 2
                    ? 'Low (2/5)'
                    : 'Minimal (1/5)'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {factor.description}
              </p>

              {/* Slider / Segmented Controller */}
              <div className="flex items-center gap-1 pt-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleUpdatePriorityWeight(factor.id, level)}
                    className={`flex-1 h-2 rounded-full transition-all cursor-pointer ${
                      level <= factor.weight
                        ? 'bg-indigo-600'
                        : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                    title={`Set priority to ${level}/5`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
