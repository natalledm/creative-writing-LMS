import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

export default function LoggedRoutesStudent() {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
