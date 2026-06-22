'use client';
import { createTheme } from '@mui/material/styles';
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#C4B5FD', // Punchy lavender — reads well on dark
          light: '#E9D5FF',
          dark: '#7C3AED',
          contrastText: '#1B1036',
        },
        secondary: {
          main: '#67E8F9', // Cyan — used in gradient accents for contrast
          light: '#A5F3FC',
          dark: '#0E7490',
          contrastText: '#08252B',
        },
        background: {
          default: '#0B0B0F', // Deep base — gives the site real depth
          paper: '#15151C', // Distinctly elevated surface for section rhythm
        },
        text: {
          primary: '#F4F2F7',
          secondary: '#A7A3B2',
          disabled: '#6B6776',
        },
        divider: 'rgba(255,255,255,0.08)',
      },
    },
    light: {
      palette: {
        primary: {
          main: '#7C3AED', // Vivid purple — reads well on light
          light: '#9F67FF',
          dark: '#5B21B6',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#0891B2',
          light: '#22D3EE',
          dark: '#155E75',
          contrastText: '#ffffff',
        },
        background: {
          default: '#F4F4F8', // Soft off-white base
          paper: '#FFFFFF', // Bright elevated surface for section rhythm
        },
        text: {
          primary: '#181820',
          secondary: '#55505F',
          disabled: '#9893A3',
        },
        divider: 'rgba(0,0,0,0.10)',
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: geistSans.style.fontFamily,
    h1: { fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h2: { fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    body1: { fontSize: '1.125rem', lineHeight: 1.7 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '12px 24px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #B794F6 0%, #7C5CFF 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 20px rgba(124,92,255,0.35)',
          transition: 'transform .2s ease, box-shadow .2s ease, filter .2s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, #B794F6 0%, #7C5CFF 100%)',
            boxShadow: '0 10px 32px rgba(124,92,255,0.5)',
            filter: 'brightness(1.06)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default MUI overlay in dark mode often
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
