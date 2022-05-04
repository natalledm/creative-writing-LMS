import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { useUserId } from "./state/UserIdContext";
import LoggedRoutes from "./routes/LoggedRoutes";
import NotLoggedRoutes from "./routes/NotLoggedRoutes";

export default function App() {
  // global state
  const { userId } = useUserId();

  return (
    <div>
      <BrowserRouter>
        {userId && <LoggedRoutes />}
        {!userId && <NotLoggedRoutes />}
      </BrowserRouter>
    </div>
  );
}
