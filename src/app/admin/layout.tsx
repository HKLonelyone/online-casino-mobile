import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '後台管理',
  description: '遊戲平台後台管理系統',
};

export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="zh-TW">
        <body>{children}</body>
      </html>
    );
  }
