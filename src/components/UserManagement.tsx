'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: number;
  username: string;
  email: string;
  vipLevel: number;
  balance: number;
  lastLogin: string;
  status: 'active' | 'suspended' | 'banned';
  totalDeposit: number;
  totalWithdrawal: number;
  favoriteGame: string;
}

const mockUsers: User[] = [
  { id: 1, username: 'player1', email: 'player1@example.com', vipLevel: 3, balance: 5000, lastLogin: '2023-06-15 14:30', status: 'active', totalDeposit: 10000, totalWithdrawal: 8000, favoriteGame: '百家樂' },
  { id: 2, username: 'highroller', email: 'highroller@example.com', vipLevel: 5, balance: 50000, lastLogin: '2023-06-14 22:15', status: 'active', totalDeposit: 100000, totalWithdrawal: 75000, favoriteGame: '輪盤' },
  { id: 3, username: 'luckyguy', email: 'luckyguy@example.com', vipLevel: 2, balance: 1000, lastLogin: '2023-06-13 10:45', status: 'suspended', totalDeposit: 5000, totalWithdrawal: 6000, favoriteGame: '老虎機' },
  { id: 4, username: 'gambler007', email: 'gambler007@example.com', vipLevel: 4, balance: 15000, lastLogin: '2023-06-15 09:20', status: 'active', totalDeposit: 30000, totalWithdrawal: 20000, favoriteGame: '德州撲克' },
  { id: 5, username: 'slotmaster', email: 'slotmaster@example.com', vipLevel: 1, balance: 500, lastLogin: '2023-06-12 18:00', status: 'banned', totalDeposit: 2000, totalWithdrawal: 3000, favoriteGame: '老虎機' },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleStatusChange = (userId: number, newStatus: 'active' | 'suspended' | 'banned') => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ ...selectedUser, status: newStatus });
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">用戶管理</h2>

      <input
        type="text"
        placeholder="搜索用戶名或郵箱"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />


      <div className="flex space-x-6">
        <div className="w-1/2">
          <AnimatePresence>
            {currentUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleUserClick(user)}
                className="bg-white p-4 mb-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
                <p className="text-sm text-gray-600">VIP等級: {user.vipLevel}</p>
                <p className="text-sm text-gray-600">
                  狀態:
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' ? 'bg-green-200 text-green-800' :
                    user.status === 'suspended' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="w-1/2 bg-white p-6 rounded-lg shadow"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">{selectedUser.username}</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">郵箱:</span> {selectedUser.email}</p>
                <p><span className="font-semibold">VIP等級:</span> {selectedUser.vipLevel}</p>
                <p><span className="font-semibold">餘額:</span> ${selectedUser.balance.toLocaleString()}</p>
                <p><span className="font-semibold">最後登入:</span> {selectedUser.lastLogin}</p>
                <p><span className="font-semibold">總存款:</span> ${selectedUser.totalDeposit.toLocaleString()}</p>
                <p><span className="font-semibold">總提款:</span> ${selectedUser.totalWithdrawal.toLocaleString()}</p>
                <p><span className="font-semibold">最愛遊戲:</span> {selectedUser.favoriteGame}</p>
                <p>
                  <span className="font-semibold">狀態:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    selectedUser.status === 'active' ? 'bg-green-200 text-green-800' :
                    selectedUser.status === 'suspended' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {selectedUser.status}
                  </span>
                </p>
              </div>
              <div className="mt-6 space-x-2">
                <button onClick={() => handleStatusChange(selectedUser.id, 'active')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">激活</button>
                <button onClick={() => handleStatusChange(selectedUser.id, 'suspended')} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">暫停</button>
                <button onClick={() => handleStatusChange(selectedUser.id, 'banned')} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">封禁</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:text-gray-500"
        >
          上一頁
        </button>
        <span className="mx-4 py-2 text-gray-700">{currentPage}</span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={indexOfLastUser >= filteredUsers.length}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:text-gray-500"
        >
          下一頁
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
