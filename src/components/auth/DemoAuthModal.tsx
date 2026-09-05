import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Mail, Lock, User, Sparkles, Eye, EyeOff } from 'lucide-react'

import { login, signup } from '@/services/authService'

export interface DemoAuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: 'login' | 'signup'
  onAuthSuccess: (user: { email: string; name?: string }) => void
}

export const DemoAuthModal: React.FC<DemoAuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login',
  onAuthSuccess,
}) => {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validate = (): boolean => {
    const errs: { email?: string; password?: string } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email.trim()) {
      errs.email = 'Email address is mandatory.'
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. user@domain.com).'
    }

    if (!password.trim()) {
      errs.password = 'Password is required to proceed.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)

    try {
      if (tab === 'signup') {
        const res = await signup(name || email.split('@')[0], email, password)
        if (res.success && res.user) {
          onAuthSuccess({ email: res.user.email, name: res.user.name })
          onClose()
          setEmail('')
          setPassword('')
          setName('')
          setErrors({})
        } else {
          setErrors({ form: res.error })
        }
      } else {
        const res = await login(email, password)
        if (res.success && res.user) {
          onAuthSuccess({ email: res.user.email, name: res.user.name })
          onClose()
          setEmail('')
          setPassword('')
          setName('')
          setErrors({})
        } else {
          setErrors({ form: res.error })
        }
      }
    } catch {
      setErrors({ form: 'Authentication error occurred.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tab === 'login' ? 'Welcome Back to JobAI' : 'Create Your JobAI Account'}
      description="Access your autonomous career copilot and application pipeline"
      maxWidth="md"
    >
      {/* Demo Mode Notice Badge */}
      <div className="mb-5 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 text-xs text-indigo-950 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-indigo-900">
            <span>Portfolio Demo Access</span>
            <Badge variant="indigo" size="sm" className="px-1.5 py-0 text-[10px]">
              Demo
            </Badge>
          </div>
          <p className="text-indigo-800/80 leading-relaxed text-[11px]">
            Password verification is bypassed for demonstration access. Enter any valid-looking email and any password to test the platform.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 mb-5">
        <button
          type="button"
          onClick={() => {
            setTab('login')
            setErrors({})
          }}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            tab === 'login'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setTab('signup')
            setErrors({})
          }}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            tab === 'signup'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Create Account
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {tab === 'signup' && (
          <Input
            label="Full Name (Optional for Demo)"
            type="text"
            placeholder="e.g. Alex Morgan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
          />
        )}

        <Input
          label="Email Address (Mandatory)"
          type="email"
          placeholder="developer@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
          }}
          error={errors.email}
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />

        <Input
          label="Password (Any value for Demo)"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
          }}
          error={errors.password}
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-slate-700 transition-colors focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          required
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center h-11"
            isLoading={isLoading}
          >
            {tab === 'login' ? 'Continue with Demo Sign In' : 'Activate Demo Account'}
          </Button>
        </div>

        <p className="text-[11px] text-center text-slate-400 pt-1">
          Simulated demo environment • Powered by{' '}
          <span className="font-semibold text-slate-600">CodeByTushu</span>
        </p>
      </form>
    </Modal>
  )
}
