import api from '../../../utils/api';
// Lấy dữ liệu dashboard
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy thống kê phòng
export const getRoomStats = async () => {
  try {
    const response = await api.get('/dashboard/rooms/stats');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin công nợ
export const getDebtInfo = async () => {
  try {
    const response = await api.get('/dashboard/debt/info');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy doanh thu tháng
export const getMonthlyRevenue = async (month, year) => {
  try {
    const response = await api.get(`/dashboard/revenue/${month}/${year}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy tất cả dữ liệu dashboard (gọi tất cả API cùng lúc)
export const getAllDashboardData = async (month, year) => {
  try {
    const [stats, roomStats, debtInfo, revenue] = await Promise.all([
      getDashboardStats(),
      getRoomStats(),
      getDebtInfo(),
      getMonthlyRevenue(month, year)
    ]);

    return {
      stats,
      roomStats,
      debtInfo,
      revenue
    };
  } catch (error) {
    throw error;
  }
};
 