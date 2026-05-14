// Vehicle types
export const VEHICLE_TYPES = {
  motorcycle: 'Xe máy',
  scooter: 'Xe tay ga',
  bicycle: 'Xe đạp',
  car: 'Ô tô',
  other: 'Khác',
};

// Vehicle brands (popular)
export const VEHICLE_BRANDS = {
  motorcycle: ['Honda', 'Yamaha', 'Suzuki', 'Kymco', 'SYM', 'Piaggio', 'Vespa', 'Kawasaki', 'Ducati'],
  scooter: ['Vespa', 'Honda', 'Yamaha', 'SYM', 'Piaggio', 'Kymco'],
  car: ['Toyota', 'Honda', 'Mazda', 'Ford', 'Hyundai', 'Kia', 'Mercedes', 'BMW', 'Audi', 'Bentley'],
  bicycle: ['Trek', 'Giant', 'Specialized', 'Cannondale'],
};

// Vehicle colors
export const VEHICLE_COLORS = [
  'Trắng',
  'Đen',
  'Xám',
  'Xanh',
  'Đỏ',
  'Vàng',
  'Cam',
  'Tím',
  'Nâu',
  'Hồng',
  'Xanh lục',
  'Bạc',
];

// Vehicle status
export const VEHICLE_STATUS = {
  active: 'Đang gửi',
  inactive: 'Ngừng gửi',
  unknown: 'Xe lạ',
  parked: 'Đang đỗ',
  removed: 'Đã xóa',
};

// Get vehicle type label
export const getVehicleTypeLabel = (type) => {
  return VEHICLE_TYPES[type] || type;
};

// Get vehicle status label
export const getVehicleStatusLabel = (status) => {
  return VEHICLE_STATUS[status] || status;
};

// Get vehicle status color
export const getVehicleStatusColor = (status) => {
  const colorMap = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    unknown: 'bg-red-100 text-red-800',
    parked: 'bg-blue-100 text-blue-800',
    removed: 'bg-slate-100 text-slate-800',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};

// Format license plate (VN format)
export const formatLicensePlate = (plate) => {
  if (!plate) return '';
  // Format: 30A-12345 or 30-A12345
  return plate.toUpperCase();
};

// Validate license plate format (Vietnamese)
export const validateLicensePlate = (plate) => {
  if (!plate) return false;
  // Vietnamese license plate format (simplified)
  // XX-XXX.XX or XX A-XXX.XX
  const vietnamPlateRegex = /^[0-9]{2,3}[A-Z]{0,1}[-]?[0-9]{1,5}(\.[0-9]{2})?$/i;
  return vietnamPlateRegex.test(plate.replace(/\s/g, ''));
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
};

// Get vehicle type color (for grouping)
export const getVehicleTypeColor = (type) => {
  const colorMap = {
    motorcycle: 'bg-blue-50 border-blue-200',
    scooter: 'bg-purple-50 border-purple-200',
    bicycle: 'bg-yellow-50 border-yellow-200',
    car: 'bg-orange-50 border-orange-200',
    other: 'bg-gray-50 border-gray-200',
  };
  return colorMap[type] || 'bg-gray-50 border-gray-200';
};

// Get vehicle type text color
export const getVehicleTypeTextColor = (type) => {
  const colorMap = {
    motorcycle: 'text-blue-700',
    scooter: 'text-purple-700',
    bicycle: 'text-yellow-700',
    car: 'text-orange-700',
    other: 'text-gray-700',
  };
  return colorMap[type] || 'text-gray-700';
};

// Get vehicle type icon
export const getVehicleTypeIcon = (type) => {
  const iconMap = {
    motorcycle: '🏍️',
    scooter: '🛵',
    bicycle: '🚲',
    car: '🚗',
    other: '🚙',
  };
  return iconMap[type] || '🚙';
};

// Calculate parking days
export const calculateParkingDays = (registrationDate) => {
  if (!registrationDate) return 0;
  const today = new Date();
  const registration = new Date(registrationDate);
  const diffTime = Math.abs(today - registration);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Validate vehicle brand for type
export const isValidBrandForType = (type, brand) => {
  if (!VEHICLE_BRANDS[type]) return true;
  return VEHICLE_BRANDS[type].includes(brand);
};
