import { useState, useEffect } from 'react';
import * as roomsApi from '../api/roomsApi';

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await roomsApi.getAllRooms();
      setRooms(data.data || data || []);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError(err.message || 'Lỗi khi tải danh sách phòng');
    } finally {
      setLoading(false);
    }
  };

  const addRoom = async (roomData) => {
    try {
      setError(null);
      const newRoom = await roomsApi.createRoom(roomData);
      setRooms([...rooms, newRoom.data || newRoom]);
      return newRoom;
    } catch (err) {
      console.error('Error creating room:', err);
      setError(err.message || 'Lỗi khi tạo phòng mới');
      throw err;
    }
  };

  const editRoom = async (roomId, roomData) => {
    try {
      setError(null);
      const updatedRoom = await roomsApi.updateRoom(roomId, roomData);
      setRooms(rooms.map(room => 
        room.id === roomId ? (updatedRoom.data || updatedRoom) : room
      ));
      return updatedRoom;
    } catch (err) {
      console.error('Error updating room:', err);
      setError(err.message || 'Lỗi khi cập nhật phòng');
      throw err;
    }
  };

  const changeRoomStatus = async (roomId, status) => {
    try {
      setError(null);
      const updatedRoom = await roomsApi.updateRoomStatus(roomId, status);
      setRooms(rooms.map(room => 
        room.id === roomId ? (updatedRoom.data || updatedRoom) : room
      ));
      return updatedRoom;
    } catch (err) {
      console.error('Error updating room status:', err);
      setError(err.message || 'Lỗi khi cập nhật trạng thái phòng');
      throw err;
    }
  };

  const removeRoom = async (roomId) => {
    try {
      setError(null);
      await roomsApi.deleteRoom(roomId);
      setRooms(rooms.filter(room => room.id !== roomId));
    } catch (err) {
      console.error('Error deleting room:', err);
      setError(err.message || 'Lỗi khi xóa phòng');
      throw err;
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
    refetch: fetchRooms,
    addRoom,
    editRoom,
    changeRoomStatus,
    removeRoom
  };
};
