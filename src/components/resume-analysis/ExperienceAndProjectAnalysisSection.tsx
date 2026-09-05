import React from 'react'
import { Briefcase, FolderGit2, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { ResumeAnalysisResult } from '@/services/resumeAnalysisService'

export interface ExperienceAndProjectAnalysisSectionProps {
  experienceAnalysis: ResumeAnalysisResult['experienceAnalysis']
  projectAnalysis: ResumeAnalysisResult['projectAnalysis']
}

export const ExperienceAndProjectAnalysisSection: React.FC<ExperienceAndProjectAnalysisSectionProps> = ({
  experienceAnalysis,
  projectAnalysis,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
      {/* Left: Experience Analysis (col-span-6) */}
      <Card className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Work History Evaluation
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Experience Strength
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200/60">
            {experienceAnalysis.relevance}% Relevance
          </span>
        </div>

        {/* 3 Metric Mini Bars */}
        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">
              Relevance
            </span>
            <span className="text-base sm:text-lg font-extrabold text-slate-900">
              {experienceAnalysis.relevance}%
            </span>
          </div>
          <div className="space-y-1 border-x border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">
              Alignment
            </span>
            <span className="text-base sm:text-lg font-extrabold text-slate-900">
              {experienceAnalysis.projectAlignment}%
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">
              Role Match
            </span>
            <span className="text-base sm:text-lg font-extrabold text-slate-900">
              {experienceAnalysis.roleRelevance}%
            </span>
          </div>
        </div>

        {/* AI Feedback Quote */}
        <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1">
          <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">
            AI Narrative Feedback
          </span>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            “{experienceAnalysis.feedback}”
          </p>
        </div>

        {/* Actionable Recommendations */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Recommendations for Your Bullets
          </h4>
          <ul className="space-y-2 text-xs text-slate-600">
            {experienceAnalysis.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Right: Project Analysis (col-span-6) */}
      <Card className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Practical Evidence
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Project Strength
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200/60">
            {projectAnalysis.score}% Score
          </span>
        </div>

        {/* Individual Project Cards from Parsed Resume */}
        <div className="space-y-3">
          {projectAnalysis.projects.map((proj, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {proj.name}
                  </h4>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded bg-white text-slate-700 text-[10px] font-medium border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 shrink-0">
                  Relevance: {proj.technicalRelevance}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                {proj.recommendation}
              </p>
            </div>
          ))}
        </div>

        {/* Project Evaluation Notes */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Project Presentation Guidance
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {projectAnalysis.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}
