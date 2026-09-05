import React from 'react'
import { Card } from '@/components/ui/Card'

export const JobDetailsSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse text-left space-y-8">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-64 bg-slate-200 rounded-md" />

      {/* Header Card Skeleton */}
      <Card className="p-8 border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-200" />
            <div className="space-y-2">
              <div className="h-7 w-64 bg-slate-200 rounded-md" />
              <div className="h-4 w-40 bg-slate-100 rounded-md" />
            </div>
          </div>
          <div className="h-10 w-32 bg-slate-200 rounded-xl" />
        </div>
      </Card>

      {/* 2-Column Body Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Main Content */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-7 space-y-4">
            <div className="h-6 w-48 bg-slate-200 rounded-md" />
            <div className="h-4 w-full bg-slate-100 rounded-md" />
            <div className="h-4 w-3/4 bg-slate-100 rounded-md" />
          </Card>

          <Card className="p-7 space-y-4">
            <div className="h-6 w-48 bg-slate-200 rounded-md" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-100 rounded-md" />
              <div className="h-4 w-full bg-slate-100 rounded-md" />
              <div className="h-4 w-2/3 bg-slate-100 rounded-md" />
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="h-5 w-32 bg-slate-200 rounded-md" />
            <div className="h-12 w-24 bg-slate-200 rounded-md" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-100 rounded-md" />
              <div className="h-3 w-full bg-slate-100 rounded-md" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
