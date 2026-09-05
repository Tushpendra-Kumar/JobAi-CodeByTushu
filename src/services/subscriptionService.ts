import {
  type PlanId,
  type BillingCycle,
  type PlanLimitConfig,
  PRICING_PLANS,
} from '@/config/pricingConfig'

export interface SubscriptionState {
  planId: PlanId
  billingCycle: BillingCycle
  status: 'active' | 'canceled' | 'trialing'
  startedAt: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  isDemo: boolean
}

export interface UsageTelemetryItem {
  key: string
  label: string
  used: number
  limit: number | 'Unlimited'
  unit: string
  percentage: number
  isExceeded: boolean
}

export interface UsageTelemetry {
  jobAnalyses: UsageTelemetryItem
  resumeAnalyses: UsageTelemetryItem
  coverLetters: UsageTelemetryItem
  savedJobs: UsageTelemetryItem
  dailyMatches: UsageTelemetryItem
}

export interface DemoCheckoutSession {
  sessionId: string
  planId: PlanId
  planName: string
  billingCycle: BillingCycle
  amount: number
  currency: string
  formattedAmount: string
  billingCycleLabel: string
  monthlyEquivalent: number
  savingsPercent: number
  expiresAt: string
}

const SUBSCRIPTION_STORAGE_KEY = 'jobai_user_subscription'
const USAGE_STORAGE_KEY = 'jobai_usage_telemetry'

const DEFAULT_SUBSCRIPTION: SubscriptionState = {
  planId: 'free',
  billingCycle: 'yearly',
  status: 'active',
  startedAt: '2026-08-01T00:00:00.000Z',
  currentPeriodEnd: '2027-08-01T00:00:00.000Z',
  cancelAtPeriodEnd: false,
  isDemo: true,
}

// Realistic baseline demo usage
const DEFAULT_USAGE_METRICS = {
  jobAnalysesUsed: 7,
  resumeAnalysesUsed: 3,
  coverLettersUsed: 2,
  dailyMatchesUsed: 6,
}

/**
 * Retrieve current user subscription state
 */
export function getCurrentSubscription(): SubscriptionState {
  try {
    const raw = localStorage.getItem(SUBSCRIPTION_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SubscriptionState>
      return {
        ...DEFAULT_SUBSCRIPTION,
        ...parsed,
        planId: parsed.planId || 'free',
        billingCycle: parsed.billingCycle || 'yearly',
      }
    }
  } catch {
    // Storage access fallback
  }
  return DEFAULT_SUBSCRIPTION
}

/**
 * Update user subscription (Demo simulation)
 */
export function updateSubscription(
  planId: PlanId,
  billingCycle?: BillingCycle
): SubscriptionState {
  const current = getCurrentSubscription()
  const cycle = billingCycle || current.billingCycle

  const now = new Date()
  const periodEnd = new Date(now)
  if (cycle === 'yearly') {
    periodEnd.setFullYear(periodEnd.getFullYear() + 1)
  } else {
    periodEnd.setMonth(periodEnd.getMonth() + 1)
  }

  const updated: SubscriptionState = {
    planId,
    billingCycle: cycle,
    status: 'active',
    startedAt: now.toISOString(),
    currentPeriodEnd: periodEnd.toISOString(),
    cancelAtPeriodEnd: false,
    isDemo: true,
  }

  try {
    localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // Storage access fallback
  }

  return updated
}

/**
 * Cancel current subscription at period end (Demo)
 */
export function cancelSubscription(): SubscriptionState {
  const current = getCurrentSubscription()
  const updated: SubscriptionState = {
    ...current,
    cancelAtPeriodEnd: true,
  }

  try {
    localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // Storage access fallback
  }

  return updated
}

/**
 * Reset subscription to default Free plan
 */
export function resetSubscription(): SubscriptionState {
  try {
    localStorage.removeItem(SUBSCRIPTION_STORAGE_KEY)
  } catch {
    // Storage access fallback
  }
  return DEFAULT_SUBSCRIPTION
}

/**
 * Retrieve current platform usage telemetry synthesized against plan limits
 */
