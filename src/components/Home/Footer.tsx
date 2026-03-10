import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiInstagram, FiYoutube } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";

const LOGO_SRC = `${import.meta.env.BASE_URL}assets/images/logo.png`;

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com", icon: FiInstagram },
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "Youtube", href: "https://youtube.com", icon: FiYoutube },
] as const;

export default function Footer() {
  return (
    <footer className="relative w-full bg-slate-950 border-t border-white/[0.06]">
      <div className="w-full max-w-[100rem] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8 xs:py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand + address */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center"
              aria-label="JN Apartments home"
            >
              <img
                src={LOGO_SRC}
                alt="JN Apartments"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <h3 className="font-display text-xl font-semibold text-white">
              JN Apartments
            </h3>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed max-w-sm">
              Sky city residency, Police Bazaar, Shillong · Meghalaya, India
            </p>
            <p className="mt-6 text-slate-500 text-xs">
              © 2026 JN Apartments. All rights reserved.
            </p>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-wider text-slate-500">
              Connect
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:jnapartments2025@gmail.com"
                  className="inline-flex items-center gap-2 font-body text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <FiMail className="w-4 h-4 text-brand-400/80" />
                  jnapartments2025@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918415886572"
                  className="inline-flex items-center gap-2 font-body text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <FiPhone className="w-4 h-4 text-brand-400/80" />
                  +91 84158 86572
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-wider text-slate-500">
              Follow
            </h4>
            <ul className="mt-4 flex flex-wrap gap-4">
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-brand-400/50 hover:bg-brand-500/10 transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
