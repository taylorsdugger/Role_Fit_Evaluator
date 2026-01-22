'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export interface WorkExperience {
  company: string;
  title: string;
  dates: string;
  description: string;
}

interface WorkHistoryCardProps {
  experience: WorkExperience;
}

export function WorkHistoryCard({ experience }: WorkHistoryCardProps) {
  return (
    <Card 
        component="article"
        elevation={0}
        sx={{ 
            bgcolor: 'background.paper', 
            border: 1, 
            borderColor: 'divider',
            transition: 'border-color 0.3s',
            '&:hover': {
                borderColor: 'primary.main',
            }
        }}
    >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', mb: 2, gap: 2 }}>
                <Box>
                    <Typography variant="h6" component="h3" color="text.primary" fontWeight="bold">
                        {experience.title}
                    </Typography>
                    <Typography variant="subtitle1" color="primary.main">
                        {experience.company}
                    </Typography>
                </Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                    {experience.dates}
                </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.7 }}>
                {experience.description}
            </Typography>
        </CardContent>
    </Card>
  );
}
