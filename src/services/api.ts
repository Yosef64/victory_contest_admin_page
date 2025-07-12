import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: VITE_API_URL,
});
export async function getMe() {
  const response = await api.get("/api/admin/me", {
    withCredentials: true,
  });
  return response.data;
}
export async function userLogout() {
  const response = await api.get("/api/admin/logout", {
    withCredentials: true,
  });
  return response.data;
}
export default api;
