export interface MatchReason {
  skill: string
  status: 'strong' | 'match' | 'improve'
  note: string
}

export interface SkillGap {
  skill: string
  currentLevel: string
  recommendedLevel: string
  whyItMatters: string
}

export interface SkillComparison {
  skill: string
  userProfile: string
  jobRequirement: string
  matchStatus: 'match' | 'partial' | 'improve'
}

export interface MatchScoreBreakdown {
  skillsMatch: number
  experienceMatch: number
  technologyMatch: number
  careerGoals: number
  locationMatch: number
  label: string
  summary: string
}

export interface ApplicationReadiness {
  score: number
  resumeMatch: number
  skillsMatch: number
  profileCompleteness: number
  applicationContent: 'Ready' | 'In Progress'
  message: string
}

export interface Job {
  id: string
  title: string
  company: string
  companyLogoText: string
  companyColor: string
  industry: string
  companySize: string
  aboutCompany: string
  location: string
  workMode: 'Remote' | 'Hybrid' | 'On-site'
  jobType: 'Full Time' | 'Part Time' | 'Contract' | 'Internship'
  experience: 'Fresher' | '1–3 years' | '3–5 years' | '5+ years'
  salary: string
  salaryMinLpa: number
  salaryMaxLpa: number
  postedAt: string
  postedDaysAgo: number
  skills: string[]
  matchScore: number
  matchExplanation: string
  matchReasons: MatchReason[]
  descriptionPreview: string
  isFeatured?: boolean

  // Screen #3 Detailed Fields
  jobOverview: string
  responsibilities: string[]
  requirements: {
    requiredSkills: string[]
    experience: string
    education: string
  }
  matchScoreBreakdown: MatchScoreBreakdown
  aiRecommendationReasons: string[]
  skillGaps: SkillGap[]
  skillComparisons: SkillComparison[]
  applicationReadiness: ApplicationReadiness
  similarJobIds: string[]
}

