import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import RecoverPassword from "../pages/RecoverPassword";
import NotLogged from "../pages/NotLogged";
import NavbarNotLogged from "../components/NavbarNotLogged";
import Footer from "../components/Footer";

export default function NotLoggedRoutes() {
  return (
    <div>
      <NavbarNotLogged />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotLogged />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
      </Routes>
      <Footer />
    </div>
  );
}
