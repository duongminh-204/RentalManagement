import api from '../../../utils/api';
import { denormalizeRoomForApi } from '../utils/roomHelpers';

// Lấy danh sách tất cả phòng — backend: GET /api/room
export const getAllRooms = async () => {
  const response = await api.get('/room');
  return response.data;
};

export const getRoomById = async (roomId) => {
  const response = await api.get(`/room/${roomId}`);
  return response.data;
};

export const createRoom = async (roomData) => {
  const response = await api.post('/room', denormalizeRoomForApi(roomData));
  return response.data;
};

export const updateRoom = async (roomId, roomData) => {
  const response = await api.put(`/room/${roomId}`, denormalizeRoomForApi(roomData));
  return response.data;
};

export const updateRoomStatus = async (roomId, status) => {
  const response = await api.patch(`/room/${roomId}/status`, { status });
  return response.data;
};

export const deleteRoom = async (roomId) => {
  const response = await api.delete(`/room/${roomId}`);
  return response.data;
};

export const getRoomsByStatus = async (status) => {
  const response = await api.get(`/room/status/${status}`);
  return response.data;
};

export const getRoomsStats = async () => {
  const response = await api.get('/room/stats');
  return response.data;
};
