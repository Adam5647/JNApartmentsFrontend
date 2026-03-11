import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Home/Nav";
import Footer from "../components/Home/Footer";
import { testimonialsHeroImage, testimonialsGuestStories } from "../data/content";

const TRUSTINDEX_SCRIPT_URL =
  "https://cdn.trustindex.io/loader.js?2dc9420666c4863d6836b1de856";

/** Find Trustindex nav buttons (prev/next) inside container — Trustindex DOM order is often next then prev, so we swap */
function findTrustindexArrows(container: HTMLElement): { prev: HTMLElement | null; next: HTMLElement | null } {
  const controls = container.querySelector('.ti-controls, [class*="ti-"]');
  const scope = controls ?? container;
  const buttons = scope.querySelectorAll('button, a[href="#"], [class*="prev"], [class*="next"], [class*="arrow"]');
  if (buttons.length >= 2) {
    return { prev: buttons[1] as HTMLElement, next: buttons[0] as HTMLElement };
  }
  const byClass = scope.querySelectorAll('[class*="prev"], [class*="next"]');
  if (byClass.length >= 2) {
    const prevEl = Array.from(byClass).find((el) => el.className.toLowerCase().includes('prev'));
    const nextEl = Array.from(byClass).find((el) => el.className.toLowerCase().includes('next'));
    if (prevEl && nextEl) return { prev: prevEl as HTMLElement, next: nextEl as HTMLElement };
  }
  return { prev: null, next: null };
}

