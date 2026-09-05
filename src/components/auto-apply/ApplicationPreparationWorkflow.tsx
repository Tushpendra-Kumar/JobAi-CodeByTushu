import React, { useState } from 'react'
import {
  Sparkles,
  FileText,
  CheckCircle2,
  AlertCircle,
  Copy,
  RotateCcw,
  Edit3,
  Check,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Job } from '@/data/jobsData'
import type { ResumeDraftVersion } from '@/services/resumeVersionService'
import type {
  ApplicationReadinessBreakdown,
  ApplicationQuestion,
} from '@/services/autoApplyAIService'

interface ApplicationPreparationWorkflowProps {
  job: Job
  resumeVersions: ResumeDraftVersion[]
  selectedVersionId: string
  onSelectResumeVersion: (versionId: string) => void
  onNavigateToResumeBuilder: () => void
  readiness: ApplicationReadinessBreakdown
  coverLetter: string
  onChangeCoverLetter: (text: string) => void
  personalizationReasons: string[]
  onRegenerateCoverLetter: () => void
  questions: ApplicationQuestion[]
  onChangeQuestionAnswer: (questionId: string, answer: string) => void
  onToggleAcceptQuestion: (questionId: string) => void
  onProceedToReview: () => void
  onBackToQueue: () => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export const ApplicationPreparationWorkflow: React.FC<
  ApplicationPreparationWorkflowProps
> = ({
  job,
  resumeVersions,
  selectedVersionId,
  onSelectResumeVersion,
  onNavigateToResumeBuilder,
  readiness,
  coverLetter,
  onChangeCoverLetter,
  personalizationReasons,
  onRegenerateCoverLetter,
  questions,
  onChangeQuestionAnswer,
  onProceedToReview,
  onBackToQueue,
  onToast,
}) => {
  const [isEditingCoverLetter, setIsEditingCoverLetter] = useState(false)
  const [copiedRecently, setCopiedRecently] = useState(false)
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null)

  const activeVersion =
    resumeVersions.find((v) => v.id === selectedVersionId) || resumeVersions[0]

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(coverLetter)
    setCopiedRecently(true)
    setTimeout(() => setCopiedRecently(false), 2000)
    onToast('Cover letter copied to clipboard.', 'success')
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden space-y-6 p-4 sm:p-6">
      {/* Top Header & Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToQueue}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Back to queue"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Application Preparation: {job.title}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {job.matchScore}% Match
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {job.company} • {job.location} ({job.workMode})
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onProceedToReview}
          rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
          className="text-xs font-semibold self-start sm:self-auto"
        >
          Review & Approve
        </Button>
      </div>

      {/* ========================================================
          1. APPLICATION READINESS BREAKDOWN
      ======================================================== */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 border border-indigo-100/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Application Readiness Breakdown
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Overall Preparedness:</span>
            <span className="text-base font-extrabold text-indigo-700">
              {readiness.overallReadiness}%
            </span>
          </div>
        </div>

        {/* 6 Dimension Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
          {[
            { label: 'Resume Match', score: readiness.resumeMatch },
            { label: 'Skills Match', score: readiness.skillsMatch },
            { label: 'Experience Match', score: readiness.experienceMatch },
            { label: 'Keyword Match', score: readiness.keywordMatch },
            { label: 'Project Relevance', score: readiness.projectRelevance },
            { label: 'Cover Letter', score: readiness.coverLetterReadiness },
          ].map((item) => (
            <div
              key={item.label}
              className="p-2.5 rounded-lg bg-white/90 border border-slate-200/80 text-center"
            >
              <span className="text-[10px] text-slate-500 block truncate">{item.label}</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                {item.score}%
              </span>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-slate-600 italic">
          "{readiness.summaryNote}"
        </p>
      </div>

      {/* ========================================================
          2. RESUME SELECTION SECTION
      ======================================================== */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Select Resume Version
            </h3>
          </div>
          <button
            type="button"
            onClick={onNavigateToResumeBuilder}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Customize in Builder</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {resumeVersions.map((ver) => {
            const isSelected = ver.id === selectedVersionId
            return (
              <div
                key={ver.id}
                onClick={() => onSelectResumeVersion(ver.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-50/40 border-indigo-500 shadow-2xs ring-1 ring-indigo-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 truncate mr-1">
                      {ver.name}
                    </span>
                    {isSelected && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-600 text-white flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Target: {ver.targetRole} • {ver.lastModified}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Template: {ver.templateId || 'Modern'}</span>
                  <span className="font-semibold text-indigo-700">
                    {isSelected ? 'Selected' : 'Use This Resume'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ========================================================
          3. AI COVER LETTER SECTION
      ======================================================== */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              AI Tailored Cover Letter
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopyCoverLetter}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copiedRecently ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400" />
              )}
              <span>{copiedRecently ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEditingCoverLetter(!isEditingCoverLetter)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3 h-3 text-slate-400" />
              <span>{isEditingCoverLetter ? 'Done Editing' : 'Edit'}</span>
            </button>

            <button
              type="button"
              onClick={onRegenerateCoverLetter}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {/* Why this is personalized callout */}
        <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 space-y-1.5">
          <span className="text-[11px] font-bold text-purple-950 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-600" />
            <span>Why this cover letter is personalized to {job.company}:</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {personalizationReasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                <CheckCircle2 className="w-3 h-3 text-purple-600 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cover Letter Content / Textarea */}
        {isEditingCoverLetter ? (
          <textarea
            rows={12}
            value={coverLetter}
            onChange={(e) => onChangeCoverLetter(e.target.value)}
            className="w-full p-4 text-xs font-sans leading-relaxed text-slate-900 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 shadow-xs"
          />
        ) : (
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 text-xs font-sans leading-relaxed text-slate-800 whitespace-pre-line max-h-72 overflow-y-auto">
            {coverLetter}
          </div>
        )}
      </div>

      {/* ========================================================
          4. APPLICATION QUESTIONS SECTION
      ======================================================== */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Application Questions & Responses
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Grounded in verified profile</span>
        </div>

        <div className="space-y-3">
          {questions.map((q) => {
            const isEditing = editingQuestionId === q.id
            return (
              <div
                key={q.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-bold text-slate-900">{q.question}</p>
                  <button
                    type="button"
                    onClick={() => setEditingQuestionId(isEditing ? null : q.id)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer shrink-0"
                  >
                    {isEditing ? 'Done' : 'Edit Answer'}
                  </button>
                </div>

                {isEditing ? (
                  <textarea
                    rows={3}
                    value={q.suggestedAnswer}
                    onChange={(e) => onChangeQuestionAnswer(q.id, e.target.value)}
                    className="w-full p-2.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 font-sans"
                  />
                ) : (
                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200/80">
                    {q.suggestedAnswer}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Warning Banner */}
        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-2.5 text-[11px] text-amber-900">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Please review AI-suggested answers to ensure they accurately reflect your individual style
            before approving.
          </span>
        </div>
      </div>

      {/* ========================================================
          5. FOOTER WORKFLOW ACTIONS
      ======================================================== */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500 text-center sm:text-left">
          <span>Targeting: </span>
          <strong className="text-slate-900">{job.title}</strong> at{' '}
          <strong className="text-slate-900">{job.company}</strong> using{' '}
          <strong className="text-indigo-600">{activeVersion.name}</strong>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={onBackToQueue}
            className="flex-1 sm:flex-initial text-xs"
          >
            Back to Queue
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onProceedToReview}
            rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
            className="flex-1 sm:flex-initial text-xs font-semibold shadow-xs"
          >
            Review & Approve Application
          </Button>
        </div>
      </div>
    </div>
  )
}
