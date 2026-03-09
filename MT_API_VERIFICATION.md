# Meghalaya Tourism API Integration - Verification Guide

## Overview
The MTBookingsWidget is now equipped with **live data status tracking** and **detailed console logging** to help verify if real Meghalaya Tourism API data is being fetched or if the system is using fallback data.

## Status Indicator

The widget now displays a **Data Source Badge** in the top-right corner:

- 🟢 **"Live API"** (Emerald) - Successfully connected to MT API and receiving real booking/room data
- 🟡 **"Fallback"** (Amber) - Using hardcoded default data (API not responding)

## How to Verify

### Step 1: Open Browser DevTools
1. Open your admin dashboard in the browser
2. Press **F12** (or Ctrl+Shift+I on Windows/Linux, Cmd+Option+I on Mac)
3. Click the **"Console"** tab

### Step 2: Check for API Logs

Look for log messages with the **[MT API]** prefix:

```
[MT API] Fetching rooms from: https://api.meghalayatourism.in/properties/693abf6c2f91fcdb61d3f676/rooms
[MT API] Response Status: 200
[MT API] Rooms received: Array(2) [ {...}, {...} ]
```

### Step 3: Interpret the Logs

#### ✅ Success (Real Data Being Used)
```
[MT API] Fetching rooms from: https://api.meghalayatourism.in/properties/693abf6c2f91fcdb61d3f676/rooms
[MT API] Response Status: 200
[MT API] Rooms received: Array(2)
```
- Status badge shows: **🟢 Live API**
- Your widget is pulling real room/booking data from MT

#### ❌ Fallback (Default Data Used)
```
[MT API] Fetching rooms from: https://api.meghalayatourism.in/properties/693abf6c2f91fcdb61d3f676/rooms
[MT API] Response Status: 404
[MT API] No rooms returned, using defaults
```
- Status badge shows: **🟡 Fallback**
- The API endpoint is not responding, so hardcoded data is displayed

## Fallback Data Structure

When the MT API is not responding, the widget displays:

```
Room 1: 1BHK Deluxe Non-AC
  - Price: ₹3,000/night
  - Available: 2/2 rooms
  - Capacity: 3 guests

Room 2: 2BHK Deluxe Non-AC
  - Price: ₹4,500/night
  - Available: 2/2 rooms
  - Capacity: 6 guests
```

This matches the actual property inventory.

## Real-Time Auto-Refresh

The widget has two refresh modes:

1. **🟢 Live Mode** (Default)
   - Auto-refreshes every 30 seconds
   - Button shows spinning indicator
   - Status badge updates automatically

2. **⚪ Manual Mode**
   - Click the refresh button to manually fetch data
   - No automatic updates
   - Useful for debugging

Toggle between modes with the **Live/Manual button** in the header.

## Debugging Checklist

If you see **🟡 Fallback** status:

- [ ] Check browser console for [MT API] logs
- [ ] Verify MT API property ID is correct: `693abf6c2f91fcdb61d3f676`
- [ ] Check if the API requires authentication (API key/credentials)
- [ ] Verify CORS headers - may need backend proxy for cross-origin requests
- [ ] Test API endpoint directly in Postman or curl:
  ```bash
  curl https://api.meghalayatourism.in/properties/693abf6c2f91fcdb61d3f676/rooms
  ```

## Expected API Response Format

The MT API should return data in this structure:

```json
{
  "rooms": [
    {
      "id": "1bhk-deluxe",
      "name": "1BHK Deluxe Non-AC",
      "type": "1bhk-deluxe",
      "capacity": 3,
      "price": 3000,
      "available": true,
      "availableRooms": 2,
      "totalRooms": 2
    },
    {
      "id": "2bhk-deluxe",
      "name": "2BHK Deluxe Non-AC",
      "type": "2bhk-deluxe",
      "capacity": 6,
      "price": 4500,
      "available": true,
      "availableRooms": 2,
      "totalRooms": 2
    }
  ]
}
```

## Code Location

- **Library**: [`src/lib/mtBookings.ts`](src/lib/mtBookings.ts)
  - API fetch functions with detailed logging
  - Fallback data generator

- **Widget**: [`src/components/Admin/MTBookingsWidget.tsx`](src/components/Admin/MTBookingsWidget.tsx)
  - Live data status indicator
  - Real-time refresh logic
  - Room availability display

## Configuration

Update MT API credentials in [`src/lib/mtBookings.ts`]:

```typescript
const MT_API_BASE = "https://api.meghalayatourism.in";
const MT_PROPERTY_ID = "693abf6c2f91fcdb61d3f676";
```

If MT API requires authentication:

```typescript
const headers = {
  "Authorization": `Bearer YOUR_API_KEY`,
  "Content-Type": "application/json"
};
```

## Status Indicator Behavior

The `isLiveData` state is set based on:

```typescript
// Live API if:
// 1. Data received from API AND
// 2. Data contains more than just the default 2 rooms OR
//    contains non-default pricing

setIsLiveData(hasRealData && !mtRooms.every(r => r.price === 3000 || r.price === 4500));
```

If you add more room types or pricing to MT, the indicator will automatically show `Live API` status.

## Next Steps

1. ✅ Check console logs with **[MT API]** prefix
2. ✅ Verify status badge accuracy
3. ✅ If showing **Fallback**, debug API connectivity
4. ✅ Configure authentication if required by MT API
5. ✅ Test with real bookings to confirm data updates
