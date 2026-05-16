import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check, AlertCircle } from 'lucide-react';

const RoomFormComponent = ({ 
  onSubmit, 
  onCancel, 
  initialData = null,
  loading = false,
  error = null
}) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    floor: 1,
    rentalPrice: '',
    electricityPrice: '',
    waterPrice: '',
    internetPrice: '',
    additionalServices: '',
    status: 'vacant',
    description: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        roomNumber: initialData.roomNumber || '',
        floor: initialData.floor || 1,
        rentalPrice: initialData.rentalPrice || '',
        electricityPrice: initialData.electricityPrice || '',
        waterPrice: initialData.waterPrice || '',
        internetPrice: initialData.internetPrice || '',
        additionalServices: initialData.additionalServices || '',
        status: initialData.status || 'vacant',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.roomNumber.trim()) {
      errors.roomNumber = 'Số phòng là bắt buộc';
    }
    
    if (!formData.rentalPrice || formData.rentalPrice <= 0) {
      errors.rentalPrice = 'Giá thuê phải lớn hơn 0';
    }
    
    if (!formData.electricityPrice || formData.electricityPrice < 0) {
      errors.electricityPrice = 'Giá điện không hợp lệ';
    }
    
    if (!formData.waterPrice || formData.waterPrice < 0) {
      errors.waterPrice = 'Giá nước không hợp lệ';
    }
    
    if (!formData.internetPrice || formData.internetPrice < 0) {
      errors.internetPrice = 'Giá internet không hợp lệ';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts editing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {initialData ? 'Sửa thông tin phòng' : 'Thêm phòng mới'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-gap gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Số phòng */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Số phòng <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            placeholder="Ví dụ: 101, 102A, 201B..."
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              validationErrors.roomNumber
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus-visible:outline-accent-violet'
            }`}
          />
          {validationErrors.roomNumber && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.roomNumber}</p>
          )}
        </div>

        {/* Tầng */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tầng <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="floor"
            min="1"
            value={formData.floor}
            onChange={handleChange}
            placeholder="1, 2, 3..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet transition-all"
          />
        </div>

        {/* Grid 2 cột */}
        <div className="grid grid-cols-2 gap-6">
          {/* Giá thuê */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Giá thuê (₫/tháng) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="rentalPrice"
              value={formData.rentalPrice}
              onChange={handleChange}
              placeholder="0"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                validationErrors.rentalPrice
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus-visible:outline-accent-violet'
              }`}
            />
            {validationErrors.rentalPrice && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.rentalPrice}</p>
            )}
          </div>

          {/* Giá điện */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Giá điện (₫/kWh) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="electricityPrice"
              value={formData.electricityPrice}
              onChange={handleChange}
              placeholder="0"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                validationErrors.electricityPrice
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus-visible:outline-accent-violet'
              }`}
            />
            {validationErrors.electricityPrice && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.electricityPrice}</p>
            )}
          </div>

          {/* Giá nước */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Giá nước (₫/m³) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="waterPrice"
              value={formData.waterPrice}
              onChange={handleChange}
              placeholder="0"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                validationErrors.waterPrice
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus-visible:outline-accent-violet'
              }`}
            />
            {validationErrors.waterPrice && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.waterPrice}</p>
            )}
          </div>

          {/* Giá internet */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Giá internet (₫/tháng) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="internetPrice"
              value={formData.internetPrice}
              onChange={handleChange}
              placeholder="0"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                validationErrors.internetPrice
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus-visible:outline-accent-violet'
              }`}
            />
            {validationErrors.internetPrice && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.internetPrice}</p>
            )}
          </div>
        </div>

        {/* Dịch vụ phụ trội */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Dịch vụ phụ trội
          </label>
          <textarea
            name="additionalServices"
            value={formData.additionalServices}
            onChange={handleChange}
            placeholder="Ví dụ: TV cáp, máy lạnh, tủ lạnh... (Mỗi dịch vụ cách nhau bằng dấu phẩy)"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet transition-all resize-none"
          />
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Trạng thái phòng
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet transition-all"
          >
            <option value="vacant">Trống</option>
            <option value="occupied">Đang thuê</option>
            <option value="maintenance">Đang bảo trì</option>
          </select>
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mô tả
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Thêm ghi chú hoặc mô tả chi tiết về phòng..."
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet transition-all resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg hover:opacity-90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={20} />
            {loading ? 'Đang xử lý...' : 'Lưu'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Hủy
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default RoomFormComponent;
