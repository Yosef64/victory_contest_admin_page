import Sidebar from "./StaticComps/Sidebar.tsx";
import { Outlet } from "react-router-dom";

import Appbar from "./StaticComps/Appbar.js";
// import AppNavbar from "./StaticComps/Appbar.jsx";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <div className="hidden custom:block w-60 border-r border-dashed border-gray-500 bg-[#faf9f7] overflow-hidden">
        <Sidebar />
      </div>
      <div className="flex-1 h-full px-6 overflow-auto bg-[#faf9f7]">
        <Appbar />
        <Outlet />
      </div>
    </div>
  );
}
