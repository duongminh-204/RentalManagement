import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, unit, color = 'indigo' }) => {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  const textColorMap = {
    indigo: 'text-indigo-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    rose: 'text-rose-600',
  };

  const trendColor = trend >= 0 ? 'text-emerald-600' : 'text-rose-600';
  const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${colorMap[color]} p-6 rounded-2xl border shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-[0_8px_20px_-3px_rgba(6,81,237,0.1)] transition-all duration-300 transform hover:scale-105`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {typeof value === 'number' ? value.toLocaleString('vi-VN') : value}
            </h3>
            <span className="text-slate-500 text-sm font-semibold">{unit}</span>
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-3 ${trendColor}`}>
              <TrendIcon className="w-4 h-4" />
              <span className="text-xs font-semibold">
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-white bg-opacity-70`}>
          <Icon className={`w-6 h-6 ${textColorMap[color]}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
