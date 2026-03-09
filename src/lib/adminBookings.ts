import { db } from "./firebase";
import { ref, get, update, remove } from "firebase/database";
import type { BookingResponse, CustomerBookingStatusPayload } from "../types/api";

export async function getAllBookings(): Promise<BookingResponse[]> {
  const snapshot = await get(ref(db, "bookings"));
  if (!snapshot.exists()) return [];
  return Object.values(snapshot.val()) as BookingResponse[];
}

export async function updateBookingStatus(bookingId: string, status: string): Promise<void> {
  await update(ref(db, `bookings/${bookingId}`), { status, updatedAtUtc: new Date().toISOString() });
}

export async function deleteBooking(bookingId: string): Promise<void> {
  await remove(ref(db, `bookings/${bookingId}`));
}
