// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `0${cleaned}`;
  }
  if (cleaned.length === 11 && cleaned.startsWith('84')) {
    return `0${cleaned.substring(2)}`;
  }
  return phone;
};

// Validate phone number
export const validatePhoneNumber = (phone) => {
  const vietnamPhoneRegex = /^(\+84|0)[0-9]{9}$/;
  return vietnamPhoneRegex.test(phone.replace(/\s/g, ''));
};

// Validate CCCD (Citizen ID)
export const validateCCCD = (cccd) => {
  // Vietnamese CCCD is 12 digits
  return /^\d{12}$/.test(cccd.replace(/\D/g, ''));
};

// Format CCCD
export const formatCCCD = (cccd) => {
  if (!cccd) return '';
  const cleaned = cccd.replace(/\D/g, '');
  if (cleaned.length === 12) {
    return `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6, 9)} ${cleaned.substring(9, 12)}`;
  }
  return cccd;
};

// Get tenant status label
export const getTenantStatusLabel = (status) => {
  const statusMap = {
    active: 'Đang thuê',
    inactive: 'Ngừng thuê',
    moved_out: 'Đã trả phòng',
    pending: 'Đang chờ',
  };
  return statusMap[status] || status;
};

// Get tenant status color
export const getTenantStatusColor = (status) => {
  const colorMap = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    moved_out: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};

// Calculate stay duration
export const calculateStayDuration = (moveInDate, moveOutDate = null) => {
  const start = new Date(moveInDate);
  const end = moveOutDate ? new Date(moveOutDate) : new Date();
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffDays / 30);
  const days = diffDays % 30;
  
  if (months > 0) {
    return `${months} tháng ${days} ngày`;
  }
  return `${days} ngày`;
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
