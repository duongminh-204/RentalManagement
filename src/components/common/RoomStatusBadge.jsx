import React from 'react';
import { Check, AlertCircle, Wrench } from 'lucide-react';

const RoomStatusBadge = ({ status }) => {
  const statusConfig = {
    occupied: {
      label: 'Đang thuê',
      className: 'bg-accent-violet-mid text-on-primary',
      icon: Check
    },
    vacant: {
      label: 'Trống',
      className: 'bg-surface-night text-on-primary',
      icon: AlertCircle
    },
    maintenance: {
      label: 'Đang bảo trì',
      className: 'bg-accent-pink/20 text-ink-deep',
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
