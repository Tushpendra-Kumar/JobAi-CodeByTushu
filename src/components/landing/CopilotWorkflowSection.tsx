import { useState } from 'react'
import {
  Compass,
  FileSearch,
  UserCheck,
  FileCheck,
  FileEdit,
  Kanban,
  Bot,
  ShieldCheck,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export const CopilotWorkflowSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  const steps = [
    {
      id: 'discovery',
      title: 'Job Discovery',
      icon: <Compass className="w-5 h-5" />,
      tag: 'Stage 1',
      summary: 'Scans verified tech roles & remote positions matching criteria.',
      description:
        'The agent continuously gathers open opportunities from company career portals and verified feeds based on your domain, target seniority, and compensation preferences.',
      agentRole: 'Discovery Agent',
      userControl: 'Define search keywords & target locations',
      output: 'Aggregated raw job specs queue',
    },
    {
      id: 'analysis',
      title: 'Job Analysis',
      icon: <FileSearch className="w-5 h-5" />,
      tag: 'Stage 2',
      summary: 'Deconstructs responsibilities, stacks & core qualifications.',
      description:
        'The analysis agent extracts core competencies, must-have technologies, bonus attributes, and employer expectations into a structured specification format.',
      agentRole: 'Spec Parser Agent',
      userControl: 'Review parsed requirements',
      output: 'Structured requirements matrix',
    },
    {
      id: 'profile',
      title: 'Profile Matching',
      icon: <UserCheck className="w-5 h-5" />,
      tag: 'Stage 3',
      summary: 'Computes deep semantic compatibility against your profile.',
      description:
        'Using vector embeddings, the system scores the alignment between your historical projects, skills, and the role expectations to produce a reliable match percentage.',
      agentRole: 'Embedding Matcher',
      userControl: 'Filter by minimum match threshold (e.g. 85%+)',
      output: 'Compatibility score & skill gaps',
    },
    {
      id: 'resume',
      title: 'Resume Matching',
      icon: <FileCheck className="w-5 h-5" />,
      tag: 'Stage 4',
      summary: 'Audits ATS score, phrasing & keyword density.',
      description:
        'Your resume is evaluated against candidate filters to ensure your accomplishments speak the exact technical language required by modern ATS algorithms.',
      agentRole: 'ATS Diagnostic Agent',
      userControl: 'Approve or customize keyword suggestions',
      output: 'ATS score (0-100) & phrase improvements',
    },
    {
      id: 'prep',
      title: 'Application Preparation',
      icon: <FileEdit className="w-5 h-5" />,
      tag: 'Stage 5',
      summary: 'Drafts bespoke cover letter & role-targeted bullet points.',
      description:
        'Prepares targeted application assets tailored specifically to this position, highlighting your most relevant metrics and experiences.',
      agentRole: 'Synthesis Agent',
      userControl: 'Full human-in-the-loop review & inline editing',
      output: 'Custom cover letter & bullet suggestions',
    },
    {
      id: 'tracking',
      title: 'Application Tracking',
      icon: <Kanban className="w-5 h-5" />,
      tag: 'Stage 6',
      summary: 'Visual Kanban pipeline organizing interview stages & follow-ups.',
      description:
        'Tracks submission timestamps, recruiter responses, screening milestones, and schedules automated reminder checkpoints.',
      agentRole: 'Pipeline Tracker',
      userControl: 'Drag-and-drop Kanban status management',
      output: 'Centralized application board & timeline',
    },
  ]

  const currentStep = steps[activeStepIndex]

  return (
    <section id="workflow-section" className="py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="purple" size="md">
            Supervised Agentic Pipeline
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Your AI Career Copilot
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Your AI career agent helps turn job searching into an intelligent, organized workflow.
          </p>
        </div>

        {/* Workflow Concept Disclaimer Notice */}
        <div className="max-w-3xl mx-auto mb-10 rounded-xl bg-white border border-slate-200/90 p-4 shadow-xs flex items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Bot className="w-4 h-4" />
            </div>
            <span>
              <strong>Concept Architecture:</strong> Interactive demonstration of the planned end-to-end autonomous pipeline.
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Human-Supervised</span>
          </div>
        </div>

        {/* Step Navigation Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {steps.map((step, idx) => {
            const isActive = activeStepIndex === idx
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                    : 'bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span
                    className={`p-2 rounded-lg ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {step.icon}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    0{idx + 1}
                  </span>
                </div>
                <h4
                  className={`text-xs font-bold leading-snug ${
                    isActive ? 'text-indigo-900' : 'text-slate-800'
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {step.summary}
                </p>
              </button>
            )
          })}
        </div>

        {/* Deep Dive Inspector for Selected Step */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Step Details */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <Badge variant="indigo" size="sm">
                  {currentStep.tag}
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  Agent ID: {currentStep.agentRole}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {currentStep.title} Workflow
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {currentStep.description}
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-semibold text-slate-800 block mb-1">
                    Candidate Control:
                  </span>
                  <span className="text-slate-600">{currentStep.userControl}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-semibold text-slate-800 block mb-1">
                    Engine Artifact:
                  </span>
                  <span className="text-slate-600">{currentStep.output}</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Terminal / Inspector View */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-slate-800 bg-[#0A0F1D] p-4 text-left shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-slate-300">copilot.telemetry</span>
                  </div>
                  <span className="font-mono text-indigo-400">STAGE {activeStepIndex + 1}/6</span>
                </div>
                <div className="mt-3 font-mono text-xs space-y-2 text-slate-300">
                  <p className="text-indigo-400">
                    &gt; Initializing {currentStep.agentRole}...
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Status: <span className="text-emerald-400">Ready for Execution</span>
                  </p>
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                    <span className="text-slate-500">Output Payload:</span>
                    <p className="text-emerald-300 mt-1 font-semibold">
                      ✓ {currentStep.output}
                    </p>
                  </div>
                  <p className="text-slate-500 text-[10px] pt-1">
                    Next: {activeStepIndex < 5 ? steps[activeStepIndex + 1].title : 'Complete Cycle'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() =>
                      setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : steps.length - 1))
                    }
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() =>
                      setActiveStepIndex((prev) => (prev < 5 ? prev + 1 : 0))
                    }
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
