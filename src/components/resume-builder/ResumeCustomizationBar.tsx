import React from 'react'
import { Layout, Type, AlignJustify } from 'lucide-react'
import type { TemplateId } from '@/services/resumeBuilderAIService'

export type ResumeFontSize = 'sm' | 'md' | 'lg'
export type ResumeSpacing = 'compact' | 'normal' | 'relaxed'

interface ResumeCustomizationBarProps {
  selectedTemplate: TemplateId
  onSelectTemplate: (template: TemplateId) => void
  fontSize: ResumeFontSize
  onChangeFontSize: (size: ResumeFontSize) => void
  spacing: ResumeSpacing
  onChangeSpacing: (spacing: ResumeSpacing) => void
  isHighDensity: boolean
  onToggleDensity: () => void
}

export const ResumeCustomizationBar: React.FC<ResumeCustomizationBarProps> = ({
  selectedTemplate,
  onSelectTemplate,
  fontSize,
  onChangeFontSize,
  spacing,
  onChangeSpacing,
  isHighDensity,
  onToggleDensity,
}) => {
  const templates: { id: TemplateId; name: string; tag: string }[] = [
    { id: 'modern', name: 'Modern ATS', tag: 'Recommended' },
    { id: 'classic', name: 'Classic ATS', tag: 'Traditional' },
    { id: 'minimal', name: 'Minimal ATS', tag: 'Max Density' },
  ]

  return (
    <div className="no-print bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Template Selector Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-slate-400 mr-1 hidden sm:flex">
            <Layout className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-semibold text-slate-700">Template:</span>
          </div>

          <div className="inline-flex p-1 bg-slate-100 rounded-xl">
            {templates.map((tmpl) => {
              const isSel = selectedTemplate === tmpl.id
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => onSelectTemplate(tmpl.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSel
                      ? 'bg-white text-slate-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{tmpl.name}</span>
                  {tmpl.tag && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                        isSel ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-200/80 text-slate-500'
                      }`}
                    >
                      {tmpl.tag}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Layout & Typography Controls */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Font Size */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/80 rounded-xl px-2 py-1">
            <Type className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] font-medium text-slate-500 mr-1">Size:</span>
            {(['sm', 'md', 'lg'] as const).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => onChangeFontSize(sz)}
                className={`px-2 py-0.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                  fontSize === sz
                    ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sz === 'sm' ? '9pt' : sz === 'md' ? '10pt' : '11pt'}
              </button>
            ))}
          </div>

          {/* Line Spacing */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/80 rounded-xl px-2 py-1">
            <AlignJustify className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] font-medium text-slate-500 mr-1">Spacing:</span>
            {(['compact', 'normal', 'relaxed'] as const).map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => onChangeSpacing(sp)}
                className={`px-2 py-0.5 rounded text-xs font-medium transition-colors cursor-pointer capitalize ${
                  spacing === sp
                    ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>

          {/* High Density Toggle */}
          <button
            type="button"
            onClick={onToggleDensity}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
              isHighDensity
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>High Density</span>
            <span
              className={`w-2 h-2 rounded-full ${
                isHighDensity ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
