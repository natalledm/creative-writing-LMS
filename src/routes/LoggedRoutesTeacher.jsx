import { Routes, Route } from "react-router-dom";
import DashboardTeacher from "../pages/DashboardTeacher";
import NavigationLogged from "../components/NavigationLogged";
import Footer from "../components/Footer";
import CoursesPage from "../pages/CoursesPage";
import CoursePage from "../pages/CoursePage";
import CreateCoursePage from "../pages/CreateCoursePage";
import DeleteCoursePage from "../pages/DeleteCoursePage";
import EditCoursePage from "../pages/EditCoursePage";
import NotLogged from "../pages/NotLogged";

// Excellent
export default function LoggedRoutesTeacher() {
  return (
    <div>
      <NavigationLogged />
      <Routes>
        <Route path="/dashboard" element={<DashboardTeacher />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="/create-course" element={<CreateCoursePage />} />
        <Route path="/delete-course" element={<DeleteCoursePage />} />
        <Route path="/courses/:courseId/edit" element={<EditCoursePage />} />
        <Route path="*" element={<NotLogged />} />
      </Routes>
      <Footer />
    </div>
  );
}
