import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("elevateu_user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData, token) => {
    localStorage.setItem("elevateu_user", JSON.stringify(userData));
    localStorage.setItem("elevateu_token", token);

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("elevateu_user");
    localStorage.removeItem("elevateu_token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}