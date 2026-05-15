import React from 'react';

const RoomStatistics = ({ rooms, selectedFloor }) => {
  const floorRooms = rooms.filter(room => room.floor === selectedFloor);
  
  const stats = {
    total: floorRooms.length,
    occupied: floorRooms.filter(r => r.status === 'occupied').length,
    vacant: floorRooms.filter(r => r.status === 'vacant').length,
    maintenance: floorRooms.filter(r => r.status === 'maintenance').length,
  };

  const occupancyRate = stats.total > 0 
    ? ((stats.occupied / stats.total) * 100).toFixed(1)
    : 0;

  const statItems = [
    { label: 'Tổng phòng', value: stats.total, bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    { label: 'Đang thuê', value: stats.occupied, bgColor: 'bg-red-50', textColor: 'text-red-700' },
    { label: 'Trống', value: stats.vacant, bgColor: 'bg-green-50', textColor: 'text-green-700' },
    { label: 'Bảo trì', value: stats.maintenance, bgColor: 'bg-orange-50', textColor: 'text-orange-700' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {statItems.map(item => (
        <div key={item.label} className={`${item.bgColor} rounded-lg p-4`}>
          <p className="text-sm text-gray-600 mb-1">{item.label}</p>
          <p className={`text-2xl font-bold ${item.textColor}`}>{item.value}</p>
        </div>
      ))}
      
      {/* Occupancy rate */}
      <div className="col-span-2 md:col-span-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-2">Tỷ lệ chiếm dụng</p>
        <div className="flex items-end gap-4">
          <p className="text-3xl font-bold text-purple-700">{occupancyRate}%</p>
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomStatistics;
