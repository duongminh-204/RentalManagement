# 🏠 Room Management Feature - Integration Guide

## ✅ What's Been Created

I've created a complete, production-ready room management system for your rental application. Here's what you have:

### 📦 File Structure Created

```
✅ features/rooms/
   ├── api/
   │   └── roomsApi.js              (All CRUD API calls)
   ├── components/
   │   ├── RoomForm.jsx             (Form wrapper)
   │   └── RoomsList.jsx            (Main management interface)
   ├── hooks/
   │   └── useRooms.js              (State management hook)
   ├── pages/
   │   └── RoomsPage.jsx            (Page component)
   ├── utils/
   │   └── roomHelpers.js           (Helper functions)
   ├── index.js                     (Exports)
   └── README.md                    (Documentation)

✅ components/
   ├── common/
   │   └── RoomStatusBadge.jsx      (Status display)
   ├── forms/
   │   └── RoomFormComponent.jsx    (Reusable form)
   └── tables/
       └── RoomTable.jsx            (Data table)

✅ utils/
   └── roomConstants.js             (Constants)
```

## 🔧 Integration Steps

### Step 1: Update Your Routes

Add this to your `src/routes/index.jsx`:

```jsx
import { RoomsPage } from '../features/rooms';
import { PrivateRoute } from './PrivateRoute';

// Add to your routes array
{
  path: '/rooms',
  element: <PrivateRoute><RoomsPage /></PrivateRoute>
}
```

### Step 2: Add Navigation Link

Update your sidebar or navigation menu (e.g., `MainLayout.jsx`):

```jsx
import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Add this navigation item
<Link 
  to="/rooms" 
  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
>
  <Building2 size={20} />
  <span>Quản lý phòng</span>
</Link>
```

### Step 3: Backend API Implementation

Your backend needs to implement these endpoints:

#### **GET** `/api/rooms`
Fetch all rooms with pagination support (optional)

**Response:**
```json
{
  "data": [
    {
      "id": "room-1",
      "roomNumber": "101",
      "rentalPrice": 3000000,
      "electricityPrice": 3500,
      "waterPrice": 10000,
      "internetPrice": 150000,
      "additionalServices": "TV cáp, Máy lạnh",
      "status": "occupied",
      "description": "Phòng góc, thoáng mát",
      "createdAt": "2026-01-15T10:30:00Z",
      "updatedAt": "2026-05-14T10:30:00Z"
    }
  ]
}
```

#### **GET** `/api/rooms/:id`
Get specific room details

#### **POST** `/api/rooms`
Create new room

**Request Body:**
```json
{
  "roomNumber": "102",
  "rentalPrice": 3000000,
  "electricityPrice": 3500,
  "waterPrice": 10000,
  "internetPrice": 150000,
  "additionalServices": "TV cáp, WiFi",
  "status": "vacant",
  "description": "Phòng mới, nội thất đẹp"
}
```

#### **PUT** `/api/rooms/:id`
Update room information (same body as POST)

#### **PATCH** `/api/rooms/:id/status`
Update only room status

**Request Body:**
```json
{
  "status": "occupied"  // or "vacant", "maintenance"
}
```

#### **DELETE** `/api/rooms/:id`
Delete room

#### **GET** `/api/rooms/status/:status`
Filter rooms by status

#### **GET** `/api/rooms/stats`
Get room statistics

**Response:**
```json
{
  "data": {
    "total": 10,
    "occupied": 7,
    "vacant": 2,
    "maintenance": 1
  }
}
```

## 🎨 Features Included

### Room Management
- ✅ **View Rooms**: See all rooms in a responsive table
- ✅ **Search**: Find rooms by room number
- ✅ **Filter**: Filter by status (occupied, vacant, maintenance)
- ✅ **Add Room**: Create new rooms with form validation
- ✅ **Edit Room**: Modify existing room details
- ✅ **Delete Room**: Remove rooms with confirmation
- ✅ **Status Tracking**: Change room status easily
- ✅ **Statistics**: View summary stats at the top

### Pricing Details Managed
- 💰 **Monthly Rental Price**
- ⚡ **Electricity Price** (per kWh)
- 💧 **Water Price** (per m³)
- 🌐 **Internet Price** (per month)
- 🎁 **Additional Services** (TV cable, AC, etc.)

