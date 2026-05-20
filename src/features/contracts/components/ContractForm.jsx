import React, { useState, useEffect } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import { validateContractDates, formatDate, validateContractNumber } from '../utils/contractHelpers';

const ContractForm = ({
  contract = null,
  tenants = [],
  rooms = [],
  fixedRoomId = null,
  onSubmit,
  onCancel,
  loading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState({
    contractNumber: '',
    tenantId: '',
    roomId: '',
    startDate: '',
    endDate: '',
    rentalPrice: '',
    terms: '',
    notes: '',
    status: 'pending',
  });

  const [contractFile, setContractFile] = useState(null);
  const [filePreview, setFilePreview] = useState(contract?.fileUrl || null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (fixedRoomId != null && fixedRoomId !== '') {
      setFormData((prev) => ({
        ...prev,
        roomId: String(fixedRoomId),
        status: prev.status || 'active',
      }));
    }
  }, [fixedRoomId]);

  useEffect(() => {
    if (contract) {
      setFormData({
        contractNumber: contract.contractNumber || '',
        tenantId: contract.tenantId || '',
        roomId: contract.roomId || fixedRoomId || '',
        startDate: contract.startDate ? new Date(contract.startDate).toISOString().split('T')[0] : '',
        endDate: contract.endDate ? new Date(contract.endDate).toISOString().split('T')[0] : '',
        rentalPrice: contract.rentalPrice || '',
        terms: contract.terms || '',
        notes: contract.notes || '',
        status: contract.status || 'pending',
      });
      if (contract.fileUrl) {
        setFilePreview(contract.fileUrl);
      }
    }
  }, [contract]);

  const validateForm = () => {
    const errors = {};

    if (!formData.contractNumber.trim()) {
      errors.contractNumber = 'Vui lòng nhập số hợp đồng';
    } else if (!validateContractNumber(formData.contractNumber)) {
      errors.contractNumber = 'Số hợp đồng không hợp lệ';
    }

    if (!formData.tenantId) {
      errors.tenantId = 'Vui lòng chọn khách thuê';
    }

    if (!formData.roomId && !fixedRoomId) {
      errors.roomId = 'Vui lòng chọn phòng';
    }

    if (!formData.startDate) {
      errors.startDate = 'Vui lòng chọn ngày bắt đầu';
    }

    if (!formData.endDate) {
      errors.endDate = 'Vui lòng chọn ngày hết hạn';
    }

    if (formData.startDate && formData.endDate && !validateContractDates(formData.startDate, formData.endDate)) {
      errors.endDate = 'Ngày hết hạn phải sau ngày bắt đầu';
    }

    if (!formData.rentalPrice) {
      errors.rentalPrice = 'Vui lòng nhập giá thuê';
    } else if (isNaN(formData.rentalPrice) || formData.rentalPrice < 0) {
      errors.rentalPrice = 'Giá thuê phải là số dương';
    }

    if (!formData.terms.trim()) {
      errors.terms = 'Vui lòng nhập điều khoản';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.type.startsWith('image/')) {
        setValidationErrors((prev) => ({
          ...prev,
          contractFile: 'Vui lòng chọn file PDF hoặc ảnh',
        }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setValidationErrors((prev) => ({
          ...prev,
          contractFile: 'File không được vượt quá 10MB',
        }));
        return;
      }
      setContractFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(`📄 ${file.name}`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        roomId: fixedRoomId ?? formData.roomId,
        contractFile,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {contract ? 'Chỉnh sửa hợp đồng' : 'Tạo hợp đồng mới'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-red-600 mt-0.5" size={20} />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Số hợp đồng */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Số hợp đồng *
              </label>
              <input
                type="text"
                name="contractNumber"
                value={formData.contractNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet ${
                  validationErrors.contractNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="HD/2024/01/001"
              />
              {validationErrors.contractNumber && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.contractNumber}</p>
              )}
            </div>

            {/* Khách thuê */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Khách thuê *
              </label>
              <select
                name="tenantId"
                value={formData.tenantId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet ${
                  validationErrors.tenantId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Chọn khách thuê --</option>
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.fullName}
                  </option>
                ))}
              </select>
              {validationErrors.tenantId && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.tenantId}</p>
              )}
            </div>

            {/* Phòng */}
            {fixedRoomId == null || fixedRoomId === '' ? (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Phòng *
              </label>
              <select
                name="roomId"
                value={formData.roomId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet ${
                  validationErrors.roomId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Chọn phòng --</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    Phòng {room.roomNumber}
                  </option>
                ))}
              </select>
              {validationErrors.roomId && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.roomId}</p>
              )}
            </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Phòng</label>
                <p className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                  {rooms.find((r) => String(r.id) === String(fixedRoomId))?.roomNumber
                    ? `Phòng ${rooms.find((r) => String(r.id) === String(fixedRoomId)).roomNumber}`
                    : `Phòng #${fixedRoomId}`}
                </p>
              </div>
            )}

            {/* Trạng thái */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Trạng thái
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet"
              >
                <option value="pending">Chờ ký</option>
                <option value="active">Còn hiệu lực</option>
                <option value="expired">Hết hạn</option>
                <option value="terminated">Đã chấm dứt</option>
              </select>
            </div>

            {/* Ngày bắt đầu */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Ngày bắt đầu *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet ${
                  validationErrors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.startDate && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.startDate}</p>
              )}
            </div>

            {/* Ngày hết hạn */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Ngày hết hạn *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet ${
                  validationErrors.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.endDate && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.endDate}</p>
              )}
            </div>

            {/* Giá thuê */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Giá thuê (VNĐ/tháng) *
              </label>
              <input
                type="number"
                name="rentalPrice"
                value={formData.rentalPrice}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet ${
                  validationErrors.rentalPrice ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="3000000"
              />
              {validationErrors.rentalPrice && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.rentalPrice}</p>
              )}
            </div>
          </div>

          {/* Điều khoản */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Điều khoản hợp đồng *
            </label>
            <textarea
              name="terms"
              value={formData.terms}
              onChange={handleChange}
              rows="6"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet ${
                validationErrors.terms ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nhập các điều khoản (thanh toán, chính sách hủy, bảo hành nhà cửa, v.v.)"
            />
            {validationErrors.terms && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.terms}</p>
            )}
          </div>

          {/* Ghi chú */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Ghi chú thêm
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-visible:outline-accent-violet"
              placeholder="Ghi chú bổ sung (nếu có)"
            />
          </div>

          {/* Upload file */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Upload hợp đồng (PDF/Ảnh)
            </label>
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="flex items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <div className="text-center">
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">Chọn file</p>
                    <p className="text-xs text-gray-500">PDF hoặc ảnh, tối đa 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
              </div>

              {filePreview && (
                <div className="w-32">
                  {typeof filePreview === 'string' && filePreview.startsWith('data:image') ? (
                    <img
                      src={filePreview}
                      alt="Contract Preview"
                      className="w-full h-32 object-cover rounded-lg border border-gray-300"
                    />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center rounded-lg border border-gray-300 bg-gray-50">
                      <p className="text-center text-sm text-gray-600">{filePreview}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white bg-primary rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : contract ? 'Cập nhật' : 'Tạo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractForm;
