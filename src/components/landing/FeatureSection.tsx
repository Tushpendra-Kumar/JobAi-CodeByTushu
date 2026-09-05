import React from 'react'
import { Target, FileSearch, Sparkles, LineChart, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface FeatureSectionProps {
  onSelectFeature?: (featureKey: string) => void
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'matching',
      icon: <Target className="w-6 h-6 text-indigo-600" />,
      title: 'AI Job Matching',
      description:
        'Find opportunities that match your skills, experience and career goals.',
      badge: 'Vector Semantic Match',
      benefits: [
        'Multi-factor role compatibility score',
        'Deep skill overlap analysis',
        'Salary & compensation transparency',
      ],
      previewStat: '95% Match Benchmark',
    },
    {
      id: 'resume',
      icon: <FileSearch className="w-6 h-6 text-violet-600" />,
      title: 'AI Resume Analysis',
      description:
        'Analyze your resume against job requirements and identify improvement opportunities.',
      badge: 'ATS Intelligence',
      benefits: [
        'Instant ATS parseability score (0-100)',
        'Missing keyword & syntax detection',
        'Action-oriented bullet recommendations',
      ],
      previewStat: 'Score 92 Optimized',
    },
    {
      id: 'automation',
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      title: 'Automated Applications',
      description:
        'Prepare personalized application content and organize your application workflow.',
      badge: 'Agent Assistant',
      benefits: [
        'Contextual cover letter generator',
        'Role-targeted resume variants',
        'Human-in-the-loop review queue',
      ],
      previewStat: '3x Faster Preparation',
    },
    {
      id: 'intelligence',
      icon: <LineChart className="w-6 h-6 text-blue-600" />,
      title: 'Career Intelligence',
      description:
        'Understand your application performance, skill gaps and career opportunities.',
      badge: 'Market Analytics',
      benefits: [
        'Application status telemetry & conversion',
        'Emerging tech stack demand trends',
        'Strategic career trajectory roadmap',
      ],
      previewStat: '+35% Response Rate',
    },
  ]

  return (
    <section id="features-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="indigo" size="md">
            Comprehensive Platform Suite
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Build a Better Career
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminate hours of manual paperwork and mismatched applications with our integrated AI toolset.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat) => (
            <Card
              key={feat.id}
              hoverEffect
              className="p-7 sm:p-8 flex flex-col justify-between border-slate-200/90 hover:border-indigo-300"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50/70 border border-indigo-100">
                    {feat.icon}
                  </div>
                  <Badge variant="indigo" size="sm">
                    {feat.badge}
                  </Badge>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {feat.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-2.5 mb-6 border-t border-slate-100 pt-5 text-xs text-slate-600">
                  {feat.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                  {feat.previewStat}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectFeature && onSelectFeature(feat.id)}
                  className="font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group/btn cursor-pointer"
                >
                  <span>Learn workflow</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
