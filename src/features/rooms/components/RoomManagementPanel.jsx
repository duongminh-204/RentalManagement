import { useState, useEffect, useCallback } from 'react';
import {
  X,
  Home,
  ImageIcon,
  Users,
  Package,
  Wrench,
  Plus,
  Trash2,
  Save,
  Loader2,
} from 'lucide-react';
import RoomStatusBadge from '../../../components/common/RoomStatusBadge';
import { formatCurrency, getRoomDisplayName } from '../utils/roomHelpers';
import * as roomMgmtApi from '../api/roomManagementApi';

const TABS = [
  { id: 'info', label: 'Thông tin', icon: Home },
  { id: 'images', label: 'Ảnh', icon: ImageIcon },
  { id: 'tenants', label: 'Người thuê', icon: Users },
  { id: 'devices', label: 'Thiết bị', icon: Wrench },
  { id: 'services', label: 'Dịch vụ', icon: Package },
];

const emptyInfo = () => ({
  roomNumber: '',
  buildingId: 2,
  rentalPrice: '',
  electricPrice: '',
  waterPrice: '',
  area: '',
  maxPeople: '',
  status: 'vacant',
  description: '',
});

const RoomManagementPanel = ({
  room,
  mode = 'edit',
  loading = false,
  onClose,
  onSaveRoom,
  onRefresh,
  saveLoading = false,
  saveError = null,
}) => {
  const [activeTab, setActiveTab] = useState('info');
  const [info, setInfo] = useState(emptyInfo());
  const [imageUrl, setImageUrl] = useState('');
  const [serviceCatalog, setServiceCatalog] = useState([]);
  const [tenantCandidates, setTenantCandidates] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [serviceQty, setServiceQty] = useState(1);
  const [selectedTenantId, setSelectedTenantId] = useState('');
  const [deviceForm, setDeviceForm] = useState({
    deviceName: '',
    quantity: 1,
    status: 'Working',
    note: '',
  });
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState(null);

  const roomId = room?.id ?? room?.roomId;
  const isCreate = mode === 'create';
  const canManageExtras = !isCreate && roomId;

  useEffect(() => {
    if (room) {
      setInfo({
        roomNumber: room.roomNumber || room.roomName || '',
        buildingId: room.buildingId ?? 2,
        rentalPrice: room.rentalPrice ?? room.price ?? '',
        electricPrice: room.electricPrice ?? room.electricityPrice ?? '',
        waterPrice: room.waterPrice ?? '',
        area: room.area ?? '',
        maxPeople: room.maxPeople ?? '',
        status: room.status || 'vacant',
        description: room.description || '',
      });
    } else if (isCreate) {
      setInfo(emptyInfo());
      setActiveTab('info');
    }
  }, [room, isCreate]);

  const loadCatalogs = useCallback(async () => {
    try {
      const [services, tenants] = await Promise.all([
        roomMgmtApi.getServiceCatalog(),
        roomMgmtApi.getTenantCandidates(),
      ]);
      setServiceCatalog(Array.isArray(services) ? services : []);
      setTenantCandidates(Array.isArray(tenants) ? tenants : []);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (canManageExtras) loadCatalogs();
  }, [canManageExtras, loadCatalogs]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = (e) => {
    e.preventDefault();
    onSaveRoom?.({
      roomNumber: info.roomNumber,
      buildingId: Number(info.buildingId),
      rentalPrice: Number(info.rentalPrice),
      electricityPrice: Number(info.electricPrice),
      electricPrice: Number(info.electricPrice),
      waterPrice: Number(info.waterPrice),
      area: info.area !== '' ? Number(info.area) : null,
      maxPeople: info.maxPeople !== '' ? Number(info.maxPeople) : null,
      status: info.status,
      description: info.description || null,
    });
  };

  const runAction = async (fn) => {
    setBusy(true);
    setLocalError(null);
    try {
      await fn();
      await onRefresh?.();
    } catch (err) {
      setLocalError(err.response?.data?.message || err.message || 'Có lỗi xảy ra');
    } finally {
      setBusy(false);
    }
  };

  const handleAddImage = () =>
    runAction(async () => {
      await roomMgmtApi.addRoomImage(roomId, imageUrl.trim());
      setImageUrl('');
    });

  const handleAddDevice = () =>
    runAction(async () => {
      await roomMgmtApi.addDevice(roomId, deviceForm);
      setDeviceForm({ deviceName: '', quantity: 1, status: 'Working', note: '' });
    });

  const handleAddService = () =>
    runAction(async () => {
      await roomMgmtApi.assignRoomService(roomId, {
        serviceId: Number(selectedServiceId),
        quantity: Number(serviceQty) || 1,
      });
      setSelectedServiceId('');
    });

  const handleAssignTenant = () =>
    runAction(async () => {
      await roomMgmtApi.assignTenant(roomId, { userId: Number(selectedTenantId) });
      setSelectedTenantId('');
    });

  if (!room && !isCreate) {
    return (
      <aside className="flex h-full min-h-[480px] flex-col items-center justify-center rounded-2xl border border-dashed border-hairline-cloud bg-surface-press/50 p-8 text-center">
        <Home className="mb-4 text-accent-violet-mid" size={40} />
        <p className="font-display text-lg font-semibold text-ink-deep">Chọn một phòng</p>
        <p className="mt-2 text-sm text-muted">
          Click vào ô phòng trên sơ đồ hoặc bấm &quot;Thêm phòng&quot; để quản lý
        </p>
      </aside>
    );
  }

  return (
    <aside className="flex h-full max-h-[calc(100vh-12rem)] min-h-[480px] flex-col overflow-hidden rounded-2xl border border-hairline-cloud bg-surface-light shadow-[var(--shadow-card)]">
      <div className="border-b border-hairline-cloud bg-ink-deep px-5 py-4 text-on-primary">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow text-on-dark-muted">Quản lý phòng</p>
            <h2 className="font-display text-xl font-semibold">
              {isCreate ? (
                'Thêm phòng mới'
              ) : (
                <>
                  <span className="chip-lime text-ink-deep">{getRoomDisplayName(room)}</span>
                </>
              )}
            </h2>
            {room && !isCreate && (
              <div className="mt-2">
                <RoomStatusBadge status={room.status} />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-on-dark-muted transition hover:bg-on-dark-faint hover:text-on-primary"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-b border-hairline-cloud bg-surface-press/50 px-2 py-2">
        {TABS.map(({ id, label, icon: Icon }) => {
          const disabled = isCreate && id !== 'info';
          return (
            <button
              key={id}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && setActiveTab(id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                activeTab === id
                  ? 'bg-primary text-on-primary'
                  : disabled
                    ? 'cursor-not-allowed text-muted opacity-50'
                    : 'text-ink-deep hover:bg-surface-press'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="flex-1 overflow-y-auto p-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted">
            <Loader2 className="animate-spin text-accent-violet" size={28} />
            <p className="text-sm">Đang tải…</p>
          </div>
        ) : (
          <>
            {(saveError || localError) && (
              <div className="mb-4 rounded-lg border border-accent-pink/40 bg-accent-pink/10 px-3 py-2 text-sm text-ink-deep">
                {saveError || localError}
              </div>
            )}

            {activeTab === 'info' && (
              <form onSubmit={handleSaveInfo} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-accent-violet-mid">
                    Tên / số phòng *
                  </label>
                  <input
                    name="roomNumber"
                    value={info.roomNumber}
                    onChange={handleInfoChange}
                    className="text-input"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-accent-violet-mid">
                      Tòa nhà
                    </label>
                    <input
                      type="number"
                      name="buildingId"
                      value={info.buildingId}
                      onChange={handleInfoChange}
                      className="text-input"
                      min={1}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-accent-violet-mid">
                      Trạng thái
                    </label>
                    <select
                      name="status"
                      value={info.status}
                      onChange={handleInfoChange}
                      className="text-input"
                    >
                      <option value="vacant">Trống</option>
                      <option value="occupied">Đang thuê</option>
                      <option value="maintenance">Bảo trì</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-accent-violet-mid">
                      Giá thuê
                    </label>
                    <input
                      type="number"
                      name="rentalPrice"
                      value={info.rentalPrice}
                      onChange={handleInfoChange}
                      className="text-input"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-accent-violet-mid">
                      Giá điện / kWh
                    </label>
                    <input
                      type="number"
                      name="electricPrice"
                      value={info.electricPrice}
                      onChange={handleInfoChange}
                      className="text-input"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-accent-violet-mid">
                      Giá nước / m³
                    </label>
                    <input
                      type="number"
                      name="waterPrice"
                      value={info.waterPrice}
                      onChange={handleInfoChange}
                      className="text-input"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-accent-violet-mid">
                      Diện tích m²
                    </label>
                    <input
                      type="number"
                      name="area"
                      value={info.area}
                      onChange={handleInfoChange}
                      className="text-input"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-accent-violet-mid">
                      Số người tối đa
                    </label>
                    <input
                      type="number"
                      name="maxPeople"
                      value={info.maxPeople}
                      onChange={handleInfoChange}
                      className="text-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-accent-violet-mid">
                    Mô tả
                  </label>
                  <textarea
                    name="description"
                    value={info.description}
                    onChange={handleInfoChange}
                    rows={3}
                    className="text-input resize-none"
                  />
                </div>
                <button type="submit" disabled={saveLoading || busy} className="btn-primary w-full">
                  <Save size={18} />
                  {saveLoading ? 'Đang lưu…' : isCreate ? 'Tạo phòng' : 'Lưu thông tin'}
                </button>
              </form>
            )}

            {activeTab === 'images' && canManageExtras && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Dán URL ảnh phòng…"
                    className="text-input flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    disabled={busy || !imageUrl.trim()}
                    className="btn-primary shrink-0"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {(room.roomImages || []).map((img) => (
                    <div
                      key={img.id ?? img.url}
                      className="group relative overflow-hidden rounded-xl border border-hairline-cloud"
                    >
                      <img
                        src={img.url}
                        alt=""
                        className="h-28 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          runAction(() => roomMgmtApi.deleteRoomImage(roomId, img.id))
                        }
                        className="absolute right-2 top-2 rounded-full bg-primary/90 p-1.5 text-on-primary opacity-0 transition group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                {!room.roomImages?.length && (
                  <p className="text-center text-sm text-muted">Chưa có ảnh</p>
                )}
              </div>
            )}

            {activeTab === 'tenants' && canManageExtras && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <select
                    value={selectedTenantId}
                    onChange={(e) => setSelectedTenantId(e.target.value)}
                    className="text-input flex-1"
                  >
                    <option value="">Chọn người thuê…</option>
                    {tenantCandidates.map((t) => (
                      <option key={t.userId} value={t.userId}>
                        {t.fullName}
                        {t.phoneNumber ? ` — ${t.phoneNumber}` : ''}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAssignTenant}
                    disabled={busy || !selectedTenantId}
                    className="btn-primary shrink-0"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <ul className="space-y-2">
                  {(room.users || []).map((u) => (
                    <li
                      key={u.userId}
                      className="flex items-center gap-3 rounded-xl border border-hairline-violet bg-ink-deep p-3 text-on-primary"
                    >
                      {u.avatar ? (
                        <img
                          src={u.avatar}
                          alt=""
                          className="h-10 w-10 rounded-full border border-accent-lime object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-violet-deep text-sm font-bold">
                          {u.fullName?.[0]}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{u.fullName}</p>
                        <p className="text-xs text-on-dark-muted">{u.phone || u.email}</p>
                      </div>
                      {u.contractId && (
                        <button
                          type="button"
                          onClick={() =>
                            runAction(() =>
                              roomMgmtApi.removeTenant(roomId, u.contractId)
                            )
                          }
                          className="rounded-md p-2 text-accent-pink hover:bg-on-dark-faint"
                          aria-label="Gỡ người thuê"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {!room.users?.length && (
                  <p className="text-center text-sm text-muted">Chưa gán người thuê</p>
                )}
              </div>
            )}

            {activeTab === 'devices' && canManageExtras && (
              <div className="space-y-4">
                <div className="space-y-2 rounded-xl border border-hairline-cloud bg-surface-press/40 p-3">
                  <input
                    placeholder="Tên thiết bị"
                    value={deviceForm.deviceName}
                    onChange={(e) =>
                      setDeviceForm((p) => ({ ...p, deviceName: e.target.value }))
                    }
                    className="text-input"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min={1}
                      placeholder="SL"
                      value={deviceForm.quantity}
                      onChange={(e) =>
                        setDeviceForm((p) => ({ ...p, quantity: Number(e.target.value) }))
                      }
                      className="text-input"
                    />
                    <select
                      value={deviceForm.status}
                      onChange={(e) =>
                        setDeviceForm((p) => ({ ...p, status: e.target.value }))
                      }
                      className="text-input"
                    >
                      <option value="Working">Hoạt động</option>
                      <option value="Broken">Hỏng</option>
                      <option value="Repair">Đang sửa</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddDevice}
                    disabled={busy || !deviceForm.deviceName.trim()}
                    className="btn-primary w-full"
                  >
                    <Plus size={16} /> Thêm thiết bị
                  </button>
                </div>
                <ul className="space-y-2">
                  {(room.devices || []).map((d) => (
                    <li
                      key={d.deviceId}
                      className="flex items-center justify-between rounded-lg border border-hairline-cloud px-3 py-2"
                    >
                      <div>
                        <p className="font-medium text-ink-deep">{d.deviceName}</p>
                        <p className="text-xs text-muted">
                          SL: {d.quantity} · {d.status}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          runAction(() => roomMgmtApi.deleteDevice(roomId, d.deviceId))
                        }
                        className="rounded-md p-2 text-accent-pink hover:bg-surface-press"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'services' && canManageExtras && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="text-input min-w-0 flex-1"
                  >
                    <option value="">Chọn dịch vụ…</option>
                    {serviceCatalog.map((s) => (
                      <option key={s.serviceId} value={s.serviceId}>
                        {s.serviceName} — {formatCurrency(s.unitPrice)}
                        {s.unit ? `/${s.unit}` : ''}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={serviceQty}
                    onChange={(e) => setServiceQty(e.target.value)}
                    className="text-input w-20"
                  />
                  <button
                    type="button"
                    onClick={handleAddService}
                    disabled={busy || !selectedServiceId}
                    className="btn-primary"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <ul className="space-y-2">
                  {(room.roomServices || []).map((rs) => (
                    <li
                      key={rs.roomServiceId}
                      className="flex items-center justify-between rounded-lg border border-hairline-cloud bg-surface-press/30 px-3 py-2"
                    >
                      <div>
                        <p className="font-medium text-ink-deep">{rs.serviceName}</p>
                        <p className="text-xs text-muted">
                          {formatCurrency(rs.unitPrice)}
                          {rs.unit ? `/${rs.unit}` : ''} · SL: {rs.quantity}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          runAction(() =>
                            roomMgmtApi.deleteRoomService(roomId, rs.roomServiceId)
                          )
                        }
                        className="rounded-md p-2 text-accent-pink hover:bg-surface-press"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
                {!room.roomServices?.length && (
                  <p className="text-center text-sm text-muted">Chưa có dịch vụ</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
};

export default RoomManagementPanel;
