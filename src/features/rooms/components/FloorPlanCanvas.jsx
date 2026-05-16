import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import Konva from 'konva';
import { mockRoomsData } from '../mockData';

const ROOM_WIDTH = 80;
const ROOM_HEIGHT = 60;
const ROOM_MARGIN = 10;
const ROOMS_PER_ROW = 6;

const FloorPlanCanvas = ({ 
  rooms = [], 
  onRoomClick,
  onRoomHover 
}) => {
  const stageRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [hoveredRoomId, setHoveredRoomId] = useState(null);

  // Use mock data if rooms array is empty or doesn't have floor data
  const dataToUse = Array.isArray(rooms) && rooms.length > 0 && rooms.some(r => r.floor) 
    ? rooms 
    : mockRoomsData;

  console.log('FloorPlanCanvas Debug:', {
    roomsReceived: rooms?.length || 0,
    dataToUse: dataToUse?.length || 0,
    usingMockData: dataToUse === mockRoomsData
  });

  // Use all rooms instead of filtering by floor
  const floorRooms = dataToUse;

  // Organize rooms into rows
  const roomRows = [];
  for (let i = 0; i < floorRooms.length; i += ROOMS_PER_ROW) {
    roomRows.push(floorRooms.slice(i, i + ROOMS_PER_ROW));
  }

  // Handle mouse wheel for zoom
  const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    
    const oldScale = scale;
    const newScale = e.evt.deltaY > 0 ? scale * 1.1 : scale / 1.1;
    
    // Clamp scale between 0.5x and 3x
    const clampedScale = Math.max(0.5, Math.min(3, newScale));
    
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - position.x / oldScale,
      y: stage.getPointerPosition().y / oldScale - position.y / oldScale,
    };

    setPosition({
      x: -(mousePointTo.x - stage.getPointerPosition().x / clampedScale) * clampedScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / clampedScale) * clampedScale,
    });
    
    setScale(clampedScale);
  };

  // Handle drag to pan
  const handleDragStart = (e) => {
    if (e.evt.button !== 2) return; // Only right-click drag
  };

  const handleDragMove = (e) => {
    if (e.target === stageRef.current) {
      const stage = stageRef.current;
      const dx = e.evt.movementX;
      const dy = e.evt.movementY;
      
      setPosition(prev => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));
    }
  };

  // Reset zoom
  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 50, y: 50 });
  };

  const getRoomColor = (room) => {
    if (room.status === 'occupied') return '#EF4444'; // red
    if (room.status === 'maintenance') return '#F97316'; // orange
    return '#3B82F6'; // blue (vacant)
  };

  const getRoomTextColor = (room) => {
    return room.status === 'occupied' ? '#FFFFFF' : '#000000';
  };

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {floorRooms.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-2">Không có phòng trên tầng này</p>
            <p className="text-gray-400 text-sm">Hãy chọn tầng khác hoặc thêm phòng mới</p>
          </div>
        </div>
      )}
      
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={handleResetZoom}
          className="px-3 py-1 bg-white border border-gray-300 rounded text-sm font-medium hover:bg-gray-50"
        >
          Reset
        </button>
        <div className="bg-white px-3 py-1 rounded text-sm border border-gray-300">
          {(scale * 100).toFixed(0)}%
        </div>
      </div>

      <Stage
        ref={stageRef}
        width={typeof window !== 'undefined' ? window.innerWidth * 0.85 : 800}
        height={500}
        x={position.x}
        y={position.y}
        scaleX={scale}
        scaleY={scale}
        onWheel={handleWheel}
        onContextMenu={(e) => e.evt.preventDefault()}
        style={{ touchAction: 'none' }}
      >
        <Layer>
          {/* Grid background */}
          <Rect
            x={0}
            y={0}
            width={1200}
            height={800}
            fill="#F5F5F5"
            strokeWidth={1}
            stroke="#E0E0E0"
          />


          {/* Rooms */}
          {roomRows.map((row, rowIndex) =>
            row.map((room, colIndex) => (
              <Group 
                key={room.id}
                onClick={() => {
                  console.log('Group clicked for room:', room.roomNumber);
                  onRoomClick(room);
                }}
              >
                {/* Room rectangle */}
                <Rect
                  x={colIndex * (ROOM_WIDTH + ROOM_MARGIN) + 50}
                  y={rowIndex * (ROOM_HEIGHT + ROOM_MARGIN) + 80}
                  width={ROOM_WIDTH}
                  height={ROOM_HEIGHT}
                  fill={getRoomColor(room)}
                  stroke={hoveredRoomId === room.id ? '#000000' : '#333333'}
                  strokeWidth={hoveredRoomId === room.id ? 3 : 1}
                  cornerRadius={4}
                  onMouseEnter={() => {
                    setHoveredRoomId(room.id);
                    onRoomHover(room);
                  }}
                  onMouseLeave={() => {
                    setHoveredRoomId(null);
                  }}
                  style={{ cursor: 'pointer' }}
                />

                {/* Room number */}
                <Text
                  x={colIndex * (ROOM_WIDTH + ROOM_MARGIN) + 50}
                  y={rowIndex * (ROOM_HEIGHT + ROOM_MARGIN) + 85}
                  width={ROOM_WIDTH}
                  height={ROOM_HEIGHT}
                  text={room.roomNumber || 'N/A'}
                  fontSize={14}
                  fontStyle="bold"
                  fill={getRoomTextColor(room)}
                  align="center"
                  verticalAlign="middle"
                  pointerEvents="none"
                />

                {/* Status indicator */}
                {room.status === 'occupied' && (
                  <Text
                    x={colIndex * (ROOM_WIDTH + ROOM_MARGIN) + 50 + ROOM_WIDTH - 20}
                    y={rowIndex * (ROOM_HEIGHT + ROOM_MARGIN) + 80 + 5}
                    width={15}
                    height={15}
                    text="●"
                    fontSize={12}
                    fill="#FFFFFF"
                    pointerEvents="none"
                  />
                )}
              </Group>
            ))
          )}
        </Layer>
      </Stage>

      {/* Info panel */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded shadow text-sm text-gray-700 max-w-xs">
        <div>💡 Cuộn để phóng to/thu nhỏ</div>
        <div className="text-xs text-gray-500 mt-1">Chuột phải + kéo để di chuyển</div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-10">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">Huyền thoại</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded"></div>
            <span className="text-xs text-gray-700">Phòng trống</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <span className="text-xs text-gray-700">Đang thuê</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-orange-500 rounded"></div>
            <span className="text-xs text-gray-700">Đang bảo trì</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanCanvas;
