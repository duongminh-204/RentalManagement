import React from 'react';
import { ROOM_STATUS_STYLES } from '../utils/floorPlanConstants';

const STATUS_ORDER = ['vacant', 'occupied', 'maintenance'];

const RoomStatusGuide = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-hairline-cloud bg-surface-light px-4 py-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-deep">
        Trạng thái phòng
      </span>
      {STATUS_ORDER.map((key) => {
        const style = ROOM_STATUS_STYLES[key];
        return (
          <div key={key} className="flex items-center gap-2">
            <span
              className="h-5 w-7 rounded-md border-2 shadow-sm"
              style={{ backgroundColor: style.fill, borderColor: style.stroke }}
              aria-hidden
            />
            <span className="text-sm font-medium text-ink-deep">{style.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RoomStatusGuide;
