'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'event';
  date: string;
  isActive: boolean;
}

const initialAnnouncements: Announcement[] = [
  {
    id: '1',
    title: '系統維護通知',
    content: '親愛的用戶，我們將於 2023 年 7 月 1 日凌晨 2:00-4:00 進行系統維護，期間網站將暫時無法使用。造成不便，敬請見諒。',
    type: 'announcement',
    date: '2023-06-25',
    isActive: true
  },
  {
    id: '2',
    title: '端午節大抽獎活動',
    content: '歡慶端午佳節，參與我們的幸運抽獎活動！總價值超過 100 萬的獎品等你來拿。活動時間：2023 年 6 月 20 日至 6 月 25 日。',
    type: 'event',
    date: '2023-06-20',
    isActive: true
  },
  {
    id: '3',
    title: '新遊戲上線：宇宙冒險',
    content: '準備好展開一場驚心動魄的太空之旅了嗎？我們最新推出的「宇宙冒險」老虎機遊戲現已上線，享受高達 98% 的返還率！',
    type: 'announcement',
    date: '2023-06-15',
    isActive: true
  }
];

const AnnouncementsAndEvents: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const handleSave = (announcement: Announcement) => {
    if (announcement.id) {
      setAnnouncements(announcements.map(a => a.id === announcement.id ? announcement : a));
    } else {
      setAnnouncements([...announcements, { ...announcement, id: Date.now().toString() }]);
    }
    setIsEditing(false);
    setSelectedAnnouncement(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">更新公告與活動</h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
        onClick={() => {
          setSelectedAnnouncement({
            id: '',
            title: '',
            content: '',
            type: 'announcement',
            date: new Date().toISOString().split('T')[0],
            isActive: true
          });
          setIsEditing(true);
        }}
      >
        新增公告/活動
      </motion.button>
      <AnimatePresence>
        {announcements.map((announcement) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{announcement.title}</h3>
                <p className="text-sm text-gray-600">{announcement.date} | {announcement.type === 'announcement' ? '公告' : '活動'}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(announcement)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                >
                  編輯
                </button>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                >
                  刪除
                </button>
              </div>
            </div>
            <p className="text-gray-700">{announcement.content}</p>
          </motion.div>
        ))}
      </AnimatePresence>
      {isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{selectedAnnouncement?.id ? '編輯' : '新增'}公告/活動</h3>
            <input
              type="text"
              placeholder="標題"
              value={selectedAnnouncement?.title || ''}
              onChange={(e) => setSelectedAnnouncement({ ...selectedAnnouncement!, title: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded text-gray-800"
            />
            <textarea
              placeholder="內容"
              value={selectedAnnouncement?.content || ''}
              onChange={(e) => setSelectedAnnouncement({ ...selectedAnnouncement!, content: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded h-32 text-gray-800"
            />
            <select
              value={selectedAnnouncement?.type || 'announcement'}
              onChange={(e) => setSelectedAnnouncement({ ...selectedAnnouncement!, type: e.target.value as 'announcement' | 'event' })}
              className="w-full p-2 mb-4 border border-gray-300 rounded text-gray-800"
            >
              <option value="announcement">公告</option>
              <option value="event">活動</option>
            </select>
            <input
              type="date"
              value={selectedAnnouncement?.date || ''}
              onChange={(e) => setSelectedAnnouncement({ ...selectedAnnouncement!, date: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded text-gray-800"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedAnnouncement(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors duration-200"
              >
                取消
              </button>
              <button
                onClick={() => handleSave(selectedAnnouncement!)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
              >
                保存
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AnnouncementsAndEvents;
