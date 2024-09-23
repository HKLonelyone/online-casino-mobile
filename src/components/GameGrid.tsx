import React from 'react';
import Image from 'next/image';

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

const GameGrid: React.FC = () => {
  const games = [
    { id: 1, icon: icon1 },
    { id: 2, icon: icon2 },
    { id: 3, icon: icon3 },
    { id: 4, icon: icon4 },
    { id: 5, icon: icon5 },
    { id: 6, icon: icon6 },
    { id: 7, icon: icon7 },
    { id: 8, icon: icon8 },
    { id: 9, icon: icon9 },
    { id: 10, icon: icon10 },
  ];

  return (
    <div className="general-content pt-3">
      <div className="container">
        <div className="row g-3">
          {games.map((game) => (
            <div key={game.id} className={game.id === 1 ? "col-8" : "col-4"}>
              <div className="card rounded-5">
                <Image src={game.icon} alt={`Game ${game.id}`} />
                <span className="favorite-icon position-absolute start-100 translate-middle badge">
                  <Image className="favorite-icon-img" src={loveIcon} alt="Favorite" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
