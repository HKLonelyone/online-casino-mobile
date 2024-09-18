'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Nav from '../components/Nav';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const isAuthPage = pathname === '/' || pathname === '/login' || pathname === '/admin';

  return (
    <html lang="zh-TW">
      <body>
        <div className="max-w-mobile mx-auto relative min-h-screen overflow-hidden">
          <div className="content-container min-h-screen flex flex-col pb-16">
            <main className="flex-grow">
              {children}
            </main>
          </div>
          {!isAuthPage && (
            <>
              <Nav />
            </>
          )}
        </div>
      </body>
    </html>
  );
}
