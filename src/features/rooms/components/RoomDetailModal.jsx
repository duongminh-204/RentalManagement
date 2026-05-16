import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, DollarSign, Phone, Mail, Calendar } from 'lucide-react';

const RoomDetailModal = ({ room, isOpen, onClose, onEdit }) => {
  if (!room) return null;

  const statusMap = {
    vacant: { label: 'Trống', color: 'bg-blue-100 text-blue-800' },
    occupied: { label: 'Đang thuê', color: 'bg-red-100 text-red-800' },
    maintenance: { label: 'Bảo trì', color: 'bg-orange-100 text-orange-800' },
  };

  const status = statusMap[room.status] || statusMap.vacant;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Phòng {room.roomNumber}
                </h2>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                  {status.label}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Room Details */}
            <div className="space-y-4 mb-6 border-t border-b border-gray-200 py-4">
              {room.area && (
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">📐 Diện tích:</span>
                  <span className="font-medium">{room.area} m²</span>
                </div>
              )}

              {room.price && (
                <div className="flex items-center gap-3">
                  <DollarSign size={18} className="text-gray-500" />
                  <div>
                    <span className="text-gray-500">Giá thuê:</span>
                    <span className="font-medium ml-2">{room.price.toLocaleString()} VND/tháng</span>
                  </div>
                </div>
              )}

              {room.capacity && (
                <div className="flex items-center gap-3">
                  <User size={18} className="text-gray-500" />
                  <span className="text-gray-500">
                    Sức chứa: <span className="font-medium">{room.capacity} người</span>
                  </span>
                </div>
              )}

              {room.type && (
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">Loại phòng:</span>
                  <span className="font-medium">{room.type}</span>
                </div>
              )}
            </div>

            {/* Tenant Info */}
            {room.status === 'occupied' && room.tenant && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Thông tin khách thuê</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-500" />
                    <span>{room.tenant.name}</span>
                  </div>
                  {room.tenant.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <a href={`tel:${room.tenant.phone}`} className="text-accent-violet hover:underline">
                        {room.tenant.phone}
                      </a>
                    </div>
                  )}
                  {room.tenant.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" />
                      <a href={`mailto:${room.tenant.email}`} className="text-accent-violet hover:underline">
                        {room.tenant.email}
                      </a>
                    </div>
                  )}
                  {room.tenant.checkInDate && (
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span>Nhận phòng: {new Date(room.tenant.checkInDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  onEdit(room);
                  onClose();
                }}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-medium"
              >
                Chỉnh sửa
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RoomDetailModal;
