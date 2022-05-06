import { Routes, Route } from "react-router-dom";
import DashboardStudent from "../pages/DashboardStudent";
import NavigationLogged from "../components/NavigationLogged";
import Footer from "../components/Footer";

export default function LoggedRoutesStudent() {
  return (
    <div>
      <NavigationLogged />
      <Routes>
        <Route path="/dashboard" element={<DashboardStudent />} />
      </Routes>
      <Footer />
    </div>
  );
}
