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
