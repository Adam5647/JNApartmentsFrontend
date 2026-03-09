// src/lib/firebaseData.ts
import { db } from "./firebase";
import { ref, push, set, get, update, remove, onValue } from "firebase/database";
import type {
  BookingRequestPayload,
  BookingResponse,
  InquiryRequestPayload,
  InquiryResponse,
  CustomerBookingStatusPayload
} from "../types/api";

export async function createBooking(payload: BookingRequestPayload): Promise<BookingResponse> {
  const bookingRef = push(ref(db, "bookings"));
  const bookingId = bookingRef.key!;
  const now = new Date().toISOString();
  const booking: BookingResponse = {
    bookingId,
    createdAtUtc: now,
    updatedAtUtc: now,
    status: "pending",
    ...payload,
    specialRequests: payload.specialRequests ?? null
  };
  await set(bookingRef, booking);
  return booking;
}

export async function createInquiry(payload: InquiryRequestPayload): Promise<InquiryResponse> {
  const inquiryRef = push(ref(db, "inquiries"));
  const ticketId = inquiryRef.key!;
  const now = new Date().toISOString();
  const inquiry: InquiryResponse = {
    ticketId,
    receivedAtUtc: now,
    updatedAtUtc: now,
    status: "open",
    ...payload,
    subject: payload.subject ?? null
  };
  await set(inquiryRef, inquiry);
  return inquiry;
}

export async function getCustomerBookings(email: string): Promise<BookingResponse[]> {
  const snapshot = await get(ref(db, "bookings"));
  if (!snapshot.exists()) return [];
  const all = Object.values(snapshot.val()) as BookingResponse[];
  return all.filter(b => b.guest.email === email);
}

export async function updateCustomerBooking(
  bookingId: string,
  payload: CustomerBookingStatusPayload
): Promise<void> {
  await update(ref(db, `bookings/${bookingId}`), { status: payload.status, updatedAtUtc: new Date().toISOString() });
}

export function watchBookings(
  onChange: (bookings: BookingResponse[]) => void,
  onError?: (error: Error) => void
): () => void {
  const bookingsRef = ref(db, "bookings");
  const unsubscribe = onValue(
    bookingsRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        onChange([]);
        return;
      }
      const all = Object.values(snapshot.val()) as BookingResponse[];
      onChange(all);
    },
    (error) => {
      if (onError) onError(error as unknown as Error);
    }
  );
  return unsubscribe;
}
