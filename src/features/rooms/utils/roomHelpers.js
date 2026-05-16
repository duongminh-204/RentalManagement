// Format currency to Vietnamese Dong
export const formatCurrency = (value) => {
  if (!value) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);
};

/** API status (Available, Occupied, ...) → frontend (vacant, occupied, maintenance) */
export const mapRoomStatusFromApi = (status) => {
  const normalized = String(status ?? '').trim().toLowerCase();
  if (normalized === 'occupied' || normalized === 'đang thuê') return 'occupied';
  if (normalized === 'maintenance' || normalized === 'bảo trì' || normalized === 'maintain') {
    return 'maintenance';
  }
  if (normalized === 'available' || normalized === 'vacant' || normalized === 'trống') {
    return 'vacant';
  }
  return 'vacant';
};

/** Frontend status → API status */
export const mapRoomStatusToApi = (status) => {
  const normalized = String(status ?? '').trim().toLowerCase();
  if (normalized === 'occupied') return 'Occupied';
  if (normalized === 'maintenance') return 'Maintenance';
  return 'Available';
};

export const deriveFloorFromRoomNumber = (roomNumber) => {
  if (!roomNumber) return 1;
  const match = String(roomNumber).match(/\d/);
  return match ? parseInt(match[0], 10) || 1 : 1;
};

/** Chuẩn hóa 1 phòng từ response API .NET */
export const normalizeRoomFromApi = (room) => {
  if (!room) return null;

  const id = room.id ?? room.roomId;

  return {
    id,
    roomId: room.roomId ?? id,
    roomNumber: room.roomNumber ?? '',
    rentalPrice: Number(room.rentalPrice) || 0,
    electricityPrice: Number(room.electricityPrice ?? room.electricPrice) || 0,
    waterPrice: Number(room.waterPrice) || 0,
    internetPrice: Number(room.internetPrice) || 0,
    additionalServices: room.additionalServices ?? '',
    description: room.description ?? '',
    status: mapRoomStatusFromApi(room.status),
    buildingId: room.buildingId ?? null,
    floor: room.floor ?? deriveFloorFromRoomNumber(room.roomNumber),
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
  };
};

/** Chuẩn hóa danh sách từ { data: [...] } hoặc mảng thuần */
export const normalizeRoomsList = (payload) => {
  const list = Array.isArray(payload) ? payload : payload?.data ?? [];
  return list.map(normalizeRoomFromApi).filter(Boolean);
};

/** Gửi lên API khi tạo / cập nhật */
export const denormalizeRoomForApi = (roomData) => ({
  roomNumber: roomData.roomNumber,
  rentalPrice: Number(roomData.rentalPrice) || 0,
  electricPrice: Number(roomData.electricityPrice ?? roomData.electricPrice) || 0,
  waterPrice: Number(roomData.waterPrice) || 0,
  internetPrice: Number(roomData.internetPrice) || 0,
  additionalServices: roomData.additionalServices || null,
  description: roomData.description || null,
  status: mapRoomStatusToApi(roomData.status),
  ...(roomData.buildingId != null ? { buildingId: roomData.buildingId } : {}),
});

// Format room data for display
export const formatRoomData = (room) => {
  return {
    ...room,
    rentalPriceFormatted: formatCurrency(room.rentalPrice),
    electricityPriceFormatted: formatCurrency(room.electricityPrice),
    waterPriceFormatted: formatCurrency(room.waterPrice),
    internetPriceFormatted: formatCurrency(room.internetPrice)
  };
};

// Calculate total monthly cost for a room
export const calculateRoomMonthlyCost = (room) => {
  return room.rentalPrice + room.internetPrice;
};

// Parse additional services from string
export const parseAdditionalServices = (servicesString) => {
  if (!servicesString) return [];
  return servicesString
    .split(',')
    .map(service => service.trim())
    .filter(service => service.length > 0);
};

// Format services for display
export const formatAdditionalServices = (services) => {
  if (Array.isArray(services)) {
    return services.join(', ');
  }
  return services || '';
};
