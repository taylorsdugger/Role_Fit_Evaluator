"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { WorkHistoryCard, type WorkExperience } from "./WorkHistoryCard";
import { ScrollAnimation } from "./ScrollAnimation";

const workExperience: WorkExperience[] = [
  {
    company: "Field Nation",
    title: "Staff / Senior Software Engineer (Team Lead)",
    dates: "2019–2026",
    description:
      "Senior → Staff Software Engineer | 6+ years building the marketplace platform connecting 20K+ field service providers with enterprise customers. Architected the new marketplace matching and search system that reduced search times by 70%, designed microservices handling 50K+ requests daily, and established architecture standards used across 5+ engineering teams.",
  },
  {
    company: "C.H. Robinson",
    title: "Software Engineer I / II",
    dates: "2017–2019",
    description:
      "Junior Engineer → Team Lead | Led a B2B supply chain visibility platform through 500% customer growth. Rebuilt the frontend from AngularJS to React, modernizing our tech stack and reducing load times by 60%+. Built .NET APIs powering real-time tracking for 30M+ shipments annually.",
  },
];

export function WorkHistorySection() {
  return (
    <Box component="section" id="work-history" sx={{ py: { xs: 10, md: 20 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <ScrollAnimation>
          <Box>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom sx={{ mb: 6 }}>
              Work History
            </Typography>
            <Stack spacing={4}>
              {workExperience.map((xp, index) => (
                <WorkHistoryCard key={index} experience={xp} />
              ))}
            </Stack>
          </Box>
        </ScrollAnimation>
      </Container>
    </Box>
  );
}
