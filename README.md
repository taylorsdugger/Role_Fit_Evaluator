# Personal Engineering Site

This repository contains my personal website and a small evaluation tool I built while actively exploring senior software engineering roles.

The goal is not self-promotion or novelty.
The goal is to make my thinking, judgment, and tradeoffs inspectable.

## Why this exists

Hiring is noisy. Resumes are compressed summaries of complex work, and interviews are short, artificial snapshots.

This site is an attempt to reduce that gap by showing:

- How I reason about product and engineering problems
- How I evaluate roles and teams before engaging deeply
- How I scope, build, and ship something small but complete

Everything here is intentionally minimal.

## What this site includes

### 1. Role Fit Evaluator

A single-purpose tool that evaluates how a role aligns with my background and how I would approach it.

It is:

- Conservative by design
- Explicit about strengths and gaps
- Focused on judgment, not persuasion

This is not a chatbot and not a resume replacement.
It reflects how I personally evaluate roles before applying or continuing conversations.

Why build this instead of a resume bot?
Because senior engineering value is better demonstrated through reasoning than claims.

## What this is not

- Not a portfolio of flashy UI or side projects
- Not optimized for SEO or growth
- Not a demonstration of every tool I've ever used

If something does not increase clarity or trust, it was left out.

## Technical approach

### Stack

- Next.js (App Router)
- TypeScript (strict)
- Node.js
- React & MUI
- Deployed on Vercel (Hobby tier)

### AI integration

- Single server-side API route
- System prompt treated as configuration, not code
- No client-side AI calls
- No conversation memory
- Conservative generation settings

## Setup & Deployment

### Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your OpenRouter API key

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Admin Page (Private)

A private admin route is available at `/admin` for advanced ATS resume matching analysis.

**Access:**
- Protected by HTTP Basic Authentication
- Set `ADMIN_USER` and `ADMIN_PASS` environment variables
- Browser will prompt for credentials when accessing `/admin`

**Features:**
- Upload job description and resume text
- ATS keyword matching analysis
- Match score calculation (0-100)
- Missing keyword identification
- Resume optimization suggestions
- Bullet point rewrites with reasoning

**Environment Variables Required:**
```bash
OPENROUTER_API_KEY=your_key_here
ADMIN_USER=your_username
ADMIN_PASS=your_password
```

### Building for Production

```bash
npm run build
npm start
```

### Deployment to Vercel

This site is configured for deployment on Vercel Hobby tier (free).

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Environment Variables on Vercel:**
- Add `OPENROUTER_API_KEY` to your Vercel project settings
- Add `ADMIN_USER` and `ADMIN_PASS` for admin page access (optional, only if using /admin)

### Key Implementation Details

**Role Fit Evaluator API:**
- Endpoint: `POST /api/role-fit`
- Input: `{ jobDescription: string, company?: string }`
- Output: `{ result: string }`
- System prompt: `src/lib/roleFitPrompt.ts` (verbatim, not modified at runtime)
- Model: `meta-llama/llama-3.1-8b-instruct:free` via OpenRouter
- Temperature: 0.2 (conservative, reproducible)
- Max tokens: 2000

**Architecture:**
- All pages are Server Components where possible
- Role Fit page is a Client Component to handle form state
- API calls are server-side only
- No client-side AI calls
- Types are strict throughout (TypeScript strict mode)

## Design philosophy

- Fast load times
- Minimal styling
- Accessible by default
- Static where possible
- No unnecessary abstractions

If something feels clever, it's probably wrong.

## Tradeoffs & constraints

- The evaluator is intentionally opinionated and limited in scope
- The site favors clarity over completeness
- There is no CMS, analytics pipeline, or auth layer
- Everything here should be easy to explain and defend live

These are conscious decisions, not omissions.

## Questions or feedback

I'm always interested in thoughtful discussion about:

- Product engineering tradeoffs
- Team effectiveness
- Sustainable delivery
- Hiring signal quality

---

License: MIT
Status: Actively maintained while I'm in the market
