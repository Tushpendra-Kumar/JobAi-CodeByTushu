/**
 * JobAI — AI Agentic SaaS / AI Automation Platform
 * Authentication Service (Demo / Portfolio Implementation)
 *
 * Provides centralized session state, demo user directory, login, signup,
 * password recovery simulation, and route protection.
 *
 * NOTE: This is a demo authentication service designed for portfolio testing.
 * Email is mandatory. Password can be any non-empty string. No real credentials,
 * passwords, or cryptographic sessions are stored.
 */

export interface AuthUser {
  id: string
  name: string
  email: string
  createdAt: string
  role: string
  avatarUrl?: string
  profileCompleteness: number
  careerGoal?: string
  isDemoUser: boolean
}

export interface AuthSession {
  token: string
  userId: string
  createdAt: string
  expiresAt: string
  isDemo: true
}

export interface AuthState {
  user: AuthUser | null
  session: AuthSession | null
  isAuthenticated: boolean
  isLoading: boolean
  authError: string | null
}

export interface AuthResult {
  success: boolean
  user?: AuthUser
  session?: AuthSession
  error?: string
}

const STORAGE_KEY_USER = 'jobai_auth_user'
const STORAGE_KEY_SESSION = 'jobai_auth_session'
const STORAGE_KEY_USERS_DIR = 'jobai_auth_users_directory'

// Default pre-seeded demo user for immediate 1-click evaluation
export const DEFAULT_DEMO_USER: AuthUser = {
  id: 'usr-demo-001',
  name: 'Alex Morgan',
  email: 'demo@jobai.app',
  createdAt: '2026-01-15T08:00:00.000Z',
  role: 'Candidate',
  profileCompleteness: 85,
  careerGoal: 'Senior Frontend & AI Engineer',
  isDemoUser: true,
}

// Protected screens that require authentication in JobAI
export const PROTECTED_SCREENS: string[] = [
  'ai-matching',
  'resume',
  'resume-analysis',
  'resume-builder',
  'ai-auto-apply',
  'applications',
  'ai-cover-letter',
  'career-insights',
  'profile',
]

// Guest-only screens that redirect authenticated users to the dashboard
export const GUEST_ONLY_SCREENS: string[] = ['login', 'signup', 'forgot-password']

// Validate email format
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

// Retrieve demo users directory from storage
function getUsersDirectory(): Record<string, AuthUser> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS_DIR)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch {
    // Ignore JSON parse errors
  }
  // Initialize with default demo user
  const initialDir: Record<string, AuthUser> = {
    [DEFAULT_DEMO_USER.email.toLowerCase()]: DEFAULT_DEMO_USER,
  }
  try {
    localStorage.setItem(STORAGE_KEY_USERS_DIR, JSON.stringify(initialDir))
  } catch {
    // Ignore storage quota errors
  }
  return initialDir
}

// Save demo users directory
function saveUsersDirectory(directory: Record<string, AuthUser>): void {
  try {
    localStorage.setItem(STORAGE_KEY_USERS_DIR, JSON.stringify(directory))
  } catch {
    // Ignore storage errors
  }
}

/**
 * Get the currently authenticated demo user from local storage.
 */
export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch {
    // Ignore JSON parse errors
  }
  return null
}

/**
 * Get the active demo session token.
 */
export function getSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch {
    // Ignore parse errors
  }
  return null
}

/**
 * Check if the user is authenticated in the current session.
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null && getSession() !== null
}

/**
 * Restore session state from storage.
 */
export function restoreSession(): AuthState {
  const user = getCurrentUser()
  const session = getSession()

  return {
    user,
    session,
    isAuthenticated: user !== null && session !== null,
    isLoading: false,
    authError: null,
  }
}

/**
 * Create a demo session object.
 */
