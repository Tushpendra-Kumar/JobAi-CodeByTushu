export type PlanId = 'free' | 'pro' | 'automation'
export type BillingCycle = 'monthly' | 'yearly'

export interface PlanPricing {
  monthlyPrice: number
  yearlyMonthlyPrice: number
  yearlyTotalPrice: number
  discountPercent: number
  currencySymbol: string
  currencyCode: string
}

export interface PlanLimitConfig {
  aiJobAnalysesPerMonth: number
  resumeAnalysesPerMonth: number
  coverLettersPerMonth: number
  savedJobsLimit: number
  dailyAiMatches: number | 'Unlimited'
  resumeTemplatesAllowed: number
  autoApplyDailyQuota: number
  priorityProcessing: boolean
}

export interface PricingPlan {
  id: PlanId
  name: string
  tagline: string
  badge?: string
  isPopular?: boolean
  pricing: PlanPricing
  limits: PlanLimitConfig
  highlights: string[]
  ctaLabel: string
  accentColor: 'slate' | 'indigo' | 'purple'
}

export interface FeatureComparisonRow {
  name: string
  description?: string
  free: boolean | string
  pro: boolean | string
  automation: boolean | string
  tooltip?: string
}

export interface FeatureComparisonCategory {
  categoryName: string
  description: string
  features: FeatureComparisonRow[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface TrustPillar {
  title: string
  description: string
  icon: string
}

export const PRICING_PLANS: Record<PlanId, PricingPlan> = {
  free: {
    id: 'free',
    name: 'Free',
    tagline: 'For getting started',
    accentColor: 'slate',
    pricing: {
      monthlyPrice: 0,
      yearlyMonthlyPrice: 0,
      yearlyTotalPrice: 0,
      discountPercent: 0,
      currencySymbol: '₹',
      currencyCode: 'INR',
    },
    limits: {
      aiJobAnalysesPerMonth: 10,
      resumeAnalysesPerMonth: 5,
      coverLettersPerMonth: 3,
      savedJobsLimit: 25,
      dailyAiMatches: 10,
      resumeTemplatesAllowed: 1,
      autoApplyDailyQuota: 0,
      priorityProcessing: false,
    },
    highlights: [
      'Basic job discovery with dual search & filters',
      'Limited AI job matching (10 matches/day)',
      'Resume upload & structured parsing',
      'Basic ATS resume score & section review',
      'Limited cover letter generation (3/mo)',
      'Kanban & table application tracking pipeline',
      'Standard candidate profile & preferences',
      'Up to 25 saved opportunity bookmarks',
    ],
    ctaLabel: 'Get Started',
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    tagline: 'For serious job seekers',
    badge: 'Most Popular',
    isPopular: true,
    accentColor: 'indigo',
    pricing: {
      monthlyPrice: 499,
      yearlyMonthlyPrice: 399,
      yearlyTotalPrice: 4788,
      discountPercent: 20,
      currencySymbol: '₹',
      currencyCode: 'INR',
    },
    limits: {
      aiJobAnalysesPerMonth: 100,
      resumeAnalysesPerMonth: 50,
      coverLettersPerMonth: 50,
      savedJobsLimit: 500,
      dailyAiMatches: 100,
      resumeTemplatesAllowed: 3,
      autoApplyDailyQuota: 10,
      priorityProcessing: true,
    },
    highlights: [
      'Everything in Free included',
      'Advanced AI job matching & explainable diagnostics',
      '50 ATS resume audits with target role benchmarking',
      'AI Resume Builder with all 3 ATS templates',
      'Advanced AI Cover Letter Generator (5 writing tones)',
      'AI Career Insights & 4-week learning roadmap',
      '100 in-depth AI job description analyses/mo',
      'Priority AI generation & fast response times',
      'Up to 500 saved opportunity bookmarks',
    ],
    ctaLabel: 'Upgrade to Pro',
  },
  automation: {
    id: 'automation',
    name: 'Automation',
    tagline: 'For users ready to automate',
    badge: 'Maximum Power',
    accentColor: 'purple',
    pricing: {
      monthlyPrice: 999,
      yearlyMonthlyPrice: 799,
      yearlyTotalPrice: 9588,
      discountPercent: 20,
      currencySymbol: '₹',
      currencyCode: 'INR',
    },
    limits: {
      aiJobAnalysesPerMonth: 250,
      resumeAnalysesPerMonth: 100,
      coverLettersPerMonth: 100,
      savedJobsLimit: 1000,
      dailyAiMatches: 'Unlimited',
      resumeTemplatesAllowed: 3,
      autoApplyDailyQuota: 50,
      priorityProcessing: true,
    },
    highlights: [
      'Everything in Pro included',
      'AI-powered application preparation workflow',
      'Auto-Apply queue orchestration with human review gate',
      'Deep application personalization & custom notes',
      'Automated job prioritization & matching copilot',
      'Advanced application analytics & response rate funnel',
      'High capacity limits: 250 job analyses & 100 resumes',
      'Automation audit history & submission tracking',
      'Up to 1,000 saved opportunities with bulk management',
    ],
    ctaLabel: 'Choose Automation',
  },
}

export const FEATURE_COMPARISON_CATEGORIES: FeatureComparisonCategory[] = [
  {
    categoryName: 'Job Discovery',
    description: 'Find, filter, and analyze relevant career opportunities with intelligent discovery tools.',
    features: [
      {
        name: 'Job Search & Keyword Filtering',
        free: true,
        pro: true,
        automation: true,
      },
      {
        name: 'Saved Job Bookmarks',
        free: '25 jobs',
        pro: '500 jobs',
        automation: '1,000 jobs',
      },
      {
        name: 'Advanced Multi-Filter Sidebar',
        free: true,
        pro: true,
        automation: true,
      },
      {
        name: 'AI Job Description Analysis',
        free: '10 / month',
        pro: '100 / month',
        automation: '250 / month',
        tooltip: 'Deconstructs responsibilities, required tech stack, and hidden keywords.',
      },
      {
        name: 'AI Job Matching & Compatibility Score',
        free: 'Basic (10/day)',
        pro: 'Advanced (100/day)',
        automation: 'Unlimited',
      },
      {
        name: 'Explainable AI Match Reasoning',
        free: false,
        pro: true,
        automation: true,
        tooltip: 'Detailed breakdown explaining why a specific job matches your profile.',
      },
    ],
  },
  {
    categoryName: 'Resume & Career',
    description: 'Diagnose, build, and optimize your ATS resume assets with truthful AI assistance.',
    features: [
      {
        name: 'Resume File Upload (PDF/DOCX)',
        free: true,
        pro: true,
        automation: true,
      },
      {
        name: 'Structured Resume Parsing',
        free: true,
        pro: true,
        automation: true,
      },
      {
        name: 'AI Resume ATS Analysis & Scoring',
        free: '5 / month',
        pro: '50 / month',
        automation: '100 / month',
      },
      {
        name: 'Target Role Benchmark Auditing',
        free: false,
        pro: true,
        automation: true,
      },
      {
        name: 'AI Resume Builder (Interactive Editor)',
        free: '1 Template (Minimal)',
        pro: 'All 3 ATS Templates',
        automation: 'All 3 ATS Templates',
      },
      {
        name: 'AI Bullet & Action Verb Optimization',
        free: false,
        pro: true,
        automation: true,
      },
      {
        name: 'AI Career Readiness Score & Insights',
        free: 'Basic score',
        pro: 'Full 6-dimension report',
        automation: 'Full 6-dimension report',
      },
      {
        name: 'Skill Gap Remediation & 4-Week Roadmap',
        free: false,
        pro: true,
        automation: true,
      },
    ],
  },
  {
    categoryName: 'Applications',
    description: 'Organize your job search funnel and generate personalized application materials.',
    features: [
      {
        name: 'Application Tracking Pipeline (Kanban & Table)',
        free: true,
        pro: true,
        automation: true,
      },
      {
        name: 'AI Cover Letter Generator',
        free: '3 / month (Standard)',
        pro: '50 / month (5 Tones + Diff)',
        automation: '100 / month (5 Tones + Diff)',
      },
      {
        name: 'Application Package Preparation',
        free: 'Manual',
        pro: 'Guided AI Assist',
        automation: 'Automated Prep',
      },
      {
        name: 'Auto-Apply Workflow Orchestration',
        free: false,
        pro: '10 / day (Review required)',
        automation: '50 / day (Review required)',
        tooltip: 'Prepares customized application packages ready for your 1-click review and submission.',
      },
      {
        name: 'Application Analytics & Conversion Funnel',
        free: false,
        pro: true,
        automation: true,
      },
      {
        name: 'Private Notes & Interview Timeline',
        free: true,
        pro: true,
        automation: true,
      },
    ],
  },
  {
    categoryName: 'AI & Automation',
    description: 'Control AI autonomy, processing priority, and customization safeguards.',
    features: [
      {
        name: 'Strict Zero-Fabrication AI Guarantee',
        free: true,
        pro: true,
        automation: true,
        tooltip: 'AI never invents candidate companies, degrees, or years of experience.',
      },
      {
        name: 'Mandatory Human Review Safety Gate',
        free: true,
        pro: true,
        automation: true,
        tooltip: 'Applications require your explicit approval before any submission is recorded.',
      },
      {
        name: 'AI Tone & Personalization Controls',
        free: 'Standard',
        pro: 'Advanced (5 Tones)',
        automation: 'Full Customization',
      },
      {
        name: 'Priority AI Processing Queue',
        free: false,
        pro: true,
        automation: true,
      },
      {
        name: 'Automation Audit History & Logs',
        free: false,
        pro: false,
        automation: true,
      },
      {
        name: '1-Click Candidate Data Export (JSON)',
        free: true,
        pro: true,
        automation: true,
      },
    ],
  },
]

export const PRICING_FAQS: FaqItem[] = [
  {
    question: 'Can I start for free?',
    answer:
      'Yes, absolutely. JobAI provides a comprehensive Free plan with no credit card required. You can search jobs, parse your resume, diagnose ATS compatibility, track your applications in the Kanban pipeline, and generate starter cover letters right away.',
  },
  {
    question: 'Can I change or cancel my plan later?',
    answer:
      'Yes. You can switch between Monthly and Yearly billing cycles, upgrade to a higher tier as your application volume increases, or downgrade at any time. When upgrading or downgrading, your changes take effect immediately.',
  },
  {
    question: 'Does JobAI guarantee a job or interview placement?',
    answer:
      'No. JobAI is an AI career copilot designed to dramatically optimize your materials, surface the highest-compatibility roles, and eliminate repetitive application friction. Hiring decisions are made entirely by external employers, and we strictly refrain from making unrealistic employment guarantees.',
  },
  {
    question: 'Does Auto-Apply submit applications without my approval?',
    answer:
      'Never. In JobAI, the Application Review Gate is permanently enabled by default. Auto-Apply prepares, formats, and personalizes your application packages according to your target role preferences, but requires your explicit review and one-click confirmation before any submission is processed.',
  },
  {
    question: 'What happens to my resume and career data?',
    answer:
      'Your career data belongs strictly to you. In demo mode, your data is stored locally in your browser and never sold or shared with advertisers or third-party recruiters. You can inspect, export to JSON, or wipe your profile data at any time from Settings.',
  },
  {
    question: 'How do usage limits reset?',
    answer:
      'Monthly limits for AI job analyses, ATS resume audits, and cover letters reset on the 1st of every calendar month. If you reach your limit before the cycle concludes, you can upgrade your plan or continue using unlimited core search and pipeline features.',
  },
]

export const TRUST_PILLARS: TrustPillar[] = [
  {
    title: 'Review Applications Before Submission',
    description: 'Every auto-prepared application package requires your final human approval before being logged or dispatched.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Zero Fabrication Guarantee',
    description: 'JobAI agents will never fabricate credentials, companies, degrees, or achievements on your behalf.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Full Control Over AI Behavior',
    description: 'Configure AI writing tones, personalization depths, and target role criteria directly in your preferences.',
    icon: 'Sliders',
  },
  {
    title: 'Complete Document Ownership',
    description: 'Download, print, or export your ATS resumes and cover letters in standard formats with zero platform lock-in.',
    icon: 'FileText',
  },
  {
    title: 'Transparent Pipeline Tracking',
    description: 'Monitor every applied, screening, interview, and offer stage with genuine conversion metrics and private notes.',
    icon: 'TrendingUp',
  },
  {
    title: 'Privacy & 1-Click Data Export',
    description: 'Export all your profile records and application history to JSON or reset your local workspace with one click.',
    icon: 'Lock',
  },
]
