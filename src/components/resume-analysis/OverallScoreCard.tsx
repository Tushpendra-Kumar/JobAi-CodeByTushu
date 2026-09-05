import React, { useState } from 'react'
import { Award, Info, Sparkles, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export interface OverallScoreCardProps {
  score?: number
  label?: string
  message?: string
  confidenceScore?: number
  confidenceNote?: string
}

export const OverallScoreCard: React.FC<OverallScoreCardProps> = ({
  score = 85,
  label = 'Good Resume',
  message = 'Your resume has a strong foundation, but several improvements could increase its effectiveness.',
  confidenceScore = 94,
  confidenceNote = 'JobAI had enough structured resume information to provide a useful analysis.',
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  // SVG Circular Gauge calculations
  const radius = 64
  const strokeWidth = 10
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <Card className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-indigo-50/20 to-violet-50/30 border border-indigo-100/80 shadow-md shadow-indigo-500/5 relative overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
        {/* Left Side: Circular Score Visualizer */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left shrink-0">
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            >
              {/* Background Track */}
              <circle
                cx={radius}
                cy={radius}
                r={normalizedRadius}
                fill="transparent"
                stroke="#E2E8F0"
                strokeWidth={strokeWidth}
                className="opacity-70"
              />
              {/* Foreground Animated Stroke */}
              <circle
                cx={radius}
                cy={radius}
                r={normalizedRadius}
                fill="transparent"
                stroke="url(#overallScoreGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="overallScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Score Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {score}
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          {/* Score Assessment Information */}
          <div className="space-y-2 max-w-md">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-bold text-xs shadow-xs tracking-wide">
                {label}
              </span>
              <Badge variant="indigo" size="sm" dot>
                Top 20% of Entry–Mid Profiles
              </Badge>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Overall Resume Score
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Right Side: Key High-Level Benchmarks & Confidence Badge */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3 w-full md:w-auto">
          {/* AI Analysis Confidence Card */}
          <div className="relative p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-1.5 text-left min-w-[240px]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-600" />
                Analysis Confidence
              </span>

              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={() => setShowTooltip(!showTooltip)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Confidence Info"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>

                {/* Info Tooltip */}
                {showTooltip && (
                  <div className="absolute right-0 bottom-full mb-2 w-64 p-2.5 rounded-xl bg-slate-900 text-white text-[11px] leading-snug shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                    Confidence reflects the completeness and quality of the information available to the analysis engine. It is not a guarantee of resume performance.
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">
                {confidenceScore}%
              </span>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                High Coverage
              </span>
            </div>

            <p className="text-[11px] text-slate-500 line-clamp-2">
              {confidenceNote}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center justify-between sm:justify-end gap-3 px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs text-slate-600 w-full sm:w-auto">
            <span className="flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              ATS Tested:
            </span>
            <span className="font-bold text-slate-900">90% Compatibility</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
