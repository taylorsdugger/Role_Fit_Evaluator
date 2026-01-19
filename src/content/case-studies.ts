export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  context: string;
  challenge: string;
  approach: string;
  impact: string;
  learnings: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "saas-platform-scaling",
    title: "B2B SaaS Platform Scaling",
    description: "How we scaled a multi-tenant platform from 10 to 500+ customers while maintaining performance.",
    context:
      "A B2B SaaS platform serving mid-market customers was hitting scaling challenges. We had outgrown our initial architecture but lacked clear performance baselines.",
    challenge:
      "We needed to scale the platform without disrupting existing customers or requiring a full rewrite. The engineering team was small, and product velocity had to stay high.",
    approach:
      "First, I established performance baselines and identified bottlenecks through real customer usage patterns. Then I prioritized: database query optimization first, caching second, then infrastructure changes. Each change was validated before moving to the next.",
    impact:
      "Reduced query response times by 60%, which directly improved customer experience. We enabled 5x customer growth over 18 months without increasing operational complexity.",
    learnings:
      "Premature optimization is noise. Data-driven decisions on what to optimize first compound. Small, defensible changes compound faster than large rewrites. Trust your metrics.",
  },
  {
    id: "product-scope-discipline",
    title: "Scope Discipline in Product Development",
    description: "How saying no to good ideas made the product better.",
    context:
      "Early in a marketplace product, we had many opportunities to expand. Every request seemed reasonable, but velocity was dropping as scope crept.",
    challenge:
      "The team felt pressure to be responsive to every stakeholder idea. But responsiveness to every request becomes unresponsiveness to core users.",
    approach:
      "I worked with the team to define clear product principles: focus on the core user problem, measure impact, and ruthlessly deprioritize everything else. This meant declining 80% of feature requests, including some from high-profile partners.",
    impact:
      "Shipped the core marketplace feature 6 weeks faster. Customer satisfaction improved because we owned what we built. Revenue grew 3x because we solved a real problem deeply instead of many problems shallowly.",
    learnings:
      "The hard part of product is not ideas—it's discipline. Saying no publicly is harder than privately, but it builds trust. Velocity compounds when you protect focus.",
  },
];
