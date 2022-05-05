import { Routes, Route } from "react-router-dom";
import DashboardTeacher from "../pages/DashboardTeacher";

export default function LoggedRoutesTeacher() {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<DashboardTeacher />} />
      </Routes>
    </div>
  );
}
