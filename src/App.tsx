import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import SuitesPage from "./pages/SuitesPage";
import ServicesPage from "./pages/ServicesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import BookingsPage from "./pages/BookingsPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/suites" element={<SuitesPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
