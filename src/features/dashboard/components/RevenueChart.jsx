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
    <motion.div variants={itemVariants} className="card-compact flex flex-col justify-between">
      <div>
        <div className="mb-6 flex items-center gap-2">
          <div className="rounded-lg bg-surface-press p-2">
            <Target className="h-5 w-5 text-accent-violet" />
          </div>
          <h3 className="font-display text-lg font-semibold text-ink-deep">Mục tiêu doanh thu</h3>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-sm font-medium text-muted">Thực tế</p>
            <p className="font-display text-2xl font-bold text-ink-deep">
              {(monthlyRevenue / 1000000).toLocaleString('vi-VN')}M
            </p>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-muted">Mục tiêu</p>
            <p className="font-display text-2xl font-semibold text-muted">
              {(targetRevenue / 1000000).toLocaleString('vi-VN')}M
            </p>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-ink-deep">Tiến độ đạt được</span>
            <span className={`text-sm font-bold ${isExceeded ? 'text-accent-lime' : 'text-accent-violet'}`}>
              {revenuePercentage.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-surface-press">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(revenuePercentage, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full rounded-full ${isExceeded ? 'bg-accent-lime' : 'bg-primary'}`}
            />
          </div>
        </div>
      </div>

      {isExceeded && (
        <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-accent-lime/40 bg-accent-lime/10 py-3">
          <CheckCircle2 className="h-5 w-5 text-accent-lime" />
          <p className="text-sm font-bold text-ink-deep">
            Đã vượt mục tiêu {((monthlyRevenue - targetRevenue) / 1000000).toLocaleString('vi-VN')}M
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default RevenueChart;
