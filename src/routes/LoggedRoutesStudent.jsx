import { Routes, Route } from "react-router-dom";
import DashboardStudent from "../pages/DashboardStudent";

export default function LoggedRoutesStudent() {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<DashboardStudent />} />
      </Routes>
    </div>
  );
}
