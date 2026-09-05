import React from 'react'
import {
  FileCheck,
  Cpu,
  Briefcase,
  FolderGit2,
  Search,
  BookOpen,
  Layout,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { ScoreBreakdownItem } from '@/services/resumeAnalysisService'

export interface ScoreBreakdownGridProps {
  items: ScoreBreakdownItem[]
}

const ICON_MAP: Record<string, React.ReactNode> = {
  ats: <FileCheck className="w-4 h-4 text-emerald-600" />,
  skills: <Cpu className="w-4 h-4 text-indigo-600" />,
  experience: <Briefcase className="w-4 h-4 text-blue-600" />,
  projects: <FolderGit2 className="w-4 h-4 text-purple-600" />,
  keywords: <Search className="w-4 h-4 text-amber-600" />,
  readability: <BookOpen className="w-4 h-4 text-teal-600" />,
  formatting: <Layout className="w-4 h-4 text-indigo-600" />,
}

export const ScoreBreakdownGrid: React.FC<ScoreBreakdownGridProps> = ({ items }) => {
  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 text-left">
            Core Evaluation Breakdown
          </h3>
          <p className="text-xs text-slate-500 text-left">
            Diagnostic scores across 7 key recruitment and algorithmic screening dimensions.
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
          7 Metrics Analyzed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const isHigh = item.score >= 88
          const isMid = item.score >= 80 && item.score < 88

          return (
            <Card
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between text-left space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center shrink-0">
                    {ICON_MAP[item.id] || <FileCheck className="w-4 h-4 text-slate-600" />}
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isHigh
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        : isMid
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {item.name}
                  </h4>
                  <div className="flex items-baseline gap-1 pt-0.5">
                    <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {item.score}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isHigh
                        ? 'bg-emerald-500'
                        : isMid
                        ? 'bg-indigo-600'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2 pt-1 border-t border-slate-100">
                {item.explanation}
              </p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
