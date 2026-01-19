import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold hover:text-gray-600 dark:hover:text-gray-400">
            Taylor Dugger
          </Link>
          <ul className="flex gap-6">
            <li>
              <Link href="/work" className="text-sm hover:text-gray-600 dark:hover:text-gray-400">
                Work
              </Link>
            </li>
            <li>
              <Link href="/role-fit" className="text-sm hover:text-gray-600 dark:hover:text-gray-400">
                Role Fit
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
