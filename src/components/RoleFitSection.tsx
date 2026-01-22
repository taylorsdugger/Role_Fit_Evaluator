"use client";

import React, { useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { type ProfileType } from "@/lib/profiles";
import { RoleFitForm } from "./RoleFitForm";
import { RoleFitResult } from "./RoleFitResult";
import { ScrollAnimation } from "./ScrollAnimation";

export function RoleFitSection() {
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

    // Debugging: Log that function is called
    console.log("handleEvaluate called with:", { jobDescription, company, profile });

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
      console.log("Evaluation result received:", data);
      setResult(data.result);
      
      // Auto-scroll to results
      setTimeout(() => {
        const resultElement = document.getElementById('fit-results');
        if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (err) {
      console.error("Evaluation error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while analyzing the role."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="section" id="role-fit-section" sx={{ py: { xs: 10, md: 20 }, bgcolor: 'background.paper', scrollMarginTop: '64px' }}>
      <Container maxWidth="lg">
       <ScrollAnimation>
         <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                AI Role Fit Evaluator
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 800, mx: 'auto' }}>
                Paste a job description below to see how my skills and experience match the role.
                This uses my actual resume and work history to generate a personalized analysis.
            </Typography>
         </Box>

         <Box sx={{ maxWidth: 800, mx: 'auto', mb: 10 }}>
            <RoleFitForm onSubmit={handleEvaluate} isLoading={isLoading} />
            
            {error && (
                <Alert severity="error" sx={{ mt: 4 }}>
                    {error}
                </Alert>
            )}
         </Box>
       </ScrollAnimation>

        {result && (
            <Box sx={{ scrollMarginTop: '100px' }} id="fit-results">
                <ScrollAnimation>
                    <RoleFitResult result={result} />
                </ScrollAnimation>
            </Box>
        )}
      </Container>
    </Box>
  );
}
