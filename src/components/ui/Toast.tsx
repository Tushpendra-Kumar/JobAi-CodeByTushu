import React, { useEffect } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ToastProps {
  message: string
  type?: 'success' | 'info' | 'warning'
  duration?: number
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 4000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
  }

  const borderStyles = {
    success: 'border-emerald-200 bg-emerald-50/90 text-emerald-900',
    info: 'border-indigo-200 bg-indigo-50/90 text-indigo-950',
    warning: 'border-amber-200 bg-amber-50/90 text-amber-950',
  }

  return (
    <div
      role="status"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5',
        borderStyles[type]
      )}
    >
      {icons[type]}
      <p className="text-xs font-medium pr-2">{message}</p>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
