import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { login, getDemoAccountInfo, type AuthUser } from '@/services/authService'

export interface LoginFormProps {
  onSuccess: (user: AuthUser) => void
  onNavigateToSignup: () => void
  onNavigateToForgotPassword: () => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
  redirectPath?: string | null
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onNavigateToSignup,
  onNavigateToForgotPassword,
  onToast,
  redirectPath,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const demoInfo = getDemoAccountInfo()

  const handleFillDemo = () => {
    setEmail(demoInfo.email)
    setPassword('demo-access-2026')
    setErrors({})
    onToast(`Filled demo credentials for ${demoInfo.name}`, 'info')
  }

  const validate = (): boolean => {
    const errs: { email?: string; password?: string } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email.trim()) {
      errs.email = 'Email is required.'
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Enter a valid email address.'
    }

    if (!password.trim()) {
      errs.password = 'Password is required.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setErrors({})

    try {
      const result = await login(email, password)

      if (result.success && result.user) {
        onToast(`Welcome back, ${result.user.name}!`, 'success')
        onSuccess(result.user)
      } else {
        setErrors({ form: result.error || 'Unable to sign you in. Please check your email and password.' })
      }
    } catch {
      setErrors({ form: 'An unexpected authentication error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Headline */}
      <div className="space-y-2 text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Candidate Sign In</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome back to JobAI
        </h1>
        <p className="text-sm text-slate-500">
          Your AI-powered job search starts here.
        </p>

        {redirectPath && (
          <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Please sign in to access your requested page.</span>
          </div>
        )}
      </div>

      {/* Demo Notice Banner */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-indigo-50/80 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5 text-left">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-indigo-950">
              <span>Demo Authentication</span>
              <Badge variant="indigo" size="sm" className="px-1.5 py-0 text-[10px]">
                Portfolio
              </Badge>
            </div>
            <p className="text-indigo-800/80 text-[11px] mt-0.5">
              Email is mandatory. Any non-empty password is accepted.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="shrink-0 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-2xs"
        >
          Use Demo Account
        </button>
      </div>

      {/* Form Error Banner */}
      {errors.form && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="login-email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
              }}
              placeholder="you@example.com"
              autoComplete="email"
              className={`w-full pl-10 pr-3.5 py-2.5 bg-white rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                errors.email ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Password <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={onNavigateToForgotPassword}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
              }}
              placeholder="Enter demo password"
              autoComplete="current-password"
              className={`w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                errors.password ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded-sm border-slate-300 focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="remember-me" className="text-xs text-slate-600 cursor-pointer">
            Remember this device for demo sessions
          </label>
        </div>

        {/* Primary Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center shadow-md cursor-pointer mt-2"
          disabled={isLoading}
          rightIcon={!isLoading ? <ArrowRight className="w-4 h-4" /> : undefined}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      {/* Switch to Signup */}
      <div className="pt-2 text-center text-xs text-slate-600">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onNavigateToSignup}
          className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
        >
          Create Account
        </button>
      </div>
    </div>
  )
}
