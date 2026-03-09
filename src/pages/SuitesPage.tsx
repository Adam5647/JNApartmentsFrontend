import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiGrid,
  FiDollarSign,
  FiLayers,
  FiWifi,
  FiDroplet,
  FiCoffee,
  FiCheckCircle,
  FiMapPin,
  FiMaximize2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Nav from "../components/Home/Nav";
import Footer from "../components/Home/Footer";
import MtbButton from "../components/Home/MtbButton";
import { suites, suiteInventory, suitesHeroImage } from "../data/content";

const CONTAINER = "w-full max-w-[100rem] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16";

const roomTypes = [
  {
    type: "1BHK Deluxe Non-AC",
    tagline: "Cozy and comfortable for couples or small families",
    size: "Approx. 650 sq ft",
    price: "₹3,000",
    perNight: "per night",
    features: ["Living area", "Kitchenette", "Wi‑Fi", "Up to 3 guests"],
    floor: "First & Second floor",
    images: suites.find((s) => s.type === "1BHK")?.images ?? [],
  },
  {
    type: "2BHK Deluxe Non-AC",
    tagline: "Spacious two-bedroom for families or groups",
    size: "Approx. 950 sq ft",
    price: "₹4,500",
    perNight: "per night",
    features: ["Two bedrooms", "Full kitchen", "Dining nook", "Wi‑Fi", "Up to 6 guests"],
    floor: "First & Second floor",
    images: suites.find((s) => s.type === "2BHK")?.images ?? [],
  },
];

const includedInAll: { label: string; icon: React.ElementType }[] = [
  { label: "Wi‑Fi", icon: FiWifi },
  { label: "Geyser (hot water)", icon: FiDroplet },
  { label: "Kitchenette or full kitchen", icon: FiCoffee },
  { label: "Housekeeping", icon: FiCheckCircle },
  { label: "On-site parking", icon: FiMapPin },
];

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