export const initialJobsData: Job[] = [
  {
    id: 'job-1',
    title: 'Frontend Developer',
    company: 'Google',
    companyLogoText: 'G',
    companyColor: 'from-blue-500 to-red-500',
    industry: 'Technology',
    companySize: '10,000+ employees',
    aboutCompany: 'Google’s mission is to organize the world’s information and make it universally accessible and useful. Through products like Search, Maps, Gmail, and Android, Google helps billions of people connect, explore, and accomplish more every day.',
    location: 'Noida, India',
    workMode: 'Hybrid',
    jobType: 'Full Time',
    experience: '3–5 years',
    salary: '₹12–20 LPA',
    salaryMinLpa: 12,
    salaryMaxLpa: 20,
    postedAt: 'Posted 2 days ago',
    postedDaysAgo: 2,
    skills: ['React.js', 'JavaScript', 'TypeScript', 'REST APIs'],
    matchScore: 95,
    matchExplanation: 'Strong match based on your frontend development skills, JavaScript experience and relevant projects.',
    matchReasons: [
      { skill: 'React.js', status: 'strong', note: 'Strong match' },
      { skill: 'JavaScript', status: 'strong', note: 'Strong match' },
      { skill: 'REST APIs', status: 'strong', note: 'Strong match' },
      { skill: 'TypeScript', status: 'match', note: 'Partial match' },
    ],
    descriptionPreview: 'Join Google’s developer platforms team building next-generation frontend web systems with high performance and accessibility.',
    isFeatured: true,

    jobOverview: 'We are looking for a Frontend Developer to build responsive, scalable and user-focused web applications. The ideal candidate will work closely with product, design and engineering teams to deliver high-quality digital experiences across global scale.',
    responsibilities: [
      'Develop responsive and scalable web applications',
      'Build reusable frontend components and shared libraries',
      'Collaborate with designers and backend engineers to define technical APIs',
      'Integrate REST APIs and manage client-side state caching',
      'Optimize application performance for Core Web Vitals and low latency',
      'Write maintainable and clean code adhering to strict design guidelines',
      'Participate in code reviews and mentor junior frontend engineers',
      'Troubleshoot and resolve application issues and cross-browser regressions',
    ],
    requirements: {
      requiredSkills: ['React.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'REST APIs', 'Git'],
      experience: '3–5 years of professional frontend web development',
      education: 'Relevant technical degree (B.Tech / B.E. / MCA) or equivalent practical engineering experience',
    },
    matchScoreBreakdown: {
      skillsMatch: 96,
      experienceMatch: 92,
      technologyMatch: 95,
      careerGoals: 94,
      locationMatch: 90,
      label: 'Excellent Match',
      summary: 'This role strongly matches your skills, projects and career direction.',
    },
    aiRecommendationReasons: [
      'React.js experience matches the role requirements',
      'JavaScript experience aligns with the frontend responsibilities',
      'REST API knowledge supports the application\'s integration requirements',
      'Full-stack project experience adds relevant engineering exposure',
      'Current career direction aligns with the position',
    ],
    skillGaps: [
      {
        skill: 'TypeScript',
        currentLevel: 'Intermediate',
        recommendedLevel: 'Advanced',
        whyItMatters: 'Google web codebases enforce strict generic typing and zero runtime typing errors.',
      },
      {
        skill: 'Automated Testing',
        currentLevel: 'Beginner',
        recommendedLevel: 'Intermediate',
        whyItMatters: 'Unit and end-to-end test coverage (Jest, Playwright) is mandatory for production rollouts.',
      },
      {
        skill: 'Cloud Deployment',
        currentLevel: 'Beginner',
        recommendedLevel: 'Intermediate',
        whyItMatters: 'Familiarity with GCP containerized deployments and CDN caching speeds up ship cycles.',
      },
    ],
    skillComparisons: [
      { skill: 'React.js', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'JavaScript', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'TypeScript', userProfile: 'Intermediate', jobRequirement: 'Required', matchStatus: 'partial' },
      { skill: 'REST APIs', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'Cloud & Tooling', userProfile: 'Beginner', jobRequirement: 'Preferred', matchStatus: 'improve' },
    ],
    applicationReadiness: {
      score: 88,
      resumeMatch: 90,
      skillsMatch: 95,
      profileCompleteness: 82,
      applicationContent: 'Ready',
      message: 'Your profile is ready for this application. Consider improving two areas before applying.',
    },
    similarJobIds: ['job-2', 'job-3', 'job-4'],
  },
  {
    id: 'job-2',
    title: 'Software Engineer — Frontend',
    company: 'Microsoft',
    companyLogoText: 'MS',
    companyColor: 'from-blue-600 to-cyan-500',
    industry: 'Enterprise Software & Cloud',
    companySize: '10,000+ employees',
    aboutCompany: 'Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Its mission is to empower every person and every organization on the planet to achieve more.',
    location: 'Bengaluru, India',
    workMode: 'Hybrid',
    jobType: 'Full Time',
    experience: '3–5 years',
    salary: '₹15–25 LPA',
    salaryMinLpa: 15,
    salaryMaxLpa: 25,
    postedAt: 'Posted 3 days ago',
    postedDaysAgo: 3,
    skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    matchScore: 91,
    matchExplanation: 'Your frontend stack and project experience align strongly with this role.',
    matchReasons: [
      { skill: 'React.js', status: 'strong', note: 'Strong match' },
      { skill: 'Next.js', status: 'match', note: 'Match' },
      { skill: 'Tailwind CSS', status: 'strong', note: 'Strong match' },
      { skill: 'System Design', status: 'match', note: 'Match' },
      { skill: 'Azure cloud tooling', status: 'improve', note: 'Improve' },
    ],
    descriptionPreview: 'Deliver scalable, fluid experiences for millions of enterprise users on the Microsoft 365 core interface stack.',
    isFeatured: true,

    jobOverview: 'Microsoft 365 Core Engineering is seeking an experienced frontend software engineer to build seamless collaborative user interfaces. You will drive architecture decisions for high-availability enterprise web apps.',
    responsibilities: [
      'Architect and build resilient Next.js and React web portals',
      'Implement enterprise-grade accessibility (WCAG 2.1 AA compliant)',
      'Partner with UX researchers to translate workflows into performant interfaces',
      'Optimize bundle size and real-time collaboration web sockets',
      'Conduct automated cross-platform browser test suites',
      'Participate in on-call rotations and reliability engineering sprints',
    ],
    requirements: {
      requiredSkills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand', 'Git'],
      experience: '3–5 years in high-traffic web applications',
      education: 'Bachelor’s degree in Computer Science or equivalent practical experience',
    },
    matchScoreBreakdown: {
      skillsMatch: 93,
      experienceMatch: 90,
      technologyMatch: 92,
      careerGoals: 91,
      locationMatch: 88,
      label: 'High Compatibility',
      summary: 'High architectural synergy with Microsoft 365 frontend expectations.',
    },
    aiRecommendationReasons: [
      'Extensive React and Next.js familiarity directly maps to M365 frontend tech stacks',
      'Proven expertise in modern CSS architectures and modular design systems',
      'Solid experience in state synchronization and responsive layouts',
      'Alignment with Microsoft engineering standards and code excellence',
    ],
    skillGaps: [
      {
        skill: 'Azure Active Directory (Entra)',
        currentLevel: 'Beginner',
        recommendedLevel: 'Intermediate',
        whyItMatters: 'Enterprise auth flows in M365 utilize MSAL and Azure Entra ID tokens.',
      },
      {
        skill: 'WCAG Accessibility Standards',
        currentLevel: 'Intermediate',
        recommendedLevel: 'Advanced',
        whyItMatters: 'Microsoft products mandate total screen reader and keyboard accessibility.',
      },
    ],
    skillComparisons: [
      { skill: 'React.js', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'Next.js', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'TypeScript', userProfile: 'Intermediate', jobRequirement: 'Required', matchStatus: 'partial' },
      { skill: 'Tailwind CSS', userProfile: 'Strong', jobRequirement: 'Preferred', matchStatus: 'match' },
      { skill: 'Azure Tooling', userProfile: 'Beginner', jobRequirement: 'Preferred', matchStatus: 'improve' },
    ],
    applicationReadiness: {
      score: 86,
      resumeMatch: 88,
      skillsMatch: 92,
      profileCompleteness: 85,
      applicationContent: 'Ready',
      message: 'Excellent profile alignment. Tailor your resume to highlight enterprise React performance metrics.',
    },
    similarJobIds: ['job-1', 'job-5', 'job-6'],
  },
  {
    id: 'job-3',
    title: 'Full Stack Developer',
    company: 'Amazon',
    companyLogoText: 'A',
    companyColor: 'from-amber-500 to-orange-600',
    industry: 'E-Commerce & Cloud Computing',
    companySize: '10,000+ employees',
    aboutCompany: 'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.',
    location: 'Hyderabad, India',
    workMode: 'On-site',
    jobType: 'Full Time',
    experience: '1–3 years',
    salary: '₹10–18 LPA',
    salaryMinLpa: 10,
    salaryMaxLpa: 18,
    postedAt: 'Posted 1 day ago',
    postedDaysAgo: 1,
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    matchScore: 88,
    matchExplanation: 'Your full-stack project experience provides a strong foundation for this position.',
    matchReasons: [
      { skill: 'React.js', status: 'strong', note: 'Strong match' },
      { skill: 'Node.js', status: 'match', note: 'Match' },
      { skill: 'Express.js', status: 'match', note: 'Match' },
      { skill: 'MongoDB', status: 'match', note: 'Match' },
    ],
    descriptionPreview: 'Build high-traffic consumer checkout and backend distributed microservices handling millions of transactions.',

    jobOverview: 'Amazon Consumer Payments is hiring a Full Stack Developer to build high-conversion, mission-critical checkout interfaces and microservices serving millions of customers in India and emerging markets.',
    responsibilities: [
      'Develop frictionless checkout UI components with high availability',
      'Architect resilient Node.js services and document REST API schemas',
      'Implement real-time payment gateway error handling and telemetry',
      'Collaborate with backend distributed systems teams on API contracts',
    ],
    requirements: {
      requiredSkills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git'],
      experience: '1–3 years of web application and backend development',
      education: 'B.E./B.Tech in Computer Science, IT or related fields',
    },
    matchScoreBreakdown: {
      skillsMatch: 90,
      experienceMatch: 88,
      technologyMatch: 89,
      careerGoals: 87,
      locationMatch: 86,
      label: 'Solid Match',
      summary: 'Strong foundational match for high-volume full-stack customer facing products.',
    },
    aiRecommendationReasons: [
      'Core JavaScript, React and Node.js fundamentals align with Amazon stack',
      'Proven experience in REST API integrations and MongoDB database schema design',
      'High growth trajectory for full-stack engineering candidates',
    ],
    skillGaps: [
      {
        skill: 'AWS CloudWatch & Alarms',
        currentLevel: 'Beginner',
        recommendedLevel: 'Intermediate',
        whyItMatters: 'Amazon requires engineers to monitor their own operational telemetry.',
      },
    ],
    skillComparisons: [
      { skill: 'React.js', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'Node.js', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'Express.js', userProfile: 'Intermediate', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'MongoDB', userProfile: 'Intermediate', jobRequirement: 'Required', matchStatus: 'match' },
    ],
    applicationReadiness: {
      score: 84,
      resumeMatch: 86,
      skillsMatch: 89,
      profileCompleteness: 80,
      applicationContent: 'Ready',
      message: 'Profile is competitive. Highlight full-stack accomplishments in your application bullets.',
    },
    similarJobIds: ['job-1', 'job-4', 'job-5'],
  },
  {
    id: 'job-4',
    title: 'AI Application Developer',
    company: 'AI Startup',
    companyLogoText: 'AS',
    companyColor: 'from-violet-600 to-indigo-600',
    industry: 'Artificial Intelligence & SaaS',
    companySize: '50–200 employees',
    aboutCompany: 'Fast-growing generative AI startup creating intelligent copilot tools, autonomous workflows, and automated reasoning agents.',
    location: 'Remote',
    workMode: 'Remote',
    jobType: 'Full Time',
    experience: '1–3 years',
    salary: '₹8–16 LPA',
    salaryMinLpa: 8,
    salaryMaxLpa: 16,
    postedAt: 'Posted 2 days ago',
    postedDaysAgo: 2,
    skills: ['JavaScript', 'React.js', 'REST APIs', 'AI Integration'],
    matchScore: 86,
    matchExplanation: 'This role aligns with your software development background and growing AI application experience.',
    matchReasons: [
      { skill: 'React.js', status: 'strong', note: 'Strong match' },
      { skill: 'JavaScript', status: 'strong', note: 'Strong match' },
      { skill: 'REST APIs', status: 'strong', note: 'Strong match' },
      { skill: 'AI Integration', status: 'match', note: 'Match' },
    ],
    descriptionPreview: 'Build next-generation generative AI interfaces, streaming chat components, and prompt engineering toolkits.',

    jobOverview: 'We are looking for an AI Application Developer to craft responsive generative AI copilot experiences. You will integrate modern LLM APIs, design streaming UI states, and build intuitive agent control dashboards.',
    responsibilities: [
      'Develop reactive AI copilot components and streaming chat interfaces',
      'Integrate LLM endpoints (OpenAI, Anthropic) with error fallback handling',
      'Build reusable design components and frontend client-side state engines',
      'Collaborate with machine learning engineers to test prompting pipelines',
    ],
    requirements: {
      requiredSkills: ['JavaScript', 'React.js', 'REST APIs', 'AI Integration', 'Tailwind CSS'],
      experience: '1–3 years in web applications with AI interest or project exposure',
      education: 'B.Tech / B.E. / BCA / MCA or equivalent practical portfolio',
    },
    matchScoreBreakdown: {
      skillsMatch: 88,
      experienceMatch: 86,
      technologyMatch: 85,
      careerGoals: 87,
      locationMatch: 95,
      label: 'Strong AI Fit',
      summary: 'High potential synergy for expanding into production AI development.',
    },
    aiRecommendationReasons: [
      'Strong React and frontend fundamentals enable immediate productivity',
      'Hands-on experience with REST API integrations and state caching',
      'Ideal career launchpad for full-time generative AI application engineering',
    ],
    skillGaps: [
      {
        skill: 'Vector Embeddings & RAG',
        currentLevel: 'Beginner',
        recommendedLevel: 'Intermediate',
        whyItMatters: 'Context-aware search requires understanding semantic chunking and retrieval.',
      },
    ],
    skillComparisons: [
      { skill: 'React.js', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'JavaScript', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'REST APIs', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'AI Integration', userProfile: 'Intermediate', jobRequirement: 'Required', matchStatus: 'match' },
    ],
    applicationReadiness: {
      score: 85,
      resumeMatch: 86,
      skillsMatch: 88,
      profileCompleteness: 82,
      applicationContent: 'Ready',
      message: 'Excellent profile alignment. Showcase interactive AI demos and web apps.',
    },
    similarJobIds: ['job-1', 'job-6', 'job-5'],
  },
  {
    id: 'job-7',
    title: 'UI Developer',
    company: 'Zomato',
    companyLogoText: 'Z',
    companyColor: 'from-rose-500 to-red-600',
    industry: 'Food Tech & Quick Commerce',
    companySize: '5,000+ employees',
    aboutCompany: 'Zomato connects customers with great food across India. With millions of daily orders and high-speed delivery networks, our products solve real-world logistical and dining experiences.',
    location: 'Gurgaon, India',
    workMode: 'Hybrid',
    jobType: 'Full Time',
    experience: '1–3 years',
    salary: '₹8–15 LPA',
    salaryMinLpa: 8,
    salaryMaxLpa: 15,
    postedAt: 'Posted 5 days ago',
    postedDaysAgo: 5,
    skills: ['React.js', 'JavaScript', 'CSS', 'Material UI'],
    matchScore: 84,
    matchExplanation: 'Matches your design system implementation abilities and mobile-first responsive coding.',
    matchReasons: [
      { skill: 'React.js', status: 'match', note: 'Match' },
      { skill: 'CSS / Responsive', status: 'strong', note: 'Strong match' },
      { skill: 'UI Animations', status: 'match', note: 'Match' },
      { skill: 'Performance Profiling', status: 'improve', note: 'Improve' },
    ],
    descriptionPreview: 'Collaborate with product designers to craft delightful food delivery and merchant interfaces across web platforms.',

    jobOverview: 'Zomato’s design engineering team is looking for a creative UI Developer passionate about micro-interactions, responsive CSS layouts, and building seamless merchant and consumer portals.',
    responsibilities: [
      'Translate Figma mockups into pixel-perfect React components',
      'Implement silky-smooth 60fps web animations and transitions',
      'Maintain and document the internal design system component tokens',
      'Ensure snappy performance on mobile browsers and mid-range devices',
    ],
    requirements: {
      requiredSkills: ['React.js', 'JavaScript', 'CSS3 / SCSS', 'Responsive Design', 'Material UI / Tailwind'],
      experience: '1–3 years creating consumer-facing web apps',
      education: 'Any graduate degree with demonstrable design engineering portfolio',
    },
    matchScoreBreakdown: {
      skillsMatch: 86,
      experienceMatch: 85,
      technologyMatch: 83,
      careerGoals: 84,
      locationMatch: 82,
      label: 'Strong Creative Match',
      summary: 'Excellent alignment for design-conscious engineers.',
    },
    aiRecommendationReasons: [
      'Strong CSS layout and responsive design capability verified',
      'Experience in design token libraries and component architectures',
      'Quick-commerce and consumer tech domain match',
    ],
    skillGaps: [
      {
        skill: 'Web Vitals Performance Profiling',
        currentLevel: 'Beginner',
        recommendedLevel: 'Intermediate',
        whyItMatters: 'Mobile quick-commerce web apps demand strict LCP and INP budgets.',
      },
    ],
    skillComparisons: [
      { skill: 'React.js', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'CSS & Layouts', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'JavaScript', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'Animations', userProfile: 'Intermediate', jobRequirement: 'Preferred', matchStatus: 'partial' },
    ],
    applicationReadiness: {
      score: 83,
      resumeMatch: 85,
      skillsMatch: 86,
      profileCompleteness: 81,
      applicationContent: 'Ready',
      message: 'Good readiness. Link to interactive UI demos or live portfolio links for highest impact.',
    },
    similarJobIds: ['job-1', 'job-3', 'job-5'],
  },
  {
    id: 'job-5',
    title: 'Full Stack Developer',
    company: 'Microsoft',
    companyLogoText: 'MS',
    companyColor: 'from-blue-600 to-indigo-600',
    industry: 'Enterprise Software & Cloud',
    companySize: '10,000+ employees',
    aboutCompany: 'Microsoft cloud services power global enterprises, delivering mission-critical SaaS, developer tooling, and AI platforms.',
    location: 'Noida, India',
    workMode: 'Hybrid',
    jobType: 'Full Time',
    experience: '3–5 years',
    salary: '₹12–22 LPA',
    salaryMinLpa: 12,
    salaryMaxLpa: 22,
    postedAt: 'Posted 1 day ago',
    postedDaysAgo: 1,
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    matchScore: 82,
    matchExplanation: 'Good alignment on full stack JavaScript stack with opportunities to strengthen distributed cloud knowledge.',
    matchReasons: [
      { skill: 'React.js', status: 'strong', note: 'Strong match' },
      { skill: 'Node.js', status: 'match', note: 'Match' },
      { skill: 'MongoDB', status: 'match', note: 'Match' },
      { skill: 'Microservices', status: 'improve', note: 'Improve' },
    ],
    descriptionPreview: 'Design and deploy end-to-end cloud tools, microservices, and internal analytics portals for Azure enterprise teams.',

    jobOverview: 'Join the Azure Developer Experience engineering pod developing internal tools, telemetry dashboards, and cloud orchestration portals for enterprise clients.',
    responsibilities: [
      'Build end-to-end features across React frontend and Node.js microservices',
      'Design RESTful APIs and document schemas with OpenAPI / Swagger',
      'Manage database schemas and query indexing in MongoDB / CosmosDB',
      'Automate testing and deployment pipelines via Azure DevOps',
    ],
    requirements: {
      requiredSkills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git'],
      experience: '3–5 years of full stack web development experience',
      education: 'B.Tech / B.E. in Computer Science or related degree',
    },
    matchScoreBreakdown: {
      skillsMatch: 84,
      experienceMatch: 82,
      technologyMatch: 81,
      careerGoals: 82,
      locationMatch: 81,
      label: 'Good Fit',
      summary: 'Solid full-stack engineering position with enterprise growth upside.',
    },
    aiRecommendationReasons: [
      'Complete full stack JavaScript coverage across client and server layers',
      'Hands-on experience with REST integrations and database modeling',
      'Strong fit for candidates seeking deeper enterprise cloud engineering exposure',
    ],
    skillGaps: [
      {
        skill: 'Microservices & Event Queues',
        currentLevel: 'Beginner',
        recommendedLevel: 'Intermediate',
        whyItMatters: 'Azure services communicate via asynchronous messaging bus architectures.',
      },
    ],
    skillComparisons: [
      { skill: 'React.js', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'Node.js', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'MongoDB', userProfile: 'Intermediate', jobRequirement: 'Required', matchStatus: 'partial' },
      { skill: 'Distributed Systems', userProfile: 'Beginner', jobRequirement: 'Preferred', matchStatus: 'improve' },
    ],
    applicationReadiness: {
      score: 80,
      resumeMatch: 82,
      skillsMatch: 84,
      profileCompleteness: 78,
      applicationContent: 'Ready',
      message: 'Application ready. Consider highlighting backend performance and database optimizations.',
    },
    similarJobIds: ['job-1', 'job-2', 'job-9'],
  },
  {
    id: 'job-6',
    title: 'AI Systems Engineer',
    company: 'OpenAI Ecosystem Partner',
    companyLogoText: 'AI',
    companyColor: 'from-emerald-600 to-teal-600',
    industry: 'Artificial Intelligence & Agents',
    companySize: '200–500 employees',
    aboutCompany: 'Pioneering production autonomous agent systems, multimodal reasoning workflows, and enterprise developer tools.',
    location: 'Remote',
    workMode: 'Remote',
    jobType: 'Full Time',
    experience: '1–3 years',
    salary: '₹20–35 LPA',
    salaryMinLpa: 20,
    salaryMaxLpa: 35,
    postedAt: 'Posted 12 hours ago',
    postedDaysAgo: 0.5,
    skills: ['Python', 'Node.js', 'React.js', 'Docker', 'AWS'],
    matchScore: 94,
    matchExplanation: 'Exceptional match with modern AI toolchains, workflow pipelines, and full-stack integration.',
    matchReasons: [
      { skill: 'AI Orchestration', status: 'strong', note: 'Strong match' },
      { skill: 'Python APIs', status: 'strong', note: 'Strong match' },
      { skill: 'Docker', status: 'match', note: 'Match' },
      { skill: 'Vector Databases', status: 'match', note: 'Match' },
    ],
    descriptionPreview: 'Architect agentic workflows, autonomous LLM pipelines, and developer copilot interfaces.',
    isFeatured: true,

    jobOverview: 'We are seeking an AI Systems Engineer to build state-of-the-art agentic automation pipelines, vector similarity indices, and reactive frontend copilots for engineering teams worldwide.',
    responsibilities: [
      'Design autonomous agent pipelines and human-in-the-loop validation tools',
      'Integrate LLM API streams with low-latency React client interfaces',
      'Deploy containerized Python services using Docker and AWS ECS',
      'Optimize vector database embeddings and semantic retrieval accuracy',
    ],
    requirements: {
      requiredSkills: ['Python', 'Node.js', 'React.js', 'Docker', 'AWS', 'Vector Databases', 'Git'],
      experience: '1–3 years in software engineering with hands-on AI application development',
      education: 'B.Tech/M.Tech in CS or demonstrable production AI portfolio',
    },
    matchScoreBreakdown: {
      skillsMatch: 95,
      experienceMatch: 93,
      technologyMatch: 96,
      careerGoals: 95,
      locationMatch: 92,
      label: 'Exceptional Match',
      summary: 'Outstanding alignment with next-generation agentic and AI application development.',
    },
    aiRecommendationReasons: [
      'Demonstrated expertise in building AI copilots and agentic workflow visualizations',
      'Strong full stack foundation connecting Python AI backends with modern React UIs',
      'High alignment with remote, high-impact startup product teams',
    ],
    skillGaps: [
      {
        skill: 'Fine-tuning & LoRA',
        currentLevel: 'Beginner',
        recommendedLevel: 'Intermediate',
        whyItMatters: 'Custom domain models benefit from lightweight adapter tuning.',
      },
    ],
    skillComparisons: [
      { skill: 'Python', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'React.js', userProfile: 'Strong', jobRequirement: 'Required', matchStatus: 'match' },
      { skill: 'Docker', userProfile: 'Intermediate', jobRequirement: 'Required', matchStatus: 'partial' },
      { skill: 'AWS', userProfile: 'Intermediate', jobRequirement: 'Required', matchStatus: 'partial' },
    ],
    applicationReadiness: {
      score: 92,
      resumeMatch: 94,
      skillsMatch: 95,
      profileCompleteness: 88,
      applicationContent: 'Ready',
      message: 'High priority match. Your portfolio projects in AI agent automation make you a standout candidate.',
    },
    similarJobIds: ['job-1', 'job-2', 'job-9'],
  },
]
