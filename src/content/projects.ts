export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accentColor: string;
  status: 'live' | 'archived' | 'wip';
}

export const projects: Project[] = [
  {
    slug: 'provider-match',
    title: 'Provider Matching Platform',
    subtitle: 'Event-Driven Microservices Migration',
    description:
      'Architected a real-time provider search and ranking system for a 20K+ contractor marketplace. Migrated from monolith to event-driven microservices using Kafka, Go, and OpenSearch — reducing search latency by 70%.',
    tags: ['TypeScript', 'Go', 'Kafka', 'OpenSearch', 'Kubernetes', 'NestJS'],
    accentColor: '#6366f1',
    status: 'live',
  },
  {
    slug: 'role-fit-evaluator',
    title: 'AI Role Fit Evaluator',
    subtitle: 'LLM-Powered Candidate Assessment',
    description:
      'Personal portfolio site with an AI-powered role fit evaluator that uses large language models to analyze job descriptions and score candidate alignment — replacing the static PDF resume.',
    tags: ['Next.js', 'TypeScript', 'OpenRouter', 'React', 'MUI'],
    accentColor: '#D0BCFF',
    status: 'live',
  },
  {
    slug: 'supply-chain-visibility',
    title: 'Supply Chain Visibility',
    subtitle: 'Real-Time Shipment Tracking at Scale',
    description:
      'Led re-architecture of a B2B supply chain visibility platform through 500% customer growth. Rebuilt frontend from AngularJS to React and built .NET APIs powering real-time tracking for 30M+ annual shipments.',
    tags: ['.NET', 'React', 'TypeScript', 'SQL Server', 'Azure'],
    accentColor: '#22c55e',
    status: 'archived',
  },
];
