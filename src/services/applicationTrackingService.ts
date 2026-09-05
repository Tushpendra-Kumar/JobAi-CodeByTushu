export type ApplicationStatus =
  | 'Saved'
  | 'Preparing'
  | 'Ready to Apply'
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Withdrawn'
  // Backward compatibility aliases from Screen #8
  | 'Ready for Review'
  | 'Draft'
  | 'Approved'
  | 'Interviewing'
  | 'Skipped'

export type NormalizedPipelineStage =
  | 'Saved'
  | 'Preparing'
  | 'Ready to Apply'
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Withdrawn'

export interface ApplicationNote {
  id: string
  text: string
  createdAt: string
}

export interface ApplicationTimelineEvent {
  id: string
  status: ApplicationStatus
  title: string
  date: string
  note?: string
}

export interface ApplicationNextAction {
  action: string
  dueDate?: string
  isOverdue?: boolean
  note?: string
  completed?: boolean
}

export type ApplicationSource =
  | 'Job Board'
  | 'Company Website'
  | 'Referral'
  | 'Recruiter'
  | 'Other'

export interface TrackedApplication {
  id: string
  jobId: string
  jobTitle: string
  company: string
  companyLogoText?: string
  companyColor?: string
  location: string
  workMode: string
  salary?: string
  appliedAt: string // Formatted string or ISO
  lastUpdated?: string
  status: ApplicationStatus
  matchScore: number
  resumeVersionId: string
  resumeVersionName: string
  coverLetterText?: string
  coverLetterStatus?: 'Generated' | 'Drafted' | 'Custom' | 'None'
  applicationAnswers?: { question: string; answer: string }[]
  readinessScore?: number
  confirmationCode?: string
  source?: ApplicationSource
  nextAction?: ApplicationNextAction
  notes?: string
  notesList?: ApplicationNote[]
  timeline?: ApplicationTimelineEvent[]
}

