import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./notLoggedPages/Login";
import Home from "./notLoggedPages/Home";
import Signup from "./notLoggedPages/Signup";
import RecoverPassword from "./notLoggedPages/RecoverPassword";
import Dashboard from "./notLoggedPages/Dashboard";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
