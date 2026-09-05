import React from 'react'
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  Loader2,
  FileCheck,
  Award,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Link2,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { ParsingProgressState } from '@/services/resumeParserService'

export interface ParsingProgressViewProps {
  progressState: ParsingProgressState
  fileName?: string
}

export const ParsingProgressView: React.FC<ParsingProgressViewProps> = ({
  progressState,
  fileName = 'Resume.pdf',
}) => {
  const stages = [
    { id: 'uploading', label: 'Uploading' },
    { id: 'reading', label: 'Reading Resume' },
    { id: 'extracting', label: 'Extracting Information' },
    { id: 'structuring', label: 'Structuring Profile' },
    { id: 'complete', label: 'Complete' },
  ]

  const stageOrder = ['uploading', 'reading', 'extracting', 'structuring', 'complete']
  const currentStageIdx = stageOrder.indexOf(progressState.stage)

  const checkpoints = [
    {
      id: 'structure',
      label: 'Resume Structure',
      status: progressState.checkpoints.structure,
      icon: FileCheck,
    },
    {
      id: 'skills',
      label: 'Skills',
      status: progressState.checkpoints.skills,
      icon: Award,
    },
    {
      id: 'experience',
      label: 'Experience',
      status: progressState.checkpoints.experience,
      icon: Briefcase,
    },
    {
      id: 'education',
      label: 'Education',
      status: progressState.checkpoints.education,
      icon: GraduationCap,
    },
    {
      id: 'projects',
      label: 'Projects',
      status: progressState.checkpoints.projects,
      icon: FolderGit2,
    },
    {
      id: 'links',
      label: 'Links',
      status: progressState.checkpoints.links,
      icon: Link2,
    },
  ]

  return (
    <Card className="p-6 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-md text-left relative overflow-hidden max-w-2xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-100/50 via-violet-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/20">
            {progressState.isComplete ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-300" />
            ) : (
              <Cpu className="w-7 h-7 animate-pulse text-indigo-100" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {progressState.isComplete
                ? 'Resume Successfully Analyzed'
                : 'AI is Reading Your Resume'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Extracting skills, experience, education and career information from{' '}
              <strong className="text-slate-700">{fileName}</strong>.
            </p>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-indigo-700 flex items-center gap-1.5">
              {!progressState.isComplete && (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              )}
              <span>{progressState.stageLabel}</span>
            </span>
            <span className="text-slate-900 font-bold">
              {progressState.progressPercentage}%
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 transition-all duration-300"
              style={{ width: `${progressState.progressPercentage}%` }}
            />
          </div>
        </div>

        {/* 5-Stage Horizontal Progress Tracker */}
        <div className="grid grid-cols-5 gap-1.5 pt-2 pb-2">
          {stages.map((stg, idx) => {
            const isFinished = currentStageIdx > idx || progressState.isComplete
            const isCurrent = currentStageIdx === idx && !progressState.isComplete

            return (
              <div key={stg.id} className="text-center space-y-1">
                <div className="flex justify-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isFinished
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 animate-pulse'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {isFinished ? '✓' : isCurrent ? '●' : '○'}
                  </div>
                </div>
                <span
                  className={`text-[10px] block leading-tight font-medium ${
                    isFinished || isCurrent ? 'text-slate-900 font-bold' : 'text-slate-400'
                  }`}
                >
                  {stg.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Granular Parsing Checkpoint Cards */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Extraction Pipeline:
            </span>
            <span className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-layer heuristic scanner</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {checkpoints.map((cp) => {
              const Icon = cp.icon
              const isDone = cp.status === 'completed'
              const isInProgress = cp.status === 'in-progress'

              return (
                <div
                  key={cp.id}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                    isDone
                      ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-900'
                      : isInProgress
                      ? 'bg-indigo-50/60 border-indigo-200 text-indigo-950 font-semibold'
                      : 'bg-slate-50 border-slate-200/60 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${isDone ? 'text-emerald-600' : isInProgress ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="font-medium truncate">{cp.label}</span>
                  </div>

                  {isDone ? (
                    <span className="text-emerald-600 font-bold text-xs">✓</span>
                  ) : isInProgress ? (
                    <Loader2 className="w-3 h-3 text-indigo-600 animate-spin" />
                  ) : (
                    <span className="text-slate-300 text-xs">○</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Completion Message */}
        {progressState.isComplete && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-2 animate-in fade-in-50 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Resume successfully analyzed! Loading your structured profile review...</span>
          </div>
        )}
      </div>
    </Card>
  )
}
