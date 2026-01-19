import { CaseStudy } from "@/content/case-studies";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded p-6 space-y-4">
      <div>
        <h3 className="text-xl font-semibold">{study.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {study.description}
        </p>
      </div>

      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Context
          </h4>
          <p>{study.context}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Challenge
          </h4>
          <p>{study.challenge}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Approach
          </h4>
          <p>{study.approach}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Impact
          </h4>
          <p>{study.impact}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Key Learning
          </h4>
          <p>{study.learnings}</p>
        </div>
      </div>
    </div>
  );
}
