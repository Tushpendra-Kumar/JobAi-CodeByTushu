import React, { useEffect, useState } from 'react'
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Upload,
  RefreshCw,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

// ==========================================
// 1. ANALYSIS LOADING / PROGRESS VIEW
// ==========================================

export interface AnalysisLoadingViewProps {
  onComplete?: () => void
}

export const AnalysisLoadingView: React.FC<AnalysisLoadingViewProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const stages = [
    { label: 'Reading Resume', status: 'Extracting text and metadata' },
    { label: 'Evaluating Structure', status: 'Checking ATS layout and headers' },
    { label: 'Analyzing Skills', status: 'Classifying technical proficiencies' },
    { label: 'Checking Keywords', status: 'Auditing keyword density and coverage' },
    { label: 'Comparing Target Role', status: 'Benchmarking against engineering roles' },
    { label: 'Generating Recommendations', status: 'Synthesizing priority improvement items' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1
        }
        clearInterval(timer)
        onComplete?.()
        return prev
      })
    }, 350)

    return () => clearInterval(timer)
  }, [stages.length, onComplete])

  const progressPercent = Math.round(((currentStep + 1) / stages.length) * 100)

  return (
    <Card className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-md max-w-2xl mx-auto space-y-8 text-center my-12">
      {/* Animated Spinner & Icon */}
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-pulse" />
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
          <Sparkles className="w-8 h-8 animate-bounce text-indigo-600" />
        </div>
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Analyzing your resume…
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          JobAI career copilot is evaluating your resume against ATS criteria, keyword density, and modern software engineering benchmarks.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 max-w-md mx-auto">
        <div className="flex justify-between text-xs font-bold text-slate-700">
          <span>Analysis Progress</span>
          <span className="text-indigo-600 font-extrabold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 6 Stages List */}
      <div className="max-w-md mx-auto space-y-2.5 text-left pt-2">
        {stages.map((stage, idx) => {
          const isDone = idx < currentStep
          const isCurrent = idx === currentStep

          return (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                isDone
                  ? 'bg-emerald-50/50 border-emerald-200/60 text-emerald-900'
                  : isCurrent
                  ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950 font-semibold'
                  : 'bg-slate-50/40 border-slate-200/50 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping shrink-0 ml-0.5" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0 ml-1" />
                )}
                <span>{stage.label}</span>
              </div>

              <span className="text-[10px] font-medium text-slate-500 hidden sm:inline">
                {isDone ? 'Completed' : isCurrent ? 'Analyzing...' : 'Waiting'}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

// ==========================================
// 2. EMPTY STATE
// ==========================================

export interface AnalysisEmptyStateProps {
  onUploadResume: () => void
}

export const AnalysisEmptyState: React.FC<AnalysisEmptyStateProps> = ({ onUploadResume }) => {
  return (
    <Card className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-md max-w-lg mx-auto space-y-6 text-center my-12">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto shadow-inner">
        <Upload className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900">
          Upload a Resume to Get Started
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
          JobAI needs your resume to generate personalized analysis, evaluate ATS compatibility, and highlight skill gaps.
        </p>
      </div>

      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={onUploadResume}
        leftIcon={<Upload className="w-4 h-4" />}
        className="bg-indigo-600 hover:bg-indigo-700 shadow-sm"
      >
        Upload Resume
      </Button>
    </Card>
  )
}

// ==========================================
// 3. ERROR STATE
// ==========================================

export interface AnalysisErrorStateProps {
  onRetry: () => void
  onReplaceResume: () => void
}

export const AnalysisErrorState: React.FC<AnalysisErrorStateProps> = ({
  onRetry,
  onReplaceResume,
}) => {
  return (
    <Card className="p-8 sm:p-12 rounded-3xl bg-white border border-red-100 shadow-md max-w-lg mx-auto space-y-6 text-center my-12">
      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mx-auto">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900">
          We couldn't analyze your resume
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
          Please try again or upload a different resume to inspect its technical keywords and formatting.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Try Again
        </Button>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={onReplaceResume}
          leftIcon={<Upload className="w-3.5 h-3.5" />}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Replace Resume
        </Button>
      </div>
    </Card>
  )
}
