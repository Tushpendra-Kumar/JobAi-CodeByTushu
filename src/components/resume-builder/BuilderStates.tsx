import React from 'react'
import { FileUp, Sparkles, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface BuilderEmptyStateProps {
  onLoadSampleResume: () => void
  onNavigateToUpload: () => void
}

export const BuilderEmptyState: React.FC<BuilderEmptyStateProps> = ({
  onLoadSampleResume,
  onNavigateToUpload,
}) => {
  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white border border-slate-200/90 rounded-2xl text-center shadow-sm space-y-6">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          No Resume Data Loaded Yet
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          The AI Resume Builder utilizes your verified career credentials to craft ATS-optimized,
          role-tailored resumes without hallucinating experiences.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button
          variant="primary"
          onClick={onLoadSampleResume}
          leftIcon={<UserCheck className="w-4 h-4 text-amber-300" />}
          className="w-full sm:w-auto"
        >
          Load Verified Candidate Profile (Tushpendra Kumar)
        </Button>
        <Button
          variant="secondary"
          onClick={onNavigateToUpload}
          leftIcon={<FileUp className="w-4 h-4 text-slate-500" />}
          className="w-full sm:w-auto"
        >
          Upload Your Resume PDF
        </Button>
      </div>
    </div>
  )
}
