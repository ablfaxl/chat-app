import { Navigate, useRoutes } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Room } from "../pages/room";
import { useUserContext } from "../contexts/user-context";

export const RouteApp = () => {
  const { user } = useUserContext();
  return useRoutes([
    {
      path: "/login",
      element: user ? <Navigate to={"/room"} /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to={"/room"} /> : <Register />,
    },
    {
      path: "/room",
      element: !user ? <Navigate to={"/login"} /> : <Room />,
    },
  ]);
};
