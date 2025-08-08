import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL || "https://txnfqqn7-8081.euw.devtunnels.ms";

const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});
export async function getMe() {
  const response = await api.get("/api/admin/me");
  return response.data;
}
export async function userLogout() {
  const response = await api.get("/api/admin/logout");
  return response.data;
}

export default api;
