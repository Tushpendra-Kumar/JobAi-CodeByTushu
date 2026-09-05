import React from 'react'
import { Briefcase, Building2, Users, Target, Info } from 'lucide-react'

export const ValueMetricsSection: React.FC = () => {
  const metrics = [
    {
      value: '10K+',
      label: 'Jobs Indexed',
      subtext: 'Curated technical & remote roles',
      icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
    },
    {
      value: '5K+',
      label: 'Companies',
      subtext: 'From seed-stage to hyper-growth tech',
      icon: <Building2 className="w-5 h-5 text-violet-600" />,
    },
    {
      value: '50K+',
      label: 'Job Seekers',
      subtext: 'Engineers accelerating their pipeline',
      icon: <Users className="w-5 h-5 text-blue-600" />,
    },
    {
      value: '95%',
      label: 'AI Match Accuracy',
      subtext: 'Vectorized profile-to-spec alignment',
      icon: <Target className="w-5 h-5 text-emerald-600" />,
    },
  ]

  return (
    <section className="py-12 bg-slate-50/50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-indigo-50/60 transition-colors">
                  {metric.icon}
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
                {metric.value}
              </div>
              <div className="text-sm font-bold text-slate-700 mt-1">
                {metric.label}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {metric.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Demo Disclaimer */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Demonstration platform metrics for user interface simulation • Powered by CodeByTushu
          </span>
        </div>
      </div>
    </section>
  )
}
