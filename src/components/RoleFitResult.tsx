"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

interface RoleFitResultProps {
  result: string;
}

export function RoleFitResult({ result }: RoleFitResultProps) {
  let content = result;
  let fitLevel = "Unknown";

  try {
      // Clean up markdown code blocks if present in the raw string before parsing
      const cleanJson = result.replace(/^```json\n|\n```$/g, '').trim();
      
      if (cleanJson.trim().startsWith('{') && cleanJson.trim().endsWith('}')) {
          const parsed = JSON.parse(cleanJson);
          if (parsed.result) {
              content = parsed.result;
          }
          if (parsed.fitLevel) {
              fitLevel = parsed.fitLevel;
          }
      }
  } catch (e) {
      console.warn("Failed to parse result as JSON, using raw text", e);
  }

  const getFitIndicator = (level: string) => {
      switch (level) {
          case 'Strong':
              return { icon: <CheckCircleIcon sx={{ fontSize: 32 }} />, color: 'primary.main', label: 'Strong Fit' };
          case 'Reasonable':
              return { icon: <CheckCircleOutlineIcon sx={{ fontSize: 32 }} />, color: 'secondary.main', label: 'Reasonable Fit' };
          case 'Partial':
              return { icon: <RemoveCircleOutlineIcon sx={{ fontSize: 32 }} />, color: 'warning.main', label: 'Partial Fit' };
          case 'Weak':
              return { icon: <CancelIcon sx={{ fontSize: 32 }} />, color: 'error.main', label: 'Weak Fit' };
          default:
              return { icon: null, color: 'text.primary', label: 'Evaluation Results' };
      }
  };

  const indicator = getFitIndicator(fitLevel);

  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper', overflow: 'hidden' }}>
        <Box sx={{ p: 3, bgcolor: 'action.hover', borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
             {indicator.icon && (
                 <Box sx={{ color: indicator.color, display: 'flex' }}>
                     {indicator.icon}
                 </Box>
             )}
             <Typography variant="h5" component="h3" fontWeight="bold">
                {indicator.label}
             </Typography>
        </Box>
        <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
            <Box sx={{ 
                '& h2': { 
                    typography: 'h5', 
                    fontWeight: 700, 
                    color: 'text.primary', 
                    mt: 4, 
                    mb: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                    pb: 1
                },
                '& h2:first-of-type': { mt: 0 },
                '& h3': { 
                    typography: 'h6', 
                    fontWeight: 600, 
                    color: 'text.primary', 
                    mt: 3, 
                    mb: 1 
                },
                '& p': { 
                    typography: 'body1', 
                    color: 'text.secondary', 
                    mb: 2, 
                    lineHeight: 1.7 
                },
                '& ul': { 
                    pl: 3, 
                    mb: 2,
                    color: 'text.secondary',
                },
                '& li': { 
                    mb: 1,
                    typography: 'body1',
                    lineHeight: 1.6
                },
                '& strong': {
                    color: 'text.primary',
                    fontWeight: 600
                }
            }}>
                <ReactMarkdown>{content}</ReactMarkdown>
            </Box>
        </CardContent>
    </Card>
  );
}
