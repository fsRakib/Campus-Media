import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./Login";
import Home from "./Home";
import Feed from "./Feed";
import { Profile } from "./Profile";
import Explore from "./Explore";
import Bookmarks from "./Bookmarks";

export const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/explore/:id",
          element: <Explore />,
        },
        {
          path: "/bookmarks/:id",
          element: <Bookmarks />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
