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
      'Architected a real-time provider search and ranking system for a 20K+ contractor marketplace. Migrated from monolith to event-driven microservices using Node.JS, TypeScript, Kafka, and OpenSearch — reducing search latency by 70%.',
    tags: ['TypeScript', 'Go', 'Kafka', 'OpenSearch', 'Kubernetes', 'NestJS'],
    accentColor: '#6366f1',
    status: 'live',
  },
  {
    slug: 'supply-chain-visibility',
    title: 'Supply Chain Visibility Platform',
    subtitle: 'AngularJS to React Migration',
    description:
      'Led the full frontend modernization of a B2B supply chain visibility platform used by logistics operators tracking global shipments across five transport modes. Migrated from AngularJS to React through 300%+ client growth, reducing load times by 60%+ and accelerating feature delivery.',
    tags: ['JavaScript', 'React', 'Redux', 'Node.js', 'TypeScript', 'Elasticsearch', 'Azure'],
    accentColor: '#22c55e',
    status: 'archived',
  },
];
