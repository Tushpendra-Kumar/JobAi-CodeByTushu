import {
  FileText,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Trash2,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatFileSize } from '@/services/resumeParserService'

export interface FilePreviewCardProps {
  file: File
  onReplaceFile: () => void
  onAnalyzeResume: () => void
  isAnalyzing?: boolean
}

export const FilePreviewCard: React.FC<FilePreviewCardProps> = ({
  file,
  onReplaceFile,
  onAnalyzeResume,
  isAnalyzing = false,
}) => {
  const extension = file.name.split('.').pop()?.toUpperCase() || 'PDF'
  const formattedSize = formatFileSize(file.size)

  return (
    <Card className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-xl mx-auto">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block">
            Selected Document
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Resume Ready for AI Analysis
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Our AI parser will extract your experience, skills, and projects to construct your career profile.
          </p>
        </div>

        {/* Selected File Card Visual */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Document Icon with File Type Pill */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex flex-col items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
              <FileText className="w-6 h-6" />
              <span className="text-[9px] font-black tracking-wider uppercase mt-0.5">
                {extension}
              </span>
            </div>

            <div className="space-y-1 overflow-hidden text-left flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate" title={file.name}>
                {file.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold text-[10px]">
                  {extension}
                </span>
                <span>•</span>
                <span>{formattedSize}</span>
              </div>
            </div>
          </div>

          {/* Status Indicator Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ready to analyze</span>
          </div>
        </div>

        {/* Actions: Replace or Analyze */}
        <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onReplaceFile}
            disabled={isAnalyzing}
            leftIcon={<Trash2 className="w-3.5 h-3.5 text-slate-500" />}
            className="w-full sm:w-auto text-xs font-semibold text-slate-600 border-slate-200"
          >
            Replace
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onAnalyzeResume}
            disabled={isAnalyzing}
            leftIcon={<Sparkles className="w-4 h-4 text-white" />}
            rightIcon={<ArrowRight className="w-4 h-4 text-white" />}
            className="w-full sm:w-auto font-bold text-xs sm:text-sm px-6 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
