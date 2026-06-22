import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import { ProviderMatchDetail } from '@/components/projects/ProviderMatchDetail';
import { SupplyChainDetail } from '@/components/projects/SupplyChainDetail';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  // Personal projects link out externally — only work projects have case-study pages.
  if (!project || project.category !== 'work') notFound();

  return (
    <Box sx={{ py: { xs: 8, md: 14 }, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Back nav */}
        <Box sx={{ mb: 6 }}>
          <Link
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '0.875rem',
              opacity: 0.7,
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Projects
          </Link>
        </Box>

        {/* Project header */}
        <Box
          sx={{
            mb: 8,
            pb: 6,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Typography
              sx={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: project.accentColor,
              }}
            >
              {project.subtitle}
            </Typography>
          </Box>

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
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 660, lineHeight: 1.7, mb: 3 }}
          >
            {project.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {project.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  height: 26,
                  bgcolor: 'var(--surface-4)',
                  color: 'text.secondary',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Detail content */}
        {slug === 'provider-match' && <ProviderMatchDetail />}
        {slug === 'supply-chain-visibility' && <SupplyChainDetail />}

        {slug !== 'provider-match' && slug !== 'supply-chain-visibility' && (
          <Paper
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              p: { xs: 4, md: 6 },
              bgcolor: 'var(--surface-1)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Detailed case study coming soon
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Architecture diagrams, technical decisions, and outcomes are being documented.
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

export async function generateStaticParams() {
  return projects.filter((p) => p.category === 'work').map((p) => ({ slug: p.slug }));
}
