# Quản lý Khách Thuê (Tenants Management)

## Tổng quan
Module quản lý khách thuê cung cấp tất cả các chức năng cần thiết để quản lý thông tin cá nhân, liên hệ, giấy tờ và lịch sử của các khách thuê.

## Tính năng

### 1. **Lưu trữ Thông Tin Khách Thuê**
- Họ tên, số điện thoại, email
- Chứng chỉ công dân (CCCD)
- Ngày vào ở, ngày trả phòng
- Tiền cọc
- Liên kết với phòng tương ứng
- Ghi chú thêm

### 2. **Upload & Lưu Trữ Tài Liệu**
- Upload ảnh CCCD/Chứng minh thư
- Lưu trữ các tài liệu liên quan
- Xem trước ảnh trước khi lưu

### 3. **Quản Lý Trạng Thái**
- **Đang thuê (active)**: Khách hiện đang thuê
- **Ngừng thuê (inactive)**: Khách tạm ngừng
- **Đã trả phòng (moved_out)**: Khách đã rời khỏi
- **Đang chờ (pending)**: Chờ xác nhận

### 4. **Tìm Kiếm & Lọc**
- Tìm kiếm theo: Tên, số điện thoại, CCCD
- Lọc theo trạng thái
- Thống kê tổng hợp

### 5. **Xuất Dữ Liệu**
- Export danh sách khách thuê (CSV/Excel)
- In báo cáo

### 6. **Lịch Sử Khách Thuê**
- Theo dõi lịch sử thuê phòng
- Thời gian ở tính tự động
- Chi tiết từng lần thuê

## Cấu trúc Thư mục

```
features/tenants/
├── api/
│   └── tenantsApi.js          # API calls
├── components/
│   ├── TenantsList.jsx        # Danh sách khách thuê
│   ├── TenantForm.jsx         # Form thêm/sửa khách
│   └── TenantCard.jsx         # Card hiển thị khách thuê
├── hooks/
│   └── useTenants.js          # Custom hook quản lý state
├── pages/
│   └── TenantsPage.jsx        # Trang chính
├── utils/
│   └── tenantHelpers.js       # Hàm tiện ích
├── index.js                   # Export chính
└── README.md                  # File hướng dẫn này
```

## Component API

### TenantsPage
Trang chính cho quản lý khách thuê.
```jsx
import TenantsPage from './features/tenants/pages/TenantsPage';
```

### TenantsList
Component hiển thị danh sách khách thuê với tìm kiếm, lọc, và quản lý.
```jsx
import TenantsList from './features/tenants/components/TenantsList';
<TenantsList />
```

### TenantForm
Form để thêm/sửa thông tin khách thuê.
```jsx
import TenantForm from './features/tenants/components/TenantForm';

<TenantForm
  tenant={editingTenant}      // null = thêm mới, object = sửa
  onSubmit={handleSubmit}     // Callback khi submit
  onCancel={handleCancel}     // Callback khi hủy
  loading={false}             // Trạng thái loading
  error={null}                // Hiển thị lỗi
/>
```

### TenantCard
Component hiển thị thông tin khách thuê dạng card.
```jsx
import TenantCard from './features/tenants/components/TenantCard';

<TenantCard
  tenant={tenantData}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onViewDetails={handleViewDetails}
/>
```

## Hook API

### useTenants
Custom hook quản lý trạng thái khách thuê.

```jsx
const {
  tenants,              // Array khách thuê
  loading,              // Boolean loading
  error,                // String lỗi
  fetchTenants,         // Function tải danh sách
  getTenant,            // Function lấy chi tiết
  addTenant,            // Function thêm khách
  editTenant,           // Function sửa khách
  removeTenant,         // Function xóa khách
  uploadIDCard,         // Function upload CCCD
  fetchTenantHistory,   // Function lấy lịch sử
} = useTenants();
```

## Utility Functions

### Validate & Format

```jsx
import {
  formatPhoneNumber,      // Format số điện thoại
  validatePhoneNumber,    // Validate số điện thoại
  validateCCCD,           // Validate CCCD
  formatCCCD,             // Format CCCD
  calculateStayDuration,  // Tính thời gian ở
  formatCurrency,         // Format tiền tệ
  formatDate,             // Format ngày tháng
} from './utils/tenantHelpers';
```

### Status Helpers

```jsx
import {
  getTenantStatusLabel,   // Lấy nhãn trạng thái
  getTenantStatusColor,   // Lấy màu trạng thái
} from './utils/tenantHelpers';
```

## API Endpoints

Module sử dụng các endpoint sau:

