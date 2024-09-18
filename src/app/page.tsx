'use client';

import React, { useState, useEffect } from 'react';
import AgeVerification from '../components/AgeVerification';
import LoginRegister from '../components/LoginRegister';

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVerification = () => {
    setIsVerified(true);
  };

  if (!isClient) {
    return null;
  }

  if (!isVerified) {
    return <AgeVerification onVerified={handleVerification} />;
  }

  return <LoginRegister />;
}
