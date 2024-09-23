'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import IconImage from '../../img/Icon.png';
import Spline from '@splinetool/react-spline';

interface LeaderboardItem {
  rank: number;
  name: string;
  score: number;
}

type LeaderboardData = {
  [key: string]: LeaderboardItem[];
};

const LeaderboardPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('總排行');

  const categories = ['總排行', '老虎機', '撲克', '百家樂'];

  const leaderboardData: LeaderboardData = {
    '總排行': [
      { rank: 1, name: '贏家888', score: 10000 },
      { rank: 2, name: '幸運星', score: 9500 },
      { rank: 3, name: '賭神', score: 9000 },
      { rank: 4, name: '財富大亨', score: 8500 },
      { rank: 5, name: '黃金手', score: 8000 },
    ],
    '老虎機': [
      { rank: 1, name: '轉運王', score: 5000 },
      { rank: 2, name: '幸運7', score: 4500 },
      { rank: 3, name: '百萬富翁', score: 4000 },
      { rank: 4, name: '旋轉達人', score: 3500 },
      { rank: 5, name: '小賭怡情', score: 3000 },
    ],
    '撲克': [
      { rank: 1, name: '撲克之王', score: 3000 },
      { rank: 2, name: '全下高手', score: 2800 },
      { rank: 3, name: '冷面殺手', score: 2600 },
      { rank: 4, name: '算牌達人', score: 2400 },
      { rank: 5, name: '德州之星', score: 2200 },
    ],
    '百家樂': [
      { rank: 1, name: '莊閒通吃', score: 4000 },
      { rank: 2, name: '點數大師', score: 3800 },
      { rank: 3, name: '賭場之王', score: 3600 },
      { rank: 4, name: '百家樂高手', score: 3400 },
      { rank: 5, name: '幸運莊家', score: 3200 },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-16">
      <div className="fixed inset-0 z-0">
        <Spline scene="https://prod.spline.design/QJSMmvXgJd9DGGgj/scene.splinecode" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-16 bg-black z-10"></div>

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
                    src={IconImage}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold text-xl">{item.name}</h3>
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
