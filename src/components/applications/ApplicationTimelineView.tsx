import React from 'react'
import {
  Bookmark,
  FileEdit,
  Send,
  Eye,
  Video,
  Award,
  XCircle,
  Calendar,
} from 'lucide-react'
import type { ApplicationTimelineEvent } from '@/services/applicationTrackingService'
import { normalizeStatus } from '@/services/applicationTrackingService'

interface ApplicationTimelineViewProps {
  timeline?: ApplicationTimelineEvent[]
}

export const ApplicationTimelineView: React.FC<ApplicationTimelineViewProps> = ({
  timeline = [],
}) => {
  if (timeline.length === 0) {
    return (
      <div className="py-6 text-center text-xs text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
        No timeline events recorded yet. Updates will appear automatically as status changes.
      </div>
    )
  }

  const getEventIcon = (status: string) => {
    const norm = normalizeStatus(status as any)
    switch (norm) {
      case 'Saved':
        return <Bookmark className="w-3.5 h-3.5 text-slate-500" />
      case 'Preparing':
        return <FileEdit className="w-3.5 h-3.5 text-amber-500" />
      case 'Applied':
        return <Send className="w-3.5 h-3.5 text-blue-500" />
      case 'Screening':
        return <Eye className="w-3.5 h-3.5 text-purple-500" />
      case 'Interview':
        return <Video className="w-3.5 h-3.5 text-emerald-500" />
      case 'Offer':
        return <Award className="w-3.5 h-3.5 text-teal-600" />
      case 'Rejected':
        return <XCircle className="w-3.5 h-3.5 text-rose-500" />
      default:
        return <Calendar className="w-3.5 h-3.5 text-indigo-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {timeline.map((event) => (
          <div key={event.id} className="relative group">
            {/* Timeline Dot with Icon */}
            <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white border border-slate-300 shadow-2xs flex items-center justify-center">
              {getEventIcon(event.status)}
            </div>

            {/* Event Content */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800">
                  {event.title}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {event.date}
                </span>
              </div>

              {event.note && (
                <p className="text-xs text-slate-600 leading-relaxed">
                  {event.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
