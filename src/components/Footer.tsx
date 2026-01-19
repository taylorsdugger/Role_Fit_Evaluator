export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 dark:text-gray-400">
        <p>© {currentYear} Taylor. All rights reserved.</p>
      </div>
    </footer>
  );
}