export const PIPELINE_STAGES: {
  id: NormalizedPipelineStage
  label: string
  color: string
  bgColor: string
  borderColor: string
}[] = [
  { id: 'Saved', label: 'Saved', color: 'text-slate-700', bgColor: 'bg-slate-100', borderColor: 'border-slate-300' },
  { id: 'Preparing', label: 'Preparing', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  { id: 'Ready to Apply', label: 'Ready to Apply', color: 'text-indigo-700', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
  { id: 'Applied', label: 'Applied', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { id: 'Screening', label: 'Screening', color: 'text-purple-700', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  { id: 'Interview', label: 'Interview', color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  { id: 'Offer', label: 'Offer', color: 'text-teal-800', bgColor: 'bg-teal-50', borderColor: 'border-teal-200' },
  { id: 'Rejected', label: 'Rejected', color: 'text-rose-700', bgColor: 'bg-rose-50', borderColor: 'border-rose-200' },
]

export const KANBAN_COLUMNS: NormalizedPipelineStage[] = [
  'Saved',
  'Preparing',
  'Applied',
  'Screening',
  'Interview',
  'Offer',
  'Rejected',
]

/**
 * Normalizes legacy status aliases into standard pipeline stages
 */
export function normalizeStatus(status: ApplicationStatus): NormalizedPipelineStage {
  if (status === 'Interviewing') return 'Interview'
  if (status === 'Ready for Review' || status === 'Draft') return 'Preparing'
  if (status === 'Approved') return 'Ready to Apply'
  if (status === 'Skipped') return 'Withdrawn'
  return status as NormalizedPipelineStage
}

const TRACKING_STORAGE_KEY = 'jobai_tracked_applications'

/**
 * Rich realistic initial demo applications across the full pipeline
 */
const DEFAULT_INITIAL_APPLICATIONS: TrackedApplication[] = [
  {
    id: 'app-demo-1',
    jobId: 'job-1',
    jobTitle: 'Frontend Engineer (React)',
    company: 'TechFlow Solutions',
    companyLogoText: 'TF',
    companyColor: '#4F46E5',
    location: 'Noida, India',
    workMode: 'Hybrid',
    salary: '₹8,00,000 – ₹12,00,000 / yr',
    appliedAt: '03 Sep 2026',
    lastUpdated: 'Today, 2:15 PM',
    status: 'Interview',
    matchScore: 92,
    resumeVersionId: 'draft-master',
    resumeVersionName: 'Master Resume (Verified)',
    coverLetterStatus: 'Generated',
    coverLetterText:
      'Dear Hiring Team at TechFlow Solutions,\n\nI am writing to express my strong interest in the Frontend Engineer position. With hands-on experience building modern, responsive user interfaces with React.js, TypeScript, and Tailwind CSS, I am eager to contribute to your engineering team.\n\nAt my recent internship and in my full-stack projects, I have focused on building accessible, high-performance web applications and streamlining state workflows. I look forward to discussing how my background in modern web engineering aligns with TechFlow Solutions.',
    applicationAnswers: [
      {
        question: 'Why are you interested in this role?',
        answer:
          'TechFlow Solutions develops mission-critical web applications that demand both frontend craftsmanship and strong architectural foundations. My experience with React.js and TypeScript aligns directly with your stack.',
      },
      {
        question: 'Describe a relevant project.',
        answer:
          'I architected JobAI, an AI-powered career automation SaaS featuring responsive component hierarchies, explainable matching algorithms, and structured ATS resume parsing.',
      },
    ],
    readinessScore: 94,
    confirmationCode: 'JOBAI-APP-7821',
    source: 'Company Website',
    nextAction: {
      action: 'Technical Interview (React & System Architecture)',
      dueDate: 'Tomorrow, 3:00 PM',
      note: 'Focus on state optimization, virtual lists, and TypeScript generics.',
      isOverdue: false,
    },
    notes: 'Recruiter mentioned positive feedback from initial resume review. Advancing to round 2.',
    notesList: [
      {
        id: 'note-1',
        text: 'Initial recruiter screen completed on 04 Sep. Discussed React experience and portfolio.',
        createdAt: '04 Sep 2026, 11:30 AM',
      },
      {
        id: 'note-2',
        text: 'Technical interview scheduled with Lead Architect.',
        createdAt: 'Today, 10:00 AM',
      },
    ],
    timeline: [
      {
        id: 't-1',
        status: 'Preparing',
        title: 'Application Package Prepared',
        date: '02 Sep 2026',
        note: 'AI customized resume and cover letter with 92% match score.',
      },
      {
        id: 't-2',
        status: 'Applied',
        title: 'Application Submitted',
        date: '03 Sep 2026',
        note: 'Direct submission with confirmation code JOBAI-APP-7821.',
      },
      {
        id: 't-3',
        status: 'Screening',
        title: 'Recruiter Screen Completed',
        date: '04 Sep 2026',
        note: 'Recruiter Priya highlighted strong alignment with frontend stack.',
      },
      {
        id: 't-4',
        status: 'Interview',
        title: 'Technical Interview Scheduled',
        date: 'Today, 10:00 AM',
        note: 'Interview invite received for tomorrow at 3:00 PM.',
      },
    ],
  },
  {
    id: 'app-demo-2',
    jobId: 'job-2',
    jobTitle: 'Full Stack Developer',
    company: 'CloudScale Technologies',
    companyLogoText: 'CS',
    companyColor: '#0EA5E9',
    location: 'Bengaluru, India',
    workMode: 'Remote',
    salary: '₹10,00,000 – ₹15,00,000 / yr',
    appliedAt: '04 Sep 2026',
    lastUpdated: 'Yesterday',
    status: 'Screening',
    matchScore: 89,
    resumeVersionId: 'draft-master',
    resumeVersionName: 'Master Resume (Verified)',
    coverLetterStatus: 'Generated',
    coverLetterText:
      'Dear CloudScale Technologies Hiring Team,\n\nI am thrilled to apply for the Full Stack Developer role. My hands-on background building scalable microservices with Node.js and interactive client interfaces with React aligns directly with your distributed cloud goals.',
    applicationAnswers: [
      {
        question: 'What backend technologies do you use most frequently?',
        answer: 'Node.js, Express, PostgreSQL, and RESTful API design.',
      },
    ],
    readinessScore: 91,
    confirmationCode: 'JOBAI-APP-5419',
    source: 'Job Board',
    nextAction: {
      action: 'Follow up with recruiter on screening status',
      dueDate: '07 Sep 2026',
      note: 'Send polite follow-up email if no update by Monday.',
      isOverdue: false,
    },
    notes: 'Resume under review by engineering director.',
    notesList: [
      {
        id: 'note-cs-1',
        text: 'Applied through JobAI Auto Apply workflow. Confirmation received.',
        createdAt: '04 Sep 2026',
      },
    ],
    timeline: [
      {
        id: 't-cs-1',
        status: 'Applied',
        title: 'Application Submitted',
        date: '04 Sep 2026',
        note: 'Submitted with code JOBAI-APP-5419.',
      },
      {
        id: 't-cs-2',
        status: 'Screening',
        title: 'In Initial Screening',
        date: 'Yesterday, 4:00 PM',
        note: 'Application viewed by Talent Acquisition team.',
      },
    ],
  },
  {
    id: 'app-demo-3',
    jobId: 'job-3',
    jobTitle: 'Junior AI/ML Engineer',
    company: 'NextGen AI Labs',
    companyLogoText: 'NX',
    companyColor: '#8B5CF6',
    location: 'Hyderabad, India',
    workMode: 'On-site',
    salary: '₹7,50,000 – ₹11,00,000 / yr',
    appliedAt: 'Today, 9:30 AM',
    lastUpdated: 'Today, 9:30 AM',
    status: 'Applied',
    matchScore: 95,
    resumeVersionId: 'draft-master',
    resumeVersionName: 'Master Resume (Verified)',
    coverLetterStatus: 'Generated',
    coverLetterText:
      'Dear NextGen AI Labs Team,\n\nI am writing to apply for the Junior AI/ML Engineer role. Having engineered agentic automation pipelines and integrated LLM workflows in JobAI, I am excited about contributing to your research.',
    readinessScore: 96,
    confirmationCode: 'JOBAI-APP-9921',
    source: 'Company Website',
    nextAction: {
      action: 'Awaiting initial application acknowledgement',
      dueDate: '09 Sep 2026',
      isOverdue: false,
    },
    notes: 'High match role. Follow up on LinkedIn if possible.',
    notesList: [],
    timeline: [
      {
        id: 't-nx-1',
        status: 'Applied',
        title: 'Application Submitted',
        date: 'Today, 9:30 AM',
        note: 'Tailored application with focus on Python and AI Agent architectures.',
      },
    ],
  },
  {
    id: 'app-demo-4',
    jobId: 'job-4',
    jobTitle: 'Backend Engineer (Node.js)',
    company: 'FinTech Global Systems',
    companyLogoText: 'FG',
    companyColor: '#10B981',
    location: 'Mumbai, India',
    workMode: 'Hybrid',
    salary: '₹9,00,000 – ₹14,00,000 / yr',
    appliedAt: 'Not applied yet',
    lastUpdated: '04 Sep 2026',
    status: 'Preparing',
    matchScore: 88,
    resumeVersionId: 'draft-master',
    resumeVersionName: 'Master Resume (Verified)',
    coverLetterStatus: 'Drafted',
    readinessScore: 85,
    confirmationCode: 'JOBAI-PREP-2041',
    source: 'Referral',
    nextAction: {
      action: 'Finalize cover letter and submit application',
      dueDate: 'Today',
      note: 'Need to review referral code with Alumni mentor before submitting.',
      isOverdue: false,
    },
    notes: 'Referral from college alumni Rohit Sharma.',
    notesList: [],
    timeline: [
      {
        id: 't-fg-1',
        status: 'Saved',
        title: 'Opportunity Bookmarked',
        date: '02 Sep 2026',
      },
      {
        id: 't-fg-2',
        status: 'Preparing',
        title: 'Resume & Answers Drafted',
        date: '04 Sep 2026',
        note: '88% match score. Ready for final user approval.',
      },
    ],
  },
  {
    id: 'app-demo-5',
    jobId: 'job-5',
    jobTitle: 'Data Engineer (Python / SQL)',
    company: 'HyperData Dynamics',
    companyLogoText: 'HD',
    companyColor: '#F59E0B',
    location: 'Gurugram, India',
    workMode: 'Remote',
    salary: '₹8,50,000 – ₹13,00,000 / yr',
    appliedAt: 'Not applied yet',
    lastUpdated: '01 Sep 2026',
    status: 'Saved',
    matchScore: 84,
    resumeVersionId: 'draft-master',
    resumeVersionName: 'Master Resume (Verified)',
    coverLetterStatus: 'None',
    readinessScore: 78,
    confirmationCode: 'JOBAI-SAVE-1102',
    source: 'Job Board',
    nextAction: {
      action: 'Analyze skill gaps in Apache Spark and Airflow',
      dueDate: '11 Sep 2026',
    },
    notes: 'Check if cloud projects can be highlighted to boost ATS match above 90%.',
    notesList: [],
    timeline: [
      {
        id: 't-hd-1',
        status: 'Saved',
        title: 'Opportunity Saved from Job Discovery',
        date: '01 Sep 2026',
      },
    ],
  },
  {
    id: 'app-demo-6',
    jobId: 'job-6',
    jobTitle: 'Software Engineer (Healthcare AI)',
    company: 'InnovateHealth AI',
    companyLogoText: 'IH',
    companyColor: '#14B8A6',
    location: 'Pune, India',
    workMode: 'Hybrid',
    salary: '₹11,00,000 – ₹16,00,000 / yr',
    appliedAt: '25 Aug 2026',
    lastUpdated: '04 Sep 2026',
    status: 'Offer',
    matchScore: 94,
    resumeVersionId: 'draft-master',
    resumeVersionName: 'Master Resume (Verified)',
    coverLetterStatus: 'Generated',
    readinessScore: 97,
    confirmationCode: 'JOBAI-APP-1029',
    source: 'Recruiter',
    nextAction: {
      action: 'Review formal offer letter and benefits documentation',
      dueDate: '12 Sep 2026',
      note: 'Total package ₹13.5 LPA + health benefits + joining bonus.',
    },
    notes: 'Formal offer received on 04 Sep! Highly competitive compensation and great culture.',
    notesList: [
      {
        id: 'note-ih-1',
        text: 'HR call completed with VP of Engineering. Offer letter extended.',
        createdAt: '04 Sep 2026',
      },
    ],
    timeline: [
      { id: 't-ih-1', status: 'Applied', title: 'Application Submitted', date: '25 Aug 2026' },
      { id: 't-ih-2', status: 'Screening', title: 'Recruiter Screening', date: '28 Aug 2026' },
      { id: 't-ih-3', status: 'Interview', title: 'Technical Rounds 1 & 2 Completed', date: '01 Sep 2026' },
      { id: 't-ih-4', status: 'Offer', title: 'Formal Offer Received', date: '04 Sep 2026', note: 'Offer accepted pending final documentation.' },
    ],
  },
]

/**
 * Retrieve all tracked applications from localStorage with fallback defaults
 */
export function getTrackedApplications(): TrackedApplication[] {
  try {
    const raw = localStorage.getItem(TRACKING_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as TrackedApplication[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {
    // fallback if json parse error
  }
  return DEFAULT_INITIAL_APPLICATIONS
}

/**
 * Save or record a new tracked application
 */
export function saveTrackedApplication(app: TrackedApplication): void {
  try {
    const current = getTrackedApplications()
    const existsIdx = current.findIndex((item) => item.id === app.id)
    let updated: TrackedApplication[]
    if (existsIdx >= 0) {
      updated = [...current]
      updated[existsIdx] = {
        ...app,
        lastUpdated: 'Just now',
      }
    } else {
      updated = [
        {
          ...app,
          lastUpdated: 'Just now',
        },
        ...current,
      ]
    }
    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // quota fallback
  }
}

/**
 * Update the status of an existing application with automatic timeline logging
 */
export function updateApplicationStatus(
  id: string,
  newStatus: ApplicationStatus,
  optionalNote?: string
): TrackedApplication | null {
  try {
    const current = getTrackedApplications()
    let updatedApp: TrackedApplication | null = null

    const updated = current.map((item) => {
      if (item.id === id) {
        const now = new Date()
        const formattedDate = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        const newTimelineItem: ApplicationTimelineEvent = {
          id: `t-${Date.now()}`,
          status: newStatus,
          title: `Status updated to ${newStatus}`,
          date: formattedDate,
          note: optionalNote || `Application moved to ${newStatus} stage in JobAI tracker.`,
        }

        const existingTimeline = item.timeline || []

        updatedApp = {
          ...item,
          status: newStatus,
          lastUpdated: 'Just now',
          timeline: [newTimelineItem, ...existingTimeline],
        }
        return updatedApp
      }
      return item
    })

    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(updated))
    return updatedApp
  } catch {
    return null
  }
}

/**
 * Add a private note to an application
 */
export function addApplicationNote(appId: string, text: string): ApplicationNote | null {
  try {
    const current = getTrackedApplications()
    const now = new Date()
    const formattedDate = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    const newNote: ApplicationNote = {
      id: `note-${Date.now()}`,
      text,
      createdAt: formattedDate,
    }

    const updated = current.map((item) => {
      if (item.id === appId) {
        const existingNotes = item.notesList || []
        return {
          ...item,
          lastUpdated: 'Just now',
          notesList: [newNote, ...existingNotes],
        }
      }
      return item
    })

    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(updated))
    return newNote
  } catch {
    return null
  }
}

/**
 * Delete a private note from an application
 */
export function deleteApplicationNote(appId: string, noteId: string): boolean {
  try {
    const current = getTrackedApplications()
    const updated = current.map((item) => {
      if (item.id === appId && item.notesList) {
        return {
          ...item,
          lastUpdated: 'Just now',
          notesList: item.notesList.filter((n) => n.id !== noteId),
        }
      }
      return item
    })
    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(updated))
    return true
  } catch {
    return false
  }
}

/**
 * Update the next action for an application
 */
export function updateNextAction(
  appId: string,
  nextAction: ApplicationNextAction | undefined
): boolean {
  try {
    const current = getTrackedApplications()
    const updated = current.map((item) => {
      if (item.id === appId) {
        return {
          ...item,
          nextAction,
          lastUpdated: 'Just now',
        }
      }
      return item
    })
    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(updated))
    return true
  } catch {
    return false
  }
}

/**
 * Remove an application record
 */
export function deleteTrackedApplication(id: string): void {
  try {
    const current = getTrackedApplications()
    const updated = current.filter((item) => item.id !== id)
    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // storage fallback
  }
}

/**
 * Generate a unique demo confirmation code
 */
export function generateDemoConfirmationCode(): string {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `JOBAI-APP-${num}`
}
