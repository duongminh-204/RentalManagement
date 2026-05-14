import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Home, 
  DollarSign, 
  AlertCircle, 
  TrendingUp,
  RefreshCw,
  Plus,
  Users,
  FileText
} from 'lucide-react';
import StatCard from './StatCard';
import RoomStatusChart from './RoomStatusChart';
import DebtOverview from './DebtOverview';
import RevenueChart from './RevenueChart';
import { useDashboard } from '../hooks/useDashboard';

const Dashboard = () => {
  const { stats, roomStats, debtInfo, revenue, loading, error, refetch } = useDashboard();

  const mockStats = stats || { totalRooms: 0, occupiedRooms: 0, emptyRooms: 0, monthlyRevenue: 0 };
  const mockRoomStats = roomStats || { totalRooms: 0, occupiedRooms: 0, emptyRooms: 0 };
  const mockDebtInfo = debtInfo || { unpaidTenantsCount: 0, totalDebt: 0, topDebtors: [] };
  const mockRevenue = revenue || { monthlyRevenue: 0, targetRevenue: 0 };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
   
    <div className="min-h-screen bg-slate-50 w-full flex-1 font-sans">
     
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4"
        >
         
          {/* <button
            onClick={refetch}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
            Đồng bộ dữ liệu
          </button> */}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold">Lỗi tải dữ liệu</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-slate-500 font-medium">Đang đồng bộ dữ liệu hệ thống...</p>
          </div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Tổng số phòng" 
                value={mockStats.totalRooms} 
                icon={Building2} 
                trend={5} 
                unit=" phòng"
                color="indigo"
              />
              <StatCard 
                title="Đang cho thuê" 
                value={mockStats.occupiedRooms} 
                icon={Home} 
                trend={3} 
                unit=" phòng"
                color="emerald"
              />
              <StatCard 
                title="Phòng trống" 
                value={mockStats.emptyRooms} 
                icon={AlertCircle} 
                trend={-2} 
                unit=" phòng"
                color="amber"
              />
              <StatCard 
                title="Doanh thu dự kiến" 
                value={mockStats.monthlyRevenue} 
                icon={DollarSign} 
                trend={8} 
                unit="đ"
                color="blue"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <RoomStatusChart
                totalRooms={mockRoomStats.totalRooms}
                occupiedRooms={mockRoomStats.occupiedRooms}
                emptyRooms={mockRoomStats.emptyRooms}
              />
              <RevenueChart
                monthlyRevenue={mockRevenue.monthlyRevenue}
                targetRevenue={mockRevenue.targetRevenue}
              />
              <DebtOverview
                unpaidTenantsCount={mockDebtInfo.unpaidTenantsCount}
                totalDebt={mockDebtInfo.totalDebt}
                topDebtors={mockDebtInfo.topDebtors}
              />
            </div>

            {/* Quick Actions */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
              <h3 className="text-lg font-bold text-slate-900 mb-5">Thao tác nhanh</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Thêm khách thuê', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                  { label: 'Lập hóa đơn', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Thêm phòng mới', icon: Plus, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Báo cáo tháng', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((action, idx) => (
                  <button key={idx} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all group bg-white">
                    <div className={`p-3 rounded-full ${action.bg} group-hover:scale-110 transition-transform`}>
                      <action.icon className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <span className="mt-3 text-sm font-medium text-slate-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;