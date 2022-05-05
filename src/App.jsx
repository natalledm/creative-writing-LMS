import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { useUserId } from "./state/UserIdContext";
import LoggedRoutesStudent from "./routes/LoggedRoutesStudent";
import NotLoggedRoutes from "./routes/NotLoggedRoutes";
import LoggedRoutesTeacher from "./routes/LoggedRoutesTeacher";

export default function App() {
  // global state
  const { userId, userInfo } = useUserId();

  return (
    <div>
      <BrowserRouter>
        {userId && userInfo.role === "student" && <LoggedRoutesStudent />}
        {userId && userInfo.role === "teacher" && <LoggedRoutesTeacher />}
        {!userId && <NotLoggedRoutes />}
      </BrowserRouter>
    </div>
  );
}
