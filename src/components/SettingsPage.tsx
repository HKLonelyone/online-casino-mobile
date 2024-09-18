'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SettingsPage: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('繁體中文');
  const router = useRouter();

  const toggleSwitch = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => !prev);
  };

  const handleAccountSettings = () => {
    router.push('/settings/account');
  };

  const handleAccountSettings2 = () => {
    router.push('/settings/help-center');
  };

  const handleAccountSettings3 = () => {
    router.push('/settings/payment-methods');
  };

  const handleAccountSettings4 = () => {
    router.push('/settings/security');
  };

  const settingsOptions = [
    { id: 'account', title: '帳號設置', icon: '👤', action: '管理', handler: handleAccountSettings },
    { id: 'security', title: '安全設置', icon: '🔒', action: '查看', handler: handleAccountSettings4 },
    { id: 'payment', title: '支付方式', icon: '💳', action: '編輯', handler: handleAccountSettings3 },
    { id: 'help', title: '幫助中心', icon: '❓', action: '訪問', handler: handleAccountSettings2 },
    { id: 'about', title: '關於我們', icon: 'ℹ️', action: '了解' },
  ];

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
              <p className="text-xs opacity-75">設置您的偏好</p>
            </div>
          </div>
        </motion.div>

        <div className="p-4 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">🔊</span>
              <span>聲音</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleSwitch(setSoundEnabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 ${
                soundEnabled ? 'bg-purple-600' : 'bg-gray-700'
              }`}
            >
              <motion.div
                className="bg-white w-4 h-4 rounded-full shadow-md"
                animate={{ x: soundEnabled ? 24 : 0 }}
              />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">🔔</span>
              <span>通知</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleSwitch(setNotificationsEnabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 ${
                notificationsEnabled ? 'bg-purple-600' : 'bg-gray-700'
              }`}
            >
              <motion.div
                className="bg-white w-4 h-4 rounded-full shadow-md"
                animate={{ x: notificationsEnabled ? 24 : 0 }}
              />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-4"
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">🌐</span>
              <span>語言</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-md p-2"
            >
              <option value="繁體中文">繁體中文</option>
              <option value="English">English</option>
              <option value="日本語">日本語</option>
            </select>
          </motion.div>

          {settingsOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{option.icon}</span>
                <span>{option.title}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
                onClick={option.handler}
              >
                {option.action}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
