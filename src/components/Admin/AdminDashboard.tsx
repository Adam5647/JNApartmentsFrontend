import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllBookings } from "../../lib/adminBookings";
import { getAllUsers } from "../../lib/adminUsers";
import MTBookingsWidget from "./MTBookingsWidget";
import type { BookingResponse } from "../../types/api";

type Stats = {
  totalBookings: number;
  active: number;
  cancelled: number;
  users: number;
};

const quickLinks = [
  { label: "Manage bookings", to: "/admin/bookings" },
  { label: "Guest inquiries", to: "/admin/inquiries" },
  { label: "User management", to: "/admin/admins" },
  { label: "AI Logic console", to: "https://console.firebase.google.com/ai" }
];

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [users, setUsers] = useState<{ fullName: string; email: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [b, u] = await Promise.all([getAllBookings(), getAllUsers()]);
      setBookings(b);
      setUsers(u);
      setLoading(false);
    };
    load();
  }, []);

  const stats: Stats = useMemo(() => {
    const totalBookings = bookings.length;
    const cancelled = bookings.filter((b) => b.status.toLowerCase() === "cancelled").length;
    const active = totalBookings - cancelled;
    return {
      totalBookings,
      active,
      cancelled,
      users: users.length
    };
  }, [bookings, users]);

  const [aiInput, setAiInput] = useState({
    name: "",
    checkIn: "",
    checkOut: "",
    residence: "",
    notes: ""
  });

  const aiSuggestion = useMemo(() => {
    const { name, checkIn, checkOut, residence, notes } = aiInput;
    return (
      `Hi ${name || "Guest"},\n\n` +
      `We have penciled in your stay${residence ? ` at ${residence}` : ""} ` +
      `${checkIn ? `from ${checkIn}` : ""}${checkOut ? ` to ${checkOut}` : ""}.\n` +
      `Our concierge will confirm availability, arrange transfers, and share a payment link.\n` +
      `${notes ? `Notes: ${notes}\n` : ""}` +
      `Reply with flight details or preferences, and we'll finalize your itinerary.\n\n` +
      `Warm regards,\nJN Apartments Concierge`
    );
  }, [aiInput]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(aiSuggestion);
    } catch (err) {
      // ignore clipboard errors
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 text-white">
      {/* Meghalaya Tourism Real-Time Bookings Widget */}
      <MTBookingsWidget />

      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <h2 className="font-display text-xl sm:text-2xl">Dashboard</h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300/70">Operations overview and quick actions.</p>
        {loading ? (
          <p className="mt-4 text-xs sm:text-sm text-slate-200">Loading stats...</p>
        ) : (
          <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
            <StatCard label="Total bookings" value={stats.totalBookings} />
            <StatCard label="Active" value={stats.active} />
            <StatCard label="Cancelled" value={stats.cancelled} />
            <StatCard label="Users" value={stats.users} />
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 px-4 sm:px-6 md:px-8 py-5 sm:py-6">
          <h3 className="font-display text-lg sm:text-xl">Quick links</h3>
          <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
            {quickLinks.map((link) => (
              <li key={link.label}>
                {link.to.startsWith("http") ? (
                  <a href={link.to} target="_blank" rel="noreferrer" className="text-brand-200 hover:text-brand-100 touch-manipulation inline-block py-1">
                    {link.label}
                  </a>
                ) : (
                  <NavLink to={link.to} className="text-brand-200 hover:text-brand-100 touch-manipulation inline-block py-1">
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 px-4 sm:px-6 md:px-8 py-5 sm:py-6">
          <h3 className="font-display text-lg sm:text-xl">Quick AI itinerary draft</h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-300/80">Lightweight template to reply with itinerary details.</p>
          <div className="mt-3 sm:mt-4 grid gap-2.5 sm:gap-3">
            <input
              className="rounded-md bg-slate-900/80 px-3 py-2.5 sm:py-2 text-xs sm:text-sm text-white touch-manipulation"
              placeholder="Guest name"
              value={aiInput.name}
              onChange={(e) => setAiInput((p) => ({ ...p, name: e.target.value }))}
            />
            <div className="grid gap-2.5 sm:gap-3 md:grid-cols-2">
              <input
                className="rounded-md bg-slate-900/80 px-3 py-2.5 sm:py-2 text-xs sm:text-sm text-white touch-manipulation"
                placeholder="Check-in (YYYY-MM-DD)"
                value={aiInput.checkIn}
                onChange={(e) => setAiInput((p) => ({ ...p, checkIn: e.target.value }))}
              />
              <input
                className="rounded-md bg-slate-900/80 px-3 py-2.5 sm:py-2 text-xs sm:text-sm text-white touch-manipulation"
                placeholder="Check-out (YYYY-MM-DD)"
                value={aiInput.checkOut}
                onChange={(e) => setAiInput((p) => ({ ...p, checkOut: e.target.value }))}
              />
            </div>
            <input
              className="rounded-md bg-slate-900/80 px-3 py-2.5 sm:py-2 text-xs sm:text-sm text-white touch-manipulation"
              placeholder="Residence / room type"
              value={aiInput.residence}
              onChange={(e) => setAiInput((p) => ({ ...p, residence: e.target.value }))}
            />
            <textarea
              className="rounded-md bg-slate-900/80 px-3 py-2.5 sm:py-2 text-xs sm:text-sm text-white touch-manipulation"
              rows={3}
              placeholder="Notes (transfers, meals, add-ons)"
              value={aiInput.notes}
              onChange={(e) => setAiInput((p) => ({ ...p, notes: e.target.value }))}
            />
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] sm:text-xs text-slate-400">Preview</p>
              <button
                className="rounded-full bg-brand-500 px-4 py-2.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white hover:bg-brand-400 touch-manipulation"
                onClick={copyText}
              >
                Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap rounded-lg border border-white/10 bg-slate-900/60 p-3 text-[10px] sm:text-xs text-slate-100">
{aiSuggestion}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-slate-900/50 px-3 sm:px-4 py-3 sm:py-4">
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.25em] text-slate-400">{label}</p>
      <p className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
