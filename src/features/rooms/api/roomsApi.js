import api from '../../../utils/api';

// Lấy danh sách tất cả phòng
export const getAllRooms = async () => {
  try {
    const response = await api.get('/room');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin chi tiết một phòng
export const getRoomById = async (roomId) => {
  try {
    const response = await api.get(`/room/${roomId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Tạo phòng mới
export const createRoom = async (roomData) => {
  try {
    const response = await api.post('/room', roomData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật thông tin phòng
export const updateRoom = async (roomId, roomData) => {
  try {
    const response = await api.put(`/room/${roomId}`, roomData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật trạng thái phòng
export const updateRoomStatus = async (roomId, status) => {
  try {
    const response = await api.patch(`/room/${roomId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xóa phòng
export const deleteRoom = async (roomId) => {
  try {
    const response = await api.delete(`/room/${roomId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lọc phòng theo trạng thái
export const getRoomsByStatus = async (status) => {
  try {
    const response = await api.get(`/room/status/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy thống kê phòng
export const getRoomsStats = async () => {
  try {
    const response = await api.get('/room/stats');
    return response.data;
  } catch (error) {
    throw error;
  }
};
