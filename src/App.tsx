import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import SuitesPage from "./pages/SuitesPage";
import ServicesPage from "./pages/ServicesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import BookingsPage from "./pages/BookingsPage";
import LoginSignUpPage from "./pages/LoginSignUpPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminBookings from "./components/Admin/AdminBookings";
import AdminApartments from "./components/Admin/AdminApartments";
import AdminAdmins from "./components/Admin/AdminAdmins";
import AdminInquiries from "./components/Admin/AdminInquiries";
import AdminMaintenance from "./components/Admin/AdminMaintenance";
import AdminReviews from "./components/Admin/AdminReviews";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";

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
      <Route path="/login" element={<LoginSignUpPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="apartments" element={<AdminApartments />} />
        <Route path="admins" element={<AdminAdmins />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="maintenance" element={<AdminMaintenance />} />
        <Route path="reviews" element={<AdminReviews />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
