import React, { useState, useMemo } from 'react'
import type { ParsedResume } from '@/data/resumeData'
import { defaultParsedResume } from '@/data/resumeData'
import { DashboardSidebar } from '@/components/matching/DashboardSidebar'
import { BuilderHeader } from './BuilderHeader'
import { TargetRoleConfigCard } from './TargetRoleConfigCard'
import { AiOptimizationPanel } from './AiOptimizationPanel'
import { ResumeQualitySidebar } from './ResumeQualitySidebar'
import {
  ResumeCustomizationBar,
  type ResumeFontSize,
  type ResumeSpacing,
} from './ResumeCustomizationBar'
import { ResumeEditorAccordion } from './ResumeEditorAccordion'
import { LiveResumePreview } from './LiveResumePreview'
import { AiSuggestionModal } from './AiSuggestionModal'
import { GeneratingResumeModal } from './GeneratingResumeModal'
import { BuilderEmptyState } from './BuilderStates'
import {
  calculateBuilderQuality,
  getKeywordSuggestions,
  generateSummarySuggestion,
  generateBulletSuggestion,
  generateProjectSuggestion,
  runTruthfulGeneration,
  type BuilderTargetConfig,
  type BuilderOptimizationToggles,
  type AiImprovementSuggestion,
  type TemplateId,
} from '@/services/resumeBuilderAIService'
import {
  triggerResumePrint,
  downloadResumePlainText,
  copyResumePlainText,
} from '@/services/resumeExportService'
import {
  getSavedResumeVersions,
  saveResumeVersions,
  createDraftVersion,
  type ResumeDraftVersion,
} from '@/services/resumeVersionService'
import { Edit3, Eye, Sparkles } from 'lucide-react'

export interface ResumeBuilderScreenProps {
  parsedResume: ParsedResume | null
  onParsedResumeChange?: (updated: ParsedResume) => void
  onNavigateToJobs: () => void
  onNavigateToResume: () => void
  onNavigateToAnalysis: () => void
  onNavigateToMatching?: () => void
  onNavigateToAutoApply?: () => void
  onNavigateToApplications?: () => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export const ResumeBuilderScreen: React.FC<ResumeBuilderScreenProps> = ({
  parsedResume,
  onParsedResumeChange,
  onNavigateToJobs,
  onNavigateToResume,
  onNavigateToAnalysis,
  onNavigateToMatching,
  onNavigateToAutoApply,
  onNavigateToApplications,
  onToast,
}) => {
  // Current active working resume state
  const [resumeData, setResumeData] = useState<ParsedResume>(() => {
    return parsedResume || defaultParsedResume
  })

  // Target role configuration
  const [targetConfig, setTargetConfig] = useState<BuilderTargetConfig>({
    targetRole: 'Software Developer',
    experienceLevel: 'Entry Level (0-2 yrs)',
    location: 'Noida, India / Remote Flexible',
    jobDescription: '',
    documentLength: '1-page',
  })

  // AI optimization toggles
  const [toggles, setToggles] = useState<BuilderOptimizationToggles>({
    actionVerbs: true,
    quantifyMetrics: true,
    keywordAlignment: true,
    conciseBullets: true,
    professionalTone: true,
  })

  // Template & customization settings
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('modern')
  const [fontSize, setFontSize] = useState<ResumeFontSize>('md')
  const [spacing, setSpacing] = useState<ResumeSpacing>('normal')
  const [isHighDensity, setIsHighDensity] = useState(false)

  // Mobile tabs: 'editor' vs 'preview'
  const [activeMobileTab, setActiveMobileTab] = useState<'editor' | 'preview'>('editor')

  // Version management
  const [versions, setVersions] = useState<ResumeDraftVersion[]>(() => {
    return getSavedResumeVersions(parsedResume || defaultParsedResume)
  })
  const [activeVersionId, setActiveVersionId] = useState<string>(() => {
    const list = getSavedResumeVersions(parsedResume || defaultParsedResume)
    return list[0]?.id || 'draft-master'
  })

  // Suggestion Modal State
  const [activeSuggestion, setActiveSuggestion] = useState<AiImprovementSuggestion | null>(null)
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false)
  const [pendingSuggestionTarget, setPendingSuggestionTarget] = useState<{
    type: 'summary' | 'bullet' | 'project'
    expIndex?: number
    bulletIndex?: number
    projIndex?: number
  } | null>(null)

