import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  Code2,
  Wrench,
  HeartHandshake,
  Plus,
  X,
  Search,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import type {
  ProfileSkillItem,
  SkillCategory,
  SkillProficiency,
} from '@/services/profileSettingsService'

interface SkillsManagementSectionProps {
  skills: ProfileSkillItem[]
  onChange: (updatedSkills: ProfileSkillItem[]) => void
}

const PROFICIENCY_COLORS: Record<SkillProficiency, string> = {
  Expert: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  Advanced: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  Intermediate: 'bg-sky-100 text-sky-800 border-sky-300',
  Beginner: 'bg-amber-100 text-amber-800 border-amber-300',
}

const COMMON_SKILL_SUGGESTIONS: { name: string; category: SkillCategory }[] = [
  // Technical
  { name: 'TypeScript', category: 'technical' },
  { name: 'React.js', category: 'technical' },
  { name: 'Next.js', category: 'technical' },
  { name: 'Node.js', category: 'technical' },
  { name: 'Express.js', category: 'technical' },
  { name: 'PostgreSQL', category: 'technical' },
  { name: 'MongoDB', category: 'technical' },
  { name: 'Tailwind CSS', category: 'technical' },
  { name: 'GraphQL', category: 'technical' },
  { name: 'Python', category: 'technical' },
  // Tools
  { name: 'Git & GitHub', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'Vitest / Jest', category: 'tools' },
  { name: 'CI/CD Pipelines', category: 'tools' },
  { name: 'AWS Cloud', category: 'tools' },
  { name: 'Postman', category: 'tools' },
  { name: 'Linux CLI', category: 'tools' },
  // Soft
  { name: 'Technical Communication', category: 'soft' },
  { name: 'Agile & Scrum', category: 'soft' },
  { name: 'Problem Solving', category: 'soft' },
  { name: 'Code Reviewing', category: 'soft' },
  { name: 'System Design', category: 'soft' },
]

