import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMaximize2, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Nav from "../components/Home/Nav";
import Footer from "../components/Home/Footer";
import {
  generalGallery,
  featuredGallery,
  exteriorGallery,
  suites,
} from "../data/content";

const CONTAINER =
  "w-full max-w-[100rem] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16";

/** Gallery categories: each uses a distinct set of images (no duplicates). */
const galleryCategories = [
  {
    id: "arrival",
    title: "Lobby & Arrival",
    description: "Reception, lobby, and parking at JN Apartments",
    images: generalGallery.slice(4),
  },
  {
    id: "1bhk",
    title: "1BHK Deluxe",
    description: "Living, bedroom, kitchen, and bath across both floors",
    images: suites.filter((s) => s.type === "1BHK").flatMap((s) => s.images),
  },
  {
    id: "2bhk",
    title: "2BHK Deluxe",
    description: "Full two-bedroom flats on both floors",
    images: suites.filter((s) => s.type === "2BHK").flatMap((s) => s.images),
  },
  {
    id: "exterior",
    title: "Building & Surrounds",
    description: "Exterior and common areas",
    images: exteriorGallery,
  },
];

/** Only render children when the section is near the viewport (reduces DOM and paint during scroll). */
function LazySection({
  id,
  children,
  placeholderMinHeight = 800,
}: {
  id: string;
  children: React.ReactNode;
  placeholderMinHeight?: number;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "400px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: inView ? undefined : placeholderMinHeight }}>
      {inView ? children : null}
    </div>
  );
}

export default function GalleryPage() {
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

  const featuredImages = featuredGallery;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main className="pt-16 xs:pt-20">
        {/* Hero — auto height on phone (content-driven), fixed from sm */}
        <section
          className="hero-page-auto-phones relative flex min-h-0 flex-col justify-center overflow-hidden py-8 xs:py-10 sm:py-12 md:py-16"
          aria-label="Gallery overview"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${generalGallery[0]}')` }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/60 to-slate-950/75"
            aria-hidden
          />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-brand-400/50 to-transparent hidden lg:block" />
          <div className={`relative z-10 ${CONTAINER} text-center`}>
            <h1 className="font-display text-3xl xs:text-4xl md:text-5xl lg:text-6xl text-white">
              Photo <span className="text-brand-200">Gallery</span>
            </h1>
            <p className="mt-2 xs:mt-4 text-slate-300 text-base xs:text-lg max-w-xl mx-auto">
              Explore our suites, amenities, and surroundings.
            </p>
            <div className="mt-4 xs:mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 xs:gap-4">
              <a
                href="#featured"
                className="min-touch inline-flex items-center gap-2 font-body text-sm font-medium text-white bg-brand-500/90 hover:bg-brand-500 px-5 py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                View featured
              </a>
              <Link
                to="/"
                className="min-touch font-body text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>

        {/* Category anchor nav — static to avoid scroll lag from sticky */}
        <nav
          className="border-b border-white/10 bg-slate-950/98"
          aria-label="Gallery sections"
        >
          <div className={CONTAINER}>
            <div className="flex gap-1 overflow-x-auto py-3 justify-center overscroll-x-contain">
              <a
                href="#featured"
                className="shrink-0 px-4 py-2 rounded-lg font-body text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Featured
              </a>
              {galleryCategories.map((cat) => {
                return (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="shrink-0 px-4 py-2 rounded-lg font-body text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {cat.title}
                  </a>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Featured: asymmetric grid + lightbox */}
        <section
          id="featured"
          className="py-16 border-b border-white/10 scroll-mt-32"
        >
          <div className={CONTAINER}>
            <div className="mb-10 text-center">
              <h2 className="font-display text-2xl md:text-3xl text-white">
                Featured photos
              </h2>
              <p className="mt-1 text-slate-400 text-sm max-w-lg mx-auto">
                A selection of spaces and views across the property.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {/* Large featured tile */}
              <div className="md:col-span-2 md:row-span-2">
                <button
                  type="button"
                  className="group relative w-full h-full min-h-[200px] md:min-h-[280px] rounded-xl overflow-hidden border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-400/60 focus:ring-offset-2 focus:ring-offset-slate-950 text-left"
                  onClick={() => openLightbox(featuredImages, 0)}
                >
                  <img
                    src={featuredImages[0]}
                    alt="Featured gallery 1"
                    loading="eager"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-lg bg-black/40 py-2 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <FiMaximize2 className="w-4 h-4" />
                    View full size
                  </span>
                </button>
              </div>
              {/* Smaller tiles */}
              {featuredImages.slice(1, 6).map((src, i) => (
                <div key={i}>
                  <button
                    type="button"
                    className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-400/60 focus:ring-offset-2 focus:ring-offset-slate-950"
                    onClick={() => openLightbox(featuredImages, i + 1)}
                  >
                    <img
                      src={src}
                      alt={`Featured gallery ${i + 2}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="rounded-full bg-white/20 p-2">
                        <FiMaximize2 className="w-5 h-5 text-white" />
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories — grid lazy-mounts when section is near viewport */}
        {galleryCategories.map((cat) => (
          <section
            key={cat.id}
            id={cat.id}
            className="py-16 border-b border-white/10 scroll-mt-32 bg-slate-900/20"
          >
            <div className={CONTAINER}>
              <div className="mb-8 text-center">
                <h2 className="font-display text-xl md:text-2xl text-white">
                  {cat.title}
                </h2>
                <p className="mt-1 text-slate-400 text-sm max-w-lg mx-auto">{cat.description}</p>
              </div>
              <LazySection id={cat.id} placeholderMinHeight={600}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                  {cat.images.map((src, i) => (
                    <div key={i} className="group">
                      <button
                        type="button"
                        className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-400/60 focus:ring-offset-2 focus:ring-offset-slate-950"
                        onClick={() => openLightbox(cat.images, i)}
                      >
                        <img
                          src={src}
                          alt={`${cat.title} ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-3">
                          <span className="flex items-center gap-2 rounded-lg bg-black/50 px-3 py-1.5 text-xs font-medium text-white">
                            <FiMaximize2 className="w-3.5 h-3.5" />
                            View
                          </span>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </LazySection>
            </div>
          </section>
        ))}
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
            transition={{ duration: 0.15 }}
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
            <img
              key={lightboxIndex}
              src={lightboxImages[lightboxIndex]}
              alt=""
              className="max-w-full max-h-[70vh] object-contain rounded-lg select-none cursor-default"
              onClick={(e) => e.stopPropagation()}
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
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-1.5 overflow-x-auto py-2 max-w-2xl mx-auto">
              {lightboxImages.map((src, i) => {
                return (
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
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}