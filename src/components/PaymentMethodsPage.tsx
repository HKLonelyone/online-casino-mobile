'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PaymentMethodsPage: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'credit_card', last4: '4242', brand: 'Visa', expMonth: 12, expYear: 2024 },
    { id: 2, type: 'paypal', email: 'user@example.com' },
    { id: 3, type: 'line_pay', username: 'user123' },
    { id: 4, type: 'crypto', address: '0x1234...5678', currency: 'ETH' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMethodType, setNewMethodType] = useState('credit_card');

  const handleDelete = (id: number) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const handleAddNew = () => {
    setShowAddForm(true);
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'credit_card':
        return '/credit-card-icon.png';
      case 'paypal':
        return '/paypal-icon.png';
      case 'line_pay':
        return '/line-pay-icon.png';
      case 'crypto':
        return '/crypto-icon.png';
      default:
        return '/default-payment-icon.png';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-16">
      <div className="fixed inset-0 bg-gradient-to-b from-purple-600 to-indigo-600 opacity-50 z-0"></div>

      <div className="relative z-10">
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 sticky top-0 z-20 shadow-md"
        >
          <h1 className="text-2xl font-bold text-center">支付方式</h1>
        </motion.div>

        <div className="p-4 space-y-4">
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center">
                <Image src={getMethodIcon(method.type)} alt={method.type} width={32} height={32} className="mr-3" />
                <div>
                  {method.type === 'credit_card' && (
                    <>
                      <p className="font-bold">{method.brand} **** {method.last4}</p>
                      <p className="text-sm text-gray-400">有效期至 {method.expMonth}/{method.expYear}</p>
                    </>
                  )}
                  {method.type === 'paypal' && (
                    <>
                      <p className="font-bold">PayPal</p>
                      <p className="text-sm text-gray-400">{method.email}</p>
                    </>
                  )}
                  {method.type === 'line_pay' && (
                    <>
                      <p className="font-bold">Line Pay</p>
                      <p className="text-sm text-gray-400">用戶名: {method.username}</p>
                    </>
                  )}
                  {method.type === 'crypto' && (
                    <>
                      <p className="font-bold">加密貨幣 ({method.currency})</p>
                      <p className="text-sm text-gray-400">{method.address}</p>
                    </>
                  )}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(method.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-full text-sm"
              >
                刪除
              </motion.button>
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddNew}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mt-4"
          >
            添加新支付方式
          </motion.button>
        </div>

        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">添加新支付方式</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">支付方式類型</label>
                  <select
                    value={newMethodType}
                    onChange={(e) => setNewMethodType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 rounded-md"
                  >
                    <option value="credit_card">信用卡</option>
                    <option value="paypal">PayPal</option>
                    <option value="line_pay">Line Pay</option>
                    <option value="crypto">加密貨幣</option>
                  </select>
                </div>

                {newMethodType === 'credit_card' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">卡號</label>
                      <input type="text" className="w-full px-3 py-2 bg-gray-700 rounded-md" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">有效期</label>
                        <input type="text" className="w-full px-3 py-2 bg-gray-700 rounded-md" placeholder="MM/YY" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">CVV</label>
                        <input type="text" className="w-full px-3 py-2 bg-gray-700 rounded-md" placeholder="123" />
                      </div>
                    </div>
                  </>
                )}

                {newMethodType === 'paypal' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">PayPal 郵箱</label>
                    <input type="email" className="w-full px-3 py-2 bg-gray-700 rounded-md" placeholder="your@email.com" />
                  </div>
                )}

                {newMethodType === 'line_pay' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Line Pay 用戶名</label>
                    <input type="text" className="w-full px-3 py-2 bg-gray-700 rounded-md" placeholder="您的 Line Pay 用戶名" />
                  </div>
                )}

                {newMethodType === 'crypto' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">加密貨幣類型</label>
                      <select className="w-full px-3 py-2 bg-gray-700 rounded-md">
                        <option value="BTC">比特幣 (BTC)</option>
                        <option value="ETH">以太坊 (ETH)</option>
                        <option value="USDT">泰達幣 (USDT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">錢包地址</label>
                      <input type="text" className="w-full px-3 py-2 bg-gray-700 rounded-md" placeholder="您的加密貨幣錢包地址" />
                    </div>
                  </>
                )}

                <div className="flex justify-end space-x-2 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-gray-600 rounded-md"
                  >
                    取消
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-purple-600 rounded-md"
                  >
                    添加
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
