# Meghalaya Tourism Integration Guide

## Real-Time Bookings & Availability

The admin dashboard now includes live integration with Meghalaya Tourism platform for real-time bookings and room availability tracking.

## Features

### 1. **Real-Time Bookings Widget**
- Displays all active bookings from MT platform
- Shows booking status (confirmed, pending, cancelled)
- Displays guest names, room types, check-in/check-out dates
- Shows total revenue from confirmed bookings
- Updates automatically every 30 seconds

### 2. **Room Availability Tracking**
- Shows all room types with current availability
- Displays pricing per night
- Visual availability indicators (occupancy bars)
- Color-coded status (green = available, red = fully booked)

### 3. **Occupancy Metrics**
- Real-time occupancy percentage
- Active booking count
- Revenue tracking
- Upcoming bookings preview

### 4. **Live/Manual Refresh Toggle**
- Enable "Live" mode for automatic updates every 30 seconds
- Toggle to "Manual" mode for on-demand refreshes only
- Last updated timestamp displayed

## Configuration

### API Endpoint Setup

The integration uses the Meghalaya Tourism API. Update the base URL and property ID in `src/lib/mtBookings.ts`:

```typescript
const MT_PROPERTY_ID = "693abf6c2f91fcdb61d3f676"; // Your MT property ID
const MT_API_BASE = "https://api.meghalayatourism.in"; // MT API base URL
```

### Available API Endpoints

1. **Get Availability**
   ```
   GET /properties/{propertyId}/availability?checkIn={date}&checkOut={date}
   ```

2. **Get Room Types**
   ```
   GET /properties/{propertyId}/rooms
   ```

3. **Get All Bookings**
   ```
   GET /properties/{propertyId}/bookings
   ```

4. **Get Single Booking**
   ```
   GET /properties/{propertyId}/bookings/{bookingId}
   ```

## Implementation Details

### MTBookingsWidget Component
Located in `src/components/Admin/MTBookingsWidget.tsx`

**Features:**
- Real-time polling with configurable interval
- Stats display: active bookings, occupancy, revenue
- Room availability grid
- Upcoming bookings list
- Auto-refresh toggle

### mtBookings Library
Located in `src/lib/mtBookings.ts`

**Functions:**
- `fetchMTBookings()` - Get all bookings
- `fetchMTRooms()` - Get room types and availability
- `fetchMTAvailability(checkIn, checkOut)` - Get availability for date range
- `fetchMTCurrentAvailability()` - Get current availability
- `subscribeToMTBookings(callback, interval)` - Real-time polling

## Fallback Data

If MT API is unavailable, the widget displays default fallback room data:
- 1 BHK AC - ₹4000/night
- 2 BHK AC - ₹6000/night
- 1 BHK Non-AC - ₹3000/night
- 2 BHK Non-AC - ₹4500/night

## Update Frequency

**Default:** 30 seconds (configurable)

To change update frequency, modify the polling interval:

```typescript
subscribeToMTBookings(callback, 60000); // Updates every 60 seconds
```

## Data Types

### MTBooking
```typescript
{
  id: string;
  guestName: string;
  guestEmail: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  price: number;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: number;
  mtBookingId?: string;
}
```

### MTRoom
```typescript
{
  id: string;
  name: string;
  type: string;
  capacity: number;
  price: number;
  available: boolean;
  availableRooms: number;
  totalRooms: number;
  images?: string[];
}
```

## Error Handling

All API calls include error handling with console logging. If an API call fails:
1. Widget displays loading state or cached data
2. Error is logged to console
3. Fallback data is used if available
4. Updates continue to attempt on next refresh

## Integration with Admin Dashboard

The MTBookingsWidget is automatically displayed at the top of the admin dashboard (`/admin`).

It shows:
- Live booking statistics
- Room availability overview
- Upcoming bookings timeline
- Auto-refresh status

## Future Enhancements

Potential additions:
1. Booking details modal with guest information
2. Revenue analytics and charts
3. Seasonal availability forecasting
4. Integration with Firebase for data caching
5. SMS/Email alerts for new bookings
6. Booking confirmation workflow integration
