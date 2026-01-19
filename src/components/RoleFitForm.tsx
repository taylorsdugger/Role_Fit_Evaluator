"use client";

import { FormEvent, useState } from "react";

interface RoleFitFormProps {
  onSubmit: (jobDescription: string, company?: string) => void;
  isLoading: boolean;
}

export function RoleFitForm({ onSubmit, isLoading }: RoleFitFormProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      onSubmit(jobDescription.trim(), company.trim() || undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          Company (optional)
        </label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="e.g., Acme Corp"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium mb-2">
          Job Description *
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          disabled={isLoading}
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Max 10,000 characters
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !jobDescription.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Evaluating..." : "Evaluate Role Fit"}
      </button>
    </form>
  );
}
