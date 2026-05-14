import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Download } from 'lucide-react';
import RoomTable from '../../../components/tables/RoomTable';
import RoomForm from './RoomForm';
import { useRooms } from '../hooks/useRooms';

const RoomsList = () => {
  const { rooms, loading, error, addRoom, editRoom, changeRoomStatus, removeRoom } = useRooms();

  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchSearch = room.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchSearch && matchStatus;
  });

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
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý phòng trọ</h1>
            <p className="text-gray-600 text-sm mt-2">Quản lý thông tin phòng, giá cả và trạng thái</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors font-medium"
            >
              <Download size={20} />
              Xuất
            </button>
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className={`bg-white p-6 rounded-lg shadow border-l-4 ${getBorderClass(stat.color)}`}
            >
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
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
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
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
      </div>

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