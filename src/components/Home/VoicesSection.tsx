import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { testimonials } from "../../data/content";

export default function VoicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section
      id="voices"
      className="relative w-full overflow-hidden bg-slate-900/50 border-t border-white/[0.06]"
    >
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Background orbs */}
          <div className="absolute top-0 -right-40 h-96 w-96 rounded-full bg-brand-500/5 blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-brand-400/5 blur-3xl" aria-hidden />

          {/* Header - centered like git */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest mb-4 sm:mb-6 font-body">
                Voices
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-3 sm:mb-4 leading-tight"
            >
              Stories from
              <span className="block bg-gradient-to-r from-brand-400 via-brand-300 to-brand-200 bg-clip-text text-transparent">
                our guests
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-slate-300/90 text-sm sm:text-base md:text-lg leading-relaxed px-4 font-body"
            >
              Hear from founders, filmmakers, and travelers who made JN Apartments
              their basecamp in the clouds.
            </motion.p>
          </div>

          {/* Two-column: featured quote + list */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-center"
            >
              {/* Left - Featured quote card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-400/5" aria-hidden />

                  <motion.div
                    className="absolute top-3 sm:top-4 left-3 sm:left-4 md:left-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl opacity-10 text-brand-400 font-display"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    &ldquo;
                  </motion.div>

                  <div className="relative">
                    <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <FiStar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
                        </motion.div>
                      ))}
                    </div>

                    <motion.p
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-lg sm:text-2xl md:text-3xl text-white leading-relaxed mb-4 sm:mb-6 font-light font-body"
                    >
                      &ldquo;{current.quote}&rdquo;
                    </motion.p>

                    <motion.div
                      key={`author-${activeIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="border-t border-slate-700/50 pt-4 sm:pt-6"
                    >
                      <h4 className="font-display text-lg sm:text-xl md:text-2xl text-white mb-1">
                        {current.guestName}
                      </h4>
                      <p className="text-brand-400 font-semibold uppercase tracking-wider text-xs sm:text-sm font-body">
                        {current.role}
                      </p>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 bg-slate-800/50 rounded-full h-1 overflow-hidden border border-slate-700/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-400 to-brand-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>

              {/* Right - List of testimonials */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-2 sm:gap-3"
              >
                {testimonials.map((testimonial, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className={`text-left p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 group ${
                      activeIndex === index
                        ? "bg-slate-800/70 border-brand-400/50 shadow-lg shadow-brand-500/20"
                        : "bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex gap-0.5 sm:gap-1">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${
                              activeIndex === index ? "text-amber-400 fill-amber-400" : "text-slate-600"
                            }`}
                          />
                        ))}
                      </div>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-brand-400"
                        />
                      )}
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2 transition-colors font-body ${
                        activeIndex === index ? "text-slate-100" : "text-slate-400 group-hover:text-slate-300"
                      }`}
                    >
                      {testimonial.quote}
                    </p>
                    <div
                      className={`transition-colors ${
                        activeIndex === index ? "text-brand-400" : "text-slate-500"
                      }`}
                    >
                      <p className="font-semibold text-xs sm:text-sm font-body">{testimonial.name}</p>
                      <p className="text-[10px] sm:text-xs opacity-75 font-body">{testimonial.role}</p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4"
            >
              <motion.button
                type="button"
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 sm:p-3 rounded-full border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 hover:border-brand-400/30 text-slate-300 hover:text-brand-400 transition-colors"
                aria-label="Previous testimonial"
              >
                <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              <div className="flex gap-1 sm:gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-full transition-all ${
                      activeIndex === index ? "bg-brand-400 w-6 sm:w-8 h-2" : "bg-slate-700/50 w-2 h-2 hover:bg-slate-600"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                type="button"
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 sm:p-3 rounded-full border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 hover:border-brand-400/30 text-slate-300 hover:text-brand-400 transition-colors"
                aria-label="Next testimonial"
              >
                <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
