import { MenuListItems } from "./Sidentmenu.tsx";
import Logo from "./Logo.tsx";
import { Link, useLocation } from "react-router-dom";
//import { useRef, useState } from "react";
//import { useAuth } from "@/context/AuthContext.tsx";
//import { Avatar } from "@mui/material";

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-auto">
      <div className="h-full w-full ">
        <div className="flex pr-2 h-full flex-grow flex-col overflow-y-auto rounded-br-lg rounded-tr-lg bg-white pt-5 shadow-md">
          <Logo />

          <span className="ml-3 mt-2 mb-2 block text-xs font-semibold text-gray-500">
            Admin
          </span>

          <div className="flex mt-2 flex-1 flex-col">
            <div className="">
              <nav className="flex-1">
                {MenuListItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  if (isActive) {
                    console.log(location.pathname, item.path);
                  }
                  return (
                    <Link
                      key={index}
                      to={item.path}
                      className={`flex rounded-md py-4 mb-2 cursor-pointer items-center  px-4 text-sm   outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-[#00AB55] hover:text-[#00AB55] ${
                        isActive
                          ? "border-l-4 bg-[#00AB5514] border-l-[#00AB55] text-[#00AB55] font-bold"
                          : "border-l-0 text-gray-600 font-medium"
                      }`}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
        
          </div>
        </div>
      </div>
    </div>
  );
}

