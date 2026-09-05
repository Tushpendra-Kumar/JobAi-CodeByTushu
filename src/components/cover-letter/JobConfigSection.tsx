import React, { useState } from 'react'
import { Building2, MapPin, Sparkles, FileSearch } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { initialJobsData } from '@/data/jobsData'
import {
  analyzeJobDescription,
  type ExtractedJobRequirements,
} from '@/services/jobDescriptionAnalysisService'

export interface JobTargetState {
  mode: 'catalog' | 'custom'
  selectedJobId?: string
  customTitle: string
  customCompany: string
  customLocation: string
  customDescription: string
  analysis?: ExtractedJobRequirements
}

interface JobConfigSectionProps {
  jobState: JobTargetState
  onChange: (newState: JobTargetState) => void
}

const SAMPLE_CUSTOM_JD = `Job Title: Full Stack Engineer
Company: CloudScale Labs
Location: Remote / Bangalore, India

About the Role:
We are looking for a proactive Full Stack Engineer with strong React, TypeScript, and Node.js skills to design scalable microservices and high-performance client web applications.

Responsibilities:
- Build responsive, accessible frontend interfaces in React and TypeScript.
- Architect RESTful APIs and integrate cloud-native services.
- Optimize web application performance and sub-100ms API response latency.
- Collaborate in an agile engineering team using Git and modern CI/CD pipelines.

Requirements:
- Strong proficiency in React.js, JavaScript (ES6+), and TypeScript.
- Experience with modern CSS / Tailwind and component design systems.
- Familiarity with backend services (Node.js, Express, REST, SQL/PostgreSQL).
- Disciplined code review and automated testing practices.`

export const JobConfigSection: React.FC<JobConfigSectionProps> = ({ jobState, onChange }) => {
  const [showAnalysis, setShowAnalysis] = useState(true)

  const selectedCatalogJob = initialJobsData.find((j) => j.id === jobState.selectedJobId)

  const handleModeSwitch = (mode: 'catalog' | 'custom') => {
    if (mode === 'catalog') {
      const defaultId = jobState.selectedJobId || initialJobsData[0].id
      onChange({
        ...jobState,
        mode: 'catalog',
        selectedJobId: defaultId,
      })
    } else {
      const analysis = analyzeJobDescription(jobState.customDescription)
      onChange({
        ...jobState,
        mode: 'custom',
        analysis,
      })
    }
  }

  const handleCatalogSelect = (jobId: string) => {
    const job = initialJobsData.find((j) => j.id === jobId)
    onChange({
      ...jobState,
      selectedJobId: jobId,
      customTitle: job?.title || '',
      customCompany: job?.company || '',
      customLocation: job?.location || '',
    })
  }

  const handleCustomFieldChange = (
    field: 'customTitle' | 'customCompany' | 'customLocation' | 'customDescription',
    value: string
  ) => {
    const updated = {
      ...jobState,
      [field]: value,
    }
    if (field === 'customDescription') {
      updated.analysis = analyzeJobDescription(value)
      if (!updated.customTitle && updated.analysis.extractedRole) {
        updated.customTitle = updated.analysis.extractedRole
      }
    }
    onChange(updated)
  }

  const handleLoadSample = () => {
    const analysis = analyzeJobDescription(SAMPLE_CUSTOM_JD)
    onChange({
      ...jobState,
      mode: 'custom',
      customTitle: 'Full Stack Engineer',
      customCompany: 'CloudScale Labs',
      customLocation: 'Remote / Bangalore, India',
      customDescription: SAMPLE_CUSTOM_JD,
      analysis,
    })
  }

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold text-sm">
            1
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">Target Job Opportunity</h2>
            <p className="text-xs text-slate-500">
              Select an opportunity from your matches or paste any external job description
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => handleModeSwitch('catalog')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              jobState.mode === 'catalog'
                ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            JobAI Catalog
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('custom')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              jobState.mode === 'custom'
                ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Paste Job Description
          </button>
        </div>
      </div>

      {jobState.mode === 'catalog' ? (
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-700">
            Select Matched Job from Catalog
          </label>
          <select
            value={jobState.selectedJobId || initialJobsData[0].id}
            onChange={(e) => handleCatalogSelect(e.target.value)}
            aria-label="Select target job"
            className="w-full text-sm rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs font-medium"
          >
            {initialJobsData.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} — {job.company} ({job.matchScore}% Match • {job.location})
              </option>
            ))}
          </select>

          {selectedCatalogJob && (
            <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-white to-slate-50/50 p-3.5 space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">
                      {selectedCatalogJob.title}
                    </span>
                    <Badge variant="indigo" size="sm">
                      {selectedCatalogJob.matchScore}% Match
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {selectedCatalogJob.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {selectedCatalogJob.location}
                    </span>
                    <span className="font-medium text-slate-700">
                      {selectedCatalogJob.salary}
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-500 mr-1">Target Skills:</span>
                {selectedCatalogJob.skills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Custom Target Job Details</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoadSample}
              className="text-xs text-indigo-600 hover:text-indigo-700 h-7 px-2"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-500" />}
            >
              Load Sample JD
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Engineer"
                value={jobState.customTitle}
                onChange={(e) => handleCustomFieldChange('customTitle', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Tech"
                value={jobState.customCompany}
                onChange={(e) => handleCustomFieldChange('customCompany', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-medium text-slate-600">
                Pasted Job Description *
              </label>
              <span className="text-[11px] text-slate-400">
                {jobState.analysis?.wordCount || 0} words • {jobState.analysis?.characterCount || 0}{' '}
                chars
              </span>
            </div>
            <textarea
              rows={5}
              placeholder="Paste the target job description or requirements here..."
              value={jobState.customDescription}
              onChange={(e) => handleCustomFieldChange('customDescription', e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y"
            />
          </div>

          {/* Real-time Heuristic JD Analysis Card */}
          {jobState.analysis && jobState.analysis.extractedSkills.length > 0 && (
            <div className="rounded-lg bg-slate-50 border border-slate-200/80 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                  <FileSearch className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Extracted Target Requirements & Keywords</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="text-[11px] text-indigo-600 hover:underline"
                >
                  {showAnalysis ? 'Hide' : 'Show'}
                </button>
              </div>

              {showAnalysis && (
                <div className="space-y-2 pt-1 border-t border-slate-200/60 text-xs">
                  <div className="flex flex-wrap gap-1">
                    {jobState.analysis.extractedSkills.map((sk) => (
                      <Badge key={sk} variant="indigo" size="sm">
                        {sk}
                      </Badge>
                    ))}
                  </div>
                  {jobState.analysis.extractedResponsibilities.length > 0 && (
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <span className="font-semibold text-slate-700">Detected Key Duties:</span>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {jobState.analysis.extractedResponsibilities.slice(0, 3).map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
