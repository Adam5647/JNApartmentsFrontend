import { db } from "./firebase";
import { ref, get } from "firebase/database";
import type { BookingResponse } from "../types/api";

// Get all unique users who have made bookings
export async function getAllUsers(): Promise<{ fullName: string; email: string }[]> {
  const snapshot = await get(ref(db, "bookings"));
  if (!snapshot.exists()) return [];
  const bookings = Object.values(snapshot.val()) as BookingResponse[];
  const userMap: Record<string, { fullName: string; email: string }> = {};
  bookings.forEach(b => {
    if (b.guest?.email) {
      userMap[b.guest.email] = { fullName: b.guest.fullName, email: b.guest.email };
    }
  });
  return Object.values(userMap);
}
