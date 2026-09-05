import React, { useState, useEffect } from 'react'
import { AuthLayout } from './AuthLayout'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { type AuthUser } from '@/services/authService'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { UserCheck, ArrowRight, LogOut, LayoutDashboard } from 'lucide-react'
import { type FooterInfoTab } from '@/components/footer/FooterInfoModal'

export interface AuthScreenProps {
  initialView?: 'login' | 'signup' | 'forgot-password'
  onAuthSuccess: (user: AuthUser) => void
  onNavigateScreen: (screen: string) => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
  currentUser?: { email: string; name?: string } | null
  onLogout?: () => void
  redirectPath?: string | null
  onOpenInfoModal?: (tab: FooterInfoTab) => void
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialView = 'login',
  onAuthSuccess,
  onNavigateScreen,
  onToast,
  currentUser,
  onLogout,
  redirectPath,
  onOpenInfoModal,
}) => {
  const [view, setView] = useState<'login' | 'signup' | 'forgot-password'>(initialView)
  const [prevInitialView, setPrevInitialView] = useState<'login' | 'signup' | 'forgot-password'>(initialView)

  if (initialView !== prevInitialView) {
    setPrevInitialView(initialView)
    setView(initialView)
  }

  useEffect(() => {
    if (view === 'login') {
      document.title = 'Sign In — JobAI Career Copilot'
    } else if (view === 'signup') {
      document.title = 'Create Account — JobAI Career Copilot'
    } else {
      document.title = 'Reset Password — JobAI Career Copilot'
    }
  }, [view])

  const handleAuthSuccessInternal = (user: AuthUser) => {
    onAuthSuccess(user)
    const destination = redirectPath || 'home'
    onNavigateScreen(destination)
  }

  return (
    <AuthLayout
      onBackToHome={currentUser ? () => onNavigateScreen('home') : undefined}
      onOpenInfoModal={onOpenInfoModal}
    >
      {currentUser ? (
        /* Authenticated User State */
        <div className="space-y-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Active Session</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              You are currently signed in
            </h1>
            <p className="text-sm text-slate-500">
              Your demo workspace is active and personalized.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {(currentUser.name || currentUser.email).charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {currentUser.name || 'JobAI Candidate'}
                  </h3>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>
              </div>
              <Badge variant="emerald" size="sm" dot>
                Online
              </Badge>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-md cursor-pointer"
              onClick={() => onNavigateScreen('home')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to JobAI Dashboard
            </Button>

            <Button
              variant="secondary"
              size="md"
              className="w-full justify-center cursor-pointer"
              onClick={() => onNavigateScreen('profile')}
              leftIcon={<LayoutDashboard className="w-4 h-4" />}
            >
              Manage Profile & Settings
            </Button>

            {onLogout && (
              <Button
                variant="ghost"
                size="md"
                className="w-full justify-center text-rose-600 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
                onClick={() => {
                  onLogout()
                  setView('login')
                }}
                leftIcon={<LogOut className="w-4 h-4" />}
              >
                Sign Out from this Device
              </Button>
            )}
          </div>
        </div>
      ) : view === 'login' ? (
        <LoginForm
          onSuccess={handleAuthSuccessInternal}
          onNavigateToSignup={() => setView('signup')}
          onNavigateToForgotPassword={() => setView('forgot-password')}
          onToast={onToast}
          redirectPath={redirectPath}
        />
      ) : view === 'signup' ? (
        <SignupForm
          onSuccess={handleAuthSuccessInternal}
          onNavigateToLogin={() => setView('login')}
          onToast={onToast}
        />
      ) : (
        <ForgotPasswordForm
          onNavigateToLogin={() => setView('login')}
          onToast={onToast}
        />
      )}
    </AuthLayout>
  )
}
