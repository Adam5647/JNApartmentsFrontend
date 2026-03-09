import { motion } from "framer-motion";
import { FiUsers, FiMapPin, FiDollarSign, FiCalendar } from "react-icons/fi";
import { communityHighlights, communityImage } from "../../data/content";

export default function CommunitySection() {
  return (
    <section
      id="community"
      className="relative w-full overflow-hidden bg-slate-950 border-t border-white/[0.06]"
    >
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto grid gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left: header + highlight cards (git style) */}
          <div>
            <motion.p
              className="font-body text-sm font-medium uppercase tracking-[0.25em] text-brand-300/90"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              Community
            </motion.p>
            <motion.h2
              className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.15] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Culture-forward programming for explorers and creators
            </motion.h2>
            <motion.p
              className="mt-4 text-slate-400 text-lg leading-relaxed max-w-xl font-body"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              JN Apartments blurs the line between hospitality, creative
              residency, and responsible travel.
            </motion.p>

            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 md:space-y-5">
              {communityHighlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group rounded-xl sm:rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-8 hover:border-brand-400/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-brand-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-400/20 transition-colors">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-brand-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-base sm:text-lg md:text-xl text-white group-hover:text-brand-300 transition-colors">
                        {highlight.title}
                      </h3>
                      <p className="mt-1.5 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base text-slate-300/90 leading-relaxed font-body">
                        {highlight.copy}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: image with overlapping Signature programming card (git layout) */}
          <div className="relative mt-6 sm:mt-8 lg:mt-0">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[3rem] border border-white/10">
              <img
                src={communityImage}
                alt="Hotel guests enjoying communal spaces"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 left-1/2 w-[calc(100%-1rem)] sm:w-full max-w-md -translate-x-1/2 rounded-2xl sm:rounded-3xl border border-brand-400/30 bg-slate-950/95 p-4 sm:p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <FiCalendar className="w-5 h-5 text-brand-400" strokeWidth={2} />
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-brand-300/70 font-body">
                  Signature programming
                </p>
              </div>
              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-body">
                Weekly living-root bridge walks, mindful tea ceremonies, mountain
                astronomy nights, and regenerative design workshops.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
