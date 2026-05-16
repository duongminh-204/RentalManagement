import { useState, useEffect } from 'react';
import * as roomsApi from '../api/roomsApi';
import { mockRoomsData } from '../mockData';

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await roomsApi.getAllRooms();
      let roomsData = data.data || data || [];
      
      // If no rooms from API, use mock data for testing/demo
      if (!roomsData || roomsData.length === 0) {
        console.log('No rooms from API, using mock data');
        roomsData = mockRoomsData;
      }
      
      // Ensure all rooms have floor property - if missing, extract from roomNumber or default to 1
      const roomsWithFloor = roomsData.map(room => ({
        ...room,
        floor: room.floor || (room.roomNumber ? parseInt(room.roomNumber.charAt(0)) : 1) || 1
      }));
      setRooms(roomsWithFloor);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      // Use mock data as fallback when API fails
      console.log('API error, using mock data');
      setRooms(mockRoomsData);
      setError(err.message || 'Lỗi khi tải danh sách phòng');
    } finally {
      setLoading(false);
    }
  };

  const addRoom = async (roomData) => {
    try {
      setError(null);
      const newRoom = await roomsApi.createRoom(roomData);
      const roomWithFloor = {
        ...(newRoom.data || newRoom),
        floor: (newRoom.data || newRoom).floor || (roomData.roomNumber ? parseInt(roomData.roomNumber.charAt(0)) : 1) || 1
      };
      setRooms([...rooms, roomWithFloor]);
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
      const roomWithFloor = {
        ...(updatedRoom.data || updatedRoom),
        floor: (updatedRoom.data || updatedRoom).floor || roomData.floor || 1
      };
      setRooms(rooms.map(room => 
        room.id === roomId ? roomWithFloor : room
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
