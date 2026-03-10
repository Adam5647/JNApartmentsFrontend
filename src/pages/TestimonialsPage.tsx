import { Link } from "react-router-dom";
import Nav from "../components/Home/Nav";
import Footer from "../components/Home/Footer";
import {
  testimonialsHeroImage,
  testimonialsOverallRating,
  testimonialsRatingBreakdown,
  testimonialsDetailedReviews,
  testimonialsGuestStories,
} from "../data/content";

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

/** Shared SVG gradient defs — rendered once at top of page */
function StarGradientDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <linearGradient id="star-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C870" />
          <stop offset="50%" stopColor="#C9943A" />
          <stop offset="100%" stopColor="#A8722A" />
        </linearGradient>
        <linearGradient id="star-gold-half" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor="#C9943A" />
          <stop offset="50%" stopColor="#2e3748" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function StarRating({ score, size = "sm" }: { score: number; size?: "sm" | "lg" }) {
  const full = Math.floor(score);
  const partial = score - full;
  const px = size === "lg" ? 24 : 16;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) {
          return (
            <svg key={i} width={px} height={px} viewBox="0 0 20 20" style={{ filter: "drop-shadow(0 1px 2px rgba(201,148,58,0.4))" }}>
              <path d={STAR_PATH} fill="url(#star-gold)" />
            </svg>
          );
        } else if (i === full && partial >= 0.5) {
          return (
            <svg key={i} width={px} height={px} viewBox="0 0 20 20" style={{ filter: "drop-shadow(0 1px 2px rgba(201,148,58,0.3))" }}>
              <path d={STAR_PATH} fill="url(#star-gold-half)" />
            </svg>
          );
        } else {
          return (
            <svg key={i} width={px} height={px} viewBox="0 0 20 20" style={{ opacity: 0.25 }}>
              <path d={STAR_PATH} fill="#6b7280" />
            </svg>
          );
        }
      })}
    </div>
  );
}

function RatingBar({ score }: { score: number }) {
  const pct = (score / 5) * 100;
  return (
    <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-body">
      <StarGradientDefs />
      <Nav />
        <main className="pt-16 xs:pt-20">

        {/* Hero — auto height on phone (content-driven), fixed from sm */}
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
          {/* Gradient overlay – lighter so hero image stays more visible */}
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

        {/* ── RATING BREAKDOWN ──────────────────────────────────────── */}
        <section className="py-16 border-t border-white/5">
          <div className="w-full max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
                Guest Satisfaction
              </h2>
              <p className="text-slate-400">Detailed breakdown of our guest experience ratings</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {testimonialsRatingBreakdown.map((item) => (
                <div
                  key={item.category}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-brand-500/30 transition-colors duration-200"
                >
                  <span className="font-display text-4xl font-bold text-white">{item.score}</span>
                  <StarRating score={item.score} />
                  <span className="text-slate-300 text-sm text-center font-medium">{item.category}</span>
                  <div className="w-full">
                    <RatingBar score={item.score} />
                  </div>
                  <span className="text-slate-500 text-xs">({item.count} reviews)</span>
                </div>
              ))}
            </div>

            {/* Overall score display */}
            <div className="mt-12 flex flex-col items-center gap-2">
              <span className="font-display text-6xl md:text-7xl font-bold text-white leading-none">
                {testimonialsOverallRating.score}
              </span>
              <StarRating score={testimonialsOverallRating.score} size="lg" />
              <span className="text-slate-400 text-sm">out of 5</span>
            </div>
          </div>
        </section>

        {/* ── GUEST REVIEWS ─────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/5">
          <div className="w-full max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-4xl text-white mb-3">Guest Reviews</h2>
              <p className="text-slate-400">Hear directly from our valued guests</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonialsDetailedReviews.map((review) => (
                <article
                  key={review.id}
                  className="group relative flex flex-col rounded-2xl border border-white/8 bg-slate-900/50 p-6 hover:bg-slate-900/80 hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5"
                >
                  {/* Quote mark */}
                  <svg
                    className="absolute top-4 right-5 w-10 h-10 text-brand-500/10 group-hover:text-brand-500/20 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8C6.134 8 3 11.134 3 15v9h9v-9H6c0-2.206 1.794-4 4-4V8zm14 0c-3.866 0-7 3.134-7 7v9h9v-9h-6c0-2.206 1.794-4 4-4V8z" />
                  </svg>

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <img
                      src={review.image}
                      alt={review.name}
                      loading="lazy"
                      decoding="async"
                      className="w-13 h-13 w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/30 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-base leading-tight">{review.name}</p>
                      <p className="text-slate-400 text-sm mt-0.5">{review.location}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-brand-400 text-xs font-medium">{review.stayType}</span>
                        <span className="text-slate-600 text-xs">•</span>
                        <span className="text-slate-500 text-xs">{review.date}</span>
                      </div>
                    </div>
                  </div>

                  <StarRating score={review.rating} />

                  {/* Quote */}
                  <blockquote className="mt-4 text-slate-300 text-sm leading-relaxed flex-1">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {review.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── GUEST STORIES ─────────────────────────────────────────── */}
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
                  className="group relative overflow-hidden rounded-2xl border border-white/8 hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-slate-900/70 backdrop-blur-sm">
                    <h3 className="font-display text-xl text-white mb-1 group-hover:text-brand-300 transition-colors duration-200">
                      {story.title}
                    </h3>
                    <p className="text-brand-400 text-sm font-medium mb-3">By {story.author}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{story.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/5">
          <div className="w-full max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900/60 via-slate-900 to-slate-900 border border-brand-500/20 p-10 md:p-16 text-center">
              {/* Decorative blobs */}
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
                    href="mailto:jnapartments@example.com?subject=My Review"
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
