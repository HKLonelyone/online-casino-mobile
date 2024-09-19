'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BG from '../../img/AgeVerificationBG.jpg'

interface AgeVerificationProps {
  onVerified: () => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerified }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="relative w-full max-w-[375px] h-[667px] overflow-hidden rounded-3xl shadow-2xl">
        <div className="absolute inset-0 z-0">
          <Image
            src={BG}
            alt="Age Verification Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          <div className="bg-surface rounded-xl p-6 w-full max-w-sm shadow-lg text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">年齡驗證</h2>
            <p className="text-text mb-6">您必須年滿18歲才能進入本網站。</p>
            <div className="space-y-3">
              <button
                onClick={onVerified}
                className="w-full px-4 py-2 bg-primary text-background rounded-full font-semibold text-sm"
              >
                我已滿18歲
              </button>
              <button
                className="w-full px-4 py-2 bg-gray-600 text-text rounded-full font-semibold text-sm"
              >
                我未滿18歲
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AgeVerification;
