import { motion } from "framer-motion";
import { FiMail, FiPhone } from "react-icons/fi";

export default function ConciergeSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-900/50 border-t border-white/[0.06]">
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-10 xs:py-12 sm:py-16 lg:py-20">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body text-sm font-medium uppercase tracking-[0.25em] text-brand-300/90">
            Bookings now open
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.15] tracking-tight">
            Ready to script your Meghalaya altitude story?
          </h2>
          <p className="mt-4 text-slate-400 text-lg leading-relaxed">
            Share your travel rhythm and our concierge will orchestrate
            residences, itineraries, and on-demand services within 24 hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:jnapartments2025@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 font-body text-sm font-medium text-white hover:bg-white/10 hover:border-brand-400/50 transition-colors"
            >
              <FiMail className="w-4 h-4 text-brand-400" />
              Email Concierge
            </a>
            <a
              href="tel:+919874563210"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 font-body text-sm font-medium text-white hover:bg-white/10 hover:border-brand-400/50 transition-colors"
            >
              <FiPhone className="w-4 h-4 text-brand-400" />
              Call +91 9874 563 210
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
