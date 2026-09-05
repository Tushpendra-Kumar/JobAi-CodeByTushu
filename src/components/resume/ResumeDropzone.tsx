import React, { useState, useRef } from 'react'
import {
  UploadCloud,
  FileText,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { validateResumeFile } from '@/services/resumeParserService'

export interface ResumeDropzoneProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({
  onFileSelect,
  disabled = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) return
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const processFile = (file: File) => {
    const validation = validateResumeFile(file)
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid file uploaded.')
      return
    }

    setErrorMessage(null)
    onFileSelect(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    if (disabled) return

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      processFile(droppedFile)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      processFile(selectedFile)
    }
  }

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      fileInputRef.current.click()
    }
  }

  return (
    <Card className="p-6 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
      {/* Background ambient AI glow */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-violet-50/70 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileInputChange}
        className="hidden"
        aria-label="Upload resume file"
        disabled={disabled}
      />

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        {/* Card Headline */}
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Upload Your Resume
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Drop your resume here or choose a file from your device.
          </p>
        </div>

        {/* Drag & Drop Interactive Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleChooseFileClick}
          className={`p-8 sm:p-10 rounded-2xl border-2 border-dashed transition-all cursor-pointer group relative ${
            isDragOver
              ? 'border-indigo-600 bg-indigo-50/50 scale-[1.01] shadow-md ring-4 ring-indigo-500/10'
              : errorMessage
              ? 'border-rose-300 bg-rose-50/30'
              : 'border-slate-200 hover:border-indigo-400 bg-slate-50/60 hover:bg-slate-50'
          }`}
        >
          {/* Document / AI Visual Icon */}
          <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-4 flex items-center justify-center">
            <div
              className={`w-full h-full rounded-2xl flex items-center justify-center transition-all ${
                isDragOver
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                  : 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105'
              }`}
            >
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-white shadow-xs border border-slate-100">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 fill-indigo-100" />
            </div>
          </div>

          {/* Primary / Secondary Copy based on drag state */}
          <div className="space-y-1">
            <p className="text-sm sm:text-base font-bold text-slate-900">
              {isDragOver
                ? 'Release to upload'
                : 'Drag & drop your resume here'}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              or browse files from your device
            </p>
          </div>

          {/* Formats & Size Specs */}
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium flex-wrap">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              PDF, DOC, DOCX
            </span>
            <span>•</span>
            <span>Max 10 MB</span>
          </div>
        </div>

        {/* Error Notification Pill if invalid */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-center gap-2 animate-in fade-in-50 duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Button: Choose Resume */}
        <div className="flex items-center justify-center">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleChooseFileClick}
            className="font-bold text-xs sm:text-sm px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20"
          >
            Choose Resume
          </Button>
        </div>

        {/* Privacy & Demo Disclosure Message */}
        <div className="pt-4 border-t border-slate-100 text-left space-y-1 text-slate-500 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Your resume is used to build your career profile and improve job recommendations.</span>
          </div>
          <p className="text-[11px] text-slate-400 pl-6">
            Demo mode — production-grade secure storage can be connected later.
          </p>
        </div>
      </div>
    </Card>
  )
}
