import { db } from "./firebase";
import { ref, get, update, remove } from "firebase/database";
import type { InquiryResponse } from "../types/api";

export async function getAllInquiries(): Promise<InquiryResponse[]> {
  const snapshot = await get(ref(db, "inquiries"));
  if (!snapshot.exists()) return [];
  const items = Object.values(snapshot.val()) as InquiryResponse[];
  return items.sort((a, b) => (b.receivedAtUtc || "").localeCompare(a.receivedAtUtc || ""));
}

export async function updateInquiryStatus(ticketId: string, status: string) {
  await update(ref(db, `inquiries/${ticketId}`), { status, updatedAtUtc: new Date().toISOString() });
}

export async function deleteInquiry(ticketId: string) {
  await remove(ref(db, `inquiries/${ticketId}`));
}