import React from 'react';
import Image from 'next/image';
import styles from './Promotions.module.css';


const Promotions: React.FC = () => {
  const promotions = [
    { title: '新會員首存優惠', description: '首次存款獲得100%獎金，最高10,000元' },
    { title: '每週返水活動', description: '每週五返還5%流水，無上限!' },
    { title: '邀請好友獎勵', description: '每邀請一位好友註冊並存款，獲得500元獎勵' },
  ];

  return (
    <div className={styles.promotions}>
      <h2 className={styles.title}>最新優惠</h2>
      <div className={styles.promoContainer}>
        {promotions.map((promo, index) => (
          <div key={index} className={styles.promoCard}>
            <div className={styles.promoImageWrapper}>

            </div>
            <div className={styles.promoContent}>
              <h3 className={styles.promoTitle}>{promo.title}</h3>
              <p className={styles.promoDescription}>{promo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
