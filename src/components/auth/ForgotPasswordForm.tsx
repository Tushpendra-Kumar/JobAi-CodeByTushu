import React, { useState } from 'react'
import { Mail, ArrowLeft, Send, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { resetPasswordDemo } from '@/services/authService'

export interface ForgotPasswordFormProps {
  onNavigateToLogin: () => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onNavigateToLogin,
  onToast,
}) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setStatusMessage(null)

    if (!email.trim()) {
      setError('Email is required.')
      return
    }

    setIsLoading(true)

    try {
      const result = await resetPasswordDemo(email)
      if (result.success) {
        setStatusMessage(result.message)
        onToast(result.message, 'info')
      } else {
        setError(result.message)
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-left">
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </button>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Account Recovery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Reset your password
        </h1>
        <p className="text-sm text-slate-500">
          Enter your account email to receive demo recovery instructions.
        </p>
      </div>

      {/* Demo Notice Banner */}
      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5 text-left">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-amber-950">
            <span>Demo Mode Notice</span>
            <Badge variant="amber" size="sm" className="px-1.5 py-0 text-[10px]">
              Simulated
            </Badge>
          </div>
          <p className="text-amber-800/80 leading-relaxed text-[11px]">
            Password recovery is not connected to a live SMTP or transactional email service in this portfolio MVP.
          </p>
        </div>
      </div>

      {/* Success Status Alert */}
      {statusMessage && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2 text-left">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Form Error Banner */}
      {error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 text-left">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Forgot Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
        <div className="space-y-1.5">
          <label
            htmlFor="forgot-email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError(null)
              }}
              placeholder="you@example.com"
              autoComplete="email"
              className={`w-full pl-10 pr-3.5 py-2.5 bg-white rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                error ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center shadow-md cursor-pointer mt-2"
          disabled={isLoading}
          rightIcon={!isLoading ? <Send className="w-4 h-4" /> : undefined}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Sending link...</span>
            </div>
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>

      {/* Return to Sign In */}
      <div className="pt-2 text-center text-xs text-slate-600">
        Remember your password?{' '}
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
