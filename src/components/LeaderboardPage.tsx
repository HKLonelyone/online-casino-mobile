'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const LeaderboardPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('總排行');

  const categories = ['總排行', '老虎機', '撲克', '百家樂'];

  const leaderboardData = {
    '總排行': [
      { rank: 1, name: '贏家888', score: 1000000, avatar: '/avatar1.jpg' },
      { rank: 2, name: '幸運星', score: 950000, avatar: '/avatar2.jpg' },
      { rank: 3, name: '賭神', score: 900000, avatar: '/avatar3.jpg' },
      { rank: 4, name: '財富大亨', score: 850000, avatar: '/avatar4.jpg' },
      { rank: 5, name: '黃金手', score: 800000, avatar: '/avatar5.jpg' },
    ],
    '老虎機': [
      { rank: 1, name: '轉運王', score: 500000, avatar: '/avatar6.jpg' },
      { rank: 2, name: '幸運7', score: 450000, avatar: '/avatar7.jpg' },
      { rank: 3, name: '百萬富翁', score: 400000, avatar: '/avatar8.jpg' },
      { rank: 4, name: '旋轉達人', score: 350000, avatar: '/avatar9.jpg' },
      { rank: 5, name: '小賭怡情', score: 300000, avatar: '/avatar10.jpg' },
    ],
    '撲克': [
      { rank: 1, name: '撲克之王', score: 300000, avatar: '/avatar11.jpg' },
      { rank: 2, name: '全下高手', score: 280000, avatar: '/avatar12.jpg' },
      { rank: 3, name: '冷面殺手', score: 260000, avatar: '/avatar13.jpg' },
      { rank: 4, name: '算牌達人', score: 240000, avatar: '/avatar14.jpg' },
      { rank: 5, name: '德州之星', score: 220000, avatar: '/avatar15.jpg' },
    ],
    '百家樂': [
      { rank: 1, name: '莊閒通吃', score: 400000, avatar: '/avatar16.jpg' },
      { rank: 2, name: '點數大師', score: 380000, avatar: '/avatar17.jpg' },
      { rank: 3, name: '賭場之王', score: 360000, avatar: '/avatar18.jpg' },
      { rank: 4, name: '百家樂高手', score: 340000, avatar: '/avatar19.jpg' },
      { rank: 5, name: '幸運莊家', score: 320000, avatar: '/avatar20.jpg' },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-16">
      <div className="fixed inset-0 bg-gradient-to-b from-purple-600 to-indigo-600 opacity-50 z-0"></div>

      <div className="relative z-10">
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 sticky top-0 z-20 shadow-md"
        >
          <h1 className="text-2xl font-bold text-center">排行榜</h1>
        </motion.div>

        <div className="p-2 bg-gray-800 flex justify-center space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {leaderboardData[selectedCategory].map((item, index) => (
                <motion.div
                  key={item.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg p-4 mb-3 flex items-center"
                >
                  <div className="w-8 h-8 flex items-center justify-center font-bold text-lg mr-4">
                    {item.rank <= 3 ? (
                      <span className={`text-2xl ${
                        item.rank === 1 ? 'text-yellow-400' :
                        item.rank === 2 ? 'text-gray-400' :
                        'text-yellow-700'
                      }`}>
                        {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : '🥉'}
                      </span>
                    ) : (
                      <span>{item.rank}</span>
                    )}
                  </div>
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.score.toLocaleString()} 積分</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
