import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, LayoutGrid, List } from 'lucide-react';
import RoomTable from '../../../components/tables/RoomTable';
import RoomForm from './RoomForm';
import FloorPlanCanvas from './FloorPlanCanvas';
import RoomDetailModal from './RoomDetailModal';
import { useRooms } from '../hooks/useRooms';

const RoomsList = () => {
  const { rooms, loading, error, addRoom, editRoom, changeRoomStatus, removeRoom } = useRooms();

  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [viewMode, setViewMode] = useState('floorplan'); // 'floorplan' or 'table'
  const [selectedRoomDetail, setSelectedRoomDetail] = useState(null);
  const [showRoomDetail, setShowRoomDetail] = useState(false);

  // Filter rooms for table view
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchSearch = room.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || room.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [rooms, searchTerm, statusFilter]);

  const handleAddRoom = async (formData) => {
    try {
      setFormLoading(true);
      setFormError(null);
      await addRoom(formData);
      setShowForm(false);
      setEditingRoom(null);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Lỗi khi thêm phòng');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditRoom = async (formData) => {
    try {
      setFormLoading(true);
      setFormError(null);
      await editRoom(editingRoom.id, formData);
      setShowForm(false);
      setEditingRoom(null);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Lỗi khi cập nhật phòng');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setShowForm(true);
    setFormError(null);
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm('Bạn có chắc muốn xóa phòng này?')) return;
    try {
      await removeRoom(roomId);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Lỗi khi xóa phòng');
    }
  };

  const handleRoomClick = (room) => {
    console.log('Room clicked:', room);
    setSelectedRoomDetail(room);
    setShowRoomDetail(true);
  };

  const handleRoomHover = (room) => {
    // Can be used to show preview or tooltip
    console.log('Hovering over room:', room.roomNumber);
  };

  const handleExport = () => {
    console.log('Exporting rooms data...');
    // TODO: Implement CSV/Excel export
  };

  const stats = {
    total: rooms.length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    vacant: rooms.filter(r => r.status === 'vacant').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
  };

  const statCards = [
    { label: 'Tổng phòng', value: stats.total, color: 'blue' },
    { label: 'Đang thuê', value: stats.occupied, color: 'green' },
    { label: 'Trống', value: stats.vacant, color: 'amber' },
    { label: 'Bảo trì', value: stats.maintenance, color: 'orange' },
  ];

  const getBorderClass = (color) => {
    const map = {
      blue: 'border-blue-500',
      green: 'border-green-500',
      amber: 'border-amber-500',
      orange: 'border-orange-500',
    };
    return map[color] || 'border-gray-500';
  };

  return (
    <div className="min-h-screen bg-slate-50 w-full flex-1 font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">Quản lý phòng trọ</h1>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setEditingRoom(null);
                setShowForm(true);
                setFormError(null);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium"
            >
              <Plus size={20} />
              Thêm phòng
            </button>
          </div>
        </motion.div>

        {/* View Mode Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2 mb-6"
        >
          <button
            onClick={() => setViewMode('floorplan')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'floorplan'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid size={20} />
            Sơ đồ tầng
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <List size={20} />
            Bảng
          </button>
        </motion.div>

        {/* Floor Plan View */}
        {viewMode === 'floorplan' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Floor Plan Canvas */}
            <div className="bg-white rounded-lg shadow p-2 h-96">
              <FloorPlanCanvas
                rooms={rooms}
                onRoomClick={handleRoomClick}
                onRoomHover={handleRoomHover}
              />
            </div>

            {/* Legend */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Huyền thoại</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-700">Phòng trống</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-700">Đang thuê</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded"></div>
                  <span className="text-sm text-gray-700">Đang bảo trì</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo số phòng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="occupied">Đang thuê</option>
                  <option value="vacant">Trống</option>
                  <option value="maintenance">Đang bảo trì</option>
                </select>
              </div>
            </motion.div>

            {/* Global Error */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                {error}
              </div>
            )}

            {/* Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <RoomTable
                rooms={filteredRooms}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={changeRoomStatus}
              />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Room Detail Modal */}
      <AnimatePresence>
        {showRoomDetail && (
          <RoomDetailModal
            room={selectedRoomDetail}
            isOpen={showRoomDetail}
            onClose={() => setShowRoomDetail(false)}
            onEdit={(room) => {
              handleEdit(room);
              setShowRoomDetail(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowForm(false);
              setEditingRoom(null);
              setFormError(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <RoomForm
                initialData={editingRoom}
                onSubmit={editingRoom ? handleEditRoom : handleAddRoom}
                onCancel={() => {
                  setShowForm(false);
                  setEditingRoom(null);
                  setFormError(null);
                }}
                loading={formLoading}
                error={formError}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomsList;