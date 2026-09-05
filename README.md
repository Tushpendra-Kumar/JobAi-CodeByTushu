# JobAI — Next-Generation AI Career Copilot & Autonomous SaaS Platform

<div align="center">

![JobAI Platform Banner](https://img.shields.io/badge/JobAI-Platform%20SaaS-4F46E5?style=for-the-badge&logo=probot&logoColor=white)
![Author](https://img.shields.io/badge/Engineered%20by-CodeByTushu-8B5CF6?style=for-the-badge)
![React 19](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Netlify Ready](https://img.shields.io/badge/Deployment-Netlify%20Ready-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

<p align="center">
  <strong>An autonomous, end-to-end AI career copilot designed to eliminate recruitment opacity, streamline ATS resume optimization, personalize grounded application materials, and automate multi-channel job hunting with strict human-in-the-loop oversight.</strong>
</p>

[**Explore Live Demo**](#live-demo--preview) &bull;
[**Architecture Overview**](#system-architecture--service-layer) &bull;
[**15-Screen Roadmap**](#the-15-screen-product-roadmap) &bull;
[**Security & Ethics**](#zero-fabrication-ethical-ai-standard) &bull;
[**Local Setup**](#quick-start--local-development)

</div>

---

## 🌟 Executive Summary

**JobAI** is a production-grade, 15-screen AI Agentic SaaS application built as a portfolio flagship by **CodeByTushu**. It bridges the gap between technical job applicants and modern algorithmic hiring filters (Applicant Tracking Systems like Greenhouse, Lever, and Workday).

Unlike simplistic wrappers, JobAI is engineered with a **multi-agent service architecture**, a **zero-fabrication ethical safety gate**, **real-time A4 PDF resume synthesis**, **explainable neural match compatibility scoring**, and an **interactive Kanban pipeline tracker**.

### ✨ Key Highlights
- **15 Production-Grade Screens**: Seamless user journeys from initial discovery to offer acceptance.
- **Dedicated Recruiter Entry Gateway**: Clean, distraction-free authentication view without premature portal headers for external visitors opening the site from a resume hyperlink.
- **Client-Side Privacy**: All profiles, candidate details, applications, and saved jobs persist locally in browser storage with zero third-party tracking or data monetization.
- **Deterministic AI Engine**: Robust mock AI service abstractions with realistic network latency, error handling, and structured telemetry.
- **Fully Responsive**: First-class mobile viewport optimization with a floating bottom navigation bar and an interactive AI Hub bottom sheet.
- **Zero Dead Links**: 100% interactive footer links connected to dynamic screen navigations and a 7-tab information and policy modal.

---

## 🚀 Live Demo & Preview

- **GitHub Repository**: [https://github.com/Tushpendra-Kumar/JobAi-CodeByTushu](https://github.com/Tushpendra-Kumar/JobAi-CodeByTushu)
- **Deployment Platform**: Netlify (Continuous Deployment via Git & Single-Page Application rewrite rules)
- **Evaluation Account**: 1-Click Demo Login (`demo@jobai.app`) or any valid email with any non-empty password.

---

## 🗺️ The 15-Screen Product Roadmap

JobAI was engineered through a disciplined 15-screen iterative design and implementation lifecycle:

| # | Screen / Module | Primary Capabilities & Architectural Highlights |
|---|---|---|
| **01** | **High-Conversion Landing Page** | Hero section with dynamic typography, prominent search bar, metric counters, 3-tier value props, and copilot workflow timeline. |
| **02** | **Job Discovery & Search Engine** | Dual-input search (keywords & location), multi-criteria filter bar (remote, salary, role level), instant bookmarking, and pagination. |
| **03** | **Role Details & Requirement Breakdown** | In-depth role breakdown view, key responsibilities, skill badges, company culture highlights, and 1-click apply action. |
| **04** | **AI Job Compatibility Dashboard** | Multi-dimensional matching algorithm (85%+ standard), explainable rationale, skill-gap diagnostics, and strength highlights. |
| **05** | **AI Resume Parser & Profile Extractor** | Drag-and-drop dropzone, simulated parsing progress bar, extracted section review, and inline edit modal. |
| **06** | **Resume ATS Benchmark & Diagnostic** | Real-time ATS compatibility scoring (e.g. 88/100), keyword density audit, formatting verification, and actionable recommendations. |
| **07** | **Interactive Live A4 Resume Builder** | Real-time A4 layout, dynamic template switching (Modern, Minimalist, Tech Lead), section reordering, and PDF export preview. |
| **08** | **Autonomous Auto-Apply Pipeline** | Human-in-the-loop pre-flight checklist, custom submission rules, audit log stream, and automated rate-limiting safety. |
| **09** | **Kanban Application Tracking Hub** | 5-stage Kanban board (Saved, Applied, Interviewing, Offered, Rejected), quick stage updates, timeline logs, and status analytics. |
| **10** | **AI Cover Letter Generator** | Role-targeted cover letters strictly aligned with verified resume facts, tone adjusters, and before-after diff modal. |
| **11** | **AI Career Insights Dashboard** | Technical skill readiness matrix, market trajectory prediction, radar chart visualization, and automated 30-day learning plan. |
| **12** | **Profile & Comprehensive Settings Hub** | 6 tabbed setting categories, personal data export, connected platforms telemetry, and dark/light system preferences. |
| **13** | **SaaS Pricing & Plan Management** | Monthly/yearly billing toggle, feature comparison matrix, quota telemetry meters, and simulated plan upgrade modal. |
| **14** | **Mobile Experience & Responsive System** | Adaptive layout system, floating bottom navigation, and slide-up Mobile AI Hub drawer. |
| **15** | **Authentication & Access Gateway** | Clean unauthenticated public gateway, route guard protection, 1-click demo login, and session persistence. |

---

## 🏗️ System Architecture & Service Layer

JobAI employs a modular frontend service layer separating data ingestion, heuristic intelligence, and UI rendering:

```
src/
├── components/                 # Presentation and container components
│   ├── applications/           # Screen #9: Kanban tracker and application cards
│   ├── auth/                   # Screen #15: Login, Signup, Forgot Password, and Auth Layout
│   ├── auto-apply/             # Screen #8: Auto-apply checklist and pipeline runner
│   ├── career-insights/        # Screen #11: Career readiness, skill radar, learning plans
│   ├── cover-letter/           # Screen #10: AI Cover Letter editor, diff modal, quality scoring
│   ├── footer/                 # Global 7-tab Footer Information & Documentation Modal
│   ├── job-details/            # Screen #3: Detailed opportunity breakdown
│   ├── jobs/                   # Screen #2: Job search, listing, filter workspace
│   ├── landing/                # Screen #1: Hero, features, metrics, workflow
│   ├── layout/                 # Sticky Navbar and responsive Footer
│   ├── matching/               # Screen #4: AI recommendations and explainability cards
│   ├── mobile/                 # Screen #14: Mobile bottom bar, AI Hub drawer, network indicator
│   ├── pricing/                # Screen #13: Pricing cards, billing toggle, usage telemetry
│   ├── profile-settings/       # Screen #12: Profile settings, security, privacy
│   ├── resume/                 # Screen #5: Resume dropzone and parsing view
│   ├── resume-analysis/        # Screen #6: ATS audit report and keyword benchmarks
│   ├── resume-builder/         # Screen #7: Live A4 builder, templates, PDF export
│   └── ui/                     # Reusable design system (Button, Badge, Card, Modal, Toast)
├── config/                     # Pricing tiers, feature matrices, and constants
├── data/                       # Initial jobs dataset, mock candidate profile, and resume models
├── lib/                        # Utility helpers (cn, formatting, class merger)
└── services/                   # Business logic and simulated AI engines
    ├── applicationTrackingService.ts
    ├── authService.ts          # Centralized session, demo directory, route protection
    ├── careerInsightsService.ts
    ├── coverLetterAIService.ts
    ├── coverLetterService.ts
    ├── matchingService.ts      # Multi-dimensional matching and skill gap engine
    ├── profileSettingsService.ts
    ├── resumeParserService.ts
    ├── resumeVersionService.ts
    └── subscriptionService.ts
```

---

## 🛡️ Zero-Fabrication Ethical AI Standard

A primary design requirement of JobAI is **truthfulness grounding**. The system enforces strict architectural constraints:

1. **No Hallucinated Credentials**: Cover letters and resume optimizations only cite verified experience, employers, education, and metrics present in the candidate profile.
2. **Human-in-the-Loop Approval**: Automated application submissions require explicit applicant pre-flight review before dispatch.
3. **Transparent Match Scoring**: Job compatibility percentages are accompanied by plain-English explanations of matched qualifications and identified skill gaps.
4. **Client-Side Privacy**: No personal data or uploaded resumes are transmitted to external servers or ad networks. Data resides in the applicant's browser session.

---

## 🔒 Security & Safe Deployment Checklist

- [x] **Zero Secrets in Repository**: No `.env` files, API private keys, passwords, or service account credentials are committed.
- [x] **Hardened `.gitignore`**: Blocks environment variables (`.env*`), production builds (`dist/`), dependencies (`node_modules/`), and OS temporary metadata.
- [x] **Netlify SPA Configuration**: Configured both `netlify.toml` and `public/_redirects` to handle client-side routing rewrites (`/* /index.html 200`) without 404 errors.
- [x] **Strict Static Analysis**: Verified 0 errors and 0 warnings on `oxlint`.
- [x] **Zero TypeScript Errors**: Compiles cleanly with `tsc -b && vite build`.

---

## 💻 Quick Start & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm, pnpm, or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Tushpendra-Kumar/JobAi-CodeByTushu.git
cd JobAi-CodeByTushu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized static bundle in the `dist/` directory ready for deployment to Netlify, Vercel, or AWS S3/CloudFront.

### 5. Run Linter
```bash
npm run lint
```

---

## 👤 Author & Attribution

**Engineered with precision and agentic intelligence by CodeByTushu.**

- **Lead Developer**: Tushpendra Kumar ([CodeByTushu](https://github.com/Tushpendra-Kumar))
- **Email**: [codebytushu@gmail.com](mailto:codebytushu@gmail.com)
- **GitHub**: [@Tushpendra-Kumar](https://github.com/Tushpendra-Kumar)
- **Role Target**: Full Stack / Frontend / AI Systems Engineer

---

## 📄 License

This project is created and presented as a software engineering portfolio demonstration. All rights reserved by **CodeByTushu**.
