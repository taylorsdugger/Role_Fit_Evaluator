"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Image from 'next/image';

const ACCENT = '#22c55e';

const TAGS = [
  'JavaScript', 'React', 'Redux', 'Node.js', 'TypeScript',
  'REST API', 'Elasticsearch', 'Azure', 'Frontend Architecture', 'Performance Optimization',
];

interface DeliverableProps {
  title: string;
  desc: string;
}

function Deliverable({ title, desc }: DeliverableProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 2,
        borderLeft: `3px solid ${ACCENT}`,
        bgcolor: 'var(--surface-2)',
      }}
    >
      <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.65 }}>
        {desc}
      </Typography>
    </Paper>
  );
}

interface ScreenshotProps {
  src: string;
  alt: string;
  caption: string;
  onExpand: () => void;
}

function Screenshot({ src, alt, caption, onExpand }: ScreenshotProps) {
  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'var(--surface-1)',
          cursor: 'pointer',
          '&:hover .expand-btn': { opacity: 1 },
          '&:hover img': { opacity: 0.88 },
        }}
        onClick={onExpand}
      >
        <Image
          src={src}
          alt={alt}
          width={860}
          height={0}
          style={{ width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.2s' }}
          sizes="(max-width: 900px) 100vw, 860px"
        />
        <Box
          className="expand-btn"
          sx={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            bgcolor: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '6px',
            px: 1.25,
            py: 0.5,
            opacity: 0,
            transition: 'opacity 0.2s',
            pointerEvents: 'none',
          }}
        >
          <OpenInFullIcon sx={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }} />
          <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
            View full size
          </Typography>
        </Box>
      </Box>
      <Typography sx={{ fontSize: '0.7rem', color: 'text.disabled', mt: 1, pl: 0.5 }}>
        {caption}
      </Typography>
    </Box>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontSize: '0.625rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'text.disabled',
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}

