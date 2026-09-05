export interface ParsedPersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  linkedIn: string
  gitHub: string
  portfolioUrl?: string
}

export interface ParsedSkillItem {
  name: string
  confidence: 'High confidence' | 'Medium confidence' | 'Low confidence'
}

export interface ParsedSkillCategories {
  frontend: ParsedSkillItem[]
  backend: ParsedSkillItem[]
  database: ParsedSkillItem[]
  tools: ParsedSkillItem[]
}

export interface ParsedExperience {
  id: string
  role: string
  company: string
  location?: string
  startDate: string
  endDate: string
  current?: boolean
  responsibilities: string[]
}

export interface ParsedEducation {
  id: string
  degree: string
  institution: string
  year: string
  score?: string
}

export interface ParsedProject {
  id: string
  name: string
  technologies: string[]
  description: string
  link?: string
  githubLink?: string
}

export interface ParsedCertification {
  id: string
  title: string
  issuer: string
  issueDate: string
  credentialId?: string
}

export interface ParsingConfidenceMetrics {
  overall: number
  personalInfo: number
  skills: number
  experience: number
  education: number
  projects: number
}

export interface ParsedResume {
  personalInfo: ParsedPersonalInfo
  summary: string
  skills: ParsedSkillCategories
  workExperience: ParsedExperience[]
  education: ParsedEducation[]
  projects: ParsedProject[]
  certifications: ParsedCertification[]
  confidenceScores: ParsingConfidenceMetrics
  profileCompleteness: number
  missingItems: string[]
  fileName?: string
  fileSize?: string
  parsedAt?: string
}

export const defaultParsedResume: ParsedResume = {
  personalInfo: {
    name: 'Tushpendra Kumar',
    email: 'your@email.com',
    phone: '+91 XXXXX XXXXX',
    location: 'Noida, India',
    linkedIn: 'linkedin.com/in/codebytushu',
    gitHub: 'github.com/codebytushu',
    portfolioUrl: 'codebytushu.dev',
  },
  summary:
    'Software developer with hands-on experience building modern web applications using React.js, Node.js and related technologies.',
  skills: {
    frontend: [
      { name: 'React.js', confidence: 'High confidence' },
      { name: 'JavaScript', confidence: 'High confidence' },
      { name: 'HTML5', confidence: 'High confidence' },
      { name: 'CSS3', confidence: 'High confidence' },
      { name: 'Tailwind CSS', confidence: 'High confidence' },
      { name: 'TypeScript', confidence: 'Medium confidence' },
    ],
    backend: [
      { name: 'Node.js', confidence: 'High confidence' },
      { name: 'Express.js', confidence: 'High confidence' },
      { name: 'REST APIs', confidence: 'High confidence' },
    ],
    database: [
      { name: 'MongoDB', confidence: 'High confidence' },
      { name: 'MySQL', confidence: 'Medium confidence' },
    ],
    tools: [
      { name: 'Git', confidence: 'High confidence' },
      { name: 'GitHub', confidence: 'High confidence' },
      { name: 'Linux', confidence: 'High confidence' },
      { name: 'Nginx', confidence: 'Medium confidence' },
    ],
  },
  workExperience: [
    {
      id: 'exp-1',
      role: 'Linux Intern',
      company: 'Fostering Linux Services Pvt. Ltd.',
      location: 'Noida, India',
      startDate: 'Aug 2025',
      endDate: 'Jan 2026',
      responsibilities: [
        'Configured and administered Ubuntu server environments with systemd automation',
        'Implemented automated backup pipelines and monitored server health telemetry',
        'Assisted engineering teams with Nginx reverse proxy configuration and SSL certificate management',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
      institution: 'Dr. A.P.J. Abdul Kalam Technical University',
      year: '2021 – 2025',
      score: '8.4 CGPA',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'JobAI — AI Agentic Career Platform',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
      description:
        'Architected modern AI-assisted job discovery, resume intelligence, and candidate matching platform with explainable recommendations.',
      githubLink: 'https://github.com/codebytushu/jobai-agentic-saas',
    },
    {
      id: 'proj-2',
      name: 'Cloud Infrastructure Monitor',
      technologies: ['Node.js', 'Express.js', 'Linux', 'MongoDB'],
      description:
        'Built real-time system monitoring dashboard capturing CPU, memory, and disk usage metrics via socket streaming.',
      githubLink: 'https://github.com/codebytushu/cloud-infra-monitor',
    },
  ],
  certifications: [], // Initially empty: "No certifications detected"
  confidenceScores: {
    overall: 94,
    personalInfo: 98,
    skills: 96,
    experience: 92,
    education: 97,
    projects: 93,
  },
  profileCompleteness: 82,
  missingItems: [
    'Career preferences (culture & team size)',
    'Target roles (e.g. Senior Frontend / Full Stack)',
    'Preferred work mode (Remote / Hybrid flexibility)',
  ],
  fileName: 'Tushpendra_Kumar_Resume.pdf',
  fileSize: '2.4 MB',
  parsedAt: 'Today',
}
