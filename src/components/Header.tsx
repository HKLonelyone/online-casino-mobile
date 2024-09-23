import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';
import headImg from '../../img/head.png';
import iconMoney from '../../img/icon-money.png';
import iconMoneyExchange from '../../img/icon-money-exchange.png';
import iconHeaderSetting from '../../img/icon-header-setting.png';
import headerMoneyTextBox from '../../img/header-money-text-box.png';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>
        <div className={styles.userInfo}>
          <Image className={styles.thumb} src={headImg} alt="User" width={40} height={40} />
          <div>
            <div className={styles.userName}>Hello World</div>
            <div className={styles.level}>VIP1</div>
          </div>
        </div>
        <div className={styles.divR}>
          <div className={styles.userMoney}>
            <Image src={headerMoneyTextBox} alt="Money background" layout="fill" objectFit="contain" />
            <div className={styles.iconMoney}>
              <Image src={iconMoney} alt="Money" width={32} height={32} />
            </div>
            <div className={styles.moneyContent}>
              <div className={styles.count}>220000000</div>
              <Link href="/settings/payment-methods" className={styles.iconMoneyExchange}>
                <Image src={iconMoneyExchange} alt="Exchange" width={20} height={20} />
              </Link>
            </div>
          </div>
          <div className={styles.userSetting} onClick={onMenuToggle}>
            <Image src={iconHeaderSetting} alt="Settings" width={20} height={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
