import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUser,
  FiHome,
  FiTruck,
  FiCoffee,
  FiWifi,
  FiTool,
  FiCheck,
  FiArrowRight,
  FiLayers,
  FiMapPin,
  FiClock,
  FiUsers,
  FiDroplet,
  FiShield,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import Nav from "../components/Home/Nav";
import Footer from "../components/Home/Footer";
import {
  services,
  servicesPageExperiences,
  moreReasonsToStay,
  everyMomentPillars,
  serviceJourneySteps,
  whyGuestsLoveUs,
  amenities,
  generalGallery,
} from "../data/content";

const CONTAINER =
  "w-full max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16";

const serviceIconMap: Record<string, IconType> = {
  "front-desk": FiUser,
  housekeeping: FiHome,
  transport: FiTruck,
  dining: FiCoffee,
  wifi: FiWifi,
  maintenance: FiTool,
};

const moreReasonsIconMap: Record<string, IconType> = {
  "24/7 Security": FiShield,
  "Flexible Check-in": FiClock,
  "Prime Location": FiMapPin,
  "Family Friendly": FiUsers,
  "Premium Bedding": FiLayers,
  "Hot Water 24/7": FiDroplet,
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-30px" },
  transition: { duration: 0.4 },
};

const heroStats = [
  { value: "8", label: "Deluxe Suites" },
  { value: "24/7", label: "Front Desk" },
  { value: "100%", label: "Guest Satisfaction" },
  { value: "12+", label: "Parking Spots" },
];

