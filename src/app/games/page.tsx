'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import game1Icon from '../../../img/game-Power of Thor_tw.png';
import game2Icon from '../../../img/game-Golden Niu-Niu_tw.png';
import game3Icon from '../../../img/game-Get Hooked_tw.png';
import game4Icon from '../../../img/game-Poker_tw.png';
import icon from '../../../img/Icon.png';

const GamePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const games = [
    { id: 1, name: '百家樂', icon: game1Icon, category: '棋牌' },
    { id: 2, name: '老虎機', icon: game3Icon, category: '老虎機' },
    { id: 3, name: '輪盤', icon: game2Icon, category: '桌遊' },
    { id: 4, name: '德州撲克', icon: game1Icon, category: '棋牌' },
    { id: 5, name: '21點', icon: game2Icon, category: '桌遊' },
    { id: 6, name: '骰寶', icon: game4Icon, category: '桌遊' },
    { id: 7, name: '水果機', icon: game4Icon, category: '老虎機' },
    { id: 8, name: '魚蝦蟹', icon: game3Icon, category: '桌遊' },
    { id: 9, name: '麻將', icon: game4Icon, category: '棋牌' },
  ];

  const categories = ['全部', '棋牌', '老虎機', '桌遊'];

  const filteredGames = selectedCategory === '全部'
    ? games
    : games.filter(game => game.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-16">
      <div className="fixed inset-0 z-0">
        <Spline scene="https://prod.spline.design/QJSMmvXgJd9DGGgj/scene.splinecode" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-16 bg-black z-10"></div>

      <div className="relative z-10">
        {/* 頂部用戶信息 */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 sticky top-0 z-20 shadow-md"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src={icon}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-white mr-2"
              />
              <div>
                <span className="text-sm font-bold">VIP1</span>
                <p className="text-xs opacity-75">歡迎回來！</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-300 mr-2 font-bold">1,000.00</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white bg-opacity-20 p-1 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* 分類選擇器 */}
        <div className="p-2 bg-gray-800 flex justify-center space-x-5">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2 py-1 rounded-full text-xs font-medium ${selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300'
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* 遊戲列表 */}
        <div className="px-4 grid grid-cols-2 gap-4 mt-4">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-4 text-center shadow-lg"
            >
              <div className="mb-2 flex justify-center">
                <Image
                  src={game.icon}
                  alt={game.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-medium text-purple-300">{game.name}</h3>
              <p className="text-sm text-gray-400">{game.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
