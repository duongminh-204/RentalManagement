import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import {
  FLOOR_PLAN_CANVAS_BG,
  FLOOR_PLAN_HOVER_STROKE,
  getRoomStatusStyle,
} from '../utils/floorPlanConstants';

const ROOM_WIDTH = 90;
const ROOM_HEIGHT = 70;
const ROOM_MARGIN = 12;
const CANVAS_PADDING_X = 30;
const CANVAS_PADDING_Y = 30;

const FloorPlanCanvas = ({
  rooms = [],
  onRoomClick,
  onRoomHover
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(900);
  const [hoveredRoomId, setHoveredRoomId] = useState(null);

  // Debug
  useEffect(() => {
    console.log("FloorPlanCanvas received rooms:", rooms.length, rooms);
  }, [rooms]);

  const floorRooms = Array.isArray(rooms) ? rooms : [];

  // Resize observer
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
    return Math.max(2, perRow); // ít nhất 2 phòng mỗi hàng
  }, [containerWidth]);

  const roomRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < floorRooms.length; i += roomsPerRow) {
      rows.push(floorRooms.slice(i, i + roomsPerRow));
    }
    return rows;
  }, [floorRooms, roomsPerRow]);

  return (
    <div ref={containerRef} className="relative flex h-full min-h-[400px] flex-col rounded-lg bg-surface-press overflow-hidden">
      
      {/* Debug info */}
      {floorRooms.length > 0 && (
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-50">
          {floorRooms.length} phòng
        </div>
      )}

      {floorRooms.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-light/90 z-20">
          <div className="text-center">
            <p className="text-lg text-muted">Chưa có phòng nào</p>
            <p className="text-sm text-muted mt-1">Hãy thêm phòng mới</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <Stage width={containerWidth} height={Math.max(500, roomRows.length * (ROOM_HEIGHT + ROOM_MARGIN) + 100)}>
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
                const isHovered = hoveredRoomId === (room.id || room.roomId);
                
                const x = CANVAS_PADDING_X + colIndex * (ROOM_WIDTH + ROOM_MARGIN);
                const y = CANVAS_PADDING_Y + rowIndex * (ROOM_HEIGHT + ROOM_MARGIN);

                const displayId = room.id || room.roomId || 'unknown';

                return (
                  <Group 
                    key={`room-${displayId}`} 
                    onClick={() => onRoomClick?.(room)}
                  >
                    <Rect
                      x={x}
                      y={y}
                      width={ROOM_WIDTH}
                      height={ROOM_HEIGHT}
                      fill={style.fill}
                      stroke={isHovered ? FLOOR_PLAN_HOVER_STROKE : style.stroke}
                      strokeWidth={isHovered ? 3 : 1.5}
                      cornerRadius={8}
                      shadowColor="rgba(0,0,0,0.15)"
                      shadowBlur={isHovered ? 12 : 6}
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
                      fontSize={13}
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