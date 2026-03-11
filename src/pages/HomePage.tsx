import Nav from "../components/Home/Nav";
import HeroSection from "../components/Home/HeroSection";
import ExperiencesSection from "../components/Home/ExperiencesSection";
import OurPromiseSection from "../components/Home/OurPromiseSection";
import CommunitySection from "../components/Home/CommunitySection";
import BookSection from "../components/Home/BookSection";
import ConciergeSection from "../components/Home/ConciergeSection";
import Footer from "../components/Home/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full min-w-0">
      <Nav />
      <HeroSection />
      <ExperiencesSection />
      <OurPromiseSection />
      <CommunitySection />
      <BookSection />
      <ConciergeSection />
      <Footer />
      {/* Anchor targets for nav */}
      <section id="suites" className="sr-only" aria-hidden="true" />
      <section id="gallery" className="sr-only" aria-hidden="true" />
      <section id="contact" className="sr-only" aria-hidden="true" />
    </main>
  );
}
