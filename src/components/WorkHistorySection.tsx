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
      "I led engineering teams building large-scale web products, with a focus on performance, reliability, and user experience. I owned the technical direction for a new search and matching experience, helped establish shared UI and architecture standards, and worked closely with product and design to deliver meaningful improvements."
  },
  {
    company: "C.H. Robinson",
    title: "Software Engineer I / II",
    dates: "2017–2019",
    description:
      "I worked on a B2B supply chain visibility platform supporting a rapidly growing customer base. I led a frontend modernization from Angular to React to improve usability and performance, contributed to backend APIs, and helped introduce team practices that improved code quality.",
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
