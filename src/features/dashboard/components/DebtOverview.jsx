import React from 'react';
import { motion } from 'framer-motion';
import { WalletCards } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const DebtOverview = ({ unpaidTenantsCount, totalDebt, topDebtors }) => {
  return (
    <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-50 rounded-lg"><WalletCards className="w-5 h-5 text-red-600" /></div>
          <h3 className="text-lg font-bold text-slate-900">Tình hình công nợ</h3>
        </div>
        <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full">
          {unpaidTenantsCount} khách nợ
        </span>
      </div>
      
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500 mb-1">Tổng nợ cần thu</p>
        <p className="text-3xl font-extrabold text-red-600">
          {(totalDebt / 1000000).toLocaleString('vi-VN')}<span className="text-xl ml-1 text-red-400">Tr</span>
        </p>
      </div>

      {/* Top Debtors List */}
      {topDebtors && topDebtors.length > 0 && (
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Danh sách nợ chú ý</p>
          <div className="space-y-3">
            {topDebtors.map((debtor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  {/* Avatar ảo */}
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {debtor.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{debtor.name}</p>
                    <p className="text-xs font-medium text-slate-500">Phòng {debtor.room}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-red-600">
                  {(debtor.amount / 1000000).toLocaleString('vi-VN')}M
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DebtOverview;