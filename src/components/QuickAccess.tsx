import React from 'react';
import styles from './QuickAccess.module.css';

const QuickAccess: React.FC = () => {
  const quickLinks = [
    { icon: '💰', label: '存款' },
    { icon: '🎁', label: '優惠' },
    { icon: '🏆', label: 'VIP' },
    { icon: '📞', label: '客服' },
  ];

  return (
    <div className={styles.quickAccess}>
      {quickLinks.map((link, index) => (
        <button key={index} className={styles.quickLink}>
          <span className={styles.icon}>{link.icon}</span>
          <span className={styles.label}>{link.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickAccess;
