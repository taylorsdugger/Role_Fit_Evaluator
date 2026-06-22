'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { workProjects, personalProjects, type Project } from '@/content/projects';
import { ProjectCard } from '@/components/ProjectCard';

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'text.secondary',
        mb: 2.5,
      }}
    >
      {children}
    </Typography>
  );
}

function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
        gap: 3,
      }}
    >
      {items.map((project) => (
        <ProjectCard key={project.slug} project={project} allTags />
      ))}
    </Box>
  );
}

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
              background: 'var(--grad-text)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textFillColor: 'transparent',
            }}
          >
            Projects
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.7 }}>
            Systems I&apos;ve built or led — from production platforms at work to things I build for the fun of it.
          </Typography>
        </Box>

        <Box sx={{ mb: 8 }}>
          <GroupLabel>Professional work</GroupLabel>
          <ProjectGrid items={workProjects} />
        </Box>

        <Box>
          <GroupLabel>Personal projects</GroupLabel>
          <ProjectGrid items={personalProjects} />
        </Box>
      </Container>
    </Box>
  );
}
