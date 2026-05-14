import { useState, useCallback, useEffect } from 'react';
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  uploadVehicleImage,
  searchVehiclesByLicensePlate,
  getVehiclesByRoom,
  getVehiclesByTenant,
  getUnknownVehicles,
  getParkingFeeSummary,
} from '../api/vehiclesApi';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [unknownVehicles, setUnknownVehicles] = useState([]);
  const [parkingFeeSummary, setParkingFeeSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all vehicles
  const fetchVehicles = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getVehicles(params);
      setVehicles(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi tải dữ liệu xe');
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single vehicle
  const getVehicle = useCallback(async (id) => {
    try {
      setError(null);
      const data = await getVehicleById(id);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi tải chi tiết xe');
      throw err;
    }
  }, []);

  // Add new vehicle
  const addVehicle = useCallback(async (vehicleData) => {
    try {
      setError(null);
      const data = await createVehicle(vehicleData);
      setVehicles((prevVehicles) => [...prevVehicles, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi thêm xe');
      throw err;
    }
  }, []);

  // Edit vehicle
  const editVehicle = useCallback(async (id, vehicleData) => {
    try {
      setError(null);
      const data = await updateVehicle(id, vehicleData);
      setVehicles((prevVehicles) =>
        prevVehicles.map((v) => (v.id === id ? data : v))
      );
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi cập nhật xe');
      throw err;
    }
  }, []);

  // Remove vehicle
  const removeVehicle = useCallback(async (id) => {
    try {
      setError(null);
      await deleteVehicle(id);
      setVehicles((prevVehicles) => prevVehicles.filter((v) => v.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi xóa xe');
      throw err;
    }
  }, []);

  // Upload vehicle image
  const uploadImage = useCallback(async (vehicleId, file) => {
    try {
      setError(null);
      const data = await uploadVehicleImage(vehicleId, file);
      setVehicles((prevVehicles) =>
        prevVehicles.map((v) => (v.id === vehicleId ? { ...v, imageUrl: data.imageUrl } : v))
      );
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi upload ảnh xe');
      throw err;
    }
  }, []);

  // Search vehicles by license plate
  const searchByLicensePlate = useCallback(async (licensePlate) => {
    try {
      setError(null);
      const data = await searchVehiclesByLicensePlate(licensePlate);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi tìm kiếm xe');
      throw err;
    }
  }, []);

  // Get vehicles by tenant
  const fetchVehiclesByTenant = useCallback(async (tenantId) => {
    try {
      setError(null);
      const data = await getVehiclesByTenant(tenantId);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi tải xe của khách');
      throw err;
    }
  }, []);

  // Get unknown vehicles
  const fetchUnknownVehicles = useCallback(async () => {
    try {
      setError(null);
      const data = await getUnknownVehicles();
      setUnknownVehicles(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi tải xe lạ');
      throw err;
    }
  }, []);

  // Get parking fee summary
  const fetchParkingFeeSummary = useCallback(async () => {
    try {
      setError(null);
      const data = await getParkingFeeSummary();
      setParkingFeeSummary(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi tính tổng phí gửi xe');
      throw err;
    }
  }, []);

  // Load vehicles on mount
  useEffect(() => {
    fetchVehicles();
    fetchUnknownVehicles();
    fetchParkingFeeSummary();
  }, [fetchVehicles, fetchUnknownVehicles, fetchParkingFeeSummary]);

  return {
    vehicles,
    unknownVehicles,
    parkingFeeSummary,
    loading,
    error,
    fetchVehicles,
    getVehicle,
    addVehicle,
    editVehicle,
    removeVehicle,
    uploadImage,
    searchByLicensePlate,
    fetchVehiclesByTenant,
    fetchUnknownVehicles,
    fetchParkingFeeSummary,
  };
};
