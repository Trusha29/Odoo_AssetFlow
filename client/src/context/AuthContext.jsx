import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api.js";

const AuthContext = createContext(null);

function getInitialUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem("assetflow_user");
  return stored ? JSON.parse(stored) : null;
}

function getInitialToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem("assetflow_token");
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(getInitialToken);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (user) {
      window.localStorage.setItem("assetflow_user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("assetflow_user");
    }

    if (token) {
      window.localStorage.setItem("assetflow_token", token);
    } else {
      window.localStorage.removeItem("assetflow_token");
    }
  }, [user, token]);

  const login = useCallback(
    async (credentials) => {
      const { data } = await authApi.login(credentials);
      setUser(data.user);
      setToken(data.token);
      navigate("/dashboard");
      return data;
    },
    [navigate],
  );

  const signup = useCallback(
    async (values) => {
      const { data } = await authApi.signup(values);
      setUser(data.user);
      setToken(data.token);
      navigate("/dashboard");
      return data;
    },
    [navigate],
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    navigate("/login");
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      signup,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, token, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
export { useAuth } from "./useAuth.jsx";
