import React from 'react'

export interface MobileStickyActionProps {
  children: React.ReactNode
  className?: string
}

export const MobileStickyAction: React.FC<MobileStickyActionProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`md:hidden fixed bottom-16 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg transition-all ${className}`}
    >
      <div className="max-w-md mx-auto">{children}</div>
    </div>
  )
}