function createDemoSession(userId: string): AuthSession {
  const now = new Date()
  const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days

  return {
    token: `jobai_demo_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    userId,
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    isDemo: true,
  }
}

/**
 * Demo Login:
 * Email is mandatory & must have valid format.
 * Password can be any non-empty string.
 */
export async function login(email: string, password: string): Promise<AuthResult> {
  // Simulate network latency (250ms) for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 250))

  const cleanEmail = email.trim()

  if (!cleanEmail) {
    return { success: false, error: 'Email is required.' }
  }

  if (!isValidEmail(cleanEmail)) {
    return { success: false, error: 'Enter a valid email address.' }
  }

  if (!password || !password.trim()) {
    return { success: false, error: 'Password is required.' }
  }

  const directory = getUsersDirectory()
  const emailKey = cleanEmail.toLowerCase()

  let user = directory[emailKey]

  if (!user) {
    // For demo convenience, if user does not exist yet, initialize a demo profile for them
    user = {
      id: `usr-${Date.now().toString(36)}`,
      name: cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email: cleanEmail,
      createdAt: new Date().toISOString(),
      role: 'Candidate',
      profileCompleteness: 80,
      careerGoal: 'Software Engineer',
      isDemoUser: true,
    }
    directory[emailKey] = user
    saveUsersDirectory(directory)
  }

  const session = createDemoSession(user.id)

  try {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session))
  } catch {
    // Ignore storage issues in test environments
  }

  return { success: true, user, session }
}

/**
 * Demo Signup:
 * Full Name is mandatory.
 * Email is mandatory & valid.
 * Password can be any non-empty string.
 */
export async function signup(
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  // Simulate realistic network latency (300ms)
  await new Promise((resolve) => setTimeout(resolve, 300))

  const cleanName = name.trim()
  const cleanEmail = email.trim()

  if (!cleanName) {
    return { success: false, error: 'Full name is required.' }
  }

  if (!cleanEmail) {
    return { success: false, error: 'Email is required.' }
  }

  if (!isValidEmail(cleanEmail)) {
    return { success: false, error: 'Enter a valid email address.' }
  }

  if (!password || !password.trim()) {
    return { success: false, error: 'Password is required.' }
  }

  const directory = getUsersDirectory()
  const emailKey = cleanEmail.toLowerCase()

  // Create new user profile
  const newUser: AuthUser = {
    id: `usr-${Date.now().toString(36)}`,
    name: cleanName,
    email: cleanEmail,
    createdAt: new Date().toISOString(),
    role: 'Candidate',
    profileCompleteness: 75,
    careerGoal: 'Software Engineer',
    isDemoUser: true,
  }

  directory[emailKey] = newUser
  saveUsersDirectory(directory)

  const session = createDemoSession(newUser.id)

  try {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser))
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session))
  } catch {
    // Ignore storage quota errors
  }

  return { success: true, user: newUser, session }
}

/**
 * Demo Logout:
 * Clears current session and active user from localStorage.
 */
export async function logout(): Promise<void> {
  try {
    localStorage.removeItem(STORAGE_KEY_USER)
    localStorage.removeItem(STORAGE_KEY_SESSION)
  } catch {
    // Ignore storage errors
  }
}

/**
 * Update authenticated user fields.
 */
export function updateUser(updates: Partial<AuthUser>): AuthUser | null {
  const current = getCurrentUser()
  if (!current) return null

  const updated: AuthUser = { ...current, ...updates }

  try {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated))
    const directory = getUsersDirectory()
    directory[updated.email.toLowerCase()] = updated
    saveUsersDirectory(directory)
  } catch {
    // Ignore storage issues
  }

  return updated
}

/**
 * Demo Password Reset:
 * Validates email and returns non-functional demo disclaimer notice.
 */
export async function resetPasswordDemo(
  email: string
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 250))

  const cleanEmail = email.trim()

  if (!cleanEmail) {
    return { success: false, message: 'Email is required.' }
  }

  if (!isValidEmail(cleanEmail)) {
    return { success: false, message: 'Enter a valid email address.' }
  }

  return {
    success: true,
    message: 'Demo mode: password recovery is not connected to a real email service yet.',
  }
}

/**
 * Check if a screen requires authentication.
 */
export function isProtectedRoute(screenName: string): boolean {
  return PROTECTED_SCREENS.includes(screenName)
}

/**
 * Check if a screen is guest-only.
 */
export function isGuestOnlyRoute(screenName: string): boolean {
  return GUEST_ONLY_SCREENS.includes(screenName)
}

/**
 * Quick helper to get default demo credentials for testing.
 */
export function getDemoAccountInfo(): { email: string; name: string; passwordHint: string } {
  return {
    email: DEFAULT_DEMO_USER.email,
    name: DEFAULT_DEMO_USER.name,
    passwordHint: 'Any non-empty password',
  }
}
