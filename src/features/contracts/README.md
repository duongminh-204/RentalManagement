# Quản lý Hợp Đồng Thuê (Contracts Management)

## Tổng quan
Module quản lý hợp đồng thuê cung cấp các chức năng để tạo, lưu trữ, theo dõi và quản lý hợp đồng thuê phòng điện tử. Hệ thống tự động nhắc chủ trọ khi hợp đồng sắp hết hạn để chuẩn bị ký mới.

## Tính năng

### 1. **Tạo & Lưu Trữ Hợp Đồng**
- Thông tin hợp đồng chi tiết: Số HĐ, khách thuê, phòng
- Thời hạn: Ngày bắt đầu, ngày kết thúc
- Giá thuê và điều khoản
- Lưu trữ file hợp đồng (PDF/Ảnh)

### 2. **Theo Dõi Trạng Thái Hợp Đồng**
- **Chờ ký (pending)**: Hợp đồng chưa ký
- **Còn hiệu lực (active)**: Hợp đồng đang có hiệu lực
- **Sắp hết hạn (expiring_soon)**: Còn ≤30 ngày
- **Hết hạn (expired)**: Hợp đồng đã quá ngày kết thúc
- **Đã chấm dứt (terminated)**: Hợp đồng bị hủy

### 3. **Tự động Nhắc Hạn**
- Cảnh báo hợp đồng sắp hết hạn (≤30 ngày)
- Hiển thị số ngày còn lại
- Badge highlight trên thẻ hợp đồng
- Thống kê hợp đồng sắp hết hạn

### 4. **Gia hạn Hợp Đồng**
- Nút "Gia hạn" cho hợp đồng sắp hết hạn
- Tự động thêm 1 năm (có thể tùy chỉnh)
- Cập nhật trạng thái hợp đồng

### 5. **Upload & Quản Lý File**
- Upload file PDF hoặc ảnh hợp đồng
- Xem trước file trước khi lưu
- Download file hợp đồng

### 6. **Tìm Kiếm & Lọc**
- Tìm kiếm theo: Số HĐ, tên khách, phòng
- Lọc theo trạng thái
- Thống kê tổng hợp

### 7. **Liên Kết Dữ Liệu**
- Liên kết với khách thuê (tenants)
- Liên kết với phòng trọ (rooms)
- Hiển thị thông tin khách và phòng trên card

## Cấu trúc Thư mục

```
features/contracts/
├── api/
│   └── contractsApi.js        # API calls
├── components/
│   ├── ContractsList.jsx      # Danh sách hợp đồng
│   ├── ContractForm.jsx       # Form tạo/sửa hợp đồng
│   └── ContractCard.jsx       # Card hiển thị hợp đồng
├── hooks/
│   └── useContracts.js        # Custom hook quản lý state
├── pages/
│   └── ContractsPage.jsx      # Trang chính
├── utils/
│   └── contractHelpers.js     # Hàm tiện ích
├── index.js                   # Export chính
└── README.md                  # File hướng dẫn này
```

## Component API

### ContractsPage
Trang chính cho quản lý hợp đồng.
```jsx
import ContractsPage from './features/contracts/pages/ContractsPage';
```

### ContractsList
Component hiển thị danh sách hợp đồng với tìm kiếm, lọc, và quản lý.
```jsx
import ContractsList from './features/contracts/components/ContractsList';
<ContractsList tenants={tenants} rooms={rooms} />
```

### ContractForm
Form để tạo/sửa hợp đồng.
```jsx
import ContractForm from './features/contracts/components/ContractForm';

<ContractForm
  contract={editingContract}      // null = tạo mới, object = sửa
  tenants={tenants}              // Danh sách khách thuê
  rooms={rooms}                  // Danh sách phòng
  onSubmit={handleSubmit}        // Callback khi submit
  onCancel={handleCancel}        // Callback khi hủy
  loading={false}                // Trạng thái loading
  error={null}                   // Hiển thị lỗi
/>
```

