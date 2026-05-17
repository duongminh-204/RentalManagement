import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import {
  FLOOR_PLAN_CANVAS_BG,
  FLOOR_PLAN_HOVER_STROKE,
  FLOOR_PLAN_SELECTED_STROKE,
  getRoomStatusStyle,
} from '../utils/floorPlanConstants';

const ROOM_WIDTH = 108;
const ROOM_HEIGHT = 82;
const ROOM_MARGIN = 14;
const CANVAS_PADDING_X = 30;
const CANVAS_PADDING_Y = 30;

const FloorPlanCanvas = ({
  rooms = [],
  selectedRoomId = null,
  onRoomClick,
  onRoomHover,
  onAddRoom,
  onDeleteRoom,
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(900);
  const [hoveredRoomId, setHoveredRoomId] = useState(null);

  const floorRooms = Array.isArray(rooms) ? rooms : [];
  const canDelete = Boolean(selectedRoomId);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => setContainerWidth(el.clientWidth || 900);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const roomsPerRow = useMemo(() => {
    const availableWidth = containerWidth - CANVAS_PADDING_X * 2;
    const perRow = Math.floor(availableWidth / (ROOM_WIDTH + ROOM_MARGIN));
    return Math.max(2, perRow);
  }, [containerWidth]);

  const roomRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < floorRooms.length; i += roomsPerRow) {
      rows.push(floorRooms.slice(i, i + roomsPerRow));
    }
    return rows;
  }, [floorRooms, roomsPerRow]);

  return (
    <div ref={containerRef} className="relative flex h-full min-h-[480px] flex-col rounded-lg bg-surface-press overflow-hidden">
      <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={onAddRoom}
          title="Thêm phòng"
          aria-label="Thêm phòng"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline-violet bg-ink-deep text-accent-lime shadow-[0_4px_14px_rgba(21,15,35,0.25)] transition hover:scale-105 hover:border-accent-lime hover:shadow-[0_6px_20px_rgba(194,239,78,0.35)] active:scale-95"
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={onDeleteRoom}
          disabled={!canDelete}
          title={canDelete ? 'Xóa phòng đang chọn' : 'Chọn phòng trên sơ đồ để xóa'}
          aria-label="Xóa phòng"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline-violet bg-ink-deep text-accent-pink shadow-[0_4px_14px_rgba(21,15,35,0.25)] transition hover:scale-105 hover:border-accent-pink hover:shadow-[0_6px_20px_rgba(250,127,170,0.35)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:border-hairline-violet disabled:hover:shadow-[0_4px_14px_rgba(21,15,35,0.25)]"
        >
          <Trash2 size={20} strokeWidth={2.25} />
        </button>
      </div>

      {floorRooms.length > 0 && (
        <div className="absolute top-3 left-3 z-30 rounded-full border border-hairline-cloud bg-surface-light/95 px-3 py-1 text-xs font-semibold text-ink-deep shadow-sm backdrop-blur-sm">
          {floorRooms.length} phòng
        </div>
      )}

      {floorRooms.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-light/90 z-20">
          <div className="text-center">
            <p className="text-lg font-medium text-ink-deep">Chưa có phòng nào</p>
            <p className="mt-1 text-sm text-muted">Bấm nút + góc phải để thêm phòng đầu tiên</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <Stage width={containerWidth} height={Math.max(560, roomRows.length * (ROOM_HEIGHT + ROOM_MARGIN) + 120)}>
          <Layer>
            <Rect
              x={0}
              y={0}
              width={containerWidth}
              height={9999}
              fill={FLOOR_PLAN_CANVAS_BG}
            />

            {roomRows.flatMap((row, rowIndex) =>
              row.map((room, colIndex) => {
                const style = getRoomStatusStyle(room.status || 'vacant');
                const displayId = room.id || room.roomId || 'unknown';
                const isHovered = hoveredRoomId === displayId;
                const isSelected =
                  selectedRoomId != null && String(selectedRoomId) === String(displayId);

                const x = CANVAS_PADDING_X + colIndex * (ROOM_WIDTH + ROOM_MARGIN);
                const y = CANVAS_PADDING_Y + rowIndex * (ROOM_HEIGHT + ROOM_MARGIN);

                let stroke = style.stroke;
                let strokeWidth = 1.5;
                if (isSelected) {
                  stroke = FLOOR_PLAN_SELECTED_STROKE;
                  strokeWidth = 3.5;
                } else if (isHovered) {
                  stroke = FLOOR_PLAN_HOVER_STROKE;
                  strokeWidth = 3;
                }

                return (
                  <Group key={`room-${displayId}`} onClick={() => onRoomClick?.(room)}>
                    <Rect
                      x={x}
                      y={y}
                      width={ROOM_WIDTH}
                      height={ROOM_HEIGHT}
                      fill={style.fill}
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                      cornerRadius={8}
                      shadowColor="rgba(0,0,0,0.15)"
                      shadowBlur={isHovered || isSelected ? 12 : 6}
                      shadowOffset={{ x: 0, y: 3 }}
                      onMouseEnter={() => {
                        setHoveredRoomId(displayId);
                        onRoomHover?.(room);
                      }}
                      onMouseLeave={() => setHoveredRoomId(null)}
                    />
                    <Text
                      x={x}
                      y={y + 8}
                      width={ROOM_WIDTH}
                      height={ROOM_HEIGHT - 16}
                      text={room.roomName || room.roomNumber || 'N/A'}
                      fontSize={14}
                      fontFamily="system-ui, sans-serif"
                      fontStyle="600"
                      fill={style.text}
                      align="center"
                      verticalAlign="middle"
                      listening={false}
                    />
                  </Group>
                );
              })
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default FloorPlanCanvas;
