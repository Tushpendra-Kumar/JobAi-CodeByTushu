import React from 'react'
import { FolderOpen, Copy, Trash2, ExternalLink, Calendar, Building2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { SavedCoverLetter } from '@/services/coverLetterService'

interface SavedCoverLettersModalProps {
  isOpen: boolean
  onClose: () => void
  savedLetters: SavedCoverLetter[]
  onSelectLetter: (letter: SavedCoverLetter) => void
  onDuplicateLetter: (id: string) => void
  onDeleteLetter: (id: string) => void
}

export const SavedCoverLettersModal: React.FC<SavedCoverLettersModalProps> = ({
  isOpen,
  onClose,
  savedLetters,
  onSelectLetter,
  onDuplicateLetter,
  onDeleteLetter,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Saved Cover Letters"
      description="Access and manage your tailored cover letters saved in local storage."
      maxWidth="lg"
    >
      <div className="space-y-4 pt-2">
        {savedLetters.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div className="text-sm font-semibold text-slate-700">No saved cover letters yet</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Generate or customize a cover letter, then click "Save Draft" to preserve it here.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
            {savedLetters.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs transition-all space-y-2.5 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.jobTitle}
                      </span>
                      <Badge
                        variant={item.qualityScore.overallScore >= 85 ? 'emerald' : 'indigo'}
                        size="sm"
                      >
                        {item.qualityScore.overallScore}/100 Score
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {item.company}
                      </span>
                      <span>•</span>
                      <span>Source: {item.resumeVersionName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {item.updatedAt}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      title="Duplicate Letter"
                      onClick={() => onDuplicateLetter(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      title="Delete Letter"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Delete cover letter for "${item.jobTitle} at ${item.company}"?`
                          )
                        ) {
                          onDeleteLetter(item.id)
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        onSelectLetter(item)
                        onClose()
                      }}
                      className="ml-1 text-xs"
                      rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                    >
                      Open
                    </Button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  {item.versions[0]?.content.slice(0, 160)}...
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}
