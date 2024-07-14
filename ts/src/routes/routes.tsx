import Layout from "@components/layout/Layout";
import Community from "@pages/community";
import CommentList from "@pages/community/CommentList";
import Detail from "@pages/community/Detail";
import Edit from "@pages/community/Edit";
import List from "@pages/community/List";
import New from "@pages/community/New";
import Error from "@pages/Error";
import Service from "@pages/Service";
import Login from "@pages/user/Login";
import Signup from "@pages/user/Signup";
import { PrivateRoute } from "@routes/PrivateRoute";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Community />,
      },
      {
        path: ":type",
        element: <List />,
      },
      {
        path: ":type/:_id",
        element: <Detail />,
        children: [
          {
            index: true,
            element: <CommentList />,
          },
        ],
      },
      {
        path: ":type/new",
        element: (
          <PrivateRoute>
            <New />,
          </PrivateRoute>
        ),
      },
      {
        path: ":type/:_id/edit",
        element: (
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        ),
      },
      {
        path: "user/login",
        element: <Login />,
      },
      {
        path: "user/signup",
        element: <Signup />,
      },
      {
        path: "service",
        element: <Service />,
      },
    ],
  },
]);

export default router;
