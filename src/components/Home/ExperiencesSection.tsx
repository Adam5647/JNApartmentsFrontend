import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX as _FiX, FiHeadphones as _FiHeadphones, FiMap as _FiMap, FiAward as _FiAward } from "react-icons/fi";
import { experiences } from "../../data/content";

// react-icons v5 doesn't expose className through JSX prop types — cast to fix
type IconProps = { className?: string; strokeWidth?: number };
const FiX = _FiX as unknown as (props: IconProps) => JSX.Element;
const FiHeadphones = _FiHeadphones as unknown as (props: IconProps) => JSX.Element;
const FiMap = _FiMap as unknown as (props: IconProps) => JSX.Element;
const FiAward = _FiAward as unknown as (props: IconProps) => JSX.Element;

type Experience = (typeof experiences)[number];

export default function ExperiencesSection() {
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  return (
    <>
      <section
        id="services"
        className="relative w-full overflow-hidden bg-slate-950 border-t border-white/[0.06]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" aria-hidden />

        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-10 xs:py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            {/* Floating orbs */}
            <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-brand-500/5 blur-3xl" aria-hidden />
            <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-brand-400/5 blur-3xl" aria-hidden />

            {/* Intro - centered like git */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest mb-4 sm:mb-6">
                  Experiences
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 sm:mb-6 leading-tight"
              >
                Crafted for
                <span className="block bg-gradient-to-r from-brand-400 via-brand-300 to-brand-200 bg-clip-text text-transparent">
                  comfort & convenience
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-slate-300/90 text-sm sm:text-base md:text-lg leading-relaxed px-4 sm:px-0 font-body"
              >
                Thoughtfully designed amenities that transform your stay into an
                unforgettable experience.
              </motion.p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5 relative">
              {/* Card 1 - Large Featured (Warm lobby) */}
              <motion.article
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                onClick={() => setSelectedExperience(experiences[0])}
                className="group md:col-span-7 md:row-span-2 relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer touch-manipulation"
              >
                <div className="absolute inset-0">
                  <img
                    src={experiences[0].image}
                    alt={experiences[0].title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="relative h-full min-h-[280px] sm:min-h-[340px] md:min-h-[420px] flex flex-col justify-end p-5 sm:p-6 md:p-8 lg:p-10">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-500/20 backdrop-blur-md border border-brand-400/30 mb-2 sm:mb-3 md:mb-4">
                      <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                      <span className="text-brand-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-2 sm:mb-3 md:mb-4 group-hover:text-brand-300 transition-colors duration-500">
                      {experiences[0].title}
                    </h3>
                    <p className="text-slate-200 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5 md:mb-6 max-w-2xl">
                      {experiences[0].description}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3 text-brand-400 group-hover:gap-4 sm:group-hover:gap-5 transition-all duration-300">
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest">
                        Discover more
                      </span>
                      <motion.svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </motion.svg>
                    </div>
                  </motion.div>
                </div>
              </motion.article>

              {/* Card 2 - Cozy living */}
              <motion.article
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedExperience(experiences[1])}
                className="group md:col-span-5 relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm hover:border-brand-400/50 transition-all duration-500 touch-manipulation"
              >
                <div className="relative h-full min-h-[200px] sm:min-h-[240px]">
                  <div className="absolute inset-0">
                    <img
                      src={experiences[1].image}
                      alt={experiences[1].title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-transparent" />
                  </div>
                  <div className="relative h-full flex flex-col justify-between p-4 sm:p-5 md:p-6">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-2xl bg-brand-500/10 backdrop-blur-md border border-brand-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-white mb-2 sm:mb-3 group-hover:text-brand-300 transition-colors duration-300">
                        {experiences[1].title}
                      </h3>
                      <p className="text-slate-300/90 text-xs sm:text-sm md:text-base leading-relaxed">
                        {experiences[1].description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>

              {/* Card 3 - Kitchens */}
              <motion.article
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                onClick={() => setSelectedExperience(experiences[2])}
                className="group md:col-span-5 relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm hover:border-brand-400/50 transition-all duration-500 touch-manipulation"
              >
                <div className="relative h-full min-h-[200px] sm:min-h-[240px]">
                  <div className="absolute inset-0">
                    <img
                      src={experiences[2].image}
                      alt={experiences[2].title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-transparent" />
                  </div>
                  <div className="relative h-full flex flex-col justify-between p-4 sm:p-5 md:p-6">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-2xl bg-brand-500/10 backdrop-blur-md border border-brand-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-white mb-2 sm:mb-3 group-hover:text-brand-300 transition-colors duration-300">
                        {experiences[2].title}
                      </h3>
                      <p className="text-slate-300/90 text-xs sm:text-sm md:text-base leading-relaxed">
                        {experiences[2].description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>

              {/* Card 4 - Parking */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                onClick={() => setSelectedExperience(experiences[3])}
                className="group md:col-span-12 relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer touch-manipulation"
              >
                <div className="relative h-full min-h-[220px] sm:min-h-[260px]">
                  <div className="absolute inset-0">
                    <motion.img
                      src={experiences[3].image}
                      alt={experiences[3].title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div className="relative h-full flex items-center p-5 sm:p-6 md:p-8 lg:p-10">
                    <div className="max-w-2xl">
                      <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-brand-500/10 backdrop-blur-md border border-brand-400/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-6 sm:w-7 h-6 sm:h-7 text-brand-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 group-hover:text-brand-300 transition-colors duration-500">
                        {experiences[3].title}
                      </h3>
                      <p className="text-slate-200 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                        {experiences[3].description}
                      </p>
                      <div className="flex items-center gap-2 sm:gap-3 text-brand-400">
                        <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest">
                          View details
                        </span>
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>

            {/* Our Promise pills */}
            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-900/40 px-5 py-2.5">
                <FiHeadphones className="w-4 h-4 text-brand-400 shrink-0" strokeWidth={2} />
                <span className="font-body text-sm font-medium text-slate-300">24/7 Support</span>
              </div>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-900/40 px-5 py-2.5">
                <FiMap className="w-4 h-4 text-brand-400 shrink-0" strokeWidth={2} />
                <span className="font-body text-sm font-medium text-slate-300">Local Expertise</span>
              </div>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-900/40 px-5 py-2.5">
                <FiAward className="w-4 h-4 text-brand-400 shrink-0" strokeWidth={2} />
                <span className="font-body text-sm font-medium text-slate-300">Premium Housekeeping</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience detail modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl"
            >
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-white transition-colors touch-manipulation"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="relative h-48 sm:h-64 md:h-72 lg:h-96 overflow-hidden rounded-t-3xl">
                <img
                  src={selectedExperience.image}
                  alt={selectedExperience.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-2 sm:mb-3"
                  >
                    {selectedExperience.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-300"
                  >
                    {selectedExperience.description}
                  </motion.p>
                </div>
              </div>

              <div className="p-5 sm:p-6 md:p-8 lg:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl sm:text-2xl font-display text-white mb-3 sm:mb-4">
                    About This Experience
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-slate-300/90 leading-relaxed font-body">
                    {selectedExperience.fullDescription}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 sm:mt-8 md:mt-10"
                >
                  <h3 className="text-lg sm:text-xl font-display text-white mb-4 sm:mb-6">
                    Features & Amenities
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {selectedExperience.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 touch-manipulation"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-400/10 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400"
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
                        <span className="text-xs sm:text-sm md:text-base text-slate-200 font-body">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 sm:mt-8 md:mt-10 flex justify-center"
                >
                  <button
                    onClick={() => setSelectedExperience(null)}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold uppercase tracking-wider transition-colors text-xs sm:text-sm md:text-base touch-manipulation font-body"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
