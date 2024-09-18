'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const SecuritySettingsPage: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginNotificationsEnabled, setLoginNotificationsEnabled] = useState(true);
  const [lastPasswordChange, setLastPasswordChange] = useState('2023-05-15');
  const [activeDevices, setActiveDevices] = useState([
    { id: 1, name: 'iPhone 12', lastActive: '2023-06-01 14:30' },
    { id: 2, name: 'MacBook Pro', lastActive: '2023-06-02 09:15' },
  ]);

  const toggleSwitch = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => !prev);
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
          <h1 className="text-2xl font-bold text-center">安全設置</h1>
        </motion.div>

        <div className="p-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold mb-1">兩步驗證</h3>
                <p className="text-sm text-gray-400">增加帳號安全性</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleSwitch(setTwoFactorEnabled)}
                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                  twoFactorEnabled ? 'bg-purple-600' : 'bg-gray-700'
                }`}
              >
                <motion.div
                  className="bg-white w-4 h-4 rounded-full shadow-md"
                  animate={{ x: twoFactorEnabled ? 24 : 0 }}
                />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold mb-1">登入通知</h3>
                <p className="text-sm text-gray-400">當有新裝置登入時通知我</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleSwitch(setLoginNotificationsEnabled)}
                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                  loginNotificationsEnabled ? 'bg-purple-600' : 'bg-gray-700'
                }`}
              >
                <motion.div
                  className="bg-white w-4 h-4 rounded-full shadow-md"
                  animate={{ x: loginNotificationsEnabled ? 24 : 0 }}
                />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-4"
          >
            <h3 className="text-lg font-bold mb-1">密碼安全</h3>
            <p className="text-sm text-gray-400 mb-2">上次更改密碼: {lastPasswordChange}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold"
            >
              更改密碼
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-gray-800 rounded-lg p-4"
          >
            <h3 className="text-lg font-bold mb-3">活躍裝置</h3>
            {activeDevices.map((device) => (
              <div key={device.id} className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-sm text-gray-400">上次活躍: {device.lastActive}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 text-white px-3 py-1 rounded-full text-xs"
                >
                  登出
                </motion.button>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-gray-800 rounded-lg p-4"
          >
            <h3 className="text-lg font-bold mb-3">帳號恢復選項</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-2 w-full"
            >
              設置恢復郵箱
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold w-full"
            >
              設置恢復手機
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsPage;
