# Room Management Feature Documentation

## 📁 Project Structure

```
features/rooms/
├── api/
│   └── roomsApi.js           # API calls for room operations
├── components/
│   ├── RoomForm.jsx          # Wrapper for room form
│   └── RoomsList.jsx         # Main rooms list & management interface
├── hooks/
│   └── useRooms.js           # Custom hook for room state management
├── pages/
│   └── RoomsPage.jsx         # Page component
├── utils/
│   └── roomHelpers.js        # Helper functions for room data
└── index.js                  # Exports

components/
├── common/
│   └── RoomStatusBadge.jsx   # Room status display component
├── forms/
│   └── RoomFormComponent.jsx # Reusable room form component
└── tables/
    └── RoomTable.jsx         # Reusable room table component

utils/
└── roomConstants.js          # Room-related constants
```

## 🚀 Quick Start

### 1. Add Route to your Router

Update your [routes/index.jsx](routes/index.jsx) file:

```jsx
import { RoomsPage } from '../features/rooms';

// Add to your routes array
{
  path: '/rooms',
  element: <RoomsPage />
}
```

### 2. Add Navigation Link

Add a link to your sidebar/navigation:

```jsx
<NavLink to="/rooms" className="...">
  <Building2 size={20} />
  Quản lý phòng
</NavLink>
```

### 3. Ensure API Backend Endpoints

Your backend should implement these endpoints:

#### GET /rooms
Get all rooms
**Response:** `{ data: Room[] }`

#### GET /rooms/:id
Get room by ID
**Response:** `{ data: Room }`

#### POST /rooms
Create new room
**Body:** `{ roomNumber, rentalPrice, electricityPrice, waterPrice, internetPrice, additionalServices?, status, description? }`
**Response:** `{ data: Room }`

#### PUT /rooms/:id
Update room
**Body:** `{ roomNumber, rentalPrice, electricityPrice, waterPrice, internetPrice, additionalServices?, status, description? }`
**Response:** `{ data: Room }`

#### PATCH /rooms/:id/status
Update room status
**Body:** `{ status: 'occupied' | 'vacant' | 'maintenance' }`
**Response:** `{ data: Room }`

#### DELETE /rooms/:id
Delete room
**Response:** `{ message: string }`

#### GET /rooms/status/:status
Get rooms by status
**Response:** `{ data: Room[] }`

#### GET /rooms/stats
Get room statistics
**Response:** `{ data: { total: number, occupied: number, vacant: number, maintenance: number } }`

## 📊 Room Data Structure

```typescript
interface Room {
  id: string;
  roomNumber: string;              // e.g., "101", "102A"
  rentalPrice: number;             // Monthly rental price (VND)
  electricityPrice: number;        // Price per kWh (VND)
  waterPrice: number;              // Price per m³ (VND)
  internetPrice: number;           // Monthly internet price (VND)
  additionalServices?: string;     // Comma-separated services
  status: 'occupied' | 'vacant' | 'maintenance';
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

## 🎨 Features

### Room Management
- ✅ View all rooms with filtering and search
- ✅ Add new rooms with full details
- ✅ Edit room information
- ✅ Delete rooms with confirmation
- ✅ Change room status (occupied, vacant, maintenance)
- ✅ Filter rooms by status
- ✅ Search rooms by room number

### UI Components
- **RoomsList** - Main management interface with search, filters, and stats
- **RoomTable** - Responsive data table displaying room information
- **RoomForm** - Form for adding/editing rooms with validation
- **RoomStatusBadge** - Visual indicator for room status
- **RoomFormComponent** - Reusable form component

### Custom Hook
- **useRooms** - Complete state management for rooms
  - `rooms` - Array of room objects
  - `loading` - Loading state
  - `error` - Error message
  - `addRoom(data)` - Create new room
  - `editRoom(id, data)` - Update room
  - `removeRoom(id)` - Delete room
  - `changeRoomStatus(id, status)` - Update status
  - `refetch()` - Refresh rooms list

## 🔧 Utilities

### Constants (`utils/roomConstants.js`)
- `ROOM_STATUS` - Status enum
- `ROOM_STATUS_LABELS` - Vietnamese labels
- `ROOM_STATUS_COLORS` - Color configurations
- `DEFAULT_ROOM_DATA` - Default form values

### Helpers (`features/rooms/utils/roomHelpers.js`)
- `formatCurrency(value)` - Format currency display
- `formatRoomData(room)` - Format room for display
- `calculateRoomMonthlyCost(room)` - Calculate total monthly cost
- `parseAdditionalServices(string)` - Parse services from string
- `formatAdditionalServices(services)` - Format services for display

## 📝 Example Usage

### Use in a Component
```jsx
import { useRooms } from '../features/rooms/hooks/useRooms';

export const MyComponent = () => {
  const { rooms, loading, addRoom, editRoom, removeRoom } = useRooms();

  const handleAddRoom = async (data) => {
    try {
      await addRoom(data);
      console.log('Room added successfully');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    // Your component JSX
  );
};
```

### Use Helpers
```jsx
import { formatCurrency, calculateRoomMonthlyCost } from '../features/rooms/utils/roomHelpers';
import { ROOM_STATUS } from '../utils/roomConstants';

const monthlyCost = calculateRoomMonthlyCost(room);
const displayPrice = formatCurrency(monthlyCost);
```

## 🎯 Status Codes

| Status | Label | Color | Use Case |
|--------|-------|-------|----------|
| `occupied` | Đang thuê | Green | Room is currently rented |
| `vacant` | Trống | Blue | Room is available |
| `maintenance` | Đang bảo trì | Yellow | Room is under maintenance |

## 🔐 Permissions

Currently, all authenticated users can manage rooms. Consider adding role-based permissions:
- Admin: Full access
- Manager: Can view and edit
- Tenant: View only (read-only access)

## 📱 Responsive Design

- ✅ Mobile-friendly layout
- ✅ Responsive grid system
- ✅ Touch-friendly buttons
- ✅ Optimized for all screen sizes

## 🎬 Animation & UX

- Motion animations from Framer Motion
- Smooth transitions
- Loading states
- Error handling
- Success feedback

## 🚨 Error Handling

All components include error handling:
- Network errors
- Validation errors
- Form submission errors
- Display user-friendly error messages

## 💡 Future Enhancements

- [ ] Export rooms to CSV/Excel
- [ ] Import rooms from CSV
- [ ] Bulk operations (status update, delete multiple)
- [ ] Advanced filtering and sorting
- [ ] Room images/photos
- [ ] Room amenities list
- [ ] Tenant assignment history
- [ ] Notes/comments on rooms
- [ ] Price history tracking
- [ ] Occupancy rate analytics

## 🐛 Troubleshooting

### Rooms not loading?
1. Check API endpoint is accessible
2. Verify token in localStorage
3. Check browser console for errors

### Form validation not working?
1. Check input field names match data structure
2. Verify validation rules in RoomFormComponent.jsx
3. Check browser console for validation errors

### Status updates not working?
1. Ensure API endpoint `/rooms/:id/status` exists
2. Check request body format: `{ status: 'status_value' }`
3. Verify response handling in useRooms hook

---

Created: 2026
Last Updated: May 14, 2026
