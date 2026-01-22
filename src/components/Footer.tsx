"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ mt: 10, py: 8, borderTop: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} sx={{ mb: 8 }} justifyContent="space-between">
          {/* Branding */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
              Taylor Dugger
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Senior Software Engineer
            </Typography>
          </Grid>

          {/* Social Links */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, mb: 3 }}>
              {/* empty */}
            </Typography>
            <Stack spacing={2} direction={'row'}>
              {[
                { label: "GitHub", href: "https://github.com/taylorsdugger" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/taylor-dugger" },
              ].map((link) => (
                <Link 
                    key={link.href} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    color="text.secondary" 
                    underline="hover" 
                    sx={{ transition: 'color 0.2s', '&:hover': { color: 'primary.main' } }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Taylor Dugger. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
