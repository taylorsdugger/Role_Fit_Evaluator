"use client";

import { useState } from "react";
import { type ProfileType } from "@/lib/profiles";
import { RoleFitForm } from "@/components/RoleFitForm";
import { RoleFitResult } from "@/components/RoleFitResult";

export default function RoleFitPage() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluate = async (
    jobDescription: string,
    company?: string,
    profile?: ProfileType
  ) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/role-fit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          company,
          profile: profile || "senior-eng",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `API error: ${response.status}`
        );
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-3">Role Fit Evaluator</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Paste a job description to see how I evaluate role fit.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          This tool is designed to be honest about strengths, gaps, and alignment.
          Not a pitch—just clear thinking.
        </p>
      </div>

      <RoleFitForm onSubmit={handleEvaluate} isLoading={isLoading} />

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded text-sm max-w-2xl">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      {result && <RoleFitResult result={result} />}
    </div>
  );
}
