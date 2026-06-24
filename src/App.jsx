import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import VerifyPage from "./pages/VerifyPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

export default function App() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-gradient-to-b from-whale/20 via-deep/40 to-transparent" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:address" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </div>
  );
}
