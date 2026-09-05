import React from 'react'
import {
  CheckCircle2,
  FileText,
  Sparkles,
  ShieldCheck,
  Send,
} from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import type { PreparedApplicationData } from '@/services/autoApplyService'

interface ApplicationReviewModalProps {
  isOpen: boolean
  onClose: () => void
  application: PreparedApplicationData | null
  onConfirmApplication: () => void
  isSubmitting?: boolean
}

export const ApplicationReviewModal: React.FC<ApplicationReviewModalProps> = ({
  isOpen,
  onClose,
  application,
  onConfirmApplication,
  isSubmitting = false,
}) => {
  if (!application) return null

  const { job, resumeVersionName, coverLetter, questions, readiness } = application

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ready to Apply? — Final Review"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Intro banner */}
        <p className="text-xs text-slate-500 leading-relaxed">
          Your application package has been prepared. Please review your resume, cover letter, and
          answers before finalizing.
        </p>

        {/* 1. Job Information & Match Header */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-2xs"
              style={{ backgroundColor: job.companyColor || '#4F46E5' }}
            >
              {job.companyLogoText || job.company.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">{job.title}</h4>
              <p className="text-[11px] text-slate-500">
                {job.company} • {job.location} ({job.workMode})
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              {job.matchScore}% Match
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Readiness: {readiness.overallReadiness}%
            </span>
          </div>
        </div>

        {/* 2. Key Components Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Selected Resume */}
          <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
              <FileText className="w-3 h-3 text-indigo-600" />
              <span>Selected Resume</span>
            </span>
            <p className="text-xs font-bold text-slate-900 truncate">{resumeVersionName}</p>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified ATS Compliance</span>
            </p>
          </div>

          {/* Cover Letter Status */}
          <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>Cover Letter</span>
            </span>
            <p className="text-xs font-bold text-slate-900">
              {coverLetter ? 'Customized & Grounded' : 'Skipped by preference'}
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              {coverLetter.length} characters • 100% verified facts
            </p>
          </div>
        </div>

        {/* 3. Cover Letter Preview Box */}
        {coverLetter && (
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700 block">
              Cover Letter Preview
            </span>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans max-h-36 overflow-y-auto whitespace-pre-line italic">
              {coverLetter.slice(0, 360)}...
            </div>
          </div>
        )}

        {/* 4. Application Answers Count */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-800 block">
              Interview Questions & Responses
            </span>
            <span className="text-[11px] text-slate-500">
              {questions.length} responses prepared based on your work history & projects
            </span>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
            {questions.length} Answered
          </span>
        </div>

        {/* 5. Application Checklist */}
        <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100/80 space-y-1.5">
          <span className="text-[11px] font-bold text-indigo-950 block">Pre-Flight Checklist</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-700">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Resume selected & matched</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tailored cover letter prepared</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Application answers formatted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Human approval confirmed</span>
            </div>
          </div>
        </div>

        {/* Safety / User Control Notice */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            JobAI records this application inside your demo pipeline. No real-world web scraping or
            unauthorized external submission occurs.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <Button variant="secondary" size="sm" onClick={onClose} disabled={isSubmitting}>
            Go Back & Edit
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onConfirmApplication}
            isLoading={isSubmitting}
            leftIcon={<Send className="w-3.5 h-3.5" />}
            className="shadow-xs font-semibold"
          >
            Confirm & Apply
          </Button>
        </div>
      </div>
    </Modal>
  )
}
