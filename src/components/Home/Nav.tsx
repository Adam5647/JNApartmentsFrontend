import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Suites", to: "/suites" },
  { label: "Gallery", to: "/gallery" },
  { label: "Services", to: "/services" },
  { label: "Testimonials", to: "/testimonials" },
] as const;

export default function Nav() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const showSolidNav = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-950/95 shadow-lg shadow-black/10 ${!showSolidNav ? "lg:bg-transparent lg:shadow-none" : ""}`}
    >
      <nav
        className="mx-auto flex w-full max-w-[100rem] items-center justify-between gap-4 xs:gap-6 px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 h-16 xs:h-20"
        aria-label="Main"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 py-2 -ml-1 rounded focus:outline-none transition opacity-90 hover:opacity-100"
        >
          {!logoError ? (
            <img
              src="/assets/images/logo.png"
              alt="JN Apartments"
              className="h-14 w-auto object-contain sm:h-16"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="font-display text-xl font-semibold text-white sm:text-2xl">JN Apartments</span>
          )}
        </Link>

        {/* Center links - desktop */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex lg:items-center lg:gap-0">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative px-5 py-2.5 font-body text-base font-medium tracking-wide transition-colors focus:outline-none focus:text-white rounded ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-brand-400" aria-hidden />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Book Now - desktop */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            to="/bookings"
            className="inline-flex items-center font-body text-base font-semibold text-white hover:text-brand-300 transition-colors focus:outline-none rounded py-3 px-5 border border-white/20 hover:border-brand-400/50 bg-white/5 hover:bg-white/10"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex min-touch h-12 w-12 xs:h-11 xs:w-11 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition lg:hidden focus:outline-none touch-manipulation"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`border-t border-white/[0.06] bg-slate-950/98 lg:hidden transition-all duration-200 ${
          mobileOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
        role="region"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 xs:px-5 sm:px-6 py-4 xs:py-5 flex flex-col gap-0.5">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`min-touch flex items-center py-4 font-body text-base font-medium transition-colors border-b border-white/[0.06] last:border-0 focus:outline-none touch-manipulation ${
                  isActive ? "text-white" : "text-slate-300 hover:text-white"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
                {isActive && <span className="ml-2 text-brand-400" aria-hidden>●</span>}
              </Link>
            );
          })}
          <div className="flex flex-col gap-2 pt-4 xs:pt-6 mt-2 border-t border-white/[0.08]">
            <Link
              to="/bookings"
              className="min-touch inline-flex items-center justify-center py-4 font-body text-base font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors focus:outline-none touch-manipulation"
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
