import { AuthProvider } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
