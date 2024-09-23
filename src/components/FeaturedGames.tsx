import React from 'react';
import Image from 'next/image';
import styles from './FeaturedGames.module.css';
import icon1 from '../../img/icons/1.png';
import icon2 from '../../img/icons/2.png';
import icon3 from '../../img/icons/3.png';
import icon4 from '../../img/icons/4.png';
import icon5 from '../../img/icons/5.png';
import icon6 from '../../img/icons/6.png';
import icon7 from '../../img/icons/7.png';
import icon8 from '../../img/icons/8.png';
import icon9 from '../../img/icons/9.png';
import icon10 from '../../img/icons/10.png';
import loveIcon from '../../img/love_icon.png';

interface FeaturedGamesProps {
  activeTab: string;
}

const FeaturedGames: React.FC<FeaturedGamesProps> = ({ activeTab }) => {
  const allGames = [
    { id: 1, icon: icon1, category: '電動' },
    { id: 2, icon: icon2, category: '街機' },
    { id: 3, icon: icon3, category: '棋牌' },
    { id: 4, icon: icon4, category: '競猜' },
    { id: 5, icon: icon5, category: '電動' },
    { id: 6, icon: icon6, category: '街機' },
    { id: 7, icon: icon7, category: '棋牌' },
    { id: 8, icon: icon8, category: '競猜' },
    { id: 9, icon: icon9, category: '電動' },
    { id: 10, icon: icon10, category: '街機' },
  ];

  const filteredGames = activeTab === '全部'
    ? allGames
    : allGames.filter(game => game.category === activeTab);

  return (
    <div className={styles.featuredGames}>
      <h2 className={styles.title}>熱門遊戲</h2>
      <div className={styles.gameGrid}>
        {filteredGames.map((game) => (
          <div key={game.id} className={`${styles.gameCard} ${game.id === 1 ? styles.largeCard : ''}`}>
            <Image src={game.icon} alt={`遊戲 ${game.id}`} layout="responsive" width={100} height={100} />
            <span className={styles.favoriteIcon}>
              <Image src={loveIcon} alt="Favorite" width={24} height={24} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedGames;
