Personal Website – Next.js (TypeScript) Build Requirements
1. Tech Stack (Locked)

Framework

Next.js (App Router)

TypeScript (strict mode)

Runtime

Node.js (default Next runtime)

Serverless functions for AI calls

Styling

Tailwind CSS or minimal CSS modules
(agent choice, default to Tailwind if unsure)

Hosting

Vercel (Hobby / free tier)

2. Project Setup Requirements
Repo

Public GitHub repository

Clean commit history (small, purposeful commits)

Initial Setup

npx create-next-app@latest with:

TypeScript: yes

ESLint: yes

App Router: yes

Tailwind: optional but recommended

src/ directory: yes

TypeScript

"strict": true

No any without justification

Types for all API inputs/outputs

3. Directory Structure (Recommended)
src/
  app/
    page.tsx                // Home
    work/
      page.tsx              // Case studies
    role-fit/
      page.tsx              // Role Fit Evaluator UI
    writing/
      page.tsx              // Optional
    api/
      role-fit/
        route.ts            // AI evaluator endpoint
  components/
    Layout.tsx
    Header.tsx
    Footer.tsx
    CaseStudy.tsx
    RoleFitForm.tsx
    RoleFitResult.tsx
  lib/
    roleFitPrompt.ts        // System prompt (verbatim)
    openrouter.ts           // API client
  content/
    case-studies.ts         // Structured data (not markdown initially)
  styles/
    globals.css


Agents can deviate slightly, but this separation is important.

4. Pages & Behavior (Next.js Specific)
Home (/)

Server Component

Static content

Clear headline + links

Work (/work)

Server Component

Case studies rendered from structured data

No client-side state

Role Fit (/role-fit)

Client Component

Form submission → POST to /api/role-fit

Loading + error states

Render result below form

API Route (/api/role-fit)

Server-only

Receives job description

Calls OpenRouter

Returns structured text response

5. Role Fit Evaluator – API Requirements
Endpoint

POST /api/role-fit

Request Body (TypeScript)
type RoleFitRequest = {
  jobDescription: string;
  company?: string;
};

Response
type RoleFitResponse = {
  result: string; // plain text, structured by the model
};

Implementation Rules

Inject system prompt from lib/roleFitPrompt.ts

Do not log user input

Enforce max token limits

Fail gracefully

6. System Prompt Handling (Important)

Store the full requirements prompt in lib/roleFitPrompt.ts

Import it verbatim into the API route

Do not modify at runtime

Treat it as configuration, not code

This makes intent explicit and auditable.

7. OpenRouter Integration
Requirements

API key via environment variable

Model chosen for:

Low cost

Fast response

Stability

Constraints

No streaming initially

Single-shot completion only

Conservative temperature (≤ 0.3)

8. UI & UX Requirements
Role Fit Page

One textarea (job description)

Optional input (company)

Submit button

Disable button while loading

Show result in readable, preformatted block

Copy

Short explanation above form

Explicit note that output is conservative

No chat UI. No avatars. No typing animations.

9. Performance & Quality Bars

Lighthouse performance ≥ 90

No console errors

No unused dependencies

Bundle size kept small

10. Agent Execution Order (Tell them this)

Scaffold Next.js project

Implement routing + empty pages

Add Role Fit UI (no AI yet)

Add API route + prompt wiring

Connect UI → API

Styling pass

Final cleanup

No feature creep.

11. What Agents Must Ask You Before Doing

Adding analytics

Changing prompt tone

Adding new AI features

Introducing authentication

Adding more pages

12. Definition of Done

The site is done when:

It deploys cleanly on Vercel

All pages render server-side where possible

The Role Fit Evaluator works end-to-end

You can explain every design decision