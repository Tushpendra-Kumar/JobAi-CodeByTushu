import React from 'react'
import { Card } from '@/components/ui/Card'

export const JobSkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6 border-slate-200/80 animate-pulse text-left space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-slate-200 shrink-0" />
              <div className="space-y-2">
                <div className="h-5 w-48 bg-slate-200 rounded-md" />
                <div className="h-3 w-32 bg-slate-100 rounded-md" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-100" />
              <div className="w-16 h-8 rounded-xl bg-slate-200" />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <div className="h-6 w-20 bg-slate-100 rounded-md" />
            <div className="h-6 w-20 bg-slate-100 rounded-md" />
            <div className="h-6 w-24 bg-slate-100 rounded-md" />
          </div>

          <div className="h-10 w-full bg-slate-50 rounded-xl border border-slate-100" />

          <div className="flex items-center gap-2">
            <div className="h-5 w-16 bg-slate-100 rounded-md" />
            <div className="h-5 w-16 bg-slate-100 rounded-md" />
            <div className="h-5 w-20 bg-slate-100 rounded-md" />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="h-4 w-64 bg-slate-100 rounded-md" />
            <div className="h-8 w-24 bg-slate-200 rounded-xl" />
          </div>
        </Card>
      ))}
    </div>
  )
}