export function SupplyChainDetail() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <Box sx={{ maxWidth: 880, mx: 'auto' }}>

      {/* ── Screenshots ───────────────────────────────────────── */}
      <Box sx={{ mb: 7 }}>
        <SectionLabel>Product Screenshots</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Screenshot
            src="/images/vision.jpg"
            alt="Supply chain visibility dashboard"
            caption="Shipment tracking dashboard — real-time shipment search across ground, ocean, air, parcel, and intermodal modes"
            onExpand={() => setLightbox('/images/vision.jpg')}
          />
          <Screenshot
            src="/images/vision2.jpg"
            alt="Supply chain visibility map view"
            caption="Interactive mapping — Bing Maps integration with live shipment pins, weather radar overlay, and disruption layers"
            onExpand={() => setLightbox('/images/vision2.jpg')}
          />
        </Box>
      </Box>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      <Dialog
        open={!!lightbox}
        onClose={() => setLightbox(null)}
        maxWidth={false}
        PaperProps={{
          sx: {
            bgcolor: 'rgba(20,18,24,0.96)',
            backdropFilter: 'blur(12px)',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            m: 2,
            maxWidth: 'min(1400px, 96vw)',
            maxHeight: '92vh',
            overflow: 'auto',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setLightbox(null)}
            size="small"
            sx={{
              position: 'sticky',
              top: 12,
              left: '100%',
              float: 'right',
              mr: 1.5,
              mt: 1.5,
              zIndex: 1,
              bgcolor: 'rgba(0,0,0,0.5)',
              border: '1px solid',
              borderColor: 'divider',
              color: 'text.secondary',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.8)', color: 'text.primary' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          {lightbox && (
            <Image
              src={lightbox}
              alt="Full size view"
              width={1400}
              height={0}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="96vw"
            />
          )}
        </Box>
      </Dialog>

      {/* ── The Problem ───────────────────────────────────────── */}
      <Box sx={{ mb: 6 }}>
        <SectionLabel>The Problem</SectionLabel>
        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            p: 3,
            bgcolor: 'var(--surface-2)',
            borderTop: `3px solid ${ACCENT}`,
          }}
        >
          <Typography sx={{ fontSize: '0.9375rem', color: 'text.secondary', lineHeight: 1.8 }}>
            A large-scale B2B supply chain visibility platform was built on AngularJS — a framework
            reaching end-of-life that was slowing feature delivery, hurting performance, and creating
            mounting technical debt. The product needed a full frontend modernization without
            disrupting a production platform used by logistics operators tracking global shipments
            across every transport mode.
          </Typography>
        </Paper>
      </Box>

      {/* ── What I Built ──────────────────────────────────────── */}
      <Box sx={{ mb: 6 }}>
        <SectionLabel>What I Built</SectionLabel>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 1.5,
          }}
        >
          <Deliverable
            title="Shipment Search & Tracking"
            desc="Real-time search across ground, ocean, air, parcel, and intermodal shipments with a dynamic Elasticsearch-backed filter system driven entirely by tenant metadata APIs."
          />
          <Deliverable
            title="Interactive Mapping"
            desc="Three independent Bing Maps instances with live shipment pins, weather radar overlay, geohash cluster decoding, disruption overlays, and port/facility layers."
          />
          <Deliverable
            title="Redux Architecture"
            desc="Full Redux store with Immutable.js state, redux-saga for all async flows, and a clean container/component separation pattern."
          />
          <Deliverable
            title="Real-Time Collaboration"
            desc="Socket.IO powered in-app conversation and commenting system with live typing indicators per shipment."
          />
          <Deliverable
            title="Supply Chain Dashboards"
            desc="Historical and in-transit health dashboards surfacing supply chain health by mode (ocean, ground, air, parcel) alongside trending shipments — built with Recharts visualizations."
          />
          <Deliverable
            title="Dynamic Filter System"
            desc="Data-driven filter framework generated entirely from API responses, with URL-persisted filter state and saveable named filter sets."
          />
          <Deliverable
            title="Auth & Multi-Tenancy"
            desc="Auth0 implicit flow integration with per-tenant configuration and permission-based routing across clients."
          />
          <Deliverable
            title="Testing"
            desc="Jest + Enzyme unit test coverage and Nightwatch end-to-end test suite for critical user flows."
          />
        </Box>
      </Box>

      {/* ── Key Technical Decisions ───────────────────────────── */}
      <Box sx={{ mb: 6 }}>
        <SectionLabel>Key Technical Decisions</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {[
            {
              decision: 'Preserve container/component split from Angular',
              rationale:
                'Maintained Angular\'s container/component pattern as a React pattern — containers as Redux-connected logic, components as pure presentation — to reduce migration risk and keep the team productive during transition.',
            },
            {
              decision: 'URL query strings as filter source of truth',
              rationale:
                'Used URL query strings to persist filter state, enabling shareable, bookmarkable search views that matched the original Angular $location behavior.',
            },
            {
              decision: 'Redux-Saga over Thunks',
              rationale:
                'Chosen for complex async flows involving multi-step API calls, debouncing, and incident pre-fetching alongside shipment search — saga\'s structured model made these patterns far cleaner.',
            },
            {
              decision: 'Bing Maps as imperative SDK wrapped in React lifecycle',
              rationale:
                'Pragmatic decision given the complexity of the existing map layer logic. Wrapped the imperative SDK in React component lifecycle rather than a full rewrite.',
            },
          ].map(({ decision, rationale }) => (
            <Paper
              key={decision}
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 2.5,
                bgcolor: 'var(--surface-1)',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 3 },
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: ACCENT,
                  flexShrink: 0,
                  minWidth: { sm: 220 },
                  lineHeight: 1.5,
                }}
              >
                {decision}
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', lineHeight: 1.7 }}>
                {rationale}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* ── Results ───────────────────────────────────────────── */}
      <Box sx={{ mb: 6 }}>
        <SectionLabel>Results</SectionLabel>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 1.5,
          }}
        >
          {[
            { stat: '300%+', label: 'Client base growth during tenure' },
            { stat: '60%+', label: 'Reduction in page load times post-migration' },
            { stat: '5', label: 'Transport modes covered (Ground, Ocean, Air, Parcel, Intermodal)' },
            { stat: '3', label: 'Independent Bing Maps instances across the platform' },
          ].map(({ stat, label }) => (
            <Paper
              key={label}
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 2.5,
                bgcolor: 'var(--surface-2)',
                borderTop: `3px solid ${ACCENT}`,
              }}
            >
              <Typography
                sx={{ fontSize: '1.75rem', fontWeight: 700, color: ACCENT, lineHeight: 1, mb: 0.75 }}
              >
                {stat}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                {label}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* ── Skills ────────────────────────────────────────────── */}
      <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.875 }}>
          {TAGS.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                fontSize: '0.6875rem',
                height: 24,
                bgcolor: 'var(--surface-3)',
                color: 'text.secondary',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
