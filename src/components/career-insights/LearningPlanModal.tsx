import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface LearningPlanModalProps {
  isOpen: boolean
  onClose: () => void
  targetRole: string
}

const WEEKS_ROADMAP = [
  {
    week: 'Week 1',
    topic: 'Automated Unit & Component Testing',
    focus: 'Vitest & React Testing Library',
    outcome: 'Write test suites for core user flows in JobAI; assert props, userEvent interactions, and async loaders.',
    priority: 'High',
  },
  {
    week: 'Week 2',
    topic: 'Containerization & Cloud Sandboxing',
    focus: 'Docker & Multi-Container Compose',
    outcome: 'Create multi-stage Dockerfiles for client SPA and Express server; test deterministic local builds.',
    priority: 'High',
  },
  {
    week: 'Week 3',
    topic: 'Relational Database Optimization',
    focus: 'PostgreSQL, Joins & Prisma ORM',
    outcome: 'Model structured user application records in relational schemas; practice query indexing and migrations.',
    priority: 'Medium',
  },
  {
    week: 'Week 4',
    topic: 'Automated CI/CD Workflows',
    focus: 'GitHub Actions & Netlify Deploys',
    outcome: 'Set up automated pull request linting, build checks, and preview deployments on commit.',
    priority: 'Medium',
  },
]

export const LearningPlanModal: React.FC<LearningPlanModalProps> = ({
  isOpen,
  onClose,
  targetRole,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="4-Week Skill Gap Learning Roadmap"
      description={`Curated action plan designed to close requirement gaps for ${targetRole} positions.`}
      maxWidth="lg"
    >
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
          <span className="font-semibold text-slate-700">Self-Paced Engineering Milestones</span>
          <Badge variant="indigo" size="sm">
            4 Milestones
          </Badge>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {WEEKS_ROADMAP.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold text-xs">
                    {item.week}
                  </span>
                  <span className="font-bold text-xs text-slate-900">{item.topic}</span>
                </div>
                <Badge variant={item.priority === 'High' ? 'rose' : 'amber'} size="sm">
                  {item.priority} Impact
                </Badge>
              </div>

              <div className="text-xs text-indigo-900 font-medium pl-1">
                Core Stack: {item.focus}
              </div>

              <div className="text-xs text-slate-600 leading-relaxed pl-1">
                {item.outcome}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose} className="text-xs">
            Close
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            className="text-xs"
          >
            Save to My Career Goals
          </Button>
        </div>
      </div>
    </Modal>
  )
}
