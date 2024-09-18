'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Transaction {
  id: string;
  userId: string;
  username: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  game?: string;
}

const mockTransactions: Transaction[] = [
  { id: 'T001', userId: 'U123', username: 'player1', type: 'deposit', amount: 1000, status: 'completed', timestamp: '2023-06-15 10:30:00' },
  { id: 'T002', userId: 'U124', username: 'highroller', type: 'withdrawal', amount: 5000, status: 'pending', timestamp: '2023-06-15 11:45:00' },
  { id: 'T003', userId: 'U125', username: 'luckyguy', type: 'bet', amount: 100, status: 'completed', timestamp: '2023-06-15 12:15:00', game: '百家樂' },
  { id: 'T004', userId: 'U126', username: 'gambler007', type: 'win', amount: 2000, status: 'completed', timestamp: '2023-06-15 13:00:00', game: '老虎機' },
  { id: 'T005', userId: 'U127', username: 'newbie', type: 'deposit', amount: 500, status: 'failed', timestamp: '2023-06-15 14:20:00' },
];

const TransactionRecord: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = transactions.filter(transaction =>
      (filterType === 'all' || transaction.type === filterType) &&
      (filterStatus === 'all' || transaction.status === filterStatus) &&
      (transaction.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
       transaction.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredTransactions(filtered);
  }, [searchTerm, filterType, filterStatus, transactions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit': return '💰';
      case 'withdrawal': return '💸';
      case 'bet': return '🎰';
      case 'win': return '🏆';
      default: return '❓';
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">交易記錄</h2>

      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="搜索用戶名或交易ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option value="all">所有類型</option>
          <option value="deposit">存款</option>
          <option value="withdrawal">提款</option>
          <option value="bet">下注</option>
          <option value="win">贏利</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option value="all">所有狀態</option>
          <option value="completed">已完成</option>
          <option value="pending">處理中</option>
          <option value="failed">失敗</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-600">加載中...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用戶名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">類型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金額</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">狀態</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時間</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredTransactions.map((transaction) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="mr-2">{getTypeIcon(transaction.type)}</span>
                        {transaction.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${transaction.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.timestamp}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TransactionRecord;
