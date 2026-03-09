/**
 * Meghalaya Tourism Bookings Integration
 * Fetches real-time bookings and room availability from MT platform
 */

export interface MTRoom {
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

export interface MTBooking {
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

export interface MTAvailability {
  date: string;
  availableRooms: {
    [roomType: string]: number;
  };
  totalBooked: number;
}

// MT Property/Hotel ID from Meghalaya Tourism
const MT_PROPERTY_ID = "693abf6c2f91fcdb61d3f676";
const MT_API_BASE = "https://api.meghalayatourism.in";

/**
 * Fetch availability for a specific date range
 */
export const fetchMTAvailability = async (
  checkIn: string,
  checkOut: string
): Promise<MTAvailability[]> => {
  try {
    const response = await fetch(
      `${MT_API_BASE}/properties/${MT_PROPERTY_ID}/availability?checkIn=${checkIn}&checkOut=${checkOut}`
    );

    if (!response.ok) {
      console.error("MT API error:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data.availability || [];
  } catch (error) {
    console.error("Error fetching MT availability:", error);
    // Return fallback data
    return [];
  }
};

/**
 * Fetch room types and pricing from MT
 */
export const fetchMTRooms = async (): Promise<MTRoom[]> => {
  try {
    console.log(`[MT API] Fetching rooms from: ${MT_API_BASE}/properties/${MT_PROPERTY_ID}/rooms`);
    
    const response = await fetch(
      `${MT_API_BASE}/properties/${MT_PROPERTY_ID}/rooms`
    );

    console.log(`[MT API] Rooms response status: ${response.status}`);
    
    if (!response.ok) {
      console.error(`[MT API] Failed to fetch rooms: ${response.statusText}`);
      return getDefaultRooms();
    }

    const data = await response.json();
    console.log(`[MT API] Rooms data received:`, data);
    
    if (data?.rooms && data.rooms.length > 0) {
      console.log(`[MT API] Using ${data.rooms.length} rooms from MT API`);
      return data.rooms;
    }
    
    console.warn(`[MT API] No rooms in response, using defaults`);
    return getDefaultRooms();
  } catch (error) {
    console.error("[MT API] Error fetching MT rooms:", error);
    console.warn("[MT API] Falling back to default rooms");
    return getDefaultRooms();
  }
};

/**
 * Fetch all bookings for the property from MT
 */
export const fetchMTBookings = async (): Promise<MTBooking[]> => {
  try {
    console.log(`[MT API] Fetching bookings from: ${MT_API_BASE}/properties/${MT_PROPERTY_ID}/bookings`);
    
    const response = await fetch(
      `${MT_API_BASE}/properties/${MT_PROPERTY_ID}/bookings`
    );

    console.log(`[MT API] Bookings response status: ${response.status}`);
    
    if (!response.ok) {
      console.error(`[MT API] Failed to fetch bookings: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    console.log(`[MT API] Bookings data received:`, data);
    
    if (!data?.bookings) {
      console.warn(`[MT API] No bookings in response`);
      return [];
    }
    
    const mappedBookings = (data.bookings || []).map((booking: any) => ({
      id: booking.id,
      guestName: booking.guestName || "Guest",
      guestEmail: booking.guestEmail || "",
      roomType: booking.roomType || "Unknown",
      checkIn: booking.checkInDate,
      checkOut: booking.checkOutDate,
      nights: calculateNights(booking.checkInDate, booking.checkOutDate),
      price: booking.totalPrice || 0,
      status: booking.status?.toLowerCase() || "pending",
      createdAt: booking.createdAt ? new Date(booking.createdAt).getTime() : Date.now(),
      mtBookingId: booking.id
    }));
    
    console.log(`[MT API] Using ${mappedBookings.length} bookings from MT API`);
    return mappedBookings;
  } catch (error) {
    console.error("[MT API] Error fetching MT bookings:", error);
    return [];
  }
};

/**
 * Get booking details from MT by ID
 */
export const fetchMTBookingById = async (bookingId: string): Promise<MTBooking | null> => {
  try {
    const response = await fetch(
      `${MT_API_BASE}/properties/${MT_PROPERTY_ID}/bookings/${bookingId}`
    );

    if (!response.ok) {
      return null;
    }

    const booking = await response.json();
    return {
      id: booking.id,
      guestName: booking.guestName || "Guest",
      guestEmail: booking.guestEmail || "",
      roomType: booking.roomType || "Unknown",
      checkIn: booking.checkInDate,
      checkOut: booking.checkOutDate,
      nights: calculateNights(booking.checkInDate, booking.checkOutDate),
      price: booking.totalPrice || 0,
      status: booking.status?.toLowerCase() || "pending",
      createdAt: booking.createdAt ? new Date(booking.createdAt).getTime() : Date.now(),
      mtBookingId: booking.id
    };
  } catch (error) {
    console.error("Error fetching MT booking:", error);
    return null;
  }
};

/**
 * Set up real-time polling for MT bookings
 * @param callback Function to call with updated bookings
 * @param interval Polling interval in milliseconds (default: 30 seconds)
 * @returns Unsubscribe function
 */
export const subscribeToMTBookings = (
  callback: (bookings: MTBooking[]) => void,
  interval: number = 30000
): (() => void) => {
  const pollInterval = setInterval(async () => {
    try {
      const bookings = await fetchMTBookings();
      callback(bookings);
    } catch (error) {
      console.error("Error polling MT bookings:", error);
    }
  }, interval);

  // Initial fetch
  fetchMTBookings().then(callback).catch(console.error);

  // Return unsubscribe function
  return () => clearInterval(pollInterval);
};

/**
 * Fetch current availability for today onwards
 */
export const fetchMTCurrentAvailability = async (): Promise<MTRoom[]> => {
  try {
    const rooms = await fetchMTRooms();
    
    // If rooms are fetched successfully, return them
    if (rooms && rooms.length > 0) {
      return rooms;
    }
    
    // Otherwise return defaults
    return getDefaultRooms();
  } catch (error) {
    console.error("Error fetching MT current availability:", error);
    return getDefaultRooms();
  }
};

// Helper function to calculate nights between two dates
function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(nights, 1);
}

// Default room data fallback
function getDefaultRooms(): MTRoom[] {
  return [
    {
      id: "1bhk-deluxe",
      name: "1BHK Deluxe Non-AC",
      type: "1bhk-deluxe",
      capacity: 3,
      price: 3000,
      available: true,
      availableRooms: 2,
      totalRooms: 2
    },
    {
      id: "2bhk-deluxe",
      name: "2BHK Deluxe Non-AC",
      type: "2bhk-deluxe",
      capacity: 6,
      price: 4500,
      available: true,
      availableRooms: 2,
      totalRooms: 2
    }
  ];
}