### ContractCard
Component hiển thị thông tin hợp đồng dạng card.
```jsx
import ContractCard from './features/contracts/components/ContractCard';

<ContractCard
  contract={contractData}
  tenant={tenantData}
  room={roomData}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onDownload={handleDownload}
  onRenew={handleRenew}
/>
```

## Hook API

### useContracts
Custom hook quản lý trạng thái hợp đồng.

```jsx
const {
  contracts,              // Array hợp đồng
  expiringContracts,      // Array hợp đồng sắp hết hạn
  loading,                // Boolean loading
  error,                  // String lỗi
  fetchContracts,         // Function tải danh sách
  getContract,            // Function lấy chi tiết
  addContract,            // Function tạo hợp đồng
  editContract,           // Function sửa hợp đồng
  removeContract,         // Function xóa hợp đồng
  uploadFile,             // Function upload file
  downloadFile,           // Function download file
  fetchExpiringContracts, // Function lấy HĐ sắp hết hạn
  renewContractFn,        // Function gia hạn hợp đồng
  terminateContractFn,    // Function chấm dứt hợp đồng
} = useContracts();
```

## Utility Functions

### Status & Format

```jsx
import {
  getContractStatusLabel,      // Lấy nhãn trạng thái
  getContractStatusColor,      // Lấy màu trạng thái
  getContractStatus,           // Xác định trạng thái hợp đồng
  calculateDaysUntilExpiry,    // Tính ngày còn lại
  calculateContractDuration,   // Tính thời hạn hợp đồng
  formatContractNumber,        // Format số hợp đồng
  formatDate,                  // Format ngày
  formatCurrency,              // Format tiền tệ
  calculateRenewalDate,        // Tính ngày gia hạn
} from './utils/contractHelpers';
```

### Validate

```jsx
import {
  validateContractNumber,      // Validate số hợp đồng
  validateContractDates,       // Validate ngày hợp đồng
} from './utils/contractHelpers';
```

## API Endpoints

Module sử dụng các endpoint sau:

- `GET /contracts` - Lấy danh sách hợp đồng
- `GET /contracts/{id}` - Lấy chi tiết hợp đồng
- `POST /contracts` - Tạo hợp đồng mới
- `PUT /contracts/{id}` - Cập nhật hợp đồng
- `DELETE /contracts/{id}` - Xóa hợp đồng
- `POST /contracts/{id}/upload-file` - Upload file hợp đồng
- `GET /contracts/{id}/download` - Download file hợp đồng
- `GET /contracts/expiring` - Lấy hợp đồng sắp hết hạn
- `POST /contracts/{id}/renew` - Gia hạn hợp đồng
- `POST /contracts/{id}/terminate` - Chấm dứt hợp đồng
- `GET /contracts/search?q={query}` - Tìm kiếm hợp đồng

## Data Model

```javascript
{
  id: string,                    // ID hợp đồng
  contractNumber: string,        // Số hợp đồng (HD/YYYY/MM/001)
  tenantId: string,              // ID khách thuê
  roomId: string,                // ID phòng
  startDate: Date,               // Ngày bắt đầu
  endDate: Date,                 // Ngày kết thúc
  rentalPrice: number,           // Giá thuê (VNĐ/tháng)
  terms: string,                 // Điều khoản hợp đồng
  notes: string,                 // Ghi chú thêm
  fileUrl: string,               // URL file hợp đồng
  status: string,                // Trạng thái (active|pending|expired|terminated)
  isTerminated: boolean,         // Hợp đồng bị chấm dứt
  terminationDate: Date,         // Ngày chấm dứt
  renewalHistory: Array,         // Lịch sử gia hạn
  createdAt: Date,               // Ngày tạo
  updatedAt: Date,               // Ngày cập nhật
}
```

## Ví dụ Sử Dụng

### Tạo Hợp Đồng Mới
```jsx
import { useContracts } from './features/contracts';

const { addContract, uploadFile } = useContracts();

const handleCreateContract = async () => {
  try {
    const newContract = await addContract({
      contractNumber: 'HD/2024/01/001',
      tenantId: '1',
      roomId: '1',
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      rentalPrice: 3000000,
      terms: 'Thanh toán đầu tháng...',
      notes: 'Hợp đồng mới',
    });

    // Upload file nếu có
    if (contractFile) {
      await uploadFile(newContract.id, contractFile);
    }

    console.log('Created:', newContract);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Gia hạn Hợp Đồng
```jsx
const { renewContractFn } = useContracts();

