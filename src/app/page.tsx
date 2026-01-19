import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Taylor Dugger</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Senior Software Engineer
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
        <p>
          I build products that solve real problems. I&apos;ve worked on B2B SaaS, marketplaces, and platform-adjacent systems.
        </p>

        <p>
          This site is an attempt to make my thinking inspectable. Not a resume, not a portfolio—just how I reason about problems and work.
        </p>

        <p>
          Everything here is minimal. If it doesn&apos;t increase clarity, it was left out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="border border-gray-200 dark:border-gray-800 p-6 rounded">
          <h2 className="text-xl font-semibold mb-3">Work</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Case studies on decisions, tradeoffs, and impact.
          </p>
          <Link
            href="/work"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            Read case studies →
          </Link>
        </div>

        <div className="border border-gray-200 dark:border-gray-800 p-6 rounded">
          <h2 className="text-xl font-semibold mb-3">Role Fit</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            How I evaluate whether a role is a good mutual fit.
          </p>
          <Link
            href="/role-fit"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            Evaluate a role →
          </Link>
        </div>
      </div>
    </div>
  );
}
