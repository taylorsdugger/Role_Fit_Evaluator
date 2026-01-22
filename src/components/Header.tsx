"use client";

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function Header() {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Work History", href: "#work-history" },
    { label: "Resume", href: "#resume" },
    { label: "AI Role Fit", href: "#role-fit-section" },
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider', 
        bgcolor: 'background.default' 
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
            <Typography 
              variant="h6" 
              component="a" 
              href="#home" 
              sx={{ 
                color: 'text.primary', 
                textDecoration: 'none', 
                fontWeight: 700,
                fontSize: '1.25rem',
                transition: 'color 0.2s',
                '&:hover': { color: 'primary.main' }
            }}>
                TD
            </Typography>
            <Box component="nav" sx={{ display: 'flex', gap: 3 }}>
                {navLinks.map((link) => (
                    <Button 
                        key={link.href} 
                        component="a" 
                        href={link.href}
                        disableRipple
                        sx={{ 
                            color: 'text.secondary',
                            fontWeight: 500,
                            padding: 0,
                            minWidth: 0,
                            fontSize: '0.95rem',
                            '&:hover': { 
                                color: 'primary.main', 
                                bgcolor: 'transparent' 
                            }
                        }}
                    >
                        {link.label}
                    </Button>
                ))}
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
