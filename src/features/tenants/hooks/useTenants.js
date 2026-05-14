import { useState, useCallback, useEffect } from 'react';
import {
  getTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
  uploadIdCardImage,
  getTenantHistory,
} from '../api/tenantsApi';

export const useTenants = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tenants
  const fetchTenants = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTenants(params);
      setTenants(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi tải dữ liệu khách thuê');
      console.error('Error fetching tenants:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single tenant
  const getTenant = useCallback(async (id) => {
    try {
      setError(null);
      const data = await getTenantById(id);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi tải chi tiết khách thuê');
      throw err;
    }
  }, []);

  // Add new tenant
  const addTenant = useCallback(async (tenantData) => {
    try {
      setError(null);
      const data = await createTenant(tenantData);
      setTenants((prevTenants) => [...prevTenants, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi thêm khách thuê');
      throw err;
    }
  }, []);

  // Edit tenant
  const editTenant = useCallback(async (id, tenantData) => {
    try {
      setError(null);
      const data = await updateTenant(id, tenantData);
      setTenants((prevTenants) =>
        prevTenants.map((t) => (t.id === id ? data : t))
      );
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi cập nhật khách thuê');
      throw err;
    }
  }, []);

  // Remove tenant
  const removeTenant = useCallback(async (id) => {
    try {
      setError(null);
      await deleteTenant(id);
      setTenants((prevTenants) => prevTenants.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi xóa khách thuê');
      throw err;
    }
  }, []);

  // Upload ID card
  const uploadIDCard = useCallback(async (tenantId, file) => {
    try {
      setError(null);
      const data = await uploadIdCardImage(tenantId, file);
      setTenants((prevTenants) =>
        prevTenants.map((t) => (t.id === tenantId ? { ...t, idCardImage: data.idCardImage } : t))
      );
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi upload ảnh CCCD');
      throw err;
    }
  }, []);

  // Get tenant history
  const fetchTenantHistory = useCallback(async (tenantId) => {
    try {
      setError(null);
      const data = await getTenantHistory(tenantId);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi tải lịch sử khách thuê');
      throw err;
    }
  }, []);

  // Load tenants on mount
  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  return {
    tenants,
    loading,
    error,
    fetchTenants,
    getTenant,
    addTenant,
    editTenant,
    removeTenant,
    uploadIDCard,
    fetchTenantHistory,
  };
};
