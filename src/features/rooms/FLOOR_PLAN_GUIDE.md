# Floor Plan View - Giao Diện Sơ Đồ Tầng

## Tổng Quan

Giao diện quản lý phòng mới được thiết kế lại bằng React Konva, cung cấp:

1. **Sơ đồ tầng trực quan** - Hiển thị bố cục các phòng trên mỗi tầng
2. **Hai chế độ xem** - Sơ đồ tầng (floor plan) và bảng danh sách (table)
3. **Hỗ trợ nhiều tầng** - Quản lý nhiều tầng với bộ chọn tầng
4. **Tương tác trực quan** - Click vào phòng để xem chi tiết
5. **Zoom và kéo bản đồ** - Phóng to/thu nhỏ bằng con lăn chuột, kéo để di chuyển

## Tính Năng Chính

### 1. Sơ Đồ Tầng (Floor Plan View)

#### Màu Sắc Phòng
- **Xanh (Blue)**: Phòng trống (`status: 'vacant'`)
- **Đỏ (Red)**: Phòng đang thuê (`status: 'occupied'`)
- **Cam (Orange)**: Phòng đang bảo trì (`status: 'maintenance'`)

#### Tương Tác
- **Click vào phòng**: Mở modal hiển thị chi tiết phòng
- **Hover vào phòng**: Phòng được highlight với đường viền đậm hơn
- **Cuộn chuột**: Phóng to/thu nhỏ (0.5x đến 3x)
- **Chuột phải + kéo**: Di chuyển bản đồ (pan)

#### Thống Kê
- Hiển thị số lượng phòng theo trạng thái
- Tỷ lệ chiếm dụng (occupancy rate) với thanh tiến trình trực quan

#### Bộ Chọn Tầng
- Chuyển đổi giữa các tầng bằng nút mũi tên hoặc click trực tiếp vào tầng
- Hiển thị tất cả các tầng có sẵn

### 2. Chế Độ Bảng (Table View)

- Hiển thị danh sách phòng dưới dạng bảng
- Tìm kiếm theo số phòng
- Lọc theo trạng thái
- Chỉnh sửa và xóa phòng trực tiếp

### 3. Modal Chi Tiết Phòng

Hiển thị thông tin chi tiết về phòng bao gồm:
- Số phòng và tầng
- Trạng thái
- Diện tích
- Giá thuê
- Thông tin khách thuê (nếu đang thuê)

## Cấu Trúc Dữ Liệu

Mỗi phòng phải có các trường sau:

```javascript
{
  id: string,                 // ID duy nhất
  roomNumber: string,         // Số phòng (e.g., "101", "202A")
  floor: number,              // Tầng (e.g., 1, 2, 3)
  status: string,             // 'vacant', 'occupied', 'maintenance'
  price: number,              // Giá thuê (VND)
  area: number,               // Diện tích (m²)
  capacity: number,           // Sức chứa (người)
  type: string,               // Loại phòng (optional)
  tenant: {                   // Thông tin khách thuê (nếu occupied)
    name: string,
    phone: string,
    email: string,
    checkInDate: string       // ISO date format
  },
  // ... các trường khác
}
```

## Cách Sử Dụng

### 1. Chuyển Đổi Giữa Hai Chế Độ Xem

Tại trang Quản lý phòng, bạn sẽ thấy hai nút ở phía trên:
- **Sơ đồ tầng**: Hiển thị giao diện floor plan
- **Bảng**: Hiển thị danh sách dưới dạng bảng

### 2. Sử Dụng Sơ Đồ Tầng

1. Chọn tầng từ bộ chọn tầng
2. Xem các phòng được hiển thị với màu sắc tương ứng
3. Click vào phòng để xem chi tiết
4. Cuộn chuột để phóng to/thu nhỏ
5. Chuột phải + kéo để di chuyển bản đồ
6. Click "Reset" để quay về vị trí ban đầu

### 3. Thêm Phòng Mới

1. Click nút "Thêm phòng"
2. Điền thông tin bao gồm:
   - Số phòng *
   - Tầng *
   - Giá thuê *
   - Giá điện *
   - Giá nước *
   - Giá internet *
   - Dịch vụ phụ trội (tuỳ chọn)
   - Trạng thái phòng
   - Mô tả (tuỳ chọn)
3. Click "Lưu"

### 4. Xem Chi Tiết Phòng

1. Trong sơ đồ tầng, click vào phòng
2. Modal sẽ hiển thị:
   - Thông tin phòng (số, tầng, diện tích, giá cả)
   - Trạng thái hiện tại
   - Thông tin khách thuê (nếu có)
3. Click "Chỉnh sửa" để sửa hoặc "Đóng" để đóng

## Thành Phần Component

### FloorPlanCanvas
Thành phần chính để vẽ sơ đồ tầng
- Props: `rooms`, `selectedFloor`, `onRoomClick`, `onRoomHover`
- Sử dụng React Konva để vẽ các hình chữ nhật phòng

### RoomDetailModal
Modal hiển thị chi tiết phòng
- Props: `room`, `isOpen`, `onClose`, `onEdit`
- Hiển thị tất cả thông tin phòng và khách thuê

### FloorSelector
Bộ chọn tầng
- Props: `selectedFloor`, `availableFloors`, `onFloorChange`
- Cho phép chuyển đổi giữa các tầng

### RoomStatistics
Hiển thị thống kê phòng
- Props: `rooms`, `selectedFloor`
- Hiển thị số lượng và tỷ lệ chiếm dụng

## Thiết Lập Dữ Liệu Mẫu

Để test giao diện floor plan, bạn cần đảm bảo dữ liệu phòng có trường `floor` và `tenant`:

```javascript
// Ví dụ dữ liệu
const mockRooms = [
  {
    id: '1',
    roomNumber: '101',
    floor: 1,
    status: 'vacant',
    price: 5000000,
    area: 25,
    capacity: 2,
    type: 'Phòng tiêu chuẩn'
  },
  {
    id: '2',
    roomNumber: '102',
    floor: 1,
    status: 'occupied',
    price: 5500000,
    area: 30,
    capacity: 2,
    type: 'Phòng cao cấp',
    tenant: {
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      email: 'a@example.com',
      checkInDate: '2024-01-15'
    }
  }
];
```

## Cải Tiến Tương Lai

- [ ] Kéo-thả phòng để thay đổi vị trí
- [ ] Xem trước 3D phòng
- [ ] Xuất sơ đồ tầng thành PDF
- [ ] In sơ đồ tầng
- [ ] Hiển thị giá thuê trên phòng
- [ ] Thêm bộ lọc nâng cao (giá, diện tích, v.v.)
- [ ] Animation chuyển tầng
- [ ] Quản lý tòa nhà/toà nhà
- [ ] Sáp nhập/tách phòng

## Troubleshooting

### Các phòng không hiển thị
- Kiểm tra dữ liệu có trường `floor` không
- Đảm bảo `selectedFloor` khớp với `floor` của phòng
- Kiểm tra console cho lỗi

### Zoom không hoạt động
- Đảm bảo bạn đang cuộn trên canvas
- Thử click "Reset" để quay về trạng thái ban đầu

### Modal chi tiết phòng không mở
- Kiểm tra click event hoạt động
- Kiểm tra console cho lỗi JavaScript

## Liên Hệ & Hỗ Trợ

Nếu gặp vấn đề, vui lòng kiểm tra:
1. React Konva có cài đặt đúng không
2. Dữ liệu phòng có các trường bắt buộc không
3. Console cho thông báo lỗi
