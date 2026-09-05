import React from 'react'
import {
  ShieldCheck,
  CheckCircle2,
  Sliders,
  FileText,
  TrendingUp,
  Lock,
} from 'lucide-react'
import { TRUST_PILLARS } from '@/config/pricingConfig'
import { Badge } from '@/components/ui/Badge'

export const TrustSection: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    ShieldCheck,
    CheckCircle2,
    Sliders,
    FileText,
    TrendingUp,
    Lock,
  }

  return (
    <div className="mt-20 border-t border-slate-200/80 pt-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="emerald" size="sm" className="mb-3 uppercase tracking-wider font-semibold">
          Platform Integrity
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Built around user control
        </h2>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          AI automation is only powerful when you are in complete command of your credentials,
          decisions, and applications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRUST_PILLARS.map((pillar, idx) => {
          const Icon = iconMap[pillar.icon] || ShieldCheck
          return (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
