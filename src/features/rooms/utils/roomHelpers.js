// Format currency to Vietnamese Dong
export const formatCurrency = (value) => {
  if (!value) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);
};

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
