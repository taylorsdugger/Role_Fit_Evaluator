"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { usePostHog } from 'posthog-js/react';
import { ScrollAnimation } from "./ScrollAnimation";

export function HeroSection() {
  const posthog = usePostHog();

  const handleScrollToRoleFit = () => {
    posthog.capture('ask_ai_about_me_clicked');
    const element = document.getElementById("role-fit-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box id="home" component="section" sx={{ py: { xs: 10, md: 20 }, paddingBottom: { xs: 10, md: 30 }, display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="lg">
       <ScrollAnimation>
        <Grid container spacing={8} alignItems="center">
          {/* Left side - Text */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h1" 
                    component="h1" 
                    sx={{ 
                        fontWeight: 800, 
                        lineHeight: 1.1, 
                        mb: 3,
                        background: 'linear-gradient(to right, #fff, #ccc)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                    }}
                >
                    Taylor Dugger
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6, fontWeight: 400 }}>
                    Senior full-stack engineer with 8+ years of experience building user-focused web products. I specialize in React-based applications and Node.js-backed systems, with a focus on performance, reliability, and thoughtful technical ownership from idea to production.
                </Typography>
            </Box>

            <Button
                variant="contained"
                size="large"
                onClick={handleScrollToRoleFit}
                endIcon={<ArrowForwardIcon />}
                sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    fontWeight: 600
                }}
            >
                Ask AI about me
            </Button>
          </Grid>

          {/* Right side - Avatar */}
          <Grid size={{ xs: 12, lg: 6 }} sx={{ display: 'flex', justifyContent: { xs: 'center', lg: 'flex-end' } }}>
             <Box
                sx={{
                  position: 'relative',
                  width: { xs: 280, sm: 380 },
                  height: { xs: 280, sm: 380 },
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: 4,
                  borderColor: 'divider',
                  boxShadow: 6
                }}
              >
                <Box
                    component="img"
                    src="/images/TaylorHeadshot_Option1~2.JPG"
                    alt="Taylor Dugger"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
             </Box>
          </Grid>
        </Grid>
       </ScrollAnimation>
      </Container>
    </Box>
  );
}
