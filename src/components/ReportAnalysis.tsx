'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

interface ReportData {
  dailyRevenue: number[];
  userGrowth: number[];
  gamePopularity: { [key: string]: number };
  depositWithdrawalRatio: { deposits: number; withdrawals: number };
  retentionRate: number[];
}

const mockReportData: ReportData = {
  dailyRevenue: [50000, 55000, 48000, 60000, 52000, 58000, 62000],
  userGrowth: [100, 120, 110, 130, 140, 135, 150],
  gamePopularity: {
    '百家樂': 35,
    '老虎機': 25,
    '輪盤': 15,
    '德州撲克': 10,
    '骰寶': 8,
    '其他': 7
  },
  depositWithdrawalRatio: { deposits: 1000000, withdrawals: 800000 },
  retentionRate: [100, 80, 60, 50, 40, 35, 30]
};

const ReportAnalysis: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  useEffect(() => {
    // 模擬從API獲取報表數據
    setTimeout(() => {
      setReportData(mockReportData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const dailyRevenueData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{
      label: '每日收入',
      data: reportData?.dailyRevenue || [],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const userGrowthData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{
      label: '新增用戶',
      data: reportData?.userGrowth || [],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1
    }]
  };

  const gamePopularityData = {
    labels: Object.keys(reportData?.gamePopularity || {}),
    datasets: [{
      data: Object.values(reportData?.gamePopularity || {}),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
    }]
  };

  const depositWithdrawalData = {
    labels: ['存款', '提款'],
    datasets: [{
      data: [reportData?.depositWithdrawalRatio.deposits, reportData?.depositWithdrawalRatio.withdrawals],
      backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
    }]
  };

  const retentionRateData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{
      label: '用戶留存率',
      data: reportData?.retentionRate || [],
      borderColor: 'rgb(153, 102, 255)',
      tension: 0.1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">報表分析</h2>

      <div className="mb-6">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option value="7days">最近7天</option>
          <option value="30days">最近30天</option>
          <option value="3months">最近3個月</option>
          <option value="1year">最近1年</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-600">加載中...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">每日收入趨勢</h3>
            <div style={{ height: '300px' }}>
              <Line data={dailyRevenueData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">用戶增長趨勢</h3>
            <div style={{ height: '300px' }}>
              <Bar data={userGrowthData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">遊戲熱度分佈</h3>
            <div style={{ height: '300px' }}>
              <Pie data={gamePopularityData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">存提款比例</h3>
            <div style={{ height: '300px' }}>
              <Pie data={depositWithdrawalData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">用戶留存率</h3>
            <div style={{ height: '300px' }}>
              <Line data={retentionRateData} options={chartOptions} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReportAnalysis;
