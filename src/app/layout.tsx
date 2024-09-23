'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Nav from '../components/Nav';
import './globals.css';
import '../../bootstrap/css/bootstrap.min.css';
import '../../fontawesome/css/all.min.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/' || pathname === '/login' || pathname === '/admin';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 在客户端动态导入 Bootstrap 的 JavaScript
    import('../../bootstrap/js/bootstrap.bundle.min.js');

    // 模拟加载过程
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 设置 2 秒的加载时间，您可以根据需要调整

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="zh-TW" className="bg-dark min-vh-100">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>viprich</title>
      </head>
      <body className="min-vh-100">
        <div className="max-w-mobile mx-auto relative min-h-screen overflow-hidden">
          {isLoading ? (
            <div className="loading-overlay">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="content-container min-h-screen flex flex-col pb-16">
              <main className="flex-grow">
                {children}
              </main>
            </div>
          )}
          {!isAuthPage && <Nav />}
        </div>
        <script src="js/jquery.min.js"></script>
      </body>
    </html>
  );
}
