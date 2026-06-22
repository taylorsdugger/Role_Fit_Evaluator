"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { workProjects, personalProjects, type Project } from '@/content/projects';
import { ProjectCard } from './ProjectCard';
import { ScrollAnimation } from './ScrollAnimation';

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
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        gap: 3,
      }}
    >
      {items.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </Box>
  );
}

export function ProjectsSection() {
  return (
    <Box component="section" id="projects" sx={{ py: { xs: 10, md: 20 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <ScrollAnimation>
          <Box>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
              Projects
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 560 }}>
              Systems I&apos;ve built or led — from production platforms at work to things I build for the fun of it.
            </Typography>

            <Box sx={{ mb: 7 }}>
              <GroupLabel>Professional work</GroupLabel>
              <ProjectGrid items={workProjects} />
            </Box>

            <Box>
              <GroupLabel>Personal projects</GroupLabel>
              <ProjectGrid items={personalProjects} />
            </Box>

            <Box sx={{ mt: 5 }}>
              <Typography
                component={Link}
                href="/projects"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                View all projects →
              </Typography>
            </Box>
          </Box>
        </ScrollAnimation>
      </Container>
    </Box>
  );
}
