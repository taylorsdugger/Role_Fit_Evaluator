export type ProjectStatus =
  | "live"
  | "published"
  | "wip"
  | "archived"
  | "private";

export type ProjectCategory = "work" | "personal";

export interface ProjectLink {
  label: string;
  href: string;
  icon: "live" | "github" | "store";
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accentColor: string;
  status: ProjectStatus;
  category: ProjectCategory;
  /** Personal projects link out to these instead of an internal case-study page. */
  links?: ProjectLink[];
  /** Featured personal projects are highlighted and surfaced first. */
  featured?: boolean;
  /** Card thumbnail (path under /public). Falls back to a monogram banner when omitted. */
  image?: string;
  /** Footer note shown on cards without external links. */
  note?: string;
}

export const projects: Project[] = [
  // ── Professional work — deep case studies with internal detail pages ──
  {
    slug: "provider-match",
    title: "Provider Matching Platform",
    subtitle: "Event-Driven Microservices Migration",
    description:
      "Architected a real-time provider search and ranking system for a 20K+ contractor marketplace. Migrated from monolith to event-driven microservices using Node.JS, TypeScript, Kafka, and OpenSearch — reducing search latency by 70%.",
    tags: ["TypeScript", "Go", "Kafka", "OpenSearch", "Kubernetes", "NestJS"],
    accentColor: "#6366f1",
    status: "live",
    category: "work",
    image: "/images/provider-match-visual.jpg",
  },
  {
    slug: "supply-chain-visibility",
    title: "Supply Chain Visibility Platform",
    subtitle: "AngularJS to React Migration",
    description:
      "Led the full frontend modernization of a B2B supply chain visibility platform used by logistics operators tracking global shipments across five transport modes. Migrated from AngularJS to React through 300%+ client growth, reducing load times by 60%+ and accelerating feature delivery.",
    tags: [
      "JavaScript",
      "React",
      "Redux",
      "Node.js",
      "TypeScript",
      "Elasticsearch",
      "Azure",
    ],
    accentColor: "#22c55e",
    status: "archived",
    category: "work",
    image: "/images/vision.jpg",
  },

  // ── Personal projects — link out to live demos, code, and stores ──
  {
    slug: "tattoo-trap",
    title: "Tattoo Trap",
    subtitle: "Visual Similarity Search",
    description:
      "Upload a reference tattoo and find local artists whose work visually matches. CLIP embeddings run entirely in the browser, ranked against artist portfolios with Supabase pgvector — fed by a Python crawl-and-embed pipeline.",
    tags: ["Next.js", "TypeScript", "Python", "CLIP", "pgvector", "Supabase"],
    accentColor: "#7C5CFF",
    status: "live",
    category: "personal",
    featured: true,
    image: "/images/tattoo-trap.jpg",
    links: [
      {
        label: "Live demo",
        href: "https://tattoo-trap.vercel.app/",
        icon: "live",
      },
      {
        label: "Code",
        href: "https://github.com/taylorsdugger/tattoo-trap",
        icon: "github",
      },
    ],
  },
  {
    slug: "recipe-vault",
    title: "Recipe Vault",
    subtitle: "Published Obsidian Plugin",
    description:
      "A full recipe management system for Obsidian — import any recipe from a URL via JSON-LD, browse a visual gallery, and build shopping lists automatically with unit merging. Published in the Obsidian community plugin store.",
    tags: ["TypeScript", "Obsidian API", "OpenRouter", "Handlebars"],
    accentColor: "#14b8a6",
    status: "published",
    image: "/images/recipe-vault.png",
    category: "personal",
    featured: true,
    links: [
      {
        label: "Obsidian store",
        href: "https://community.obsidian.md/plugins/recipe-vault",
        icon: "store",
      },
      {
        label: "Code",
        href: "https://github.com/taylorsdugger/obsidian-recipe-vault",
        icon: "github",
      },
    ],
  },
  {
    slug: "home-atlas",
    title: "Home Atlas",
    subtitle: "Home Management App",
    description:
      "A full-stack home organizer — Track maintenance, capital improvements, warranties, and documents in one calm, considered record and keep a complete export you own forever.",
    tags: ["Next.js 16", "TypeScript", "Supabase", "Auth.js", "Mapbox"],
    accentColor: "#3b82f6",
    image: "/images/home-atlas.png",
    status: "wip",
    category: "personal",
    note: "Private repo · launching as a product soon",
  },
  {
    slug: "trace",
    title: "Trace",
    subtitle: "AI CBT Journal",
    description:
      "A CBT journaling app with semantic memory, entries are embedded so relevant past reflections surface as you write, paired with a Socratic AI panel and weekly theme summaries generated on a schedule.",
    tags: ["Next.js", "TypeScript", "Supabase", "OpenRouter", "Embeddings"],
    accentColor: "#fb7185",
    status: "private",
    category: "personal",
    image: "/images/trace.png",
    note: "Private · a personal project",
  },
];

export const workProjects = projects.filter((p) => p.category === "work");
export const personalProjects = projects.filter(
  (p) => p.category === "personal",
);

const STATUS_META: Record<ProjectStatus, { label: string }> = {
  live: { label: "Live" },
  published: { label: "Published" },
  wip: { label: "In development" },
  archived: { label: "Archived" },
  private: { label: "Private" },
};

export function statusLabel(status: ProjectStatus): string {
  return STATUS_META[status].label;
}
