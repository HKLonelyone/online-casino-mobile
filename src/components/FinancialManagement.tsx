'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// 財務數據類型
interface FinancialData {
  date: string;
  totalRevenue: number;
  totalDeposits: number;
  totalWithdrawals: number;
  pendingWithdrawals: number;
  operatingCosts: number;
}

// 模擬的財務數據
const mockFinancialData: FinancialData[] = [
  { date: '2023-06-01', totalRevenue: 100000, totalDeposits: 150000, totalWithdrawals: 80000, pendingWithdrawals: 20000, operatingCosts: 30000 },
  { date: '2023-06-02', totalRevenue: 120000, totalDeposits: 180000, totalWithdrawals: 90000, pendingWithdrawals: 25000, operatingCosts: 35000 },
  { date: '2023-06-03', totalRevenue: 110000, totalDeposits: 160000, totalWithdrawals: 85000, pendingWithdrawals: 22000, operatingCosts: 32000 },
  { date: '2023-06-04', totalRevenue: 130000, totalDeposits: 200000, totalWithdrawals: 95000, pendingWithdrawals: 28000, operatingCosts: 38000 },
  { date: '2023-06-05', totalRevenue: 140000, totalDeposits: 220000, totalWithdrawals: 100000, pendingWithdrawals: 30000, operatingCosts: 40000 },
];

// 財務管理組件
const FinancialManagement: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模擬從API獲取財務數據
    setTimeout(() => {
      setFinancialData(mockFinancialData);
      setSelectedDate(mockFinancialData[mockFinancialData.length - 1].date);
      setIsLoading(false);
    }, 1000); // 模擬 1 秒的加載時間
  }, []);

  const chartData = {
    labels: financialData.map(data => data.date),
    datasets: [
      {
        label: '總收入',
        data: financialData.map(data => data.totalRevenue),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: '總存款',
        data: financialData.map(data => data.totalDeposits),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      },
      {
        label: '總提款',
        data: financialData.map(data => data.totalWithdrawals),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const selectedDayData = financialData.find(data => data.date === selectedDate);

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">財務管理</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow mb-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-700">財務概覽</h3>
        {isLoading ? (
          <p className="text-center text-gray-600">加載中...</p>
        ) : (
          <div style={{ height: '300px' }}>
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        )}
      </motion.div>

      {!isLoading && (
        <div className="mb-6">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            {financialData.map(data => (
              <option key={data.date} value={data.date}>{data.date}</option>
            ))}
          </select>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isLoading && selectedDayData && (
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <FinancialCard title="總收入" value={selectedDayData.totalRevenue} color="bg-green-100" textColor="text-green-800" />
            <FinancialCard title="總存款" value={selectedDayData.totalDeposits} color="bg-blue-100" textColor="text-blue-800" />
            <FinancialCard title="總提款" value={selectedDayData.totalWithdrawals} color="bg-red-100" textColor="text-red-800" />
            <FinancialCard title="待處理提款" value={selectedDayData.pendingWithdrawals} color="bg-yellow-100" textColor="text-yellow-800" />
            <FinancialCard title="運營成本" value={selectedDayData.operatingCosts} color="bg-purple-100" textColor="text-purple-800" />
            <FinancialCard
              title="淨利潤"
              value={selectedDayData.totalRevenue - selectedDayData.operatingCosts}
              color="bg-indigo-100"
              textColor="text-indigo-800"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 財務卡片組件
const FinancialCard: React.FC<{ title: string; value: number; color: string; textColor: string }> = ({ title, value, color, textColor }) => (
  <div className={`p-4 rounded-lg shadow ${color}`}>
    <h4 className={`text-lg font-semibold mb-2 ${textColor}`}>{title}</h4>
    <p className={`text-2xl font-bold ${textColor}`}>${value.toLocaleString()}</p>
  </div>
);

export default FinancialManagement;
