'use client';
import { createTheme } from '@mui/material/styles';
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D0BCFF', // M3 Dark Primary (Purple)
      light: '#E8DEF8',
      dark: '#4F378B', // M3 Primary Container
      contrastText: '#381E72', // M3 On Primary
    },
    secondary: {
      main: '#CCC2DC', // M3 Dark Secondary
      light: '#E8DEF8',
      dark: '#4A4458',
      contrastText: '#332D41',
    },
    background: {
      default: '#3c3941', // M3 Dark Background
      paper: '#3c3941', // M3 Dark Surface
    },
    text: {
      primary: '#E6E1E5', // M3 Dark On Surface
      secondary: '#CAC4D0', // M3 Dark On Surface Variant
    },
    divider: '#49454F', // M3 Dark Outline
  },
  typography: {
    fontFamily: geistSans.style.fontFamily,
    h1: { fontSize: '3.5rem', fontWeight: 700 }, // Matching hero style likely
    h2: { fontSize: '2.5rem', fontWeight: 600 },
    h3: { fontSize: '2rem', fontWeight: 600 },
    body1: { fontSize: '1.125rem', lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '12px 24px',
        },
      },
      defaultProps: {
        disableElevation: true,
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
  },
});

export default theme;