export function getUsageTelemetry(planIdOverride?: PlanId): UsageTelemetry {
  const planId = planIdOverride || getCurrentSubscription().planId
  const limits = PRICING_PLANS[planId].limits

  // Count actual saved jobs if available
  let savedJobsCount = 18
  try {
    const rawSaved = localStorage.getItem('jobai_saved_jobs')
    if (rawSaved) {
      const parsed = JSON.parse(rawSaved)
      if (Array.isArray(parsed)) {
        savedJobsCount = parsed.length
      }
    }
  } catch {
    // Ignore fallback
  }

  // Load custom demo usage overrides if stored
  let metrics = DEFAULT_USAGE_METRICS
  try {
    const rawUsage = localStorage.getItem(USAGE_STORAGE_KEY)
    if (rawUsage) {
      metrics = { ...DEFAULT_USAGE_METRICS, ...JSON.parse(rawUsage) }
    }
  } catch {
    // Fallback to default
  }

  const calcPercentage = (used: number, limit: number | 'Unlimited'): number => {
    if (limit === 'Unlimited') return 0
    return Math.min(100, Math.round((used / limit) * 100))
  }

  const isExceeded = (used: number, limit: number | 'Unlimited'): boolean => {
    if (limit === 'Unlimited') return false
    return used >= limit
  }

  return {
    jobAnalyses: {
      key: 'jobAnalyses',
      label: 'AI Job Analyses',
      used: metrics.jobAnalysesUsed,
      limit: limits.aiJobAnalysesPerMonth,
      unit: '/ month',
      percentage: calcPercentage(metrics.jobAnalysesUsed, limits.aiJobAnalysesPerMonth),
      isExceeded: isExceeded(metrics.jobAnalysesUsed, limits.aiJobAnalysesPerMonth),
    },
    resumeAnalyses: {
      key: 'resumeAnalyses',
      label: 'AI Resume Audits',
      used: metrics.resumeAnalysesUsed,
      limit: limits.resumeAnalysesPerMonth,
      unit: '/ month',
      percentage: calcPercentage(metrics.resumeAnalysesUsed, limits.resumeAnalysesPerMonth),
      isExceeded: isExceeded(metrics.resumeAnalysesUsed, limits.resumeAnalysesPerMonth),
    },
    coverLetters: {
      key: 'coverLetters',
      label: 'AI Cover Letters',
      used: metrics.coverLettersUsed,
      limit: limits.coverLettersPerMonth,
      unit: '/ month',
      percentage: calcPercentage(metrics.coverLettersUsed, limits.coverLettersPerMonth),
      isExceeded: isExceeded(metrics.coverLettersUsed, limits.coverLettersPerMonth),
    },
    savedJobs: {
      key: 'savedJobs',
      label: 'Saved Opportunities',
      used: savedJobsCount,
      limit: limits.savedJobsLimit,
      unit: 'slots',
      percentage: calcPercentage(savedJobsCount, limits.savedJobsLimit),
      isExceeded: isExceeded(savedJobsCount, limits.savedJobsLimit),
    },
    dailyMatches: {
      key: 'dailyMatches',
      label: 'Daily AI Matches',
      used: metrics.dailyMatchesUsed,
      limit: limits.dailyAiMatches,
      unit: '/ day',
      percentage: calcPercentage(metrics.dailyMatchesUsed, limits.dailyAiMatches),
      isExceeded: isExceeded(metrics.dailyMatchesUsed, limits.dailyAiMatches),
    },
  }
}

/**
 * Increment simulated usage count for testing limits
 */
export function incrementUsageMetric(
  metric: 'jobAnalysesUsed' | 'resumeAnalysesUsed' | 'coverLettersUsed' | 'dailyMatchesUsed',
  amount = 1
) {
  try {
    const rawUsage = localStorage.getItem(USAGE_STORAGE_KEY)
    const current = rawUsage ? JSON.parse(rawUsage) : DEFAULT_USAGE_METRICS
    const updated = {
      ...current,
      [metric]: Math.max(0, (current[metric] || 0) + amount),
    }
    localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // Fallback
  }
}

/**
 * Feature gate check
 */
export function canUseFeature(featureKey: string, planIdOverride?: PlanId): boolean {
  const planId = planIdOverride || getCurrentSubscription().planId

  switch (featureKey) {
    case 'basic_job_search':
    case 'saved_jobs':
    case 'resume_upload':
    case 'resume_parsing':
    case 'application_tracking':
    case 'zero_fabrication':
    case 'human_review_gate':
      return true

    case 'advanced_job_matching':
    case 'explainable_match_reasoning':
    case 'resume_builder':
    case 'all_resume_templates':
    case 'ai_bullet_optimization':
    case 'deep_career_insights':
    case 'skill_gap_roadmap':
    case 'advanced_cover_letters':
    case 'priority_processing':
      return planId === 'pro' || planId === 'automation'

    case 'auto_apply':
    case 'auto_apply_workflow':
    case 'application_analytics':
    case 'automation_history':
    case 'deep_personalization':
      return planId === 'automation'

    default:
      return true
  }
}

/**
 * Get numerical or string limit for current or specified plan
 */
export function getPlanUsageLimit(
  limitKey: keyof PlanLimitConfig,
  planIdOverride?: PlanId
): number | 'Unlimited' | boolean {
  const planId = planIdOverride || getCurrentSubscription().planId
  return PRICING_PLANS[planId].limits[limitKey]
}

/**
 * Create a demo checkout preview session
 */
export function createDemoCheckoutSession(
  planId: PlanId,
  billingCycle: BillingCycle
): DemoCheckoutSession {
  const plan = PRICING_PLANS[planId]
  const isYearly = billingCycle === 'yearly'

  const amount = isYearly ? plan.pricing.yearlyTotalPrice : plan.pricing.monthlyPrice
  const monthlyEquivalent = isYearly ? plan.pricing.yearlyMonthlyPrice : plan.pricing.monthlyPrice

  const now = new Date()
  const expires = new Date(now.getTime() + 30 * 60 * 1000) // 30 minutes

  return {
    sessionId: `demo_chk_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    planId,
    planName: plan.name,
    billingCycle,
    amount,
    currency: plan.pricing.currencySymbol,
    formattedAmount: `${plan.pricing.currencySymbol}${amount.toLocaleString('en-IN')}`,
    billingCycleLabel: isYearly ? 'Billed annually' : 'Billed monthly',
    monthlyEquivalent,
    savingsPercent: isYearly ? plan.pricing.discountPercent : 0,
    expiresAt: expires.toISOString(),
  }
}
