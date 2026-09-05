export interface CandidateSkill {
  name: string
  level: 'Strong' | 'Intermediate' | 'Beginner'
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'ai' | 'tools'
  yearsOfExperience: number
}

export interface CandidateProfile {
  id: string
  fullName: string
  title: string
  summary: string
  email: string
  location: string
  preferredLocations: string[]
  preferredWorkModes: ('Remote' | 'Hybrid' | 'On-site')[]
  preferredRoles: string[]
  experienceYears: number
  experienceLevel: 'Fresher' | '1–3 years' | '3–5 years' | '5+ years'
  expectedSalaryLpa: { min: number; max: number }
  skills: CandidateSkill[]
  profileCompleteness: number
  completenessChecklist: {
    label: string
    completed: boolean
    description: string
  }[]
  careerFitRoles: {
    role: string
    score: number
  }[]
}

export const defaultCandidateProfile: CandidateProfile = {
  id: 'cand-001',
  fullName: 'Arjun Verma',
  title: 'Frontend & Full Stack Engineer',
  summary:
    'Frontend-focused software engineer with 3+ years of experience building modern React, TypeScript, and responsive web applications with microservices and API integrations.',
  email: 'arjun.verma@example.com',
  location: 'Noida, India',
  preferredLocations: ['Noida', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Remote'],
  preferredWorkModes: ['Remote', 'Hybrid', 'On-site'],
  preferredRoles: [
    'Frontend Developer',
    'Full Stack Developer',
    'Software Developer',
    'AI Developer',
    'UI Developer',
  ],
  experienceYears: 3.5,
  experienceLevel: '3–5 years',
  expectedSalaryLpa: { min: 14, max: 24 },
  skills: [
    { name: 'React.js', level: 'Strong', category: 'frontend', yearsOfExperience: 3.5 },
    { name: 'JavaScript', level: 'Strong', category: 'frontend', yearsOfExperience: 4.0 },
    { name: 'TypeScript', level: 'Intermediate', category: 'frontend', yearsOfExperience: 2.0 },
    { name: 'Next.js', level: 'Strong', category: 'frontend', yearsOfExperience: 2.5 },
    { name: 'HTML', level: 'Strong', category: 'frontend', yearsOfExperience: 4.0 },
    { name: 'CSS', level: 'Strong', category: 'frontend', yearsOfExperience: 4.0 },
    { name: 'Tailwind CSS', level: 'Strong', category: 'frontend', yearsOfExperience: 3.0 },
    { name: 'REST APIs', level: 'Strong', category: 'tools', yearsOfExperience: 3.5 },
    { name: 'Git', level: 'Strong', category: 'tools', yearsOfExperience: 4.0 },
    { name: 'Node.js', level: 'Strong', category: 'backend', yearsOfExperience: 2.5 },
    { name: 'Express.js', level: 'Intermediate', category: 'backend', yearsOfExperience: 2.0 },
    { name: 'MongoDB', level: 'Intermediate', category: 'database', yearsOfExperience: 2.0 },
    { name: 'AI Integration', level: 'Intermediate', category: 'ai', yearsOfExperience: 1.0 },
    { name: 'Automated Testing', level: 'Beginner', category: 'tools', yearsOfExperience: 1.0 },
    { name: 'Cloud Deployment', level: 'Beginner', category: 'devops', yearsOfExperience: 1.0 },
    { name: 'CI/CD', level: 'Beginner', category: 'devops', yearsOfExperience: 1.0 },
  ],
  profileCompleteness: 82,
  completenessChecklist: [
    { label: 'Basic information', completed: true, description: 'Name, title, verified contact email' },
    { label: 'Technical skills', completed: true, description: '16 verified frameworks and tools' },
    { label: 'Education', completed: true, description: 'B.Tech in Computer Science & Engineering' },
    { label: 'Projects', completed: true, description: '4 production GitHub repositories connected' },
    { label: 'Career preferences', completed: false, description: 'Specify target startup vs enterprise culture' },
  ],
  careerFitRoles: [
    { role: 'Frontend Development', score: 92 },
    { role: 'Full Stack Development', score: 89 },
    { role: 'AI Application Development', score: 82 },
  ],
}
