// packages
import { createContext, useState, useContext } from "react";

// Properties
const Context = createContext(null);

// This is for App.jsx
export function UserIdContext({ children }) {
  // Local state
  const [userId, setUserId] = useState(null);

  const login = (userLogginIn) => {
    if (userId !== null) {
      return;
    }

    // There is a user logging in, save user id
    console.log("logando", userLogginIn);
    setUserId(userLogginIn);
    console.log("userID", userId);
  };

  const logout = () => setUserId(null);

  const value = { userId, login, logout };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// This is for every component that needs the user state
export function useUserId() {
  const context = useContext(Context);
  const errorText =
    "To use this function, useUserId(), wrap the parent component with <UserIdContext/>";

  // Safeguards
  if (!context) throw new Error(errorText);

  return context;
}