export const SkillsManagementSection: React.FC<SkillsManagementSectionProps> = ({
  skills,
  onChange,
}) => {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | SkillCategory>('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newSkillName, setNewSkillName] = useState('')
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>('technical')
  const [newSkillProficiency, setNewSkillProficiency] = useState<SkillProficiency>('Advanced')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSkills = skills.filter((s) => {
    const matchesCategory = selectedCategoryTab === 'all' || s.category === selectedCategoryTab
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleRemoveSkill = (skillId: string) => {
    onChange(skills.filter((s) => s.id !== skillId))
  }

  const handleUpdateProficiency = (skillId: string, newProf: SkillProficiency) => {
    onChange(
      skills.map((s) => (s.id === skillId ? { ...s, proficiency: newProf } : s))
    )
  }

  const handleAddSkill = () => {
    const trimmed = newSkillName.trim()
    if (!trimmed) return

    // Prevent duplicates (case-insensitive)
    const exists = skills.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())
    if (exists) {
      alert(`"${trimmed}" is already in your skills inventory.`)
      return
    }

    const newSkill: ProfileSkillItem = {
      id: `skill-${trimmed.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${skills.length + 1}`,
      name: trimmed,
      category: newSkillCategory,
      proficiency: newSkillProficiency,
      yearsOfExperience: 2,
    }

    onChange([...skills, newSkill])
    setNewSkillName('')
    setIsAddModalOpen(false)
  }

  const handleQuickAdd = (suggestion: typeof COMMON_SKILL_SUGGESTIONS[0]) => {
    const exists = skills.some((s) => s.name.toLowerCase() === suggestion.name.toLowerCase())
    if (exists) return

    const newSkill: ProfileSkillItem = {
      id: `skill-${suggestion.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${skills.length + 1}`,
      name: suggestion.name,
      category: suggestion.category,
      proficiency: 'Advanced',
      yearsOfExperience: 2,
    }
    onChange([...skills, newSkill])
  }

  const technicalCount = skills.filter((s) => s.category === 'technical').length
  const toolsCount = skills.filter((s) => s.category === 'tools').length
  const softCount = skills.filter((s) => s.category === 'soft').length

  return (
    <Card className="p-6 border-slate-200/90 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Skills Management</h3>
            <Badge variant="indigo" size="sm">
              {skills.length} Total Skills
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure your technical frameworks, engineering tools, and soft competencies. You control proficiency levels directly.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
          className="text-xs shadow-xs"
        >
          Add Skill
        </Button>
      </div>

      {/* Category Tabs & Quick Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl">
          <button
            type="button"
            onClick={() => setSelectedCategoryTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategoryTab === 'all'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Skills ({skills.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategoryTab('technical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategoryTab === 'technical'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-600" />
            Technical ({technicalCount})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategoryTab('tools')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategoryTab === 'tools'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-amber-600" />
            Tools & Platforms ({toolsCount})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategoryTab('soft')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategoryTab === 'soft'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
            Soft Skills ({softCount})
          </button>
        </div>

        <div className="w-full sm:w-52">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            leftIcon={<Search className="w-3.5 h-3.5 text-slate-400" />}
            className="text-xs py-1.5"
          />
        </div>
      </div>

      {/* Skills Chips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="p-3 rounded-xl border border-slate-200/90 bg-white hover:border-indigo-300 transition-all shadow-2xs flex items-center justify-between gap-2 group"
          >
            <div className="min-w-0 flex items-center gap-2">
              <span
                className={`p-1.5 rounded-lg shrink-0 ${
                  skill.category === 'technical'
                    ? 'bg-indigo-50 text-indigo-600'
                    : skill.category === 'tools'
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-rose-50 text-rose-600'
                }`}
              >
                {skill.category === 'technical' ? (
                  <Code2 className="w-3.5 h-3.5" />
                ) : skill.category === 'tools' ? (
                  <Wrench className="w-3.5 h-3.5" />
                ) : (
                  <HeartHandshake className="w-3.5 h-3.5" />
                )}
              </span>

              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-800 truncate block">
                  {skill.name}
                </span>

                {/* Proficiency Selector Dropdown */}
                <select
                  value={skill.proficiency}
                  onChange={(e) =>
                    handleUpdateProficiency(
                      skill.id,
                      e.target.value as SkillProficiency
                    )
                  }
                  aria-label={`Proficiency for ${skill.name}`}
                  className={`text-[10px] font-semibold rounded px-1.5 py-0.5 border cursor-pointer mt-0.5 focus:outline-none ${
                    PROFICIENCY_COLORS[skill.proficiency]
                  }`}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleRemoveSkill(skill.id)}
              className="p-1 rounded-md text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title={`Remove ${skill.name}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {filteredSkills.length === 0 && (
          <div className="col-span-full py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-xs text-slate-500 font-medium">
              No skills found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
            >
              + Add it now
            </button>
          </div>
        )}
      </div>

      {/* Quick Suggestions Shelf */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-xs font-bold text-slate-700">Popular In-Demand Tech:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_SKILL_SUGGESTIONS.filter(
            (item) => !skills.some((s) => s.name.toLowerCase() === item.name.toLowerCase())
          )
            .slice(0, 8)
            .map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleQuickAdd(item)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-medium transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-slate-400" />
                {item.name}
              </button>
            ))}
        </div>
      </div>

      {/* Truthfulness Notice */}
      <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-500 leading-relaxed">
          <strong className="text-slate-700">User-Controlled Proficiency:</strong> JobAI never assumes or falsifies technical proficiency. You have total authority to classify your skills as Beginner, Intermediate, Advanced, or Expert.
        </p>
      </div>

      {/* Add Skill Modal / Inline Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">Add New Skill</h4>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Skill Name
                </label>
                <Input
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Next.js, Docker, Microservices..."
                  className="text-xs"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as SkillCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="technical">Technical Framework / Language</option>
                  <option value="tools">Tool, Platform or DevOps</option>
                  <option value="soft">Soft Skill or Methodology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Proficiency Level
                </label>
                <select
                  value={newSkillProficiency}
                  onChange={(e) =>
                    setNewSkillProficiency(e.target.value as SkillProficiency)
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Beginner">Beginner (Basic understanding)</option>
                  <option value="Intermediate">Intermediate (Used in projects)</option>
                  <option value="Advanced">Advanced (Production experienced)</option>
                  <option value="Expert">Expert (Deep mastery & mentoring)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddModalOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddSkill}
                className="text-xs"
              >
                Add Skill
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
