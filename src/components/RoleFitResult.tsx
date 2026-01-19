"use client";

interface RoleFitResultProps {
  result: string;
}

export function RoleFitResult({ result }: RoleFitResultProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded p-6 max-w-2xl">
      <h3 className="font-semibold mb-4 text-lg">Evaluation</h3>
      <pre className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre-wrap break-words font-mono">
        {result}
      </pre>
    </div>
  );
}
