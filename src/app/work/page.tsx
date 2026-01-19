import { caseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/CaseStudy";

export default function WorkPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-3">Work</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Case studies on decisions, tradeoffs, and what I learned.
        </p>
      </div>

      <div className="space-y-6">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </div>
  );
}
