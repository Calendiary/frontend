// app/layout.tsx
'use client';

import './globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import Header from '../components/Navigator/Header';  // 또는 Navigator
import Sidebar from '../components/Navigator/Sidebar';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider>
          <Header />
          <Sidebar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
