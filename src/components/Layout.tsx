import React from 'react';
import Box from '@mui/material/Box';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
