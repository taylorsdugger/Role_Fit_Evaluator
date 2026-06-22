"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import ExtensionIcon from '@mui/icons-material/Extension';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { type Project, type ProjectLink, statusLabel } from '@/content/projects';

const LINK_ICONS = {
  live: LaunchIcon,
  github: GitHubIcon,
  store: ExtensionIcon,
} as const;

/** Cards sit in a 1–3 column grid inside an `lg` container, so ~384px at desktop. */
const CARD_IMAGE_SIZES = '(max-width: 600px) 100vw, (max-width: 900px) 50vw, 384px';

/** Image thumbnail, or a branded monogram fallback when a project has no screenshot yet. */
function CardBanner({ project }: { project: Project }) {
  return (
    <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', bgcolor: 'var(--surface-2)' }}>
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes={CARD_IMAGE_SIZES}
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `radial-gradient(120% 120% at 50% 0%, ${project.accentColor}2e 0%, ${project.accentColor}0d 45%, var(--surface-2) 100%)`,
          }}
        >
          <Typography
            aria-hidden
            sx={{
              fontSize: '5rem',
              fontWeight: 800,
              lineHeight: 1,
              color: project.accentColor,
              opacity: 0.22,
              userSelect: 'none',
            }}
          >
            {project.title.charAt(0)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const isPositive = status === 'live' || status === 'published';
  const isWip = status === 'wip';
  const isPrivate = status === 'private';

  const color = isPositive ? '#4ade80' : isWip ? '#fbbf24' : 'text.disabled';

  return (
    <Box
      sx={{
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 0.875,
        py: 0.25,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'var(--surface-3)',
      }}
    >
      {isPrivate ? (
        <LockOutlinedIcon sx={{ fontSize: 11, color: 'text.disabled' }} />
      ) : (
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color }} />
      )}
      <Typography
        sx={{
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'text.secondary',
          lineHeight: 1.4,
        }}
      >
        {statusLabel(status)}
      </Typography>
    </Box>
  );
}

function LinkButtons({ links }: { links: ProjectLink[] }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto', pt: 0.5 }}>
      {links.map((link) => {
        const Icon = LINK_ICONS[link.icon];
        return (
          <Button
            key={link.href}
            component="a"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            variant="outlined"
            startIcon={<Icon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: 'none',
              fontSize: '0.78rem',
              fontWeight: 500,
              py: 0.4,
              px: 1.25,
              color: 'text.secondary',
              borderColor: 'divider',
              '&:hover': { borderColor: 'text.secondary', bgcolor: 'var(--surface-3)' },
            }}
          >
            {link.label}
          </Button>
        );
      })}
    </Box>
  );
}

interface ProjectCardProps {
  project: Project;
  /** Show every tag instead of the first four (used on the dedicated projects page). */
  allTags?: boolean;
}

export function ProjectCard({ project, allTags = false }: ProjectCardProps) {
  const isWork = project.category === 'work';
  const hasLinks = !!project.links?.length;
  const tags = allTags ? project.tags : project.tags.slice(0, 4);

  const cardSx = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    overflow: 'hidden',
    textDecoration: 'none',
    border: '1px solid',
    borderColor: project.featured ? `${project.accentColor}66` : 'divider',
    borderRadius: 2,
    bgcolor: 'var(--surface-1)',
    transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: `0 18px 48px rgba(0,0,0,0.45), 0 0 28px ${project.accentColor}33`,
      borderColor: project.accentColor,
    },
    '&:hover .project-arrow': {
      color: project.accentColor,
      transform: 'translate(2px, -2px)',
    },
  };

  // Work projects: the whole card navigates to the internal case study.
  const linkProps = isWork
    ? { component: Link, href: `/projects/${project.slug}` }
    : {};

  return (
    <Box {...linkProps} sx={cardSx}>
      {/* Banner — image thumbnail or branded fallback, flush to the card edges */}
      <CardBanner project={project} />
      {/* Thin accent line bridging banner and content */}
      <Box sx={{ height: 2, background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}55)` }} />

      {/* Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 3 }}>
        {/* Header — subtitle + status badge */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 1 }}>
          <Typography
            sx={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: project.accentColor,
              lineHeight: 1.4,
            }}
          >
            {project.subtitle}
          </Typography>
          <StatusBadge status={project.status} />
        </Box>

        {/* Title */}
        <Typography variant="h6" color="text.primary" fontWeight="bold" sx={{ mb: 1.5, lineHeight: 1.25, fontSize: '1rem' }}>
          {project.title}
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7, fontSize: '0.875rem' }}>
          {project.description}
        </Typography>

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                fontSize: '0.68rem',
                height: 22,
                bgcolor: 'var(--surface-3)',
                color: 'text.secondary',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            />
          ))}
        </Box>

        {/* Footer — varies by card type */}
        {isWork && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 'auto', color: 'text.secondary' }}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Read case study</Typography>
            <ArrowOutwardIcon
              className="project-arrow"
              sx={{ fontSize: 15, color: 'text.disabled', transition: 'color 0.22s ease, transform 0.22s ease' }}
            />
          </Box>
        )}

        {hasLinks && <LinkButtons links={project.links!} />}

        {!isWork && !hasLinks && (
          <Typography sx={{ mt: 'auto', fontSize: '0.78rem', color: 'text.disabled', display: 'flex', alignItems: 'center', gap: 0.625 }}>
            <LockOutlinedIcon sx={{ fontSize: 14 }} />
            {project.note ?? 'Private repo — live demo or walkthrough on request'}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