export default function ServicesPage() {
  const heroImage =
    generalGallery.find((p) => p.includes("Reception") || p.includes("Lobby")) ??
    generalGallery[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main className="pt-20">
        {/* Hero */}
        <section
          className="relative flex min-h-0 flex-col justify-center overflow-hidden py-12 md:py-16"
          style={{ height: "min(42vh, 380px)" }}
          aria-label="Services overview"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${heroImage}')` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/60 to-slate-950/75" aria-hidden />
          <div className={`relative z-10 ${CONTAINER} text-center`}>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-white"
            >
              Services &amp; experiences
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-slate-300 text-lg max-w-xl mx-auto"
            >
              From 24/7 reception to housekeeping and transport help—everything
              you need for a comfortable stay in Shillong.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 flex flex-wrap justify-center gap-6 sm:gap-8"
              aria-label="Key highlights"
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-body text-lg font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-slate-400 text-sm font-body">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
            <Link
              to="/"
              className="mt-8 inline-flex font-body text-sm text-slate-400 hover:text-white transition-colors"
            >
              <span aria-hidden>←</span> Back to Home
            </Link>
          </div>
        </section>

        {/* Experiences (detailed service highlights) */}
        <section
          className="py-10 md:py-14 border-t border-white/10 bg-slate-900/20"
          aria-labelledby="experiences-heading"
        >
          <div className={CONTAINER}>
            <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-8">
              <h2
                id="experiences-heading"
                className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-2"
              >
                Experiences that define your stay
              </h2>
              <p className="text-slate-400 text-base md:text-lg">
                Thoughtful touches and facilities designed for comfort and
                convenience.
              </p>
            </motion.div>
            <div className="space-y-10 md:space-y-12">
              {servicesPageExperiences.map((exp, idx) => (
                <motion.article
                  key={exp.title}
                  {...fadeUp}
                  transition={{ delay: idx * 0.08 }}
                  className={`flex flex-col gap-6 md:gap-8 ${
                    idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                  } md:items-start`}
                >
                  <div className="md:w-5/12 shrink-0">
                    <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
                      <img
                        src={exp.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-7/12 pt-0">
                    <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white">
                      {exp.title}
                    </h3>
                    <p className="mt-3 text-slate-300 text-base md:text-lg leading-relaxed">
                      {exp.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {exp.features.map((f) => (
                        <li
                          key={f}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-slate-300 text-base md:text-lg"
                        >
                          <FiCheck className="h-4 w-4 text-brand-400 shrink-0" aria-hidden />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* What we offer (services grid) */}
        <section className="py-10 md:py-14 border-t border-white/10" aria-labelledby="services-heading">
          <div className={CONTAINER}>
            <motion.h2
              id="services-heading"
              {...fadeUp}
              className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-2"
            >
              What we offer
            </motion.h2>
            <motion.p
              {...fadeUp}
              className="text-slate-400 mb-6 max-w-2xl text-base md:text-lg"
            >
              Day-to-day support and amenities to make your stay smooth and
              stress-free.
            </motion.p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {services.map((s, i) => {
                const Icon = serviceIconMap[s.icon] ?? FiCheck;
                return (
                  <motion.li
                    key={s.title}
                    {...stagger}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-white/10 bg-slate-900/40 p-6 hover:border-white/15 hover:bg-slate-900/60 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg text-white">
                          {s.title}
                        </h3>
                        <p className="mt-1 text-slate-400 text-sm leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* More Reasons to Stay */}
        <section
          className="py-12 md:py-16 border-t border-white/10 bg-gradient-to-b from-slate-900/30 to-slate-950"
          aria-labelledby="more-reasons-heading"
        >
          <div className={CONTAINER}>
            <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10">
              <h2
                id="more-reasons-heading"
                className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-2"
              >
                More Reasons to Stay
              </h2>
              <p className="text-slate-400 text-base md:text-lg">
                Additional amenities included with every booking.
              </p>
            </motion.div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {moreReasonsToStay.map((item, i) => {
                const Icon = moreReasonsIconMap[item.title] ?? FiCheck;
                return (
                  <motion.li
                    key={item.title}
                    {...stagger}
                    transition={{ delay: i * 0.06 }}
                    className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8 shadow-lg hover:border-brand-500/30 hover:shadow-brand-500/5 hover:shadow-xl transition-all duration-300"
                  >
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 mb-5 group-hover:bg-brand-500/25 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-7 w-7" aria-hidden />
                    </span>
                    <h3 className="font-display text-xl md:text-2xl text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-slate-400 text-base md:text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Every moment, well-crafted */}
        <section
          className="py-12 md:py-16 border-t border-white/10"
          aria-labelledby="every-moment-heading"
        >
          <div className={CONTAINER}>
            <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
              <h2
                id="every-moment-heading"
                className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-2"
              >
                Every moment, well-crafted
              </h2>
              <p className="text-slate-400 text-base md:text-lg">
                From arrival to checkout, our team choreographs each touchpoint
                for ease and delight.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {everyMomentPillars.map((pillar, i) => (
                <motion.article
                  key={pillar.title}
                  {...stagger}
                  transition={{ delay: i * 0.08 }}
                  className="relative rounded-2xl border border-white/10 bg-slate-900/40 p-6 md:p-8 overflow-hidden pl-8 md:pl-10 hover:border-brand-500/20 transition-colors"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-500/80 to-brand-400/60 rounded-l-2xl"
                    aria-hidden
                  />
                  <span className="inline-block text-brand-400 text-xs font-semibold uppercase tracking-widest mb-3">
                    {pillar.tagline}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-white mb-5">
                    {pillar.title}
                  </h3>
                  <ul className="space-y-3">
                    {pillar.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-slate-300 text-base md:text-lg"
                      >
                        <FiCheck className="h-4 w-4 text-brand-400 shrink-0" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Your Service Journey */}
        <section
          className="py-12 md:py-16 border-t border-white/10 bg-gradient-to-b from-slate-950 via-slate-900/20 to-slate-950"
          aria-labelledby="service-journey-heading"
        >
          <div className={CONTAINER}>
            <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
              <h2
                id="service-journey-heading"
                className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-2"
              >
                Your Service Journey
              </h2>
              <p className="text-slate-400 text-base md:text-lg">
                A clear, caring flow from booking to farewell—so you can relax.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
              {serviceJourneySteps.map((step, i) => (
                <motion.article
                  key={step.step}
                  {...stagger}
                  transition={{ delay: i * 0.08 }}
                  className="group relative rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-7 hover:border-brand-500/25 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/20 text-brand-400 font-display text-lg font-bold mb-5 group-hover:bg-brand-500/30 group-hover:scale-110 transition-all duration-300">
                    {step.step}
                  </div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">
                    Step {step.step}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                    {step.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Guests Love Us */}
        <section
          className="py-12 md:py-16 border-t border-white/10 bg-slate-900/20"
          aria-labelledby="why-guests-heading"
        >
          <div className={CONTAINER}>
            <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10">
              <h2
                id="why-guests-heading"
                className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-2"
              >
                Why Guests Love Us
              </h2>
              <p className="text-slate-400 text-base md:text-lg">
                The little things that make stays memorable.
              </p>
            </motion.div>
            <motion.ul
              {...fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            >
              {whyGuestsLoveUs.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/50 px-5 py-4 text-slate-300 text-base md:text-lg hover:border-brand-500/20 hover:bg-slate-900/70 transition-colors"
                >
                  <FiCheck className="h-5 w-5 text-brand-400 shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* Amenities */}
        <section
          className="py-10 md:py-14 border-t border-white/10"
          aria-labelledby="amenities-heading"
        >
          <div className={CONTAINER}>
            <motion.h2
              id="amenities-heading"
              {...fadeUp}
              className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-2"
            >
              Amenities included
            </motion.h2>
            <motion.p
              {...fadeUp}
              className="text-slate-400 mb-5 max-w-2xl"
            >
              Every stay comes with these essentials at no extra cost.
            </motion.p>
            <motion.ul
              {...fadeUp}
              className="flex flex-wrap gap-3"
            >
              {amenities.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-white/10 bg-slate-900/40 px-4 py-2.5 text-slate-300 text-sm hover:border-brand-500/30 hover:text-slate-200 transition-colors"
                >
                  {a}
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-10 md:py-16 border-t border-white/10 bg-gradient-to-b from-slate-900/40 to-slate-950"
          aria-label="Book your stay"
        >
          <div className={`${CONTAINER} text-center`}>
            <motion.h2
              {...fadeUp}
              className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-2"
            >
              Ready to stay with us?
            </motion.h2>
            <motion.p
              {...fadeUp}
              className="text-slate-400 mb-5 max-w-xl mx-auto"
            >
              Choose your dates and suite—we&apos;ll take care of the rest.
            </motion.p>
            <motion.div {...fadeUp}>
              <Link
                to="/bookings"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition-colors"
              >
                Book your stay
                <FiArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
