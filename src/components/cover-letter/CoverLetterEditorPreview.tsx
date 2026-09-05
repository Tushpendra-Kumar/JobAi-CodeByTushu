import React, { useState } from 'react'
import {
  Edit3,
  Eye,
  Copy,
  Download,
  Printer,
  Check,
  Send,
  Save,
  Clock,
  FileText,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  copyCoverLetterToClipboard,
  downloadCoverLetterTxt,
  triggerCoverLetterPrint,
} from '@/services/coverLetterExportService'

interface CoverLetterEditorPreviewProps {
  content: string
  onChangeContent: (val: string) => void
  onSave: () => void
  onUseInApplication: () => void
  jobTitle: string
  company: string
  candidateName: string
  candidateEmail: string
  candidatePhone?: string
  candidateLocation?: string
}

export const CoverLetterEditorPreview: React.FC<CoverLetterEditorPreviewProps> = ({
  content,
  onChangeContent,
  onSave,
  onUseInApplication,
  jobTitle,
  company,
  candidateName,
  candidateEmail,
  candidatePhone,
  candidateLocation,
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'editor'>('preview')
  const [copied, setCopied] = useState(false)
  const [savedNotice, setSavedNotice] = useState(false)

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const charCount = content.length
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200))

  const handleCopy = async () => {
    const success = await copyCoverLetterToClipboard(content)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    const filename = `${candidateName.replace(/\s+/g, '_')}_Cover_Letter_${company.replace(/\s+/g, '_')}.txt`
    downloadCoverLetterTxt(content, filename)
  }

  const handleSaveClick = () => {
    onSave()
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 2000)
  }

  return (
    <Card className="flex flex-col h-full bg-white shadow-xs">
      {/* Editor/Preview Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 border-b border-slate-200/80 bg-slate-50/70">
        {/* Mode Switcher */}
        <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'preview'
                ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Document Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('editor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'editor'
                ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Text</span>
          </button>
        </div>

        {/* Word/Time Stats */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <strong>{wordCount}</strong> words ({charCount} chars)
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            ~{readingTimeMin} min read
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSaveClick}
            leftIcon={
              savedNotice ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Save className="w-3.5 h-3.5 text-slate-600" />
              )
            }
            className="text-xs h-8"
          >
            {savedNotice ? 'Saved!' : 'Save Draft'}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            leftIcon={
              copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-600" />
              )
            }
            className="text-xs h-8"
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownload}
            leftIcon={<Download className="w-3.5 h-3.5 text-slate-600" />}
            className="text-xs h-8 hidden md:inline-flex"
            title="Download TXT"
          >
            TXT
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={triggerCoverLetterPrint}
            leftIcon={<Printer className="w-3.5 h-3.5 text-slate-600" />}
            className="text-xs h-8"
            title="Print or Save as PDF"
          >
            Print
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onUseInApplication}
            leftIcon={<Send className="w-3.5 h-3.5 text-indigo-100" />}
            className="text-xs h-8 shadow-xs"
          >
            Use in Application
          </Button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto min-h-[460px]">
        {viewMode === 'editor' ? (
          <div className="h-full flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
              <span>Direct Text Editor — Edits update instant preview & quality checks</span>
              <span>Markdown & standard punctuation supported</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => onChangeContent(e.target.value)}
              aria-label="Cover letter content editor"
              className="w-full flex-1 p-4 text-xs sm:text-sm font-mono text-slate-800 bg-slate-50/50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white resize-none leading-relaxed min-h-[420px]"
              placeholder="Your cover letter content will appear here..."
            />
          </div>
        ) : (
          /* Document Preview (Letterhead layout) */
          <div
            id="printable-cover-letter"
            className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-xl border border-slate-200/80 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0"
          >
            {/* Candidate Header */}
            <div className="border-b-2 border-indigo-600 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {candidateName}
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-600 mt-1">
                <span>{candidateEmail}</span>
                {candidatePhone && (
                  <>
                    <span>•</span>
                    <span>{candidatePhone}</span>
                  </>
                )}
                {candidateLocation && (
                  <>
                    <span>•</span>
                    <span>{candidateLocation}</span>
                  </>
                )}
              </div>
            </div>

            {/* Target Role & Date */}
            <div className="text-xs text-slate-600 space-y-1">
              <div className="font-medium text-slate-500">
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="font-semibold text-slate-800 pt-1">Hiring Team</div>
              <div className="text-slate-700">{company}</div>
              <div className="text-slate-500">Application for: {jobTitle}</div>
            </div>

            {/* Letter Content */}
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif whitespace-pre-line space-y-3 select-text">
              {content}
            </div>

            {/* Document Footer Notice */}
            <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 print:hidden">
              <span>Generated via JobAI Career Copilot</span>
              <span>100% Factually Grounded Profile</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