export default function SuitesPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setLightboxImages([]);
  }, []);

  const moveLightbox = (delta: number) => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (prev) => ((prev! + delta + lightboxImages.length) % lightboxImages.length)
    );
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") moveLightbox(-1);
      if (e.key === "ArrowRight") moveLightbox(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, lightboxImages.length, closeLightbox]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main className="pt-16 xs:pt-20">
        {/* Hero — auto height on phone (content-driven), fixed from sm */}
        <section
          className="hero-page-auto-phones relative flex min-h-0 flex-col justify-center overflow-hidden py-8 xs:py-10 sm:py-12 md:py-16"
          aria-label="Suites overview"
        >
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('${suitesHeroImage}')`,
              backgroundPosition: "50% 70%",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/60 to-slate-950/75"
            aria-hidden
          />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-brand-400/50 to-transparent hidden lg:block" />
          <div className={`relative z-10 ${CONTAINER} text-center`}>
            <motion.h1
              className="font-display text-3xl xs:text-4xl md:text-5xl lg:text-6xl text-white font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our Suites
            </motion.h1>
            <motion.p
              className="mt-2 xs:mt-4 text-slate-300 text-base xs:text-lg max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Deluxe Non-AC stays with everything you need — living space, kitchen, Wi‑Fi, and
              on-site parking. Eight convertible suites across two floors.
            </motion.p>
            {/* Stats in hero */}
            <motion.div
              className="mt-4 xs:mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              aria-label="Suite highlights"
            >
              <div className="flex flex-col items-center text-center gap-0.5 xs:gap-1">
                <FiHome className="w-4 h-4 xs:w-5 xs:h-5 text-brand-400 shrink-0" aria-hidden />
                <span className="font-body text-sm xs:text-lg font-semibold text-white">
                  {suiteInventory.baseUnits}
                </span>
                <span className="text-slate-400 text-xs xs:text-sm font-body">Suites</span>
              </div>
              <div className="flex flex-col items-center text-center gap-0.5 xs:gap-1">
                <FiGrid className="w-4 h-4 xs:w-5 xs:h-5 text-brand-400 shrink-0" aria-hidden />
                <span className="font-body text-sm xs:text-lg font-semibold text-white">1BHK & 2BHK</span>
                <span className="text-slate-400 text-xs xs:text-sm font-body">Convertible</span>
              </div>
              <div className="flex flex-col items-center text-center gap-0.5 xs:gap-1">
                <FiDollarSign className="w-4 h-4 xs:w-5 xs:h-5 text-brand-400 shrink-0" aria-hidden />
                <span className="font-body text-sm xs:text-lg font-semibold text-white">
                  ₹{suiteInventory.oneBhkRate.toLocaleString()} – ₹{suiteInventory.twoBhkRate.toLocaleString()}
                </span>
                <span className="text-slate-400 text-xs xs:text-sm font-body">Per night</span>
              </div>
              <div className="flex flex-col items-center text-center gap-0.5 xs:gap-1">
                <FiLayers className="w-4 h-4 xs:w-5 xs:h-5 text-brand-400 shrink-0" aria-hidden />
                <span className="font-body text-sm xs:text-lg font-semibold text-white">2</span>
                <span className="text-slate-400 text-xs xs:text-sm font-body">Floors</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/"
                className="mt-4 xs:mt-6 sm:mt-8 inline-flex items-center gap-2 font-body text-slate-400 hover:text-white transition-colors text-sm min-touch"
              >
                <span aria-hidden>←</span> Back to Home
              </Link>
            </motion.div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-12 md:py-16" aria-label="Included in all suites">
          <div className={CONTAINER}>
            <motion.h2
              className="font-display text-xl md:text-2xl text-white text-center mb-8"
              {...fadeUp}
            >
              What’s included in every suite
            </motion.h2>
            <motion.ul
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {includedInAll.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex flex-col items-center text-center p-4 rounded-xl border border-white/10 bg-slate-800/30 hover:bg-slate-800/50 hover:border-white/15 transition-colors"
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-500/15 text-brand-400 mb-2">
                    <item.icon className="w-5 h-5" />
                  </span>
                  <span className="text-slate-300 text-sm font-medium">{item.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* At a glance: 1BHK vs 2BHK */}
        <section className="py-10 border-y border-white/10 bg-slate-900/20" aria-label="Compare suites">
          <div className={CONTAINER}>
            <motion.h2
              className="font-display text-lg md:text-xl text-white text-center mb-6"
              {...fadeUp}
            >
              At a glance
            </motion.h2>
            <motion.div
              className="max-w-2xl mx-auto overflow-hidden rounded-xl border border-white/10 bg-slate-800/40"
              {...fadeUp}
            >
              <div className="grid grid-cols-2 divide-x divide-white/10">
                <div className="p-5 md:p-6 text-center">
                  <p className="font-display text-lg text-brand-400">1BHK</p>
                  <p className="mt-1 text-2xl font-semibold text-white">₹3,000</p>
                  <p className="text-slate-400 text-sm mt-2">per night</p>
                  <p className="text-slate-300 text-sm mt-3">Up to 3 guests · ~650 sq ft</p>
                </div>
                <div className="p-5 md:p-6 text-center">
                  <p className="font-display text-lg text-brand-400">2BHK</p>
                  <p className="mt-1 text-2xl font-semibold text-white">₹4,500</p>
                  <p className="text-slate-400 text-sm mt-2">per night</p>
                  <p className="text-slate-300 text-sm mt-3">Up to 6 guests · ~950 sq ft</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Room types & pricing */}
        <section
          className="scroll-contain py-14 md:py-20 border-t border-white/10"
          aria-label="Room types and pricing"
        >
          <div className={CONTAINER}>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <motion.h2
                className="font-display text-2xl md:text-3xl lg:text-4xl text-white"
                {...fadeUp}
              >
                Choose your suite
              </motion.h2>
              <motion.p
                className="mt-3 text-slate-400"
                {...stagger}
              >
                Pick the layout that fits your group — both options are available on the first and
                second floor.
              </motion.p>
            </div>

            <div className="space-y-16 md:space-y-24">
              {roomTypes.map((room, index) => (
                <motion.article
                  key={index}
                  className="rounded-2xl border border-white/10 bg-slate-900/40 overflow-hidden shadow-xl hover:border-white/15 transition-colors"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid gap-0 lg:grid-cols-2 lg:gap-0">
                    <div
                      className={`p-6 md:p-8 lg:p-10 flex flex-col justify-center ${
                        index % 2 === 1 ? "lg:order-2" : ""
                      }`}
                    >
                      <p className="font-body text-xs uppercase tracking-wider text-brand-400/90">
                        {room.floor}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl text-white mt-1">
                        {room.type}
                      </h3>
                      <p className="mt-2 text-slate-400 text-sm md:text-base">{room.tagline}</p>
                      <p className="mt-2 text-slate-500 text-sm">{room.size}</p>
                      <p className="mt-5 flex items-baseline gap-2">
                        <span className="text-3xl font-semibold text-brand-400">{room.price}</span>
                        <span className="text-slate-400 text-base">{room.perNight}</span>
                      </p>
                      <ul className="mt-5 space-y-2.5 text-slate-300" role="list">
                        {room.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-brand-400 shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <MtbButton slug="693abf6c2f91fcdb61d3f676" />
                      </div>
                    </div>

                    <div
                      className={`relative min-h-[280px] lg:min-h-[380px] ${
                        index % 2 === 1 ? "lg:order-1" : ""
                      }`}
                    >
                      <div className="absolute inset-0 p-4 md:p-6 flex flex-col gap-3">
                        {room.images[0] && (
                          <button
                            type="button"
                            className="flex-1 min-h-0 rounded-xl overflow-hidden border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer group relative"
                            onClick={() => openLightbox(room.images, 0)}
                          >
                            <img
                              src={room.images[0]}
                              alt={`${room.type} — main view`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                            <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-slate-900 text-sm font-medium">
                                <FiMaximize2 className="w-4 h-4" />
                                View gallery
                              </span>
                            </span>
                          </button>
                        )}
                        <div className="grid grid-cols-4 gap-2 shrink-0">
                          {room.images.slice(1, 5).map((img, i) => (
                            <button
                              key={i}
                              type="button"
                              className="aspect-square rounded-lg overflow-hidden border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-slate-900 hover:border-white/20 transition-colors"
                              onClick={() => openLightbox(room.images, i + 1)}
                            >
                              <img
                                src={img}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Stay details */}
        <section className="py-16 md:py-20 border-t border-white/10 bg-slate-900/20" aria-label="Stay details">
          <div className={CONTAINER}>
            <div className="text-center mb-12">
              <motion.h2
                className="font-display text-2xl md:text-3xl text-white"
                {...fadeUp}
              >
                Stay details
              </motion.h2>
              <motion.p
                className="mt-2 text-slate-400"
                {...fadeUp}
              >
                Quick answers before you book
              </motion.p>
            </div>
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xs uppercase tracking-widest text-slate-400">Booking</p>
                <h3 className="mt-3 text-lg font-semibold text-white">Secure online confirmation</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Choose your suite type, select dates, and confirm through the Meghalaya Tourism booking platform.
                </p>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xs uppercase tracking-widest text-slate-400">Comfort</p>
                <h3 className="mt-3 text-lg font-semibold text-white">Space to settle in</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Convertible 1BHK and 2BHK layouts with living space, kitchenette options, and Wi‑Fi for short stays.
                </p>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xs uppercase tracking-widest text-slate-400">Service</p>
                <h3 className="mt-3 text-lg font-semibold text-white">Responsive housekeeping</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site support for routine needs so your stay stays smooth—especially for multi-night bookings.
                </p>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xs uppercase tracking-widest text-slate-400">Parking</p>
                <h3 className="mt-3 text-lg font-semibold text-white">On-site parking</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Convenient on-premises parking so you can arrive and leave without the Shillong parking stress.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                <div>
                  <h3 className="text-xl font-semibold text-white">Not sure which suite to pick?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    1BHK works great for couples and solo travellers. 2BHK is ideal for families or groups who want
                    extra privacy across rooms.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-slate-900/30 p-4">
                    <p className="text-sm font-semibold text-white">1BHK Deluxe</p>
                    <p className="mt-1 text-xs text-slate-400">Up to 3 guests</p>
                    <p className="mt-3 text-sm font-semibold text-brand-400">₹3,000 / night</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-900/30 p-4">
                    <p className="text-sm font-semibold text-white">2BHK Deluxe</p>
                    <p className="mt-1 text-xs text-slate-400">Up to 6 guests</p>
                    <p className="mt-3 text-sm font-semibold text-brand-400">₹4,500 / night</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-white/10">
          <div className={CONTAINER}>
            <motion.div
              className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 p-8 md:p-12 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative flex flex-col items-center">
                <h2 className="font-display text-xl md:text-2xl text-white">
                  Ready to book your stay?
                </h2>
                <p className="mt-2 text-slate-400 max-w-lg mx-auto">
                  Reserve your suite through Meghalaya Tourism or get in touch for any questions.
                </p>
                <div className="mt-8 flex flex-col items-center">
                  <span className="font-body text-sm text-slate-400 mb-2 block text-center">
                    Book Hotel on<br />Meghalaya Tourism
                  </span>
                  <MtbButton slug="693abf6c2f91fcdb61d3f676" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && lightboxImages.length > 0 && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
              <span className="text-slate-400 text-sm font-body">
                {lightboxIndex + 1} / {lightboxImages.length}
              </span>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                onClick={closeLightbox}
                aria-label="Close gallery"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <button
              type="button"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
              onClick={(e) => {
                e.stopPropagation();
                moveLightbox(-1);
              }}
              aria-label="Previous image"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <motion.img
              key={lightboxIndex}
              src={lightboxImages[lightboxIndex]}
              alt=""
              className="max-w-full max-h-[70vh] object-contain rounded-lg select-none cursor-default"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <button
              type="button"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
              onClick={(e) => {
                e.stopPropagation();
                moveLightbox(1);
              }}
              aria-label="Next image"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-1.5 overflow-x-auto py-2 max-w-2xl mx-auto">
              {lightboxImages.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    i === lightboxIndex
                      ? "border-brand-400 ring-2 ring-brand-400/30"
                      : "border-white/20 hover:border-white/40 opacity-70 hover:opacity-100"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(i);
                  }}
                >
                  <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
