'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Game {
  id: number;
  name: string;
  category: string;
  provider: string;
  popularity: number;
  isActive: boolean;
  dailyRevenue: number;
  rtp: number;
}

const mockGames: Game[] = [
  { id: 1, name: "黃金百家樂", category: "百家樂", provider: "Evolution", popularity: 95, isActive: true, dailyRevenue: 50000, rtp: 98.5 },
  { id: 2, name: "幸運輪盤", category: "輪盤", provider: "Playtech", popularity: 88, isActive: true, dailyRevenue: 35000, rtp: 97.3 },
  { id: 3, name: "超級老虎機", category: "老虎機", provider: "Microgaming", popularity: 92, isActive: true, dailyRevenue: 45000, rtp: 96.5 },
  { id: 4, name: "德州撲克", category: "撲克", provider: "PokerStars", popularity: 85, isActive: true, dailyRevenue: 30000, rtp: 99.0 },
  { id: 5, name: "幸運骰寶", category: "骰寶", provider: "SBO", popularity: 80, isActive: false, dailyRevenue: 25000, rtp: 97.8 },
];

const GameManagement: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  useEffect(() => {
    setGames(mockGames);
  }, []);

  const categories = ['全部', ...Array.from(new Set(games.map(game => game.category)))];

  const filteredGames = games.filter(game =>
    (selectedCategory === '全部' || game.category === selectedCategory) &&
    (game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     game.provider.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
  };

  const toggleGameStatus = (gameId: number) => {
    setGames(games.map(game =>
      game.id === gameId ? { ...game, isActive: !game.isActive } : game
    ));
    if (selectedGame && selectedGame.id === gameId) {
      setSelectedGame({ ...selectedGame, isActive: !selectedGame.isActive });
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">遊戲管理</h2>

      <div className="flex mb-6 space-x-4">
        <input
          type="text"
          placeholder="搜索遊戲名稱或供應商"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="flex space-x-6">
        <div className="w-1/2">
          <AnimatePresence>
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleGameClick(game)}
                className="bg-white p-4 mb-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800">{game.name}</h3>
                <p className="text-sm text-gray-600">類別: {game.category}</p>
                <p className="text-sm text-gray-600">供應商: {game.provider}</p>
                <p className="text-sm text-gray-600">
                  狀態:
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    game.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}>
                    {game.isActive ? '啟用' : '停用'}
                  </span>
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {selectedGame && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="w-1/2 bg-white p-6 rounded-lg shadow"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">{selectedGame.name}</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">類別:</span> {selectedGame.category}</p>
                <p><span className="font-semibold">供應商:</span> {selectedGame.provider}</p>
                <p><span className="font-semibold">人氣指數:</span> {selectedGame.popularity}%</p>
                <p><span className="font-semibold">日均收入:</span> ${selectedGame.dailyRevenue.toLocaleString()}</p>
                <p><span className="font-semibold">RTP:</span> {selectedGame.rtp}%</p>
                <p>
                  <span className="font-semibold">狀態:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    selectedGame.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}>
                    {selectedGame.isActive ? '啟用' : '停用'}
                  </span>
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => toggleGameStatus(selectedGame.id)}
                  className={`px-4 py-2 rounded transition-colors ${
                    selectedGame.isActive
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {selectedGame.isActive ? '停用遊戲' : '啟用遊戲'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameManagement;
