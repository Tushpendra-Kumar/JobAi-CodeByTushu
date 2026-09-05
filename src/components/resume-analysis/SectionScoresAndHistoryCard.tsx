import React from 'react'
import {
  ListOrdered,
  History,
  TrendingUp,
  Info,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { SectionScore } from '@/services/resumeAnalysisService'

export interface SectionScoresAndHistoryCardProps {
  sectionScores: SectionScore[]
  history: {
    currentScore: number
    previousScore: number
    difference: number
    date: string
  }
}

export const SectionScoresAndHistoryCard: React.FC<SectionScoresAndHistoryCardProps> = ({
  sectionScores,
  history,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
      {/* 1. Section-by-Section Scores (col-span-8) */}
      <Card className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Granular Audit
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Section-by-Section Analysis
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            6 Sections Evaluated
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {sectionScores.map((sec, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  {sec.name}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-extrabold text-xs text-indigo-700">
                  {sec.score}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200/70 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${sec.score}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-snug">
                {sec.explanation}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* 2. Analysis History (col-span-4) */}
      <Card className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Progress Tracking
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Analysis History
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/40 border border-indigo-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              {history.date}
            </span>
            <span className="text-xs font-black text-indigo-900">
              {history.currentScore} / 100
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Previous Analysis</span>
            <span className="font-semibold text-slate-700">
              {history.previousScore} / 100
            </span>
          </div>

          <div className="pt-2 border-t border-indigo-100/80 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-800 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Net Score Improvement
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black">
              +{history.difference} points
            </span>
          </div>
        </div>

        {/* Demo historical note */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2 text-[11px] text-slate-500">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <p>
            Historical comparison is simulated demo data to demonstrate continuous progress tracking across revisions.
          </p>
        </div>
      </Card>
    </div>
  )
}
