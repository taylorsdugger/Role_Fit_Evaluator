// Global theme and colors configuration
// Easy to maintain and edit in one place

export const theme = {
  colors: {
    // Background
    bg: {
      primary: "#1a1a1a",
      secondary: "#242424",
      tertiary: "#2d2d2d",
    },
    // Text
    text: {
      primary: "#ffffff",
      secondary: "#e0e0e0",
      tertiary: "#999999",
    },
    // Accent
    accent: {
      primary: "#D0BCFF", // M3 Purple
      hover: "#4F378B",
      light: "#E8DEF8",
    },
    // Borders & Dividers
    border: "#404040",
    divider: "#333333",
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    xxl: "4rem",
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "1rem",
    full: "50%",
  },
  typography: {
    heading: {
      h1: {
        size: "3rem",
        weight: 700,
        lineHeight: 1.2,
      },
      h2: {
        size: "2rem",
        weight: 700,
        lineHeight: 1.3,
      },
      h3: {
        size: "1.5rem",
        weight: 600,
        lineHeight: 1.4,
      },
    },
    body: {
      base: {
        size: "1rem",
        weight: 400,
        lineHeight: 1.6,
      },
      small: {
        size: "0.875rem",
        weight: 400,
        lineHeight: 1.5,
      },
      caption: {
        size: "0.75rem",
        weight: 400,
        lineHeight: 1.4,
      },
    },
  },
};

export type Theme = typeof theme;
