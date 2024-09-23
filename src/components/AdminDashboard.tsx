'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import UserManagement from './UserManagement';
import GameManagement from './GameManagement';
import FinancialManagement from './FinancialManagement';
import TransactionRecord from './TransactionRecord';
import ReportAnalysis from './ReportAnalysis';
import SystemSettings from './SystemSettings';
import AnnouncementsAndEvents from './AnnouncementsAndEvents';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SidebarItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive, onClick }) => (
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
    { id: 'announcements', icon: '🆘', label: '公告與活動' },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const StatCard: React.FC<{ title: string; value: string; icon: string; color: string }> = ({ title, value, icon, color }) => (
    <div style={{
      backgroundColor: color,
      borderRadius: '10px',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
    }}>
      <div style={{ fontSize: '24px' }}>{icon}</div>
      <div style={{ textAlign: 'right' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>{value}</h3>
        <p style={{ fontSize: '14px', opacity: 0.8 }}>{title}</p>
      </div>
    </div>
  );

  const StatusCircle: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: '10px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#3498db',
        margin: '0 auto'
      }}>
        {value}
      </div>
      <p style={{ marginTop: '10px' }}>{label}</p>
      <p style={{ fontSize: '12px', color: '#7f8c8d' }}>正常運行</p>
    </div>
  );

  const chartData = {
    labels: ['', '', '', '', '', ''],
    datasets: [
      {
        label: '在線玩家',
        data: [3000, 3500, 4000, 3800, 4200, 4500],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const monitoringData = [
    { id: 1, name: '百家樂A', cpu: '2%', memory: '128MB', status: '正常' },
    { id: 2, name: '老虎機B', cpu: '3%', memory: '256MB', status: '正常' },
    { id: 3, name: '德州撲克C', cpu: '4%', memory: '512MB', status: '正常' },
    { id: 4, name: '輪盤D', cpu: '2%', memory: '128MB', status: '正常' },
  ];

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
        <h1 style={{ color: 'white', fontSize: '24px', marginBottom: '30px', textAlign: 'center' }}>娛樂城管理後台</h1>
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

      <div style={{ flex: 1, height: '100%', overflow: 'auto', backgroundColor: '#f0f4f8', padding: '20px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
                  <StatCard title="在線玩家" value="1234" icon="👥" color="#e74c3c" />
                  <StatCard title="今日營收" value="$50,000" icon="💰" color="#3498db" />
                  <StatCard title="活躍遊戲" value="25" icon="🎰" color="#2ecc71" />
                  <StatCard title="待處理提款" value="50" icon="💳" color="#f39c12" />
                </div>

                <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>娛樂城狀態</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <StatusCircle label="遊戲穩定性" value="99%" />
                    <StatusCircle label="支付系統" value="100%" />
                    <StatusCircle label="用戶滿意度" value="95%" />
                    <StatusCircle label="系統安全性" value="100%" />
                  </div>
                </div>

                <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>監控</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '60%', height: '300px' }}>
                      <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>網絡</h4>
                      {isClient && <Line data={chartData} options={chartOptions} />}
                    </div>
                    <div style={{ width: '38%' }}>
                      <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>實時監控</h4>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
                            <th style={{ padding: '8px' }}>遊戲名</th>
                            <th style={{ padding: '8px' }}>CPU(%)</th>
                            <th style={{ padding: '8px' }}>內存(MB)</th>
                            <th style={{ padding: '8px' }}>狀態</th>
                          </tr>
                        </thead>
                        <tbody>
                          {monitoringData.map((item) => (
                            <tr key={item.id}>
                              <td style={{ padding: '8px' }}>{item.name}</td>
                              <td style={{ padding: '8px' }}>{item.cpu}</td>
                              <td style={{ padding: '8px' }}>{item.memory}</td>
                              <td style={{ padding: '8px' }}>{item.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
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
  );
};

export default AdminDashboard;
