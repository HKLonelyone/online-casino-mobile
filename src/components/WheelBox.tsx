"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import wheel1 from '../../img/wheel-1.png';
import wheel2 from '../../img/wheel-2.png';
import wheel3 from '../../img/wheel-3.png';
import wheel4 from '../../img/wheel-4.png';
import wheel5 from '../../img/wheel-5.png';
import wheel6 from '../../img/wheel-6.png';

const WheelBox: React.FC = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + 60) % 360);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wheel-box d-flex justify-content-center align-items-center w-100">
      <div className="pie-box d-flex justify-content-center align-items-center" style={{ transform: `rotate(${angle}deg)` }}>
        <div className="pie" style={{ backgroundImage: `url(${wheel1.src})` }}></div>
        <div className="pie maintain2" style={{ backgroundImage: `url(${wheel2.src})` }}></div>
        <div className="pie" style={{ backgroundImage: `url(${wheel3.src})` }}></div>
        <div className="pie maintain2" style={{ backgroundImage: `url(${wheel5.src})` }}></div>
        <div className="pie" style={{ backgroundImage: `url(${wheel4.src})` }}></div>
        <div className="pie" style={{ backgroundImage: `url(${wheel6.src})` }}></div>
      </div>
    </div>
  );
};

export default WheelBox;
