// ... (phần import giữ nguyên)

const TenantForm = ({ tenant = null, onSubmit, onCancel, loading = false, error = null }) => {
  // ... (logic giữ nguyên)

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <h2 className="text-2xl font-semibold text-gray-900">
            {tenant ? 'Chỉnh sửa khách thuê' : 'Thêm khách thuê mới'}
          </h2>
          <button onClick={onCancel} disabled={loading} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto max-h-[calc(92vh-85px)]">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl flex gap-3">
              <AlertCircle size={24} className="mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Các field giữ nguyên logic, chỉ thay style */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Họ tên <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-5 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${validationErrors.fullName ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="Nguyễn Văn A"
              />
              {validationErrors.fullName && <p className="text-red-500 text-sm mt-1.5">{validationErrors.fullName}</p>}
            </div>

            {/* Tương tự cho các field khác... (phone, email, cccd, dates, deposit, room) */}
            {/* Bạn có thể áp dụng pattern tương tự cho tất cả input/select */}
          </div>

          {/* Upload ảnh CCCD */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Ảnh CCCD</label>
            <div className="flex gap-6">
              <label className="flex-1 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-3xl p-8 text-center cursor-pointer transition-all">
                <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="font-medium text-gray-700">Click để tải ảnh lên</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG • Tối đa 5MB</p>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>

              {idCardPreview && (
                <div className="w-40 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <img src={idCardPreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-5 py-4 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="Ghi chú thêm về khách thuê..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-8 py-3.5 text-gray-700 font-medium rounded-2xl hover:bg-gray-100 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all disabled:opacity-70 flex items-center gap-2"
            >
              {loading ? 'Đang xử lý...' : tenant ? 'Cập nhật' : 'Thêm khách thuê'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantForm;