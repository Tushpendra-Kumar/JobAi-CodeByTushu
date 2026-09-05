import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { AlertTriangle, Trash2 } from 'lucide-react'

interface DeleteAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmDelete: () => void
  userEmail: string
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
  userEmail,
}) => {
  const [confirmInput, setConfirmInput] = useState('')

  const isConfirmed = confirmInput.trim().toLowerCase() === 'delete my account'

  const handleConfirm = () => {
    if (!isConfirmed) return
    onConfirmDelete()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reset & Delete Demo Profile"
      description={`This action will clear all local demo profile records and stored preferences for ${userEmail || 'this demo session'}.`}
      maxWidth="md"
    >
      <div className="space-y-4 pt-2">
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Irreversible Local Demo Reset</div>
            <p className="leading-relaxed">
              All stored resume drafts, tailored cover letters, application tracking boards, and custom AI priority weights will be cleared from this browser session.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            To confirm, type <span className="font-mono text-rose-600 font-extrabold">delete my account</span> below:
          </label>
          <Input
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            placeholder="delete my account"
            className="text-xs"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={!isConfirmed}
            onClick={handleConfirm}
            className="text-xs bg-rose-600 hover:bg-rose-700 text-white"
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Reset Demo Profile
          </Button>
        </div>
      </div>
    </Modal>
  )
}
