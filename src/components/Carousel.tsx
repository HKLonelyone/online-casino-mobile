"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css';
import slide1 from '../../img/1.webp';
import slide2 from '../../img/2.webp';
import slide3 from '../../img/3.webp';
import slide4 from '../../img/4.webp';
import slide5 from '../../img/5.webp';
import slide6 from '../../img/6.webp';

const Carousel: React.FC = () => {
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.carousel}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
        >
          <Image src={slide} alt={`幻燈片 ${index + 1}`} layout="fill" objectFit="cover" />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
