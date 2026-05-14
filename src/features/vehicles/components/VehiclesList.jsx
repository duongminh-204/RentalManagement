import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, AlertTriangle, Loader, TrendingUp } from 'lucide-react';
import VehicleCard from './VehicleCard';
import VehicleForm from './VehicleForm';
import { useVehicles } from '../hooks/useVehicles';
import { VEHICLE_TYPES } from '../utils/vehicleHelpers';

const VehiclesList = ({ tenants = [], rooms = [] }) => {
  const { vehicles, unknownVehicles, parkingFeeSummary, loading, error, addVehicle, editVehicle, removeVehicle, uploadImage } =
    useVehicles();

  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  // Filter vehicles
  const filteredVehicles = vehicles.filter((vehicle) => {
    const tenant = tenants.find((t) => t.id === vehicle.tenantId);
    const matchSearch =
      vehicle.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchType = typeFilter === 'all' || vehicle.type === typeFilter;
    const matchStatus = statusFilter === 'all' || vehicle.status === statusFilter;

    return matchSearch && matchType && matchStatus;
  });

  const handleAddVehicle = async (formData) => {
    try {
      setFormLoading(true);
      setFormError(null);

      const { vehicleImage, ...vehicleData } = formData;
      const newVehicle = await addVehicle(vehicleData);

      // Upload image if provided
      if (vehicleImage) {
        await uploadImage(newVehicle.id, vehicleImage);
      }

      setShowForm(false);
      setEditingVehicle(null);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Lỗi khi thêm xe');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditVehicle = async (formData) => {
    try {
      setFormLoading(true);
      setFormError(null);

      const { vehicleImage, ...vehicleData } = formData;
      await editVehicle(editingVehicle.id, vehicleData);

      // Upload image if provided and it's a new file
      if (vehicleImage && typeof vehicleImage !== 'string') {
        await uploadImage(editingVehicle.id, vehicleImage);
      }

      setShowForm(false);
      setEditingVehicle(null);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Lỗi khi cập nhật xe');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
    setFormError(null);
  };

  const handleDelete = async (vehicleId) => {
    if (!window.confirm('Bạn có chắc muốn xóa xe này?')) return;
    try {
      await removeVehicle(vehicleId);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Lỗi khi xóa xe');
    }
  };

  const stats = {
    total: vehicles.length,
    active: vehicles.filter((v) => v.status === 'active').length,
    inactive: vehicles.filter((v) => v.status === 'inactive').length,
    unknown: unknownVehicles.length,
  };

  const statCards = [
    { label: 'Tổng xe', value: stats.total, color: 'blue', icon: '🚗' },
    { label: 'Đang gửi', value: stats.active, color: 'green', icon: '✓' },
    { label: 'Ngừng gửi', value: stats.inactive, color: 'gray', icon: '·' },
    { label: 'Xe lạ', value: stats.unknown, color: 'red', icon: '⚠', highlight: true },
  ];

  const getBgClass = (color) => {
    const map = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      gray: 'bg-gray-50 border-gray-200',
      red: 'bg-red-50 border-red-200',
    };
    return map[color] || 'bg-gray-50 border-gray-200';
  };

  const getTextClass = (color) => {
    const map = {
      blue: 'text-blue-700',
      green: 'text-green-700',
      gray: 'text-gray-700',
      red: 'text-red-700',
    };
    return map[color] || 'text-gray-700';
  };

  if (loading && vehicles.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="mx-auto text-blue-600 animate-spin mb-3" size={32} />
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 w-full flex-1 font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quản lý xe người thuê</h1>
              <p className="text-gray-600 mt-1">Theo dõi xe, phí gửi, và phát hiện xe lạ</p>
            </div>
            <button
              onClick={() => {
                setEditingVehicle(null);
                setShowForm(true);
                setFormError(null);
              }}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus size={20} /> Thêm xe
            </button>
          </div>

          {/* Alert for unknown vehicles */}
          {stats.unknown > 0 && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="text-red-600 mt-0.5" size={24} />
              <div>
                <p className="font-semibold text-red-900">{stats.unknown} xe lạ chưa xác nhận</p>
                <p className="text-sm text-red-800 mt-1">
                  Hãy kiểm tra và cập nhật thông tin khách thuê cho những xe này
                </p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {statCards.map((card, idx) => (
              <div
                key={idx}
                className={`border rounded-lg p-4 ${getBgClass(card.color)} ${
                  card.highlight ? 'ring-2 ring-red-400' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{card.label}</p>
                    <p className={`text-2xl font-bold ${getTextClass(card.color)}`}>{card.value}</p>
                  </div>
                  <span className="text-3xl opacity-50">{card.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Parking Fee Summary */}
          {parkingFeeSummary && (
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-green-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Tổng phí gửi xe/tháng</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        minimumFractionDigits: 0,
                      }).format(parkingFeeSummary.totalMonthlyFee || 0)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Từ {stats.active} xe</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm theo biển số, hãng xe, tên khách..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả loại xe</option>
              {Object.entries(VEHICLE_TYPES).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang gửi</option>
              <option value="inactive">Ngừng gửi</option>
              <option value="unknown">Xe lạ</option>
            </select>
          </div>
        </div>

        {/* Vehicles Grid */}
        <AnimatePresence>
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => {
                const tenant = tenants.find((t) => t.id === vehicle.tenantId);
                const room = rooms.find((r) => r.id === vehicle.roomId);

                return (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <VehicleCard
                      vehicle={vehicle}
                      tenant={tenant}
                      room={room}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">Không có xe nào</p>
              <p className="text-gray-400 mt-1">Bắt đầu bằng cách thêm xe mới</p>
            </div>
          )}
        </AnimatePresence>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <VehicleForm
          vehicle={editingVehicle}
          tenants={tenants}
          rooms={rooms}
          onSubmit={editingVehicle ? handleEditVehicle : handleAddVehicle}
          onCancel={() => {
            setShowForm(false);
            setEditingVehicle(null);
            setFormError(null);
          }}
          loading={formLoading}
          error={formError}
        />
      )}
    </div>
  );
};

export default VehiclesList;
