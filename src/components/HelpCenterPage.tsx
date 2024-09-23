'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const categories = ['全部', '帳戶', '支付', '遊戲', '技術'];

  const faqs = [
    { id: 1, category: '帳戶', question: '如何更改我的密碼？', answer: '您可以在"設置"中的"安全設置"選項中更改密碼。' },
    { id: 2, category: '支付', question: '支持哪些支付方式？', answer: '我們支持信用卡、PayPal、Line Pay和多種加密貨幣。' },
    { id: 3, category: '遊戲', question: '遊戲出現卡頓怎麼辦？', answer: '請檢查您的網絡連接,或嘗試刷新頁面。如果問題持續,請聯繫客戶支持。' },
    { id: 4, category: '技術', question: '無法登錄怎麼辦？', answer: '請確保您的用戶名和密碼正確。如果忘記密碼,可以使用"忘記密碼"功能重置。' },
  ];

  const filteredFaqs = faqs.filter(faq =>
    (selectedCategory === '全部' || faq.category === selectedCategory) &&
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          <h1 className="text-2xl font-bold text-center">幫助中心</h1>
        </motion.div>

        <div className="p-4">
          <input
            type="text"
            placeholder="搜索幫助..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="px-4 pb-4">
          <div className="flex justify-between">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-4">
          <AnimatePresence>
            {filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 rounded-lg p-4"
              >
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 p-4"
        >
          <h2 className="text-xl font-bold mb-4">還有問題？</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold"
          >
            聯繫客戶支持
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
