"use client";

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useColorScheme } from '@mui/material/styles';
import { useRouter, usePathname } from 'next/navigation';

function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Resolve the actually-applied scheme (mode can be 'system')
  const resolved = mode === 'system' ? systemMode : mode;
  const isDark = resolved !== 'light';

  const handleToggle = () => setMode(isDark ? 'light' : 'dark');

  return (
    <Tooltip title={mounted ? (isDark ? 'Switch to light mode' : 'Switch to dark mode') : ''}>
      <IconButton
        onClick={handleToggle}
        size="small"
        aria-label="Toggle color mode"
        sx={{
          color: 'text.secondary',
          ml: { xs: 0.5, sm: 1 },
          transition: 'color 0.2s',
          '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
        }}
      >
        {/* Render a stable icon until mounted to avoid hydration mismatch */}
        {mounted && !isDark ? (
          <DarkModeOutlinedIcon sx={{ fontSize: 20 }} />
        ) : (
          <LightModeOutlinedIcon sx={{ fontSize: 20 }} />
        )}
      </IconButton>
    </Tooltip>
  );
}

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
        bgcolor: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundImage: 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1, minHeight: { xs: 56 } }}>
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '1.35rem',
                letterSpacing: '-0.02em',
                background: 'var(--grad-text)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.8 },
            }}>
                TD
            </Typography>
            <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2, md: 3 } }}>
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
                <ThemeToggle />
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
