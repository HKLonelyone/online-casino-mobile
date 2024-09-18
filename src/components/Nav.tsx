'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Nav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: '首頁', path: '/main', icon: '🏠' },
    { name: '遊戲', path: '/games', icon: '🎮' },
    { name: '商城', path: '/shop', icon: '🛒' },
    { name: '排行', path: '/leaderboard', icon: '🏆' },
    { name: '設定', path: '/settings', icon: '⚙️' },
  ];

  return (
    <motion.nav
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 py-2 px-3 border-t border-gray-800 z-50 max-w-mobile mx-auto"
    >
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center p-1 ${
                pathname === item.path ? 'text-purple-400' : 'text-gray-400'
              }`}
            >
              <span className="text-lg mb-0.5">{item.icon}</span>
              <span className="text-xs">{item.name}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default Nav;
