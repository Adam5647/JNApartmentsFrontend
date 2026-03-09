import { useEffect, useState } from "react";
import { FiRefreshCw, FiTrendingUp, FiCalendar, FiAlertTriangle } from "react-icons/fi";
import { motion } from "framer-motion";
import { fetchMTBookings, fetchMTCurrentAvailability, subscribeToMTBookings, MTBooking, MTRoom } from "../../lib/mtBookings";

export default function MTBookingsWidget() {
  const [bookings, setBookings] = useState<MTBooking[]>([]);
  const [rooms, setRooms] = useState<MTRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isLiveData, setIsLiveData] = useState(false);

  useEffect(() => {
    loadData();

    // Subscribe to real-time updates if auto-refresh is enabled
    if (autoRefresh) {
      const unsubscribe = subscribeToMTBookings((updatedBookings) => {
        setBookings(updatedBookings);
        setLastUpdated(new Date());
      }, 30000); // Update every 30 seconds

      return () => unsubscribe();
    }
  }, [autoRefresh]);

  const loadData = async () => {
    setLoading(true);
    try {
      const mtRooms = await fetchMTCurrentAvailability();
      
      // Check if we got real MT data or defaults
      // Real MT data would typically have more varied pricing/availability
      const hasRealData = mtRooms && mtRooms.length > 0;
      setIsLiveData(hasRealData && !mtRooms.every(r => r.price === 3000 || r.price === 4500)); // Check if it's not just defaults
      
      setRooms(mtRooms || []);

      const mtBookings = await fetchMTBookings();
      setBookings(mtBookings || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading MT data:", error);
      setIsLiveData(false);
      // Set defaults on error
      setRooms([
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  const upcomingBookings = bookings
    .filter((b) => b.status !== "cancelled")
    .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime())
    .slice(0, 5);

  const totalRevenue = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.price, 0);

  const occupancyRate = rooms.length > 0
    ? Math.round(
        ((bookings.filter((b) => b.status !== "cancelled").length / 
          rooms.reduce((sum, r) => sum + r.totalRooms, 0)) *
          100)
      )
    : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Meghalaya Tourism Bookings</h2>
          <p className="mt-1 text-[10px] sm:text-xs text-slate-400">
            {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : "Loading..."}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          {/* Data Source Status */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition ${
              isLiveData
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                : "bg-amber-500/20 text-amber-300 border border-amber-500/50"
            }`}
            title={isLiveData ? "Connected to Meghalaya Tourism API" : "Using fallback data - Check console for API errors"}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isLiveData ? "bg-emerald-400" : "bg-amber-400"} animate-pulse`} />
            {isLiveData ? "Live API" : "Fallback"}
          </div>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition touch-manipulation ${
              autoRefresh
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-slate-700/50 text-slate-300 border border-slate-600/50"
            }`}
          >
            {autoRefresh ? "🟢 Live" : "⚪ Manual"}
          </button>
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2.5 sm:p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-white/20 disabled:opacity-50 transition touch-manipulation"
          >
            <FiRefreshCw className={`w-5 h-5 sm:w-4 sm:h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Total Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-white/10 bg-white/5 p-4"
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-slate-400">Active Bookings</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-white">
            {bookings.filter((b) => b.status !== "cancelled").length}
          </p>
          <p className="mt-1 text-[10px] sm:text-xs text-slate-400">
            {bookings.filter((b) => b.status === "confirmed").length} confirmed
          </p>
        </motion.div>

        {/* Occupancy Rate */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-lg border border-white/10 bg-white/5 p-4"
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-slate-400">Occupancy</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-brand-400">{occupancyRate}%</p>
          <div className="mt-2.5 sm:mt-3 h-2 rounded-full bg-slate-700/50 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-400 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${occupancyRate}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg border border-white/10 bg-white/5 p-4"
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-slate-400">Revenue (Confirmed)</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-green-400">₹{totalRevenue.toLocaleString()}</p>
          <p className="mt-1 text-[10px] sm:text-xs text-slate-400">
            {bookings.filter((b) => b.status === "confirmed").length} bookings
          </p>
        </motion.div>
      </div>

      {/* Room Availability */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <FiCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />
          Room Availability
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-lg border p-3 sm:p-4 transition ${
                room.available
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-red-500/30 bg-red-500/5"
              }`}
            >
              <p className="font-semibold text-white text-sm">{room.name}</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {room.availableRooms}/{room.totalRooms}
              </p>
              <p className="mt-1 text-xs text-slate-400">Available rooms</p>
              <p className="mt-2 text-sm text-emerald-400 font-semibold">₹{room.price}/night</p>
              <div className="mt-3 h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                <motion.div
                  className={`h-full ${
                    room.available ? "bg-emerald-400" : "bg-red-400"
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(room.availableRooms / room.totalRooms) * 100}%`
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FiTrendingUp className="w-5 h-5 text-brand-400" />
          Next 5 Bookings
        </h3>

        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-slate-400 text-sm">Loading bookings...</p>
          </div>
        ) : upcomingBookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400">No upcoming bookings</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:border-slate-600/50 transition"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">
                    {booking.guestName}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {booking.roomType} • {booking.nights} nights
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(booking.checkIn).toLocaleDateString()} →{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-4 text-right flex-shrink-0">
                  <p className="font-bold text-emerald-400">₹{booking.price}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold ${
                      booking.status === "confirmed"
                        ? "bg-green-500/20 text-green-400"
                        : booking.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
