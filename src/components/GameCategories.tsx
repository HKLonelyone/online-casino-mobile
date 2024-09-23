import React from 'react';
import styles from './GameCategories.module.css';
import Image from 'next/image';
import gameBarBg from '../../img/games-bar-bg.png';

interface GameCategoriesProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const GameCategories: React.FC<GameCategoriesProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['全部', '最愛', '電動', '街機', '棋牌', '競猜'];

  return (
    <div className={styles.gameTabsContainer}>
      <Image src={gameBarBg} alt="Game bar background" layout="fill" objectFit="contain" />
      <div className={styles.tabsWrapper}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameCategories;
