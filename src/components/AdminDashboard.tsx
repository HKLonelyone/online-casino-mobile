'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, TimeScale } from 'chart.js';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import UserManagement from './UserManagement';
import GameManagement from './GameManagement';
import FinancialManagement from './FinancialManagement';
import TransactionRecord from './TransactionRecord';
import ReportAnalysis from './ReportAnalysis';
import SystemSettings from './SystemSettings';
import AnnouncementsAndEvents from './AnnouncementsAndEvents';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, TimeScale);

// 假設的數據
const dashboardData = {
  users: { total: 50000, online: 3500, new: 1200, vip: 2000 },
  finance: { revenue: 5000000, deposits: 3000000, withdrawals: 2000000, pendingWithdrawals: 500000 },
  games: { total: 200, active: 150, popular: ['百家樂', '老虎機', '德州撲克'] },
  transactions: { total: 20000, deposits: 12000, withdrawals: 8000 }
};

// 圖表數據
const userChartData = {
  labels: ['普通用戶', 'VIP用戶', '新用戶'],
  datasets: [{
    data: [46800, 2000, 1200],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  }]
};

const revenueChartData = {
  labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
  datasets: [{
    label: '收入',
    data: [3500000, 3900000, 4200000, 4800000, 4600000, 5000000],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const gameActivityData = {
  labels: ['百家樂', '老虎機', '德州撲克', '輪盤', '骰寶', '其他'],
  datasets: [{
    label: '遊戲活躍度',
    data: [300, 250, 200, 150, 100, 50],
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
};

const depositWithdrawalData = {
  labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
  datasets: [
    {
      label: '存款',
      data: [2800000, 3100000, 3300000, 3600000, 3400000, 3000000],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    {
      label: '提款',
      data: [2000000, 2200000, 2400000, 2600000, 2500000, 2000000],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ]
};

const userRetentionData = {
  labels: ['1天', '7天', '30天', '90天'],
  datasets: [{
    label: '用戶留存率',
    data: [90, 70, 50, 30],
    backgroundColor: 'rgba(153, 102, 255, 0.5)',
    borderColor: 'rgb(153, 102, 255)',
    borderWidth: 1
  }]
};

const vipDistributionData = {
  labels: ['青銅', '白銀', '黃金', '鑽石', '至尊'],
  datasets: [{
    data: [1000, 500, 300, 150, 50],
    backgroundColor: [
      '#CD7F32',
      '#C0C0C0',
      '#FFD700',
      '#B9F2FF',
      '#FF4500'
    ],
    hoverBackgroundColor: [
      '#CD7F32',
      '#C0C0C0',
      '#FFD700',
      '#B9F2FF',
      '#FF4500'
    ]
  }]
};

// 新的側邊欄圖標組件
const SidebarItem: React.FC<{ icon: string; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
        borderRadius: '8px',
        marginBottom: '10px',
        width: '100%'
      }}
    >
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isActive ? '#3498db' : 'transparent',
        color: isActive ? 'white' : '#a0aec0',
        fontSize: '20px',
        marginRight: '10px'
      }}>
        {icon}
      </div>
      <span style={{ color: isActive ? 'white' : '#a0aec0', fontSize: '14px' }}>{label}</span>
    </motion.div>
  );

  // 主要的 AdminDashboard 組件
  const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isClient, setIsClient] = useState(false);

    const tabs = [
      { id: 'dashboard', icon: '📊', label: '儀表板' },
      { id: 'users', icon: '👥', label: '用戶管理' },
      { id: 'games', icon: '🎰', label: '遊戲管理' },
      { id: 'finance', icon: '💰', label: '財務管理' },
      { id: 'transactions', icon: '💳', label: '交易記錄' },
      { id: 'reports', icon: '📈', label: '報表分析' },
      { id: 'settings', icon: '⚙️', label: '系統設置' },
      { id: 'announcements', icon: '🆘', label: '更新公告或活動' },
    ];

    useEffect(() => {
      setIsClient(true);
    }, []);

    const ChartWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
      <div style={{ width: 'calc(33.33% - 20px)', height: '300px', margin: '10px', backgroundColor: 'white', borderRadius: '8px', padding: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '10px', textAlign: 'center', color: '#2c3e50' }}>{title}</h4>
        <div style={{ flex: 1, position: 'relative' }}>
          {children}
        </div>
      </div>
    );

    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          style={{
            width: '250px',
            height: '100%',
            backgroundColor: '#2c3e50',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}
        >
          <h1 style={{ color: 'white', fontSize: '24px', marginBottom: '30px', textAlign: 'center' }}>管理後台</h1>
          {tabs.map((tab) => (
            <SidebarItem
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </motion.div>

        <div style={{ flex: 1, height: '100%', overflow: 'auto', backgroundColor: '#f0f4f8' }}>
          <div style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#2c3e50' }}>{tabs.find(tab => tab.id === activeTab)?.label}</h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'dashboard' && isClient && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', margin: '-10px' }}>
                    <ChartWrapper title="月收入趨勢">
                      <Line data={revenueChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </ChartWrapper>
                    <ChartWrapper title="用戶分佈">
                      <Pie data={userChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </ChartWrapper>
                    <ChartWrapper title="遊戲活躍度">
                      <Bar data={gameActivityData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </ChartWrapper>
                    <ChartWrapper title="存提款趨勢">
                      <Line data={depositWithdrawalData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </ChartWrapper>
                    <ChartWrapper title="用戶留存率">
                      <Bar data={userRetentionData} options={{ responsive: true, maintainAspectRatio: false, indexAxis: 'y' }} />
                    </ChartWrapper>
                    <ChartWrapper title="VIP用戶分佈">
                      <Doughnut data={vipDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </ChartWrapper>
                  </div>
                )}
                {activeTab === 'users' && <UserManagement />}
                {activeTab === 'games' && <GameManagement />}
                {activeTab === 'finance' && <FinancialManagement />}
                {activeTab === 'transactions' && <TransactionRecord />}
                {activeTab === 'reports' && <ReportAnalysis />}
                {activeTab === 'settings' && <SystemSettings />}
                {activeTab === 'announcements' && <AnnouncementsAndEvents />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  export default AdminDashboard;
