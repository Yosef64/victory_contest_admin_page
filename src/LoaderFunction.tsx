import React from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoaderFunction() {
  const user = localStorage.getItem("user");

  return { user };
}
