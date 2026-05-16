import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Download, Loader } from 'lucide-react';
import TenantCard from './TenantCard';
import TenantForm from './TenantForm';
import { useTenants } from '../hooks/useTenants';

const TenantsList = () => {
  const { tenants, loading, error, addTenant, editTenant, removeTenant, uploadIDCard } = useTenants();

  const [showForm, setShowForm] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  // Filter tenants
  const filteredTenants = tenants.filter(tenant => {
    const matchSearch = 
      tenant.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.phoneNumber?.includes(searchTerm) ||
      tenant.cccd?.includes(searchTerm);
    const matchStatus = statusFilter === 'all' || tenant.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAddTenant = async (formData) => {
    try {
      setFormLoading(true);
      setFormError(null);
      
      const { idCardImage, ...tenantData } = formData;
      const newTenant = await addTenant(tenantData);
      
      // Upload ID card if provided
      if (idCardImage) {
        await uploadIDCard(newTenant.id, idCardImage);
      }
      
      setShowForm(false);
      setEditingTenant(null);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Lỗi khi thêm khách thuê');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditTenant = async (formData) => {
    try {
      setFormLoading(true);
      setFormError(null);
      
      const { idCardImage, ...tenantData } = formData;
      await editTenant(editingTenant.id, tenantData);
      
      // Upload ID card if provided
      if (idCardImage && typeof idCardImage !== 'string') {
        await uploadIDCard(editingTenant.id, idCardImage);
      }
      
      setShowForm(false);
      setEditingTenant(null);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Lỗi khi cập nhật khách thuê');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (tenant) => {
    setEditingTenant(tenant);
    setShowForm(true);
    setFormError(null);
  };

  const handleDelete = async (tenantId) => {
    if (!window.confirm('Bạn có chắc muốn xóa khách thuê này?')) return;
    try {
      await removeTenant(tenantId);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Lỗi khi xóa khách thuê');
    }
  };

  const handleViewDetails = (tenantId) => {
    console.log('View details for tenant:', tenantId);
    // TODO: Implement tenant details page
  };

  const handleExport = () => {
    console.log('Exporting tenants data...');
    // TODO: Implement CSV/Excel export
  };

  const stats = {
    total: tenants.length,
    active: tenants.filter(t => t.status === 'active').length,
    inactive: tenants.filter(t => t.status === 'inactive').length,
    movedOut: tenants.filter(t => t.status === 'moved_out').length,
  };

  const statCards = [
    { label: 'Tổng khách thuê', value: stats.total, color: 'blue' },
    { label: 'Đang thuê', value: stats.active, color: 'green' },
    { label: 'Ngừng thuê', value: stats.inactive, color: 'amber' },
    { label: 'Đã trả phòng', value: stats.movedOut, color: 'orange' },
  ];

  const getBgClass = (color) => {
    const map = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      amber: 'bg-amber-50 border-amber-200',
      orange: 'bg-orange-50 border-orange-200',
    };
    return map[color] || 'bg-gray-50 border-gray-200';
  };

  const getTextClass = (color) => {
    const map = {
      blue: 'text-blue-700',
      green: 'text-green-700',
      amber: 'text-amber-700',
      orange: 'text-orange-700',
    };
    return map[color] || 'text-gray-700';
  };

  if (loading && tenants.length === 0) {
    return (
      <div className="min-h-screen bg-surface-light flex items-center justify-center">
        <div className="text-center">
          <Loader className="mx-auto text-accent-violet animate-spin mb-3" size={32} />
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-light w-full flex-1 font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quản lý khách thuê</h1>
              <p className="text-gray-600 mt-1">Quản lý thông tin và lịch sử khách thuê</p>
            </div>
            <button
              onClick={() => {
                setEditingTenant(null);
                setShowForm(true);
                setFormError(null);
              }}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-colors font-medium"
            >
              <Plus size={20} /> Thêm khách thuê
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((card, idx) => (
              <div key={idx} className={`border rounded-lg p-4 ${getBgClass(card.color)}`}>
                <p className="text-sm text-gray-600 mb-1">{card.label}</p>
                <p className={`text-2xl font-bold ${getTextClass(card.color)}`}>{card.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm theo tên, SĐT, CCCD..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet"
              />
            </div>

            {/* Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang thuê</option>
              <option value="inactive">Ngừng thuê</option>
              <option value="moved_out">Đã trả phòng</option>
            </select>

            {/* Export */}
            <button
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              <Download size={20} /> Xuất file
            </button>
          </div>
        </div>

        {/* Tenants Grid */}
        <AnimatePresence>
          {filteredTenants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTenants.map((tenant) => (
                <motion.div
                  key={tenant.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <TenantCard
                    tenant={tenant}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onViewDetails={handleViewDetails}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">Không có khách thuê nào</p>
              <p className="text-gray-400 mt-1">Bắt đầu bằng cách thêm khách thuê mới</p>
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
        <TenantForm
          tenant={editingTenant}
          onSubmit={editingTenant ? handleEditTenant : handleAddTenant}
          onCancel={() => {
            setShowForm(false);
            setEditingTenant(null);
            setFormError(null);
          }}
          loading={formLoading}
          error={formError}
        />
      )}
    </div>
  );
};

export default TenantsList;
