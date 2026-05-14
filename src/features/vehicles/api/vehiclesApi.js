import api from '../../../utils/api';

// Get all vehicles
export const getVehicles = async (params = {}) => {
  try {
    const response = await api.get('/vehicles', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get vehicle by ID
export const getVehicleById = async (id) => {
  try {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new vehicle
export const createVehicle = async (vehicleData) => {
  try {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update vehicle
export const updateVehicle = async (id, vehicleData) => {
  try {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete vehicle
export const deleteVehicle = async (id) => {
  try {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload vehicle image
export const uploadVehicleImage = async (vehicleId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/vehicles/${vehicleId}/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search vehicles by license plate
export const searchVehiclesByLicensePlate = async (licensePlate) => {
  try {
    const response = await api.get('/vehicles/search', {
      params: { licensePlate },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get vehicles by room ID
export const getVehiclesByRoom = async (roomId) => {
  try {
    const response = await api.get(`/vehicles/room/${roomId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get vehicles by tenant ID
export const getVehiclesByTenant = async (tenantId) => {
  try {
    const response = await api.get(`/vehicles/tenant/${tenantId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get vehicles without tenant (unknown vehicles)
export const getUnknownVehicles = async () => {
  try {
    const response = await api.get('/vehicles/unknown');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get parking fee summary
export const getParkingFeeSummary = async (params = {}) => {
  try {
    const response = await api.get('/vehicles/parking-fee/summary', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get vehicles by type
export const getVehiclesByType = async (type) => {
  try {
    const response = await api.get('/vehicles/type', {
      params: { type },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
