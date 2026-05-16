import React from 'react';
import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const RoomStatusChart = ({ totalRooms, occupiedRooms, emptyRooms }) => {
  const occupiedPercentage = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;
  const emptyPercentage = totalRooms > 0 ? (emptyRooms / totalRooms) * 100 : 0;

  return (
    <motion.div variants={itemVariants} className="card-compact">
      <div className="mb-6 flex items-center gap-2">
        <div className="rounded-lg bg-surface-press p-2">
          <PieChart className="h-5 w-5 text-accent-violet" />
        </div>
        <h3 className="font-display text-lg font-semibold text-ink-deep">Tỷ lệ lấp đầy</h3>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-end justify-between">
            <div>
              <span className="text-sm font-semibold text-ink-deep">Phòng đang thuê</span>
              <span className="ml-2 text-xs font-medium text-muted">({occupiedRooms}/{totalRooms})</span>
            </div>
            <span className="text-sm font-bold text-accent-lime">{occupiedPercentage.toFixed(1)}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-press">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${occupiedPercentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full rounded-full bg-accent-lime"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-end justify-between">
            <div>
              <span className="text-sm font-semibold text-ink-deep">Phòng trống</span>
              <span className="ml-2 text-xs font-medium text-muted">({emptyRooms}/{totalRooms})</span>
            </div>
            <span className="text-sm font-bold text-accent-violet-mid">{emptyPercentage.toFixed(1)}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-press">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${emptyPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full bg-accent-violet-mid"
            />
          </div>
        </div>
      </div>

      <p className="mt-6 border-t border-hairline-cloud pt-4 text-center text-sm text-muted">
        <span className="font-semibold text-ink-deep">Mẹo:</span> Tỷ lệ lấp đầy lý tưởng là trên 90%.
      </p>
    </motion.div>
  );
};

export default RoomStatusChart;
