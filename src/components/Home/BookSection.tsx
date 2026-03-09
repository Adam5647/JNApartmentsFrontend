import { motion } from "framer-motion";
import MtbButton from "./MtbButton";

const BULLETS = [
  "Eight convertible suites: 1BHK (₹3,000/night) or 2BHK (₹4,500/night)",
  "Secure payment processing through Meghalaya Tourism",
  "Instant confirmation and 24/7 support",
  "On-site parking and responsive housekeeping",
] as const;

export default function BookSection() {
  return (
    <section
      id="book"
      className="relative w-full overflow-hidden bg-slate-950 border-t border-white/[0.06]"
    >
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-14 sm:py-16 lg:py-20">
        <motion.div
          className="rounded-2xl sm:rounded-3xl md:rounded-[3rem] border border-white/10 bg-slate-950/80 p-5 sm:p-6 md:p-8 lg:p-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs text-brand-300/80 font-body">
            Reserve your stay
          </p>
          <h2 className="mt-2 sm:mt-3 font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
            Book on Meghalaya Tourism
          </h2>
          <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-slate-300/90 leading-relaxed max-w-2xl mx-auto px-2 sm:px-0 font-body">
            All bookings are managed through Meghalaya Tourism&apos;s secure
            platform. Check availability, view real-time pricing, and complete
            your reservation with confidence.
          </p>
          <ul className="mt-4 sm:mt-5 md:mt-6 space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-300/80 text-left max-w-xl mx-auto font-body">
            {BULLETS.map((text, i) => (
              <motion.li
                key={text}
                className="flex items-start gap-2.5 sm:gap-3"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 sm:mt-2 flex-shrink-0" />
                <span>{text}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 sm:mt-8 flex justify-center px-4 sm:px-0">
            <MtbButton slug="693abf6c2f91fcdb61d3f676" />
          </div>
          <p className="mt-4 sm:mt-5 md:mt-6 text-[10px] sm:text-xs text-slate-400 px-4 sm:px-0 font-body">
            Questions? Contact us at{" "}
            <a
              href="mailto:jnapartments2025@gmail.com"
              className="text-brand-400 hover:text-brand-300 underline touch-manipulation inline-block"
            >
              jnapartments2025@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
