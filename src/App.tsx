import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./comps/Admin/Dashboard";
import Contest from "./comps/Admin/content/contests/Contest";
import Questions from "./comps/Admin/content/questions/Questions";
import Users from "./comps/Admin/content/users/Users";
import Home from "./comps/Admin/content/home/Home";
import ContestById from "./comps/Admin/content/contests/ContestById";
import AddQuestions from "./comps/Admin/content/questions/AddQuestions";
import AddContest from "./comps/Admin/content/contests/AddContest";
import Login from "./components/auth/Login";
import RootLayout from "./components/RootLoyout";
import Register from "./components/auth/Register";
import ApproveAdmin from "./components/ApproveAdmin";
import LoaderFunction from "./LoaderFunction";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { path: "", element: <Home /> },
          { path: "contest", element: <Contest /> },
          { path: "contest/:id", element: <ContestById /> },
          { path: "questions", element: <Questions /> },
          { path: "users", element: <Users /> },
          { path: "addquestion", element: <AddQuestions /> },
          { path: "addcontest", element: <AddContest /> },
          { path: "admins", element: <ApproveAdmin /> },
        ],
      },
      { path: "/", element: <Login />, loader: LoaderFunction },
      { path: "/register", element: <Register /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
