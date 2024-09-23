'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import Spline from '@splinetool/react-spline';
import Logo from '../../img/logo.png';
import googleIcon from '../../img/google.png';
import facebookIcon from '../../img/facebook.png';
import twitterIcon from '../../img/twitter.png';

const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in...' : 'Registering...');
    router.push('/main');
  };

  const icons: { [key: string]: StaticImageData } = {
    google: googleIcon,
    facebook: facebookIcon,
    twitter: twitterIcon
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      {/* Spline 3D 背景 */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/s5YDp6ejRN4SvBEY/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* 遮蓋 "Built with Spline" 標誌的元素 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black z-10"></div>

      {/* 登入/註冊表單 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-90 rounded-xl p-8 w-full max-w-md z-20 shadow-lg relative"
      >
        <div className="text-center mb-8">
          <Image
            src={Logo}
            alt="Logo"
            width={200}
            height={100}
            className="mx-auto mb-4"
          />
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-purple-300"
          >
            {isLogin ? '歡迎回來' : '加入我們'}
          </motion.h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <input
                type="text"
                placeholder="用戶名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </motion.div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <input
                  type="email"
                  placeholder="電子郵件"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="password"
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </motion.div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <input
                  type="password"
                  placeholder="確認密碼"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-full font-semibold text-sm shadow-lg"
            >
              {isLogin ? '登入' : '註冊'}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-center text-sm text-gray-400"
        >
          {isLogin ? '還沒有帳號？' : '已經有帳號了？'}
          <button
            onClick={toggleMode}
            className="text-purple-300 hover:underline ml-1 font-semibold"
          >
            {isLogin ? '立即註冊' : '立即登入'}
          </button>
        </motion.p>

        <div className="mt-8">
          <p className="text-center text-sm text-gray-400 mb-4">或使用以下方式登入</p>
          <div className="flex justify-center space-x-4">
            {['google', 'facebook', 'twitter'].map((platform) => (
              <motion.button
                key={platform}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-700 p-2 rounded-full"
              >
                <Image
                  src={icons[platform as keyof typeof icons]}
                  alt={`${platform} login`}
                  width={24}
                  height={24}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginRegister;
