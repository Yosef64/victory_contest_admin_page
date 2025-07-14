import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";
import LoadingOverlay from "./ui/LoadingOverlay";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Load />
    </AuthProvider>
  );
}
function Load() {
  const { loading } = useAuth();
  if (loading) {
    return <LoadingOverlay />;
  }
  return <Outlet />;
}
