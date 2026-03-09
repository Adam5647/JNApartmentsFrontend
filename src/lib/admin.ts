// src/lib/admin.ts
import { db } from "./firebase";
import { ref, get } from "firebase/database";

// Firebase keys cannot contain dots, so we replace them with commas
function emailKey(email: string) {
  return email.replace(/\./g, ',');
}

export async function isAdmin(email: string): Promise<boolean> {
  if (!email) return false;
  const snapshot = await get(ref(db, `admins/${emailKey(email)}`));
  return snapshot.exists();
}
