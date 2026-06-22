"use client";

import React from 'react';
import Image from 'next/image';
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
    <Box
      id="home"
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 10, md: 20 },
        paddingBottom: { xs: 10, md: 30 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Ambient color glow */}
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '-15%', md: '-12%' },
            right: { xs: '-25%', md: '-5%' },
            width: { xs: 420, md: 640 },
            height: { xs: 420, md: 640 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,92,255,0.28) 0%, rgba(124,92,255,0) 68%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-25%',
            left: '-15%',
            width: { xs: 380, md: 560 },
            height: { xs: 380, md: 560 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(103,232,249,0.10) 0%, rgba(103,232,249,0) 70%)',
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
       <ScrollAnimation>
        <Grid container spacing={8} alignItems="center">
          {/* Left side - Text */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ mb: 4 }}>
                <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 3,
                        px: 1.75,
                        py: 0.625,
                        borderRadius: 999,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'var(--surface-2)',
                    }}
                >
                    <Box
                        sx={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            bgcolor: '#4ade80',
                            boxShadow: '0 0 8px rgba(74,222,128,0.9)',
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'text.secondary',
                        }}
                    >
                        Senior Software Engineer
                    </Typography>
                </Box>
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        fontWeight: 800,
                        lineHeight: 1.05,
                        mb: 3,
                        background: 'var(--grad-text)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textFillColor: 'transparent',
                    }}
                >
                    Taylor Dugger
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6, fontWeight: 400 }}>
                    I'm a senior software engineer who builds infrastructure that makes products work at scale. Over 8 years, I've built marketplace matching systems, event-driven microservices, and platform APIs that multiple teams depend on. The kind of work where 'it just works' is the highest compliment.
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
                  borderRadius: '50%',
                  p: '4px',
                  background: 'linear-gradient(135deg, #B794F6 0%, #7C5CFF 50%, #67E8F9 100%)',
                  boxShadow: '0 0 60px rgba(124,92,255,0.4)',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 280, sm: 380 },
                    height: { xs: 280, sm: 380 },
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '4px solid',
                    borderColor: 'background.default',
                  }}
                >
                  <Image
                      src="/images/TaylorHeadshot_Option1~2.JPG"
                      alt="Taylor Dugger"
                      fill
                      priority
                      sizes="(max-width: 600px) 280px, 380px"
                      style={{ objectFit: 'cover' }}
                  />
                </Box>
             </Box>
          </Grid>
        </Grid>
       </ScrollAnimation>
      </Container>
    </Box>
  );
}
