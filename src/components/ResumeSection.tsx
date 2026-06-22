"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Paper from '@mui/material/Paper';
import { usePostHog } from 'posthog-js/react';
import { ScrollAnimation } from "./ScrollAnimation";

export function ResumeSection() {
  const posthog = usePostHog();

  return (
    <Box component="section" id="resume" sx={{ py: { xs: 8, md: 16 } }}>
      <Container maxWidth="lg">
        <ScrollAnimation>
          <Paper
            elevation={0}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              p: { xs: 6, md: 10 },
              textAlign: 'center',
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              borderRadius: 4,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-40%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(circle at top, rgba(124,92,255,0.16) 0%, rgba(124,92,255,0) 55%)',
                pointerEvents: 'none',
              },
              '& > :not(style)': {
                position: 'relative',
                zIndex: 1,
              },
            }}
          >
            <Typography variant="h3" component="h2" gutterBottom fontWeight="800">
              Resume
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 5, fontWeight: 400 }}>
              Get a comprehensive overview of my professional background, skills, and achievements.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="/Taylor_Dugger__Resume.pdf"
              download="Taylor_Dugger__Resume.pdf"
              onClick={() => posthog.capture('resume_downloaded')}
              endIcon={<DownloadIcon />}
              sx={{  
                  fontSize: '1.1rem', 
                  px: 5, py: 1.5,
                  fontWeight: 600
              }}
            >
              Download Resume
            </Button>
          </Paper>
        </ScrollAnimation>
      </Container>
    </Box>
  );
}
