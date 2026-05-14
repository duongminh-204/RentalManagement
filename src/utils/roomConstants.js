// Room Status Constants
export const ROOM_STATUS = {
  OCCUPIED: 'occupied',
  VACANT: 'vacant',
  MAINTENANCE: 'maintenance'
};

export const ROOM_STATUS_LABELS = {
  occupied: 'Đang thuê',
  vacant: 'Trống',
  maintenance: 'Đang bảo trì'
};

export const ROOM_STATUS_COLORS = {
  occupied: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    badge: 'bg-green-500'
  },
  vacant: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    badge: 'bg-blue-500'
  },
  maintenance: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    badge: 'bg-yellow-500'
  }
};

// Room Form Fields
export const ROOM_FORM_FIELDS = [
  { name: 'roomNumber', label: 'Số phòng', type: 'text', required: true },
  { name: 'rentalPrice', label: 'Giá thuê (₫/tháng)', type: 'number', required: true },
  { name: 'electricityPrice', label: 'Giá điện (₫/kWh)', type: 'number', required: true },
  { name: 'waterPrice', label: 'Giá nước (₫/m³)', type: 'number', required: true },
  { name: 'internetPrice', label: 'Giá internet (₫/tháng)', type: 'number', required: true },
  { name: 'additionalServices', label: 'Dịch vụ phụ trội', type: 'textarea', required: false },
  { name: 'status', label: 'Trạng thái', type: 'select', required: true },
  { name: 'description', label: 'Mô tả', type: 'textarea', required: false }
];

// Default Room Data
export const DEFAULT_ROOM_DATA = {
  roomNumber: '',
  rentalPrice: 0,
  electricityPrice: 0,
  waterPrice: 0,
  internetPrice: 0,
  additionalServices: '',
  status: ROOM_STATUS.VACANT,
  description: ''
};
