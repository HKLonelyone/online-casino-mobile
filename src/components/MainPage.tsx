"use client"
import React, { useState } from 'react';
import Header from './Header';
import Carousel from './Carousel';
import GameCategories from './GameCategories';
import FeaturedGames from './FeaturedGames';
import Promotions from './Promotions';
import styles from './MainPage.module.css';
import Announcement from './Announcement';

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');

  return (
    <div className={styles.mainContainer}>
      <Header />
      <main className={styles.content}>
        <Carousel />
        <Announcement />
        <GameCategories activeTab={activeTab} setActiveTab={setActiveTab} />
        <FeaturedGames activeTab={activeTab} />
        <Promotions />
      </main>
    </div>
  );
};

export default MainPage;
