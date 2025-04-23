// app/layout.tsx
'use client';

import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import Header from '../components/Header';  // 또는 Navigator
import Sidebar from '../components/Sidebar';
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