const handleRenewal = async (contractId, currentEndDate) => {
  try {
    const newEndDate = new Date(currentEndDate);
    newEndDate.setFullYear(newEndDate.getFullYear() + 1);

    await renewContractFn(contractId, {
      newEndDate: newEndDate.toISOString().split('T')[0],
      renewalDate: new Date().toISOString().split('T')[0],
    });

    console.log('Contract renewed successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Lấy Hợp Đồng Sắp Hết Hạn
```jsx
const { expiringContracts, fetchExpiringContracts } = useContracts();

useEffect(() => {
  fetchExpiringContracts(30); // Lấy HĐ sắp hết hạn trong 30 ngày
}, []);

console.log('Expiring contracts:', expiringContracts);
```

### Download File Hợp Đồng
```jsx
const { downloadFile } = useContracts();

const handleDownload = async (contractId, contractNumber) => {
  try {
    await downloadFile(contractId, contractNumber);
    console.log('File downloaded');
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Notification System

Hệ thống tự động cảnh báo:

1. **Badge Alert**: Hiển thị badge orange "Sắp hết hạn" trên thẻ hợp đồng
2. **Banner Alert**: Thông báo ở đầu trang nếu có hợp đồng sắp hết hạn
3. **Stats Widget**: Đếm số hợp đồng sắp hết hạn
4. **Expiring List**: Danh sách hợp đồng sắp hết hạn dễ nhìn thấy

## Validation Rules

- **Số hợp đồng**: Không để trống, chỉ chứa ký tự alphanumeric, dấu gạch
- **Khách thuê**: Phải chọn một khách
- **Phòng**: Phải chọn một phòng
- **Ngày bắt đầu**: Không để trống
- **Ngày kết thúc**: Không để trống, phải sau ngày bắt đầu
- **Giá thuê**: Không để trống, phải là số dương
- **Điều khoản**: Không để trống
- **File**: PDF hoặc ảnh, tối đa 10MB

## Styling

Component sử dụng Tailwind CSS:
- Responsive design (mobile-first)
- Framer Motion animations
- Lucide React icons
- Color-coded status badges
- Alert banners cho thông báo quan trọng

## Performance Tips

1. **Lazy Loading**: Load file hợp đồng lazy
2. **Caching**: Cache danh sách hợp đồng
3. **Pagination**: Cân nhắc pagination cho danh sách lớn
4. **Debouncing**: Debounce search input

## Integration Points

### Với Tenants
- Hiển thị thông tin khách thuê trên card
- Chuyển sang chi tiết khách từ hợp đồng

### Với Rooms
- Hiển thị thông tin phòng trên card
- Chuyển sang chi tiết phòng từ hợp đồng

### Với Notifications (sắp tới)
- Gửi notification khi hợp đồng sắp hết hạn
- Email/SMS nhắc gia hạn

### Với Invoices (sắp tới)
- Liên kết hóa đơn với hợp đồng
- Tính phí dựa trên giá thuê hợp đồng

## TODO / Future Features

- [ ] Chi tiết hợp đồng (details page)
- [ ] Lịch sử gia hạn
- [ ] Export PDF hợp đồng
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Digital signature
- [ ] Document versioning
- [ ] Bulk operations
- [ ] Advanced analytics
- [ ] Template management

## Troubleshooting

### Lỗi "Không thể tải hợp đồng"
- Kiểm tra kết nối API
- Kiểm tra token xác thực
- Xem console log chi tiết

### Upload file không thành công
- Kiểm tra định dạng file (PDF, JPG, PNG)
- Kiểm tra kích thước file (< 10MB)
- Kiểm tra quyền upload

### Hợp đồng không hiển thị cảnh báo
- Kiểm tra ngày hết hạn có chính xác
- Reload trang để cập nhật
- Kiểm tra timezone server

---

**Last Updated**: 2024-01-14
**Version**: 1.0.0
