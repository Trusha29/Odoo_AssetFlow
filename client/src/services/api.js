import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = {
  login: (payload) => client.post("/auth/login", payload),
  signup: (payload) => client.post("/auth/signup", payload),
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
