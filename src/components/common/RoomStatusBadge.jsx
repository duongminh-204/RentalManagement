import React from 'react';
import { Check, AlertCircle, Wrench } from 'lucide-react';

const RoomStatusBadge = ({ status }) => {
  const statusConfig = {
    vacant: {
      label: 'Trống',
      className: 'bg-accent-lime text-primary border border-[#8fb82e]',
      icon: AlertCircle
    },
    occupied: {
      label: 'Đang thuê',
      className: 'bg-primary text-on-primary border border-hairline-violet',
      icon: Check
    },
    maintenance: {
      label: 'Đang bảo trì',
      className: 'bg-accent-pink text-primary border border-[#d4567f]',
      icon: Wrench
    }
  };

  const config = statusConfig[status] || statusConfig.vacant;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-xs px-2 py-1 text-xs font-semibold ${config.className}`}>
      <Icon size={14} />
      {config.label}
    </span>
  );
};

export default RoomStatusBadge;
