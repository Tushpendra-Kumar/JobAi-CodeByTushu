import React from 'react'
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Upload,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export interface ResumeEmptyStateProps {
  onUploadClick: () => void
}

export const ResumeEmptyState: React.FC<ResumeEmptyStateProps> = ({
  onUploadClick,
}) => {
  return (
    <Card className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center space-y-5 max-w-xl mx-auto my-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
        <FileText className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Your AI Career Profile Starts Here
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Upload your resume to automatically build your structured career profile and power explainable AI matching.
        </p>
      </div>

      <div className="pt-2">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onUploadClick}
          leftIcon={<Upload className="w-4 h-4" />}
          className="font-bold text-xs sm:text-sm px-6 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20"
        >
          Upload Resume
        </Button>
      </div>
    </Card>
  )
}

export interface ResumeErrorStateProps {
  onTryAgain: () => void
  onChooseAnother: () => void
  errorMessage?: string
}

export const ResumeErrorState: React.FC<ResumeErrorStateProps> = ({
  onTryAgain,
  onChooseAnother,
  errorMessage = 'Please try another supported resume file.',
}) => {
  return (
    <Card className="p-8 sm:p-12 rounded-2xl bg-rose-50/40 border border-rose-200/80 shadow-sm text-center space-y-5 max-w-xl mx-auto my-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          We couldn't analyze this resume
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          {errorMessage}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onTryAgain}
          leftIcon={<RefreshCw className="w-4 h-4" />}
          className="w-full sm:w-auto font-bold text-xs bg-rose-600 hover:bg-rose-700 shadow-xs"
        >
          Try Again
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onChooseAnother}
          className="w-full sm:w-auto font-semibold text-xs text-slate-700 border-slate-300"
        >
          Choose Another File
        </Button>
      </div>
    </Card>
  )
}

export interface ResumeSuccessStateProps {
  onViewMatches: () => void
  onViewAnalysis?: () => void
  onReupload: () => void
  candidateName?: string
}

export const ResumeSuccessState: React.FC<ResumeSuccessStateProps> = ({
  onViewMatches,
  onViewAnalysis,
  onReupload,
  candidateName = 'Candidate',
}) => {
  return (
    <Card className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-emerald-900 via-slate-900 to-indigo-950 text-white shadow-xl border border-emerald-500/30 text-center space-y-6 max-w-2xl mx-auto my-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile Synchronized</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Your AI Career Profile is Ready
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Welcome, <strong>{candidateName}</strong>! JobAI has successfully extracted your skills, projects, and work history. Your personalized AI Job Recommendations and Resume Analysis are now ready.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          {onViewAnalysis && (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={onViewAnalysis}
              leftIcon={<Sparkles className="w-4 h-4 text-white" />}
              className="w-full sm:w-auto font-bold text-xs sm:text-sm px-6 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
            >
              View AI Resume Analysis
            </Button>
          )}

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onViewMatches}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto font-bold text-xs sm:text-sm px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30"
          >
            View AI Job Matches
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onReupload}
            className="w-full sm:w-auto text-xs font-semibold text-slate-300 border-slate-700 bg-slate-800/80 hover:bg-slate-700"
          >
            Upload Another
          </Button>
        </div>
      </div>
    </Card>
  )
}
