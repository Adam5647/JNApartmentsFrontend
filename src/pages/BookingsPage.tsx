import { Link } from "react-router-dom";
import Nav from "../components/Home/Nav";
import Footer from "../components/Home/Footer";
import MtbButton from "../components/Home/MtbButton";
import { bookingsHeroImage } from "../data/content";

const MEGHALAYA_TOURISM_URL =
  "https://app.meghalayatourism.in/hotel-details/693abf6c2f91fcdb61d3f676";

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main className="pt-20">
        {/* Hero: background from content.ts (local asset) */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${bookingsHeroImage}')` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-slate-950/75" aria-hidden />
          <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white">
              Book Your <span className="text-brand-200">Stay</span>
            </h1>
            <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
              Experience luxury living in Meghalaya's finest serviced apartments. Reserve your dates through our secure booking partner, Meghalaya Tourism.
            </p>
            <p className="mt-2 text-slate-400 text-sm font-medium uppercase tracking-wider">
              Book Hotel on Meghalaya Tourism
            </p>
            <div className="mt-8">
              <MtbButton slug="693abf6c2f91fcdb61d3f676" />
            </div>
            <Link
              to="/"
              className="mt-6 inline-block font-body text-brand-400 hover:text-brand-300"
            >
              ← Back to Home
            </Link>
          </div>
        </section>

        {/* Why book through MT */}
        <section className="py-14 border-t border-white/10">
          <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <h2 className="font-display text-2xl md:text-3xl text-white mb-8 text-center">
              Why Book Through Meghalaya Tourism?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="font-display text-lg text-white mb-2">
                  Secure Payment
                </h3>
                <p className="text-slate-400 text-sm">
                  Government-backed secure payment processing
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-display text-lg text-white mb-2">
                  Instant Confirmation
                </h3>
                <p className="text-slate-400 text-sm">
                  Real-time booking confirmation and updates
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-display text-lg text-white mb-2">
                  24/7 Support
                </h3>
                <p className="text-slate-400 text-sm">
                  Round-the-clock assistance through Meghalaya Tourism
                </p>
              </div>
            </div>
            <div className="mt-10 p-6 rounded-xl border border-white/10 bg-slate-900/50 max-w-2xl mx-auto text-center">
              <p className="text-slate-300 text-sm">
                Questions?{" "}
                <a
                  href="mailto:jnapartments2025@gmail.com"
                  className="text-brand-400 hover:text-brand-300 underline"
                >
                  Contact our concierge
                </a>{" "}
                or{" "}
                <a
                  href={MEGHALAYA_TOURISM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:text-brand-300 underline"
                >
                  view our listing on Meghalaya Tourism
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
