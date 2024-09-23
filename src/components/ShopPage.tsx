'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import Header from './Header';
import styles from './ShopPage.module.css';

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
    <div className={styles.shopPage}>
      <div className={styles.splineBackground}>
        <Spline scene="https://prod.spline.design/QJSMmvXgJd9DGGgj/scene.splinecode" />
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-black z-10"></div>

      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <div className={styles.tabContainer}>
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.tabButton} ${selectedTab === tab ? styles.activeTab : ''}`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {selectedTab === '充值' && (
              <div className={styles.rechargeGrid}>
                {rechargeOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.rechargeOption}
                  >
                    <div className={styles.rechargeIcon}>{option.icon}</div>
                    <h3 className={styles.rechargeAmount}>{option.amount} 金幣</h3>
                    <p className={styles.rechargeBonus}>贈送 {option.bonus} 金幣</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={styles.rechargeButton}
                    >
                      立即充值
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === '優惠' && (
              <div className={styles.promotionList}>
                {promotions.map((promo) => (
                  <motion.div
                    key={promo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.promotionItem}
                  >
                    <div className={styles.promotionIcon}>{promo.icon}</div>
                    <div className={styles.promotionContent}>
                      <h3 className={styles.promotionTitle}>{promo.title}</h3>
                      <p className={styles.promotionDescription}>{promo.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === '每日領取' && (
              <div className={styles.rewardList}>
                {dailyRewards.map((reward) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.rewardItem}
                  >
                    <div className={styles.rewardIcon}>{reward.icon}</div>
                    <div className={styles.rewardContent}>
                      <h3 className={styles.rewardTitle}>{reward.title}</h3>
                      <p className={styles.rewardDescription}>獎勵: {reward.reward}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={styles.rewardButton}
                    >
                      領取
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