- `GET /tenants` - Lấy danh sách khách thuê
- `GET /tenants/{id}` - Lấy chi tiết khách thuê
- `POST /tenants` - Tạo khách thuê mới
- `PUT /tenants/{id}` - Cập nhật khách thuê
- `DELETE /tenants/{id}` - Xóa khách thuê
- `POST /tenants/{id}/upload-id-card` - Upload ảnh CCCD
- `GET /tenants/{id}/history` - Lấy lịch sử khách thuê
- `GET /tenants/search?q={query}` - Tìm kiếm khách thuê

## Data Model

```javascript
{
  id: string,                    // ID khách thuê
  fullName: string,              // Họ tên
  phoneNumber: string,           // Số điện thoại
  email: string,                 // Email (tùy chọn)
  cccd: string,                  // CCCD
  idCardImage: string,           // URL ảnh CCCD
  roomId: string,                // ID phòng
  roomNumber: string,            // Số phòng
  moveInDate: Date,              // Ngày vào ở
  moveOutDate: Date,             // Ngày trả phòng (tùy chọn)
  deposit: number,               // Tiền cọc
  status: string,                // Trạng thái (active|inactive|moved_out|pending)
  notes: string,                 // Ghi chú
  createdAt: Date,               // Ngày tạo
  updatedAt: Date,               // Ngày cập nhật
}
```

## Ví dụ Sử Dụng

### Thêm Khách Thuê Mới
```jsx
import { useTenants } from './features/tenants';

const { addTenant } = useTenants();

const handleAddTenant = async () => {
  try {
    const newTenant = await addTenant({
      fullName: 'Nguyễn Văn A',
      phoneNumber: '0912345678',
      cccd: '123456789012',
      moveInDate: '2024-01-01',
      deposit: 5000000,
      roomId: '1',
      notes: 'Khách tốt'
    });
    console.log('Added:', newTenant);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Tìm Kiếm Khách Thuê
```jsx
const { tenants, fetchTenants } = useTenants();

const handleSearch = async (query) => {
  const results = tenants.filter(t => 
    t.fullName.toLowerCase().includes(query.toLowerCase())
  );
};
```

### Upload Ảnh CCCD
```jsx
const { uploadIDCard } = useTenants();

const handleUploadIDCard = async (tenantId, file) => {
  try {
    await uploadIDCard(tenantId, file);
    console.log('Image uploaded successfully');
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

## Routing

Route mặc định:
- `/tenants` - Danh sách quản lý khách thuê

Có thể mở rộng:
- `/tenants/:id` - Chi tiết khách thuê
- `/tenants/:id/history` - Lịch sử khách thuê
- `/tenants/:id/contracts` - Hợp đồng của khách

## Integrations

### Liên kết với Rooms
- Mỗi khách thuê được gán vào một phòng
- Hiển thị thông tin phòng trên card khách

### Liên kết với Contracts (sắp tới)
- Quản lý hợp đồng thuê của khách
- Nhắc nhở hết hạn hợp đồng

### Liên kết với Invoices (sắp tới)
- Xem hóa đơn của khách
- Tính công nợ

### Liên kết với Payments (sắp tới)
- Lịch sử thanh toán
- Gạch nợ

## Validation Rules

- **Họ tên**: Không để trống
- **Số điện thoại**: Phải là số điện thoại Việt Nam hợp lệ (10 chữ số)
- **Email**: Phải là email hợp lệ (nếu có)
- **CCCD**: Phải là 12 chữ số
- **Ngày vào ở**: Không để trống
- **Tiền cọc**: Phải là số dương
- **Phòng**: Phải chọn một phòng

## Styling

Component sử dụng Tailwind CSS:
- Responsive design (mobile-first)
- Dark mode support (sắp tới)
- Framer Motion animations
- Lucide React icons

## Performance Tips

1. **Pagination**: Cân nhắc thêm pagination cho danh sách lớn
2. **Caching**: Cân nhắc cache dữ liệu khách thuê
3. **Lazy Loading**: Load ảnh CCCD lazy
4. **Debouncing**: Debounce search input

## TODO / Future Features

- [ ] Chi tiết khách thuê (details page)
- [ ] Lịch sử khách thuê (history timeline)
- [ ] Export CSV/Excel
- [ ] Print report
- [ ] Bulk operations
- [ ] Advanced filters
- [ ] Dark mode support
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Document verification

## Troubleshooting

### Lỗi "Không thể tải khách thuê"
- Kiểm tra kết nối API
- Kiểm tra token xác thực
- Xem console log chi tiết

### Upload ảnh không thành công
- Kiểm tra định dạng file (JPG, PNG)
- Kiểm tra kích thước file (< 5MB)
- Kiểm tra quyền upload

### Form validation không hoạt động
- Kiểm tra validate rules
- Xem error message chi tiết
- Kiểm tra data format

---

**Last Updated**: 2024-01-14
**Version**: 1.0.0
