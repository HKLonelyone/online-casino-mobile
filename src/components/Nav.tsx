'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BG from '../../img/nav.png';
import tab1 from '../../img/tab1.webp';
import tab2 from '../../img/tab2.webp';
import tab3 from '../../img/tab3.webp';
import tab4 from '../../img/tab4.webp';
import tab5 from '../../img/tab5.webp';

const Nav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: '首頁', path: '/main', icon: tab1, size: 48 },
    { name: '遊戲', path: '/games', icon: tab2, size: 56 },
    { name: '商城', path: '/shop', icon: tab3, size: 60 },
    { name: '排行', path: '/leaderboard', icon: tab4, size: 48 },
    { name: '設定', path: '/settings', icon: tab5, size: 48 },
  ];

  return (
    <motion.nav
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 max-w-mobile mx-auto"
    >
      <div className="relative">
        <Image
          src={BG}
          alt="Navigation background"
          width={500}
          height={100}
          className="w-full h-auto"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-end px-3 py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center p-1 ${
                  pathname === item.path ? 'text-purple-400' : 'text-white'
                } ${item.name === '商城' ? 'mb-2.5' : ''}`}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={item.size}
                  height={item.size}
                  className={`mb-1 ${item.name === '商城' ? '-mt-2.5' : ''}`}
                />
                <span className="text-15px font-medium">{item.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
