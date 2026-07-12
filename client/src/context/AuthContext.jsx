import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("assetflow_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("assetflow_user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("assetflow_user");
    }
  }, [user]);

  const login = (credentials) => {
    const mockUser = {
      name: "Ananya Sharma",
      email: credentials.email,
      role: "Employee",
    };
    setUser(mockUser);
    navigate("/dashboard");
  };

  const signup = (values) => {
    const mockUser = {
      name: values.name,
      email: values.email,
      role: "Employee",
    };
    setUser(mockUser);
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  const value = useMemo(
    () => ({ user, login, signup, logout, isAuthenticated: Boolean(user) }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