  // 5-Step Generation Modal State
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStepIndex, setGenerationStepIndex] = useState(0)

  const GENERATION_STEPS = [
    'Reading verified resume profile & career history...',
    'Analyzing target role criteria & keyword benchmarks...',
    'Harmonizing technical skills taxonomy & hierarchy...',
    'Polishing experience action verbs and impact phrasing...',
    'Compiling ATS-compliant document layout...',
  ]

  // Reactive Quality Metrics
  const qualityMetrics = useMemo(() => {
    return calculateBuilderQuality(resumeData, targetConfig, toggles)
  }, [resumeData, targetConfig, toggles])

  // Reactive Keyword Suggestions
  const keywordSuggestions = useMemo(() => {
    return getKeywordSuggestions(resumeData, targetConfig.targetRole, targetConfig.jobDescription)
  }, [resumeData, targetConfig.targetRole, targetConfig.jobDescription])

  // Handle updates to resumeData
  const handleResumeChange = (updated: ParsedResume) => {
    setResumeData(updated)
    if (onParsedResumeChange) {
      onParsedResumeChange(updated)
    }
  }

  // --- Version Switching & Saving ---
  const handleSelectVersion = (versionId: string) => {
    const selected = versions.find((v) => v.id === versionId)
    if (selected) {
      setActiveVersionId(selected.id)
      setResumeData(JSON.parse(JSON.stringify(selected.resumeData)))
      setSelectedTemplate(selected.templateId || 'modern')
      if (selected.targetRole) {
        setTargetConfig((prev) => ({ ...prev, targetRole: selected.targetRole }))
      }
      onToast(`Switched to version: “${selected.name}”`, 'info')
    }
  }

  const handleCreateNewVersion = () => {
    const newName = `Draft ${versions.length + 1}: ${targetConfig.targetRole}`
    const newVer = createDraftVersion(newName, targetConfig.targetRole, resumeData, selectedTemplate)
    const updated = [newVer, ...versions]
    setVersions(updated)
    setActiveVersionId(newVer.id)
    saveResumeVersions(updated)
    onToast(`Created new draft: “${newName}”`, 'success')
  }

  const handleSaveDraft = () => {
    const updated = versions.map((v) => {
      if (v.id === activeVersionId) {
        return {
          ...v,
          resumeData: JSON.parse(JSON.stringify(resumeData)),
          targetRole: targetConfig.targetRole,
          templateId: selectedTemplate,
          lastModified: 'Just now',
        }
      }
      return v
    })
    setVersions(updated)
    saveResumeVersions(updated)
    onToast('Resume draft saved to your local workspace!', 'success')
  }

  // --- Export Actions ---
  const handlePrint = () => {
    triggerResumePrint()
  }

  const handleDownloadTxt = () => {
    downloadResumePlainText(
      resumeData,
      `${(resumeData.personalInfo?.name || 'Resume').replace(/\s+/g, '_')}_${targetConfig.targetRole.replace(/\s+/g, '_')}.txt`
    )
    onToast('Plain text ATS resume downloaded.', 'success')
  }

  const handleCopyTxt = async () => {
    const ok = await copyResumePlainText(resumeData)
    if (ok) {
      onToast('Plain text ATS resume copied to clipboard!', 'success')
    } else {
      onToast('Unable to copy text automatically. Try Print/Save as PDF.', 'warning')
    }
  }

  // --- 1-Click Add Suggested Skill ---
  const handleAddSuggestedSkill = (
    keyword: string,
    category: 'frontend' | 'backend' | 'database' | 'tools'
  ) => {
    const existing = resumeData.skills[category] || []
    if (existing.some((s) => s.name.toLowerCase() === keyword.toLowerCase())) {
      onToast(`“${keyword}” is already present in your skills.`, 'info')
      return
    }

    const updated = {
      ...resumeData,
      skills: {
        ...resumeData.skills,
        [category]: [...existing, { name: keyword, confidence: 'High confidence' as const }],
      },
    }
    handleResumeChange(updated)
    onToast(`Added “${keyword}” to ${category} skills (+2 pts ATS match).`, 'success')
  }

  // --- Individual AI Improvement Triggers ---
  const handleImproveSummary = () => {
    const skillsList = keywordSuggestions.filter((k) => k.matchedInResume).map((k) => k.keyword)
    const sugg = generateSummarySuggestion(
      resumeData.summary || '',
      targetConfig.targetRole,
      skillsList
    )
    setActiveSuggestion(sugg)
    setPendingSuggestionTarget({ type: 'summary' })
    setIsSuggestionModalOpen(true)
  }

  const handleImproveBullet = (
    bullet: string,
    role: string,
    company: string,
    expIndex: number,
    bulletIndex: number
  ) => {
    const sugg = generateBulletSuggestion(bullet, role, company)
    setActiveSuggestion(sugg)
    setPendingSuggestionTarget({ type: 'bullet', expIndex, bulletIndex })
    setIsSuggestionModalOpen(true)
  }

  const handleImproveProject = (
    desc: string,
    name: string,
    techs: string[],
    projIndex: number
  ) => {
    const sugg = generateProjectSuggestion(desc, name, techs)
    setActiveSuggestion(sugg)
    setPendingSuggestionTarget({ type: 'project', projIndex })
    setIsSuggestionModalOpen(true)
  }

  // Apply suggestion from modal
  const handleApplySuggestion = (suggestion: AiImprovementSuggestion) => {
    if (!pendingSuggestionTarget) return

    if (pendingSuggestionTarget.type === 'summary') {
      handleResumeChange({ ...resumeData, summary: suggestion.suggestedText })
      onToast('Summary updated with AI-optimized phrasing!', 'success')
    } else if (
      pendingSuggestionTarget.type === 'bullet' &&
      pendingSuggestionTarget.expIndex !== undefined &&
      pendingSuggestionTarget.bulletIndex !== undefined
    ) {
      const updated = [...resumeData.workExperience]
      const exp = updated[pendingSuggestionTarget.expIndex]
      if (exp) {
        const bullets = [...exp.responsibilities]
        bullets[pendingSuggestionTarget.bulletIndex] = suggestion.suggestedText
        updated[pendingSuggestionTarget.expIndex] = { ...exp, responsibilities: bullets }
        handleResumeChange({ ...resumeData, workExperience: updated })
        onToast('Work experience bullet enhanced with strong action verbs!', 'success')
      }
    } else if (
      pendingSuggestionTarget.type === 'project' &&
      pendingSuggestionTarget.projIndex !== undefined
    ) {
      const updated = [...resumeData.projects]
      const proj = updated[pendingSuggestionTarget.projIndex]
      if (proj) {
        updated[pendingSuggestionTarget.projIndex] = {
          ...proj,
          description: suggestion.suggestedText,
        }
        handleResumeChange({ ...resumeData, projects: updated })
        onToast('Project description upgraded with technical precision!', 'success')
      }
    }

    setPendingSuggestionTarget(null)
  }

  // --- Full 5-Step Generation ---
  const handleRunFullGeneration = async () => {
    setIsGenerating(true)
    setGenerationStepIndex(0)

    try {
      const optimizedResume = await runTruthfulGeneration(
        resumeData,
        targetConfig,
        toggles,
        (stepIdx) => {
          setGenerationStepIndex(stepIdx)
        }
      )

      handleResumeChange(optimizedResume)
      setIsGenerating(false)
      onToast(
        `Resume successfully optimized for “${targetConfig.targetRole}”! ATS Score reached ${qualityMetrics.potentialScore}%.`,
        'success'
      )
    } catch {
      setIsGenerating(false)
      onToast('Resume generation completed.', 'info')
    }
  }

  // If no resume loaded, render Empty State
  if (!parsedResume && !resumeData) {
    return (
      <BuilderEmptyState
        onLoadSampleResume={() => handleResumeChange(defaultParsedResume)}
        onNavigateToUpload={onNavigateToResume}
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Builder Sticky Header */}
      <BuilderHeader
        versions={versions}
        activeVersionId={activeVersionId}
        onSelectVersion={handleSelectVersion}
        onCreateNewVersion={handleCreateNewVersion}
        onSaveDraft={handleSaveDraft}
        onGenerateResume={handleRunFullGeneration}
        onPrint={handlePrint}
        onDownloadTxt={handleDownloadTxt}
        onCopyTxt={handleCopyTxt}
        isGenerating={isGenerating}
      />

      {/* Main Workspace Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Global Dashboard Sidebar (Active Tab: resume-builder) */}
          <div className="no-print w-full lg:w-64 shrink-0">
            <DashboardSidebar
              activeTab="resume-builder"
              onSelectTab={(tabId) => {
                if (tabId === 'ai-matching' && onNavigateToMatching) {
                  onNavigateToMatching()
                } else if (tabId === 'resume') {
                  onNavigateToResume()
                }
              }}
              onNavigateToJobs={onNavigateToJobs}
              onNavigateToResume={onNavigateToResume}
              onNavigateToAnalysis={onNavigateToAnalysis}
              onNavigateToMatching={onNavigateToMatching}
              onNavigateToAutoApply={onNavigateToAutoApply}
              onNavigateToApplications={onNavigateToApplications}
              onToast={onToast}
            />
          </div>

          {/* Builder Workspace Area: Responsive Split Layout */}
          <div className="flex-1 w-full min-w-0 space-y-4">
            {/* Mobile Tab Switcher (Edit vs Preview) */}
            <div className="no-print lg:hidden flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-xs">
              <button
                type="button"
                onClick={() => setActiveMobileTab('editor')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  activeMobileTab === 'editor'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Content</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMobileTab('preview')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  activeMobileTab === 'preview'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live A4 Preview ({qualityMetrics.currentScore}%)</span>
              </button>
            </div>

            {/* Split Grid: Left Editor (approx 42%), Right Preview (approx 58%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* ========================================================
                  LEFT COLUMN: CONFIGURATION, TOGGLES, QUALITY & EDITORS
              ======================================================== */}
              <div
                className={`lg:col-span-5 space-y-4 ${
                  activeMobileTab === 'preview' ? 'hidden lg:block' : 'block'
                }`}
              >
                {/* Target Role & Benchmark Config Card */}
                <TargetRoleConfigCard
                  config={targetConfig}
                  onChangeConfig={setTargetConfig}
                />

                {/* AI Optimization Feature Toggles & Score Projection */}
                <AiOptimizationPanel
                  toggles={toggles}
                  onToggleChange={setToggles}
                  currentScore={qualityMetrics.currentScore}
                  potentialScore={qualityMetrics.potentialScore}
                />

                {/* ATS Quality Score & Keywords Sidebar */}
                <ResumeQualitySidebar
                  quality={qualityMetrics}
                  keywordSuggestions={keywordSuggestions}
                  onAddSuggestedSkill={handleAddSuggestedSkill}
                  onNavigateToAnalysis={onNavigateToAnalysis}
                />

                {/* Interactive Structured Resume Sections Accordion */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Resume Content Editors</span>
                    </h2>
                    <span className="text-[11px] text-slate-500">Live preview sync</span>
                  </div>
                  <ResumeEditorAccordion
                    resume={resumeData}
                    onChangeResume={handleResumeChange}
                    onImproveSummary={handleImproveSummary}
                    onImproveBullet={handleImproveBullet}
                    onImproveProject={handleImproveProject}
                    keywordSuggestions={keywordSuggestions}
                    onAddSuggestedSkill={handleAddSuggestedSkill}
                  />
                </div>
              </div>

              {/* ========================================================
                  RIGHT COLUMN: CUSTOMIZATION BAR & LIVE ATS A4 PREVIEW
              ======================================================== */}
              <div
                className={`lg:col-span-7 space-y-4 sticky top-24 ${
                  activeMobileTab === 'editor' ? 'hidden lg:block' : 'block'
                }`}
              >
                {/* Template Selector & Typography Density Bar */}
                <ResumeCustomizationBar
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                  fontSize={fontSize}
                  onChangeFontSize={setFontSize}
                  spacing={spacing}
                  onChangeSpacing={setSpacing}
                  isHighDensity={isHighDensity}
                  onToggleDensity={() => setIsHighDensity(!isHighDensity)}
                />

                {/* Authentic ATS A4 Sheet Preview */}
                <div className="w-full overflow-x-auto pb-4">
                  <LiveResumePreview
                    resume={resumeData}
                    templateId={selectedTemplate}
                    fontSize={fontSize}
                    spacing={spacing}
                    isHighDensity={isHighDensity}
                    targetRoleTitle={targetConfig.targetRole}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestion Diff Modal */}
      <AiSuggestionModal
        isOpen={isSuggestionModalOpen}
        onClose={() => {
          setIsSuggestionModalOpen(false)
          setPendingSuggestionTarget(null)
        }}
        suggestion={activeSuggestion}
        onApply={handleApplySuggestion}
      />

      {/* 5-Step Animated Generation Progress Modal */}
      <GeneratingResumeModal
        isOpen={isGenerating}
        currentStepIndex={generationStepIndex}
        steps={GENERATION_STEPS}
      />
    </div>
  )
}
