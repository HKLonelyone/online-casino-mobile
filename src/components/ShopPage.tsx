'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ShopPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('充值');

  const rechargeOptions = [
    { id: 1, amount: 100, bonus: 10, icon: '💰' },
    { id: 2, amount: 500, bonus: 75, icon: '💎' },
    { id: 3, amount: 1000, bonus: 200, icon: '🏆' },
    { id: 4, amount: 5000, bonus: 1500, icon: '👑' },
  ];

  const promotions = [
    { id: 1, title: '首充雙倍', description: '首次充值享受雙倍優惠', icon: '🎉' },
    { id: 2, title: 'VIP專屬折扣', description: 'VIP用戶享受9折優惠', icon: '🌟' },
    { id: 3, title: '週末狂歡', description: '週末充值額外贈送10%', icon: '🎊' },
  ];

  const dailyRewards = [
    { id: 1, title: '每日簽到', reward: '10金幣', icon: '📅' },
    { id: 2, title: '幸運轉盤', reward: '隨機獎勵', icon: '🎡' },
    { id: 3, title: '邀請好友', reward: '50金幣/位', icon: '👥' },
  ];

  const tabs = ['充值', '優惠', '每日領取'];

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
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/path-to-user-avatar.jpg"
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-white mr-2"
              />
              <div>
                <span className="text-sm font-bold">VIP1</span>
                <p className="text-xs opacity-75">歡迎來到商城！</p>
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

        <div className="p-2 bg-gray-800 flex justify-center space-x-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        <div className="p-4">
          {selectedTab === '充值' && (
            <div className="grid grid-cols-2 gap-4">
              {rechargeOptions.map((option) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-4 text-center shadow-lg"
                >
                  <div className="text-4xl mb-2">{option.icon}</div>
                  <h3 className="text-lg font-medium text-purple-300">{option.amount} 金幣</h3>
                  <p className="text-sm text-yellow-400">贈送 {option.bonus} 金幣</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold"
                  >
                    立即充值
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}

          {selectedTab === '優惠' && (
            <div className="space-y-4">
              {promotions.map((promo) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 shadow-lg"
                >
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{promo.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold">{promo.title}</h3>
                      <p className="text-sm opacity-75">{promo.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {selectedTab === '每日領取' && (
            <div className="space-y-4">
              {dailyRewards.map((reward) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-4 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">{reward.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold">{reward.title}</h3>
                        <p className="text-sm opacity-75">獎勵: {reward.reward}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-bold"
                    >
                      領取
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
