import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { initialJobsData, type Job } from '@/data/jobsData'
import type {
  TrackedApplication,
  ApplicationStatus,
  ApplicationSource,
} from '@/services/applicationTrackingService'
import { generateDemoConfirmationCode } from '@/services/applicationTrackingService'

interface AddApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  onSaveApplication: (app: TrackedApplication) => void
}

export const AddApplicationModal: React.FC<AddApplicationModalProps> = ({
  isOpen,
  onClose,
  onSaveApplication,
}) => {
  const [tab, setTab] = useState<'catalog' | 'custom'>('catalog')
  const [selectedCatalogJobId, setSelectedCatalogJobId] = useState(
    initialJobsData[0]?.id || ''
  )
  const [catalogStatus, setCatalogStatus] = useState<ApplicationStatus>('Preparing')

  // Custom Form fields
  const [customTitle, setCustomTitle] = useState('')
  const [customCompany, setCustomCompany] = useState('')
  const [customLocation, setCustomLocation] = useState('Remote')
  const [customWorkMode, setCustomWorkMode] = useState('Remote')
  const [customSalary, setCustomSalary] = useState('')
  const [customMatchScore, setCustomMatchScore] = useState(88)
  const [customStatus, setCustomStatus] = useState<ApplicationStatus>('Saved')
  const [customSource, setCustomSource] = useState<ApplicationSource>('Company Website')

  if (!isOpen) return null

  const handleAddCatalogJob = (e: React.FormEvent) => {
    e.preventDefault()
    const job = initialJobsData.find((j: Job) => j.id === selectedCatalogJobId)
    if (!job) return

    const now = new Date()
    const formattedDate = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

    const newApp: TrackedApplication = {
      id: `app-manual-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyLogoText: job.companyLogoText,
      companyColor: job.companyColor,
      location: job.location,
      workMode: job.workMode,
      salary: job.salary,
      appliedAt: catalogStatus === 'Applied' ? formattedDate : 'Not submitted yet',
      lastUpdated: 'Just now',
      status: catalogStatus,
      matchScore: job.matchScore,
      resumeVersionId: 'draft-master',
      resumeVersionName: 'Master Resume (Verified)',
      coverLetterStatus: 'Drafted',
      confirmationCode: generateDemoConfirmationCode(),
      source: 'Job Board',
      notes: 'Added to tracking from JobAI job catalog.',
      timeline: [
        {
          id: `t-${Date.now()}`,
          status: catalogStatus,
          title: `Added to pipeline as ${catalogStatus}`,
          date: formattedDate,
          note: `Added manually from catalog. Match score: ${job.matchScore}%.`,
        },
      ],
    }

    onSaveApplication(newApp)
    onClose()
  }

  const handleAddCustomJob = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customTitle.trim() || !customCompany.trim()) return

    const now = new Date()
    const formattedDate = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

    const newApp: TrackedApplication = {
      id: `app-custom-${Date.now()}`,
      jobId: `job-custom-${Date.now()}`,
      jobTitle: customTitle.trim(),
      company: customCompany.trim(),
      companyLogoText: customCompany.trim().slice(0, 2).toUpperCase(),
      companyColor: '#4F46E5',
      location: customLocation.trim() || 'Remote',
      workMode: customWorkMode,
      salary: customSalary.trim() || undefined,
      appliedAt: customStatus === 'Applied' ? formattedDate : 'Not applied yet',
      lastUpdated: 'Just now',
      status: customStatus,
      matchScore: Number(customMatchScore) || 85,
      resumeVersionId: 'draft-master',
      resumeVersionName: 'Master Resume (Verified)',
      coverLetterStatus: 'None',
      confirmationCode: generateDemoConfirmationCode(),
      source: customSource,
      notes: 'Custom external opportunity added to tracking.',
      timeline: [
        {
          id: `t-${Date.now()}`,
          status: customStatus,
          title: `Opportunity recorded as ${customStatus}`,
          date: formattedDate,
          note: `Custom application logged from ${customSource}.`,
        },
      ],
    }

    onSaveApplication(newApp)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Add Application to Tracker
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an opportunity from JobAI or enter custom details.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-4 bg-slate-100/70 border-b border-slate-200 flex gap-2">
          <button
            type="button"
            onClick={() => setTab('catalog')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              tab === 'catalog'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Select from Job Catalog
          </button>
          <button
            type="button"
            onClick={() => setTab('custom')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              tab === 'custom'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Enter Custom Opportunity
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[70vh]">
          {tab === 'catalog' ? (
            <form onSubmit={handleAddCatalogJob} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Target Job in Catalog
                </label>
                <select
                  value={selectedCatalogJobId}
                  onChange={(e) => setSelectedCatalogJobId(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 font-medium text-slate-800"
                >
                  {initialJobsData.map((job: Job) => (
                    <option key={job.id} value={job.id}>
                      {job.title} — {job.company} ({job.matchScore}% Match)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Initial Pipeline Stage
                </label>
                <select
                  value={catalogStatus}
                  onChange={(e) =>
                    setCatalogStatus(e.target.value as ApplicationStatus)
                  }
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 font-medium text-slate-800"
                >
                  <option value="Saved">Saved</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Ready to Apply">Ready to Apply</option>
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Add Application
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAddCustomJob} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corporation"
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru, India"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Work Mode
                  </label>
                  <select
                    value={customWorkMode}
                    onChange={(e) => setCustomWorkMode(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Initial Stage
                  </label>
                  <select
                    value={customStatus}
                    onChange={(e) =>
                      setCustomStatus(e.target.value as ApplicationStatus)
                    }
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Saved">Saved</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Applied">Applied</option>
                    <option value="Screening">Screening</option>
                    <option value="Interview">Interview</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Source
                  </label>
                  <select
                    value={customSource}
                    onChange={(e) =>
                      setCustomSource(e.target.value as ApplicationSource)
                    }
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Company Website">Company Website</option>
                    <option value="Job Board">Job Board</option>
                    <option value="Referral">Referral</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Salary / Compensation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹10,00,000 / yr"
                    value={customSalary}
                    onChange={(e) => setCustomSalary(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Match Score (%)
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={100}
                    value={customMatchScore}
                    onChange={(e) => setCustomMatchScore(Number(e.target.value))}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Application
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
