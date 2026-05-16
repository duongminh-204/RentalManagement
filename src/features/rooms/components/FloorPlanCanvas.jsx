import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { mockRoomsData } from '../mockData';
import {
  FLOOR_PLAN_CANVAS_BG,
  FLOOR_PLAN_HOVER_STROKE,
  getRoomStatusStyle,
} from '../utils/floorPlanConstants';

const ROOM_WIDTH = 80;
const ROOM_HEIGHT = 60;
const ROOM_MARGIN = 10;
const CANVAS_PADDING_X = 24;
const CANVAS_PADDING_Y = 24;
const MIN_ROOMS_PER_ROW = 1;

const FloorPlanCanvas = ({
  rooms = [],
  onRoomClick,
  onRoomHover
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [hoveredRoomId, setHoveredRoomId] = useState(null);

  const dataToUse = Array.isArray(rooms) && rooms.length > 0 && rooms.some((r) => r.floor)
    ? rooms
    : mockRoomsData;

  const floorRooms = dataToUse;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      setContainerWidth(el.clientWidth);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const roomsPerRow = useMemo(() => {
    const available = containerWidth - CANVAS_PADDING_X * 2;
    const perRow = Math.floor(available / (ROOM_WIDTH + ROOM_MARGIN));
    return Math.max(MIN_ROOMS_PER_ROW, perRow);
  }, [containerWidth]);

  const roomRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < floorRooms.length; i += roomsPerRow) {
      rows.push(floorRooms.slice(i, i + roomsPerRow));
    }
    return rows;
  }, [floorRooms, roomsPerRow]);

  const contentWidth = useMemo(() => {
    if (roomRows.length === 0) return containerWidth;
    const maxCols = Math.max(...roomRows.map((row) => row.length));
    return CANVAS_PADDING_X * 2 + maxCols * ROOM_WIDTH + (maxCols - 1) * ROOM_MARGIN;
  }, [roomRows, containerWidth]);

  const contentHeight = useMemo(() => {
    if (roomRows.length === 0) return 120;
    return (
      CANVAS_PADDING_Y * 2 +
      roomRows.length * ROOM_HEIGHT +
      (roomRows.length - 1) * ROOM_MARGIN
    );
  }, [roomRows]);

  const stageWidth = Math.max(containerWidth, contentWidth);
  const stageHeight = contentHeight;

  return (
    <div ref={containerRef} className="relative flex h-full min-h-0 flex-col rounded-lg bg-surface-press">
      {floorRooms.length === 0 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-surface-light/90">
          <div className="text-center">
            <p className="mb-2 text-lg text-muted">Không có phòng trên tầng này</p>
            <p className="text-sm text-muted">Hãy chọn tầng khác hoặc thêm phòng mới</p>
          </div>
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <Stage width={stageWidth} height={stageHeight}>
          <Layer>
            <Rect
              x={0}
              y={0}
              width={stageWidth}
              height={stageHeight}
              fill={FLOOR_PLAN_CANVAS_BG}
            />

            {roomRows.map((row, rowIndex) =>
              row.map((room, colIndex) => {
                const style = getRoomStatusStyle(room.status);
                const isHovered = hoveredRoomId === room.id;
                const x = CANVAS_PADDING_X + colIndex * (ROOM_WIDTH + ROOM_MARGIN);
                const y = CANVAS_PADDING_Y + rowIndex * (ROOM_HEIGHT + ROOM_MARGIN);

                return (
                  <Group key={room.id} onClick={() => onRoomClick?.(room)}>
                    <Rect
                      x={x}
                      y={y}
                      width={ROOM_WIDTH}
                      height={ROOM_HEIGHT}
                      fill={style.fill}
                      stroke={isHovered ? FLOOR_PLAN_HOVER_STROKE : style.stroke}
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      cornerRadius={8}
                      shadowColor="rgba(21, 15, 35, 0.12)"
                      shadowBlur={isHovered ? 8 : 4}
                      shadowOffset={{ x: 0, y: 2 }}
                      shadowOpacity={0.4}
                      onMouseEnter={() => {
                        setHoveredRoomId(room.id);
                        onRoomHover?.(room);
                      }}
                      onMouseLeave={() => setHoveredRoomId(null)}
                    />
                    <Text
                      x={x}
                      y={y}
                      width={ROOM_WIDTH}
                      height={ROOM_HEIGHT}
                      text={room.roomNumber || 'N/A'}
                      fontSize={14}
                      fontFamily="Rubik, system-ui, sans-serif"
                      fontStyle="bold"
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