### UI/UX Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations with Framer Motion
- ✅ Loading states and error handling
- ✅ Form validation with error messages
- ✅ Confirmation dialogs for destructive actions
- ✅ Color-coded status badges
- ✅ Search and filter functionality
- ✅ Statistics dashboard
- ✅ Export button (ready for implementation)

## 📊 Data Model

```typescript
interface Room {
  id: string;                    // Unique identifier
  roomNumber: string;            // "101", "202A", etc.
  rentalPrice: number;           // VND
  electricityPrice: number;      // VND per kWh
  waterPrice: number;            // VND per m³
  internetPrice: number;         // VND per month
  additionalServices?: string;   // "TV cáp, Máy lạnh, WiFi"
  status: 'occupied'|'vacant'|'maintenance';
  description?: string;          // Optional notes
  createdAt?: Date;
  updatedAt?: Date;
}
```

## 🔌 Usage Examples

### Use the Hook in Your Component
```jsx
import { useRooms } from '../features/rooms/hooks/useRooms';

export const MyComponent = () => {
  const { 
    rooms, 
    loading, 
    error, 
    addRoom, 
    editRoom, 
    removeRoom,
    changeRoomStatus,
    refetch 
  } = useRooms();

  // Your component logic
};
```

### Import API Functions Directly
```jsx
import { getRoomsByStatus, getRoomsStats } from '../features/rooms/api/roomsApi';

// Use in your own hooks
const vacantRooms = await getRoomsByStatus('vacant');
const stats = await getRoomsStats();
```

### Use Utilities
```jsx
import { formatCurrency, calculateRoomMonthlyCost } from '../features/rooms/utils/roomHelpers';
import { ROOM_STATUS, ROOM_STATUS_LABELS } from '../utils/roomConstants';

const total = calculateRoomMonthlyCost(room);
const display = formatCurrency(total);
```

## 📱 Responsive Breakpoints

- **Mobile**: Full-width layout, stacked forms
- **Tablet**: 2-column grid, adjusted spacing
- **Desktop**: Multi-column layout, full-width tables

## 🎯 Status Reference

| Status | Label | Color | Icon | Use Case |
|--------|-------|-------|------|----------|
| `occupied` | Đang thuê | 🟢 Green | ✓ | Currently rented |
| `vacant` | Trống | 🔵 Blue | ⚠️ | Available for rent |
| `maintenance` | Đang bảo trì | 🟡 Yellow | 🔧 | Under maintenance |

## 🚀 Next Steps (Optional Enhancements)

1. **Export to Excel**: Implement CSV export for room data
2. **Bulk Operations**: Add bulk delete/status update
3. **Room Images**: Support room photos
4. **Occupancy History**: Track who lived in each room
5. **Price History**: Track price changes over time
6. **Advanced Filters**: Filter by price range, amenities, etc.
7. **Analytics**: Revenue by room, occupancy rates
8. **Integration**: Link with tenant and invoice modules

## 🔐 Security Considerations

1. **Authentication**: All routes protected by PrivateRoute
2. **Authorization**: Implement role-based access control
3. **Input Validation**: Form validation on client and server
4. **API Security**: Validate all requests on backend
5. **Data Protection**: Sensitive data (prices) should have access controls

## ⚠️ Important Notes

1. **API Base URL**: Configured in `utils/api.js` (currently `http://localhost:3000`)
2. **Token Management**: Token stored in `localStorage` as `token`
3. **Error Handling**: All errors logged to console and displayed to user
4. **Loading States**: Shown during API calls
5. **Form Validation**: Required fields marked with red asterisk (*)

## 🐛 Troubleshooting

**Q: Rooms not loading?**
- Check browser console for errors
- Verify API endpoint is running
- Check network tab in dev tools

**Q: Form not submitting?**
- Check validation errors in form
- Check browser console for API errors
- Verify API response format

**Q: Styles not applying?**
- Ensure Tailwind CSS is properly configured
- Check that all components import correctly

## 📞 Support

For issues or questions:
1. Check the README.md in `/features/rooms/`
2. Review API responses in browser console
3. Check form validation errors

---

**Integration Status**: Ready for backend connection
**Last Updated**: May 14, 2026
