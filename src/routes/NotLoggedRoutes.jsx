import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import RecoverPassword from "../pages/RecoverPassword";
import NotLogged from "../pages/NotLogged";
import NavbarNotLogged from "../components/NavbarNotLogged";
import Footer from "../components/Footer";
import CoursesPage from "../pages/CoursesPage";
import CreateCoursePage from "../pages/CreateCoursePage";
import CoursePage from "../pages/CoursePage";
import EditCoursePage from "../pages/EditCoursePage";

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
        <Route path="/create-course" element={<CreateCoursePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="/courses/:courseId/edit" element={<EditCoursePage />} />
      </Routes>
      <Footer />
    </div>
  );
}
