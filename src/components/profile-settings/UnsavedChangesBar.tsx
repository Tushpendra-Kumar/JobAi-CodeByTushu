import React from 'react'
import { Button } from '@/components/ui/Button'
import { AlertCircle, Save } from 'lucide-react'

interface UnsavedChangesBarProps {
  isVisible: boolean
  isSaving: boolean
  onSave: () => void
  onDiscard: () => void
}

export const UnsavedChangesBar: React.FC<UnsavedChangesBarProps> = ({
  isVisible,
  isSaving,
  onSave,
  onDiscard,
}) => {
  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-8 sm:left-auto z-40 animate-slideUp">
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-4 max-w-xl">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Unsaved Settings Changes</div>
            <div className="text-[11px] text-slate-400 leading-tight">
              You have modified your profile preferences. Save now to apply to AI matching.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDiscard}
            disabled={isSaving}
            className="text-xs text-slate-300 hover:text-white hover:bg-slate-800 py-1.5 px-3 h-9"
          >
            Discard
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onSave}
            disabled={isSaving}
            isLoading={isSaving}
            leftIcon={<Save className="w-3.5 h-3.5" />}
            className="text-xs py-1.5 px-4 h-9 shadow-md"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
