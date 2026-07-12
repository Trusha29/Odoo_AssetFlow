import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("assetflow_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authApi = {
  login: (payload) => client.post("/auth/login", payload),
  signup: (payload) => client.post("/auth/register", payload),
};

export const assetsApi = {
  list: () => client.get("/assets"),
  create: (payload) => client.post("/assets", payload),
};

export const bookingsApi = {
  list: () => client.get("/bookings"),
};

export const maintenanceApi = {
  list: () => client.get("/maintenance"),
};

export const auditApi = {
  list: () => client.get("/audits"),
};

export const reportsApi = {
  overview: () => client.get("/reports/overview"),
};
