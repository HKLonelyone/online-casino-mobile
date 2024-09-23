import React, { useState, useEffect } from 'react';
import styles from './Announcement.module.css';
import Image from 'next/image';
import bgMarquee from '../../img/bg-maquee.webp';

const Announcement: React.FC = () => {
  const announcements = [
    "新遊戲上線啦！",
    "限時優惠，立即參與！",
    "邀請好友送大禮！",
    "週末抽獎活動開始了！"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.marqueeBox}>
      <Image src={bgMarquee} alt="Marquee Background" layout="fill" objectFit="cover" />
      <div className={styles.marquee}>
        <span className={styles.marqueeMessage}>
          {announcements[currentIndex]}
        </span>
      </div>
    </div>
  );
};

export default Announcement;
