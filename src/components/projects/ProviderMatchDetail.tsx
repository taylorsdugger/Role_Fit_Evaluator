"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

const ACCENT = {
  blue: '#3b82f6',
  indigo: '#6366f1',
  violet: '#8b5cf6',
  green: '#22c55e',
  amber: '#f59e0b',
};

interface ArchNodeProps {
  title: string;
  desc: string;
  tags: string[];
  accent: string;
}

function ArchNode({ title, desc, tags, accent }: ArchNodeProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 2,
        borderTop: `3px solid ${accent}`,
        bgcolor: 'rgba(255,255,255,0.03)',
      }}
    >
      <Typography
        sx={{ fontSize: '0.8125rem', fontWeight: 600, color: 'text.primary', mb: 0.5 }}
      >
        {title}
      </Typography>
      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.6 }}>
        {desc}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1.25 }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              fontSize: '0.65rem',
              height: 20,
              bgcolor: 'rgba(255,255,255,0.06)',
              color: 'text.secondary',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          />
        ))}
      </Box>
    </Paper>
  );
}

interface ConnectorProps {
  labels: string[];
}

function Connector({ labels }: ConnectorProps) {
  return (
    <Box sx={{ display: 'flex', py: 0.5 }}>
      {labels.map((label, i) => (
        <Box
          key={i}
          sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Box sx={{ width: '1px', height: 20, bgcolor: 'divider' }} />
          <Box
            sx={(theme) => ({
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: `5px solid ${theme.palette.divider}`,
            })}
          />
          <Typography
            sx={{ fontSize: '0.6rem', color: 'text.disabled', mt: 0.25, letterSpacing: '0.04em' }}
          >
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

interface ArchSectionProps {
  label: string;
  children: React.ReactNode;
}

function ArchSection({ label, children }: ArchSectionProps) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography
        sx={{
          fontSize: '0.625rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'text.disabled',
          mb: 1,
          pl: 0.25,
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}

export function ProviderMatchDetail() {
  return (
    <Box sx={{ maxWidth: 880, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 5, pb: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography
          sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'text.primary', letterSpacing: '-0.01em' }}
        >
          Provider Match — System Architecture
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.5 }}>
          Event-Driven Microservices · TypeScript · Go · Kafka · OpenSearch · Kubernetes
        </Typography>
      </Box>

      {/* User Plane */}
      <ArchSection label="User Plane">
        <Box sx={{ display: 'flex', gap: 1.25 }}>
          <ArchNode
            accent={ACCENT.blue}
            title="React / Next.js UI"
            desc="Standalone provider search interface with card display, filters, and ranking controls."
            tags={['Next.js 14', 'React', 'MUI']}
          />
          <ArchNode
            accent={ACCENT.blue}
            title="Backend API"
            desc="REST API for provider queries, filtering, and ranked result retrieval. Sub-second P95 response time."
            tags={['NestJS', 'TypeScript', 'Node.js']}
          />
          <ArchNode
            accent={ACCENT.indigo}
            title="Ranking Engine"
            desc="Configurable scoring service with weighted formulas and real-time algorithm tuning."
            tags={['Go', 'Dynamic Weights']}
          />
        </Box>
      </ArchSection>

      <Connector labels={['queries', 'rank / filter', 'config']} />

      {/* Data Stores */}
      <ArchSection label="Data Stores">
        <Box sx={{ display: 'flex', gap: 1.25 }}>
          <ArchNode
            accent={ACCENT.violet}
            title="OpenSearch"
            desc="Primary search index. 40+ provider attributes indexed for fast filtered ranking queries."
            tags={['AWS Managed', '40+ Attributes']}
          />
          <ArchNode
            accent={ACCENT.violet}
            title="PostgreSQL"
            desc="Relational store for match criteria, ranking rules, and configuration data."
            tags={['Match Criteria', 'Rules']}
          />
          <ArchNode
            accent={ACCENT.violet}
            title="Redis"
            desc="Operational caching layer for app-side performance."
            tags={['Cache', 'Session']}
          />
        </Box>
      </ArchSection>

      <Connector labels={['index updates', 'sync', 'events out']} />

      {/* Event Pipeline */}
      <ArchSection label="Event Pipeline">
        <Box sx={{ display: 'flex', gap: 1.25 }}>
          <ArchNode
            accent={ACCENT.amber}
            title="Kafka Source"
            desc="Reads provider and work order data from S3 and publishes to Kafka. Handles historical seed and real-time stream."
            tags={['Go', 'S3', 'Protobuf']}
          />
          <ArchNode
            accent={ACCENT.amber}
            title="Kafka"
            desc="Central event bus carrying provider, work order, assignment, and engagement streams."
            tags={['AWS Managed', 'DLQ']}
          />
          <ArchNode
            accent={ACCENT.amber}
            title="Kafka Sink"
            desc="Consumes topics and writes to OpenSearch. Per-topic monitoring, DLQ flush, and metrics emission."
            tags={['Go', 'Prometheus']}
          />
        </Box>
      </ArchSection>

      <Connector labels={['batch · daily', 'real-time', 'batch · daily']} />

      {/* Data Sources */}
      <ArchSection label="Data Sources">
        <Box sx={{ display: 'flex', gap: 1.25 }}>
          <ArchNode
            accent={ACCENT.green}
            title="Data Platform / S3"
            desc="dbt-transformed provider attributes. Aggregate metrics, skills, ratings, and compliance data."
            tags={['dbt', 'Daily 5:20am UTC']}
          />
          <ArchNode
            accent={ACCENT.green}
            title="Real-Time Events"
            desc="Live work order updates, assignment changes, and counter-offers triggering immediate sync."
            tags={['RabbitMQ', 'Real-Time']}
          />
          <ArchNode
            accent={ACCENT.green}
            title="User Engagement"
            desc="Click, scroll, and view events from the UI used for ranking signal development."
            tags={['Amplitude', 'Warehouse Daily']}
          />
        </Box>
      </ArchSection>

      {/* Infrastructure */}
      <Box sx={{ mt: 3 }}>
        <Typography
          sx={{
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'text.disabled',
            mb: 1,
          }}
        >
          Infrastructure & Observability
        </Typography>
        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            p: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            bgcolor: 'rgba(255,255,255,0.03)',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'text.disabled',
              whiteSpace: 'nowrap',
              pr: 2,
              borderRight: '1px solid',
              borderColor: 'divider',
            }}
          >
            Platform
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.625 }}>
            {[
              'Kubernetes',
              'AWS',
              'Helm',
              'Docker',
              'CI/CD',
              'Datadog',
              'Prometheus',
              'Feature Flags',
              'Protobuf Schema Registry',
              'OpenSearch Migrations',
            ].map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                sx={{
                  fontSize: '0.6875rem',
                  height: 24,
                  bgcolor: 'rgba(255,255,255,0.06)',
                  color: 'text.secondary',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Footer / Legend */}
      <Box
        sx={{
          mt: 4.5,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Typography
          sx={{ fontSize: '0.6875rem', fontWeight: 600, color: 'text.secondary', letterSpacing: '0.05em' }}
        >
          Taylor Dugger — Provider Match Architecture
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[
            { label: 'User Plane', color: ACCENT.blue },
            { label: 'Data Stores', color: ACCENT.violet },
            { label: 'Event Pipeline', color: ACCENT.amber },
            { label: 'Data Sources', color: ACCENT.green },
          ].map(({ label, color }) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: color }} />
              <Typography sx={{ fontSize: '0.65rem', color: 'text.disabled' }}>{label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
