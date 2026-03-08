'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { projects } from '@/content/projects';

export default function ProjectsPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 14 }, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Back nav */}
        <Box sx={{ mb: 6 }}>
          <Typography
            component={Link}
            href="/"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              color: 'text.secondary',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Home
          </Typography>
        </Box>

        {/* Page header */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              mb: 2,
              background: 'linear-gradient(to right, #fff, #ccc)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            Projects
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.7 }}>
            Systems I&apos;ve built or led — architecture diagrams, technical decisions, and outcomes.
          </Typography>
        </Box>

        {/* Project grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          {projects.map((project) => (
            <Box
              key={project.slug}
              component={Link}
              href={`/projects/${project.slug}`}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 3.5,
                bgcolor: 'rgba(255,255,255,0.02)',
                borderTop: `3px solid ${project.accentColor}`,
                transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
                  borderColor: project.accentColor,
                },
              }}
            >

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: project.accentColor,
                    lineHeight: 1.4,
                    maxWidth: '85%',
                  }}
                >
                  {project.subtitle}
                </Typography>
                <ArrowOutwardIcon sx={{ fontSize: 15, color: 'text.disabled', flexShrink: 0, mt: 0.25 }} />
              </Box>

              <Typography
                variant="h6"
                color="text.primary"
                fontWeight="bold"
                sx={{ mb: 1.5, lineHeight: 1.25 }}
              >
                {project.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.7, flexGrow: 1 }}
              >
                {project.description}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {project.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      fontSize: '0.68rem',
                      height: 22,
                      bgcolor: 'rgba(255,255,255,0.05)',
                      color: 'text.secondary',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))}

          {/* More to come stub */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 3.5,
              bgcolor: 'rgba(255,255,255,0.01)',
              minHeight: 200,
              opacity: 0.5,
              cursor: 'default',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'text.disabled',
                mb: 1,
              }}
            >
              More to come
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center', lineHeight: 1.6 }}>
              Additional case studies are in progress.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
