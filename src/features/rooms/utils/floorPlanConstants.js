/** Màu & mô tả trạng thái phòng trên sơ đồ tầng */
export const ROOM_STATUS_STYLES = {
  vacant: {
    fill: '#c2ef4e',
    stroke: '#8fb82e',
    text: '#150f23',
    label: 'Trống',
    description: 'Phòng sẵn sàng, có thể cho khách thuê mới.',
  },
  occupied: {
    fill: '#150f23',
    stroke: '#362d59',
    text: '#ffffff',
    label: 'Đang thuê',
    description: 'Đang có khách thuê hoặc hợp đồng còn hiệu lực.',
  },
  maintenance: {
    fill: '#fa7faa',
    stroke: '#d4567f',
    text: '#150f23',
    label: 'Bảo trì',
    description: 'Đang sửa chữa — tạm thời chưa cho thuê.',
  },
};

export const FLOOR_PLAN_CANVAS_BG = '#ffffff';
export const FLOOR_PLAN_HOVER_STROKE = '#6a5fc1';
export const FLOOR_PLAN_SELECTED_STROKE = '#c2ef4e';

export const getRoomStatusStyle = (status) => {
  if (status === 'occupied') return ROOM_STATUS_STYLES.occupied;
  if (status === 'maintenance') return ROOM_STATUS_STYLES.maintenance;
  return ROOM_STATUS_STYLES.vacant;
};
