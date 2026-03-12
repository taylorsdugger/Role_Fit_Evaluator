"use client";

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter, usePathname } from 'next/navigation';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/", hash: "home" },
    { label: "Work History", href: "/", hash: "work-history" },
    { label: "Projects", href: "/projects", hash: null },
    { label: "Resume", href: "/", hash: "resume" },
    { label: "AI Role Fit", href: "/", hash: "role-fit-section" },
  ];

  const handleNav = (e: React.MouseEvent, href: string, hash: string | null) => {
    e.preventDefault();
    if (!hash) {
      router.push(href);
      return;
    }
    if (pathname === '/') {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`${href}#${hash}`);
    }
  };

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
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1, minHeight: { xs: 56 } }}>
            <Typography 
              variant="h6" 
              component="a" 
              href="/"
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
            <Box component="nav" sx={{ display: 'flex', gap: { xs: 1, sm: 2, md: 3 } }}>
                {navLinks.map((link) => (
                    <Button 
                        key={link.label}
                        component="a"
                        href={link.hash ? `${link.href}#${link.hash}` : link.href}
                        onClick={(e) => handleNav(e, link.href, link.hash)}
                        disableRipple
                        sx={{ 
                            color: 'text.secondary',
                            fontWeight: 500,
                            padding: 0,
                            minWidth: 0,
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '0.95rem' },
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
