'use client';

import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import Header from '../../components/Header';
import GameCategories from '../../components/GameCategories';
import FeaturedGames from '../../components/FeaturedGames';
import styles from './GamePage.module.css';

const GamePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');

  return (
    <div className={styles.gamePage}>
      <div className={styles.splineBackground}>
        <Spline scene="https://prod.spline.design/QJSMmvXgJd9DGGgj/scene.splinecode" />
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-black z-10"></div>


      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <GameCategories activeTab={activeTab} setActiveTab={setActiveTab} />
          <FeaturedGames activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
};

export default GamePage;
