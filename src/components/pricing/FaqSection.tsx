import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PRICING_FAQS } from '@/config/pricingConfig'
import { Badge } from '@/components/ui/Badge'

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <div className="mt-20 border-t border-slate-200/80 pt-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="indigo" size="sm" className="mb-3 uppercase tracking-wider font-semibold">
          Common Inquiries
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Clear, straightforward answers about billing, AI capabilities, and data security.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3.5">
        {PRICING_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-base">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
