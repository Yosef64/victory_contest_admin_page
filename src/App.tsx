// App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./layout/DashboardLayout";
import Contest from "./components/contests/Contest";
import Questions from "./components/questions/Questions";
import Users from "./components/users/Users";
import Home from "./components/home/Home";
import ContestById from "./components/contests/ContestById";
import AddQuestions from "./components/questions/AddQuestions";
import AddContest from "./components/contests/AddContest";
import Login from "./components/auth/Login";
import RootLayout from "./components/RootLoyout";
import Register from "./components/auth/Register";
import ApproveAdmin from "./components/ApproveAdmin";
import LoaderFunction from "./LoaderFunction";
import { NotificationProvider } from "./context/NotificationContext";
import SearchResults from "./components/dashboard/SearchResults"; // Import SearchResults

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <NotificationProvider>
            <Dashboard />
          </NotificationProvider>
        ),
        children: [
          { path: "", element: <Home /> },
          { path: "contest", element: <Contest /> },
          { path: "contest/:id", element: <ContestById /> },
          { path: "questions", element: <Questions /> },
          { path: "users", element: <Users /> },
          { path: "addquestion", element: <AddQuestions /> },
          { path: "addcontest", element: <AddContest /> },
          { path: "admins", element: <ApproveAdmin /> },
          { path: "search", element: <SearchResults /> }, // Add this new route for search results
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