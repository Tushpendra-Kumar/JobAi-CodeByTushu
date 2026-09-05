import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  Shield,
  Laptop,
  AlertTriangle,
  Trash2,
} from 'lucide-react'
import type { AccountSettingsData } from '@/services/profileSettingsService'
import { DeleteAccountModal } from './DeleteAccountModal'

interface AccountSecuritySectionProps {
  data: AccountSettingsData
  onChange: (updated: Partial<AccountSettingsData>) => void
  onResetAccount: () => void
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export const AccountSecuritySection: React.FC<AccountSecuritySectionProps> = ({
  data,
  onChange,
  onResetAccount,
  onToast,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleToggleConnection = (key: 'connectedGoogle' | 'connectedGitHub' | 'connectedLinkedIn') => {
    const nextState = !data[key]
    onChange({ [key]: nextState })
    const serviceName = key === 'connectedGoogle' ? 'Google' : key === 'connectedGitHub' ? 'GitHub' : 'LinkedIn'
    onToast(
      nextState
        ? `${serviceName} account simulated connection enabled.`
        : `${serviceName} account disconnected.`,
      'info'
    )
  }

  return (
    <Card className="p-6 border-slate-200/90 shadow-sm space-y-7">
      {/* Header */}
      <div className="pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">Account & Security</h3>
          <Badge variant="indigo" size="sm">
            Session & Access
          </Badge>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your login credentials, connected authentication providers, and browser session status.
        </p>
      </div>

      {/* Demo Account Notice Banner */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-800">Portfolio Demo Session</span>
          </div>
          <Badge variant="emerald" size="sm">
            Active Portfolio Access
          </Badge>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          JobAI is currently running in frictionless demo access mode. Session data and preferences are saved locally to your browser&apos;s <code className="text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded text-[11px]">localStorage</code>. Production OAuth and encrypted password authentication will be integrated in backend phases.
        </p>
      </div>

      {/* Authentication & Email Details */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Account Identification
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-[11px] font-medium text-slate-400">Primary Account Email</span>
            <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span>{data.email}</span>
              <Badge variant="emerald" size="sm" className="text-[10px]">
                Verified
              </Badge>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-[11px] font-medium text-slate-400">Account Type & Membership</span>
            <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span>{data.accountType}</span>
              <span className="text-slate-400 font-normal">({data.memberSince})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Connected SSO Providers (Simulated)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Google */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-slate-800">Google Account</div>
              <div className="text-[11px] text-slate-400">
                {data.connectedGoogle ? 'Connected' : 'Not linked'}
              </div>
            </div>
            <Button
              variant={data.connectedGoogle ? 'outline' : 'secondary'}
              size="sm"
              onClick={() => handleToggleConnection('connectedGoogle')}
              className="text-xs py-1 px-2.5 h-7"
            >
              {data.connectedGoogle ? 'Disconnect' : 'Connect'}
            </Button>
          </div>

          {/* GitHub */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-slate-800">GitHub</div>
              <div className="text-[11px] text-slate-400">
                {data.connectedGitHub ? 'Connected' : 'Not linked'}
              </div>
            </div>
            <Button
              variant={data.connectedGitHub ? 'outline' : 'secondary'}
              size="sm"
              onClick={() => handleToggleConnection('connectedGitHub')}
              className="text-xs py-1 px-2.5 h-7"
            >
              {data.connectedGitHub ? 'Disconnect' : 'Connect'}
            </Button>
          </div>

          {/* LinkedIn */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-slate-800">LinkedIn</div>
              <div className="text-[11px] text-slate-400">
                {data.connectedLinkedIn ? 'Connected' : 'Not linked'}
              </div>
            </div>
            <Button
              variant={data.connectedLinkedIn ? 'outline' : 'secondary'}
              size="sm"
              onClick={() => handleToggleConnection('connectedLinkedIn')}
              className="text-xs py-1 px-2.5 h-7"
            >
              {data.connectedLinkedIn ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
        </div>
      </div>

      {/* Active Session & Device Telemetry */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Current Device Session
        </h4>

        <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-2xs">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span>Windows Workstation • Chrome Desktop</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active"></span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Bangalore, India • Current active session • Local storage synchronized
              </p>
            </div>
          </div>
          <Badge variant="slate" size="sm">
            Current
          </Badge>
        </div>
      </div>

      {/* Danger Zone: Reset / Delete Account */}
      <div className="p-4.5 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-3 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Danger Zone: Reset Demo Profile Data</span>
            </div>
            <p className="text-xs text-rose-950/70 max-w-xl leading-relaxed">
              Resetting will wipe all personalized resume versions, saved job bookmarks, tracked application boards, and custom AI priority weights from your local browser storage.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            className="text-xs shrink-0 shadow-xs bg-rose-600 hover:bg-rose-700 text-white"
          >
            Delete / Reset
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={onResetAccount}
        userEmail={data.email}
      />
    </Card>
  )
}
