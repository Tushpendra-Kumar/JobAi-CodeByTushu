import React, { useState, useEffect } from 'react'
import { WifiOff, RefreshCw } from 'lucide-react'

export const NetworkStatusIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div
      className="fixed top-14 left-4 right-4 z-50 p-3 bg-amber-900 text-white rounded-2xl shadow-xl flex items-center justify-between gap-3 text-xs animate-fadeIn"
      role="alert"
    >
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 text-amber-300 shrink-0" />
        <span>You're currently offline. Local demo features remain accessible.</span>
      </div>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="p-1 text-white/80 hover:text-white cursor-pointer"
        aria-label="Retry"
      >
        <RefreshCw className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
