import React from 'react'
import { Sparkles, Check, X } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface BeforeAfterDiffModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: () => void
  actionName: string
  originalContent: string
  improvedContent: string
}

export const BeforeAfterDiffModal: React.FC<BeforeAfterDiffModalProps> = ({
  isOpen,
  onClose,
  onApply,
  actionName,
  originalContent,
  improvedContent,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Improvement Diff Preview"
      description={`Review the suggested edits from the "${actionName}" enhancement before updating your letter.`}
      maxWidth="xl"
    >
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <Badge variant="indigo" size="sm">
              Action: {actionName}
            </Badge>
            <span className="text-slate-500">Compare side by side</span>
          </div>
          <span className="text-[11px] text-slate-400">
            No changes are applied until you click Accept
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[55vh] overflow-y-auto pr-1">
          {/* Original */}
          <div className="space-y-1.5 flex flex-col">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 px-1">
              <span>Current Draft</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {originalContent.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <div className="flex-1 p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-line select-text">
              {originalContent}
            </div>
          </div>

          {/* Improved */}
          <div className="space-y-1.5 flex flex-col">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-700 px-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                AI Enhanced Draft
              </span>
              <span className="text-[10px] text-indigo-500 font-normal">
                {improvedContent.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <div className="flex-1 p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/30 text-xs text-slate-900 leading-relaxed font-sans whitespace-pre-line select-text">
              {improvedContent}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="ghost" onClick={onClose} leftIcon={<X className="w-4 h-4" />}>
            Discard AI Edits
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onApply()
              onClose()
            }}
            leftIcon={<Check className="w-4 h-4" />}
          >
            Accept & Apply AI Changes
          </Button>
        </div>
      </div>
    </Modal>
  )
}
