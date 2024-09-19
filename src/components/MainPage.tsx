'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import icon from '../../img/Icon.png';
import announcement from '../../img/announcement.png';
import game1Icon from '../../img/game-Power of Thor_tw.png';
import game2Icon from '../../img/game-Golden Niu-Niu_tw.png';
import game3Icon from '../../img/game-Get Hooked_tw.png';
import game4Icon from '../../img/game-Poker_tw.png';

const MainPage: React.FC = () => {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [activePopups, setActivePopups] = useState<number[]>([0, 1, 2]);

  const games = [
    { id: 1, name: '戰神霄雷', icon: game1Icon, category: '老虎機', jackpot: '2,094,511' },
    { id: 2, name: '幸運霸大夢', icon: game2Icon, category: '老虎機', jackpot: '10,366' },
    { id: 3, name: '金銀島', icon: game3Icon, category: '老虎機', jackpot: '91,103' },
    { id: 4, name: '雷神', icon: game4Icon, category: '老虎機', jackpot: '4,064' },
  ];

  const announcements = [
    "歡迎來到夢幻娛樂城！新用戶首存送100%",
    "週末狂歡！所有遊戲返水加倍",
    "每日簽到，贏取免費籌碼",
    "VIP會員專屬優惠，詳情請洽客服"
  ];

  const popups = [
    { id: 0, title: "新用戶大禮包", content: "首存1000送1000，還有100次免費旋轉！" },
    { id: 1, title: "週年慶活動", content: "參與週年慶遊戲，贏取豪華度假套餐" },
    { id: 2, title: "限時搶購", content: "VIP會員限時優惠，充值享9折" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) =>
        (prevIndex + 1) % announcements.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const closePopup = (id: number) => {
    setActivePopups(activePopups.filter(popupId => popupId !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden"
    >
      <div className="fixed inset-0 z-0">
        <Spline scene="https://prod.spline.design/QJSMmvXgJd9DGGgj/scene.splinecode" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-16 bg-black z-10"></div>

      <div className="relative z-10 pb-20">
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 relative"
        >
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

          <div className="absolute top-2 right-2 flex items-center">
            <span className="text-yellow-300 font-bold mr-2">1,000.00</span>
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
        </motion.div>

        <div className="relative">
          <Image
            src={announcement}
            alt="Announcement background"
            width={500}
            height={10}
            className="w-full h-[40px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <span className="text-lg font-bold mr-2 text-white">公告:</span>
            <motion.p
              key={currentAnnouncementIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-white text-sm md:text-base overflow-hidden"
            >
              {announcements[currentAnnouncementIndex]}
            </motion.p>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-4 text-purple-300">熱門遊戲</h2>
            <div className="grid grid-cols-2 gap-4">
              {games.map((game) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-3 shadow-lg"
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
                  <h3 className="text-sm font-bold text-purple-300 text-center">{game.name}</h3>
                  <p className="text-xs text-yellow-400 mt-1 text-center">獎池: {game.jackpot}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-purple-300">最新優惠</h2>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-4 shadow-lg"
            >
              <h3 className="text-lg font-bold mb-2">新用戶首存送100%</h3>
              <p className="text-sm opacity-75 mb-3">最高可獲得1000元獎金！</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-bold"
              >
                立即領取
              </motion.button>
            </motion.div>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {activePopups.map((popupId) => {
          const popup = popups.find(p => p.id === popupId);
          if (!popup) return null;
          return (
            <motion.div
              key={popup.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-gray-800 rounded-lg p-6 m-4 max-w-sm w-full shadow-lg border border-purple-500">
                <h3 className="text-xl font-bold text-purple-300 mb-4">{popup.title}</h3>
                <p className="text-gray-300 mb-4">{popup.content}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => closePopup(popup.id)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold w-full"
                >
                  關閉
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default MainPage;
