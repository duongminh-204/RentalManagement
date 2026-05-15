// Mock data for testing the floor plan view
// Replace the actual API data with this for testing

export const mockRoomsData = [
  // Floor 1
  {
    id: '1',
    roomNumber: '101',
    floor: 1,
    status: 'vacant',
    price: 5000000,
    area: 25,
    capacity: 2,
    type: 'Phòng tiêu chuẩn',
    rentalPrice: 5000000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 100000,
    additionalServices: 'TV cáp',
    description: 'Phòng sạch sẽ, thoáng mát'
  },
  {
    id: '2',
    roomNumber: '102',
    floor: 1,
    status: 'occupied',
    price: 5500000,
    area: 30,
    capacity: 2,
    type: 'Phòng cao cấp',
    rentalPrice: 5500000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 150000,
    additionalServices: 'TV cáp, Máy lạnh',
    tenant: {
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      email: 'a@example.com',
      checkInDate: '2024-01-15'
    }
  },
  {
    id: '3',
    roomNumber: '103',
    floor: 1,
    status: 'occupied',
    price: 5200000,
    area: 28,
    capacity: 2,
    type: 'Phòng tiêu chuẩn',
    rentalPrice: 5200000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 100000,
    additionalServices: 'TV cáp',
    tenant: {
      name: 'Trần Thị B',
      phone: '0987654321',
      email: 'b@example.com',
      checkInDate: '2024-02-20'
    }
  },
  {
    id: '4',
    roomNumber: '104',
    floor: 1,
    status: 'vacant',
    price: 5000000,
    area: 25,
    capacity: 2,
    type: 'Phòng tiêu chuẩn',
    rentalPrice: 5000000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 100000,
    description: 'Chuẩn bị sửa chữa'
  },
  {
    id: '5',
    roomNumber: '105',
    floor: 1,
    status: 'maintenance',
    price: 5000000,
    area: 25,
    capacity: 2,
    type: 'Phòng tiêu chuẩn',
    rentalPrice: 5000000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 100000,
    description: 'Đang sửa chữa mái'
  },
  {
    id: '6',
    roomNumber: '106',
    floor: 1,
    status: 'vacant',
    price: 5800000,
    area: 35,
    capacity: 3,
    type: 'Phòng VIP',
    rentalPrice: 5800000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 200000,
    additionalServices: 'TV cáp, Máy lạnh, Tủ lạnh, Tivi 42 inch'
  },

  // Floor 2
  {
    id: '7',
    roomNumber: '201',
    floor: 2,
    status: 'occupied',
    price: 5500000,
    area: 30,
    capacity: 2,
    type: 'Phòng cao cấp',
    rentalPrice: 5500000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 150000,
    tenant: {
      name: 'Phạm Văn C',
      phone: '0911111111',
      email: 'c@example.com',
      checkInDate: '2024-03-01'
    }
  },
  {
    id: '8',
    roomNumber: '202',
    floor: 2,
    status: 'vacant',
    price: 5000000,
    area: 25,
    capacity: 2,
    type: 'Phòng tiêu chuẩn',
    rentalPrice: 5000000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 100000
  },
  {
    id: '9',
    roomNumber: '203',
    floor: 2,
    status: 'occupied',
    price: 5200000,
    area: 28,
    capacity: 2,
    type: 'Phòng tiêu chuẩn',
    rentalPrice: 5200000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 100000,
    tenant: {
      name: 'Lê Thị D',
      phone: '0922222222',
      email: 'd@example.com',
      checkInDate: '2024-02-10'
    }
  },
  {
    id: '10',
    roomNumber: '204',
    floor: 2,
    status: 'occupied',
    price: 5500000,
    area: 30,
    capacity: 2,
    type: 'Phòng cao cấp',
    rentalPrice: 5500000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 150000,
    tenant: {
      name: 'Đỗ Văn E',
      phone: '0933333333',
      email: 'e@example.com',
      checkInDate: '2024-01-25'
    }
  },
  {
    id: '11',
    roomNumber: '205',
    floor: 2,
    status: 'vacant',
    price: 5000000,
    area: 25,
    capacity: 2,
    type: 'Phòng tiêu chuẩn',
    rentalPrice: 5000000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 100000
  },
  {
    id: '12',
    roomNumber: '206',
    floor: 2,
    status: 'vacant',
    price: 5800000,
    area: 35,
    capacity: 3,
    type: 'Phòng VIP',
    rentalPrice: 5800000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 200000
  },

  // Floor 3
  {
    id: '13',
    roomNumber: '301',
    floor: 3,
    status: 'vacant',
    price: 5000000,
    area: 25,
    capacity: 2,
    type: 'Phòng tiêu chuẩn',
    rentalPrice: 5000000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 100000
  },
  {
    id: '14',
    roomNumber: '302',
    floor: 3,
    status: 'occupied',
    price: 5200000,
    area: 28,
    capacity: 2,
    type: 'Phòng tiêu chuẩn',
    rentalPrice: 5200000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 100000,
    tenant: {
      name: 'Hoàng Văn F',
      phone: '0944444444',
      email: 'f@example.com',
      checkInDate: '2024-03-15'
    }
  },
  {
    id: '15',
    roomNumber: '303',
    floor: 3,
    status: 'maintenance',
    price: 5000000,
    area: 25,
    capacity: 2,
    type: 'Phòng tiêu chuẩn',
    rentalPrice: 5000000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 100000,
    description: 'Đang sửa nước'
  },
  {
    id: '16',
    roomNumber: '304',
    floor: 3,
    status: 'occupied',
    price: 5500000,
    area: 30,
    capacity: 2,
    type: 'Phòng cao cấp',
    rentalPrice: 5500000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 150000,
    tenant: {
      name: 'Vũ Thị G',
      phone: '0955555555',
      email: 'g@example.com',
      checkInDate: '2024-02-28'
    }
  },
  {
    id: '17',
    roomNumber: '305',
    floor: 3,
    status: 'vacant',
    price: 5000000,
    area: 25,
    capacity: 2,
    type: 'Phòng tiêu chuẩn',
    rentalPrice: 5000000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 100000
  },
  {
    id: '18',
    roomNumber: '306',
    floor: 3,
    status: 'occupied',
    price: 5800000,
    area: 35,
    capacity: 3,
    type: 'Phòng VIP',
    rentalPrice: 5800000,
    electricityPrice: 3500,
    waterPrice: 15000,
    internetPrice: 200000,
    tenant: {
      name: 'Bùi Văn H',
      phone: '0966666666',
      email: 'h@example.com',
      checkInDate: '2024-01-01'
    }
  }
];

// Helper function to transform mock data to match API response format
export const getMockRoomsForFloor = (floor) => {
  return mockRoomsData.filter(room => room.floor === floor);
};

// Helper function to get all available floors
export const getAvailableFloors = () => {
  const floors = [...new Set(mockRoomsData.map(room => room.floor))];
  return floors.sort((a, b) => a - b);
};

// Statistics helper
export const getRoomStatistics = (rooms, floor = null) => {
  const filtered = floor ? rooms.filter(r => r.floor === floor) : rooms;
  
  return {
    total: filtered.length,
    occupied: filtered.filter(r => r.status === 'occupied').length,
    vacant: filtered.filter(r => r.status === 'vacant').length,
    maintenance: filtered.filter(r => r.status === 'maintenance').length,
    occupancyRate: (filtered.filter(r => r.status === 'occupied').length / filtered.length) * 100
  };
};