export default function TestimonialsPage() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const sectionWrapperRef = useRef<HTMLDivElement>(null);
  const [arrowRefs, setArrowRefs] = useState<{ prev: HTMLElement | null; next: HTMLElement | null }>({ prev: null, next: null });

  const triggerPrev = useCallback(() => {
    arrowRefs.prev?.click();
  }, [arrowRefs.prev]);

  const triggerNext = useCallback(() => {
    arrowRefs.next?.click();
  }, [arrowRefs.next]);

  useEffect(() => {
    const container = widgetContainerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = TRUSTINDEX_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    container.appendChild(script);

    const moveWidgetIntoSection = () => {
      if (!container) return;
      const root = document.getElementById("root");
      if (!root) return;
      const candidates = document.querySelectorAll(
        'iframe[src*="trustindex"], [id*="trustindex"], .ti-widget, [class*="ti-"]'
      );
      for (const el of candidates) {
        if (container.contains(el)) continue;
        const parent = el.parentElement;
        if (parent && (parent === root || parent === document.body)) {
          container.appendChild(el);
          break;
        }
      }
    };

    const tryBindArrows = () => {
      const root = sectionWrapperRef.current ?? container;
      const { prev, next } = findTrustindexArrows(root);
      if (prev && next) {
        prev.style.setProperty('visibility', 'hidden');
        prev.style.setProperty('position', 'absolute');
        prev.style.setProperty('width', '0');
        prev.style.setProperty('height', '0');
        prev.style.setProperty('opacity', '0');
        prev.style.setProperty('pointer-events', 'none');
        next.style.setProperty('visibility', 'hidden');
        next.style.setProperty('position', 'absolute');
        next.style.setProperty('width', '0');
        next.style.setProperty('height', '0');
        next.style.setProperty('opacity', '0');
        next.style.setProperty('pointer-events', 'none');
        setArrowRefs({ prev, next });
        return true;
      }
      return false;
    };

    script.onload = () => {
      setTimeout(moveWidgetIntoSection, 500);
      setTimeout(moveWidgetIntoSection, 2000);
      const bindInterval = setInterval(() => {
        if (tryBindArrows()) clearInterval(bindInterval);
      }, 400);
      setTimeout(() => clearInterval(bindInterval), 8000);
    };

    return () => {
      if (container.contains(script)) script.remove();
    };
  }, []);

  // Re-detect arrows when widget content might have changed (e.g. iframe)
  useEffect(() => {
    if (arrowRefs.prev && arrowRefs.next) return;
    const t = setInterval(() => {
      const root = sectionWrapperRef.current ?? widgetContainerRef.current;
      if (!root) return;
      const { prev, next } = findTrustindexArrows(root);
      if (prev && next) {
        prev.style.setProperty('visibility', 'hidden');
        prev.style.setProperty('position', 'absolute');
        prev.style.setProperty('width', '0');
        prev.style.setProperty('height', '0');
        prev.style.setProperty('opacity', '0');
        prev.style.setProperty('pointer-events', 'none');
        next.style.setProperty('visibility', 'hidden');
        next.style.setProperty('position', 'absolute');
        next.style.setProperty('width', '0');
        next.style.setProperty('height', '0');
        next.style.setProperty('opacity', '0');
        next.style.setProperty('pointer-events', 'none');
        setArrowRefs({ prev, next });
        clearInterval(t);
      }
    }, 500);
    return () => clearInterval(t);
  }, [arrowRefs.prev, arrowRefs.next]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-body">
      <Nav />
      <main className="pt-16 xs:pt-20">

        {/* Hero */}
        <section
          className="hero-page-auto-phones relative flex min-h-0 flex-col justify-center overflow-hidden py-8 xs:py-10 sm:py-12 md:py-16"
        >
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('${testimonialsHeroImage}')`,
              backgroundPosition: "50% 70%",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/60 to-slate-950/75" aria-hidden />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl xs:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              Guest Experiences
            </h1>
            <p className="mt-2 xs:mt-4 text-slate-300 text-base xs:text-lg max-w-xl mx-auto">
              Discover what our guests say about their stays at JN Apartments. Real stories from real
              people who have experienced the warmth of Meghalaya hospitality.
            </p>
            <Link
              to="/"
              className="mt-4 xs:mt-6 sm:mt-8 inline-flex items-center gap-2 font-body text-sm text-slate-400 hover:text-white transition-colors min-touch"
            >
              <span aria-hidden>←</span> Back to Home
            </Link>
          </div>
        </section>

        {/* Reviews section — Trustindex widget (script in index.html) */}
        <section
          className="py-16 md:py-24 border-t border-white/5"
          id="trustindex-reviews"
          aria-labelledby="reviews-heading"
        >
          <div className="w-full max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
            {/* Section header */}
            <header className="text-center mb-12 md:mb-16">
              <span className="inline-block px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Reviews
              </span>
              <h2
                id="reviews-heading"
                className="font-display text-3xl xs:text-4xl md:text-5xl text-white leading-tight"
              >
                What Our Guests Say
              </h2>
              <p className="mt-3 text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
                Real feedback from travelers who stayed at JN Apartments in Meghalaya.
              </p>
            </header>

            {/* Widget container — Trustindex script loads here; custom arrows overlay; height fits content */}
            <div
              ref={sectionWrapperRef}
              className="relative rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-sm p-6 md:p-8 lg:p-10 shadow-xl shadow-black/20"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/5 via-transparent to-transparent pointer-events-none" aria-hidden />

              {/* Custom prev arrow */}
              <button
                type="button"
                onClick={triggerPrev}
                aria-label="Previous review"
                className="absolute left-0 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-800/90 text-white shadow-lg transition-all hover:border-brand-500/50 hover:bg-brand-500/20 hover:text-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50 md:left-1 md:h-12 md:w-12"
              >
                <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Custom next arrow */}
              <button
                type="button"
                onClick={triggerNext}
                aria-label="Next review"
                className="absolute right-0 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-800/90 text-white shadow-lg transition-all hover:border-brand-500/50 hover:bg-brand-500/20 hover:text-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50 md:right-1 md:h-12 md:w-12"
              >
                <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div
                ref={widgetContainerRef}
                id="trustindex-widget"
                className="relative z-10 [&_.ti-widget]:!max-w-none"
              />
            </div>
          </div>
        </section>

        {/* Guest Stories */}
        <section className="py-20 border-t border-white/5">
          <div className="w-full max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-4xl text-white mb-3">Guest Stories</h2>
              <p className="text-slate-400">In-depth stories from our memorable guests</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonialsGuestStories.map((story) => (
                <article
                  key={story.id}
                  className="group relative flex min-h-0 flex-col overflow-hidden rounded-2xl bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5"
                >
                  <div className="relative h-52 flex-shrink-0 overflow-hidden rounded-t-2xl">
                    <img
                      src={story.image}
                      alt={story.title}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col p-6 -mt-4 bg-slate-900/80 rounded-b-2xl">
                    <h3 className="font-display text-xl text-white mb-1 group-hover:text-brand-300 transition-colors duration-200">
                      {story.title}
                    </h3>
                    <p className="text-brand-400 text-sm font-medium mb-3">By {story.author}</p>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1">{story.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — Share Your Experience */}
        <section className="py-20 border-t border-white/5">
          <div className="w-full max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900/60 via-slate-900 to-slate-900 border border-brand-500/20 p-10 md:p-16 text-center">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                  Share Your Experience
                </h2>
                <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8">
                  Have you stayed with us? We&apos;d love to hear about your experience and feature your
                  story.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://www.google.com/maps/search/JN+Apartment+Mawpat+Meghalaya+793006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-colors duration-200 shadow-lg shadow-brand-500/30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Leave a Review
                  </a>
                  <Link
                    to="/suites"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/20 transition-colors duration-200 backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Book Your Stay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
