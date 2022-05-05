// packages
import { createContext, useState, useContext, useEffect } from "react";
import { readDocument } from "../scripts/fireStoreDB";

// Properties
const Context = createContext(null);

// This is for App.jsx
export function UserIdContext({ children }) {
  // Local state
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState([]);

  // methods
  const login = (userLogginIn) => {
    if (userId !== null) {
      return;
    }

    // There is a user logging in, save user id
    setUserId(userLogginIn);
  };

  const logout = () => setUserId(null);

  // get user data from database
  useEffect(() => {
    async function loadUserData(path, id) {
      const userData = await readDocument(path, id);
      setUserInfo(userData);
    }
    loadUserData("users", userId);
  }, [userId]);

  const value = { userId, login, logout, userInfo };

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
