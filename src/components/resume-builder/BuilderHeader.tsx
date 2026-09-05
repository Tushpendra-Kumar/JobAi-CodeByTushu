import React, { useState, useRef, useEffect } from 'react'
import { Sparkles, Printer, Download, Copy, Save, ChevronDown, Check, FileText, Plus, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { ResumeDraftVersion } from '@/services/resumeVersionService'

interface BuilderHeaderProps {
  versions: ResumeDraftVersion[]
  activeVersionId: string
  onSelectVersion: (versionId: string) => void
  onCreateNewVersion: () => void
  onSaveDraft: () => void
  onGenerateResume: () => void
  onPrint: () => void
  onDownloadTxt: () => void
  onCopyTxt: () => void
  isGenerating?: boolean
}

export const BuilderHeader: React.FC<BuilderHeaderProps> = ({
  versions,
  activeVersionId,
  onSelectVersion,
  onCreateNewVersion,
  onSaveDraft,
  onGenerateResume,
  onPrint,
  onDownloadTxt,
  onCopyTxt,
  isGenerating = false,
}) => {
  const [exportMenuOpen, setExportMenuOpen] = useState(false)
  const [versionMenuOpen, setVersionMenuOpen] = useState(false)
  const [copiedRecently, setCopiedRecently] = useState(false)

  const exportRef = useRef<HTMLDivElement>(null)
  const versionRef = useRef<HTMLDivElement>(null)

  const activeVersion = versions.find((v) => v.id === activeVersionId) || versions[0]

  // Close menus on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportMenuOpen(false)
      }
      if (versionRef.current && !versionRef.current.contains(e.target as Node)) {
        setVersionMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const handleCopyClick = () => {
    onCopyTxt()
    setCopiedRecently(true)
    setTimeout(() => setCopiedRecently(false), 2000)
    setExportMenuOpen(false)
  }

  return (
    <header className="no-print bg-white border-b border-slate-200/80 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Title & Status Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  AI Resume Builder
                </h1>
                <Badge variant="indigo" size="sm" dot>
                  AI-Powered
                </Badge>
                <Badge variant="emerald" size="sm">
                  ATS Verified
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 inline" />
                <span>Tailored for applicant tracking systems with verified candidate credentials</span>
              </p>
            </div>
          </div>

          {/* Right Action Bar: Version Dropdown, Save, Export, Generate */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Version Selector Dropdown */}
            <div className="relative" ref={versionRef}>
              <button
                type="button"
                onClick={() => setVersionMenuOpen(!versionMenuOpen)}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                title="Switch or create resume drafts"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span className="max-w-[130px] sm:max-w-[160px] truncate font-semibold">
                  {activeVersion?.name || 'Master Draft'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {versionMenuOpen && (
                <div className="absolute left-0 lg:left-auto lg:right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1.5 animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Targeted Resume Drafts
                    </p>
                  </div>

                  <div className="max-h-56 overflow-y-auto py-1">
                    {versions.map((ver) => {
                      const isSel = ver.id === activeVersionId
                      return (
                        <button
                          key={ver.id}
                          type="button"
                          onClick={() => {
                            onSelectVersion(ver.id)
                            setVersionMenuOpen(false)
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                            isSel
                              ? 'bg-indigo-50/80 text-indigo-900 font-semibold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="truncate pr-2">
                            <p className="truncate">{ver.name}</p>
                            <p className="text-[10px] text-slate-400 font-normal">
                              {ver.targetRole} • {ver.lastModified}
                            </p>
                          </div>
                          {isSel && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                        </button>
                      )
                    })}
                  </div>

                  <div className="pt-1.5 border-t border-slate-100 px-2">
                    <button
                      type="button"
                      onClick={() => {
                        onCreateNewVersion()
                        setVersionMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create New Draft Version</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Save Draft */}
            <Button
              variant="secondary"
              size="sm"
              onClick={onSaveDraft}
              leftIcon={<Save className="w-3.5 h-3.5 text-slate-500" />}
              className="text-xs font-medium"
            >
              Save Draft
            </Button>

            {/* Export Menu (Print PDF / Download TXT / Copy) */}
            <div className="relative" ref={exportRef}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExportMenuOpen(!exportMenuOpen)}
                rightIcon={<ChevronDown className="w-3.5 h-3.5 text-indigo-500" />}
                className="text-xs font-medium"
              >
                Export
              </Button>

              {exportMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1.5 animate-in fade-in-50 zoom-in-95">
                  <button
                    type="button"
                    onClick={() => {
                      setExportMenuOpen(false)
                      onPrint()
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-indigo-600" />
                    <div>
                      <p className="font-semibold">Print / Save as PDF</p>
                      <p className="text-[10px] text-slate-400">Pristine A4 ATS format</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setExportMenuOpen(false)
                      onDownloadTxt()
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <div>
                      <p className="font-semibold">Download Plain Text (.txt)</p>
                      <p className="text-[10px] text-slate-400">Universal ATS parseable</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyClick}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    {copiedRecently ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <div>
                      <p className="font-semibold">
                        {copiedRecently ? 'Copied to Clipboard!' : 'Copy Plain Text'}
                      </p>
                      <p className="text-[10px] text-slate-400">For job portal paste boxes</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Primary Generate Optimized Resume CTA */}
            <Button
              variant="primary"
              size="sm"
              onClick={onGenerateResume}
              isLoading={isGenerating}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
              className="text-xs font-semibold shadow-xs"
            >
              Generate Resume
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
