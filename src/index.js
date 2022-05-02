import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserIdContext } from "./globalState/UserIdContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserIdContext>
    <App />
  </UserIdContext>,
);
