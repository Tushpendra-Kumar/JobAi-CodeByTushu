import React, { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { signup, type AuthUser } from '@/services/authService'

export interface SignupFormProps {
  onSuccess: (user: AuthUser) => void
  onNavigateToLogin: () => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onSuccess,
  onNavigateToLogin,
  onToast,
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
    form?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validate = (): boolean => {
    const errs: {
      name?: string
      email?: string
      password?: string
      confirmPassword?: string
    } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!name.trim()) {
      errs.name = 'Full name is required.'
    }

    if (!email.trim()) {
      errs.email = 'Email is required.'
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Enter a valid email address.'
    }

    if (!password.trim()) {
      errs.password = 'Password is required.'
    }

    if (!confirmPassword.trim()) {
      errs.confirmPassword = 'Confirm your password.'
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.'
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
      const result = await signup(name, email, password)

      if (result.success && result.user) {
        onToast(`Account created! Welcome to JobAI, ${result.user.name}.`, 'success')
        onSuccess(result.user)
      } else {
        setErrors({ form: result.error || 'Account creation failed. Please check your information.' })
      }
    } catch {
      setErrors({ form: 'An unexpected error occurred during account creation. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Headline Header */}
      <div className="space-y-2 text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>New Candidate Registration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create your JobAI account
        </h1>
        <p className="text-sm text-slate-500">
          Build a smarter, more personalized job search.
        </p>
      </div>

      {/* Demo Notice Banner */}
      <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-2 text-xs text-left">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span className="text-indigo-900 text-[11px]">
            Demo mode: email is mandatory; any non-empty password is accepted.
          </span>
        </div>
        <Badge variant="indigo" size="sm" className="shrink-0 text-[10px] py-0">
          Demo
        </Badge>
      </div>

      {/* Form Error Banner */}
      {errors.form && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5 text-left" noValidate>
        {/* Full Name Field */}
        <div className="space-y-1">
          <label
            htmlFor="signup-name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
              }}
              placeholder="Alex Morgan"
              autoComplete="name"
              className={`w-full pl-10 pr-3.5 py-2 bg-white rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                errors.name ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label
            htmlFor="signup-email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
              }}
              placeholder="alex@example.com"
              autoComplete="email"
              className={`w-full pl-10 pr-3.5 py-2 bg-white rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition-all ${
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
        <div className="space-y-1">
          <label
            htmlFor="signup-password"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
              }}
              placeholder="Create demo password"
              autoComplete="new-password"
              className={`w-full pl-10 pr-10 py-2 bg-white rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition-all ${
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

        {/* Confirm Password Field */}
        <div className="space-y-1">
          <label
            htmlFor="signup-confirm-password"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Confirm Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }))
              }}
              placeholder="Confirm demo password"
              autoComplete="new-password"
              className={`w-full pl-10 pr-10 py-2 bg-white rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                errors.confirmPassword ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.confirmPassword}</span>
            </p>
          )}
        </div>

        {/* Submit CTA */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center shadow-md cursor-pointer mt-3"
          disabled={isLoading}
          rightIcon={!isLoading ? <ArrowRight className="w-4 h-4" /> : undefined}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating account...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      {/* Switch to Login */}
      <div className="pt-2 text-center text-xs text-slate-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </div>
  )
}
