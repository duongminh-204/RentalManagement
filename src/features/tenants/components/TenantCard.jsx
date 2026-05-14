import React from 'react';
import { Edit2, Trash2, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { getTenantStatusLabel, getTenantStatusColor, formatDate, formatCurrency, calculateStayDuration } from '../utils/tenantHelpers';

const TenantCard = ({ tenant, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{tenant.fullName}</h3>
            <p className="text-sm text-gray-500">CCCD: {tenant.cccd}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTenantStatusColor(tenant.status)}`}>
            {getTenantStatusLabel(tenant.status)}
          </span>
        </div>

        {/* ID Card Image */}
        {tenant.idCardImage && (
          <div className="mb-4">
            <img
              src={tenant.idCardImage}
              alt="ID Card"
              className="w-full h-32 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}

        {/* Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={18} />
            <span className="text-sm">{tenant.phoneNumber}</span>
          </div>
          {tenant.email && (
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={18} />
              <span className="text-sm">{tenant.email}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={18} />
            <span className="text-sm">Phòng {tenant.roomNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={18} />
            <span className="text-sm">{formatDate(tenant.moveInDate)}</span>
          </div>
        </div>

        {/* Details */}
        <div className="bg-gray-50 rounded p-3 mb-4 text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tiền cọc:</span>
            <span className="font-medium">{formatCurrency(tenant.deposit)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Thời gian ở:</span>
            <span className="font-medium">{calculateStayDuration(tenant.moveInDate, tenant.moveOutDate)}</span>
          </div>
        </div>

        {/* Notes */}
        {tenant.notes && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 font-medium mb-1">Ghi chú:</p>
            <p className="text-sm text-gray-600 line-clamp-2">{tenant.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(tenant.id)}
            className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            Chi tiết
          </button>
          <button
            onClick={() => onEdit(tenant)}
            className="flex-1 px-3 py-2 bg-amber-50 text-amber-700 rounded hover:bg-amber-100 transition-colors text-sm font-medium flex items-center justify-center gap-1"
          >
            <Edit2 size={16} /> Sửa
          </button>
          <button
            onClick={() => onDelete(tenant.id)}
            className="flex-1 px-3 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors text-sm font-medium flex items-center justify-center gap-1"
          >
            <Trash2 size={16} /> Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantCard;
