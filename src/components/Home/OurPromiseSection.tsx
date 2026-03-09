import { motion } from "framer-motion";
import { FiHeart, FiUsers, FiGift, FiShield } from "react-icons/fi";

const REASONS = [
  {
    icon: FiHeart,
    title: "Crafted with Love",
    description:
      "Every detail, from room design to guest care, is thoughtfully curated with genuine warmth and compassion for your comfort.",
    color: "from-brand-400/20 to-transparent",
  },
  {
    icon: FiUsers,
    title: "Personal Warmth",
    description:
      "Our team treats every guest like family. We remember preferences, celebrate moments, and go the extra mile with authentic care.",
    color: "from-brand-300/20 to-transparent",
  },
  {
    icon: FiGift,
    title: "Thoughtful Touches",
    description:
      "Beyond basics—welcome gifts, local recommendations, surprise amenities. Every stay becomes a memorable experience of care.",
    color: "from-brand-400/20 to-transparent",
  },
  {
    icon: FiShield,
    title: "Trusted by Guests",
    description:
      "Built on genuine relationships and repeat visitors who feel the difference. Your safety and happiness are our true priority.",
    color: "from-brand-500/20 to-transparent",
  },
];

export default function OurPromiseSection() {
  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-slate-900/50 border-t border-white/[0.06]"
    >
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Floating orbs */}
          <div className="absolute top-32 -left-40 h-80 w-80 rounded-full bg-brand-500/5 blur-3xl" aria-hidden />
          <div className="absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-brand-400/5 blur-3xl" aria-hidden />

          {/* Header - centered like git */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-semibold uppercase tracking-widest mb-6 font-body">
                Our Promise
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight"
            >
              Why Guests Love
              <span className="block pb-2 bg-gradient-to-r from-brand-400 via-brand-300 to-brand-200 bg-clip-text text-transparent">
                Staying with Us
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-slate-300/90 text-lg leading-relaxed font-body"
            >
              At JN Apartments, we don&apos;t just provide accommodation—we create
              home-like experiences fueled by genuine compassion and dedication
              to your well-being.
            </motion.p>
          </div>

          {/* Reasons Grid - 2x2 like git */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 relative">
            {REASONS.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-3xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50" />
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${reason.color}`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 backdrop-blur-sm" aria-hidden />

                  <div className="relative p-6 md:p-8 lg:p-10 h-full flex flex-col">
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      <Icon className="w-8 h-8 text-brand-400 group-hover:text-brand-300 transition-colors duration-300" />
                    </motion.div>

                    <h3 className="font-display text-2xl md:text-3xl text-white mb-4 group-hover:text-brand-300 transition-colors duration-300">
                      {reason.title}
                    </h3>

                    <p className="text-slate-300/90 leading-relaxed group-hover:text-slate-200 transition-colors duration-300 flex-grow font-body">
                      {reason.description}
                    </p>

                    <motion.div
                      className="mt-6 h-1 rounded-full bg-gradient-to-r from-brand-400 via-brand-300 to-transparent"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "60%" }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Bottom testimonial block - icon instead of emoji */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-10 relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-r from-slate-800/50 via-slate-800/30 to-slate-800/50 backdrop-blur-md p-6 md:p-10 lg:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 via-transparent to-brand-400/5" aria-hidden />

            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <FiHeart className="w-10 h-10 text-brand-400" strokeWidth={1.5} />
              </motion.div>

              <motion.blockquote
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl text-white font-display mb-6 leading-relaxed"
              >
                &ldquo;It&apos;s not just a place to stay—it&apos;s like coming home
                to people who genuinely care about your experience.&rdquo;
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-500" />
                <div>
                  <p className="text-white font-semibold font-body">Guest Review</p>
                  <p className="text-slate-400 text-sm font-body">Verified Stay · 5★ Rating</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative"
          >
            {[
              { label: "Years of Care", value: "10+" },
              { label: "Happy Guests", value: "5K+" },
              { label: "Repeat Visitors", value: "60%" },
              { label: "Star Rating", value: "4.9" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-brand-400/30 transition-all duration-300 text-center group"
              >
                <h4 className="text-3xl md:text-4xl font-display text-brand-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </h4>
                <p className="text-slate-400 text-sm uppercase tracking-wider font-body">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
