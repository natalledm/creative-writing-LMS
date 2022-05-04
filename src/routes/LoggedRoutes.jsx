import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { useUserId } from "../state/UserIdContext";

export default function LoggedRoutes() {
  const { login } = useUserId();
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
