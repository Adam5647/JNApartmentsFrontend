import { Fragment, useEffect, useMemo, useState } from "react";
import { generateAiText } from "../../lib/ai";
import { updateBookingStatus, deleteBooking } from "../../lib/adminBookings";
import { watchBookings } from "../../lib/firebaseData";
import { buildAvailabilityFromBookings, type AvailabilityDay } from "../../lib/availability";
import type { BookingResponse } from "../../types/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [aiDrafts, setAiDrafts] = useState<Record<string, string>>({});
  const [aiLoadingId, setAiLoadingId] = useState<string | null>(null);
  const [aiError, setAiError] = useState("");
  const [availability, setAvailability] = useState<AvailabilityDay[]>([]);

  useEffect(() => {
    setLoading(true);
    const startIso = new Date().toISOString().slice(0, 10);
    const unsubscribe = watchBookings(
      (list) => {
        setBookings(list);
        setAvailability(buildAvailabilityFromBookings(list, startIso, 14));
        setLoading(false);
      },
      (err) => {
        const msg = err instanceof Error ? err.message : String(err);
        setError(`Failed to load bookings. ${msg}`);
        setLoading(false);
      }
    );

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const handleStatus = async (bookingId: string, status: string) => {
    setUpdating(bookingId);
    try {
      await updateBookingStatus(bookingId, status);
      setBookings((prev) => prev.map(b => b.bookingId === bookingId ? { ...b, status } : b));
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (bookingId: string) => {
    setDeleting(bookingId);
    try {
      await deleteBooking(bookingId);
      setBookings((prev) => prev.filter(b => b.bookingId !== bookingId));
    } finally {
      setDeleting(null);
    }
  };

  const draftReply = async (booking: BookingResponse) => {
    setAiLoadingId(booking.bookingId);
    setAiError("");
    const requests = booking.specialRequests || "none";
    const dateLine = `Check-in ${booking.checkIn}${booking.checkOut ? `, check-out ${booking.checkOut}` : ""}`;
    const prompt =
      `Write a concise concierge reply (under 130 words) confirming booking status and suggesting 2-3 upsells ` +
      `(airport transfer, premium check-in, dining, spa, late checkout, housekeeping cadence). Avoid pricing.\n` +
      `Booking: ${booking.bookingId}. Status: ${booking.status}.\n` +
      `Residence: ${booking.residenceType}; rental type: ${booking.rentalType}; guests: ${booking.guests}; ${dateLine}.\n` +
      `Guest: ${booking.guest.fullName} <${booking.guest.email}>. Requests: ${requests}.`;

    try {
      const text = await generateAiText(prompt, {
        system: "You are JN Apartments concierge. Provide clear next steps and upsells relevant to luxury serviced apartments.",
        maxOutputTokens: 256,
        temperature: 0.45
      });
      setAiDrafts((prev) => ({ ...prev, [booking.bookingId]: text }));
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Unable to draft reply.");
    } finally {
      setAiLoadingId(null);
    }
  };

  const copyDraft = async (bookingId: string) => {
    const text = aiDrafts[bookingId];
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        b.guest.fullName.toLowerCase().includes(search.toLowerCase()) ||
        b.guest.email.toLowerCase().includes(search.toLowerCase()) ||
        b.bookingId.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || b.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-white">
      <h2 className="font-display text-2xl mb-6">Bookings management</h2>
      {aiError ? <p className="mb-3 text-sm text-red-300">{aiError}</p> : null}
      {availability.length ? (
        <div className="mb-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Live availability (next 14 days)</p>
            <p className="text-xs text-slate-400">Updates from bookings</p>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3 lg:grid-cols-4">
            {availability.slice(0, 12).map((day) => {
              const hasInventory = day.availableOne > 0 || day.availableTwo > 0;
              return (
                <div
                  key={day.date}
                  className={`rounded-xl border px-3 py-3 text-sm ${hasInventory ? "border-emerald-400/40 bg-emerald-500/10" : "border-red-400/40 bg-red-500/10"}`}
                >
                  <div className="flex items-center justify-between text-white">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/70">{day.weekday}</span>
                    <span className="font-semibold">{day.label}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-200">
                    <span>1BHK: {day.availableOne} left</span>
                    <span>2BHK: {day.availableTwo} left</span>
                  </div>
                  <p className="mt-1 text-[11px] text-white/70">Booked: {day.bookedOne} × 1BHK · {day.bookedTwo} × 2BHK</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          className="w-full max-w-md rounded-md bg-slate-900/80 px-3 py-2 text-sm text-white"
          placeholder="Search by guest, email, or booking ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-full max-w-xs rounded-md bg-slate-900/80 px-3 py-2 text-sm text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      {loading ? <div>Loading...</div> : null}
      {error ? <div className="text-red-300">{error}</div> : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-2 py-2">ID</th>
              <th className="px-2 py-2">Guest</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Check-in</th>
              <th className="px-2 py-2">Check-out</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <Fragment key={b.bookingId}>
              <tr className="border-b border-white/10">
                <td className="px-2 py-2">{b.bookingId.slice(0, 8)}</td>
                <td className="px-2 py-2">{b.guest.fullName}</td>
                <td className="px-2 py-2">{b.guest.email}</td>
                <td className="px-2 py-2">{b.status}</td>
                <td className="px-2 py-2">{b.checkIn}</td>
                <td className="px-2 py-2">{b.checkOut || "-"}</td>
                <td className="px-2 py-2 flex gap-2">
                  <button
                    className="rounded bg-emerald-600 px-2 py-1 text-xs text-white disabled:opacity-50"
                    disabled={updating === b.bookingId}
                    onClick={() => handleStatus(b.bookingId, "confirmed")}
                  >
                    Confirm
                  </button>
                  <button
                    className="rounded bg-amber-600 px-2 py-1 text-xs text-white disabled:opacity-50"
                    disabled={updating === b.bookingId}
                    onClick={() => handleStatus(b.bookingId, "cancelled")}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded bg-red-600 px-2 py-1 text-xs text-white disabled:opacity-50"
                    disabled={deleting === b.bookingId}
                    onClick={() => handleDelete(b.bookingId)}
                  >
                    Delete
                  </button>
                  <button
                    className="rounded bg-white/15 px-2 py-1 text-xs text-white disabled:opacity-50"
                    disabled={aiLoadingId === b.bookingId}
                    onClick={() => draftReply(b)}
                  >
                    {aiLoadingId === b.bookingId ? "AI..." : "AI reply"}
                  </button>
                  <button
                    className="rounded bg-white/10 px-2 py-1 text-xs text-white disabled:opacity-50"
                    disabled={!aiDrafts[b.bookingId]}
                    onClick={() => copyDraft(b.bookingId)}
                  >
                    Copy
                  </button>
                </td>
              </tr>
              {aiDrafts[b.bookingId] ? (
                <tr className="border-b border-white/10">
                  <td colSpan={7} className="px-2 pb-4">
                    <div className="mt-2 rounded-xl border border-white/10 bg-slate-950/70 p-3 text-xs text-slate-100">
                      <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">AI reply + upsell</p>
                      <pre className="whitespace-pre-wrap text-slate-100">{aiDrafts[b.bookingId]}</pre>
                    </div>
                  </td>
                </tr>
              ) : null}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
