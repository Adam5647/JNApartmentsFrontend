import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/bookings", label: "Bookings" },
  { to: "/admin/inquiries", label: "Inquiries" },
  { to: "/admin/reviews", label: "Reviews" },
  { to: "/admin/apartments", label: "Residences" },
  { to: "/admin/maintenance", label: "Maintenance" },
  { to: "/admin/admins", label: "Team" }
];

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className="hidden w-56 xl:w-64 flex-col border-r border-white/10 bg-slate-900/60 px-4 xl:px-5 py-6 lg:flex">
        <NavLink to="/" className="font-display text-lg xl:text-xl text-white hover:text-brand-200">
          JN Apartments
        </NavLink>
        <p className="mt-1 text-[10px] xl:text-xs uppercase tracking-[0.25em] xl:tracking-[0.3em] text-slate-400">Admin</p>
        <nav className="mt-6 space-y-1 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block rounded-xl px-3 py-2.5 transition touch-manipulation ${
                  isActive ? "bg-brand-500/20 text-brand-100" : "text-slate-200 hover:bg-white/5"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-slate-300 hover:text-white touch-manipulation"
                >
                  {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>
              </div>
              <NavLink to="/admin" className="font-display text-base sm:text-lg text-white lg:hidden">Admin</NavLink>
              <p className="hidden sm:block text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400">Control room</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300">
              <span className="hidden sm:inline rounded-full bg-white/5 px-3 py-1">Concierge</span>
              <NavLink to="/" className="rounded-full bg-brand-500/20 px-3 py-1.5 sm:py-1 text-brand-100 hover:bg-brand-500/30 touch-manipulation">
                View site
              </NavLink>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[57px] sm:top-[65px] bg-slate-950/95 backdrop-blur-xl z-50">
            <nav className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3.5 transition touch-manipulation ${
                      isActive ? "bg-brand-500/20 text-brand-100" : "text-slate-200 hover:bg-white/5"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
