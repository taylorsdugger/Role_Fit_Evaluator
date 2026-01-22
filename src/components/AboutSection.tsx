"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { WorkHistoryCard, type WorkExperience } from "./WorkHistoryCard";

const workExperience: WorkExperience[] = [
  {
    company: "Field Nation",
    title: "Staff / Senior Software Engineer (Team Lead)",
    dates: "2019–2026",
    description:
      "Led and mentored three cross-functional teams (5–6 engineers each), acting as the primary point of ownership for delivery quality and execution. Designed and scaled multiple microservices, established documentation and testing practices that reduced operational incidents by 40%. Improved team delivery performance by optimizing DORA metrics, reducing release and cycle time by >53% through process and tooling improvements.",
  },
  {
    company: "C.H. Robinson",
    title: "Software Engineer I / II",
    dates: "2017–2019",
    description:
      "Engineering lead on a B2B product for global supply chain visibility. Helped scale the product to support >500% growth in client usage. Led a full frontend rewrite, migrating from Angular to React to improve performance, developer velocity, and user experience. Designed and maintained high-performance product APIs with strict SLO requirements.",
  },
];

export function AboutSection() {
  return (
    <Box component="section" id="about" sx={{ py: { xs: 10, md: 20 } }}>
       <Container maxWidth="lg">
          <Box sx={{ mb: 10 }}>
             <Typography variant="h2" component="h2" gutterBottom fontWeight="800" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                About
             </Typography>
             <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, fontWeight: 400, lineHeight: 1.8, fontSize: '1.25rem' }}>
                With over 8 years of experience in full-stack development, I focus on building reliable, scalable systems that solve real user and business problems. I've led teams, mentored engineers, and consistently delivered high-impact features while improving system reliability and engineering quality.
             </Typography>
          </Box>
          
          <Box>
             <Typography variant="h4" component="h3" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                Work Experience
             </Typography>
             <Stack spacing={4}>
                {workExperience.map((xp, index) => (
                    <WorkHistoryCard key={index} experience={xp} />
                ))}
             </Stack>
          </Box>
       </Container>
    </Box>
  );
}
