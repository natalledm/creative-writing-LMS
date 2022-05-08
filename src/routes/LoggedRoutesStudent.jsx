import { Routes, Route } from "react-router-dom";
import DashboardStudent from "../pages/DashboardStudent";
import NavigationLogged from "../components/NavigationLogged";
import Footer from "../components/Footer";
import CoursesPage from "../pages/CoursesPage";
import CoursePage from "../pages/CoursePage";
import NotLogged from "../pages/NotLogged";

export default function LoggedRoutesStudent() {
  return (
    <div>
      <NavigationLogged />
      <Routes>
        <Route path="/dashboard" element={<DashboardStudent />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="*" element={<NotLogged />} />
      </Routes>
      <Footer />
    </div>
  );
}
