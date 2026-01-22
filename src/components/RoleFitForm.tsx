"use client";

import React, { FormEvent, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { type ProfileType } from "@/lib/profiles";

interface RoleFitFormProps {
  onSubmit: (jobDescription: string, company?: string, profile?: ProfileType) => void;
  isLoading: boolean;
}

export function RoleFitForm({ onSubmit, isLoading }: RoleFitFormProps) {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      onSubmit(jobDescription.trim(), undefined, "senior-eng");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Job Description"
        placeholder="Paste the full job description here..."
        multiline
        minRows={8}
        maxRows={12}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        fullWidth
        required
        variant="outlined"
        sx={{
            '& .MuiInputBase-root': {
                resize: 'none', 
            },
            '& textarea': {
                resize: 'none', 
            }
        }}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isLoading || !jobDescription.trim()}
        sx={{ 
            py: 1.5, 
            fontSize: '1.1rem',
            fontWeight: 600,
            textTransform: 'none'
        }}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {isLoading ? "Analyzing..." : "Evaluate Role Fit"}
      </Button>
    </Box>
  );
}
