import type { BookingResponse } from "../types/api";

export type AvailabilityDay = {
  date: string;
  label: string;
  weekday: string;
  bookedOne: number;
  bookedTwo: number;
  availableOne: number;
  availableTwo: number;
};

type Inventory = {
  oneBhkCapacity: number;
  twoBhkCapacity: number;
};

const defaultInventory: Inventory = {
  oneBhkCapacity: 16,
  twoBhkCapacity: 8,
};

const toDateKey = (date: Date) => date.toISOString().slice(0, 10);

const makeLabel = (date: Date) => ({
  label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  weekday: date.toLocaleDateString("en-US", { weekday: "short" })
});

const parseIsoDate = (value: string | undefined) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
};

const isCancelled = (status?: string) => status?.toLowerCase() === "cancelled";

export function buildAvailabilityFromBookings(
  bookings: BookingResponse[],
  startDateIso: string,
  days: number,
  inventory: Inventory = defaultInventory
): AvailabilityDay[] {
  const startDate = parseIsoDate(startDateIso);
  if (!startDate || days <= 0) return [];

  const counts: Record<string, { one: number; two: number }> = {};

  bookings.forEach((booking) => {
    if (isCancelled(booking.status)) return;

    const rangeStart = parseIsoDate(booking.checkIn);
    const rawRangeEnd = parseIsoDate(booking.checkOut ?? booking.checkIn);
    if (!rangeStart) return;

    const endExclusive = (() => {
      if (!rawRangeEnd) return addDays(rangeStart, 1);
      if (rawRangeEnd <= rangeStart) return addDays(rangeStart, 1);
      return rawRangeEnd;
    })();

    let cursor = new Date(rangeStart);
    while (cursor < endExclusive) {
      const key = toDateKey(cursor);
      counts[key] = counts[key] ?? { one: 0, two: 0 };
      if (booking.rentalType.toLowerCase() === "2bhk") {
        counts[key].two += 1;
      } else {
        counts[key].one += 1;
      }
      cursor = addDays(cursor, 1);
    }
  });

  return Array.from({ length: days }, (_, idx) => {
    const date = addDays(startDate, idx);
    const key = toDateKey(date);
    const { label, weekday } = makeLabel(date);
    const booked = counts[key] ?? { one: 0, two: 0 };

    const usedBaseUnits = booked.two + Math.ceil(booked.one / 2);
    const availableTwo = Math.max(0, inventory.twoBhkCapacity - usedBaseUnits);
    const availableOne = Math.max(0, inventory.oneBhkCapacity - booked.one - booked.two * 2);

    return {
      date: key,
      label,
      weekday,
      bookedOne: booked.one,
      bookedTwo: booked.two,
      availableOne,
      availableTwo
    };
  });
}
