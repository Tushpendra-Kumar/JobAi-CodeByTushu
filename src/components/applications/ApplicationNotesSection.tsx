import React, { useState } from 'react'
import { Plus, Trash2, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { ApplicationNote } from '@/services/applicationTrackingService'

interface ApplicationNotesSectionProps {
  appId: string
  notesList?: ApplicationNote[]
  legacyNotes?: string
  onAddNote: (text: string) => void
  onDeleteNote: (noteId: string) => void
}

export const ApplicationNotesSection: React.FC<ApplicationNotesSectionProps> = ({
  notesList = [],
  legacyNotes,
  onAddNote,
  onDeleteNote,
}) => {
  const [newNoteText, setNewNoteText] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNoteText.trim()) return
    onAddNote(newNoteText.trim())
    setNewNoteText('')
    setIsAdding(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-slate-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Private Notes ({notesList.length + (legacyNotes ? 1 : 0)})
          </h4>
        </div>

        {!isAdding && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="text-xs text-indigo-600 hover:text-indigo-800 p-0 h-auto font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Note</span>
          </Button>
        )}
      </div>

      {/* Add Note Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-indigo-50/40 border border-indigo-100 rounded-xl p-3 space-y-2">
          <textarea
            placeholder="Type private notes (e.g. interviewer feedback, salary details, technical questions)..."
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            rows={2}
            className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none text-slate-800 placeholder:text-slate-400"
            autoFocus
          />
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                setIsAdding(false)
                setNewNoteText('')
              }}
              className="text-xs h-7 px-2.5"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              disabled={!newNoteText.trim()}
              className="text-xs h-7 px-3"
            >
              Save Note
            </Button>
          </div>
        </form>
      )}

      {/* Legacy initial note if available and notesList empty */}
      {legacyNotes && notesList.length === 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 leading-relaxed">
          <span className="font-semibold text-slate-800">Initial submission note: </span>
          {legacyNotes}
        </div>
      )}

      {/* Notes List */}
      {notesList.length > 0 ? (
        <div className="space-y-2">
          {notesList.map((note) => (
            <div
              key={note.id}
              className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 flex items-start justify-between gap-3 group hover:border-slate-300 transition-colors"
            >
              <div className="space-y-1 min-w-0">
                <p className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {note.text}
                </p>
                <div className="text-[10px] text-slate-400 font-medium">
                  {note.createdAt}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDeleteNote(note.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-1"
                title="Delete note"
                aria-label="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        !legacyNotes && !isAdding && (
          <div className="py-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
            No private notes recorded yet.
          </div>
        )
      )}
    </div>
  )
}
