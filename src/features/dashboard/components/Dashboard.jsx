import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Home,
  DollarSign,
  AlertCircle,
  TrendingUp,
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
  const { stats, roomStats, debtInfo, revenue, loading, error } = useDashboard();

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
    <div className="min-h-screen w-full flex-1 bg-surface-light">
      <div className="page-content">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <p className="eyebrow mb-2">Tổng quan</p>
          <h1 className="font-display text-3xl font-medium text-ink-deep">
            Bảng điều khiển <span className="chip-lime">hôm nay</span>
          </h1>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 flex items-start gap-3 rounded-xl border border-accent-pink/30 bg-accent-pink/10 p-4"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent-pink" />
            <div>
              <p className="font-semibold text-ink-deep">Lỗi tải dữ liệu</p>
              <p className="mt-1 text-sm text-muted">{error}</p>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-hairline-cloud border-t-primary" />
            <p className="mt-4 font-medium text-muted">Đang đồng bộ dữ liệu hệ thống...</p>
          </div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Tổng số phòng" value={mockStats.totalRooms} icon={Building2} trend={5} unit="phòng" variant="violet" />
              <StatCard title="Đang cho thuê" value={mockStats.occupiedRooms} icon={Home} trend={3} unit="phòng" variant="lime" />
              <StatCard title="Phòng trống" value={mockStats.emptyRooms} icon={AlertCircle} trend={-2} unit="phòng" variant="pink" />
              <StatCard title="Doanh thu dự kiến" value={mockStats.monthlyRevenue} icon={DollarSign} trend={8} unit="đ" variant="night" />
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
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

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="card-compact">
              <h3 className="mb-5 font-display text-lg font-semibold text-ink-deep">Thao tác nhanh</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { label: 'Thêm khách thuê', icon: Users },
                  { label: 'Lập hóa đơn', icon: FileText },
                  { label: 'Thêm phòng mới', icon: Plus },
                  { label: 'Báo cáo tháng', icon: TrendingUp },
                ].map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    className="group flex flex-col items-center justify-center rounded-xl border border-hairline-cloud bg-surface-light p-4 transition-all hover:border-hairline-violet hover:shadow-[var(--shadow-card)]"
                  >
                    <div className="rounded-lg bg-surface-press p-3 transition-transform group-hover:scale-105">
                      <action.icon className="h-6 w-6 text-accent-violet" />
                    </div>
                    <span className="mt-3 text-sm font-medium text-ink-deep">{action.label}</span>
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
