import React, { useState } from 'react'
import { X, Copy, Check, Mail, Building2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { TrackedApplication } from '@/services/applicationTrackingService'

interface ViewCoverLetterModalProps {
  application: TrackedApplication | null
  isOpen: boolean
  onClose: () => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export const ViewCoverLetterModal: React.FC<ViewCoverLetterModalProps> = ({
  application,
  isOpen,
  onClose,
  onToast,
}) => {
  const [copied, setCopied] = useState(false)

  if (!isOpen || !application) return null

  const coverLetter = application.coverLetterText || 'No cover letter content recorded.'

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter)
    setCopied(true)
    onToast('Cover letter copied to clipboard!', 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
              <Mail className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Tailored Cover Letter
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="font-semibold text-slate-700">{application.jobTitle}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {application.company}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice */}
        <div className="px-5 py-2.5 bg-indigo-50/50 border-b border-indigo-100 text-[11px] text-indigo-900 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>Grounded strictly in verified candidate credentials. Zero fabricated achievements.</span>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[60vh]">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed shadow-2xs">
            {coverLetter}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Linked to {application.resumeVersionName || 'Master Resume'}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="text-xs flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </Button>
            <Button variant="primary" size="sm" onClick={onClose} className="text-xs">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
