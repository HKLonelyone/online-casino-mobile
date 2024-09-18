'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SystemSetting {
  id: string;
  name: string;
  description: string;
  value: boolean | string | number;
  type: 'toggle' | 'select' | 'input';
  options?: string[];
  category: '一般' | '安全' | '外觀' | '通知';
}

const initialSettings: SystemSetting[] = [
  {
    id: 'maintenance',
    name: '系統維護模式',
    description: '啟用後，網站將進入維護模式，只有管理員可以訪問。',
    value: false,
    type: 'toggle',
    category: '一般'
  },
  {
    id: 'registration',
    name: '開放註冊',
    description: '允許新用戶註冊帳號。',
    value: true,
    type: 'toggle',
    category: '一般'
  },
  {
    id: 'maxLoginAttempts',
    name: '最大登入嘗試次數',
    description: '超過此次數後帳號將被暫時鎖定。',
    value: 5,
    type: 'input',
    category: '安全'
  },
  {
    id: 'sessionTimeout',
    name: '會話超時時間（分鐘）',
    description: '用戶無操作後自動登出的時間。',
    value: 30,
    type: 'input',
    category: '安全'
  },
  {
    id: 'theme',
    name: '網站主題',
    description: '選擇網站的顏色主題。',
    value: '預設',
    type: 'select',
    options: ['預設', '深色', '淺色'],
    category: '外觀'
  },
  {
    id: 'language',
    name: '預設語言',
    description: '設置網站的預設顯示語言。',
    value: '繁體中文',
    type: 'select',
    options: ['繁體中文', '英文', '日文'],
    category: '外觀'
  },
  {
    id: 'emailNotifications',
    name: '電子郵件通知',
    description: '啟用重要事件的電子郵件通知。',
    value: true,
    type: 'toggle',
    category: '通知'
  },
  {
    id: 'smsNotifications',
    name: '簡訊通知',
    description: '啟用重要事件的簡訊通知。',
    value: false,
    type: 'toggle',
    category: '通知'
  }
];

const SystemSettings: React.FC = () => {
    const [settings, setSettings] = useState<SystemSetting[]>(initialSettings);
    const [activeCategory, setActiveCategory] = useState<string>('一般');

    const handleSettingChange = (id: string, newValue: boolean | string | number) => {
      setSettings(settings.map(setting =>
        setting.id === id ? { ...setting, value: newValue } : setting
      ));
    };

    const categories = ['一般', '安全', '外觀', '通知'];

    const filteredSettings = settings.filter(setting => setting.category === activeCategory);

    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <style jsx>{`
          .toggle-switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
          }
          .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }
          .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
          }
          .toggle-slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
          }
          input:checked + .toggle-slider {
            background-color: #2196F3;
          }
          input:checked + .toggle-slider:before {
            transform: translateX(26px);
          }
        `}</style>
        <h2 className="text-3xl font-bold mb-8 text-gray-800">系統設置</h2>
        <div className="flex space-x-4 mb-6">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } transition-colors duration-200`}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {filteredSettings.map((setting) => (
            <motion.div
              key={setting.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{setting.name}</h3>
                {setting.type === 'toggle' && (
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={setting.value as boolean}
                      onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                )}
                {setting.type === 'input' && (
                  <input
                    type="number"
                    value={setting.value as number}
                    onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
                    className="w-24 p-2 text-right border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                {setting.type === 'select' && (
                  <select
                    value={setting.value as string}
                    onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {setting.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
              </div>
              <p className="text-sm text-gray-600">{setting.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="mt-8"
        >
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg">
            儲存設置
          </button>
        </motion.div>
      </div>
    );
  };

  export default SystemSettings;
