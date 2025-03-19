import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./comps/Admin/Dashboard.tsx";
import Contest from "./comps/Admin/content/contests/Contest.tsx";
import Questions from "./comps/Admin/content/questions/Questions.tsx";
import Users from "./comps/Admin/content/users/Users.tsx";
import Home from "./comps/Admin/content/home/Home.tsx";
import ContestById from "./comps/Admin/content/contests/ContestById.tsx";
import AddQuestions from "./comps/Admin/content/questions/AddQuestions.tsx";
import AddContest from "./comps/Admin/content/contests/AddContest.tsx";

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
      {
        path: "addquestion",
        element: <AddQuestions />,
      },
      {
        path: "addcontest",
        element: <AddContest />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
