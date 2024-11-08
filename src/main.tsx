import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Dashboard from "./comps/Admin/Dashboard.tsx";
import Contest from "./comps/Admin/content/contests/Contest.tsx";
import Questions from "./comps/Admin/content/questions/Questions.tsx";
import Users from "./comps/Admin/content/users/Users.tsx";
import Home from "./comps/Admin/content/home/Home.tsx";
import ContestById from "./comps/Admin/content/contests/ContestById.tsx";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "contest",
        element: <Contest />,
      },
      {
        path: "contest/:id",
        element: <ContestById />,
      
      },
      {
        path: "student",
      },
      {
        path: "questions",
        element: <Questions />,
      },
      {
        path: "users",
        element: <Users />,
      },
      
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
