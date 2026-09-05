import React from 'react'
import {
  CheckCircle2,
  AlertCircle,
  Plus,
  Sparkles,
  Award,
  ChevronRight,
} from 'lucide-react'
import type {
  BuilderQualityMetrics,
  KeywordSuggestion,
} from '@/services/resumeBuilderAIService'

interface ResumeQualitySidebarProps {
  quality: BuilderQualityMetrics
  keywordSuggestions: KeywordSuggestion[]
  onAddSuggestedSkill: (keyword: string, category: 'frontend' | 'backend' | 'database' | 'tools') => void
  onNavigateToAnalysis?: () => void
}

export const ResumeQualitySidebar: React.FC<ResumeQualitySidebarProps> = ({
  quality,
  keywordSuggestions,
  onAddSuggestedSkill,
  onNavigateToAnalysis,
}) => {
  const matchedList = keywordSuggestions.filter((k) => k.matchedInResume)
  const missingList = keywordSuggestions.filter((k) => !k.matchedInResume)

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">ATS Quality Score</h3>
            <p className="text-[11px] text-slate-500">Recruiter algorithm evaluation</p>
          </div>
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            quality.currentScore >= 80
              ? 'bg-emerald-100 text-emerald-800'
              : quality.currentScore >= 65
              ? 'bg-amber-100 text-amber-800'
              : 'bg-rose-100 text-rose-800'
          }`}
        >
          {quality.currentScore}% Score
        </span>
      </div>

      {/* Sub-Metric Bars */}
      <div className="space-y-2.5">
        <div>
          <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
            <span>Profile Completeness</span>
            <span className="font-bold text-slate-900">{quality.completenessScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${quality.completenessScore}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
            <span>Role Keyword Match</span>
            <span className="font-bold text-slate-900">{quality.keywordMatchScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${quality.keywordMatchScore}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
            <span>Readability & Clarity</span>
            <span className="font-bold text-slate-900">{quality.readabilityScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${quality.readabilityScore}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
            <span>Target Role Relevance</span>
            <span className="font-bold text-slate-900">{quality.roleRelevanceScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${quality.roleRelevanceScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Target Keywords Section */}
      <div className="pt-2 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Role Keywords ({matchedList.length}/{keywordSuggestions.length})</span>
          </span>
          <span className="text-[10px] text-slate-400">Click + to add</span>
        </div>

        {/* Missing / Recommended Keywords with 1-click add */}
        {missingList.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold text-amber-800">
              Missing High-Value Keywords:
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {missingList.slice(0, 8).map((k) => (
                <button
                  key={k.keyword}
                  type="button"
                  onClick={() => onAddSuggestedSkill(k.keyword, k.category)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100 transition-colors cursor-pointer group"
                  title={`Add ${k.keyword} to your ${k.category} skills`}
                >
                  <span>{k.keyword}</span>
                  <Plus className="w-3 h-3 text-amber-600 group-hover:scale-110" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Verified Matched Keywords */}
        {matchedList.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold text-emerald-800">
              Detected in Resume:
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
              {matchedList.slice(0, 10).map((k) => (
                <span
                  key={k.keyword}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{k.keyword}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quality Checklist */}
      <div className="pt-2 border-t border-slate-100 space-y-2">
        <span className="text-xs font-bold text-slate-900 block">ATS Checklist</span>
        <div className="space-y-1.5">
          {quality.checklist.map((item) => (
            <div key={item.id} className="flex items-start gap-2 text-[11px]">
              {item.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
              )}
              <span className={item.done ? 'text-slate-700' : 'text-slate-400'}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Link to Screen #6 Analysis */}
      {onNavigateToAnalysis && (
        <button
          type="button"
          onClick={onNavigateToAnalysis}
          className="w-full mt-2 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors border border-slate-200 cursor-pointer"
        >
          <span>View Deep AI Resume Analysis</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      )}
    </div>
  )
}
