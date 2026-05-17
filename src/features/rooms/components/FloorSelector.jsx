import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FloorSelector = ({ selectedFloor, availableFloors, onFloorChange }) => {
  const handlePrevFloor = () => {
    const index = availableFloors.indexOf(selectedFloor);
    if (index > 0) {
      onFloorChange(availableFloors[index - 1]);
    }
  };

  const handleNextFloor = () => {
    const index = availableFloors.indexOf(selectedFloor);
    if (index < availableFloors.length - 1) {
      onFloorChange(availableFloors[index + 1]);
    }
  };

  const currentIndex = availableFloors.indexOf(selectedFloor);

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4">
      <button
        onClick={handlePrevFloor}
        disabled={currentIndex === 0}
        className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex gap-2">
        {availableFloors.map(floor => ( 
          <button
            key={floor}
            onClick={() => onFloorChange(floor)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedFloor === floor
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tầng {floor}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextFloor}
        disabled={currentIndex === availableFloors.length - 1}
        className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default FloorSelector;
