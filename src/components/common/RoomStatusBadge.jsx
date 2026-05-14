import React from 'react';
import { Check, AlertCircle, Wrench } from 'lucide-react';

const RoomStatusBadge = ({ status }) => {
  const statusConfig = {
    occupied: {
      label: 'Đang thuê',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      icon: Check
    },
    vacant: {
      label: 'Trống',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      icon: AlertCircle
    },
    maintenance: {
      label: 'Đang bảo trì',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      icon: Wrench
    }
  };

  const config = statusConfig[status] || statusConfig.vacant;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}>
      <Icon size={16} />
      {config.label}
    </span>
  );
};

export default RoomStatusBadge;
