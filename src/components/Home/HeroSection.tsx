import { motion } from "framer-motion";

import MtbButton from "./MtbButton";

/** Hero image from public: public/assets/images/JN Apartments/1.JPG. See docs/IMAGES.md. */
const HERO_IMAGE = "/assets/images/JN%20Apartments/1.JPG";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden
      />
      {/* Overlay for readability – lighter so hero image stays visible */}
      <div
        className="absolute inset-0 bg-slate-950/40 bg-gradient-to-br from-slate-950/60 via-slate-900/35 to-slate-900/20"
        aria-hidden
      />

      {/* Accent line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-brand-400/60 to-transparent hidden lg:block" />

      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-12 xs:py-14 sm:py-16 lg:py-20">
        <div className="max-w-4xl">
          <motion.h1
            className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-[1.05] tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            JN Apartments
          </motion.h1>
          <motion.p
            className="mt-3 xs:mt-4 font-body text-brand-200 text-lg xs:text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.15em] xs:tracking-[0.2em]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Deluxe Serviced Stays in Shillong
          </motion.p>
          <motion.p
            className="mt-4 xs:mt-6 text-slate-200 text-base xs:text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Experience comfort and convenience with our 1BHK and 2BHK serviced
            apartments. Eight premium suites with modern amenities, on-site
            parking, and exceptional service.
          </motion.p>
          <motion.div
            className="mt-8 xs:mt-10 flex flex-wrap items-center gap-4 xs:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Official Meghalaya Tourism button (mtb-button.js loaded in index.html) */}
            <span className="inline-flex items-center">
              <MtbButton slug="693abf6c2f91fcdb61d3f676" />
            </span>
            <a
              href="#suites"
              className="min-touch inline-flex items-center gap-2.5 font-body text-base xs:text-lg sm:text-xl font-semibold text-white/95 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-slate-950 group py-3 xs:py-2"
            >
              View Suites
              <span className="text-lg xs:text-xl sm:text-2xl transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
            </a>
          </motion.div>

          {/* Info cards */}
          <motion.div
            className="mt-8 xs:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm px-4 xs:px-5 py-3.5 xs:py-4 sm:px-6 sm:py-5">
              <p className="font-body text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-400">
                Convertible suites
              </p>
              <p className="mt-1.5 font-body text-lg sm:text-xl font-semibold text-white">
                8 <span className="font-normal text-slate-300">(1BHK / 2BHK)</span>
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm px-4 xs:px-5 py-3.5 xs:py-4 sm:px-6 sm:py-5">
              <p className="font-body text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-400">
                Nightly rates
              </p>
              <p className="mt-1.5 font-body text-lg sm:text-xl font-semibold text-white">
                ₹3,000 <span className="text-slate-400 font-normal">·</span> ₹4,500
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm px-4 xs:px-5 py-3.5 xs:py-4 sm:px-6 sm:py-5">
              <p className="font-body text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-400">
                Parking
              </p>
              <p className="mt-1.5 font-body text-lg sm:text-xl font-semibold text-white">
                On-site gated
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none"
        aria-hidden
      />
    </section>
  );
}
