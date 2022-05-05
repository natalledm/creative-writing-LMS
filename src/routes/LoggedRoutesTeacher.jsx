import { Routes, Route } from "react-router-dom";
import DashboardTeacher from "../pages/DashboardTeacher";
import NavigationLogged from "../components/NavigationLogged";

export default function LoggedRoutesTeacher() {
  return (
    <div>
      <NavigationLogged />
      <Routes>
        <Route path="/dashboard" element={<DashboardTeacher />} />
      </Routes>
    </div>
  );
}
