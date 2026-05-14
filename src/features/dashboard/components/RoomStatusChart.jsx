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
    <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg"><PieChart className="w-5 h-5 text-blue-600" /></div>
        <h3 className="text-lg font-bold text-slate-900">Tỷ lệ lấp đầy</h3>
      </div>
      
      <div className="space-y-6">
        {/* Occupied Rooms */}
        <div>
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className="text-sm font-bold text-slate-700">Phòng đang thuê</span>
              <span className="text-xs font-medium text-slate-500 ml-2">({occupiedRooms}/{totalRooms})</span>
            </div>
            <span className="text-sm font-bold text-emerald-600">{occupiedPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${occupiedPercentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-emerald-500 h-full rounded-full"
            />
          </div>
        </div>

        {/* Empty Rooms */}
        <div>
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className="text-sm font-bold text-slate-700">Phòng trống</span>
              <span className="text-xs font-medium text-slate-500 ml-2">({emptyRooms}/{totalRooms})</span>
            </div>
            <span className="text-sm font-bold text-amber-500">{emptyPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${emptyPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-amber-400 h-full rounded-full"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100">
        <p className="text-sm text-slate-500 text-center">
          <span className="font-semibold text-slate-700">Mẹo:</span> Tỷ lệ lấp đầy lý tưởng là trên 90%.
        </p>
      </div>
    </motion.div>
  );
};

export default RoomStatusChart;