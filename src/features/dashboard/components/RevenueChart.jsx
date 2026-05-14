import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2 } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const RevenueChart = ({ monthlyRevenue, targetRevenue }) => {
  const revenuePercentage = targetRevenue > 0 ? (monthlyRevenue / targetRevenue) * 100 : 0;
  const isExceeded = monthlyRevenue >= targetRevenue;

  return (
    <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-indigo-50 rounded-lg"><Target className="w-5 h-5 text-indigo-600" /></div>
          <h3 className="text-lg font-bold text-slate-900">Mục tiêu doanh thu</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Thực tế</p>
            <p className="text-2xl font-extrabold text-slate-900">{(monthlyRevenue / 1000000).toLocaleString('vi-VN')}M</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Mục tiêu</p>
            <p className="text-2xl font-bold text-slate-400">{(targetRevenue / 1000000).toLocaleString('vi-VN')}M</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Tiến độ đạt được</span>
            <span className={`text-sm font-bold ${isExceeded ? 'text-emerald-600' : 'text-indigo-600'}`}>
              {revenuePercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(revenuePercentage, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${isExceeded ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-blue-500'}`}
            />
          </div>
        </div>
      </div>

      {isExceeded && (
        <div className="mt-6 flex items-center justify-center gap-2 py-3 bg-emerald-50 rounded-xl border border-emerald-100">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <p className="text-sm text-emerald-700 font-bold">
            Đã vượt mục tiêu {(((monthlyRevenue - targetRevenue) / 1000000)).toLocaleString('vi-VN')}M
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default RevenueChart;